"use client";
import { cancelOrder } from "@/app/actions/cancelOrder";
import { ItemSchema } from "@/app/api/v1/products/schema";
import { readibleDate } from "@/app/util/date";
import { callFetch } from "@/app/util/fetch";
import { Database } from "@/database.types";
import {
  Card,
  Heading,
  VStack,
  Text,
  HStack,
  Box,
  Button,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import z from "zod";

import { MdDeleteOutline } from "react-icons/md";
import CustomDialog from "./CustomDialog";

export type Order = Database["public"]["Tables"]["order_items"]["Insert"];
type ItemSchemaType = z.infer<typeof ItemSchema>;
type Product = Pick<ItemSchemaType, "products">;

interface Props {
  order: {
    items: Order[];
    createdAt: string | null;
    orderId: number;
  }[];
}

async function fetchProducts() {
  return await callFetch({
    endpoint: "https://dummyjson.com/products",
    method: "GET",
    schema: ItemSchema,
  });
}

function getProduct(productId: number, products: Product) {
  if (!products || !products.products) return;
  const temp = products.products.find((item) => item.id === productId);
  return temp;
}

function getTotal(order: Order[]) {
  const total = order.reduce((accumulator, element) => {
    return accumulator + element.price * element.quantity;
  }, 1);

  return total;
}

const OrderCard = ({ order }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [cancelingOrders, setCancelingOrders] = useState<
    Record<number, boolean>
  >({});
  useEffect(() => {
    if (!data || !data.data) return;
  }, [data]);

  if (!data || !data.data?.products) return;

  async function handleCancelOrder(orderId: number) {
    setCancelingOrders((state) => ({ ...state, [orderId]: true }));
    try {
      const response = await cancelOrder(orderId);
    } catch (error) {
      console.log(error);
    } finally {
      setCancelingOrders((state) => ({ ...state, [orderId]: false }));
    }

    return true;
  }

  return (
    <>
      {order.map((item) => (
        <Card.Root key={item.createdAt}>
          <Card.Body>
            <HStack alignItems="start" flexWrap="wrap" gap="2rem">
              <VStack flex={1} alignItems="start">
                <Heading>Order ID</Heading>
                <Text> {item.orderId} </Text>
              </VStack>
              <VStack flex={1} alignItems="start">
                <Heading>Date</Heading>
                <Text> {readibleDate(item.createdAt!.toString())} </Text>
              </VStack>

              <VStack flex={1} alignItems="start">
                <Heading>Total</Heading>
                <Text>{getTotal(item.items).toFixed(2)}</Text>
              </VStack>
            </HStack>
            <VStack width={"100%"} alignItems="start">
              <Heading>Item/s</Heading>
              {item.items.map((item) => {
                if (!data || !data.data?.products) return;
                const product = getProduct(item.product_id, data.data);

                if (!product) return;

                return (
                  <VStack
                    alignItems={"stretch"}
                    key={item.price}
                    width={"100%"}
                  >
                    <Box
                      bgColor={"lightblue"}
                      padding={".5rem"}
                      borderRadius={"10px"}
                      fontSize={".9rem"}
                      width={"100%"}
                    >
                      <Text fontWeight={"700"}>{product.brand}</Text>
                      <Text>$ {product.price}</Text>
                      <Text>Quantity : {item.quantity}</Text>
                    </Box>
                  </VStack>
                );
              })}
            </VStack>
          </Card.Body>
          <Card.Footer>
            {/* <Button
              variant={"solid"}
              onClick={() => {
                handleCancelOrder(item.orderId);
              }}
            >
              Cancel order
              {cancelingOrders[item.orderId] && <Spinner />}
              <Icon>
                <MdDeleteOutline />
              </Icon>
            </Button> */}
            <CustomDialog
              openDialogTitle="Cancel order"
              dialogTitle="Cancel confrimation"
              dialogBody="You are about to cancel your order"
              onCancel={async () => await handleCancelOrder(item.orderId)}
            />
          </Card.Footer>
        </Card.Root>
      ))}
    </>
  );
};

export default OrderCard;
