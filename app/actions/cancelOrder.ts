"use server";

import { Order } from "./../../components/custom/OrderCard";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/supabaseServer";

export async function cancelOrder(orderId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user)
    return {
      success: false as const,
      message: "user not logged in",
      data: null,
    };

  console.log(orderId);

  const { data: firstDeletion, error: firstDeletionError } = await supabase
    .from("order_items")
    .delete()
    .eq("order_id", orderId);

  if (firstDeletionError)
    return {
      success: false as const,
      message: "there was problem canceling the order",
      data: firstDeletionError,
    };

  const { data: finalDeletion, error: finalDeletionError } = await supabase
    .from("orders")
    .delete()
    .eq("order_id", orderId);

  if (finalDeletionError)
    return {
      success: false as const,
      message: "there was problem canceling the order",
      data: finalDeletionError,
    };

  revalidatePath("/dashboard");

  return {
    success: true as const,
    message: "order cancelation was success",
    data: finalDeletion,
  };
}
