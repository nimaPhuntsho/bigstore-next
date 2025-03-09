import {
  Heading,
  VStack,
  Text,
  HStack,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <VStack
        p="2rem"
        minH="100dvh"
        alignItems="center"
        justifyContent="center"
        gap="2rem"
      >
        <VStack>
          <Heading
            fontWeight={800}
            size={{
              base: "4xl",
              md: "5xl",
            }}
            textAlign="center"
          >
            Your one-stop shop for everything you love. Explore, shop, enjoy!
          </Heading>
          <Text fontWeight={400} textAlign="center">
            Discover the perfect products just for you. Shop now and find what
            you’ve been looking for
          </Text>
        </VStack>
        <Link href="/listings">
          <Button
            _active={{
              bgColor: "#F7F7F7",
              color: "black",
              transform: "scale(0.95)",
            }}
            transition="all .1s ease-in-out"
            fontWeight={700}
            size="lg"
          >
            Get Started
          </Button>
        </Link>
        <Box>
          <Image
            src="/images/landing-img.png"
            width={700}
            height={700}
            alt="landing image"
          />
        </Box>
      </VStack>
    </>
  );
}
