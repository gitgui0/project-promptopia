import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export async function GET(request) {
  try {
    await connectToDB();

    // Use URLSearchParams to get search parameters
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("search") || ""; // Get the search text if it exists

    let query = {};

    if (searchText) {
      // Build the query for searching
      query = {
        $or: [
          { prompt: { $regex: searchText, $options: "i" } },  // Case-insensitive search in prompt
          { tag: { $regex: searchText, $options: "i" } }     // Case-insensitive search in tag
        ]
      };
    }

    // Fetch prompts based on the query
    const prompts = await Prompt.find(query).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
}
