import { ProductSchema } from "./../api/v1/products/schema";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemType extends z.infer<typeof ProductSchema> {
  quantity: number;
}

type CartType = {
  items: CartItemType[];
  add: (product: z.infer<typeof ProductSchema>) => void;
  remove: (product: z.infer<typeof ProductSchema>) => void;
  increment: (product: CartItemType) => void;
  decrement: (product: CartItemType) => void;
  reset: () => void;
};

export const useCartStore = create<CartType>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) => {
        set((state) => ({
          ...state,
          items: [...state.items, { ...product, quantity: 1 }],
        }));
      },

      remove: (product) => {
        set((state) => ({
          ...state,
          items: state.items.filter((item) => item.id !== product.id),
        }));
      },
      increment: (product) => {
        set((state) => ({
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },
      decrement: (product) => {
        set((state) => ({
          ...state,
          items: state.items.map((item) =>
            item.id === product.id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },
      reset: () => {
        set((state) => ({ ...state, items: [] }));
      },
    }),

    {
      name: "cart-items",
    }
  )
);
