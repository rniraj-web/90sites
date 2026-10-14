"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  FileText,
  Cookie,
  ChevronRight,
} from "lucide-react";

export interface SectionItem {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  activeTab: "terms" | "privacy" | "cookies";
  sections: SectionItem[];
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  description,
  lastUpdated,
  activeTab,
  sections,
  children,
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || "",
  );

  // Scroll-position based instead of IntersectionObserver: an observer tied to
  // a fixed viewport band never fires once the page is scrolled past the last
  // section (the band ends up over empty space below it), which is why the
  // sidebar got stuck and never reached the final items. This instead picks
  // the last section whose top has crossed the trigger line, so it tracks the
  // section you're actually reading as you scroll.
  useEffect(() => {
    const triggerOffset = 140;

    function updateActiveSection() {
      // On a short page the final section's top may never reach the trigger
      // line (there isn't enough scroll room below it to push it up that
      // far), so once you've scrolled to the bottom just jump straight to
      // the last section rather than leaving the indicator stuck earlier.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length > 0) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      let current = sections[0]?.id || "";
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= triggerOffset) {
          current = sec.id;
        }
      }
      setActiveSection(current);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">BACK TO HOME</span>
          </Link>

          {/* Tab Switcher */}
          <div className="flex items-center bg-muted/60 p-1 rounded-full border border-border">
            <Link
              href="/terms"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeTab === "terms"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Terms</span>
            </Link>
            <Link
              href="/privacy"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeTab === "privacy"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Privacy</span>
            </Link>
            <Link
              href="/cookies"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeTab === "cookies"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cookies</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 items-start">
        {/* Sticky Side Scroll Nav */}
        <aside className="hidden lg:block sticky top-24 self-start space-y-4">
          <p className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground pl-3">
            On this page
          </p>
          <nav className="relative border-l border-border space-y-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`group flex items-center justify-between text-xs py-1.5 pl-4 -ml-px border-l transition-all ${
                    isActive
                      ? "border-foreground text-foreground font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <span className="truncate">{section.title}</span>
                  {isActive && (
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  )}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Article Body */}
        <article className="max-w-3xl space-y-12">
          {/* Header */}
          <div className="border-b border-border pb-8 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Legal Documentation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="text-[11px] font-mono text-muted-foreground pt-2">
              Last updated:{" "}
              <span className="text-muted-foreground">{lastUpdated}</span>
            </div>
          </div>

          {/* Legal Content Sections */}
          <div className="space-y-12 text-sm leading-relaxed text-foreground/80">
            {children}
          </div>
        </article>
      </main>
    </div>
  );
}
