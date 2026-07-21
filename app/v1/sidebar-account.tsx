"use client";

import { logoutUser } from "@/dal/menu/sidebar/log-out-user";
import { noFuncYet } from "@/dal/menu/sidebar/no-func-yet";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function SidebarAccount({ username }: { username: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
            {username}
          </p>
          <p className="truncate text-xs text-cocoa-500">Business Manager</p>
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
                  key={option.btnName}
                  //   key={option}
                  type="button"
                  role="menuitem"
                  className="block w-full px-4 py-2 text-left font-accent text-sm text-cocoa-700 transition-colors hover:bg-blossom-50 hover:text-blossom-700"
                  onClick={() => {
                    setIsMenuOpen(false);
                    option.fn();
                  }}
                >
                  {option.btnName}
                  {/* {option} */}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// const accountMenuOptions = ["Profile settings", "Sign out"] as const;
const accountMenuOptions = [
  {
    btnName: "Profile settings",
    fn: noFuncYet,
  },
  {
    btnName: "Sign out",
    fn: logoutUser,
  },
] as const;
