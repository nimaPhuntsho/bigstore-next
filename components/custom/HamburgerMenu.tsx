"use client";

import {
  Button,
  Flex,
  Icon,
  useDisclosure,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

interface Props {
  userId: string;
}

const HamburgerMenu = ({ userId }: Props) => {
  const { open, onToggle } = useDisclosure();
  return (
    <Flex>
      <Box display={{ md: "none" }}>
        {!open && <GiHamburgerMenu size={30} onClick={onToggle} />}
      </Box>

      {open && (
        <VStack
          display={{ base: "flex", md: "none" }}
          position="fixed"
          top="0"
          right="0"
          bgColor="#212121"
          w="100%"
          h="100%"
          zIndex="1"
          color={"white"}
          alignItems="stretch"
          overflow="hidden"
          gap="1rem"
          p="2rem"
          justifyContent="space-between"
        >
          <VStack alignItems="stretch">
            <Box alignSelf="end">
              {open && <IoMdClose size={30} onClick={onToggle} />}
            </Box>
            <Link onClick={onToggle} href="/listings">
              <Text
                _active={{
                  textDecoration: "underline",
                }}
                fontSize="4xl"
                alignSelf="start"
                padding=".5rem"
              >
                Products
              </Text>
            </Link>
            <Link onClick={onToggle} href="/contact">
              <Text
                _active={{
                  textDecoration: "underline",
                }}
                fontSize="4xl"
                alignSelf="start"
                padding=".5rem"
              >
                Contact
              </Text>
            </Link>
            <Link onClick={onToggle} href={`/dashboard/${userId}`}>
              <Text
                _active={{
                  textDecoration: "underline",
                }}
                fontSize="4xl"
                alignSelf="start"
                padding=".5rem"
              >
                Account
              </Text>
            </Link>
          </VStack>
          <Link href="/login">
            <Button
              variant="outline"
              colorPalette="red"
              fontWeight={800}
              size="xl"
              onClick={onToggle}
            >
              Login
            </Button>
          </Link>
        </VStack>
      )}
    </Flex>
  );
};

export default HamburgerMenu;
