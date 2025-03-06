import { z } from "zod";
import { supabase } from "./../../../supabase/supabaseClient";
import { OrderSchema } from "./orderSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  res: Response
): Promise<NextResponse> {
  const body = await req.json();
  const parsedOrder = OrderSchema.parse(body);

  const { data: userData, success } = await getAccessToken(req);

  if (!success || !userData)
    return NextResponse.json({
      success: false as const,
      message: "error or missing invalid access token",
    });

  console.log(parsedOrder);

  const response = await createOrder({
    userID: userData.id,
    orders: parsedOrder,
  });

  if (!response)
    return NextResponse.json({
      success: false as const,
      message: "error creating the order",
    });

  const { data, error } = response;
  if (error) return NextResponse.json({ error: error });

  return NextResponse.json({
    success: true as const,
    message: "order created successfully",
  });
}

async function createOrder({
  userID,
  orders,
}: {
  userID: string;
  orders: z.infer<typeof OrderSchema>;
}) {
  const { data, error } = await supabase
    .from("orders")
    .insert({ user_id: userID })
    .select();

  if (!data) return;

  const { order_id } = data[0];

  console.log(order_id);

  console.log(error);

  const items = orders.map((item) => ({
    ...item,
    order_id: order_id,
    total: item.price * item.quantity,
  }));

  const { data: itemData, error: itemError } = await supabase
    .from("order_items")
    .insert(items)
    .select();

  console.log(itemError);

  return {
    data: data[0],
    error: error,
  };
}

async function getAccessToken(req: NextRequest) {
  const authorization = req.headers.get("authorization");

  if (!authorization)
    return {
      success: false as const,
      message: "access token is missing or invalid",
      data: null,
    };
  const polishedToken = authorization.split(" ")[1].replace(/"/g, "").trim();

  const {
    data: { user },
  } = await supabase.auth.getUser(polishedToken);

  if (!user)
    return {
      success: false as const,
      message: "error retrieving the logged in user",
      data: null,
    };
  return {
    success: true as const,
    message: "user retrival success",
    data: user,
  };
}
