import { TypeClientFormRequest } from "@/app/z-landing-page-contents/types";
import { postClientEmailReq } from "@/dal/menu/inquiries/post/post-client-inquiries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: TypeClientFormRequest = await req.json();

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({
      type: "error",
      message: "An error occurred. Please try again.",
    });
  }

  const clientEmailReq = await postClientEmailReq(data);

  return NextResponse.json({
    type: "success",
    message: "Thanks for reaching out!",
  });
}
