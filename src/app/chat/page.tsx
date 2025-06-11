import { redirect } from 'next/navigation'
import { createChat } from '../../tools/chat-store'


export default async function Page() {
    const id = await createChat()
    console.log('gonna redirect to: ', id.id)
    redirect(`/chat/${id.id}`)
}
