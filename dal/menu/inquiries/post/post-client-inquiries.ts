import { TypeClientFormRequest } from "@/app/page";
import prisma from "@/lib/db";

export async function postClientEmailReq(data: TypeClientFormRequest) {
  const uniqueId = `${Date.now()}-${data.name}`;

  const createdInquiry = await prisma.clientEmailRequest.create({
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
      orders_id: uniqueId,
    },
  });

  return createdInquiry;
}
