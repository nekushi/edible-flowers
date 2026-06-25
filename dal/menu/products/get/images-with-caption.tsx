import prisma from "@/lib/db";

export async function getImagesWithCaption(): Promise<TypeImageWithCaption[]> {
  const imagesWithCaption = await prisma.imageWithCaption.findMany();

  return imagesWithCaption;
}

export type TypeImageWithCaption = {
  id: string;
  product_title: string;
  caption: string;
  img_url: string;
  createdAt: Date;
  updatedAt: Date;
};
