"use client";

import React from "react";
import TButton from "./SignOutBtn";
import { Button, Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import { signOut } from "@/app/actions/auth";
import { PiSignOut } from "react-icons/pi";
import OrderCard, { Order } from "./OrderCard";
import EmptyCart from "./EmptyCart";
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
      >
        <VStack
          alignItems="stretch"
          justifyContent="center"
          width="100%"
          padding="0 1rem"
        >
          <Heading>Recent order/s</Heading>
          {order.length < 1 ? (
            <EmptyCart
              title="You have no order"
              content="You have not ordered anything"
            />
          ) : (
            <OrderCard order={order} />
          )}
        </VStack>
      </VStack>
    </>
  );
};

export default Dashboard;
