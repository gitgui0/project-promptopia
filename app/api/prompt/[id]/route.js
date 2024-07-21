import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
// patch update
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// delete
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    console.log("Attempting to delete prompt with id:", params.id);

    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      console.log("Prompt not found for id:", params.id);
      return new Response("Prompt Not Found", { status: 404 });
    }

    await Prompt.deleteOne({ _id: params.id });

    console.log("Prompt deleted with id:", params.id);
    return new Response(JSON.stringify({ message: "Prompt deleted", id: params.id }), { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};