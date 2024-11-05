import { createOllama } from 'ollama-ai-provider';
import { streamText, convertToCoreMessages, CoreMessage, UserContent } from 'ai';

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Destructure request data
  const { messages, selectedModel, data } = await req.json();

  const initialMessages = messages.slice(0, -1); 
  const currentMessage = messages[messages.length - 1]; 

  const ollama = createOllama({});

  // Build message content array directly
  const messageContent: UserContent = [{ type: 'text', text: currentMessage.content }];

  // Add images if they exist
  data?.images?.forEach((imageUrl: string) => {
    const image = new URL(imageUrl);
    messageContent.push({ type: 'image', image });
  });
  console.log('lol')
  // Stream text using the ollama model
  try {
    const result = await streamText({
      model: ollama(selectedModel),
      messages: [
        ...convertToCoreMessages(initialMessages),
        { role: 'user', content: messageContent },
      ],
    });
    console.log('result')
    return result.toDataStreamResponse();
  } catch(e) {
    console.log(e)
  }

}
