import EfMenuSidebar from "./sidebar";

export default function EfMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-lvh bg-blossom-50">
      <EfMenuSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
