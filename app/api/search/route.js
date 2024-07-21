import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // Extract search query from URL
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("search") || ""; // Get the search text if it exists

    let promptsQuery = {};
    let usersQuery = {};

    if (searchText) {
      // Build queries for searching
      promptsQuery = {
        $or: [
          { prompt: { $regex: searchText, $options: "i" } }, // Case-insensitive search in prompt
          { tag: { $regex: searchText, $options: "i" } }    // Case-insensitive search in tag
        ]
      };

      usersQuery = {
        $or: [
          { username: { $regex: searchText, $options: "i" } }, // Case-insensitive search in username
          { email: { $regex: searchText, $options: "i" } }    // Case-insensitive search in email
        ]
      };
    }

    // Fetch prompts and users based on the queries
    const prompts = await Prompt.find(promptsQuery).populate('creator');
    const users = await User.find(usersQuery);

    return new Response(JSON.stringify({ prompts, users }), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Failed to fetch data", { status: 500 });
  }
};
