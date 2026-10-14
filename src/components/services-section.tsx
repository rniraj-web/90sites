"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { services } from "@/lib/content";
import PageMarquee from "@/components/page-marquee";

const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Explicit coordinates guaranteed to NEVER overlap the pipe:
const MILESTONES = [
  {
    badgeX: "24%",
    badgeY: 60,
    textLeft: "55%",
    textRight: "auto",
    textY: 15,
    textAlign: "text-left" as const,
    progressTarget: 0.1,
  },
  {
    badgeX: "67%",
    badgeY: 420,
    textLeft: "auto",
    textRight: "44%",
    textY: 380,
    textAlign: "text-right" as const,
    progressTarget: 0.42,
  },
  {
    badgeX: "32%",
    badgeY: 780,
    textLeft: "48%",
    textRight: "auto",
    textY: 750,
    textAlign: "text-left" as const,
    progressTarget: 0.72,
  },
  {
    // Last step: the pipe ends here, so there's no open lane beside the
    // badge wide enough for its (longest) copy without squeezing it into a
    // tall, narrow column. Below the badge is the one genuinely open patch
    // of canvas at this point, so the text drops there instead, centered
    // and spanning much more width.
    badgeX: "65%",
    badgeY: 1120,
    textLeft: "50%",
    textRight: "auto",
    textY: 1195,
    textAlign: "text-center" as const,
    progressTarget: 0.95,
  },
];

