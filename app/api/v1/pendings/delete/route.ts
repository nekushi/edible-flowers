import { deletingPending } from "@/dal/menu/pendings/delete/delete-pending";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  console.log(`from DELETE route`);

  const ordersId = searchParams.get("orders_id");
  console.log(ordersId);

  // if (true) {
  if (!ordersId) {
    return NextResponse.json({
      type: "error",
      message: "Nullish id??",
    });
  }

  const deletedPending = await deletingPending(ordersId);

  return NextResponse.json({
    type: "success",
    message: "Pending deleted successfully.",
  });
}
