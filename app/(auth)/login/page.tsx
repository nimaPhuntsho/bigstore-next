import { createClient } from "@/app/supabase/supabaseServer";
import LoginForm from "@/components/custom/LoginForm";
import { Box, VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function Login() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) redirect("/dashboard");

  return (
    <>
      <VStack position="relative">
        <VStack
          bgImage="url('/images/login-bg.jpg')"
          bgSize="cover"
          bgRepeat="no-repeat"
          width="100%"
          height="50dvh"
        ></VStack>
        <VStack height="50dvh"></VStack>
        <Box position="absolute" top={0}>
          <LoginForm />
        </Box>
      </VStack>
    </>
  );
}
