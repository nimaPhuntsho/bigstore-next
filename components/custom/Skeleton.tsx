import { Grid, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { SkeletonText, Skeleton } from "../ui/skeleton";

export default async function CustomSkeleton() {
  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)", // 1 column on mobile
          sm: "repeat(2, 1fr)", // 2 columns on small screens
          md: "repeat(3, 1fr)", // 3 columns on medium screens
          lg: "repeat(3, 1fr)", // 4 columns on large screens
          xl: "repeat(5, 1fr)", // 5 columns on extra-large screens
        }}
        gap="1rem"
        padding={"1rem"}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Stack key={index} gap="6" maxW="xs">
            <Skeleton height="200px" />
            <HStack width="full">
              <SkeletonText noOfLines={3} />
            </HStack>
          </Stack>
        ))}
      </Grid>
    </>
  );
}
