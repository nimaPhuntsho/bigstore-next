"use server";

import { createClient } from "../supabase/supabaseServer";

export async function createUser({
  firstName,
  lastName,
  userId,
  email,
}: {
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .insert({
      first_name: firstName,
      last_name: lastName,
      user_id: userId,
      email: email,
    })
    .select();

  if (error)
    return {
      error: error.message,
      data: null,
    };

  return {
    error: null,
    data: data,
  };
}
