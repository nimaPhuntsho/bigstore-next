import { Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import { IoMdCube } from "react-icons/io";

import Link from "next/link";
import React from "react";

const NewLogo = () => {
  return (
    <HStack>
      <Link href="/">
        <HStack>
          <IoMdCube />
          <Heading size="2xl" fontWeight={900}>
            bigstore.
          </Heading>
        </HStack>
      </Link>
    </HStack>
  );
};

export default NewLogo;
