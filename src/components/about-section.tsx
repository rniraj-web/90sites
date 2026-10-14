"use client";

import { motion } from "framer-motion";
import { site, about } from "@/lib/content";

const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
export default function AboutSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = motion[headingLevel];
  const companyName = site?.name || "Hivebyte";

  const paragraphs = [
    "Your business deserves to be online. We'll help you get there.",
    `At ${companyName}, we help great businesses take their first step online. Many have grown through word of mouth and hard work without ever having a website. We believe they deserve an online presence that reflects the quality of what they do.`,
    "We design, build and launch your website for a one-off fee of £250, then keep it running with our Starter package, so you can focus on your business.",
  ];

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {/* Header with Pink Pill Badge & Highlight Effect */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerContainer}
        className="text-center space-y-4 mb-14"
      >
        {/* Pink Pill Badge */}
        <motion.div variants={headerItem}>
          <span className="inline-block rounded-full bg-[#fbcfe8] px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#be185d] sm:text-sm">
            About Us
          </span>
        </motion.div>

        {/* Heading: About Us */}
        <Heading
          variants={headerItem}
          className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#0d1b2a]"
        >
          About{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#be185d]">Us</span>
            {/* Pink highlighter bar */}
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-0 z-0 h-3.5 w-full -rotate-1 rounded bg-[#fbcfe8]"
            />
          </span>
        </Heading>
      </motion.div>

      {/* Main Content & Stats Grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        }}
        className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start"
      >
        {/* Story Paragraphs */}
        <div className="space-y-5">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className={`leading-relaxed ${
                index === 0
                  ? "text-lg font-medium text-[#0d1b2a]"
                  : "text-sm sm:text-base text-neutral-600 font-light"
              }`}
            >
              {paragraph}
            </motion.p>
          ))}
          <motion.a
            variants={fadeUp}
            href="/about"
            className="inline-flex items-center justify-center rounded-lg bg-[#be185d] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#fbcfe8] hover:text-[#9d174d]"
          >
            Read our story →
          </motion.a>{" "}
          <motion.a
            variants={fadeUp}
            href="/our-work"
            className="inline-flex items-center justify-center rounded-lg bg-[#fbcfe8] px-6 py-3 text-sm font-semibold text-[#be185d] shadow-sm transition-colors hover:bg-[#9d174d] hover:text-white"
          >
            Explore our work →
          </motion.a>
          {/* <motion.a
            href="/about"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#be185d] hover:underline"
          >
            Read our story →
          </motion.a>{" "} */}
          {/* <motion.a
            href="/packages"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#be185d] hover:underline"
          >
            Explore our website packages →
          </motion.a> */}
          {/* <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="leading-relaxed text-sm sm:text-base text-neutral-600 font-light"
          >
            Whether you&apos;re a local shop, a restaurant, a service provider,
            or a growing business, we create websites that are easy to use,
            designed around your business and built to help turn visitors into
            customers. But don&apos;t just take our word for it -{" "}
            <a
              href="/testimonials"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#be185d] hover:underline"
            >
              see what our clients have to say →
            </a>
            .
          </motion.p> */}
        </div>

        {/* Stats Column */}
        {about?.stats && about.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-1 self-start">
            {about.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <p className="font-serif text-3xl font-bold text-[#be185d]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-neutral-500 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
