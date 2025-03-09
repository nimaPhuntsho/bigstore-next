import { CartItemType } from "@/app/store /cart";

export interface OrderStatus {
  orderId: number;
  userId: string;
  items: CartItemType[];
}
export interface OrderStatusState {
  orderStatus?: OrderStatus;
  updateOrder: (status: OrderStatus) => void;
}
