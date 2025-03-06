import React from "react";
import { Metadata } from "next";
import { callFetch } from "@/app/util/fetch";
import { ProductSchema } from "@/app/api/v1/products/schema";
import { Box, Flex, Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Head from "next/head";
import { CiStar } from "react-icons/ci";
import QuantityCounter from "@/components/custom/QuantityCounter";
import { useCartStore } from "@/app/store /cart";
import Review from "@/components/custom/Review";
import ProductDetailCounter from "@/components/custom/ProductDetailCounter";

interface Props {
  params: Promise<{ productId: number }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = (await params).productId;

  const { data, success, status } = await callFetch({
    method: "GET",
    endpoint: `https://dummyjson.com/product/${id}`,
    schema: ProductSchema,
  });

  return {
    title: `${data?.title} ${id}`,
    description: `${data?.description}`,
  };
};

export default async function Product({ params }: Props) {
  const { productId } = await params;
  // const { items } = useCartStore();

  const { data, success, status } = await callFetch({
    method: "GET",
    endpoint: `https://dummyjson.com/product/${productId}`,
    schema: ProductSchema,
  });

  if (!data) return;

  const rating = (rating: number) => {
    return (
      <>
        {Array.from({ length: rating }, (_, i) => (
          <Icon key={i}>
            <CiStar />
          </Icon>
        ))}
      </>
    );
  };

  if (productId / 1)
    return (
      <>
        <VStack width="100%">
          <VStack
            width={{
              base: "90%",
              sm: "90%",
              md: "60%",
            }}
            alignItems="start"
            gap="2rem"
          >
            <VStack alignItems="start">
              <Heading> {data.brand} </Heading>
              <Flex
                direction={{ base: "column", sm: "row" }}
                alignItems="center"
                gap={"1rem"}
              >
                <Image
                  src={data.thumbnail}
                  width={400}
                  height={400}
                  alt=""
                  style={{ backgroundColor: "black", borderRadius: "4px" }}
                />

                <VStack alignItems="start" width="100%">
                  <Heading> {data.title} </Heading>
                  <HStack>{rating(Math.round(data.rating))}</HStack>
                  <Heading> {data.price} </Heading>
                  <ProductDetailCounter product={data} />
                </VStack>
              </Flex>
            </VStack>

            <VStack alignItems="start" width="100%">
              <Heading>Reviews</Heading>
              {data.reviews.map((review) => (
                <Review
                  reviewerName={review.reviewerName}
                  reviewerEmail={review.reviewerEmail}
                  comment={review.comment}
                  date={review.date}
                  rating={review.rating}
                />
              ))}
            </VStack>
          </VStack>
        </VStack>
      </>
    );

  return <p> {`Product ID ${productId} is invalid`} </p>;
}
