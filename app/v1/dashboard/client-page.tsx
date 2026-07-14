"use client";

import {
  DashboardInquiryPreview,
  DashboardKpis,
  RevenueDataPoint,
  RevenueRange,
} from "@/dal/menu/dashboard/types";
import { supabase } from "@/lib/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { inputClassName } from "../products/ui/shared";

const revenueRangeOptions: { value: RevenueRange; label: string }[] = [
  { value: "3days", label: "Past 3 days" },
  { value: "week", label: "Past week" },
  { value: "month", label: "Past month" },
  { value: "year", label: "Past year" },
];

const kpiCardClassName =
  "rounded-2xl border border-blossom-200 bg-white p-5 shadow-sm sm:p-6";

const sectionClassName =
  "rounded-2xl border border-blossom-200 bg-white p-5 shadow-sm sm:p-6";

function formatInquiryDate(value: string | Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatProductPrice(price: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatCompactPrice(price: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: price >= 1000 ? 0 : 2,
  }).format(price);
}

function getYesterdayPercentChange(
  yesterday: number,
  dayBeforeYesterday: number,
) {
  if (dayBeforeYesterday === 0) {
    if (yesterday === 0) {
      return { label: "0%", tone: "neutral" as const };
    }

    return { label: "New", tone: "positive" as const };
  }

  const change = ((yesterday - dayBeforeYesterday) / dayBeforeYesterday) * 100;
  const rounded = Math.round(change);

  if (rounded > 0) {
    return { label: `+${rounded}%`, tone: "positive" as const };
  }

  if (rounded < 0) {
    return { label: `${rounded}%`, tone: "negative" as const };
  }

  return { label: "0%", tone: "neutral" as const };
}

function percentToneClassName(tone: "positive" | "negative" | "neutral") {
  switch (tone) {
    case "positive":
      return "bg-emerald-50 text-emerald-700";
    case "negative":
      return "bg-red-50 text-red-700";
    default:
      return "bg-blossom-100 text-cocoa-600";
  }
}

