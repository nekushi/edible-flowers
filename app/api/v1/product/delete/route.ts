import { deleteProduct } from "@/dal/menu/products/delete/delete-product";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  console.log(`searchParams FROM DELETE`);
  console.log(searchParams);

  const id = String(searchParams.get("id"));

  await deleteProduct(id);

  revalidatePath("/v1/products");

  return NextResponse.json(
    {
      message: "Product deleted successfully.",
    },
    {
      status: 200,
      statusText: "ok",
    },
  );
}
