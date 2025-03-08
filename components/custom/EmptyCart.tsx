import { Heading, Icon, VStack, Text, HStack, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  title: string;
  content: string;
}

const EmptyCart = ({ title, content }: Props) => {
  return (
    <>
      <VStack width="100%" h="100dvh" alignItems="center">
        <Heading size="md"> {title} </Heading>
        <Image src="/cart.png" width={200} height={200} alt="cart" />
        <Text textAlign="center">{content}</Text>
        <Link href="/listings">
          <Button
            _active={{
              bgColor: "#F7F7F7",
              color: "black",
              transform: "scale(0.95)",
            }}
            transition="all .1s ease-in-out"
            fontWeight="bold"
          >
            Shop our products
          </Button>
        </Link>
      </VStack>
    </>
  );
};

export default EmptyCart;
