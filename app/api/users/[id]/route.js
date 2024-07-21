import User from "@models/user";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  const { id } = params;
  
  try {
    await connectToDB();

    const user = await User.findById(id);
    if (!user) return new Response("User not found", { status: 404 });

    const prompts = await Prompt.find({ creator: id }).populate('creator');

    return new Response(JSON.stringify({ user, prompts }), { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response("Failed to fetch user data", { status: 500 });
  }
};
