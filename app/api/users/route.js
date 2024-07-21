import User from "@models/user"; // Adjust import path as needed
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // Extract search query from URL
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("search") || ""; // Get the search text if it exists

    let query = {};

    if (searchText) {
      // Build the query for searching
      query = {
        $or: [
          { username: { $regex: searchText, $options: "i" } }, // Case-insensitive search in username
          { email: { $regex: searchText, $options: "i" } }    // Case-insensitive search in email
        ]
      };
    }

    // Fetch users based on the query
    const users = await User.find(query);

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Failed to fetch users", { status: 500 });
  }
};
