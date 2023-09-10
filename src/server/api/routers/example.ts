import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todo } from "~/lib/schema";
import { eq } from "drizzle-orm";

export const exampleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(todo);
  }),
  getUserTodo: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.select().from(todo).where(eq(todo.userId, input.userId));
    }),
  create: publicProcedure
    .input(
      z.object({ user: z.string(), text: z.string(), userName: z.string() }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(todo).values({
        text: input.text,
        userId: input.user,
        userName: input.userName,
      });
    }),
  toggle: publicProcedure
    .input(z.object({ todoId: z.string(), checked: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(todo)
        .set({ done: input.checked })
        .where(eq(todo.id, input.todoId));
    }),
  delete: publicProcedure
    .input(z.object({ todo: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(todo).where(eq(todo.id, input.todo));
    }),
});
