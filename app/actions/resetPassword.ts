"use server";

import { createClient } from "../supabase/supabaseServer";

export async function sendResetPasswordLink(email: string) {
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

export async function updateNewPassword(password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error)
    return {
      success: false as const,
      message: error.message,
      data: error,
    };

  return {
    success: true as const,
    message: "new password updated",
    data: data.user,
  };
}
