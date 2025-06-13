'use server'
import { generateId, type Message } from 'ai';

import { db } from '~/server/db';
import { eq, asc, desc } from 'drizzle-orm'
import { chats, messages } from '~/server/db/schema';

export async function createChat(userId: string): Promise<typeof chats.$inferInsert> {
  const id = generateId(); // generate a unique chat ID
  const madeChat: typeof chats.$inferInsert = {
    id: id,
    userId: userId
  }
  const [gotChat] = await db.insert(chats).values(madeChat).returning(); // create an empty chat file
  console.log(gotChat)
  if (!gotChat) {
    throw new Error(`Chat ${id} not found after insert. Weird`)
  }
  return gotChat;
}
export async function loadChat(id: string): Promise<typeof chats.$inferSelect[]> {
  const getChat = await db.select().from(chats).where(eq(chats.id, id))
  return getChat
}
export async function loadMessages(id: string): Promise<typeof messages.$inferSelect[]> {
  const getMessages = await db.select()
    .from(messages)
    .where(eq(messages.chatId, id))
    .orderBy(asc(messages.createdAt))
  console.log('Getting From DB: ', getMessages)
  return getMessages
}
export async function getAllChats(id: string): Promise<typeof chats.$inferSelect[]>{
  if(id=='') return []
  const getChats = await db.select().from(chats).where(eq(chats.userId, id)).orderBy(desc(chats.createdAt))
  return getChats
}

export async function saveChat({ id, chatMessages }: {
  id: string; chatMessages: Message[];
}): Promise<void> {
  // await Promise.all(chatMessages.map(async currMessage => {
  console.log('Saving to this ID: ', id, ' these messages: ', chatMessages)
  for (const message of chatMessages) {
    //chatMessages.forEach((message,i ) => )
    //for (let i = 0; i < chatMessages.length; i++) 
    await db.insert(messages).values({
      chatId: id,
      role: message.role,
      content: message.content,
      parts: message.parts,
      createdAt: new Date(),

    }).onConflictDoUpdate({
      target: messages.id,
      set: {
        content: message.content,
        parts: message.parts,
      }
    })//.catch((error:) => { throw new Error(error); })
  }

}

// function getChatFile(id: string): string {
//   const chatDir = path.join(process.cwd(), '.chats');
//   if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
//   return path.join(chatDir, `${id}.json`);
// }