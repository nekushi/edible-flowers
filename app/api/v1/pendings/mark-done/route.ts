import { markingDonePending } from "@/dal/menu/pendings/patch/mark-done";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const ordersId = searchParams.get("orders_id");

  if (!ordersId) {
    return NextResponse.json({
      type: "error",
      message: "Nullish id??",
    });
  }

  const markedDonePending = await markingDonePending(ordersId);

  return NextResponse.json({
    type: "success",
    message: "Marked as done.",
  });
}
