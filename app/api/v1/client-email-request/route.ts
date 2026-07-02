import { TypeClientFormRequest } from "@/app/page";
import { postClientEmailReq } from "@/dal/menu/inquiries/post/post-client-inquiries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const data = await req.formData();
  // console.log("");

  const data: TypeClientFormRequest = await req.json();

  console.log(`FROM CLIENT EMAIL REQ ROUTE`);
  // console.log(`${data}`);

  console.log(data.name);
  console.log(data.email);
  console.log(data.message);

  const clientEmailReq = await postClientEmailReq(data);

  return NextResponse.json({
    message: "ok",
    data,
  });
}
