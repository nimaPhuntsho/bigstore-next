"use server";

import { ContactInputType } from "@/components/custom/ContactForm";
import { createClient } from "../supabase/supabaseServer";

export default async function (contact: ContactInputType) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .insert({
      full_name: contact.fullName,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
    })
    .select();

  if (error)
    return {
      success: false as const,
      message: error.message,
      data: error,
    };

  return {
    success: true as const,
    message: "message sent",
    data: data,
  };
}
