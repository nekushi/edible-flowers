import {
  getImagesWithCaption,
  TypeImageWithTitle,
} from "@/dal/menu/products/get/images-with-caption";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") ?? "";

  const searchProductTitle: TypeImageWithTitle[] =
    await getImagesWithCaption(title);

  return NextResponse.json(
    {
      searchProductTitle,
    },
    {
      status: 200,
      statusText: "ok",
    },
  );
}
