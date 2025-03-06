"use client";

import React from "react";
import TButton from "./SignOutBtn";
import { Button, Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import { signOut } from "@/app/actions/auth";
import { PiSignOut } from "react-icons/pi";
import OrderCard, { Order } from "./OrderCard";
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
      <VStack>
        {/* <HStack width="90%" justifyContent={"space-between"}>
          <p>Welcome! {userName} </p>
          <Button size="xs" onClick={() => signOut()}>
            Sign out
            <Icon>
              <PiSignOut />
            </Icon>
          </Button>
        </HStack> */}
        <VStack
          padding={"1rem"}
          alignItems="start"
          justifyContent="start"
          width={"100%"}
        >
          <Heading>Recent order/s</Heading>
          <OrderCard order={order} />
        </VStack>
      </VStack>
    </>
  );
};

export default Dashboard;
