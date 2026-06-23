import { getPublicUrl } from "@/dal/menu/products/post/get-public-url";
import { uploadImage } from "@/dal/menu/products/post/upload-image";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  console.log(`FROM ROUTE`);
  console.log(data);

  const title = String(data.get("ttile") ?? "");
  const caption = String(data.get("caption") ?? "");
  const price = String(data.get("price") ?? "");
  const img_file = data.get("img-file");

  //   let filename: string;

  //   if (!img_file) // this wont work cause img_file is instanceof File, like File(as key) blocks us to access more file details
  //     return NextResponse.json({
  //       success: "false",
  //     });

  if (!(img_file instanceof File)) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  const uploadedImage = await uploadImage(img_file);
  console.log(`uploaded image: ${uploadedImage}`);

  if (!uploadedImage) return; // throw error handling

  const imgPublicUrl = await getPublicUrl(uploadedImage);
  console.log(`retrieved url: ${imgPublicUrl}`);

  const imageWithCaption = await prisma.imageWithCaption.create({
    data: {
      product_title: title,
      caption,
      img_url: imgPublicUrl,
    },
  });

  return NextResponse.json({
    message: "ok",
  });
}
