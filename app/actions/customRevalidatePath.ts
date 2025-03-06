"use server";

import { revalidatePath } from "next/cache";

export async function customRevalidatePath(path: string) {
  revalidatePath(`/${path}`);
}
