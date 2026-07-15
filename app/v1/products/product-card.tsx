"use client";

import { Activity, useState } from "react";
import Image from "next/image";
import { TypeImageWithTitle } from "@/dal/menu/products/get/images-with-caption";
import { cardActionButtonClassName, DeleteIcon, EditIcon } from "./ui/shared";
import EditProductModal from "./crud-modals/edit-product-modal";
import DeleteWarningModal from "./crud-modals/delete-product-modal";

function formatProductPrice(price: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(price);
}

export default function ProductCardJSX({
  imageWithTitle,
}: {
  imageWithTitle: TypeImageWithTitle;
}) {
  const [isEditProductModalOpen, setIsEditProductModalOpen] =
    useState<boolean>(false);
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] =
    useState<boolean>(false);

  const handleOpenEditProductModal = () => {
    setIsEditProductModalOpen(true);
  };
  const handleCloseEditProductModal = () => {
    setIsEditProductModalOpen(false);
  };

  const handleOpenDeleteWarning = () => {
    setIsDeleteWarningOpen(true);
  };
  const handleCloseDeleteWarning = () => {
    setIsDeleteWarningOpen(false);
  };

  const createdAtLabel = imageWithTitle.createdAt
    ? new Date(imageWithTitle.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <>
      <article className="group overflow-hidden rounded-2xl border border-blossom-100 bg-blossom-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-4/3 overflow-hidden">
          <div className="absolute inset-0 z-10 bg-linear-to-t from-cocoa-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute z-20 top-3 right-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={handleOpenEditProductModal}
              aria-label={`Edit ${imageWithTitle.product_title}`}
              className={cardActionButtonClassName}
            >
              <EditIcon />
            </button>
            <button
              type="button"
              onClick={handleOpenDeleteWarning}
              aria-label={`Delete ${imageWithTitle.product_title}`}
              className={`${cardActionButtonClassName} hover:bg-red-600`}
            >
              <DeleteIcon />
            </button>
          </div>
          <Image
            src={imageWithTitle.img_url}
            alt={imageWithTitle.product_title || "Edible flower product"}
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-xl font-semibold text-cocoa-800">
              {imageWithTitle.product_title}
            </h3>
            <p className="shrink-0 rounded-full bg-blossom-100 px-3 py-1 font-accent text-sm font-semibold text-blossom-700">
              {formatProductPrice(imageWithTitle.price)}
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-cocoa-600">
            {imageWithTitle.caption}
          </p>
          {createdAtLabel && (
            <p className="mt-3 font-accent text-xs font-medium uppercase tracking-wide text-blossom-600">
              Added {createdAtLabel}
            </p>
          )}
        </div>
      </article>

      <Activity mode={isEditProductModalOpen ? "visible" : "hidden"}>
        <EditProductModal
          imageWithTitle={imageWithTitle}
          onCloseEditProductModal={handleCloseEditProductModal}
        />
      </Activity>

      <Activity mode={isDeleteWarningOpen ? "visible" : "hidden"}>
        <DeleteWarningModal
          productId={imageWithTitle.id}
          productTitle={imageWithTitle.product_title}
          onClose={handleCloseDeleteWarning}
        />
      </Activity>
    </>
  );
}
