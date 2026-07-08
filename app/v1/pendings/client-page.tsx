"use client";

import Image from "next/image";
import { useState } from "react";
import { DeleteIcon } from "../products/ui/shared";

const markDoneButtonClassName =
  "inline-flex items-center justify-center gap-2 rounded-full border border-blossom-300 bg-white px-2 py-2 font-accent text-sm font-semibold text-blossom-700 transition-all hover:border-blossom-400 hover:bg-blossom-50";

const deleteIconButtonClassName =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blossom-200 bg-white text-cocoa-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600";

export type TypePendingOrder = {
  id: string;
  order_id: string;
  title: string;
  caption: string;
  quantity: number;
  img_url: string;
};

export type TypePendingInquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string | Date;
  orders_id: string;
  orders: TypePendingOrder[];
};

function formatPendingDate(value: string | Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function totalItems(orders: TypePendingOrder[]) {
  return orders.reduce((sum, order) => sum + order.quantity, 0);
}

function PendingInquiryCard({ pending }: { pending: TypePendingInquiry }) {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const itemCount = totalItems(pending.orders);
  const ordersPanelId = `pending-orders-${pending.id}`;

  const handleMarkDoneClick = async (ordersId: string) => {
    const params = new URLSearchParams({
      orders_id: ordersId,
    });

    console.log(params.toString());

    const response = await fetch(
      `/api/v1/pendings/mark-done?${params.toString()}`,
      {
        method: "PATCH",
      },
    );

    const data = await response.json();

    console.log(data);
  };

  const handleDeleteClick = async (ordersId: string) => {
    const params = new URLSearchParams({
      orders_id: ordersId,
    });

    console.log(params.toString());

    const response = await fetch(
      `/api/v1/pendings/delete?${params.toString()}`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();

    console.log(data);
  };

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
              <button
                type="button"
                aria-label="Mark as done"
                onClick={() => handleMarkDoneClick(pending.orders_id)}
                className={markDoneButtonClassName}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {/* Mark done */}
              </button>
              <button
                type="button"
                aria-label="Delete pending"
                onClick={() => handleDeleteClick(pending.orders_id)}
                className={deleteIconButtonClassName}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={isOrdersOpen}
          aria-controls={ordersPanelId}
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
          id={ordersPanelId}
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

export default function EfMenuPendingsClient({
  pendings,
}: {
  pendings: TypePendingInquiry[];
}) {
  const totalOrders = pendings.reduce(
    (sum, pending) => sum + pending.orders.length,
    0,
  );

  return (
    <div className="min-h-full bg-linear-to-b from-blossom-100 via-blossom-50 to-white">
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <p className="font-accent text-sm font-semibold uppercase tracking-widest text-blossom-600">
            Order queue
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold text-cocoa-800 sm:text-4xl">
            Pendings
          </h1>
          <p className="mt-3 max-w-2xl text-cocoa-600">
            Review inquiries with attached products before you prepare or follow
            up with clients.
          </p>
        </header>

        <section className="rounded-2xl border border-blossom-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-heading text-lg font-semibold text-cocoa-800">
                Active pendings
              </p>
              <p className="mt-1 text-sm text-cocoa-600">
                {pendings.length}{" "}
                {pendings.length === 1 ? "inquiry" : "inquiries"} with products
                attached
              </p>
            </div>
            <span className="rounded-full bg-blossom-100 px-4 py-1.5 font-accent text-sm font-semibold text-blossom-700">
              {totalOrders} {totalOrders === 1 ? "line item" : "line items"}
            </span>
          </div>
        </section>

        <section>
          {pendings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-blossom-200 bg-blossom-50/50 px-6 py-16 text-center">
              <p className="font-heading text-lg font-semibold text-cocoa-800">
                No pending orders yet
              </p>
              <p className="mt-2 text-sm text-cocoa-600">
                Attach products to an inquiry and they will show up here.
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {pendings.map((pending) => (
                <PendingInquiryCard key={pending.id} pending={pending} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
