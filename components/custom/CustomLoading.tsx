import { Card, Text, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const CustomLoading = () => {
  return (
    <>
      <VStack alignItems="center" justifyContent="center" minH="100dvh">
        <Card.Root>
          <Card.Body>
            <VStack alignItems="center" justifyContent="center">
              <Spinner size="lg" />
              <Text fontWeight={700}>Loading ...</Text>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </>
  );
};

export default CustomLoading;
