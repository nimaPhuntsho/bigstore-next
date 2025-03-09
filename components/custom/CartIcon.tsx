"use client";
import React, { useEffect } from "react";
import { Icon, HStack, Text, Heading, Button } from "@chakra-ui/react";
import { CiShoppingCart } from "react-icons/ci";
import { useCartStore } from "@/app/store /cart";
import { BiSolidCart } from "react-icons/bi";

const Cart = () => {
  const { items } = useCartStore();

  return (
    <>
      <HStack>
        <Button
          _active={{
            bgColor: "black",
            color: "white",
            transform: "scale(0.95)",
          }}
          transition="all .1s ease-in-out"
          fontWeight="bold"
          variant="outline"
        >
          <Icon fontSize="lg">
            <BiSolidCart />
          </Icon>
          <Text>{items.length}</Text>
        </Button>
      </HStack>
    </>
  );
};

export default Cart;
