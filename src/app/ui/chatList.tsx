
'use client'

import clsx from 'clsx'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { type Chat } from '~/tools/types'
import { api } from "~/trpc/react"




const bgStyle = 'bg-gradient-to-b from-[#0c0c00] to-[#7d1630]'
export default function ListChats({ chatList }: { chatList?: Chat[] }) {
    const deleteChat = api.chat.deleteChat.useMutation()
    const onClickDel = async (id: string) => {
        await deleteChat.mutateAsync({ chatId: id })
        window.location.reload()
    }
    return (
        <div className="group fixed top-[50%] left-4 translate-y-[-50%]">
            <div className="text-white bg-black font-light flex flex-col justify-center items-center overflow-scroll w-[60px] h-[25px] rounded-full transition-all duration-300 ease-in-out group-hover:oveflow-scroll group-hover:w-[150px] group-hover:h-[90vh] group-hover:rounded-lg group-hover:p-2">
                <div>Chats</div>
                <div className="hidden group-hover:block">
                    Chat:
                    {chatList?.map((chat) => (
                        <div key={chat.id} className='pt-5'>
                            <div className='size-20'>
                                <Link className="text-white hover:text-gray-500" href={`/chat/${chat.id}`}>ChatId-{chat.id}</Link>
                                <button className='text-xs text-red-500 hover:text-purple-500' onClick={() => onClickDel(chat.id)}>DELETE</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}