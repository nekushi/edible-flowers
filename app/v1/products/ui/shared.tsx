"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const inputClassName =
  "mt-1.5 w-full rounded-lg border border-blossom-200 bg-blossom-50/50 px-4 py-2.5 text-sm text-cocoa-800 outline-none transition-colors focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200";

export const labelClassName =
  "block font-accent text-sm font-medium text-cocoa-700";

export const primaryButtonClassName =
  "inline-flex items-center justify-center rounded-full bg-blossom-500 px-6 py-2.5 font-accent text-sm font-semibold text-white transition-all hover:bg-blossom-600";

export const secondaryButtonClassName =
  "inline-flex items-center justify-center rounded-full border-2 border-blossom-300 bg-white px-6 py-2.5 font-accent text-sm font-semibold text-cocoa-700 transition-all hover:border-blossom-400 hover:bg-blossom-50";

export const dangerButtonClassName =
  "inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 font-accent text-sm font-semibold text-white transition-all hover:bg-red-700";

export const fileInputClassName =
  "block w-full cursor-pointer text-sm text-cocoa-600 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-blossom-500 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-blossom-600";

export function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="fixed inset-0 z-[100] bg-cocoa-800/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="pointer-events-auto relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-blossom-200 bg-white p-6 shadow-xl sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <h2
              id="modal-title"
              className="font-heading text-2xl font-bold text-cocoa-800"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-cocoa-500 transition-colors hover:bg-blossom-100 hover:text-cocoa-800"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}

export function EditIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

export function DeleteIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

export const cardActionButtonClassName =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/90 text-cocoa-700 shadow-sm backdrop-blur-sm transition-all hover:bg-blossom-500 hover:text-white";
