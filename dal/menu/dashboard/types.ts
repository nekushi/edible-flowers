export type DashboardKpis = {
  inquiriesToday: number;
  inquiriesYesterday: number;
  inquiriesDayBeforeYesterday: number;
  pendingsCount: number;
};

export type DashboardInquiryPreview = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  is_read: boolean;
};

export type RevenueRange = "3days" | "week" | "month" | "year";

export type RevenueDataPoint = {
  label: string;
  value: number;
  sortKey: string;
};

export function isValidRevenueRange(value: string): value is RevenueRange {
  return (
    value === "3days" ||
    value === "week" ||
    value === "month" ||
    value === "year"
  );
}
