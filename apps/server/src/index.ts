import { env } from "cloudflare:workers";
import { RPCHandler } from "@orpc/server/fetch";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";
import { auth } from "./lib/auth";
import { db } from "./db";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";


const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  }
}>();

app.use(logger());
app.use("/*", cors({
  origin: env.CORS_ORIGIN || "",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Attach session/user to context for all routes
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  c.set("user", session?.user ?? null);
  c.set("session", session?.session ?? null);
  return next();
});

// Mount the Better Auth handler
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

if (process.env.NODE_ENV === "development") {
  app.post("/api/dev/login/:userId", async (c) => {
    const userId = c.req.param("userId");
    
    try {
      // First check if user exists in database
      const existingUser = await db.query.user.findFirst({
        where: (users, { eq }) => eq(users.id, userId)
      });
      
      if (!existingUser) {
        return c.json({ 
          error: "User not found", 
          message: `No user with ID ${userId} exists in the database` 
        }, 404);
      }
      
      // Create a manual session for development
      const sessionData = {
        userId: existingUser.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        token: `dev-session-${Date.now()}-${Math.random()}`,
        ipAddress: c.req.header("x-forwarded-for") || "127.0.0.1",
        userAgent: c.req.header("user-agent") || "development",
      };
      
      return c.json({ 
        success: true, 
        message: `Development session created for user: ${existingUser.name}`,
        user: existingUser,
        instructions: "Use this in development only. Set the session cookie manually if needed."
      });
    } catch (error) {
      return c.json({ 
        error: "Failed to create session", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }, 400);
    }
  });
  
  // List all users for development
  app.get("/api/dev/users", async (c) => {
    try {
      const users = await db.query.user.findMany({
        columns: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true
        }
      });
      
      return c.json({ 
        users,
        message: "Available users for development login",
        usage: "POST to /api/dev/login/{userId} to create a dev session"
      });
    } catch (error) {
      return c.json({ 
        error: "Failed to fetch users", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }, 500);
    }
  });
}

const handler = new RPCHandler(appRouter);
app.use("/rpc/*", async (c, next) => {
  const context = await createContext({ context: c });
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: context,
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
});





// Example protected endpoint
app.get("/api/protected", (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  return c.json({ message: "You are authenticated!", user });
});

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
