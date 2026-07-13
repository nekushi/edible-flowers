"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateImageWithCaption(body: FormData) {
  // body == uuid, updated title, updated caption

  const targetId = String(body.get("updated-id"));
  const updatedTitle = String(body.get("updated-title"));
  const updatedCaption = String(body.get("updated-caption"));
  const updatedPrice = Number(body.get("updated-price") ?? 0);

  const updatedImageWithCaption = await prisma.imageWithCaption.update({
    where: {
      id: targetId,
    },
    data: {
      product_title: updatedTitle,
      caption: updatedCaption,
      price: updatedPrice,
      updatedAt: new Date(),
    },
  });

  revalidatePath("/v1/products");

  return updatedImageWithCaption;
}
