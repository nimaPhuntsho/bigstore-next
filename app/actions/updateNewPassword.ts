// "use server";

// import { supabase } from "@/app/supabase/supabaseClient";

// export async function updateNewPassword(password: string) {
//   const { data, error } = await supabase.auth.updateUser({
//     password: password,
//   });

//   if (error)
//     return {
//       success: false as const,
//       message: error.message,
//       data: error,
//     };

//   return {
//     success: true as const,
//     message: "new password updated",
//     data: data.user,
//   };
// }
