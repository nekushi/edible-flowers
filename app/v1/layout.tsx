import { cookies } from "next/headers";
import EfMenuSidebar from "./sidebar";
import { decrypt } from "@/lib/session";

export default async function EfMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const username = String(session?.username);

  return (
    <div className="flex h-lvh bg-blossom-50">
      <EfMenuSidebar username={username} />
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
