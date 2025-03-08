import { Heading, VStack, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <VStack>
        <VStack
          width={{
            base: "90%",
            sm: "500px",
          }}
          alignItems="center"
          justifyContent="center"
          height="100dvh"
        >
          <Heading fontWeight={800} textAlign="center">
            E-Commerce Website with Next.js & Supabase
          </Heading>
          <Text textAlign="justify">
            Built a full-featured e-commerce platform with Next.js and Supabase,
            featuring secure authentication, password reset, order management,
            and a seamless shopping experience.
          </Text>
        </VStack>
      </VStack>
    </>
  );
}
