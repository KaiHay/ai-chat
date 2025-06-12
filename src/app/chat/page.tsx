import { redirect } from 'next/navigation'
import { createChat } from '../../tools/chat-store'
import { auth } from '~/lib/auth'
import { headers } from 'next/headers'
export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) redirect(`/login`)
    console.log("sessionId: ", session.user.name)
    const id = await createChat(session.user.id)
    console.log('gonna redirect to: ', id.id)
    redirect(`/chat/${id.id}`)
}
