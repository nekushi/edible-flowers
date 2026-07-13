import { postAdminClientInquiries } from "@/dal/menu/inquiries/post/post-admin-client-inquiries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = (await req.json()) as TypeAdminAttachInquiryProduct[];

  // console.log(`from POST inquiry`);
  // console.log(data);

  const newOrders = await postAdminClientInquiries(data);

  console.log(`from POST inquiry`);
  console.log(newOrders);

  // data.map(async (d: TypeAdminAttachInquiryProduct) => {
  // });

  return NextResponse.json({
    message: "Nice",
  });
}

export type TypeAdminAttachInquiryProduct = {
  order_id: string;
  title: string;
  caption: string;
  quantity: number;
  price: number;
  img_url: string;
};

// type TypeClientOrders = {

// }
