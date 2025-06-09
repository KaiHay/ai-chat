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
    //console.log("THESE ARE mesages:", messages)
    const prevMessages = await loadChat(id)
    const messages = appendClientMessage({
        messages: prevMessages,
        message,
    })
    const result = streamText({
        model: openai('gpt-4o-mini'),
        system: 'You are a helpful assistant.',
        messages,
        maxTokens: 50,
        async onFinish({ response }) {
            await saveChat({
                id,
                messages: appendResponseMessages({
                    messages,
                    responseMessages: response.messages,
                })
            })
        }
    });
    result.consumeStream(); 

    
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