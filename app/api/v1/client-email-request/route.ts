import { TypeClientFormRequest } from "@/app/page";
import { postClientEmailReq } from "@/dal/menu/inquiries/post/post-client-inquiries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const data = await req.formData();
  // console.log("");

  const data: TypeClientFormRequest = await req.json();

  console.log(`FROM CLIENT EMAIL REQ ROUTE`);

  if (!data.name || !data.email || !data.message) return;

  const clientEmailReq = await postClientEmailReq(data);

  return NextResponse.json({
    type: "success",
    message: "success",
    data: clientEmailReq,
  });
}
