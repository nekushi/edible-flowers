import { NextRequest, NextResponse } from "next/server";
import { checkUser } from "@/dal/auth/check-user";
import { logUser } from "@/dal/auth/log-user";
import { ApiResponse } from "@/app/z-landing-page-contents/types";
import { TypeUserLogin } from "@/app/login/login-form";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const username = String(searchParams.get("username"));
  const password = String(searchParams.get("password"));

  if (!username || !password) {
    return NextResponse.json({
      type: "error",
      message: `Username and Password are required.`,
    });
  }

  const user = await checkUser(username);

  if (user.type === "error") {
    return NextResponse.json({
      type: user.type,
      message: user.message,
    });
  }

  const verifiedUser: TypeUserLogin = JSON.parse(user.message);

  const loggedUser = await logUser(
    verifiedUser.username,
    verifiedUser.password,
    password,
  );

  if (loggedUser.type === "error") {
    return NextResponse.json({
      type: loggedUser.type,
      message: loggedUser.message,
    });
  }

  return NextResponse.json({
    type: loggedUser.type,
    message: loggedUser.message,
  });
}
