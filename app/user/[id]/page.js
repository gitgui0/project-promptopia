"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PromptCard from "@components/PromptCard";

const UserProfile = ({ params }) => {
  const { id } = params;
  const [user, setUser] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        setUser(data.user);
        setPrompts(data.prompts);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{user.username}'s Profile</span>
      </h1>
      <p className="desc text-left">
        {user.username}'s prompts and ideas.
      </p>

      <div className="mt-10 prompt_layout">
        {prompts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => {}}
            handleDelete={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default UserProfile;
