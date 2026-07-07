import { TypeAdminAttachInquiryProduct } from "@/app/api/v1/inquiry/post-to-orders/route";
import prisma from "@/lib/db";

export async function postAdminClientInquiries(
  datum: TypeAdminAttachInquiryProduct[],
) {
  // console.log(`datum FROM POST ROUTE DAL`);
  // console.log(datum);

  //   await prisma.$transaction(async (ctx) => {
  //     await Promise.all(
  //       datum.map((data: TypeAdminAttachInquiryProduct) =>
  //         ctx.clientEmailRequest.update({

  try {
    await prisma.$transaction(async (ctx) => {
      await Promise.all(
        datum.map(async (data: TypeAdminAttachInquiryProduct) => {
          await ctx.clientEmailRequest.update({
            where: {
              orders_id: data.order_id,
            },
            data: {
              orders: {
                create: {
                  title: data.title,
                  caption: data.caption,
                  quantity: data.quantity,
                  img_url: data.img_url,
                },
              },
            },
          });
        }),
      );
    });

    return {
      type: "success",
      message: "Added items to pending successfully.",
    };
  } catch (err) {
    console.log(`ERROR: ${err}`);

    return {
      type: "error",
      message: err,
    };
  }
}
