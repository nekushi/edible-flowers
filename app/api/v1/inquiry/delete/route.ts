import { deletingInquiry } from "@/dal/menu/inquiries/delete/delete-inquiry";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        type: "error",
        message: "Failed to delete. Try again.",
      },
      {
        status: 400,
        statusText: "Bad Request",
      },
    );
  }

  console.log(id);

  const deletedInquiry = await deletingInquiry(id);
  console.log(deletedInquiry);

  return NextResponse.json(
    {
      type: "success",
      message: "Deleted successfully.",
    },
    {
      status: 200,
      statusText: "OK",
    },
  );
}
