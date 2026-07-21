import { TypeUserLogin } from "@/app/login/login-form";
import { ApiResponse } from "@/app/z-landing-page-contents/types";
import prisma from "@/lib/db";

export async function checkUser(username: string): Promise<ApiResponse> {
  const user: TypeUserLogin | null = await prisma.users.findUnique({
    where: { username },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    return {
      type: "error",
      message: "No user found.",
    };
  }

  return {
    type: "success",
    message: JSON.stringify(user),
  };
}
