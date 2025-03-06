"use server";

import { revalidatePath } from "next/cache";

export async function customRevalidatePath(path: string) {
  return revalidatePath(`/${path}`);
}
