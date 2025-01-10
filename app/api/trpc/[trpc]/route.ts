import { appRouter } from "@/app/server";
import { createContext } from "@/app/server/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// this is a tRPC handler that will be used to handle all incoming requests

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });
export { handler as GET, handler as POST };
