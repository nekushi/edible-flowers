"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  dangerButtonClassName,
  inputClassName,
  labelClassName,
  ModalShell,
  secondaryButtonClassName,
} from "../ui/shared";

export default function DeleteWarningModal({
  productId,
  productTitle,
  onClose,
}: {
  productId: string;
  productTitle: string;
  onClose: () => void;
}) {
  const router = useRouter();

  const handleDeleteProductSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams({
        id: productId,
      });

      const response = await toast.promise(
        (async () => {
          const res = await fetch(
            `/api/v1/product/delete?${params.toString()}`,
            {
              method: "DELETE",
              body: params,
            },
          );

          if (!res.ok) {
            throw new Error("Failed to delete product.");
          }

          return res.json();
        })(),
        {
          pending: "Deleting...",
          success: "Product deleted successfully.",
          error: "Something went wrong. Please try again.",
        },
      );
    } catch (error) {
      console.log(`$ERROR: ${error}`);
      toast.error("Something went wrong. Please try again.");
    } finally {
      router.refresh();
      onClose();
    }
  };
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
        <form onSubmit={handleDeleteProductSubmit}>
          <div className="hidden">
            <label htmlFor={`id`} className={labelClassName}>
              Product uuid
              <input
                type="text"
                name="id"
                id={`id`}
                defaultValue={productId}
                required
                className={inputClassName}
              />
            </label>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={secondaryButtonClassName}
          >
            Cancel
          </button>
          <button type="submit" className={dangerButtonClassName}>
            Delete
          </button>
        </form>
      </div>
    </ModalShell>
  );
}
