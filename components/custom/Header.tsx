import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/app/supabase/supabaseServer";
import MainHeader from "./MainHeader";

export default async function Header() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data || !data.user) return <MainHeader userName={""} userId={""} />;

  if (!data.user) redirect("/login");

  const user = await supabase
    .from("users")
    .select("*")
    .eq("user_id", data.user.id)
    .single();

  if (!user.data || !user.data.first_name || !user.data.user_id)
    return <p>no user</p>;

  return (
    <MainHeader userName={user.data.first_name} userId={user.data.user_id} />
  );
}
