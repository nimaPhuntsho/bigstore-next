"use client";
import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import NewLogo from "./NewLogo";
import Link from "next/link";
import AuthUser from "./AuthUser";
import HamburgerMenu from "./HamburgerMenu";
import { AiOutlineLogin } from "react-icons/ai";
import Cart from "./Cart";
import { usePathname } from "next/navigation";
interface Props {
  userName?: string;
}

const MainHeader = ({ userName }: Props) => {
  const pathName = usePathname();

  return (
    <main>
      {userName ? (
        <HStack
          position="relative"
          padding="1rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <NewLogo />
          <HStack display={{ base: "none", md: "flex" }}>
            <Link href="/listings">
              <Text fontWeight={pathName === "/listings" ? "900" : "700"}>
                Products
              </Text>
            </Link>
            <Link href="/contact">
              <Text fontWeight={pathName === "/contact" ? "900" : "700"}>
                Contact
              </Text>
            </Link>
            <Link href="/dashboard">
              <Text fontWeight={pathName === "/dashboard" ? "900" : "700"}>
                Account
              </Text>
            </Link>
          </HStack>
          <HStack>
            <Link href="/cart">
              <Cart />
            </Link>
            {userName ? (
              <HStack>
                <AuthUser userName={userName} />
                <HamburgerMenu />
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
      ) : (
        <main>
          <HStack
            position="relative"
            justifyContent="space-between"
            padding="1rem"
          >
            <NewLogo />
            <HStack display={{ base: "none", md: "flex" }}>
              <Link href="/listings">
                <Text fontWeight={pathName === "/listings" ? "900" : "700"}>
                  Products
                </Text>
              </Link>
              <Link href="/contact">
                <Text fontWeight={pathName === "/contact" ? "900" : "700"}>
                  Contact
                </Text>
              </Link>
              <Link href="/dashboard">
                <Text fontWeight={pathName === "/dashboard" ? "900" : "700"}>
                  Account
                </Text>
              </Link>
            </HStack>
            <HStack gap="1rem">
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
      )}
    </main>
  );
};

export default MainHeader;
