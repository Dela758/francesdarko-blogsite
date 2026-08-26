"use client";

import Link from "next/link";
import { useState } from "react";

interface NavItem {
  readonly label: string;
  readonly href: string;
}

interface MobileNavToggleProps {
  navItems: readonly NavItem[];
  currentPathname?: string;
}

export function MobileNavToggle({ navItems, currentPathname }: MobileNavToggleProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (!currentPathname) return false;
    if (href === "/") return currentPathname === "/";
    return currentPathname.startsWith(href);
  };

  return (
    <>
      <button
        type="button"
        className="nav-link md:hidden"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        aria-label={menuOpen ? "Close main navigation menu" : "Open main navigation menu"}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="absolute top-full left-0 w-full bg-background border-b border-outline-variant/25 px-5 py-6 flex flex-col gap-4 md:hidden fade-in shadow-md"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-left"
                data-active={active}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
