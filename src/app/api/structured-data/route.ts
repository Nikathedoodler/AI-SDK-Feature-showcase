import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { recipeSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { dish } = await req.json();

    const result = streamObject({
      model: openai("gpt-4.1-nano"),
      schema: recipeSchema,
      prompt: `Generate a receipe for ${dish}`,
    });

    return result.toTextStreamResponse;
  } catch (error) {
    console.log(error, "Error Generating Receipe");
    return new Response("Failed to generate new receipe", { status: 500 });
  }
}
