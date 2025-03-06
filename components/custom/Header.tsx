import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import Cart from "./Cart";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import NewLogo from "./NewLogo";
import { AiOutlineLogin } from "react-icons/ai";
import { createClient } from "@/app/supabase/supabaseServer";
import { GiHamburgerMenu } from "react-icons/gi";

import AuthUser from "./AuthUser";
import HamburgerMenu from "./HamburgerMenu";

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

  const toggle = false;

  if (!data || !data.user) {
    // console.log(error);
    return (
      <main>
        <HStack
          position="relative"
          justifyContent="space-between"
          padding="1rem"
        >
          <NewLogo />
          <HStack display={{ base: "none", sm: "none", md: "flex" }} gap="1rem">
            <Link href="/listings">Products</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/dashboard">Account</Link>
          </HStack>
          <HStack>
            <Link href="/cart">
              <Cart />
            </Link>
            <Link href="/login">
              <Button>
                Login
                <Icon>
                  <AiOutlineLogin />
                </Icon>
              </Button>
            </Link>
            <HamburgerMenu />
          </HStack>
        </HStack>
      </main>
    );
  }

  if (!data.user) redirect("/login");

  const user = await supabase
    .from("users")
    .select("*")
    .eq("user_id", data.user.id)
    .single();

  if (!user.data || !user.data.first_name)
    return (
      <main>
        <HStack justifyContent="space-between" padding="1rem">
          <NewLogo />
          <HStack gap="1rem">
            <Link href="/listings">Products</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/dashboard">Account</Link>

            <Link href="/cart">
              <Cart />
            </Link>
            <Link href="/login">
              <Button>
                Login
                <Icon>
                  <AiOutlineLogin />
                </Icon>
              </Button>
            </Link>
          </HStack>
        </HStack>
      </main>
    );

  return (
    <main>
      <HStack padding="1rem" alignItems="center" justifyContent="space-between">
        <NewLogo />
        <HStack>
          <Link href="/cart">
            <Cart />
          </Link>
          {user ? (
            <HStack>
              <AuthUser userName={user.data.first_name} />
              <Button display={{ md: "none" }}>
                <Icon>
                  <GiHamburgerMenu />
                </Icon>
              </Button>
            </HStack>
          ) : (
            <Link href="/login">
              <Button>
                Login
                <Icon>
                  <AiOutlineLogin />
                </Icon>
              </Button>
            </Link>
          )}
        </HStack>
      </HStack>
    </main>
  );
}
