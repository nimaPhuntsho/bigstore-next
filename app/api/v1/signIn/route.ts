import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/supabase/supabaseServer";
import { Login } from "./schema";

export async function POST(req: NextRequest, res: NextResponse) {
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

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  }
  console.log(data);
  return { session: data.session };
}
