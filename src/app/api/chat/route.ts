import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})
export async function POST(req: Request) {
    const { messages } = await req.json();
    //console.log("THESE ARE mesages:", messages)

    const result = streamText({
        model: openai('gpt-4o-mini'),
        system: 'You are a helpful assistant.',
        messages,
        maxTokens: 50,
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