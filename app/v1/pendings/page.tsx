export const dynamic = "force-dynamic";

import { getPendings } from "@/dal/menu/inquiries/get/get-pendings";
import EfMenuPendingsClient from "./client-page";

export default async function EfMenuPendings() {
  const pendings = await getPendings();

  return <EfMenuPendingsClient pendings={pendings} />;
}
