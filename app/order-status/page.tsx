import OrderStatus from "@/components/custom/OrderStatus";
import { createClient } from "../supabase/supabaseServer";

export default async function Orderstatus() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data.user) return;

  //   const { data: userData } = await supabase
  //     .from("orders")
  //     .select("*, order_items(*)")
  //     .eq("user_id", data.user.id);

  //   if (!userData) return;

  //   userData.forEach((order) => {
  //     console.log(`Order ID: ${order.order_id}`);
  //     console.log("Order Items:", order.order_items);
  //   });

  return (
    <>
      <OrderStatus />
    </>
  );
}
