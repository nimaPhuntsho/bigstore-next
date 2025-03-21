import { Heading, VStack, Text, HStack, Icon, Box } from "@chakra-ui/react";
import React from "react";

import { Noto_Sans } from "next/font/google";
import Image from "next/image";

const roboto = Noto_Sans({
  weight: "500",
  subsets: ["latin"],
});

const About = () => {
  const techStack = [
    {
      tech: "Next.js",
      description:
        "For building the frontend and backend with a fast, scalable React framework.",
    },
    {
      tech: "Supabase",
      description: "Used as the database and authentication provider.",
    },
    {
      tech: "Chakra UI",
      description: "For a modern, responsive, and accessible UI design.",
    },
    {
      tech: "Authentication",
      description:
        "User authentication and password reset functionality powered by Supabase Auth.",
    },
    {
      tech: "MailerSend",
      description:
        "Integrated for email services, including order confirmations and password reset emails.",
    },
    {
      tech: "JSONPlaceholder",
      description: "Used for fetching placeholder data in the app.",
    },
  ];
  return (
    <>
      <VStack
        bgImage="url('/images/about-bg.jpg')"
        bgSize="cover"
        height="50dvh"
        gap={0}
        bgPos="center"
        justifyContent="end"
        alignItems="end"
        color="white"
      >
        <Heading p={16} size="5xl" fontWeight={900}>
          ABOUT THE
          <span style={{ color: "#BF3131", textDecoration: "underline" }}>
            WEBSITE
          </span>
        </Heading>
      </VStack>
      <VStack
        bgColor="black"
        p={{
          base: "2rem",
          md: "4rem",
        }}
        justifyContent="center"
        gap="1rem"
        color="white"
      >
        <VStack alignItems="start" maxW={600}>
          <VStack alignItems="start">
            <Heading size="lg" fontWeight={700}>
              About the website
            </Heading>
            <Text textAlign="justify">
              BigStore is a demo e-commerce website built as a side project to
              showcase my skills in Next.js, Supabase, Chakra UI, and more. It
              features a list of products fetched from JSONPlaceholder, a cart
              system where users can add, delete, and update quantities, and an
              authentication system requiring users to sign up before placing
              orders. Upon ordering, users receive a confirmation email via
              MailerSend. They can also log in to manage their orders, including
              canceling them. This is a fake store—nothing is real, and its
              purely for demonstration purposes.
            </Text>
          </VStack>
          <VStack alignItems="start">
            <Heading size="lg" fontWeight={700}>
              Tech stack
            </Heading>
            <VStack gap="1rem" alignItems="start">
              {techStack.map((item, index) => (
                <VStack alignItems="start" key={item.tech}>
                  <Heading size="md">
                    {index + 1}. {item.tech}
                  </Heading>
                  <Text> {item.description} </Text>
                </VStack>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};

export default About;
