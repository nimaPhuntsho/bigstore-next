import { OrderStatusState } from "./schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import z from "zod";

export const useOrderStatus = create<OrderStatusState>()(
  persist(
    (set) => ({
      orderStatus: undefined,
      updateOrder(status) {
        set((state) => ({ ...state, orderStatus: status }));
      },
    }),
    { name: "order" }
  )
);