function MilestoneStep({
  service,
  index,
  smoothProgress,
  subHeadingLevel,
}: {
  service: (typeof services)[number];
  index: number;
  smoothProgress: MotionValue<number>;
  subHeadingLevel: "h2" | "h3";
}) {
  const SubHeading = subHeadingLevel;
  const stepNumber = String(index + 1).padStart(2, "0");
  const layout = MILESTONES[index];

  const centerTransform =
    layout.textAlign === "text-center" ? "-translate-x-1/2" : "";

  const startReveal = Math.max(0, layout.progressTarget - 0.14);
  const endReveal = Math.min(1, layout.progressTarget + 0.02);

  const opacity = useTransform(
    smoothProgress,
    [startReveal, endReveal],
    [0, 1],
  );
  const yOffset = useTransform(
    smoothProgress,
    [startReveal, endReveal],
    [20, 0],
  );
  const filter = useTransform(
    smoothProgress,
    [startReveal, endReveal],
    ["blur(8px)", "blur(0px)"],
  );

  const badgeBg = useTransform(
    smoothProgress,
    [startReveal, endReveal],
    ["#27272a", "#09090b"],
  );
  const badgeTextColor = useTransform(
    smoothProgress,
    [startReveal, endReveal],
    ["#71717a", "#ffffff"],
  );
  const ringColor = useTransform(
    smoothProgress,
    [startReveal, endReveal],
    ["rgba(255, 185, 0, 0)", "rgba(255, 185, 0, 0.5)"],
  );

  return (
    <>
      {/* 1. BADGE PINNED DIRECTLY ON THE TUBE */}
      <div
        style={{
          left: layout.badgeX,
          top: `${layout.badgeY}px`,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
      >
        <motion.div
          style={{ opacity }}
          className="absolute -inset-2 rounded-full bg-[#ffb900]/30 blur-md pointer-events-none"
        />

        <motion.div
          style={{
            backgroundColor: badgeBg,
            color: badgeTextColor,
            boxShadow: `0 0 22px ${ringColor}`,
          }}
          className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full font-mono text-lg font-bold border-2 border-zinc-700/60 shadow-xl"
        >
          {stepNumber}
        </motion.div>
      </div>

      {/* 2. TEXT IN THE OPEN SPACE */}
      <motion.div
        style={{
          left: layout.textLeft,
          right: layout.textRight,
          top: `${layout.textY}px`,
          opacity,
          y: yOffset,
          filter,
        }}
        className={`absolute z-10 pointer-events-auto space-y-1.5 ${layout.textAlign} ${
          centerTransform
            ? `w-72 sm:w-80 ${centerTransform}`
            : "max-w-xs sm:max-w-sm"
        }`}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#d97706]">
          Step {stepNumber}
        </span>
        <SubHeading className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
          {service.title}
        </SubHeading>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
          {service.description}
        </p>

        {service.tags && (
          <div
            className={`pt-1.5 flex flex-wrap gap-1.5 ${
              layout.textAlign === "text-right"
                ? "justify-end"
                : layout.textAlign === "text-center"
                  ? "justify-center"
                  : "justify-start"
            }`}
          >
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-[#b45309] bg-[#ffb900]/20 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}

export default function ServicesSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = motion[headingLevel];
  const subHeadingLevel = headingLevel === "h1" ? "h2" : "h3";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 85%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28 overflow-hidden"
    >
      {/* Header with #ffb900 Pill Badge & Highlight Effect */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerContainer}
        className="text-center space-y-4"
      >
        {/* Pill Badge */}
        <motion.div variants={headerItem}>
          <span className="inline-block rounded-full bg-[#ffb900]/25 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#b45309] sm:text-sm">
            Services
          </span>
        </motion.div>

        {/* Heading: Why Choose Our Services? */}
        <Heading
          variants={headerItem}
          className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#0d1b2a]"
        >
          <span className="relative inline-block">
            <span className="relative z-10 text-[#b45309]">Your Journey</span>
            {/* #ffb900 highlighter bar */}
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-0 z-0 h-3 w-full -rotate-1 rounded bg-[#ffb900]/40"
            />
          </span>{" "}
          With Us
        </Heading>
      </motion.div>

      {headingLevel === "h1" && (
        <PageMarquee
          bgColor="rgba(255, 185, 0, 0.18)"
          textColor="#b45309"
        />
      )}

      {/* Stage: 1250px - must stay fixed, the SVG pipe's badge-aligned
          points are pixel-calibrated against this exact height. Step 4's
          text now sits below the badge and overflows past this box in
          normal flow (not clipped); the CTA link after it gets extra
          margin to clear that overflow instead. */}
      <div className="relative mt-16 h-[1250px] w-full max-w-5xl mx-auto">
        {/* SVG Track & Yellow Tube */}
        <div className="absolute inset-0 pointer-events-none -z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 1250"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Background Ghost Track */}
            <path
              d="
                M 240, 60
                C 340, 60 400, 110 420, 200
                C 440, 320 320, 330 310, 260
                C 300, 170 420, 150 480, 210
                C 560, 290 670, 330 670, 420
                C 670, 560 520, 620 420, 680
                C 340, 730 320, 750 320, 780
                C 320, 890 520, 940 580, 1020
                C 630, 1080 650, 1100 650, 1120
              "
              stroke="#e4e4e7"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dark:stroke-zinc-800"
            />

            {/* Active Drawing Ribbon matching #ffb900 */}
            <motion.path
              d="
                M 240, 60
                C 340, 60 400, 110 420, 200
                C 440, 320 320, 330 310, 260
                C 300, 170 420, 150 480, 210
                C 560, 290 670, 330 670, 420
                C 670, 560 520, 620 420, 680
                C 340, 730 320, 750 320, 780
                C 320, 890 520, 940 580, 1020
                C 630, 1080 650, 1100 650, 1120
              "
              stroke="#ffb900"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                pathLength: smoothProgress,
              }}
            />
          </svg>
        </div>

        {/* The 4 Milestones */}
        {services.slice(0, 4).map((service, index) => (
          <MilestoneStep
            key={service.title}
            service={service}
            index={index}
            smoothProgress={smoothProgress}
            subHeadingLevel={subHeadingLevel}
          />
        ))}
      </div>
      {/* CTA Button: Increased margin-top to clear Step 4's overflow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="mt-64 sm:mt-56 text-center"
      >
        <a
          href="/our-work"
          className="inline-flex items-center justify-center rounded-lg bg-[#ffb900]/25 px-6 py-3 text-sm font-semibold text-[#b45309] shadow-sm transition-colors hover:bg-[#b45309] hover:text-white"
        >
          ← See examples of our work
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="mt-10 text-center"
      >
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-[#80ed99]/30 px-6 py-3 text-sm font-semibold text-[#1b4332] shadow-sm transition-colors hover:bg-[#1b4332] hover:text-white"
        >
          Ready to get started? Get in touch →
        </a>
      </motion.div>
    </section>
  );
}
