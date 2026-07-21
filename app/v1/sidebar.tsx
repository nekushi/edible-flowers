"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarAccount } from "./sidebar-account";

const navLinkClassName =
  "block rounded-xl px-3 py-2.5 font-accent text-sm font-medium transition-colors";

export default function EfMenuSidebar({ username }: { username: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-lvh w-60 shrink-0 flex-col border-r border-blossom-200 bg-linear-to-b from-blossom-100 via-blossom-50 to-white lg:w-64">
      <div className="border-b border-blossom-200 px-5 py-6">
        <Link href="/v1/dashboard" className="flex items-center gap-3">
          <Image
            src="/edible-flowers/logo.jpg"
            alt="Edible Blossoms by Sheena logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-blossom-200"
            priority
          />
          <div className="min-w-0">
            <p className="truncate font-heading text-base font-bold text-cocoa-800">
              Edible Blossoms
            </p>
            <p className="font-accent text-xs font-semibold uppercase tracking-widest text-blossom-600">
              Menu admin
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${navLinkClassName} ${
                    isActive
                      ? "bg-blossom-500 text-white shadow-sm"
                      : "text-cocoa-700 hover:bg-blossom-100 hover:text-blossom-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <SidebarAccount username={username} />
    </aside>
  );
}

const navLinks = [
  { href: "/v1/dashboard", label: "Dashboard" },
  { href: "/v1/products", label: "Products" },
  { href: "/v1/pendings", label: "Pendings" },
  { href: "/v1/inquiries", label: "Inquiries" },
  { href: "/v1/history", label: "History" },
  { href: "/v1/settings", label: "Settings" },
] as const;
