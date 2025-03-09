import { redirect } from "next/navigation";

import { Metadata } from "next";
import { createClient } from "@/app/supabase/supabaseServer";
import { Box, Heading, VStack } from "@chakra-ui/react";
import UserTabs from "@/components/custom/UserTabs";

interface Props {
  params: Promise<{ userId: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const userId = (await params).userId;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data.first_name)
    return {
      title: "Bigstore",
      description: "Cart to manage orders",
    };

  return {
    title: data.first_name,
    description: "Cart to manage orders",
  };
};

export default async function DashboardPage({ params }: Props) {
  const { userId } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
    return;
  }

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

  const mappedOrder = order.data.flatMap((item) => {
    return {
      orderId: item.order_id,
      createdAt: item.created_at,
      items: item.order_items,
    };
  });

  return (
    <>
      <VStack
        w={{
          base: "100%",
        }}
        alignItems={{
          base: "stretch",
          md: "start",
        }}
        minH="100dvh"
        p="0 1rem"
      >
        <VStack alignItems="start">
          <Heading size="4xl"> Welcome! {user.data.first_name} </Heading>
          <UserTabs order={mappedOrder} userId={user.data.user_id} />
        </VStack>
      </VStack>
    </>
  );
}
