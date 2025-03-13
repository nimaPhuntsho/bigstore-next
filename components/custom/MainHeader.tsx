"use client";
import { Box, Button, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import NewLogo from "./NewLogo";
import Link from "next/link";
import AuthUser from "./AuthUser";
import HamburgerMenu from "./HamburgerMenu";
import Cart from "./CartIcon";
import { HiLogout } from "react-icons/hi";
import { usePathname } from "next/navigation";
interface Props {
  userName: string;
  userId: string;
}

const MainHeader = ({ userName, userId }: Props) => {
  const pathName = usePathname();

  return (
    <main>
      {userName ? (
        <HStack
          padding="1rem"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          position="relative"
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

            <Link href="/about">
              <Text fontWeight={pathName === "/about" ? "900" : "700"}>
                About
              </Text>
            </Link>
          </HStack>
          <HStack gap={".3rem"}>
            <Link href="/cart">
              <Cart />
            </Link>
            {userName ? (
              <HStack>
                <AuthUser userName={userName} userId={userId} />
                <HamburgerMenu userId={userId} />
              </HStack>
            ) : (
              <Link href="/login">
                <Button>
                  Login
                  <Icon>
                    <HiLogout />
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
            width="100%"
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
              <Link href="/about">
                <Text fontWeight={pathName === "/about" ? "900" : "700"}>
                  About
                </Text>
              </Link>
            </HStack>
            <HStack gap=".3rem">
              <Link href="/cart">
                <Cart />
              </Link>
              <Box
                display={{
                  base: "none",
                  sm: "none",
                  md: "flex",
                }}
              >
                <Link href="/login">
                  <Button
                    _active={{
                      bgColor: "#F7F7F7",
                      color: "black",
                      transform: "scale(0.95)",
                    }}
                    transition="all .1s ease-in-out"
                    fontWeight="bold"
                  >
                    Login
                    <Icon>
                      <HiLogout />
                    </Icon>
                  </Button>
                </Link>
              </Box>
              <HamburgerMenu userId={userId} />
            </HStack>
          </HStack>
        </main>
      )}
    </main>
  );
};

export default MainHeader;
