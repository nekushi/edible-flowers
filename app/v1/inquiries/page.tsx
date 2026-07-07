export const dynamic = "force-dynamic";

import { getInquiries } from "@/dal/menu/inquiries/get/get-inquiries";
import { getItemsWithCaption } from "@/dal/menu/inquiries/get/get-items-with-caption";
import EfMenuInquiriesClient from "./client-page";

export default async function EfMenuInquiries() {
  const [inquiries, itemsWithCaption] = await Promise.all([
    getInquiries(),
    getItemsWithCaption(),
  ]);

  return (
    <EfMenuInquiriesClient
      inquiries={inquiries}
      itemsWithCaption={itemsWithCaption}
    />
  );
}
