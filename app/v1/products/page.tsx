"use client";

import { Activity, useState } from "react";

export default function EfMenuProducts() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleOpenAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };
  const handleCloseAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  return (
    <div className="mx-24 space-y-8">
      <h1>This is edible flowers menu products.</h1>
      <section className="border flex justify-between">
        <label htmlFor="product-search">
          <span>Search product: </span>
          <input
            type="text"
            name=""
            id="product-search"
            className="border w-[32rem]"
          />
        </label>
        <button onClick={handleOpenAddProductModal} className="border">
          Add product
        </button>
        <Activity mode={isAddProductModalOpen ? "visible" : "hidden"}>
          <AddProductModal onCloseModal={handleCloseAddProductModal} />
        </Activity>
      </section>
      <div className="border">
        <h1>Product Gallery</h1>
        {/* loop through ImageWithCaption db, card type */}
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

function AddProductModal({ onCloseModal }: { onCloseModal: () => void }) {
  // const [file, setFile] = useState<File | null>(null); // im not using this, am i??

  const [form, setForm] = useState<TypeAddProductForm>({
    title: "",
    caption: "",
    price: 0,
    img_file: null,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
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
      // body: JSON.stringify(form),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // thought we can convert to json a thing with type File--value vanishes upon reaching /api/route.ts
      body: formData,
    });

    const data = await response.json();

    console.log(`FROM PAGE.TSX RESPONSE DATA`);
    console.log(data);
  };

  return (
    <div className="border absolute w-xl h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
      <form action="" onSubmit={postProduct} className="border">
        <h1>Add product</h1>

        <label htmlFor="product-title" className="flex flex-col">
          <span>Product title: </span>
          <input
            type="text"
            name="title"
            id="product-title"
            value={form.title}
            onChange={handleFormChange}
            className="border"
          />
        </label>
        <label htmlFor="product-caption" className="flex flex-col">
          <span>Product caption: </span>
          <input
            type="text"
            name="caption"
            id="product-caption"
            value={form.caption}
            onChange={handleFormChange}
            className="border"
          />
        </label>
        <label htmlFor="product-price" className="flex flex-col">
          <span>Product price: </span>
          <input
            type="text"
            name="price"
            id="product-price"
            value={form.price}
            onChange={handleFormChange}
            className="border"
          />
        </label>

        <div>
          <label htmlFor="product-image" className="mb-2 block font-medium">
            Product image:
          </label>
          <input
            id="product-image"
            type="file"
            accept=".jpg, .jpeg, .webp, .png"
            onChange={handleProductImageChange}
            className="block w-full cursor-pointer text-sm text-slate-600 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-emerald-600 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700"
          />
        </div>

        <div className="flex justify-evenly">
          <button type="submit" className="border">
            Add product
          </button>
          <button onClick={onCloseModal} type="button" className="border">
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
