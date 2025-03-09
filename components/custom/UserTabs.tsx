import React from "react";
import { Heading, Tabs, VStack, Text, Button } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import EmptyCart from "./EmptyCart";
import UserProfile from "./UserProfile";
import OrderCard, { Order } from "./OrderCard";

interface Props {
  order: {
    createdAt: string | null;
    items: Order[];
    orderId: number;
  }[];
  userId: string;
}

const UserTabs = ({ order, userId }: Props) => {
  return (
    <Tabs.Root defaultValue="profile" w="100%">
      <Tabs.List>
        <Tabs.Trigger value="profile">
          <LuUser />
          Profile
        </Tabs.Trigger>
        <Tabs.Trigger value="orders">
          <LuFolder />
          Orders
        </Tabs.Trigger>
        <Tabs.Trigger value="setting">
          <LuSquareCheck />
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="profile">
        <UserProfile userId={userId} />
      </Tabs.Content>

      <Tabs.Content value="orders">
        <VStack
          width="100%"
          alignItems="start"
          justifyContent="center"
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
      </Tabs.Content>
      <Tabs.Content value="setting">
        <VStack gap="1rem" alignItems="start">
          <VStack gap={0} alignItems="start">
            <Heading>Delete account</Heading>
            <Text>
              You can delete your account if you dont have any pending order/s
            </Text>
          </VStack>
          <Button>Delete account</Button>
        </VStack>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default UserTabs;
