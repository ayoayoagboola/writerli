import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "../server";

// added client.ts

export const trpc = createTRPCReact<AppRouter>();
