"use server";

import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function logoutUser() {
  await deleteSession();

  redirect("/");
}
