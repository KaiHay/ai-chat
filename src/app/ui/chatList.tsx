
'use client'

import clsx from 'clsx'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { type Chat } from '~/tools/types'
import { api } from "~/trpc/react"


export default function ListChats({ chatList }: { chatList?: Chat[] }) {
    const deleteChat = api.chat.deleteChat.useMutation()
    const onClickDel = async (id: string) => {
        await deleteChat.mutateAsync({ chatId: id })
        window.location.reload()
    }
    return (
        <div className="text-white p-2 bg-gradient-to-b from-[#0c0c00] to-[#7d1630] font-light flex flex-col flex-1 overflow-scroll overflow-x-clip absolute left-0 h-[100vh] w-[70px] rounded-lg hover:w-[150px] transition-[width] duration-300">
            Chats:
            {chatList?.map((chat) => (
                <div key={chat.id} className=''>
                    <div className='size-20'>
                        <Link className="text-white hover:text-gray-500" href={`/chat/${chat.id}`}>ChatId-{chat.id}</Link>
                        <button className='text-xs text-red-500 hover:text-purple-500' onClick={() => onClickDel(chat.id)}>DELETE</button>
                    </div>
                </div>
            ))}
        </div>
    )
}