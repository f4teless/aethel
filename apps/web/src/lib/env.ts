// import { z } from "zod";

// const serverEnvSchema = z.object({
//   CORS_ORIGIN: z.string().url("CORS_ORIGIN must be a valid URL"),
//   BET
//   TER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
//   BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),
//   GITHUB_CLIENT_ID: z.string().optional(),
//   GITHUB_CLIENT_SECRET: z.string().optional(),
//   DATABASE_URL: z.string().url("DATABASE_URL must be a valid database URL").optional(),
// });

// const clientEnvSchema = z.object({
//   NEXT_PUBLIC_SERVER_URL: z.string().url("NEXT_PUBLIC_SERVER_URL must be a valid URL"),
// });

// export function validateServerEnv() {
//   try {
//     return serverEnvSchema.parse({
//       CORS_ORIGIN: process.env.CORS_ORIGIN,
//       BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
//       BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
//       GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
//       GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
//       DATABASE_URL: process.env.DATABASE_URL,
//     });
//   } catch (error) {
//     console.error("❌ Invalid server environment variables:");
//     if (error instanceof z.ZodError) {
//       error.issues.forEach((issue) => {
//         console.error(`  ${issue.path.join(".")}: ${issue.message}`);
//       });
//     }
//     throw new Error("Invalid server environment configuration");
//   }
// }

// export function validateClientEnv() {
//   try {
//     return clientEnvSchema.parse({
//       NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
//     });
//   } catch (error) {
//     console.error("❌ Invalid client environment variables:");
//     if (error instanceof z.ZodError) {
//       error.issues.forEach((issue) => {
//         console.error(`  ${issue.path.join(".")}: ${issue.message}`);
//       });
//     }
//     throw new Error("Invalid client environment configuration");
//   }
// }

// export type ServerEnv = z.infer<typeof serverEnvSchema>;
// export type ClientEnv = z.infer<typeof clientEnvSchema>;
