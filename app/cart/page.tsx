import CartPage from "@/components/custom/CartPage";
import { createClient } from "../supabase/supabaseServer";
import { redirect } from "next/navigation";
import { VStack } from "@chakra-ui/react";

export default async function Cart() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <VStack>
        <VStack
          width={{
            base: "90%",
            sm: "500px",
          }}
        >
          <CartPage />
        </VStack>
      </VStack>
    </>
  );
}
