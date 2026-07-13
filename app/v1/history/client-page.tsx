export type TypeHistoryOrder = {
  title: string;
  quantity: number;
  price: number;
};

export type TypeHistoryEntry = {
  id: string;
  name: string;
  email: string;
  message: string;
  updatedAt: string | Date;
  orders: TypeHistoryOrder[];
};

function formatCompletedDate(value: string | Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatOrders(orders: TypeHistoryOrder[]) {
  if (orders.length === 0) {
    return "—";
  }

  return orders.map((order) => `${order.quantity}× ${order.title}`).join(", ");
}

function formatProductPrice(price: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(price);
}

function totalOrderIncome(orders: TypeHistoryOrder[]) {
  return orders.reduce((sum, order) => sum + order.price, 0);
}

const thClassName =
  "px-4 py-3 font-accent text-xs font-semibold uppercase tracking-wide text-cocoa-500 sm:px-6";

const tdClassName = "px-4 py-4 align-top text-sm text-cocoa-700 sm:px-6";

export default function EfMenuHistoryClient({
  history,
}: {
  history: TypeHistoryEntry[];
}) {
  return (
    <div className="min-h-full bg-linear-to-b from-blossom-100 via-blossom-50 to-white">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <p className="font-accent text-sm font-semibold uppercase tracking-widest text-blossom-600">
            Completed orders
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold text-cocoa-800 sm:text-4xl">
            History
          </h1>
          <p className="mt-3 text-cocoa-600">Past inquiries marked as done.</p>
        </header>

        <section>
          {history.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-blossom-200 bg-blossom-50/50 px-6 py-16 text-center">
              <p className="font-heading text-lg font-semibold text-cocoa-800">
                No history yet
              </p>
              <p className="mt-2 text-sm text-cocoa-600">
                Completed pendings will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-blossom-200 bg-white shadow-sm">
              <table className="w-full min-w-[720px] text-left">
                <thead className="border-b border-blossom-100 bg-blossom-50/60">
                  <tr>
                    <th scope="col" className={thClassName}>
                      Completed
                    </th>
                    <th scope="col" className={thClassName}>
                      Client
                    </th>
                    <th scope="col" className={thClassName}>
                      Email
                    </th>
                    <th scope="col" className={thClassName}>
                      Message
                    </th>
                    <th scope="col" className={thClassName}>
                      Orders
                    </th>
                    <th scope="col" className={thClassName}>
                      Income
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blossom-100">
                  {history.map((entry) => (
                    <tr
                      key={entry.id}
                      className="transition-colors hover:bg-blossom-50/40"
                    >
                      <td
                        className={`${tdClassName} whitespace-nowrap text-cocoa-500`}
                      >
                        {formatCompletedDate(entry.updatedAt)}
                      </td>
                      <td className={tdClassName}>
                        <p className="font-heading font-semibold text-cocoa-800">
                          {entry.name}
                        </p>
                      </td>
                      <td className={`${tdClassName} max-w-xs lg:max-w-md`}>
                        {entry.email}
                      </td>
                      <td className={`${tdClassName} max-w-xs lg:max-w-md`}>
                        {entry.message}
                      </td>
                      <td className={`${tdClassName} text-cocoa-500`}>
                        {formatOrders(entry.orders)}
                      </td>
                      <td className={`${tdClassName} whitespace-nowrap font-accent font-semibold text-blossom-700`}>
                        {entry.orders.length === 0
                          ? "—"
                          : formatProductPrice(totalOrderIncome(entry.orders))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
