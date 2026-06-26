"use client";

import { Activity, useState } from "react";
import Image from "next/image";
import { TypeImageWithTitle } from "@/dal/menu/products/get/images-with-caption";
import {
  cardActionButtonClassName,
  dangerButtonClassName,
  DeleteIcon,
  EditIcon,
  inputClassName,
  labelClassName,
  ModalShell,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "./ui/shared";

import { useRouter } from "next/navigation";

export default function ImageWithTitleJSX({
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
          <h3 className="font-heading text-xl font-semibold text-cocoa-800">
            {imageWithTitle.product_title}
          </h3>
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
          productTitle={imageWithTitle.product_title}
          onClose={handleCloseDeleteWarning}
        />
      </Activity>
    </>
  );
}

function DeleteWarningModal({
  productTitle,
  onClose,
}: {
  productTitle: string;
  onClose: () => void;
}) {
  return (
    <ModalShell title="Delete product?" onClose={onClose}>
      <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="flex gap-3">
          <svg
            className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-sm leading-relaxed text-cocoa-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-cocoa-800">
              &ldquo;{productTitle}&rdquo;
            </span>
            ? This action cannot be undone.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className={secondaryButtonClassName}
        >
          Cancel
        </button>
        <button type="button" className={dangerButtonClassName}>
          Delete
        </button>
      </div>
    </ModalShell>
  );
}

type TypeEditProductForm = {
  id: string;
  title: string;
  caption: string;
};

function EditProductModal({
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
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("updated-id", form.id);
    formdata.append("updated-title", form.title);
    formdata.append("updated-caption", form.caption);

    try {
      const response = await fetch(`/api/product/update`, {
        method: "PUT",
        body: formdata,
      });

      const data = await response.json();
      console.log(data.message);
      console.log(data.updatedImageWithCaption);
      router.refresh();

      onCloseEditProductModal();
    } catch (error) {
      console.log(`ERROR: ${error}`);
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
