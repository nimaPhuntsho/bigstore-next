import { createClient } from "@/app/supabase/supabaseServer";
import LoginForm from "@/components/custom/LoginForm";
import { Box, VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Login() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect(`/dashboard/${data.user.id}`);
  }

  return (
    <>
      <VStack position="relative">
        <LoginForm />
      </VStack>
    </>
  );
}
