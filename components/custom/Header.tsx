import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import Cart from "./Cart";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import NewLogo from "./NewLogo";
import { AiOutlineLogin } from "react-icons/ai";
import { createClient } from "@/app/supabase/supabaseServer";
import SignOutBtn from "./SignOutBtn";

import AuthUser from "./AuthUser";

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

export default async function () {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data || !data.user) {
    // console.log(error);
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
        <HStack gap="1rem" justifyContent="center" alignItems="center">
          <Link href="/listings">
            <Heading size="md"> Products </Heading>
          </Link>
          <Link href="/contact">
            <Heading size="md"> Contact </Heading>
          </Link>
          <Link href="/dashboard">
            <Heading size="md"> Account </Heading>
          </Link>
        </HStack>
        <HStack>
          <Link href="/cart">
            <Cart />
          </Link>
          {user ? (
            <HStack>
              <AuthUser userName={user.data.first_name} />
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
