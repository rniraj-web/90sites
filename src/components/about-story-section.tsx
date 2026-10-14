"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutStorySection() {
  const companyName = site?.name || "Hivebyte";

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      {/* Pill Badge */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="text-center"
      >
        <motion.div variants={headerItem}>
          <span className="inline-block rounded-full bg-[#fbcfe8] px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#be185d] sm:text-sm">
            About Us
          </span>
        </motion.div>
      </motion.div>

      {/* Hero: heading + copy + CTA, blob photo on the right */}
      <div className="mt-10 grid items-center gap-14 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#0d1b2a] sm:text-5xl"
          >
            Helping great businesses get the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">online</span>
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-0 z-0 h-3.5 w-full -rotate-1 rounded bg-[#fbcfe8]"
              />
            </span>{" "}
            presence they deserve
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-base leading-relaxed text-neutral-600"
          >
            From our base in Manchester, we help local and growing businesses
            build websites that are clear, effective and built to bring in
            customers. Whether you are a café, a tradesperson, a salon or a
            shop, everything we create is designed with one purpose: helping
            your business grow.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#be185d] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#9d174d]"
          >
            Get in touch
          </motion.a>{" "}
          <motion.a
            href={`tel:${site.phones[0].replace(/\s+/g, "")}`}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#fbcfe8] px-6 py-3 text-sm font-semibold text-[#be185d] shadow-sm transition-colors"
          >
            Call us on {site.phones[0]}
          </motion.a>
        </motion.div>

        {/* Blob photo */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto aspect-square w-full max-w-sm"
        >
          {/* Dark blob behind the photo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#831843]"
            style={{ borderRadius: "62% 38% 35% 65% / 58% 42% 58% 42%" }}
          />
          {/* Dotted texture accent */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 h-24 w-24 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(#be185d 1.5px, transparent 1.5px)",
              backgroundSize: "10px 10px",
            }}
          />
          {/* Small floating accent circle */}
          <div
            aria-hidden="true"
            className="absolute -bottom-2 right-6 h-3.5 w-3.5 rounded-full bg-[#fbcfe8]"
          />

          {/* Photo */}
          <div className="absolute inset-[8%] overflow-hidden rounded-full shadow-lg">
            <Image
              src="/about/team.webp"
              alt={`The ${companyName} team in their Manchester office`}
              fill
              sizes="(max-width: 768px) 80vw, 400px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl"
        >
          <Image
            src="/about/office.webp"
            alt={`${companyName}'s office at BASE, Manchester Science Park`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-base leading-relaxed text-neutral-600"
        >
          We&apos;re based at BASE, Manchester Science Park - a working
          environment built for growing teams. It&apos;s where client calls
          happen, designs come together and your site gets built, tested and
          shipped, before we hand you the keys to a website you&apos;re proud
          of.
        </motion.p>
      </div> */}
    </section>
  );
}
