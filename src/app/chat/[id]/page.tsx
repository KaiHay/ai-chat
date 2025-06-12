import type { Message } from 'ai';
import { loadChat, loadMessages } from '../../../tools/chat-store';
import Chat from '../../ui/chat';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '~/lib/auth';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) redirect(`/chat`)

    const { id } = await props.params; // get the chat ID from the URL

    const currChat = await loadChat(id)
    console.log('CurrentChat: ', currChat)
    if (!currChat[0]) redirect('/chat')
    if (session.user.id != currChat[0].userId) {
        console.log('Not your chat')
        redirect('/chat')
    }
    const messages = await loadMessages(currChat[0].id); // load the chat messages


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