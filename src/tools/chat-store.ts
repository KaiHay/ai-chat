'use server'
import { generateId, type Message } from 'ai';

import { db } from '~/server/db';
import { eq } from 'drizzle-orm'
import { chats, messages } from '~/server/db/schema';

export async function createChat(): Promise<typeof chats.$inferInsert> {
  const id = generateId(); // generate a unique chat ID
  const madeChat: typeof chats.$inferInsert = {
    id: id,
  }
  const [gotChat] = await db.insert(chats).values(madeChat).returning(); // create an empty chat file
  console.log(gotChat)
  if (!gotChat) {
    throw new Error(`Chat ${id} not found after insert. Weird`)
  }
  return gotChat;
}

export async function loadChat(id: string): Promise<typeof messages.$inferSelect[]> {
  const getMessages = await db.select()
    .from(messages)
    .where(eq(messages.chatId, id))
    .orderBy(messages.createdAt)
  console.log('Getting From DB: ', getMessages)
  return getMessages
}

export async function saveChat({ id, chatMessages, }: {
  id: string; chatMessages: Message[];
}): Promise<void> {
  await Promise.all(chatMessages.map(async currMessage => {
    await db.insert(messages).values({
      id: generateId(),
      chatId: id,
      role: currMessage.role,
      content: currMessage.content,
      parts: currMessage.parts

    }).onConflictDoUpdate({
      target: messages.id,
      set: {
        content: currMessage.content,
        parts: currMessage.parts,
      }
    })//.catch((error:) => { throw new Error(error); })
  })
  )
}

// function getChatFile(id: string): string {
//   const chatDir = path.join(process.cwd(), '.chats');
//   if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
//   return path.join(chatDir, `${id}.json`);
// }