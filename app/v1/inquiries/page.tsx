export const dynamic = "force-dynamic";

import { getInquiries } from "@/dal/menu/inquiries/get/get-inquiries";
import { getItemsWithCaption } from "@/dal/menu/inquiries/get/get-items-with-caption";
import EfMenuInquiriesClient, { formatInquiryDate } from "./client-page";
import EfBtnMarkRead from "./btn-mark-read";
import EfBtnDeleteInquiry from "./btn-delete-inquiry";
import EfBtnAttachProducts from "./btn-attach-product";

export default async function EfMenuInquiries() {
  const [inquiries, itemsWithCaption] = await Promise.all([
    getInquiries(),
    getItemsWithCaption(),
  ]);

  // const unreadCount = inquiries.filter((inquiry) => !inquiry.is_read).length;

  // return (
  // <div className="min-h-full bg-linear-to-b from-blossom-100 via-blossom-50 to-white">
  //       <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
  //         <header>
  //           <p className="font-accent text-sm font-semibold uppercase tracking-widest text-blossom-600">
  //             Client messages
  //           </p>
  //           <h1 className="font-heading mt-2 text-3xl font-bold text-cocoa-800 sm:text-4xl">
  //             Inquiries
  //           </h1>
  //           <p className="mt-3 max-w-2xl text-cocoa-600">
  //             Review client email requests, mark them as read, or attach products
  //             before you follow up.
  //           </p>
  //         </header>

  //         <section className="rounded-2xl border border-blossom-200 bg-white p-5 shadow-sm sm:p-6">
  //           <div className="flex flex-wrap items-center justify-between gap-4">
  //             <div>
  //               <p className="font-heading text-lg font-semibold text-cocoa-800">
  //                 Inbox
  //               </p>
  //               <p className="mt-1 text-sm text-cocoa-600">
  //                 {inquiries.length}{" "}
  //                 {inquiries.length === 1 ? "inquiry" : "inquiries"} total
  //               </p>
  //             </div>
  //             <span className="rounded-full bg-blossom-100 px-4 py-1.5 font-accent text-sm font-semibold text-blossom-700">
  //               {unreadCount} unread
  //             </span>
  //           </div>
  //         </section>

  //         <section>
  //           {inquiries.length === 0 ? (
  //             <div className="rounded-2xl border border-dashed border-blossom-200 bg-blossom-50/50 px-6 py-16 text-center">
  //               <p className="font-heading text-lg font-semibold text-cocoa-800">
  //                 No inquiries yet
  //               </p>
  //               <p className="mt-2 text-sm text-cocoa-600">
  //                 New client messages will appear here as they come in.
  //               </p>
  //             </div>
  //           ) : (
  //             <ul className="divide-y divide-blossom-100 overflow-hidden rounded-2xl border border-blossom-200 bg-white shadow-sm">
  //               {inquiries.map((inquiry) => (
  //                 <li
  //                   key={inquiry.id}
  //                   className={`p-5 transition-colors sm:p-6 ${
  //                     inquiry.is_read ? "bg-white" : "bg-blossom-50/60"
  //                   }`}
  //                 >
  //                   <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
  //                     <div className="min-w-0 flex-1 space-y-3">
  //                       <div className="flex items-start gap-3">
  //                         <span
  //                           className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${
  //                             inquiry.is_read
  //                               ? "bg-blossom-200"
  //                               : "bg-blossom-500"
  //                           }`}
  //                           aria-hidden="true"
  //                         />
  //                         <div className="min-w-0">
  //                           <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
  //                             <h2 className="font-heading text-lg font-bold text-cocoa-800">
  //                               {inquiry.name}
  //                             </h2>
  //                             <a
  //                               href={`mailto:${inquiry.email}`}
  //                               className="truncate text-sm text-blossom-600 underline-offset-2 hover:underline"
  //                             >
  //                               {inquiry.email}
  //                             </a>
  //                           </div>
  //                           <p className="mt-1 text-xs font-medium uppercase tracking-wide text-cocoa-500">
  //                             {formatInquiryDate(inquiry.createdAt)}
  //                           </p>
  //                         </div>
  //                       </div>

  //                       <p className="whitespace-pre-wrap pl-5 text-sm leading-relaxed text-cocoa-700">
  //                         {inquiry.message}
  //                       </p>
  //                     </div>

  //                     <div className="flex shrink-0 flex-wrap gap-2 pl-5 lg:pl-0 lg:justify-end">
  //                       {!inquiry.is_read && (
  //                         <EfBtnMarkRead inquiryId={inquiry.id} />
  //                       )}
  //                       {/* <button
  //                         type="button"
  //                         onClick={() => handleOpenAttachProducts(inquiry.id)}
  //                         className={attachProductsButtonClassName}
  //                       >
  //                         <svg
  //                           className="h-4 w-4"
  //                           fill="none"
  //                           viewBox="0 0 24 24"
  //                           stroke="currentColor"
  //                           strokeWidth={2}
  //                           aria-hidden="true"
  //                         >
  //                           <path
  //                             strokeLinecap="round"
  //                             strokeLinejoin="round"
  //                             d="M12 4v16m8-8H4"
  //                           />
  //                         </svg>
  //                         Attach products
  //                       </button> */}
  //                       <EfBtnAttachProducts inquiryId={inquiry.id} />
  //                       <EfBtnDeleteInquiry inquiryId={inquiry.id} />
  //                     </div>
  //                   </div>
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </section>

  //       </div>
  //     </div>
  //   )

  return (
    <EfMenuInquiriesClient
      inquiries={inquiries}
      itemsWithCaption={itemsWithCaption}
    />
  );
}
