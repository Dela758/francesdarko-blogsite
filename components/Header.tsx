"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { MobileNavToggle } from "./MobileNavToggle";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant/25 bg-background/90 backdrop-blur-md transition-colors duration-300">
      <div className="container-content flex items-center justify-between gap-4 py-6 md:py-8">
        <Link
          href="/"
          className="font-serif text-lg tracking-normal font-medium uppercase text-on-surface transition-opacity duration-300 hover:opacity-70 md:text-xl whitespace-nowrap shrink-0"
          aria-label={`${siteConfig.name} — Home`}
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 shrink-0">
          <nav
            className="hidden items-center gap-5 lg:gap-8 md:flex flex-nowrap"
            aria-label="Main navigation"
          >
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />

          <MobileNavToggle navItems={siteConfig.nav} currentPathname={pathname} />
        </div>
      </div>
    </header>
  );
}
