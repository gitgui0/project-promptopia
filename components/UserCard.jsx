"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Correct import for useRouter

const UserCard = ({ user }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/user/${user._id}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="user_card">
      <div>
        <div className="flex justify-between items-center gap-5">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={user.image}
              alt="User image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoishi font-semibold text-gray-900">
                {user.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="copy_btn" onClick={handleClick}>
            <Image
              src="/assets/icons/link.svg" // Assuming you have a user icon
              alt="user_icon"
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
