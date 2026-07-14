import {
  getRevenueSeries,
  isValidRevenueRange,
} from "@/dal/menu/dashboard/get/dashboard-stats";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const rangeParam = req.nextUrl.searchParams.get("range") ?? "week";

  if (!isValidRevenueRange(rangeParam)) {
    return NextResponse.json({ error: "Invalid range." }, { status: 400 });
  }

  const data = await getRevenueSeries(rangeParam);

  return NextResponse.json({ data });
}
