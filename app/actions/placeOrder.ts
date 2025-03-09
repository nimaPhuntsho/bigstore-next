"use server";
import { CartItemType } from "@/app/store /cart";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/supabaseServer";

export async function placeOrder(order: CartItemType[]): Promise<{
  success: boolean;
  message: string | null;
  data: number | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  // if the user is in the database but not logged in
  if (!data.user) {
    redirect("/login?callbackUrl=/cart");
    return { success: false, message: "Redirecting to login", data: null };
  }
  const { data: orderData, error: errorData } = await supabase
    .from("orders")
    .insert({
      user_id: data.user.id,
    })
    .select();

  if (!orderData)
    return {
      success: false as const,
      message: errorData.message,
      data: null,
    };

  const cartItems = order.map((item) => {
    return {
      product_id: item.id,
      order_id: orderData[0].order_id,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    };
  });

  const { data: cartData, error: cartError } = await supabase
    .from("order_items")
    .insert(cartItems)
    .select();
  if (!cartData)
    return {
      success: false as const,
      message: cartError.message,
      data: null,
    };

  console.log(cartError);
  return {
    success: true as const,
    message: "Items added",
    data: cartData[0].order_id,
  };
}
