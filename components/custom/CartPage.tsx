"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Table,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import QuantityCounter from "@/components/custom/QuantityCounter";
import { useCartStore } from "@/app/store /cart";
import { placeOrder } from "@/app/actions/placeOrder";
import { useOrderStatus } from "@/app/store /order-status/orderStatus";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { items, increment, decrement, remove, reset } = useCartStore();
  const { updateOrder, orderStatus } = useOrderStatus();
  const router = useRouter();

  const [placingOrder, setPlacingOrder] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(0);

  return (
    <>
      {items.length >= 1 ? (
        <VStack justifyContent="center" paddingTop="1rem">
          <Box width="80%">
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Sl no</Table.ColumnHeader>
                  <Table.ColumnHeader>Item</Table.ColumnHeader>
                  <Table.ColumnHeader>Price</Table.ColumnHeader>
                  <Table.ColumnHeader>Quantity</Table.ColumnHeader>
                  <Table.ColumnHeader>Total</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {items.map((item, index) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{index + 1} </Table.Cell>
                    <Table.Cell>{item.title} </Table.Cell>
                    <Table.Cell>{item.price} </Table.Cell>
                    <Table.Cell>
                      <QuantityCounter
                        onIncrement={() => increment(item)}
                        onDecrement={() => decrement(item)}
                        quantity={item.quantity}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {(item.price * item.quantity).toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>
                      <Text
                        onClick={() => {
                          remove(item);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        Remove
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
            <HStack>
              <Heading size="md">Total</Heading>
              <Text fontWeight="bolder">
                $
                {items
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator + currentValue.price * currentValue.quantity
                    );
                  }, 0)
                  .toFixed(2)}
              </Text>
            </HStack>
          </Box>
          <Button
            variant="surface"
            onClick={async () => {
              setPlacingOrder(true);
              const response = await placeOrder(items);
              if (!response.data) return;
              if (response.success) {
                setPlacingOrder(false);
                setSuccess(true);
                setOrderId(response.data);
                updateOrder({
                  orderId: response.data,
                  userId: "test",
                  items: items,
                });
                reset();
                router.push("/order-status");
              }
            }}
          >
            Looks good! Place order {placingOrder && <Spinner />}
          </Button>
        </VStack>
      ) : (
        "cart empty"
      )}
    </>
  );
};

export default Cart;
