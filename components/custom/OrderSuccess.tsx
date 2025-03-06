import React from "react";

interface Props {
  orderId: number;
}

const OrderSuccess = ({ orderId }: Props) => {
  return (
    <>
      <h1>Your order was successfully placed</h1>
      <p>Order details</p>
      <p> Order ID {orderId} </p>
    </>
  );
};

export default OrderSuccess;
