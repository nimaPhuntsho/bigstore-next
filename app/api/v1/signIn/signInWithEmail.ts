import { createClient } from "@/app/supabase/supabaseServer";

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  }
  console.log(data);
  return { session: data.session };
}
