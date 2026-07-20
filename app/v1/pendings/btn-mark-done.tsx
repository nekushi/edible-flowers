import { toast } from "react-toastify";
import { markDoneButtonClassName } from "./pending-cards";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/app/z-landing-page-contents/types";

export default function EfBtnMarkDone({ pendingId }: { pendingId: string }) {
  const router = useRouter();

  const handleMarkDoneClick = async (ordersId: string) => {
    const params = new URLSearchParams({
      orders_id: ordersId,
    });

    console.log(params.toString());

    try {
      const response = await toast.promise(
        (async () => {
          const res = await fetch(
            `/api/v1/pendings/mark-done?${params.toString()}`,
            {
              method: "PATCH",
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
          pending: "Marking as done...",
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
      aria-label="Mark as done"
      onClick={() => handleMarkDoneClick(pendingId)}
      className={markDoneButtonClassName}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {/* Mark done */}
    </button>
  );
}
