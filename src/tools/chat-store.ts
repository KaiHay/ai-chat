'use server'
import { generateId, type Message } from 'ai';
import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { db } from '~/server/db';
import { eq } from 'drizzle-orm'
import { chats, messages } from '~/server/db/schema';

export async function createChat(): Promise<typeof chats.$inferInsert> {
  const id = generateId(); // generate a unique chat ID
  const madeChat: typeof chats.$inferInsert= {
    id:id,
  }
  const [gotChat]=await db.insert(chats).values(madeChat); // create an empty chat file
  if (!gotChat){
    throw new Error(`Chat ${id} not found after insert. Weird`)
  }
  return gotChat;
}

export async function loadChat(id: string): Promise<typeof messages.$inferSelect[]> {
  const getMessages = await db.select()
  .from(messages)
  .where(eq(messages.id, id))
  .orderBy(messages.createdAt)
  return getMessages
}

export async function saveChat({

  messages
}: {
  messages: Message[];
}): Promise<void> {
  const content = JSON.stringify(messages, null, 2);
  await writeFile(getChatFile(id), content);
}

function getChatFile(id: string): string {
  const chatDir = path.join(process.cwd(), '.chats');
  if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
  return path.join(chatDir, `${id}.json`);
}