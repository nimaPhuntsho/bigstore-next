"use client";
import { CartItemType, useCartStore } from "@/app/store /cart";
import React, { useState } from "react";
import QuantityCounter from "./QuantityCounter";
import { z } from "zod";
import { ProductSchema } from "@/app/api/v1/products/schema";
import { Button } from "@chakra-ui/react";

const ProductDetailCounter = ({
  product,
}: {
  product: z.infer<typeof ProductSchema>;
}) => {
  const { items, increment, decrement, add, remove } = useCartStore();
  const currentProduct = items.find((item) => item.id === product.id);

  const renderProductCounter = () => {
    if (!currentProduct)
      return <Button onClick={() => add({ ...product })}>Add to cart</Button>;

    return (
      <>
        <Button onClick={() => remove({ ...product })}>Remove</Button>
        <QuantityCounter
          quantity={currentProduct.quantity}
          onIncrement={() => increment(currentProduct)}
          onDecrement={() => decrement(currentProduct)}
        />
      </>
    );
  };

  return <>{renderProductCounter()}</>;
};

export default ProductDetailCounter;
