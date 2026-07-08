import { markingDonePending } from "@/dal/menu/pendings/patch/mark-done";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  console.log(`from PUT route`);

  const ordersId = searchParams.get("orders_id");
  console.log(ordersId);

  if (!ordersId)
    return NextResponse.json({
      type: "error",
      message: "Nullish id??",
    });

  const markedDonePending = await markingDonePending(ordersId);

  revalidatePath("/v1/pendings");

  return NextResponse.json({
    message: markedDonePending,
  });
}
