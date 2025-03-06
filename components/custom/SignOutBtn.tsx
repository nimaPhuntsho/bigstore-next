"use client";

import React from "react";
import { signOut } from "@/app/actions/auth";
import { Button, Icon } from "@chakra-ui/react";
import { PiSignOutLight } from "react-icons/pi";
interface Props {
  title: string;
}

const SignOutBtn = () => {
  return <p onClick={() => signOut()}>Sign out</p>;
};

export default SignOutBtn;
