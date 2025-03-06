import { CartItemType } from "@/app/store /cart";
import z from "zod";

// export const orderStatus = z.object({
//   orderId: z.number(),
//   userId: z.string(),
//   items: CartItemType,
// });

export interface OrderStatus {
  orderId: number;
  userId: string;
  items: CartItemType[];
}

// export type OrderStatusType = z.infer<typeof orderStatus>;

export interface OrderStatusState {
  orderStatus?: OrderStatus;
  updateOrder: (status: OrderStatus) => void;
}
