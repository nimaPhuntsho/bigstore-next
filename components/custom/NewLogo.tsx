import { Heading, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { SiPrestashop } from "react-icons/si";

const Logo = () => {
  return (
    <HStack>
      <Icon>
        <SiPrestashop></SiPrestashop>
      </Icon>
      <Heading fontWeight="900">BIGSTORE</Heading>
    </HStack>
  );
};

export default Logo;
