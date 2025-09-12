import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: openai("gpt-4.1-nano"),
      prompt,
    });

    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log("Error Streaming text");
    return new Response("Failed to stream text", { status: 500 });
  }
}
