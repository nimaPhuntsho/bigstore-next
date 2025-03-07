"use server";

import { createClient } from "../supabase/supabaseServer";

export async function signUpUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return {
      error: error.message,
      data: null,
    };
  }

  return {
    error: null,
    data: data,
  };
}
