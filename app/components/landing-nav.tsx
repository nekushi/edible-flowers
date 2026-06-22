"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#whats-new", label: "What's New" },
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blossom-200/80 bg-blossom-50/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="#home"
          className="flex items-center gap-2 sm:gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/edible-flowers/logo.jpg"
            alt="Edible Blossoms by Sheena logo"
            width={48}
            height={48}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-blossom-200 sm:h-12 sm:w-12"
            priority
          />
          <span className="font-heading text-lg font-semibold text-cocoa-800 sm:text-xl">
            Edible Blossoms
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-accent text-sm font-medium text-cocoa-700 transition-colors hover:text-blossom-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-cocoa-700 transition-colors hover:bg-blossom-100 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-blossom-200/80 bg-blossom-50 transition-all duration-300 md:hidden ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-2 font-accent text-sm font-medium text-cocoa-700 transition-colors hover:bg-blossom-100 hover:text-blossom-600"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
