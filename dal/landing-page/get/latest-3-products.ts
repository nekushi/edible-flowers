import prisma from "@/lib/db";

export async function getLatest3Products() {
  const latest3Products = await prisma.imageWithCaption.findMany({
    select: {
      id: true,
      product_title: true,
      caption: true,
      price: true,
      img_url: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return latest3Products;
}
