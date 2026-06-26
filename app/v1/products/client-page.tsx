"use client";

import { TypeImageWithTitle } from "@/dal/menu/products/get/images-with-caption";
import { Activity, useEffect, useState } from "react";
import ImageWithTitleJSX from "./image-w-title";
import {
  fileInputClassName,
  inputClassName,
  labelClassName,
  ModalShell,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "./ui/shared";

export default function EfMenuProductsClient({
  imagesWithCaption,
}: {
  imagesWithCaption: TypeImageWithTitle[];
}) {
  const [imagesWithTitle, setImagesWithTitle] =
    useState<TypeImageWithTitle[]>(imagesWithCaption);

  const [titleSearch, setTitleSearch] = useState<string>("");

  const [isAddProductModalOpen, setIsAddProductModalOpen] =
    useState<boolean>(false);

  const handleTitleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleSearch(e.target.value);
  };

  async function fetchProducts(title: string) {
    const params = new URLSearchParams({
      title,
    });

    console.log(params.toString());

    const response = await fetch(`/api/product/search?${params.toString()}`);
    const data = await response.json();

    const imagesWithTitleArray: TypeImageWithTitle[] = data.searchProductTitle;

    setImagesWithTitle(imagesWithTitleArray);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(titleSearch);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [titleSearch]);

  const handleOpenAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };
  const handleCloseAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  return (
    <div className="min-h-full bg-linear-to-b from-blossom-100 via-blossom-50 to-white">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <p className="font-accent text-sm font-semibold uppercase tracking-widest text-blossom-600">
            Menu management
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold text-cocoa-800 sm:text-4xl">
            Product Gallery
          </h1>
          <p className="mt-3 max-w-2xl text-cocoa-600">
            Browse, search, and manage edible flower cupcake products.
          </p>
        </header>

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
                onChange={handleTitleSearchChange}
                placeholder="Search by title..."
                className={inputClassName}
              />
            </div>
            <button
              type="button"
              onClick={handleOpenAddProductModal}
              className={primaryButtonClassName}
            >
              Add product
            </button>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="font-heading text-2xl font-bold text-cocoa-800">
              All products
            </h2>
            <span className="font-accent text-sm font-medium text-blossom-600">
              {imagesWithTitle.length}{" "}
              {imagesWithTitle.length === 1 ? "item" : "items"}
            </span>
          </div>

          {imagesWithTitle.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-blossom-200 bg-blossom-50/50 px-6 py-16 text-center">
              <p className="font-heading text-lg font-semibold text-cocoa-800">
                No products found
              </p>
              <p className="mt-2 text-sm text-cocoa-600">
                Try a different search term or add a new product.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {imagesWithTitle.map((imageWithTitle: TypeImageWithTitle) => (
                <ImageWithTitleJSX
                  key={imageWithTitle.id}
                  imageWithTitle={imageWithTitle}
                />
              ))}
            </div>
          )}
        </section>

        <Activity mode={isAddProductModalOpen ? "visible" : "hidden"}>
          <AddProductModal onCloseAddProductModal={handleCloseAddProductModal} />
        </Activity>
      </div>
    </div>
  );
}

type TypeAddProductForm = {
  title: string;
  caption: string;
  price: number;
  img_file: File | null;
};

function AddProductModal({
  onCloseAddProductModal,
}: {
  onCloseAddProductModal: () => void;
}) {
  const [form, setForm] = useState<TypeAddProductForm>({
    title: "",
    caption: "",
    price: 0,
    img_file: null,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) || 0 : value,
    }));

    console.log(form);
  };

  const handleProductImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log(file);

    setForm((prev) => ({
      ...prev,
      img_file: file,
    }));
  };

  const postProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.img_file) return;

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("caption", form.caption);
    formData.append("price", String(form.price));
    formData.append("img-file", form.img_file);

    const response = await fetch("/api/product/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(`FROM PAGE.TSX RESPONSE DATA`);
    console.log(data);
  };

  return (
    <ModalShell title="Add product" onClose={onCloseAddProductModal}>
      <form onSubmit={postProduct} className="mt-6 space-y-5">
        <div>
          <label htmlFor="product-title" className={labelClassName}>
            Product title
          </label>
          <input
            type="text"
            name="title"
            id="product-title"
            value={form.title}
            onChange={handleFormChange}
            required
            placeholder="Rose Garden Cupcakes"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="product-caption" className={labelClassName}>
            Product caption
          </label>
          <textarea
            name="caption"
            id="product-caption"
            value={form.caption}
            onChange={handleFormChange}
            rows={3}
            placeholder="A short description of this product..."
            className={`${inputClassName} resize-y`}
          />
        </div>

        <div>
          <label htmlFor="product-price" className={labelClassName}>
            Product price
          </label>
          <input
            type="number"
            name="price"
            id="product-price"
            value={form.price || ""}
            onChange={handleFormChange}
            min={0}
            step="0.01"
            placeholder="0.00"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="product-image" className={labelClassName}>
            Product image
          </label>
          <input
            id="product-image"
            type="file"
            accept=".jpg,.jpeg,.webp,.png"
            onChange={handleProductImageChange}
            className={`${fileInputClassName} mt-1.5`}
          />
        </div>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCloseAddProductModal}
            className={secondaryButtonClassName}
          >
            Cancel
          </button>
          <button type="submit" className={primaryButtonClassName}>
            Add product
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
