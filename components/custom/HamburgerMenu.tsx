"use client";

import {
  Button,
  Flex,
  Icon,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const HamburgerMenu = () => {
  const { open, onToggle } = useDisclosure();
  return (
    <Flex>
      <Button variant="outline" onClick={onToggle} display={{ md: "none" }}>
        <Icon>{!open ? <GiHamburgerMenu /> : <IoMdClose />}</Icon>
      </Button>
      {open && (
        <VStack
          display={{ base: "flex", md: "none" }}
          position="absolute"
          top="100%"
          right="0"
          bgColor="#212121"
          width="100%"
          zIndex="1"
          color={"white"}
          alignItems="center"
          borderRadius="10px"
        >
          <Link onClick={onToggle} href="/listings">
            <Text padding=".5rem" fontWeight={600}>
              Products
            </Text>
          </Link>

          <Link onClick={onToggle} href="/contact">
            <Text padding=".5rem" fontWeight={600}>
              Contact
            </Text>
          </Link>
        </VStack>
      )}
    </Flex>
  );
};

export default HamburgerMenu;
