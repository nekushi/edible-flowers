import prisma from "@/lib/db";
import type {
  DashboardInquiryPreview,
  DashboardKpis,
  RevenueDataPoint,
  RevenueRange,
} from "../types";

export type {
  DashboardInquiryPreview,
  DashboardKpis,
  RevenueDataPoint,
  RevenueRange,
} from "../types";
export { isValidRevenueRange } from "../types";

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function countInquiriesBetween(start: Date, end: Date) {
  return prisma.clientEmailRequest.count({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });
}

export async function getDashboardKpis(): Promise<DashboardKpis> {
  const today = startOfDay(new Date());
  const yesterday = addDays(today, -1);
  const dayBeforeYesterday = addDays(today, -2);
  const tomorrow = addDays(today, 1);

  const [
    inquiriesToday,
    inquiriesYesterday,
    inquiriesDayBeforeYesterday,
    pendingsCount,
  ] = await Promise.all([
    countInquiriesBetween(today, tomorrow),
    countInquiriesBetween(yesterday, today),
    countInquiriesBetween(dayBeforeYesterday, yesterday),
    prisma.clientEmailRequest.count({
      where: {
        is_done: false,
        orders: {
          some: {},
        },
      },
    }),
  ]);

  return {
    inquiriesToday,
    inquiriesYesterday,
    inquiriesDayBeforeYesterday,
    pendingsCount,
  };
}

export async function getLatestInquiries(
  limit = 3,
): Promise<DashboardInquiryPreview[]> {
  return prisma.clientEmailRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      createdAt: true,
      is_read: true,
    },
  });
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function dayKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    year: "2-digit",
  }).format(date);
}

function buildDayBuckets(start: Date, end: Date) {
  const buckets = new Map<string, RevenueDataPoint>();
  let cursor = startOfDay(start);
  const last = startOfDay(end);

  while (cursor <= last) {
    const key = dayKey(cursor);
    buckets.set(key, {
      label: formatDayLabel(cursor),
      value: 0,
      sortKey: key,
    });
    cursor = addDays(cursor, 1);
  }

  return buckets;
}

function buildMonthBuckets(start: Date, end: Date) {
  const buckets = new Map<string, RevenueDataPoint>();
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(end.getFullYear(), end.getMonth(), 1);

  while (cursor <= last) {
    const key = monthKey(cursor);
    buckets.set(key, {
      label: formatMonthLabel(cursor),
      value: 0,
      sortKey: key,
    });
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }

  return buckets;
}

function getRangeStart(range: RevenueRange) {
  const today = startOfDay(new Date());

  switch (range) {
    case "3days":
      return addDays(today, -2);
    case "week":
      return addDays(today, -6);
    case "month":
      return addDays(today, -29);
    case "year":
      return new Date(today.getFullYear(), today.getMonth() - 11, 1);
  }
}

export async function getRevenueSeries(
  range: RevenueRange,
): Promise<RevenueDataPoint[]> {
  const now = new Date();
  const rangeStart = getRangeStart(range);
  const groupByMonth = range === "year";

  const completedInquiries = await prisma.clientEmailRequest.findMany({
    where: {
      is_done: true,
      updatedAt: {
        gte: rangeStart,
      },
    },
    select: {
      updatedAt: true,
      orders: {
        select: {
          price: true,
        },
      },
    },
  });

  const buckets = groupByMonth
    ? buildMonthBuckets(rangeStart, now)
    : buildDayBuckets(rangeStart, now);

  for (const inquiry of completedInquiries) {
    const revenue = inquiry.orders.reduce((sum, order) => sum + order.price, 0);
    const key = groupByMonth
      ? monthKey(inquiry.updatedAt)
      : dayKey(inquiry.updatedAt);
    const bucket = buckets.get(key);

    if (bucket) {
      bucket.value += revenue;
    }
  }

  return Array.from(buckets.values()).sort((a, b) =>
    a.sortKey.localeCompare(b.sortKey),
  );
}
