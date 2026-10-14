"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/content";

const visibleLinks = navLinks.filter(
  (link) => link.label !== "Home" && link.label !== "Contact us",
);

// Each nav link's own section has a signature accent color (matched to that
// page's hero/badge color) - reused here for the hover underline and the
// active-page background tint instead of one flat color for every link.
const SECTION_COLORS: Record<string, string> = {
  About: "#be185d",
  Packages: "#2d6a4f",
  "Our Work": "#5829a7",
  "Our Services": "#b45309",
  Testimonials: "#0077b6",
};

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const color = SECTION_COLORS[label] ?? "#111111";

  const hashIndex = href.indexOf("#");
  const linkPath = hashIndex === -1 ? href : href.slice(0, hashIndex) || "/";
  const isActive = pathname === linkPath;

  // Plain <a href="/#id"> hash navigation gets reset by Next's scroll
  // restoration when you're already on that route, so same-page section
  // links are scrolled manually instead; cross-route links (different
  // pathname) are left alone to do a real navigation.
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (hashIndex === -1) return;
    const path = href.slice(0, hashIndex) || "/";
    if (path !== pathname) return;
    e.preventDefault();
    const id = href.slice(hashIndex + 1);
    // "smooth" stalls completely on this page: the sticky-pinned Hero
    // curtain section breaks Chrome's smooth-scroll for any programmatic
    // scroll that has to pass through it (same issue as the Hero's own
    // curtain-arrow scroll). Instant jump works reliably instead.
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "instant", block: "start" });
    history.pushState(null, "", href);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      style={isActive ? { backgroundColor: hexToRgba(color, 0.12) } : undefined}
      className={`group relative inline-flex items-center rounded-full px-3 py-1.5 text-sm transition-colors duration-300 ${
        isActive ? "font-medium text-[#111111]" : "text-[#4a4942] hover:text-[#111111]"
      }`}
    >
      {label}
      <span
        aria-hidden="true"
        style={{ backgroundColor: color }}
        className="pointer-events-none absolute inset-x-3 bottom-1 h-[1.5px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </a>
  );
}

export function SableNavbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 hidden justify-center md:flex">
      <nav
        aria-label="Primary"
        className="flex w-[min(1100px,92vw)] items-center justify-between gap-6 rounded-[28px] border border-black/5 bg-[#f6f5f1]/95 px-6 py-3 shadow-lg backdrop-blur-xl"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[#111111]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG, next/image optimizer doesn't serve SVGs */}
          <img src="/brand/webizo-mark-light.svg" alt="" className="h-7 w-auto" />
          {site.name}
        </Link>

        <div className="flex items-center gap-6 xl:gap-8">
          {visibleLinks.map((link) => (
            <NavLink key={link.label} href={link.href} label={link.label} />
          ))}
        </div>

        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-black/15 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#111111] transition-colors hover:bg-black/5"
        >
          Contact us
        </Link>
      </nav>
    </header>
  );
}
