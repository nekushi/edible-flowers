import prisma from "@/lib/db";

export async function getInquiries() {
  const inquiries = await prisma.clientEmailRequest.findMany({
    where: { is_done: false },
  });

  return inquiries;
}
