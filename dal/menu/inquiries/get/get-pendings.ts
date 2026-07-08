import prisma from "@/lib/db";

export async function getPendings() {
  const pendings = await prisma.clientEmailRequest.findMany({
    where: {
      is_done: false,
      orders: {
        some: {},
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      createdAt: true,
      orders_id: true,
      orders: {
        select: {
          id: true,
          order_id: true,
          title: true,
          caption: true,
          quantity: true,
          img_url: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return pendings;
}
