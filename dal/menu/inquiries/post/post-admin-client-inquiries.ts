import { TypeAdminAttachInquiryProduct } from "@/app/api/v1/inquiry/post-to-orders/route";
import prisma from "@/lib/db";

export async function postAdminClientInquiries(
  datum: TypeAdminAttachInquiryProduct[],
) {
  try {
    await prisma.$transaction(async (ctx) => {
      await Promise.all(
        datum.map(async (data: TypeAdminAttachInquiryProduct) => {
          await ctx.clientEmailRequest.update({
            where: {
              orders_id: data.order_id,
            },
            data: {
              is_read: true,
              orders: {
                create: {
                  title: data.title,
                  caption: data.caption,
                  quantity: data.quantity,
                  price: data.price,
                  img_url: data.img_url,
                },
              },
            },
          });
        }),
      );
    });
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
}
