import type { Message } from 'ai';
import { loadChat } from '../../../tools/chat-store';
import Chat from '../../ui/chat';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params; // get the chat ID from the URL
    const messages = await loadChat(id); // load the chat messages
    const prevMessages: Message[] = messages.map(record => ({
        role: record.role as 'data' | 'user' | 'assistant' | 'system',
        content: record.content ?? '', // Convert null to empty string
        parts: record.parts as Message['parts'],
        id: record.id,
        chatId: record.chatId
    }));
    console.log('Please just load these: ', id)
    return <Chat id={id} initialMessages={prevMessages} />; // display the chat
}