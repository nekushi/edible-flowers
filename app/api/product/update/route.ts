import { updateImageWithCaption } from "@/dal/menu/products/update/put-image-w-caption";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const body = await req.formData(); // uuid, updated title, updated caption

  const updatedImageWithCaption = await updateImageWithCaption(body);

    if (!updatedImageWithCaption) {
      return NextResponse.json(
        {
          message: "Something went wrong.",
        },
        {
          status: 404,
          statusText: "not found",
        },
      );
    }

  revalidatePath("/v1/products");

  return NextResponse.json(
    {
      updatedImageWithCaption,
      message: "Product updated successfully.",
    },
    {
      status: 200,
      statusText: "ok",
    },
  );
}
