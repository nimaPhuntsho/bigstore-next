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
} from "@chakra-ui/react";
import QuantityCounter from "@/components/custom/QuantityCounter";
import { CartItemType, useCartStore } from "@/app/store /cart";
import { placeOrder } from "@/app/actions/placeOrder";
import { useOrderStatus } from "@/app/store /order-status/orderStatus";
import { useRouter } from "next/navigation";
import EmptyCart from "./EmptyCart";
import { RiDeleteBin6Line } from "react-icons/ri";

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
        router.push("/order-status");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOrderState((state) => ({ ...state, loading: false }));
    }
  };

  return (
    <>
      {items.length >= 1 ? (
        <VStack justifyContent="center" paddingTop="1rem">
          <Card.Root>
            <Card.Header>
              <Heading fontWeight="700">Your cart</Heading>
            </Card.Header>
            <Card.Body>
              <VStack alignItems="stretch" gap="1rem">
                {items.map((item, index) => (
                  <VStack key={item.id} alignItems="stretch">
                    <Card.Root>
                      <Card.Body>
                        <Grid
                          templateColumns="40% 25% 25% 10%"
                          alignItems="start"
                        >
                          <VStack alignItems="start">
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
                          </Text>
                        </Grid>
                      </Card.Body>
                    </Card.Root>
                  </VStack>
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
                <Button onClick={() => handlePlaceOrder(items)}>
                  Check out {orderState.loading && <Spinner />}
                </Button>
              </VStack>
            </Card.Footer>
          </Card.Root>
        </VStack>
      ) : (
        <EmptyCart
          title="Your cart is empty"
          content="Looks like you have not added anything to your cart."
        />
      )}
    </>
  );
};

export default Cart;
