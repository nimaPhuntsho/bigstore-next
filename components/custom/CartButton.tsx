"use client";
import { ProductSchemaType } from "@/app/api/v1/orders/orderSchema";
import { useCartStore } from "@/app/store /cart";
import { Button, Card } from "@chakra-ui/react";
import { BiSolidCart } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

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
        _active={{
          bgColor: "black",
          color: "white",
          transform: "scale(0.95)",
        }}
        onClick={() => {
          add(products);
        }}
      >
        <BiSolidCart />
      </Button>
    ) : (
      <Button
        _active={{
          bgColor: "black",
          color: "white",
          transform: "scale(0.95)",
        }}
        variant="outline"
        onClick={() => {
          remove(products);
        }}
      >
        <MdDeleteOutline />
      </Button>
    );
  };

  return <>{renderButton()}</>;
}
