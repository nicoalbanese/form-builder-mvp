import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const formRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.form.create({
        data: { name: input.name, userId: ctx.session.user.id },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.form.findMany({ where: { userId: ctx.session.user.id } });
  }),
  getFormByID: protectedProcedure
    .input(z.object({ formId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.form.findFirst({
        where: { id: input.formId },
        include: { blocks: true },
      });
    }),
  getPublicFormByID: publicProcedure
    .input(z.object({ formId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.form.findFirst({
        where: { id: input.formId },
        include: { blocks: true },
      });
    }),
  updateFormByID: protectedProcedure
    .input(
      z.object({
        formId: z.string(),
        attributes: z.object({ name: z.string() }),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.form.update({
        where: { id: input.formId },
        data: {name: input.attributes.name}
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
