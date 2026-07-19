"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  fileInputClassName,
  inputClassName,
  labelClassName,
  ModalShell,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "../ui/shared";

export default function AddProductModal({
  onCloseAddProductModal,
}: {
  onCloseAddProductModal: () => void;
}) {
  const router = useRouter();
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

    try {
      if (!form.img_file) return;

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("caption", form.caption);
      formData.append("price", String(form.price));
      formData.append("img-file", form.img_file);

      const response = await toast.promise(
        (async () => {
          const res = await fetch("/api/product/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            throw new Error("Failed to add product.");
          }

          return res.json();
        })(),
        {
          pending: "Uploading...",
          success: "Product added successfully.",
          error: "Something went wrong. Please try again.",
        },
      );
    } catch (error) {
      console.log(`$ERROR: ${error}`);
      toast.error("Something went wrong. Please try again.");
    } finally {
      onCloseAddProductModal();
      setForm({
        title: "",
        caption: "",
        price: 0,
        img_file: null,
      });
      router.refresh();
    }
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

type TypeAddProductForm = {
  title: string;
  caption: string;
  price: number;
  img_file: File | null;
};
