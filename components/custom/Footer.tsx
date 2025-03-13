import { Heading, VStack, Text, HStack, Icon, Flex } from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail, MdOutlineLocalPhone } from "react-icons/md";
import NewLogo from "./NewLogo";

export default async function Footer() {
  return (
    <>
      <Flex
        bgColor="rgb(32, 26, 26)"
        color="white"
        alignItems="start"
        width="100%"
        justifyContent="space-evenly"
        p={{
          base: "2rem",
          md: "4rem",
        }}
        direction={{
          base: "column",
          md: "row",
        }}
        gap={"2rem"}
      >
        <VStack alignItems="start">
          <NewLogo />
          <VStack alignItems="start">
            <HStack>
              <Icon>
                <IoLocationOutline />
              </Icon>
              <Text>123 Next level khi, Zhingkham, ZK 010</Text>
            </HStack>
            <HStack>
              <Icon>
                <MdOutlineMail />
              </Icon>
              <Text>nextlevelkhi@jotang.com</Text>
            </HStack>
            <HStack>
              <Icon>
                <MdOutlineLocalPhone />
              </Icon>
              <Text>0992883923</Text>
            </HStack>
          </VStack>
        </VStack>

        <VStack alignItems="start">
          <Text>Company</Text>
          <Text>Features</Text>
          <Text>Why BigStore</Text>
          <Text>Blog</Text>
          <Text>Testamonials</Text>
        </VStack>
        <VStack alignItems="start">
          <Text>Support</Text>
          <Text>Contact us</Text>
          <Text>Privacy Policy</Text>
          <Text>Billing</Text>
          <Text>Terms of service</Text>
        </VStack>
      </Flex>
    </>
  );
}
