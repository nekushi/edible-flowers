import { markingAsRead } from "@/dal/menu/inquiries/patch/patch-mark-as-read";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  console.log(`searchParams FORMP ATCH`);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        type: "error",
        message: "Failed to mark as read. Try again.",
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  console.log(id);

  const markedAsReadData = await markingAsRead(id);

  console.log(markedAsReadData);

  return NextResponse.json(
    {
      type: "success",
      message: "Marked as read.",
    },
    {
      status: 200,
      statusText: "OK",
    }
  );
}
