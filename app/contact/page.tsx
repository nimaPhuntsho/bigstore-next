import ContactForm from "@/components/custom/ContactForm";
import { Box, Grid, VStack } from "@chakra-ui/react";

export const generateMetadata = async () => {
  return {
    title: "Contact",
    description: "contact form to send querries to Bigstore",
  };
};

export default async function Contact() {
  return (
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
        <ContactForm />
      </Box>
    </VStack>
  );
}
