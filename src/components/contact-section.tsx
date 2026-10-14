"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/contact-form";
import { site } from "@/lib/content";
import { Check, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = motion[headingLevel];
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";
  const companyAddress =
    "BASE, Manchester Science Park, Greenheys Lane, Manchester, M15 6LR";
  const mapsQuery = encodeURIComponent(companyAddress);
  const companyPhones = site.phones;
  const companyEmail = "hello@hivebyte.co.uk";

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-4 py-20 sm:py-28 sm:px-6"
    >
      {/* Header - Unified style with Pill Badge & Highlighter */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerContainer}
        className="text-center space-y-4 mb-16"
      >
        <motion.div variants={headerItem}>
          <span className="inline-block rounded-full bg-[#80ed99]/30 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1b4332] sm:text-sm">
            Get In Touch
          </span>
        </motion.div>

        <Heading
          variants={headerItem}
          className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#0d1b2a]"
        >
          Contact{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#1b4332]">Us</span>
            {/* Highlighter bar */}
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-0 z-0 h-3 w-full -rotate-1 rounded bg-[#80ed99]/50"
            />
          </span>
        </Heading>
      </motion.div>

      {/* Main 2-Column Container */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-start">
        {/* Left Column: Dark Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 rounded-3xl bg-[#0e1117] p-8 sm:p-10 text-white shadow-2xl flex flex-col justify-between"
        >
          <div>
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#80ed99]/15 px-3.5 py-1 text-xs font-medium text-[#80ed99]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#80ed99]" />
              Build website for your business at £90 (excl. VAT)
            </div>

            {/* Headline */}
            <SubHeading className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Want More Customers to Find You?{" "}
              <span className="text-[#80ed99] block mt-1">
                Let&apos;s Get Started
              </span>
            </SubHeading>

            {/* Guarantees / Checklist */}
            <ul className="mt-8 space-y-4 text-sm text-neutral-300">
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#80ed99]/20 text-[#80ed99]">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
                <span>Expect a response from us within 24 hours</span>
              </li>
              {/* <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#80ed99]/20 text-[#80ed99]">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
                <span>We can sign an NDA before discussing your project</span>
              </li> */}
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#80ed99]/20 text-[#80ed99]">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
                <span>Complete ownership of your website</span>
              </li>
            </ul>
          </div>

          {/* Contact Details & Address */}
          <div className="mt-10 pt-8 border-t border-white/10 space-y-3.5 text-sm">
            {/* <p className="font-semibold text-base text-white">
              {site.name || "Hivebyte"}
            </p> */}

            <div className="flex items-start gap-2.5 text-neutral-400">
              <MapPin className="h-4 w-4 shrink-0 text-[#80ed99] mt-0.5" />
              <span>{companyAddress}</span>
            </div>

            {companyPhones.map((phone) => (
              <div
                key={phone}
                className="flex items-center gap-2.5 text-neutral-400"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#80ed99]" />
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </div>
            ))}

            {/* <div className="flex items-center gap-2.5 text-neutral-400">
              <Mail className="h-4 w-4 shrink-0 text-[#80ed99]" />
              <a
                href={`mailto:${companyEmail}`}
                className="hover:text-white transition-colors"
              >
                Webizo
              </a>
            </div> */}

            <div className="pt-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#80ed99] hover:underline"
              >
                <span>Get directions</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Light Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 rounded-3xl bg-white p-7 sm:p-10 shadow-xl border border-neutral-100"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
