import { Schema } from "zod";
import { Json } from "./../../../../types";
import { ItemSchema } from "./../orders/orderSchema";
import { callFetch } from "./../../../util/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { data, success, status } = await callFetch({
    method: "GET",
    endpoint: "https://dummyjson.com/products",
    schema: ItemSchema,
  });

  const params = await paginationIndices(req);

  if (!params)
    return NextResponse.json({
      success: false as const,
      data: null,
      status: 202,
    });

  const { startIndex, endIndex } = params;

  if (!data || !data.products)
    return NextResponse.json({
      success: false as const,
      data: null,
      status: status,
    });

  const slicedProducts = data.products.slice(startIndex, endIndex);

  if (!success)
    return NextResponse.json({
      success: false as const,
      data: null,
      status: status,
    });

  return NextResponse.json({
    success: true as const,
    data: slicedProducts,
    status: status,
    length: data.products.length,
  });
}

async function paginationIndices(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  if (!page || !limit) return undefined;

  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);

  const startIndex = (parsedPage - 1) * parsedLimit;
  const endIndex = parsedPage * parsedLimit;
  return { startIndex, endIndex };
}
