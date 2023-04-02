import { createTRPCRouter } from "~/server/api/trpc";
import { formRouter } from "~/server/api/routers/form";
import { blockRouter } from "./routers/block";
import { formResponseRouter } from "./routers/formResponse";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  form: formRouter,
  block: blockRouter,
  formResponse: formResponseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
