"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/content";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur md:hidden">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG, next/image optimizer doesn't serve SVGs */}
          <img src="/brand/webizo-mark-light.svg" alt="" className="h-8 w-auto" />
          {site.name}
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:bg-accent active:scale-95"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75}>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav-panel" aria-label="Primary" className="border-t border-border/60 px-4 py-2">
          {navLinks.map((link) => {
            const hashIndex = link.href.indexOf("#");
            const linkPath = hashIndex === -1 ? link.href : link.href.slice(0, hashIndex) || "/";
            const isActive = pathname === linkPath;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setOpen(false);
                  // Same-page hash links: native smooth-scroll stalls on
                  // this page (the Hero's sticky curtain breaks it), so
                  // scroll instantly instead, same fix as sable-navbar.
                  if (hashIndex !== -1 && linkPath === pathname) {
                    e.preventDefault();
                    const id = link.href.slice(hashIndex + 1);
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: "instant", block: "start" });
                    history.pushState(null, "", link.href);
                  }
                }}
                aria-current={isActive ? "page" : undefined}
                className={`block min-h-11 rounded-md px-3 py-3 text-base transition-colors hover:text-foreground ${
                  isActive ? "bg-accent font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
