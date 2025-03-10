import { Database } from "./../../types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAdminKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;

// export const supabaseAdmin = createClient<Database>(
//   supabaseUrl!,
//   supabaseAdminKey!
// );

export const createAdminSupabase = () => {
  if (!supabaseUrl || !supabaseAdminKey) return;
  return createClient<Database>(supabaseUrl, supabaseAdminKey);
};
