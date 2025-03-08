import RegisterForm from "@/components/custom/RegisterForm";
import { Box, VStack } from "@chakra-ui/react";

export default async function Register() {
  return (
    <>
      <VStack position="relative">
        <VStack
          bgImage="url('/images/signup-bg.jpg')"
          bgSize="cover"
          bgRepeat="no-repeat"
          width="100%"
          height="50dvh"
        ></VStack>
        <VStack height="50dvh"></VStack>
        <Box width="100%" position="absolute" top={0}>
          <RegisterForm />
        </Box>
      </VStack>
    </>
  );
}
