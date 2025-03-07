"use server";

import { supabase } from "../supabase/supabaseClient";

export async function sendResetPasswordLink(email: string) {
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
