'use client'
import { useChat } from '@ai-sdk/react'

export function Chat() {
    const { messages, input, stop, reload, status, handleInputChange, handleSubmit, setMessages } = useChat({ experimental_throttle: 50 })
    const handleDelete = (id: string) => {
        setMessages(messages.filter(message => message.id !== id))
    }
    return (
        <div className="flex flex-col w-full max-w-md mx-auto">
            <div className="flex-1 overflow-y-auto">
                {messages.map(message => (
                    <div key={message.id} className="mb-4 flex flex-row">
                        <strong>{message.role}: </strong>
                        {message.content}
                        {/* {message.parts.map((part, index) => {
                            if (part.type === 'reasoning')
                                return (
                                    // <div key={index}>{part.details.map(detail => detail.type === 'text' ? detail.text : '')}</div>
                                )
                        })} */}
                        <div className='pl-2'>
                            <button className="text-gray-600 hover:text-red-500" onClick={() => handleDelete(message.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 flex-row">
                <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Say something..."
                    className="flex-1 p-2 border rounded"
                />
                <button type="submit">Send</button>
                {status === 'streaming' ? <div className='pl-2 flex justify-center'>
                    <button className="text-gray-600 hover:text-red-500" onClick={stop} disabled={!(status === 'streaming' || status === 'submitted')}>Stop</button>
                </div> :
                    <button onClick={() => reload()} disabled={!(status === 'ready' || status === 'error')}>Regenerate</button>
                }
            </form>
        </div>
    )
}