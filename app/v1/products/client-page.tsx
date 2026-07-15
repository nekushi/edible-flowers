"use client";

import { TypeImageWithTitle } from "@/dal/menu/products/get/images-with-caption";
import { Activity, useEffect, useState } from "react";
import ProductCardJSX from "./product-card";
import AddProductModal from "./crud-modals/add-product-modal";
import EfProductsSearchBar from "./search-bar";

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

  useEffect(() => {
    setImagesWithTitle(imagesWithCaption);
  }, [imagesWithCaption]);

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
      {/* Headings */}
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

        {/* Search Bar and Add Product Modal Button */}
        <EfProductsSearchBar
          titleSearch={titleSearch}
          onTitleSearchChange={handleTitleSearchChange}
          onOpenAddProductModal={handleOpenAddProductModal}
        />

        {/* Display All Products */}
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
                <ProductCardJSX
                  key={imageWithTitle.id}
                  imageWithTitle={imageWithTitle}
                />
              ))}
            </div>
          )}
        </section>

        <Activity mode={isAddProductModalOpen ? "visible" : "hidden"}>
          <AddProductModal
            onCloseAddProductModal={handleCloseAddProductModal}
          />
        </Activity>
      </div>
    </div>
  );
}
