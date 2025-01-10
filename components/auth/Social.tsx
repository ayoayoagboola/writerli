"use client";

import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full justify-between gap-x-2">
      <Button
        variant="soft_outline"
        onClick={() => onClick("google")}
        className="w-full"
      >
        {/* <FcGoogle className="h-5 w-5" /> */}
        Google
      </Button>
      <Button
        variant="soft_outline"
        onClick={() => onClick("google")}
        className="w-full"
      >
        {/* <FcGoogle className="h-5 w-5" /> */}
        Google
      </Button>
    </div>
  );
};
