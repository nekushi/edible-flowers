export const dynamic = "force-dynamic";

import { getPendings } from "@/dal/menu/inquiries/get/get-pendings";
import { PendingInquiryCard } from "./pending-cards";

export default async function EfMenuPendings() {
  const pendings: TypePendingInquiry[] = await getPendings();

  // return <EfMenuPendingsClient pendings={pendings} />;

  const totalOrders = pendings.reduce(
    (sum, pending) => sum + pending.orders.length,
    0,
  );

  return (
    <div className="min-h-full bg-linear-to-b from-blossom-100 via-blossom-50 to-white">
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <p className="font-accent text-sm font-semibold uppercase tracking-widest text-blossom-600">
            Order queue
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold text-cocoa-800 sm:text-4xl">
            Pendings
          </h1>
          <p className="mt-3 max-w-2xl text-cocoa-600">
            Review inquiries with attached products before you prepare or follow
            up with clients.
          </p>
        </header>

        <section className="rounded-2xl border border-blossom-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-heading text-lg font-semibold text-cocoa-800">
                Active pendings
              </p>
              <p className="mt-1 text-sm text-cocoa-600">
                {pendings.length}{" "}
                {pendings.length === 1 ? "inquiry" : "inquiries"} with products
                attached
              </p>
            </div>
            <span className="rounded-full bg-blossom-100 px-4 py-1.5 font-accent text-sm font-semibold text-blossom-700">
              {totalOrders} {totalOrders === 1 ? "line item" : "line items"}
            </span>
          </div>
        </section>

        <section>
          {pendings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-blossom-200 bg-blossom-50/50 px-6 py-16 text-center">
              <p className="font-heading text-lg font-semibold text-cocoa-800">
                No pending orders yet
              </p>
              <p className="mt-2 text-sm text-cocoa-600">
                Attach products to an inquiry and they will show up here.
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {pendings.map((pending) => (
                <PendingInquiryCard key={pending.id} pending={pending} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export type TypePendingOrder = {
  id: string;
  order_id: string;
  title: string;
  caption: string;
  quantity: number;
  img_url: string;
};

export type TypePendingInquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string | Date;
  orders_id: string;
  orders: TypePendingOrder[];
};
