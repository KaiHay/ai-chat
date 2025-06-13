import { generateId } from "better-auth";
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
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const chats = await ctx.db.query.chats.findMany({
                where: (user, { eq }) => eq(user.userId, input.id)
            })
            return chats
        }),
    createNewChats: publicProcedure
        .input(z.object({userId: z.string() }))
        .query(async ({input, ctx})=> {
            const newId = generateId()
            const madeChat: typeof chats.$inferInsert= {
                id: newId,
                userId: input.userId
            }
            const [newChat] = await ctx.db.insert(chats).values(madeChat).returning()
            if (!newChat){
                throw new Error(`Chat not found after insert. Weird`)
            }
            return newChat
        }),
    loadSingleChat: publicProcedure
        .input(z.object({chatId: z.string() }))
        .query(async ({input, ctx}) => {
            const messages = await ctx.db.query.chats.findMany({
                where: (user, {eq}) => eq(user.id, input.chatId)
            })
            return messages
        })

});
