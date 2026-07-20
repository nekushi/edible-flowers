"use client";

import { toast } from "react-toastify";
import {
  inputClassName,
  labelClassName,
  ModalShell,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "../ui/shared";
import Image from "next/image";
import { TypeImageWithTitle } from "@/dal/menu/products/get/images-with-caption";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TypeEditProductForm = {
  id: string;
  title: string;
  caption: string;
  price: number;
};

export default function EditProductModal({
  imageWithTitle,
  onCloseEditProductModal,
}: {
  imageWithTitle: TypeImageWithTitle;
  onCloseEditProductModal: () => void;
}) {
  const router = useRouter();

  const [form, setForm] = useState<TypeEditProductForm>({
    id: imageWithTitle.id ?? "",
    title: imageWithTitle.product_title ?? "",
    caption: imageWithTitle.caption ?? "",
    price: imageWithTitle.price ?? 0,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formdata = new FormData();

      formdata.append("updated-id", form.id);
      formdata.append("updated-title", form.title);
      formdata.append("updated-caption", form.caption);
      formdata.append("updated-price", String(form.price));

      const response = await toast.promise(
        (async () => {
          const res = await fetch(`/api/v1/product/update`, {
            method: "PUT",
            body: formdata,
          });

          if (!res.ok) {
            throw new Error("Failed to update product.");
          }

          return res.json();
        })(),
        {
          pending: "Updating...",
          success: "Product updated successfully.",
          error: "An error occurred. Please try again.",
        },
      );
    } catch (error) {
      console.log(`$ERROR: ${error}`);
      toast.error("An error occurred. Please try again.");
    } finally {
      router.refresh();
      onCloseEditProductModal();
    }
  };

  return (
    <ModalShell title="Edit product" onClose={onCloseEditProductModal}>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="hidden">
          <label htmlFor={`id`} className={labelClassName}>
            Product uuid
            <input
              type="text"
              name="id"
              id={`id`}
              value={form.id}
              onChange={handleFormChange}
              required
              className={inputClassName}
            />
          </label>
        </div>

        <div>
          <label htmlFor={`product-title`} className={labelClassName}>
            Product title
            <input
              type="text"
              name="title"
              id={`product-title`}
              value={form.title}
              onChange={handleFormChange}
              required
              className={inputClassName}
            />
          </label>
        </div>

        <div>
          <label htmlFor={`product-caption`} className={labelClassName}>
            Product caption
            <input
              type="text"
              name="caption"
              id={`product-caption`}
              value={form.caption}
              onChange={handleFormChange}
              className={inputClassName}
            />
          </label>
        </div>

        <div>
          <label htmlFor={`product-price`} className={labelClassName}>
            Product price
            <input
              type="number"
              name="price"
              id={`product-price`}
              value={form.price || ""}
              onChange={handleFormChange}
              min={0}
              step="0.01"
              required
              className={inputClassName}
            />
          </label>
        </div>

        <div>
          <p className={labelClassName}>Current image</p>
          <div className="relative mt-1.5 aspect-4/3 overflow-hidden rounded-xl border border-blossom-200">
            <Image
              src={imageWithTitle.img_url}
              alt={imageWithTitle.product_title || "Product preview"}
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCloseEditProductModal}
            className={secondaryButtonClassName}
          >
            Cancel
          </button>
          <button type="submit" className={primaryButtonClassName}>
            Save changes
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
