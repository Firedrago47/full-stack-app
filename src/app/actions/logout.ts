"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  (await cookies()).set("session", "", { maxAge: 0, path: "/" });
  redirect("/");
}
