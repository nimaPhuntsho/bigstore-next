import { supabase } from "@/app/supabase/supabaseClient";
import { registerSchema } from "./../../../(auth)/register/registerSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = registerSchema.parse(body);

    const { email, password } = parsedBody;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error)
      return NextResponse.json({
        success: false as const,
        error: error?.message || "sign up failed",
        data: null,
      });

    if (!data.session) {
      return NextResponse.json({
        success: false as const,
        error: "null data",
        data: null,
      });
    }

    return NextResponse.json({
      success: true as const,
      error: null,
      data: data.session,
    });
  } catch (error) {
    return NextResponse.json({
      success: false as const,
      error: error,
      data: null,
    });
  }
}

async function signUpNewUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error)
    return {
      success: false as const,
      error: error,
      user: null,
    };

  return {
    success: true as const,
    error: null,
    user: data,
  };
}

async function createNewUser({
  userId,
  firstName,
  lastName,
  email,
}: {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}) {
  const { data, error } = await supabase
    .from("users")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
      user_id: userId,
    })
    .select();

  if (error)
    return {
      success: false as const,
      error: error,
      data: null,
    };

  return {
    success: true as const,
    error: null,
    data: data,
  };
}
