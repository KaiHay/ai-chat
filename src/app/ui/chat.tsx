
'use client'
import { useChat, type Message } from '@ai-sdk/react'
import clsx from 'clsx'

export default function Chat({ id, initialMessages, }: { id?: string | undefined; initialMessages?: Message[] } = {}) {
    const { messages, input, stop, reload, status, handleInputChange, handleSubmit, setMessages } = useChat({
        experimental_throttle: 50,
        id,
        initialMessages,
        sendExtraMessageFields: true,
        experimental_prepareRequestBody({ messages, id }) {
            return { message: messages[messages.length - 1], id }
        },
    })
    const handleDelete = (id: string) => {
        setMessages(messages.filter(message => message.id !== id))
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#7d1630] to-[#a4a91b] text-white">

            <div className="flex flex-col w-full max-w-md mx-auto">
                <div className="flex flex-col flex-1 overflow-scroll scroll-auto max-h-[80vh]" style={{ overflowAnchor: "auto" }}>
                    {messages.map(message => (
                        <div key={message.id} className="mb-4 flex flex-row">
                            <strong className={clsx('', message.role === 'assistant' ? 'text-' : '')}>{message.role}:  </strong>
                            {message.content}
                            {/* {message.parts.map((part, index) => {
                            if (part.type === 'reasoning')
                                return (
                                    // <div key={index}>{part.details.map(detail => detail.type === 'text' ? detail.text : '')}</div>
                                )
                        })} */}
                            <div className='pl-2'>
                                <button className="text-gray-600 hover:text-red-500 hover:cursor-pointer" onClick={() => handleDelete(message.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2 flex-row">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Say something..."
                        className="flex-1 p-2 border rounded hover:cursor-pointer"
                    />
                    <button type="submit" className='hover:cursor-pointer hover:text-gray-600'>Send</button>
                    {status === 'streaming' ? <div className='pl-2 flex justify-center'>
                        <button className="text-gray-600 hover:text-red-500" onClick={stop} disabled={!(status === 'streaming' || status === 'submitted')}>Stop</button>
                    </div> :
                        <button className='hover:cursor-pointer hover:text-gray-600' onClick={() => reload()} disabled={!(status === 'ready' || status === 'error')}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg></button>

                    }
                </form>
            </div>
        </main>
    )
}