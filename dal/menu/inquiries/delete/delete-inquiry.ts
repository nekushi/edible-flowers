import prisma from "@/lib/db";

export async function deletingInquiry(id: string) {
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
  });

  return deletedInquiry;
}
