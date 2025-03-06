import { Box, Card, Heading, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { HStack, VStack } from "@chakra-ui/react";
import { ProductSchemaType } from "@/app/api/v1/orders/orderSchema";
import CartButton from "./CartButton";
import { CiStar } from "react-icons/ci";
import { IoIosStarOutline } from "react-icons/io";
import Link from "next/link";

interface Props {
  product: ProductSchemaType;
}

export default function ProductCard({ product }: Props) {
  const rating = (rating: number) => {
    return (
      <>
        {Array.from({ length: rating }, (_, i) => (
          <Icon key={i}>
            <IoIosStarOutline />
          </Icon>
        ))}
      </>
    );
  };

  return (
    <>
      <Card.Root
        width={{
          base: "180px",
          sm: "250px",
          md: "250px",
        }}
      >
        <Card.Body
          padding={{
            base: ".5rem",
          }}
        >
          <VStack justifyContent="space-between" gap="1rem" height="100%">
            <VStack alignItems="start">
              <Link href={`/listings/${product.id}`}>
                <Image
                  src={product.thumbnail}
                  alt=""
                  width={300}
                  height={300}
                  style={{ backgroundColor: "black", borderRadius: "5px" }}
                />
              </Link>
              <Heading size="md" fontWeight="bolder">
                {product.title}
              </Heading>
              <HStack>{rating(Math.round(product.rating))}</HStack>
            </VStack>
            <VStack alignItems="flex-start" width="100%">
              <HStack width="100%" justifyContent="space-between">
                <Heading fontWeight="bolder" size="md">
                  $ {product.price}
                </Heading>
                <CartButton products={product} />
              </HStack>
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </>
  );
}
