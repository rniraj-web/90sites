"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  UserRound,
  Package,
  Layers,
  Wrench,
  Star,
  Phone,
  Mail,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { site, navLinks } from "@/lib/content";
import CookieConsent from "@/components/cookie-consent";

const exploreLinks = navLinks.filter(
  (link) => link.label !== "Home" && link.label !== "Contact us",
);

const EXPLORE_ICONS: Record<string, ReactNode> = {
  About: <UserRound className="h-4 w-4" />,
  Packages: <Package className="h-4 w-4" />,
  "Our Work": <Layers className="h-4 w-4" />,
  "Our Services": <Wrench className="h-4 w-4" />,
  Testimonials: <Star className="h-4 w-4" />,
};

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative mx-4 mb-4 overflow-hidden rounded-3xl bg-[#232123] text-white sm:mx-6 sm:mb-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-12"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG, next/image optimizer doesn't serve SVGs */}
              <img
                src="/brand/webizo-mark-dark.svg"
                alt=""
                className="h-8 w-auto"
              />
              <span className="font-serif text-2xl font-semibold tracking-tight text-white">
                {site.name}
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
              {site.tagline}
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-white">
                Hours
              </p>
              <ul className="mt-2 space-y-1 text-sm text-neutral-400">
                {site.hours.map(({ day, time }) => (
                  <li key={day} className="flex items-center gap-6">
                    <span className="w-20 shrink-0">{day}</span>
                    <span>{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="font-serif text-lg font-semibold text-white">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => {
                const hashIndex = link.href.indexOf("#");
                const linkPath =
                  hashIndex === -1
                    ? link.href
                    : link.href.slice(0, hashIndex) || "/";
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        // Same-page hash links: native smooth-scroll stalls
                        // on this page (the Hero's sticky curtain breaks
                        // it), so scroll instantly instead.
                        if (hashIndex !== -1 && linkPath === pathname) {
                          e.preventDefault();
                          const id = link.href.slice(hashIndex + 1);
                          document.getElementById(id)?.scrollIntoView({
                            behavior: "instant",
                            block: "start",
                          });
                          history.pushState(null, "", link.href);
                        }
                      }}
                      className="flex items-center gap-2.5 text-sm text-neutral-400 transition-colors hover:text-white"
                    >
                      <span className="text-[#80ed99]">
                        {EXPLORE_ICONS[link.label]}
                      </span>
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-serif text-lg font-semibold text-white">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm text-neutral-400">
              {site.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2.5 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 text-[#80ed99]" />
                    {phone}
                  </a>
                </li>
              ))}
              {/* <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#80ed99]" />
                  WebBizo
                </a>
              </li> */}
              <li className="flex items-start gap-2.5 text-neutral-400">
                <MapPin className="h-4 w-4 shrink-0 text-[#80ed99] mt-0.5" />
                <span>
                  {[
                    site.address.street,
                    site.address.city,
                    site.address.postalCode,
                    site.address.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </li>
              <li>
                <a
                  href="/contact"
                  className="flex items-center gap-1.5 font-medium text-[#80ed99] hover:underline"
                >
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-5 text-xs text-neutral-500 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-neutral-400">
            Designed &amp; built by{" "}
            <span className="rounded-md bg-[#d9ed92] px-2 py-0.5 font-serif font-semibold text-[#0d1b2a]">
              Hivebyte Technology
            </span>
          </p>

          <nav aria-label="Legal" className="flex gap-6">
            <a
              href="/cookies"
              className="transition-colors hover:text-neutral-300"
            >
              Cookies Policy
            </a>
            <a
              href="/terms"
              className="transition-colors hover:text-neutral-300"
            >
              Terms &amp; Conditions
            </a>
          </nav>
        </div>
      </motion.div>

      <CookieConsent />
    </footer>
  );
}
