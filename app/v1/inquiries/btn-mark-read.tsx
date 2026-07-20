import { toast } from "react-toastify";
import { markReadButtonClassName } from "./client-page";
import { ApiResponse } from "@/app/z-landing-page-contents/types";
import { useRouter } from "next/navigation";

export default function EfBtnMarkRead({ inquiryId }: { inquiryId: string }) {
  const router = useRouter();

  const handleMarkAsRead = async (inquiryId: string) => {
    const params = new URLSearchParams({
      id: inquiryId,
    });

    try {
      const response = await toast.promise(
        (async () => {
          const res = await fetch(`/api/v1/inquiry/mark-as-read?${params}`, {
            method: "PATCH",
          });

          if (!res.ok) {
            throw new Error("Failed to patch inquiry.");
          }

          const data: ApiResponse = await res.json();

          if (data.type === "error") {
            throw new Error(data.message);
          }

          return data;
        })(),
        {
          pending: "Marking as read...",
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
      onClick={() => handleMarkAsRead(inquiryId)}
      className={markReadButtonClassName}
    >
      Mark as read
    </button>
  );
}
