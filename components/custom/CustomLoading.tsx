import { Card, Text, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const CustomLoading = () => {
  return (
    <>
      <VStack alignItems="center" justifyContent="center" minH="100dvh">
        <VStack alignItems="center" justifyContent="center">
          <Spinner size="lg" />
          <Text fontWeight={700}>Loading ...</Text>
        </VStack>
      </VStack>
    </>
  );
};

export default CustomLoading;
