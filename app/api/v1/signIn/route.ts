import { NextRequest, NextResponse } from "next/server";
import { Login } from "./schema";
import { signInWithEmail } from "./signInWithEmail";

export async function POST(req: NextRequest) {
  try {
    const loginCredentials = await req.json();
    const paresedLogin = Login.safeParse(loginCredentials);

    if (!paresedLogin.success) {
      return NextResponse.json(
        {
          message: "auth failed",
          success: false as const,
          error: "invalid login data type",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    const { session, error } = await signInWithEmail(
      paresedLogin.data.email,
      paresedLogin.data.password
    );

    if (error) {
      return NextResponse.json(
        {
          message: "auth failed",
          success: false as const,
          error: error,
          data: null,
        },
        {
          status: 401,
        }
      );
    }
    return NextResponse.json(
      {
        message: "auth success",
        success: true as const,
        error: null,
        data: session,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
        success: false,
        error: "Internal server error",
        data: null,
      },
      { status: 500 }
    );
  }
}
