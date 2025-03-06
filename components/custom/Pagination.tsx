"use client";

import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  count: number;
  pageSize: number;
  dafaultPage: number;
}

const Pagination = ({ count, dafaultPage, pageSize }: Props) => {
  const [customPage, setCustomPage] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: pageSize,
    }
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", customPage.page.toString());
    params.set("limit", customPage.limit.toString());
    router.push(`/listings?${params.toString()}`);
  }, [customPage, pageSize, router]);
  return (
    <>
      <PaginationRoot
        variant="solid"
        count={count}
        pageSize={pageSize}
        defaultPage={dafaultPage}
        onPageChange={(e) => {
          setCustomPage((current) => ({ ...current, page: e.page }));
        }}
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </>
  );
};

export default Pagination;
