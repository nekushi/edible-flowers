"use client";

import { useState } from "react";
import Image from "next/image";
import { TypePendingInquiry, TypePendingOrder } from "./page";
import EfBtnMarkDone from "./btn-mark-done";
import EfBtnRemovePendings from "./btn-remove-pendings";

export const markDoneButtonClassName =
  "inline-flex items-center justify-center gap-2 rounded-full border border-blossom-300 bg-white px-2 py-2 font-accent text-sm font-semibold text-blossom-700 transition-all hover:border-blossom-400 hover:bg-blossom-50";

export const deleteIconButtonClassName =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blossom-200 bg-white text-cocoa-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600";

function formatPendingDate(value: string | Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function totalItems(orders: TypePendingOrder[]) {
  return orders.reduce((sum, order) => sum + order.quantity, 0);
}

export function PendingInquiryCard({
  pending,
}: {
  pending: TypePendingInquiry;
}) {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const itemCount = totalItems(pending.orders);

  return (
    <li className="overflow-hidden rounded-2xl border border-blossom-200 bg-white shadow-sm">
      <div className="bg-blossom-50/60 p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2 className="font-heading text-lg font-bold text-cocoa-800">
                {pending.name}
              </h2>
              <a
                href={`mailto:${pending.email}`}
                className="truncate text-sm text-blossom-600 underline-offset-2 hover:underline"
              >
                {pending.email}
              </a>
            </div>
            <p className="text-xs font-medium uppercase tracking-wide text-cocoa-500">
              {formatPendingDate(pending.createdAt)}
            </p>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-cocoa-700">
              {pending.message}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-end">
            <span className="inline-flex self-start rounded-full bg-white px-4 py-1.5 font-accent text-sm font-semibold text-blossom-700 ring-1 ring-blossom-200 sm:self-auto">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <EfBtnMarkDone pendingId={pending.orders_id} />
              <EfBtnRemovePendings pendingId={pending.orders_id} />
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={isOrdersOpen}
          onClick={() => setIsOrdersOpen((open) => !open)}
          className="mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-blossom-200 bg-white px-4 py-3 text-left transition-colors hover:border-blossom-300 hover:bg-blossom-50/40"
        >
          <span className="font-accent text-sm font-semibold text-cocoa-800">
            {pending.orders.length}{" "}
            {pending.orders.length === 1 ? "order" : "orders"}
          </span>
          <svg
            className={`h-4 w-4 shrink-0 text-blossom-600 transition-transform ${
              isOrdersOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOrdersOpen && (
        <ul
          id={pending.id}
          className="divide-y divide-blossom-100 border-t border-blossom-100"
        >
          {pending.orders.map((order) => (
            <li key={order.id} className="flex items-center gap-4 p-4 sm:p-5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-blossom-200 bg-blossom-50">
                <Image
                  src={order.img_url}
                  alt={order.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-base font-semibold text-cocoa-800">
                  {order.title}
                </p>
                <p className="mt-0.5 line-clamp-2 text-sm text-cocoa-600">
                  {order.caption}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-accent text-xs font-semibold uppercase tracking-wide text-cocoa-500">
                  Qty
                </p>
                <p className="font-heading text-lg font-bold tabular-nums text-blossom-700">
                  {order.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
