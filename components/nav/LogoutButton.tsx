"use client"; // Make this file client-side only

import { signOut } from "next-auth/react";

import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <div
      onClick={async () => {
        await signOut();
      }}
      className="flex text-red-600 stroke-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer gap-x-2"
    >
      <LogOut />
      Log out
    </div>
  );
};

export default LogoutButton;
 