import { Heading, HStack, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { SiPrestashop } from "react-icons/si";

const Logo = () => {
  return (
    <HStack>
      <Link href="/">
        <HStack>
          <Icon>
            <SiPrestashop></SiPrestashop>
          </Icon>
          <Heading fontWeight="900">BIGSTORE</Heading>
        </HStack>
      </Link>
    </HStack>
  );
};

export default Logo;
