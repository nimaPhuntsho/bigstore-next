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
      <VStack>
        <VStack
          width={{
            base: "80%",
            sm: "300px",
          }}
          alignItems="center"
        >
          <Heading size="md"> {title} </Heading>
          <Image src="/cart.png" width={200} height={200} alt="cart" />
          <Text textAlign="center">{content}</Text>
          <Link href="/listings">
            <Button>Shop our products</Button>
          </Link>
        </VStack>
      </VStack>
    </>
  );
};

export default EmptyCart;
