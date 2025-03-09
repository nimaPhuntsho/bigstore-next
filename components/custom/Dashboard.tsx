"use client";

import React from "react";
import { Button, Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import { Order } from "./OrderCard";

interface Props {
  userName: string;
  order: {
    createdAt: string | null;
    items: Order[];
    orderId: number;
  }[];
}

const Dashboard = ({ userName, order }: Props) => {
  return (
    <>
      <VStack
        width={{
          base: "100%",
        }}
        alignItems="start"
      >
        <VStack alignItems="start">
          <Heading size="4xl"> Welcome! {userName} </Heading>
        </VStack>
      </VStack>
    </>
  );
};

export default Dashboard;