function RevenueLineChart({ data }: { data: RevenueDataPoint[] }) {
  const width = 640;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 44, left: 56 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map((point) => point.value), 1);
  const yTicks = 4;

  const points = data.map((point, index) => {
    const x =
      padding.left +
      (data.length <= 1 ? chartWidth / 2 : (index / (data.length - 1)) * chartWidth);
    const y =
      padding.top + chartHeight - (point.value / maxValue) * chartHeight;

    return { ...point, x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points.at(-1)?.x ?? padding.left} ${
    padding.top + chartHeight
  } L ${points[0]?.x ?? padding.left} ${padding.top + chartHeight} Z`;

  return (
    <div className="mt-4 overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto min-w-full max-w-full"
        role="img"
        aria-label="Revenue line chart"
      >
        <defs>
          <linearGradient id="revenue-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e899c4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e899c4" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {Array.from({ length: yTicks + 1 }, (_, index) => {
          const value = (maxValue / yTicks) * (yTicks - index);
          const y = padding.top + (index / yTicks) * chartHeight;

          return (
            <g key={index}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#f3dbe8"
                strokeWidth={1}
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-cocoa-500 text-[10px]"
              >
                {formatCompactPrice(value)}
              </text>
            </g>
          );
        })}

        {data.length > 0 && (
          <>
            <path d={areaPath} fill="url(#revenue-area)" />
            <path
              d={linePath}
              fill="none"
              stroke="#d66fa8"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {points.map((point) => (
              <g key={point.sortKey}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={4.5}
                  fill="#fff"
                  stroke="#d66fa8"
                  strokeWidth={2}
                />
                <text
                  x={point.x}
                  y={height - 14}
                  textAnchor="middle"
                  className="fill-cocoa-600 text-[10px]"
                >
                  {point.label}
                </text>
              </g>
            ))}
          </>
        )}
      </svg>
    </div>
  );
}

export default function EfMenuDashboardClient({
  kpis,
  latestInquiries,
}: {
  kpis: DashboardKpis;
  latestInquiries: DashboardInquiryPreview[];
}) {
  const [revenueRange, setRevenueRange] = useState<RevenueRange>("week");
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>([]);
  const [isRevenueLoading, setIsRevenueLoading] = useState(true);

  const yesterdayChange = getYesterdayPercentChange(
    kpis.inquiriesYesterday,
    kpis.inquiriesDayBeforeYesterday,
  );

  useEffect(() => {
    function notifyMe(notif?: string) {
      if (!("Notification" in window)) {
        return;
      }

      if (Notification.permission === "granted") {
        if (!notif) return;
        new Notification(notif);
        return;
      }

      if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted" && notif) {
            new Notification(notif);
          }
        });
      }
    }

    notifyMe();

    const channel = supabase
      .channel("subscribing-client-inquiry-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ClientEmailRequest",
        },
        (_payload: RealtimePostgresChangesPayload<{}>) => {
          notifyMe("You have 1 new notification");
          console.log(_payload);
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadRevenue() {
      setIsRevenueLoading(true);

      try {
        const response = await fetch(
          `/api/v1/dashboard/revenue?range=${revenueRange}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load revenue data.");
        }

        const payload = (await response.json()) as {
          data: RevenueDataPoint[];
        };

        if (!cancelled) {
          setRevenueData(payload.data);
        }
      } catch (error) {
        console.log(`$ERROR: ${error}`);

        if (!cancelled) {
          setRevenueData([]);
        }
      } finally {
        if (!cancelled) {
          setIsRevenueLoading(false);
        }
      }
    }

    void loadRevenue();

    return () => {
      cancelled = true;
    };
  }, [revenueRange]);

  const totalRevenue = revenueData.reduce((sum, point) => sum + point.value, 0);

  return (
    <div className="min-h-full bg-linear-to-b from-blossom-100 via-blossom-50 to-white">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <p className="font-accent text-sm font-semibold uppercase tracking-widest text-blossom-600">
            Overview
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold text-cocoa-800 sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-3 text-cocoa-600">
            Track inquiries, pendings, and revenue at a glance.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <article className={kpiCardClassName}>
            <p className="font-accent text-sm font-medium text-cocoa-500">
              Inquiries today
            </p>
            <p className="font-heading mt-2 text-3xl font-bold text-cocoa-800">
              {kpis.inquiriesToday}
            </p>
            <p className="mt-2 text-sm text-cocoa-600">
              New client messages received today
            </p>
          </article>

          <article className={kpiCardClassName}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-accent text-sm font-medium text-cocoa-500">
                  Inquiries yesterday
                </p>
                <p className="font-heading mt-2 text-3xl font-bold text-cocoa-800">
                  {kpis.inquiriesYesterday}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 font-accent text-xs font-semibold ${percentToneClassName(yesterdayChange.tone)}`}
              >
                {yesterdayChange.label}
              </span>
            </div>
            <p className="mt-2 text-sm text-cocoa-600">
              Compared with the day before ({kpis.inquiriesDayBeforeYesterday})
            </p>
          </article>

          <article className={kpiCardClassName}>
            <p className="font-accent text-sm font-medium text-cocoa-500">
              Pendings
            </p>
            <p className="font-heading mt-2 text-3xl font-bold text-cocoa-800">
              {kpis.pendingsCount}
            </p>
            <p className="mt-2 text-sm text-cocoa-600">
              Inquiries with attached products awaiting completion
            </p>
          </article>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Link
            href="/v1/inquiries"
            className={`${sectionClassName} block transition-all hover:-translate-y-0.5 hover:border-blossom-300 hover:shadow-md`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-heading text-lg font-semibold text-cocoa-800">
                  New inquiries
                </p>
                <p className="mt-1 text-sm text-cocoa-600">
                  Latest 3 client messages
                </p>
              </div>
              <span className="font-accent text-sm font-semibold text-blossom-700">
                View all →
              </span>
            </div>

            {latestInquiries.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-blossom-200 bg-blossom-50/50 px-4 py-10 text-center">
                <p className="font-heading text-base font-semibold text-cocoa-800">
                  No inquiries yet
                </p>
                <p className="mt-1 text-sm text-cocoa-600">
                  New messages will show up here.
                </p>
              </div>
            ) : (
              <ul className="mt-6 divide-y divide-blossom-100">
                {latestInquiries.map((inquiry) => (
                  <li key={inquiry.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${
                          inquiry.is_read ? "bg-blossom-200" : "bg-blossom-500"
                        }`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <p className="font-heading font-semibold text-cocoa-800">
                            {inquiry.name}
                          </p>
                          <p className="truncate text-sm text-blossom-600">
                            {inquiry.email}
                          </p>
                        </div>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-cocoa-500">
                          {formatInquiryDate(inquiry.createdAt)}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cocoa-700">
                          {inquiry.message}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Link>

          <section className={sectionClassName}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-heading text-lg font-semibold text-cocoa-800">
                  Revenue
                </p>
                <p className="mt-1 text-sm text-cocoa-600">
                  Completed order income over time
                </p>
                {!isRevenueLoading && (
                  <p className="mt-3 font-heading text-2xl font-bold text-blossom-700">
                    {formatProductPrice(totalRevenue)}
                  </p>
                )}
              </div>

              <label className="min-w-[10rem]">
                <span className="sr-only">Revenue range</span>
                <select
                  value={revenueRange}
                  onChange={(event) =>
                    setRevenueRange(event.target.value as RevenueRange)
                  }
                  className={`${inputClassName} cursor-pointer py-2 pr-10`}
                >
                  {revenueRangeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {isRevenueLoading ? (
              <div className="mt-8 rounded-xl border border-dashed border-blossom-200 bg-blossom-50/50 px-4 py-16 text-center">
                <p className="text-sm text-cocoa-600">Loading revenue chart...</p>
              </div>
            ) : revenueData.length === 0 ? (
              <div className="mt-8 rounded-xl border border-dashed border-blossom-200 bg-blossom-50/50 px-4 py-16 text-center">
                <p className="font-heading text-base font-semibold text-cocoa-800">
                  No revenue yet
                </p>
                <p className="mt-1 text-sm text-cocoa-600">
                  Completed orders will appear on this chart.
                </p>
              </div>
            ) : (
              <RevenueLineChart data={revenueData} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
