import { HStack, VStack, Text, Box, Card } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@/components/ui/avatar";

interface Props {
  reviewerName: string;
  src?: string;
  reviewerEmail: string;
  comment: string;
  date: string;
  rating: number;
}

const Review = ({ comment, date, reviewerName, reviewerEmail }: Props) => {
  return (
    <>
      <Card.Root width={"100%"}>
        <Card.Body>
          <VStack width="100%" alignItems="flex-start">
            <HStack>
              <Avatar name={reviewerName} src={"src"} />
              <Box>
                <Text fontWeight={650}>{reviewerName}</Text>
                <Text fontSize={".9rem"}> {reviewerEmail} </Text>
              </Box>
            </HStack>
            <Text>{comment}</Text>
            <Text color={"grey"} fontSize={".9rem"}>
              {new Date(date).toLocaleString()}
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default Review;
