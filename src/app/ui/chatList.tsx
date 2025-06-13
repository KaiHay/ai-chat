
'use client'

import clsx from 'clsx'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link'
export interface Chat {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
}

export default function ListChats({ chatList }: { chatList?: Chat[] }) {

    return (
        <div className="flex flex-col flex-1 overflow-scroll overflow-x-clip absolute left-0 h-[100vh] w-[70px] max-w-[70px] rounded-lg hover:w-[150px] hover:max-w-[150px] transition duration-300">
            Chats:
            {chatList?.map((chat) => (
                <div className=''>
                    <div className='size-20'>
                        <Link href={`/chat/${chat.id}`}>ChatId-{chat.id}</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}