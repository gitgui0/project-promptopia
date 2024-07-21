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
        <p>Loading...</p> // Optional: Show a loading indicator
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
