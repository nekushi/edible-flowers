import prisma from "@/lib/db";

export async function deletingInquiry(id: string) {
  console.log(`id FROM DAL`);
  console.log(id);

  // const deletedInquiry = await prisma.clientEmailRequest.delete(id)

  const deletedInquiry = await prisma.$transaction(async (ctx) => {
    const ordersId = await ctx.clientEmailRequest.findFirst({
      where: { id },
    });
    const orders = await ctx.orders.deleteMany({
      where: { order_id: ordersId?.orders_id },
    });
    const inquiry = await ctx.clientEmailRequest.deleteMany({
      where: { id },
    });

    console.log(`ordersId CLIENTTEMAILREQ`);
    console.log(ordersId);
    console.log(`orders ORDERS`);
    console.log(orders);
  });
  //   const ordersId = await prisma.clientEmailRequest.findFirst({
  //     where: { id },
  //   });

  //   const orders = await prisma.orders.deleteMany({
  //     where: { order_id: ordersId?.orders_id },
  //   });
  //   const inquiry = await prisma.clientEmailRequest.deleteMany({
  //     where: { id },
  //   });

  //   console.log(`ordersId CLIENTTEMAILREQ`);
  //   console.log(ordersId);
  //   console.log(`orders ORDERS`);
  //   console.log(orders);

  //   const deletedInquiry = await prisma.clientEmailRequest.delete({
  //     where: { id },
  //   });

  return deletedInquiry;
}
