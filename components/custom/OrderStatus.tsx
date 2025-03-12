"use client";
import { CartItemType, useCartStore } from "@/app/store /cart";
import { useOrderStatus } from "@/app/store /order-status/orderStatus";
import {
  Heading,
  VStack,
  Text,
  Flex,
  Card,
  HStack,
  Grid,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  customerName: string;
}

const OrderStatus = ({ customerName }: Props) => {
  const { updateOrder, orderStatus } = useOrderStatus();
  if (!orderStatus)
    return (
      <p>
        There was error retrieving your order details, please contact our office
      </p>
    );

  const { items, orderId } = orderStatus;

  const calculateItemTotal = ({
    price,
    quantity,
  }: {
    price: number;
    quantity: number;
  }) => price * quantity;

  const getTotalOrder = (items: CartItemType[]) => {
    return items.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
  };

  return (
    <>
      <Flex
        w={{
          base: "90%",
        }}
        alignItems="start"
        direction={{
          base: "column",
          md: "row",
        }}
        justifyContent="space-between"
        gap="1rem"
        p="1rem"
        minHeight="100dvh"
        maxW="1500px"
      >
        <VStack flex={1} alignItems="stretch" gap="2rem">
          <Heading fontWeight={700} size="4xl">
            Thanking you {customerName} for shopping at BigStore!
          </Heading>
          <Text>
            Your order will be processed within 24 hours and we will notify you
            by email once your order has been shipped. Please contact us if you
            have any questions regarding your order.
          </Text>
          <Text fontWeight={600}>
            You’ll receive a confirmation email shortly regarding your order.{" "}
          </Text>
          <HStack>
            <Link href="/contact">
              <Button
                _active={{
                  bgColor: "#F7F7F7",
                  color: "black",
                  transform: "scale(0.95)",
                }}
                transition="all .1s ease-in-out"
                fontWeight="bold"
              >
                Contact us
              </Button>
            </Link>
            <Link href="/listings">
              <Button
                variant="surface"
                _active={{
                  bgColor: "#F7F7F7",
                  color: "black",
                  transform: "scale(0.95)",
                }}
                transition="all .1s ease-in-out"
                fontWeight="bold"
              >
                Continue shopping
              </Button>
            </Link>
          </HStack>
        </VStack>
        <VStack w="100%" flex={1} alignItems="start">
          <Heading size="lg"> Order Summary</Heading>
          <Card.Root w="100%">
            <Card.Body>
              <HStack justifyContent="space-between">
                <VStack alignItems="start">
                  <Heading>Date</Heading>
                  <Text> 24 May 2024 </Text>
                </VStack>

                <VStack alignItems="start">
                  <Heading>Order number</Heading>
                  <Text> {orderId} </Text>
                </VStack>
              </HStack>
            </Card.Body>
          </Card.Root>
          <Card.Root w="100%">
            <Card.Body>
              <VStack alignItems="start">
                {items.map((item, index) => (
                  <Grid w="100%" templateColumns="repeat(3, 1fr)" key={item.id}>
                    <Image
                      src={item.thumbnail}
                      width={50}
                      height={50}
                      alt={item.title}
                    />
                    <VStack alignItems="start" gap="1rem">
                      <Text fontWeight={600}> {item.title} </Text>
                      <VStack gap={0} alignItems="start">
                        <Text>$ {item.price}</Text>
                        <Text>Qty: {item.quantity} </Text>
                      </VStack>
                    </VStack>
                    <Text fontWeight={600} justifySelf="end">
                      ${" "}
                      {calculateItemTotal({
                        price: item.price,
                        quantity: item.quantity,
                      }).toFixed(2)}
                    </Text>
                  </Grid>
                ))}
              </VStack>
            </Card.Body>
            <Card.Footer>
              <HStack width="100%" justifyContent="space-between">
                <Text fontWeight={600}>ORDER TOTAL</Text>
                <Text fontWeight={600}>
                  $ {getTotalOrder(items).toFixed(2)}
                </Text>
              </HStack>
            </Card.Footer>
          </Card.Root>
        </VStack>
      </Flex>
    </>
  );
};

export default OrderStatus;
