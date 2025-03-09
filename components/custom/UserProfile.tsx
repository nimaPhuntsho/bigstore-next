import { createClient } from "@/app/supabase/supabaseServer";
import { Heading, Text, HStack, VStack, Box, Card } from "@chakra-ui/react";
import Image from "next/image";
import { readibleDate } from "@/app/util/date";

export default async function UserProfile({ userId }: { userId: string }) {
  const supabase = await createClient();

  const user = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  // console.log(user);

  if (!user.data) return <p> No user data found </p>;

  return (
    <>
      <Card.Root>
        <Card.Body>
          <VStack gap="2rem" alignItems="start">
            <HStack>
              <Box
                borderRadius="50%"
                bgColor="black"
                w={100}
                h={100}
                overflow="hidden"
              >
                <Image
                  src="/images/user-profile.jpg"
                  width={100}
                  height={100}
                  alt="profile"
                />
              </Box>

              <VStack gap={0} alignItems="start">
                <Heading>{`${user.data?.first_name}`}</Heading>
                <Heading
                  fontWeight={800}
                  size="3xl"
                >{`${user.data?.last_name?.toUpperCase()}`}</Heading>
                <Text fontSize=".9rem">Customer</Text>
              </VStack>
            </HStack>
            <VStack alignItems="start">
              <VStack gap={0} alignItems="start">
                <Heading fontWeight={600} size="md">
                  Email
                </Heading>
                <Text> {user.data?.email} </Text>
              </VStack>
              <VStack gap={0} alignItems="start">
                <Heading fontWeight={600} size="md">
                  Joined on
                </Heading>
                <Text> {readibleDate(user.data.created_at)} </Text>
              </VStack>
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </>
  );
}
