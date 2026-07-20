import Image from "next/image";

import { ModalShell, secondaryButtonClassName } from "../products/ui/shared";
import {
  formatProductPrice,
  orderMatchesItem,
  quantityButtonClassName,
  quantityInputClassName,
  quantityStepperClassName,
  TypeInquiredOrder,
} from "./client-page";
import { TypeItemWithCaption } from "@/dal/menu/inquiries/get/get-items-with-caption";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ApiResponse } from "@/app/z-landing-page-contents/types";

export default function AttachProductsModal({
  itemsWithCaption,
  inquiredOrders,
  ordersId,
  onToggleInquiredOrder,
  onInquiredOrderQuantityChange,
  onClose,
}: {
  itemsWithCaption: TypeItemWithCaption[];
  inquiredOrders: TypeInquiredOrder[];
  ordersId: string;
  onToggleInquiredOrder: (item: TypeItemWithCaption, ordersId: string) => void;
  onInquiredOrderQuantityChange: (
    item: TypeItemWithCaption,
    ordersId: string,
    delta: number,
  ) => void;
  onClose: () => void;
}) {
  const router = useRouter();

  const handleInquiryToOrdersClick = async () => {
    try {
      const response = await toast.promise(
        (async () => {
          const res = await fetch(`/api/v1/inquiry/post-to-orders`, {
            method: "POST",
            body: JSON.stringify(inquiredOrders),
          });

          if (!res.ok) {
            throw new Error("Failed to attach products to pendings.");
          }

          const data: ApiResponse = await res.json();

          if (data.type === "error") {
            throw new Error(data.message);
          }

          return data;
        })(),
        {
          pending: "Attaching products...",
          success: {
            render({ data }: { data: { message: string } }) {
              return data.message;
            },
          },
          error: {
            render({ data }: { data: Error }) {
              return data.message;
            },
          },
        },
      );

      onClose();

      router.refresh();
    } catch (error) {
      console.log(`$ERROR: ${error}`);
    }

    // const response = await fetch(`/api/v1/inquiry/post-to-orders`, {
    //   method: "POST",
    //   body: JSON.stringify(inquiredOrders),
    // });

    // const data = await response.json();

    // console.log(data);

    // onClose();
  };

  const getQuantity = (item: TypeItemWithCaption) =>
    inquiredOrders.find((order) => orderMatchesItem(order, item))?.quantity ??
    0;

  const handleQuantityIncrementClick = (item: TypeItemWithCaption) => {
    onInquiredOrderQuantityChange(item, ordersId, 1);
  };

  const handleQuantityDecrementClick = (item: TypeItemWithCaption) => {
    onInquiredOrderQuantityChange(item, ordersId, -1);
  };

  return (
    <ModalShell title="Select products" onClose={onClose}>
      <p className="mt-2 text-sm text-cocoa-600">
        Choose items from the gallery to attach to this inquiry.
      </p>

      {itemsWithCaption.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-blossom-200 bg-blossom-50/50 px-4 py-10 text-center">
          <p className="font-heading text-base font-semibold text-cocoa-800">
            No products available
          </p>
          <p className="mt-1 text-sm text-cocoa-600">
            Add products in the gallery first.
          </p>
        </div>
      ) : (
        <ul className="mt-6 max-h-[50vh] space-y-3 overflow-y-auto pr-1">
          {itemsWithCaption.map((item) => {
            const isSelected = inquiredOrders.some((order) =>
              orderMatchesItem(order, item),
            );
            const quantity = getQuantity(item);
            const lineTotal = item.price * quantity;

            return (
              <li key={item.id}>
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-3 transition-colors ${
                    isSelected
                      ? "border-blossom-400 bg-blossom-50"
                      : "border-blossom-200 bg-white hover:border-blossom-300 hover:bg-blossom-50/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleInquiredOrder(item, ordersId)}
                    className="h-4 w-4 shrink-0 rounded border-blossom-300 text-blossom-600 focus:ring-blossom-300 hidden"
                  />
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-blossom-200 bg-blossom-50">
                    <Image
                      src={item.img_url}
                      alt={item.product_title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative min-w-0 flex-1 pb-5">
                    <p className="truncate font-heading text-base font-semibold text-cocoa-800">
                      {item.product_title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-sm text-cocoa-600">
                      {item.caption}
                    </p>
                    <div
                      className={quantityStepperClassName}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className={quantityButtonClassName}
                        onClick={() => handleQuantityDecrementClick(item)}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={quantity}
                        readOnly
                        aria-label="Quantity"
                        className={quantityInputClassName}
                      />
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className={quantityButtonClassName}
                        onClick={() => handleQuantityIncrementClick(item)}
                      >
                        +
                      </button>
                    </div>
                    <p className="absolute bottom-0 right-0 text-right font-accent text-sm font-semibold tabular-nums text-blossom-700">
                      {quantity > 0 ? (
                        <>
                          <span className="text-xs font-medium text-cocoa-500">
                            {formatProductPrice(item.price)} × {quantity}
                          </span>
                          <span className="mt-0.5 block">
                            {formatProductPrice(lineTotal)}
                          </span>
                        </>
                      ) : (
                        formatProductPrice(item.price)
                      )}
                    </p>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-blossom-100 pt-4">
        <div className="text-sm text-cocoa-600">
          <p>{inquiredOrders.length} selected</p>
          {inquiredOrders.length > 0 && (
            <p className="mt-1 font-accent font-semibold text-blossom-700">
              Total{" "}
              {formatProductPrice(
                inquiredOrders.reduce((sum, order) => sum + order.price, 0),
              )}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleInquiryToOrdersClick}
          className={secondaryButtonClassName}
        >
          Done
        </button>
      </div>
    </ModalShell>
  );
}
