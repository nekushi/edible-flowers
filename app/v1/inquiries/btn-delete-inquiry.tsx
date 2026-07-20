import { toast } from "react-toastify";
import { dangerButtonClassName } from "../products/ui/shared";
import { ApiResponse } from "@/app/z-landing-page-contents/types";
import { useRouter } from "next/navigation";

export default function EfBtnDeleteInquiry({
  inquiryId,
}: {
  inquiryId: string;
}) {
  const router = useRouter();
  const handleDeleteOrIgnore = async (inquiryId: string) => {
    const params = new URLSearchParams({
      id: inquiryId,
    });

    try {
      const response = await toast.promise(
        (async () => {
          const res = await fetch(
            `/api/v1/inquiry/delete?${params.toString()}`,
            {
              method: "DELETE",
            },
          );

          if (!res.ok) {
            throw new Error("Failed to delete inquiry.");
          }

          const data: ApiResponse = await res.json();

          if (data.type === "error") {
            throw new Error(data.message);
          }

          return data;
        })(),
        {
          pending: "Deleting inquiry...",
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
      onClick={() => handleDeleteOrIgnore(inquiryId)}
      className={dangerButtonClassName}
    >
      Delete / ignore
    </button>
  );
}
