"use client";

import { DeleteIcon } from "../products/ui/shared";
import { deleteIconButtonClassName } from "./pending-cards";

export default function EfBtnRemovePendings({
  pendingId,
}: {
  pendingId: string;
}) {
  const handleDeleteClick = async (ordersId: string) => {
    const params = new URLSearchParams({
      orders_id: ordersId,
    });

    console.log(params.toString());

    const response = await fetch(
      `/api/v1/pendings/delete?${params.toString()}`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();

    console.log(data);
  };

  return (
    <button
      type="button"
      aria-label="Delete pending"
      onClick={() => handleDeleteClick(pendingId)}
      className={deleteIconButtonClassName}
    >
      <DeleteIcon />
    </button>
  );
}
