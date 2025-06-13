
'use client'

import clsx from 'clsx'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { type Chat } from '~/tools/types'
import { api } from "~/trpc/react"


export default function ListChats({ chatList }: { chatList?: Chat[] }) {

    return (
        <div className="text-white border font-light flex flex-col flex-1 overflow-scroll overflow-x-clip absolute left-0 h-[100vh] w-[70px] rounded-lg hover:w-[150px] transition-[width] duration-300">
            Chats:
            {chatList?.map((chat) => (
                <div key={chat.id} className=''>
                    <div className='size-20'>
                        <Link className="text-white hover:text-gray-500" href={`/chat/${chat.id}`}>ChatId-{chat.id}</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}