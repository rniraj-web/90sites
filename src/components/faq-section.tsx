"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/content";

// Warm peach-to-coral stepped gradient palette matching the reference image
const GRADIENT_BANDS = [
  { bg: "#FFF4ED", text: "#1F1D1B", numberColor: "rgba(255, 255, 255, 0.95)" },
  { bg: "#FEE4D6", text: "#1F1D1B", numberColor: "rgba(255, 255, 255, 0.92)" },
  { bg: "#FDCAB5", text: "#1F1D1B", numberColor: "rgba(255, 255, 255, 0.90)" },
  { bg: "#FBAB8E", text: "#1A1715", numberColor: "rgba(255, 255, 255, 0.90)" },
  { bg: "#F88A64", text: "#FFFFFF", numberColor: "rgba(255, 255, 255, 0.92)" },
  { bg: "#F46036", text: "#FFFFFF", numberColor: "rgba(255, 255, 255, 0.95)" },
];

export default function FaqSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      {/* Header with #F46036 Pill Badge & Highlight Effect */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-4 mb-16"
      >
        {/* Pill Badge */}
        <div>
          <span className="inline-block rounded-full bg-[#F46036]/20 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d0431a] sm:text-sm">
            Common Inquiries
          </span>
        </div>

        {/* Heading: Frequently Asked Questions */}
        <Heading className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#0d1b2a]">
          Frequently Asked{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#d0431a]">Questions</span>
            {/* #F46036 highlighter bar */}
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-0 z-0 h-3 w-full -rotate-1 rounded bg-[#F46036]/35"
            />
          </span>
        </Heading>
      </motion.div>

      {/* Stacked Gradient Accordion Container */}
      <div className="overflow-hidden rounded-3xl shadow-2xl border border-black/5 dark:border-white/10">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const band = GRADIENT_BANDS[index % GRADIENT_BANDS.length];
          const stepNumber = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={faq.question}
              style={{ backgroundColor: band.bg }}
              className="relative overflow-hidden transition-all duration-300"
            >
              {/* Giant Watermark Number on the Right */}
              <div
                aria-hidden="true"
                style={{ color: band.numberColor }}
                className="pointer-events-none absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 select-none font-mono text-6xl sm:text-8xl font-black tracking-tighter opacity-90 drop-shadow-sm"
              >
                {stepNumber}
              </div>

              {/* Clickable Header Row */}
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="relative z-10 flex min-h-[5.25rem] sm:min-h-[6.25rem] w-full items-center justify-between px-6 sm:px-10 py-5 text-left transition-transform active:scale-[0.99]"
              >
                <div className="max-w-[80%] sm:max-w-[85%] pr-4">
                  <span
                    style={{ color: band.text }}
                    className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-tight block"
                  >
                    {faq.question}
                  </span>
                </div>
              </button>

              {/* Expandable Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden relative z-10"
                  >
                    <div className="px-6 sm:px-10 pb-8 pt-0 max-w-3xl">
                      <p
                        style={{ color: band.text }}
                        className="text-sm sm:text-base leading-relaxed opacity-90 font-light"
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hairline Divider between bands */}
              {index < faqs.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-black/5 dark:bg-white/10" />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
