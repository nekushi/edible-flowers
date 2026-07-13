import prisma from "@/lib/db";

export async function getDonePendings() {
  const donePendings = await prisma.clientEmailRequest.findMany({
    where: { is_done: true },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      updatedAt: true,
      orders: {
        select: {
          title: true,
          quantity: true,
          price: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return donePendings;
}
