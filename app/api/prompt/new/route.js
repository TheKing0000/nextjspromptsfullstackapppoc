import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
export async function POST(req, res) {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = Prompt.create({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}
