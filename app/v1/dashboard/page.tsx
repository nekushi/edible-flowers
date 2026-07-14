export const dynamic = "force-dynamic";

import {
  getDashboardKpis,
  getLatestInquiries,
} from "@/dal/menu/dashboard/get/dashboard-stats";
import EfMenuDashboardClient from "./client-page";

export default async function EfMenuDashboard() {
  const [kpis, latestInquiries] = await Promise.all([
    getDashboardKpis(),
    getLatestInquiries(3),
  ]);

  return (
    <EfMenuDashboardClient kpis={kpis} latestInquiries={latestInquiries} />
  );
}
