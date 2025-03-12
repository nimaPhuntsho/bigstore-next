import { Heading, HStack, Icon, VStack } from "@chakra-ui/react";

import Link from "next/link";
import React from "react";

const NewLogo = () => {
  return (
    <HStack>
      <Link href="/">
        <VStack>
          <Heading fontWeight={900}>bigstore.</Heading>
        </VStack>
      </Link>
    </HStack>
  );
};

export default NewLogo;
