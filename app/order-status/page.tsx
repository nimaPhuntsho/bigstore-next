import OrderStatus from "@/components/custom/OrderStatus";
import { createClient } from "../supabase/supabaseServer";
import { VStack } from "@chakra-ui/react";

export default async function Orderstatus() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data.user) return;

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", data.user.id)
    .single();

  if (!userData || !userData.first_name) return;

  return (
    <>
      <VStack alignItems="center">
        <OrderStatus customerName={userData.first_name.toUpperCase()} />
      </VStack>
    </>
  );
}
