"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/v1/dashboard", label: "Dashboard" },
  { href: "/v1/products", label: "Products" },
  { href: "/v1/pendings", label: "Pendings" },
  { href: "/v1/inquiries", label: "Inquiries" },
  { href: "/v1/history", label: "History" },
  { href: "/v1/settings", label: "Settings" },
];

const accountMenuOptions = ["Profile settings", "Sign out"];

const navLinkClassName =
  "block rounded-xl px-3 py-2.5 font-accent text-sm font-medium transition-colors";

function SidebarAccount() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="border-t border-blossom-200 bg-white/70 p-4">
      <div className="flex items-center gap-3">
        <Image
          src="/edible-flowers/logo.jpg"
          alt="Current user profile"
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-blossom-200"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-sm font-semibold text-cocoa-800">
            Sheena Admin
          </p>
          <p className="truncate text-xs text-cocoa-500">Store manager</p>
        </div>
        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            aria-label="Account menu"
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-cocoa-500 transition-colors hover:bg-blossom-100 hover:text-cocoa-800"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="5" r="1.75" />
              <circle cx="12" cy="12" r="1.75" />
              <circle cx="12" cy="19" r="1.75" />
            </svg>
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute bottom-full right-0 z-10 mb-2 min-w-[10rem] overflow-hidden rounded-xl border border-blossom-200 bg-white py-1 shadow-lg"
            >
              {accountMenuOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="menuitem"
                  className="block w-full px-4 py-2 text-left font-accent text-sm text-cocoa-700 transition-colors hover:bg-blossom-50 hover:text-blossom-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EfMenuSidebar() {
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

      <SidebarAccount />
    </aside>
  );
}
