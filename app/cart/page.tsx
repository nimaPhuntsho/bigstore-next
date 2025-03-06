import CartPage from "@/components/custom/CartPage";
import { createClient } from "../supabase/supabaseServer";
import { redirect } from "next/navigation";

export default async function () {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  return <CartPage />;
}
