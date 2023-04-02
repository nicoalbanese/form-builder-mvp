import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const blockRouter = createTRPCRouter({
  // hello: protectedProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  deleteBlockWithID: protectedProcedure
    .input(
      z.object({
        blockId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.block.delete({
        where: { id: input.blockId },
      });
    }),

  updateBlockWithID: protectedProcedure
    .input(
      z.object({
        blockId: z.string(),
        attributes: z.object({ question: z.string(), type: z.string() }),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.block.update({
        where: { id: input.blockId },
        data: { ...input.attributes },
      });
    }),
  createBlock: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        type: z.string(),
        formId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.block.create({
        data: { ...input, countInOrder: 1 },
      });
    }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
