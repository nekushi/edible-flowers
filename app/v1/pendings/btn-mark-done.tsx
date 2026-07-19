import { markDoneButtonClassName } from "./pending-cards";
import { useRouter } from "next/navigation";

export default function EfBtnMarkDone({ pendingId }: { pendingId: string }) {
  const router = useRouter();

  const handleMarkDoneClick = async (ordersId: string) => {
    const params = new URLSearchParams({
      orders_id: ordersId,
    });

    console.log(params.toString());

    const response = await fetch(
      `/api/v1/pendings/mark-done?${params.toString()}`,
      {
        method: "PATCH",
      },
    );

    const data = await response.json();

    console.log(data);

    router.refresh();
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
