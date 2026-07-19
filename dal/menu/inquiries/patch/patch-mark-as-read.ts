import prisma from "@/lib/db";

export async function markingAsRead(id: string) {
  const markedAsRead = await prisma.clientEmailRequest.update({
    where: { id },
    data: {
      is_read: true,
    },
  });

  return markedAsRead;
}
