"use server";

import { createAdminSupabase } from "../supabase/supabaseAdminClient";
import { createClient } from "../supabase/supabaseServer";

export async function signUpUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const ADMIN = ["nimafunso@gmail.com"];
  const supabase = await createClient();
  const supbaseAdmin = await createAdminSupabase();
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

  if (!supbaseAdmin) {
    return {
      error: "doesnt have admin previlages",
      data: null,
    };
  }

  if (!data.user) {
    return {
      error: "user doesnt exists",
      data: null,
    };
  }

  const role = ADMIN.includes(email.trim()) ? "admin" : "customer";

  const claim = await supbaseAdmin.auth.admin.updateUserById(data.user.id, {
    user_metadata: {
      role: role,
    },
  });

  console.log(claim.data.user?.user_metadata);

  return {
    error: null,
    data: data,
  };
}
