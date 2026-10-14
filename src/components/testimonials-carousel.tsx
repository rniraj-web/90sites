"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { testimonials } from "@/lib/testimonials";
import PageMarquee from "@/components/page-marquee";

// Typed slide variants for Framer Motion
const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 35 : -35,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -35 : 35,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[#f59e0b]">
      {[...Array(rating)].map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleBadge() {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-neutral-200/60 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
      <svg className="h-3 w-3" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        />
      </svg>
      <span>Google</span>
    </div>
  );
}

export default function TestimonialsCarousel({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const prevIndex =
    (activeIndex - 1 + testimonials.length) % testimonials.length;
  const nextIndex = (activeIndex + 1) % testimonials.length;

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack arrow keys if the user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Accessibility: Respect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Autoplay loop (pauses on hover)
  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [isPaused, reducedMotion, handleNext]);

  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#ade8f4] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0077b6] sm:text-sm">
            Testimonials
          </span>

          <Heading className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#1a2332] sm:text-4xl md:text-5xl">
            Client Testimonials &amp;{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#0077b6]">Reviews</span>
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-0 z-0 h-3 w-full -rotate-1 rounded bg-[#ade8f4]"
              />
            </span>
          </Heading>

          {headingLevel === "h1" && (
            <PageMarquee
              bgColor="rgba(173, 232, 244, 0.18)"
              textColor="#0077b6"
            />
          )}

          <p className="mx-auto mt-4 max-w-xl text-sm text-[#4b5563] sm:text-base font-light">
            Every review here is unedited, straight from the businesses
            we&apos;ve built websites for.
          </p>
        </div>

        {/* 3-in-a-Row Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative mt-12 sm:mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* 1. Left Card Preview (Click to navigate left) */}
            <div
              onClick={handlePrev}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handlePrev();
                }
              }}
              aria-label={`Previous review: ${testimonials[prevIndex].name}`}
              className="hidden md:flex flex-col justify-between h-full rounded-3xl border border-neutral-200/70 bg-white/60 p-6 lg:p-7 shadow-sm transition-all duration-300 opacity-60 hover:opacity-85 hover:scale-[0.98] scale-95 cursor-pointer select-none"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Stars rating={testimonials[prevIndex].rating} />
                  <GoogleBadge />
                </div>
                <blockquote className="mt-4 line-clamp-4 text-sm leading-relaxed text-[#6b7280]">
                  &ldquo;{testimonials[prevIndex].content}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-neutral-100 pt-3">
                <p className="text-sm font-semibold text-[#1a2332]">
                  {testimonials[prevIndex].name}
                </p>
                {testimonials[prevIndex].company && (
                  <p className="text-xs text-[#9ca3af]">
                    {testimonials[prevIndex].company}
                  </p>
                )}
              </figcaption>
            </div>

            {/* 2. Center Card (Focused & Highlighted) */}
            <div className="relative z-20">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col justify-between rounded-3xl border-2 border-[#ade8f4] bg-white p-7 sm:p-9 shadow-xl shadow-[#0077b6]/10 md:scale-105 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <Stars rating={testimonials[activeIndex].rating} />
                      <GoogleBadge />
                    </div>

                    <blockquote className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-[#374151] sm:text-base">
                      &ldquo;{testimonials[activeIndex].content}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="mt-8 border-t border-neutral-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[15px] font-bold text-[#1a2332]">
                          {testimonials[activeIndex].name}
                        </p>
                        {testimonials[activeIndex].company && (
                          <p className="text-xs text-[#6b7280]">
                            {testimonials[activeIndex].company}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-[#0077b6]">
                        {testimonials[activeIndex].platform}
                      </span>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* 3. Right Card Preview (Click to navigate right) */}
            <div
              onClick={handleNext}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNext();
                }
              }}
              aria-label={`Next review: ${testimonials[nextIndex].name}`}
              className="hidden md:flex flex-col justify-between h-full rounded-3xl border border-neutral-200/70 bg-white/60 p-6 lg:p-7 shadow-sm transition-all duration-300 opacity-60 hover:opacity-85 hover:scale-[0.98] scale-95 cursor-pointer select-none"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Stars rating={testimonials[nextIndex].rating} />
                  <GoogleBadge />
                </div>
                <blockquote className="mt-4 line-clamp-4 text-sm leading-relaxed text-[#6b7280]">
                  &ldquo;{testimonials[nextIndex].content}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-neutral-100 pt-3">
                <p className="text-sm font-semibold text-[#1a2332]">
                  {testimonials[nextIndex].name}
                </p>
                {testimonials[nextIndex].company && (
                  <p className="text-xs text-[#9ca3af]">
                    {testimonials[nextIndex].company}
                  </p>
                )}
              </figcaption>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="mt-10 text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-[#ade8f4] px-6 py-3 text-sm font-semibold text-[#0077b6] shadow-sm transition-colors hover:bg-[#0077b6] hover:text-white"
          >
            Ready to get started? Get in touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
