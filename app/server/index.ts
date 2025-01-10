// index.ts - for all of our procedures
import { projectRouter } from "./routers/project";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

// added index.ts

export const appRouter = router({
  // creating an instance of an app router
  users: userRouter,
  projects: projectRouter,
});

export type AppRouter = typeof appRouter;
