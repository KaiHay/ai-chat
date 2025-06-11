import { createOpenAI } from '@ai-sdk/openai';
import { appendClientMessage, appendResponseMessages, streamText, type Message } from 'ai';
import { loadChat, saveChat } from '../../../tools/chat-store'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})
export async function POST(req: Request) {
    const { message, id }: { message: Message, id: string } = await req.json() as { message: Message, id: string };
    const DBprevMessages = await loadChat(id)
    const prevMessages: Message[] = DBprevMessages.map(record => ({
        role: record.role as 'data' | 'user' | 'assistant' | 'system',
        content: record.content ?? '', // Convert null to empty string
        parts: record.parts as Message['parts'],
        id: record.id,
        chatId: record.chatId
    }));
    console.log('Loading these again: ', prevMessages)

    const messages = appendClientMessage({
        messages: prevMessages,
        message,
    })
    const result = streamText({
        model: openai('gpt-4o-mini'),
        system: 'You are a not helpful assistant that gives random slightly related facts, but holds normal conversation.',
        messages,
        maxTokens: 50,
        async onFinish({ response }) {
            await saveChat({
                id,
                chatMessages: appendResponseMessages({
                    messages,
                    responseMessages: response.messages,
                })
            })
        }
    });


    return result.toDataStreamResponse({
        sendReasoning: true, getErrorMessage: error => {
            if (error == null) {
                return 'unknown error';
            }

            if (typeof error === 'string') {
                return error;
            }

            if (error instanceof Error) {
                return error.message;
            }

            return JSON.stringify(error);
        }
    },);
}