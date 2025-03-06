"use client";
import { useCartStore } from "@/app/store /cart";
import { useOrderStatus } from "@/app/store /order-status/orderStatus";
import { Heading, VStack } from "@chakra-ui/react";
import React from "react";

const OrderStatus = () => {
  const { updateOrder, orderStatus } = useOrderStatus();
  if (!orderStatus)
    return (
      <p>
        There was error retrieving your order details, please contact our office
      </p>
    );

  const { items, orderId } = orderStatus;

  return (
    <>
      <VStack alignItems={"center"}>
        <Heading>Thanking you for shopping at BigStore</Heading>
        <Heading>Order Confirmation</Heading>
        <Heading size={"lg"}> Order ID : {orderId}</Heading>
        <VStack alignItems={"start"}>
          {items.map((item, index) => (
            <p key={item.id}>
              {index + 1}. {item.brand}{" "}
            </p>
          ))}
        </VStack>
      </VStack>
    </>
  );
};

export default OrderStatus;
