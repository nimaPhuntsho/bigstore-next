"use server";

import { startCase } from "lodash";
import { createAdminSupabase } from "../supabase/supabaseAdminClient";
import { createClient } from "../supabase/supabaseServer";
import { sendEmail } from "./sendEmail";
import { createUser } from "./createUser";

export async function signUpUser({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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

  if (!data.user) {
    return {
      error: "error siging up the user",
      data: null,
    };
  }

  const { data: userData, error: userError } = await createUser({
    firstName: startCase(firstName),
    lastName: startCase(lastName),
    email: email,
    userId: data.user.id,
  });

  console.log(userError);

  if (!supbaseAdmin) {
    return {
      error: "doesnt have admin previlages",
      data: null,
    };
  }
  const role = ADMIN.includes(email.trim()) ? "admin" : "customer";
  const claim = await supbaseAdmin.auth.admin.updateUserById(data.user.id, {
    user_metadata: {
      role: role,
    },
  });

  const user = await supabase
    .from("users")
    .select("*")
    .eq("user_id", data.user.id)
    .single();

  if (!user.data || !user.data.first_name) {
    return {
      error: "null data",
      data: null,
    };
  }

  await sendEmail({
    email: email,
    firstName: user.data.first_name,
    subject: "Welcome aboard",
    department: "welcome",
  });

  return {
    error: null,
    data: data,
  };
}
