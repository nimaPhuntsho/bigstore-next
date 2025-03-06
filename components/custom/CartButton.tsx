"use client";
import { ProductSchemaType } from "@/app/api/v1/orders/orderSchema";
import { useCartStore } from "@/app/store /cart";
import { Button, Card } from "@chakra-ui/react";
import { useEffect } from "react";

interface Props {
  products: ProductSchemaType;
}

export default function CartButton({ products }: Props) {
  const { add, items, remove } = useCartStore();

  const productExists = (product: ProductSchemaType) =>
    items.find((item) => item.id === product.id);

  const renderButton = () => {
    return !productExists(products) ? (
      <Button
        variant="surface"
        onClick={() => {
          add(products);
        }}
      >
        Add
      </Button>
    ) : (
      <Button
        variant="surface"
        onClick={() => {
          remove(products);
        }}
      >
        Remove
      </Button>
    );
  };

  return <>{renderButton()}</>;
}
