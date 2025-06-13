import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { chats } from "~/server/db/schema";

export const chatRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getYourChats: publicProcedure
    .input(z.object({id: z.string()}))
     .query(async ({input, ctx}) => {
        const chats = await ctx.db.query.chats.findMany({
            where: (user, {eq})=>eq(user.userId, input.id)
        })
        return chats
     }),
});
