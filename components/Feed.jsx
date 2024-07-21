"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import UserCard from "./UserCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const UserCardList = ({ data }) => {
  return (
    <div className="w-full  mt-4 user_layout">
      {data.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState(""); // State for search text
  const [allPosts, setAllPosts] = useState([]); // State for storing posts
  const [allUsers, setAllUsers] = useState([]); // State for storing users
  const [loading, setLoading] = useState(false); // Optional: State for loading indicator

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true); // Set loading state to true

    try {
      // Include search query in the fetch URL
      const response = await fetch(
        `/api/search?search=${encodeURIComponent(searchText)}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const { prompts, users } = await response.json();
      setAllPosts(prompts);
      setAllUsers(users);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAllPosts([]);
      setAllUsers([]); // Clear users or handle error as needed
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Fetch data when the component mounts or when searchText changes
  useEffect(() => {
    fetchData();
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag, prompt, or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {loading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {allPosts.length > 0 ? (
            <PromptCardList data={allPosts} handleTagClick={() => {}} />
          ) : (
            <UserCardList data={allUsers} />
          )}
        </>
      )}
    </section>
  );
};

export default Feed;
