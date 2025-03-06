"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/supabaseServer";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut(); // Sign out the user
  redirect("/login"); // Redirect after signing out
}
