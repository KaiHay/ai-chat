import type { Message } from 'ai';
import { loadMessages } from '../../../tools/chat-store';
import Chat from '../../ui/chat';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '~/lib/auth';
import ListChats from '~/app/ui/chatList';
import { type Chat as intChat } from '~/tools/types'
import { api } from '~/trpc/server';


export default async function Page(props: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) redirect(`/chat`)

    const { id } = await props.params; // get the chat ID from the URL

    const currChat = await api.chat.loadSingleChat({chatId:id})

    console.log('CurrentChat: ', currChat)

    if (!currChat[0]) redirect('/chat')

    if (session.user.id != currChat[0].userId) {
        console.log('Not your chat')
        redirect('/chat')
    }
    const messages = await loadMessages(currChat[0].id); // load the chat messages

    // const chats= await getAllChats(currChat[0].userId?currChat[0].userId:'')
    const chats = await api.chat.getYourChats({ id: currChat[0].userId ? currChat[0].userId : '' })
    console.log("unformatted chats:", chats)


    const prevMessages: Message[] = messages.map(record => ({
        role: record.role as 'data' | 'user' | 'assistant' | 'system',
        content: record.content ?? '', // Convert null to empty string
        parts: record.parts as Message['parts'],
        id: record.id,
        chatId: record.chatId
    }));


    const formatChats: intChat[] = chats.map((chat) => ({
        id: chat.id,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        userId: chat.userId
    }))

    console.log('Please just load these: ', id)
    return (
        <>

            <ListChats chatList={formatChats} />
            <Chat id={id} initialMessages={prevMessages} />

        </>
    )
        ; // display the chat
}