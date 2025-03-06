import React from "react";
import { callFetch } from "../util/fetch";
import { InternalApiSchema } from "../api/v1/products/schema";
import ProductCard from "@/components/custom/ProductCard";
import { Grid, VStack } from "@chakra-ui/react";
import { Metadata } from "next";
import Pagination from "@/components/custom/Pagination";

export const metadata: Metadata = {
  title: "Products",
};

interface Props {
  searchParams: Promise<{
    page: number;
    limit: number;
  }>;
}

export default async function Listings({ searchParams }: Props) {
  const { limit, page } = await searchParams;

  const { data, success, status } = await callFetch({
    method: "GET",
    endpoint: `https://bigstore-next.vercel.app/api/v1/products?page=${
      page ? page : 1
    }&limit=${limit ? limit : 10}`,
    schema: InternalApiSchema,
  });

  if (!data || !data.length) return <p>No data</p>;

  return (
    <main>
      <VStack padding="2rem 0">
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)", // 1 column on mobile
            sm: "repeat(2, 1fr)", // 2 columns on small screens
            md: "repeat(3, 1fr)", // 3 columns on medium screens
            lg: "repeat(3, 1fr)", // 4 columns on large screens
            xl: "repeat(5, 1fr)", // 5 columns on extra-large screens
          }}
          gap="1rem"
          placeItems="center"
          alignItems="stretch"
        >
          {data.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
        <Pagination count={data.length} dafaultPage={1} pageSize={10} />
      </VStack>
    </main>
  );
}
