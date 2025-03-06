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
        <Icon fontSize="lg">
          <BiSolidCart />
        </Icon>
        <Text>{items.length}</Text>
      </HStack>
    </>
  );
};

export default Cart;
