import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { userRouter } from "./user";
import { questRouter } from "./quest";
import { achievementRouter } from "./achievement";
import { communityRouter } from "./community";
import { equipmentRouter } from "./equipment";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),

  user: userRouter,
  quest: questRouter,
  achievement: achievementRouter,
  community: communityRouter,
  equipment: equipmentRouter,
};

export type AppRouter = typeof appRouter;
