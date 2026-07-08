import prisma from "@/lib/db";

export async function markingDonePending(ordersId: string) {
  const markedDone = await prisma.clientEmailRequest.update({
    where: {
      orders_id: ordersId,
    },
    data: {
      is_done: true,
    },
  });

  return "Marked as done!";
}
