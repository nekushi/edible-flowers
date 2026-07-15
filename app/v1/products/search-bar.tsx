"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  inputClassName,
  labelClassName,
  primaryButtonClassName,
} from "./ui/shared";
import { TypeImageWithTitle } from "@/dal/menu/products/get/images-with-caption";

export default function EfProductsSearchBar({
  titleSearch,
  onTitleSearchChange,
  onOpenAddProductModal,
}: {
  titleSearch: string;
  onTitleSearchChange: (e: ChangeEvent<HTMLInputElement, Element>) => void;
  onOpenAddProductModal: () => void;
}) {
  return (
    <section className="rounded-2xl border border-blossom-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1 sm:max-w-md">
          <label htmlFor="product-search" className={labelClassName}>
            Search products
          </label>
          <input
            type="search"
            name="product-search"
            id="product-search"
            value={titleSearch}
            // onChange={handleTitleSearchChange}
            onChange={onTitleSearchChange}
            placeholder="Search by title..."
            className={inputClassName}
          />
        </div>
        <button
          type="button"
          onClick={onOpenAddProductModal}
          className={primaryButtonClassName}
        >
          Add product
        </button>
      </div>
    </section>
  );
}
