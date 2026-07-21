import { TypeUserLogin } from "@/app/login/login-form";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function logUser(
  verifiedUsername: string,
  verifiedPassword: string,
  inputPassword: string,
) {
  const arePasswordsMatch = await bcrypt.compare(
    inputPassword,
    verifiedPassword,
  );
  if (!arePasswordsMatch) {
    return {
      type: "error",
      message: "Wrong password. Try again.",
    };
  }

  return {
    type: "success",
    message: `Welcome back, ${verifiedUsername}`,
  };
}
