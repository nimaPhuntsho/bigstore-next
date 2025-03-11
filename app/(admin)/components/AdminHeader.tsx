import { Heading, HStack } from "@chakra-ui/react";
import React from "react";

const AdminHeader = () => {
  return (
    <>
      <HStack p="1rem" bgColor="#1A1A1D" color="white">
        <Heading fontWeight={900} size="2xl">
          Bigstore
        </Heading>
      </HStack>
    </>
  );
};

export default AdminHeader;
