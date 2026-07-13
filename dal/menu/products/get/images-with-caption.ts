import { Decimal } from "@/app/generated/prisma/internal/prismaNamespace";
import prisma from "@/lib/db";

export async function getImagesWithCaption(
  title?: string,
): Promise<TypeImageWithTitle[]> {
  const imagesWithCaption = await prisma.imageWithCaption.findMany({
    where: {
      product_title: {
        contains: title,
        mode: "insensitive",
      },
    },
  });

  return imagesWithCaption;
}

export type TypeImageWithTitle = {
  id: string;
  product_title: string;
  caption: string;
  img_url: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};
