import { Box, Button, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import Cart from "./CartIcon";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import NewLogo from "./NewLogo";
import { AiOutlineLogin } from "react-icons/ai";
import { createClient } from "@/app/supabase/supabaseServer";
import { GiHamburgerMenu } from "react-icons/gi";

import AuthUser from "./AuthUser";
import HamburgerMenu from "./HamburgerMenu";
import MainHeader from "./MainHeader";

const navLinks = [
  {
    title: "Products",
    href: "/listings",
  },
  {
    title: "Contacts",
    href: "/contact",
  },
  {
    title: "About",
    href: "/about",
  },
];

export default async function Header() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data || !data.user) return <MainHeader userName={undefined} />;

  if (!data.user) redirect("/login");

  const user = await supabase
    .from("users")
    .select("*")
    .eq("user_id", data.user.id)
    .single();

  if (!user.data || !user.data.first_name) return <p>no user</p>;

  return <MainHeader userName={user.data.first_name} />;
}
