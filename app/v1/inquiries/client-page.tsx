"use client";

import { TypeItemWithCaption } from "@/dal/menu/inquiries/get/get-items-with-caption";
import Image from "next/image";
import { Activity, useEffect, useState } from "react";
import {
  dangerButtonClassName,
  ModalShell,
  secondaryButtonClassName,
} from "../products/ui/shared";

export type TypeInquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string | Date;
  is_read: boolean;
  orders_id: string;
};

export type TypeInquiredOrder = {
  order_id: string;
  title: string;
  caption: string;
  quantity: number;
  price: number;
  img_url: string;
};

function formatProductPrice(price: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(price);
}

function orderMatchesItem(order: TypeInquiredOrder, item: TypeItemWithCaption) {
  return (
    order.title === item.product_title &&
    order.caption === item.caption &&
    order.img_url === item.img_url
  );
}

const attachProductsButtonClassName =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-dashed border-blossom-500 bg-linear-to-r from-blossom-50 to-white px-4 py-2 font-accent text-sm font-semibold text-blossom-700 shadow-sm transition-all hover:border-blossom-600 hover:from-blossom-100 hover:text-blossom-800";

const markReadButtonClassName =
  "inline-flex items-center justify-center rounded-full border border-blossom-300 bg-white px-4 py-2 font-accent text-sm font-semibold text-blossom-700 transition-all hover:border-blossom-400 hover:bg-blossom-50";

const quantityStepperClassName =
  "mt-2 inline-flex items-stretch overflow-hidden rounded-lg border border-blossom-200 bg-white shadow-sm relative";

const quantityButtonClassName =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center font-accent text-base font-semibold leading-none text-cocoa-600 transition-colors hover:bg-blossom-50 hover:text-blossom-700 active:bg-blossom-100";

const quantityInputClassName =
  "h-8 w-11 border-x border-blossom-200 bg-blossom-50/50 text-center text-sm font-semibold tabular-nums text-cocoa-800 outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-inset focus:ring-blossom-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

