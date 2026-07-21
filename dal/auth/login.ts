"use server";

import { ApiResponse } from "@/app/z-landing-page-contents/types";
import prisma from "@/lib/db";

// export async function login(formData: FormData): Promise<void> {
// export async function login(
//   state: ApiResponse | undefined,
//   formData: FormData,
// ): Promise<ApiResponse | undefined> {
export async function login(formData: FormData) {
  //   return "XD";
  console.log("hello world");

  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  const checkUser = await prisma.users.findUnique({
    where: { username },
  });

  if (!checkUser) {
    return {
      type: "error",
      message: "Wrong credentials. Try again.",
    };
  }

  console.log(username);
  console.log(password);
}
