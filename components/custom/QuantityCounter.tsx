"use client";

import { useCartStore } from "@/app/store /cart";
import { Button, HStack, Text, Icon, Flex } from "@chakra-ui/react";
import { IoIosRemove, IoMdAdd } from "react-icons/io";

interface Props {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityCounter = ({ quantity, onIncrement, onDecrement }: Props) => {
  return (
    <>
      <Flex
        direction={{
          base: "column-reverse",
          sm: "row",
        }}
        alignItems="center"
        gap=".5rem"
      >
        <Button onClick={() => onDecrement()} size="xs" variant="surface">
          <Icon>
            <IoIosRemove />
          </Icon>
        </Button>
        <Text> {quantity <= 9 ? `0${quantity}` : quantity} </Text>
        <Button onClick={() => onIncrement()} size="xs" variant="surface">
          <Icon>
            <IoMdAdd />
          </Icon>
        </Button>
      </Flex>
    </>
  );
};

export default QuantityCounter;
