import prisma from "@/lib/db";

export async function getItemsWithCaption(): Promise<TypeItemWithCaption[]> {
  const itemsWithCaption = await prisma.imageWithCaption.findMany();

  return itemsWithCaption;
}

export type TypeItemWithCaption = {
  id: string;
  product_title: string;
  caption: string;
  img_url: string;
  createdAt: Date;
  updatedAt: Date;
};
