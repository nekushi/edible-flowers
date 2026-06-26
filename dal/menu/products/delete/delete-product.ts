import prisma from "@/lib/db";

export async function deleteProduct(id: string) {
  const deletedProduct = await prisma.imageWithCaption.delete({
    where: { id },
  });

  console.log(`aray mo`);
}
