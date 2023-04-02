import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const formResponseRouter = createTRPCRouter({
  //   submitWithResponses: protectedProcedure.query(({ ctx }) => {
  //     return ctx.prisma.form.findMany({ where: { userId: ctx.session.user.id } });
  //   }),
  submitWithResponses: publicProcedure
    .input(
      z.object({
        formId: z.string(),
        name: z.string(),
        email: z.string(),
        responses: z
          .object({ blockId: z.string(), response: z.string() })
          .array(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.formResponse.create({
        data: {
          name: input.name,
          email: input.email,
          form: { connect: { id: input.formId } },
          responses: { create: input.responses.map((response) => response) },
        },
      });
    }),

  getResponsesForFormID: protectedProcedure
    .input(z.object({ formId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.formResponse.findMany({
        where: { formId: input.formId },
        include: {
          form: { select: { name: true } },
          responses: {include: {block: {select: {question: true}}}}
        },
        orderBy: {createdAt: "desc"}
      });
    }),
});
