"use client";

import { useCartStore } from "@/app/store /cart";
import { Button, HStack, Text, Icon } from "@chakra-ui/react";
import { IoIosRemove, IoMdAdd } from "react-icons/io";

interface Props {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityCounter = ({ quantity, onIncrement, onDecrement }: Props) => {
  return (
    <>
      <HStack>
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
      </HStack>
    </>
  );
};

export default QuantityCounter;
