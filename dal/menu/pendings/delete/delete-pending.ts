import prisma from "@/lib/db";

export async function deletingPending(ordersId: string) {
  const deleted = await prisma.orders.deleteMany({
    where: { order_id: ordersId },
  });

  return "Deleted successfully!";
}
