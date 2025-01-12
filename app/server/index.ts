// index.ts - for all of our procedures
import { imageRouter } from "./routers/image";
import { projectRouter } from "./routers/project";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

// added index.ts

export const appRouter = router({
  // creating an instance of an app router
  users: userRouter,
  projects: projectRouter,
  images: imageRouter, 
});

export type AppRouter = typeof appRouter;
