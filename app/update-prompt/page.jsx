"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

// Main UpdatePrompt component
const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to update prompt");
      }
    } catch (error) {
      console.error("Failed to update prompt", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;

      const response = await fetch(`/api/prompt/${promptId}`);
      if (response.ok) {
        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } else {
        console.error("Failed to fetch prompt details");
      }
    };

    getPromptDetails();
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

// Fallback component for Suspense
const FallbackComponent = () => {
  return <div>Loading...</div>;
};

// Wrapper to use Suspense
const UpdatePromptWrapper = () => {
  return (
    <Suspense fallback={<FallbackComponent />}>
      <UpdatePrompt />
    </Suspense>
  );
};

export default UpdatePromptWrapper;
