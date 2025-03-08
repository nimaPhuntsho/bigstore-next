"use client";

import React, { useState } from "react";
import {
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Spinner,
  Card,
  Grid,
  Icon,
  Box,
} from "@chakra-ui/react";
import QuantityCounter from "@/components/custom/QuantityCounter";
import { CartItemType, useCartStore } from "@/app/store /cart";
import { placeOrder } from "@/app/actions/placeOrder";
import { useOrderStatus } from "@/app/store /order-status/orderStatus";
import { useRouter } from "next/navigation";
import EmptyCart from "./EmptyCart";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";

const Cart = () => {
  const { items, increment, decrement, remove, reset } = useCartStore();
  const { updateOrder, orderStatus } = useOrderStatus();
  const router = useRouter();

  const [orderState, setOrderState] = useState<{
    loading: boolean;
    success: boolean;
    error: boolean;
  }>({
    loading: false,
    success: false,
    error: true,
  });

  const handlePlaceOrder = async (items: CartItemType[]) => {
    try {
      setOrderState((state) => ({ ...state, loading: true }));
      const response = await placeOrder(items);
      if (!response.data) return;
      if (response.success) {
        updateOrder({
          orderId: response.data,
          userId: "test",
          items: items,
        });
        reset();
        setOrderState((state) => ({ ...state, loading: false }));
        router.push("/order-status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <VStack
        width={{
          base: "90%",
          sm: "500px",
        }}
        justifyContent="center"
        paddingTop="1rem"
      >
        {items.length >= 1 ? (
          <Card.Root w="100%">
            <Card.Header>
              <Heading fontWeight="700">Your cart</Heading>
            </Card.Header>
            <Card.Body>
              <VStack alignItems="stretch" gap=".5rem">
                {items.map((item, index) => (
                  <Grid
                    key={item.id}
                    templateColumns="repeat(3, 30% 50% 20%)"
                    alignItems="start"
                    bgColor="rgb(249, 242, 242)"
                    borderRadius="10px"
                    p="1rem"
                  >
                    {/* <VStack alignItems="start">
                      <Text fontWeight="500">
                        {index + 1}. {item.title}
                      </Text>
                      <Text fontWeight="900">$ {item.price} </Text>
                    </VStack>
                    <QuantityCounter
                      onIncrement={() => increment(item)}
                      onDecrement={() => decrement(item)}
                      quantity={item.quantity}
                    />
                    <Text justifySelf="end">
                      $ {(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <Text
                      justifySelf="end"
                      onClick={() => {
                        remove(item);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <Icon>
                        <RiDeleteBin6Line />
                      </Icon>
                    </Text> */}

                    <Image
                      src={item.thumbnail}
                      width={60}
                      height={60}
                      alt={item.title}
                    />

                    <VStack alignItems="start">
                      <Text fontWeight={600}> {item.title} </Text>
                      <Text>$ {item.price} </Text>
                    </VStack>
                    <Box justifySelf="end">
                      <QuantityCounter
                        onIncrement={() => increment(item)}
                        onDecrement={() => decrement(item)}
                        quantity={item.quantity}
                      />
                    </Box>
                  </Grid>
                ))}
              </VStack>
            </Card.Body>
            <Card.Footer>
              <VStack width="100%" alignItems="stretch">
                <HStack justifyContent="space-between">
                  <Text fontWeight="bolder">Total</Text>
                  <Text fontWeight="bolder">
                    $
                    {items
                      .reduce((accumulator, currentValue) => {
                        return (
                          accumulator +
                          currentValue.price * currentValue.quantity
                        );
                      }, 0)
                      .toFixed(2)}
                  </Text>
                </HStack>
                <Button
                  _active={{
                    bgColor: "#F7F7F7",
                    color: "black",
                    transform: "scale(0.95)",
                  }}
                  transition="all .1s ease-in-out"
                  fontWeight="bold"
                  onClick={() => handlePlaceOrder(items)}
                >
                  Check out {orderState.loading && <Spinner />}
                </Button>
              </VStack>
            </Card.Footer>
          </Card.Root>
        ) : (
          <EmptyCart
            title="Your cart is empty"
            content="Looks like you have not added anything to your cart."
          />
        )}
      </VStack>
    </>
  );
};

export default Cart;
