import { TypeUserLogin } from "@/app/login/login-form";
import { createSession } from "@/lib/session";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function logUser(
  verifiedId: string,
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

  await createSession(verifiedId, verifiedUsername);

  return {
    type: "success",
    message: `Welcome back, ${verifiedUsername}`,
  };
}
