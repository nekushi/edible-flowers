import { postAdminClientInquiries } from "@/dal/menu/inquiries/post/post-admin-client-inquiries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const newOrders = await postAdminClientInquiries(data);

  return NextResponse.json({
    type: "success",
    message: "Attached products successfully.",
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
