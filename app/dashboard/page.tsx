import { redirect, useRouter } from "next/navigation";

import { createClient } from "../supabase/supabaseServer";
import TButton from "@/components/custom/SignOutBtn";
import Dashboard from "@/components/custom/Dashboard";
import { revalidatePath } from "next/cache";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");

  const user = await supabase
    .from("users")
    .select("*")
    .eq("user_id", data.user.id)
    .single();

  if (!user.data || !user.data.first_name) return;

  const order = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user.data.user_id);

  if (!order || !order.data) return <p>No data</p>;

  // console.log(order);

  const mappedOrder = order.data.flatMap((item) => {
    return {
      orderId: item.order_id,
      createdAt: item.created_at,
      items: item.order_items,
    };
  });

  return (
    <>{<Dashboard userName={user.data.first_name} order={mappedOrder} />}</>
  );
}
