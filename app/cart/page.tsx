import CartPage from "@/components/custom/CartPage";
import { createClient } from "../supabase/supabaseServer";
import { VStack } from "@chakra-ui/react";

export const generateMetadata = async () => {
  return {
    title: "Cart",
    description: "Cart to manage orders",
  };
};

export default async function Cart() {
  const supabase = await createClient();

  return (
    <>
      <VStack minHeight="100dvh">
        <CartPage />
      </VStack>
    </>
  );
}
