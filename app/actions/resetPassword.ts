"use server";

import { createClient } from "../supabase/supabaseServer";

export default async function (email: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error)
    return {
      success: false as const,
      message: error.message,
      data: error,
    };

  return {
    success: true as const,
    message: "email sent for password reset",
    data: data,
  };
}
