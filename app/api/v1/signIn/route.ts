import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/supabase/supabaseServer";
import { Login } from "./schema";
import { signInWithEmail } from "./signInWithEmail";

export async function POST(req: NextRequest) {
  const loginCredentials = await req.json();
  const { email, password } = Login.parse(loginCredentials);

  const { session, error } = await signInWithEmail(email, password);
  if (!session)
    return NextResponse.json({
      message: "auth failed",
      success: false as const,
    });

  return NextResponse.json({ message: "auth success", success: true as const });
}
