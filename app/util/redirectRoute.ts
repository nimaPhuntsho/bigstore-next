import { redirect } from "next/navigation";
export async function customRedirect(route: string) {
  return redirect(route);
}
