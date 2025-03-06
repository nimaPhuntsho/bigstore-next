import { createClient } from "@/app/supabase/supabaseServer";
import LoginForm from "@/components/custom/LoginForm";
import { redirect } from "next/navigation";

export default async function () {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data.user) redirect("/dashboard");

  return <LoginForm />;
}