function formatInquiryDate(value: string | Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function EfMenuInquiriesClient({
  inquiries: initialInquiries,
  itemsWithCaption,
}: {
  inquiries: TypeInquiry[];
  itemsWithCaption: TypeItemWithCaption[];
}) {
  const [inquiries, setInquiries] = useState<TypeInquiry[]>(initialInquiries);
  const [inquiredOrders, setInquiredOrders] = useState<TypeInquiredOrder[]>([]);
  const [activeInquiryId, setActiveInquiryId] = useState<string | null>(null);

  console.log(inquiredOrders);

  const handleInquiryToOrdersClick = async () => {
    const response = await fetch(`/api/v1/inquiry/post-to-orders`, {
      method: "POST",
      body: JSON.stringify(inquiredOrders),
    });

    const data = await response.json();

    console.log(data);

    handleCloseAttachProducts();
  };

  const activeInquiry = inquiries.find(
    (inquiry) => inquiry.id === activeInquiryId,
  );
  const activeOrdersId = activeInquiry?.orders_id ?? null;

  useEffect(() => {
    setInquiries(initialInquiries);
  }, [initialInquiries]);

  const unreadCount = inquiries.filter((inquiry) => !inquiry.is_read).length;

  const handleMarkAsRead = (inquiryId: string) => {
    setInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry.id === inquiryId ? { ...inquiry, is_read: true } : inquiry,
      ),
    );
  };

  const handleDeleteOrIgnore = (inquiryId: string) => {
    setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== inquiryId));
  };

  const handleOpenAttachProducts = (inquiryId: string) => {
    setInquiredOrders([]);
    setActiveInquiryId(inquiryId);
  };

  const handleCloseAttachProducts = () => {
    setActiveInquiryId(null);
    setInquiredOrders([]);
  };

  const handleToggleInquiredOrder = (
    item: TypeItemWithCaption,
    ordersId: string,
  ) => {
    setInquiredOrders((prev) => {
      const isSelected = prev.some((order) => orderMatchesItem(order, item));

      if (isSelected) {
        return prev.filter((order) => !orderMatchesItem(order, item));
      }

      return [
        ...prev,
        {
          order_id: ordersId,
          title: item.product_title,
          caption: item.caption,
          quantity: 1,
          price: item.price,
          img_url: item.img_url,
        },
      ];
    });
  };

  const handleInquiredOrderQuantityChange = (
    item: TypeItemWithCaption,
    ordersId: string,
    delta: number,
  ) => {
    setInquiredOrders((prev) => {
      const existing = prev.find((order) => orderMatchesItem(order, item));

      if (existing) {
        const quantity = Math.max(0, existing.quantity + delta);

        if (quantity === 0) {
          return prev.filter((order) => !orderMatchesItem(order, item));
        }

        return prev.map((order) =>
          orderMatchesItem(order, item)
            ? { ...order, quantity, price: item.price * quantity }
            : order,
        );
      }

      if (delta <= 0) {
        return prev;
      }

      return [
        ...prev,
        {
          order_id: ordersId,
          title: item.product_title,
          caption: item.caption,
          quantity: delta,
          price: item.price * delta,
          img_url: item.img_url,
        },
      ];
    });
  };

  return (
    <div className="min-h-full bg-linear-to-b from-blossom-100 via-blossom-50 to-white">
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <p className="font-accent text-sm font-semibold uppercase tracking-widest text-blossom-600">
            Client messages
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold text-cocoa-800 sm:text-4xl">
            Inquiries
          </h1>
          <p className="mt-3 max-w-2xl text-cocoa-600">
            Review client email requests, mark them as read, or attach products
            before you follow up.
          </p>
        </header>

        <section className="rounded-2xl border border-blossom-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-heading text-lg font-semibold text-cocoa-800">
                Inbox
              </p>
              <p className="mt-1 text-sm text-cocoa-600">
                {inquiries.length}{" "}
                {inquiries.length === 1 ? "inquiry" : "inquiries"} total
              </p>
            </div>
            <span className="rounded-full bg-blossom-100 px-4 py-1.5 font-accent text-sm font-semibold text-blossom-700">
              {unreadCount} unread
            </span>
          </div>
        </section>

        <section>
          {inquiries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-blossom-200 bg-blossom-50/50 px-6 py-16 text-center">
              <p className="font-heading text-lg font-semibold text-cocoa-800">
                No inquiries yet
              </p>
              <p className="mt-2 text-sm text-cocoa-600">
                New client messages will appear here as they come in.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-blossom-100 overflow-hidden rounded-2xl border border-blossom-200 bg-white shadow-sm">
              {inquiries.map((inquiry) => (
                <li
                  key={inquiry.id}
                  className={`p-5 transition-colors sm:p-6 ${
                    inquiry.is_read ? "bg-white" : "bg-blossom-50/60"
                  }`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${
                            inquiry.is_read
                              ? "bg-blossom-200"
                              : "bg-blossom-500"
                          }`}
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h2 className="font-heading text-lg font-bold text-cocoa-800">
                              {inquiry.name}
                            </h2>
                            <a
                              href={`mailto:${inquiry.email}`}
                              className="truncate text-sm text-blossom-600 underline-offset-2 hover:underline"
                            >
                              {inquiry.email}
                            </a>
                          </div>
                          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-cocoa-500">
                            {formatInquiryDate(inquiry.createdAt)}
                          </p>
                        </div>
                      </div>

                      <p className="whitespace-pre-wrap pl-5 text-sm leading-relaxed text-cocoa-700">
                        {inquiry.message}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2 pl-5 lg:pl-0 lg:justify-end">
                      {!inquiry.is_read && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(inquiry.id)}
                          className={markReadButtonClassName}
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleOpenAttachProducts(inquiry.id)}
                        className={attachProductsButtonClassName}
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Attach products
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteOrIgnore(inquiry.id)}
                        className={dangerButtonClassName}
                      >
                        Delete / ignore
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Activity
          mode={activeInquiryId && activeOrdersId ? "visible" : "hidden"}
        >
          {activeInquiryId && activeOrdersId && (
            <AttachProductsModal
              itemsWithCaption={itemsWithCaption}
              inquiredOrders={inquiredOrders}
              ordersId={activeOrdersId}
              onToggleInquiredOrder={handleToggleInquiredOrder}
              onInquiredOrderQuantityChange={handleInquiredOrderQuantityChange}
              onClose={handleCloseAttachProducts}
              onInquiryToOrdersClick={handleInquiryToOrdersClick}
            />
          )}
        </Activity>
      </div>
    </div>
  );
}

function AttachProductsModal({
  itemsWithCaption,
  inquiredOrders,
  ordersId,
  onToggleInquiredOrder,
  onInquiredOrderQuantityChange,
  onClose,
  onInquiryToOrdersClick,
}: {
  itemsWithCaption: TypeItemWithCaption[];
  inquiredOrders: TypeInquiredOrder[];
  ordersId: string;
  onToggleInquiredOrder: (item: TypeItemWithCaption, ordersId: string) => void;
  onInquiredOrderQuantityChange: (
    item: TypeItemWithCaption,
    ordersId: string,
    delta: number,
  ) => void;
  onClose: () => void;
  onInquiryToOrdersClick: () => void;
}) {
  const getQuantity = (item: TypeItemWithCaption) =>
    inquiredOrders.find((order) => orderMatchesItem(order, item))?.quantity ??
    0;

  const handleQuantityIncrementClick = (item: TypeItemWithCaption) => {
    onInquiredOrderQuantityChange(item, ordersId, 1);
  };

  const handleQuantityDecrementClick = (item: TypeItemWithCaption) => {
    onInquiredOrderQuantityChange(item, ordersId, -1);
  };

  return (
    <ModalShell title="Select products" onClose={onClose}>
      <p className="mt-2 text-sm text-cocoa-600">
        Choose items from the gallery to attach to this inquiry.
      </p>

      {itemsWithCaption.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-blossom-200 bg-blossom-50/50 px-4 py-10 text-center">
          <p className="font-heading text-base font-semibold text-cocoa-800">
            No products available
          </p>
          <p className="mt-1 text-sm text-cocoa-600">
            Add products in the gallery first.
          </p>
        </div>
      ) : (
        <ul className="mt-6 max-h-[50vh] space-y-3 overflow-y-auto pr-1">
          {itemsWithCaption.map((item) => {
            const isSelected = inquiredOrders.some((order) =>
              orderMatchesItem(order, item),
            );
            const quantity = getQuantity(item);
            const lineTotal = item.price * quantity;

            return (
              <li key={item.id}>
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-3 transition-colors ${
                    isSelected
                      ? "border-blossom-400 bg-blossom-50"
                      : "border-blossom-200 bg-white hover:border-blossom-300 hover:bg-blossom-50/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleInquiredOrder(item, ordersId)}
                    className="h-4 w-4 shrink-0 rounded border-blossom-300 text-blossom-600 focus:ring-blossom-300 hidden"
                  />
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-blossom-200 bg-blossom-50">
                    <Image
                      src={item.img_url}
                      alt={item.product_title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative min-w-0 flex-1 pb-5">
                    <p className="truncate font-heading text-base font-semibold text-cocoa-800">
                      {item.product_title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-sm text-cocoa-600">
                      {item.caption}
                    </p>
                    <div
                      className={quantityStepperClassName}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className={quantityButtonClassName}
                        onClick={() => handleQuantityDecrementClick(item)}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={quantity}
                        readOnly
                        aria-label="Quantity"
                        className={quantityInputClassName}
                      />
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className={quantityButtonClassName}
                        onClick={() => handleQuantityIncrementClick(item)}
                      >
                        +
                      </button>
                    </div>
                    <p className="absolute bottom-0 right-0 text-right font-accent text-sm font-semibold tabular-nums text-blossom-700">
                      {quantity > 0 ? (
                        <>
                          <span className="text-xs font-medium text-cocoa-500">
                            {formatProductPrice(item.price)} × {quantity}
                          </span>
                          <span className="mt-0.5 block">
                            {formatProductPrice(lineTotal)}
                          </span>
                        </>
                      ) : (
                        formatProductPrice(item.price)
                      )}
                    </p>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-blossom-100 pt-4">
        <div className="text-sm text-cocoa-600">
          <p>{inquiredOrders.length} selected</p>
          {inquiredOrders.length > 0 && (
            <p className="mt-1 font-accent font-semibold text-blossom-700">
              Total{" "}
              {formatProductPrice(
                inquiredOrders.reduce((sum, order) => sum + order.price, 0),
              )}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onInquiryToOrdersClick}
          className={secondaryButtonClassName}
        >
          Done
        </button>
      </div>
    </ModalShell>
  );
}
