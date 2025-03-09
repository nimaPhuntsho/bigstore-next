"use client";

import React from "react";
import { signOut } from "@/app/actions/auth";
import { Button } from "@chakra-ui/react";
import { VscSignOut } from "react-icons/vsc";
interface Props {
  title: string;
}

const SignOutBtn = () => {
  return (
    <Button
      fontWeight={700}
      _active={{
        bgColor: "#F7F7F7",
        color: "black",
        transform: "scale(0.95)",
      }}
      onClick={() => signOut()}
    >
      Sign out <VscSignOut />
    </Button>
  );
};

export default SignOutBtn;
