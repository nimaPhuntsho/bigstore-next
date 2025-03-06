import { NextRequest, NextResponse } from "next/server";
import { Login } from "./schema";
import { signInWithEmail } from "./signInWithEmail";

export async function POST(req: NextRequest) {
  const loginCredentials = await req.json();
  const { email, password } = Login.parse(loginCredentials);

  const { session, error } = await signInWithEmail(email, password);

  if (error !== null) {
    return NextResponse.json({
      message: "auth failed",
      success: false as const,
      error: error,
    });
  }
  return NextResponse.json({
    message: "auth success",
    success: true as const,
    error: null,
  });
}
