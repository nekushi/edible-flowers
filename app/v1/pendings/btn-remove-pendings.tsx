import { toast } from "react-toastify";
import { DeleteIcon } from "../products/ui/shared";
import { deleteIconButtonClassName } from "./pending-cards";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/app/z-landing-page-contents/types";

export default function EfBtnRemovePendings({
  pendingId,
}: {
  pendingId: string;
}) {
  const router = useRouter();

  const handleDeleteClick = async (ordersId: string) => {
    const params = new URLSearchParams({
      orders_id: ordersId,
    });

    console.log(params.toString());

    try {
      const response = await toast.promise(
        (async () => {
          const res = await fetch(
            `/api/v1/pendings/delete?${params.toString()}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!res.ok) {
            throw new Error("Failed to mark done a pending.");
          }

          const data: ApiResponse = await res.json();

          if (data.type === "error") {
            throw new Error(data.message);
          }

          return data;
        })(),
        {
          pending: "Deleting...",
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

      router.refresh();
    } catch (error) {
      console.log(`$ERROR: ${error}`);
    }
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
