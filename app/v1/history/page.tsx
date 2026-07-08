export const dynamic = "force-dynamic";

import { getDonePendings } from "@/dal/menu/history/get/done-pendings";
import EfMenuHistoryClient from "./client-page";

export default async function EfMenuHistory() {
  const history = await getDonePendings();

  return <EfMenuHistoryClient history={history} />;
}
