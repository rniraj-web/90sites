"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const comparisons = [
  {
    title: "Why Us vs a Freelancer",
    items: [
      {
        label: "Dependable",
        body: "We are a business, not a side project. You will always know who to contact and we will be here long after your website launches.",
      },
      {
        label: "Always Available",
        body: "We offer support 51 weeks of the year and only close at Christmas. Holidays or sick days never put your project on hold.",
      },
      {
        label: "One-Stop Shop",
        body: "Design, development, hosting and support, all in one place. There's no need to juggle different people for different jobs.",
      },
      {
        label: "Teamwork",
        body: "More than one person works on your project, so deadlines are met and nothing slips through the cracks.",
      },
      {
        label: "Clear Process",
        body: "From the first chat to launch day, you will know exactly what's happening and when.",
      },
    ],
  },
  {
    title: "Why Us vs a Full-Time Employee",
    items: [
      {
        label: "Flexible",
        body: "Pause or cancel with ease, which makes us ideal when times are uncertain.",
      },
      {
        label: "Constant Cover",
        body: "There's no holiday or sick pay to budget for and your website is looked after all year round.",
      },
      {
        label: "No Overheads",
        body: "You don't pay for a laptop, software, equipment, office space, pension or National Insurance.",
      },
      {
        label: "No Extra Costs",
        body: "There are no bonuses, training, benefits or travel expenses.",
      },
      {
        label: "No Management Hassle",
        body: "You won't have to deal with recruitment, appraisals or performance reviews, because we manage ourselves.",
      },
      {
        label: "Fixed, Affordable Pricing",
        body: "You pay a one-off fee of £250 for your website, then a simple monthly plan. You always know what you are paying.",
      },
    ],
  },
  {
    title: "Why Us vs Another Agency",
    items: [
      {
        label: "Built for Small Businesses",
        body: "We specialise in helping local and growing businesses get online, so we understand what you need and what you don't.",
      },
      {
        label: "Honest Pricing",
        body: "There are no hidden fees, inflated quotes or surprise invoices. Our prices are clear from day one.",
      },
      {
        label: "Collaborative",
        body: "We have a proven process but adapt to what works best for you. You will see progress throughout, not just at the end.",
      },
      {
        label: "Plain English",
        body: "We explain everything clearly, without technical jargon.",
      },
      {
        label: "Personal Service",
        body: "You are never just a number. You will work with the same friendly team from start to finish.",
      },
      {
        label: "Fast, Direct Communication",
        body: "You get a dedicated account in our support centre, so you can reach us quickly whenever you need us.",
      },
    ],
  },
];

export default function WhyUsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerContainer}
        className="mx-auto max-w-2xl space-y-4 text-center"
      >
        <motion.div variants={headerItem}>
          <span className="inline-block rounded-full bg-[#fbcfe8] px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#be185d] sm:text-sm">
            Why Us
          </span>
        </motion.div>

        <motion.h2
          variants={headerItem}
          className="font-serif text-4xl font-bold tracking-tight text-[#0d1b2a] sm:text-5xl"
        >
          Why Us?
        </motion.h2>

        <motion.p
          variants={headerItem}
          className="text-sm leading-relaxed text-neutral-600 sm:text-base"
        >
          We offer the perfect balance of flexibility, reliability and
          expertise, so you get a professional website without the hassle.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={cardContainer}
        className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start"
      >
        {comparisons.map((group, index) => {
          const isFeatured = index === 1;

          return (
            <motion.div
              key={group.title}
              variants={cardItem}
              className={`relative flex flex-col rounded-3xl border-2 border-[#fbcfe8] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-7 ${
                isFeatured ? "lg:z-10 lg:-translate-y-6 lg:shadow-xl" : ""
              }`}
            >
              <h3 className="font-serif text-xl font-bold text-[#0d1b2a]">
                <span className="text-[#ec4899]">Why Us</span>
                {group.title.slice(6)}
              </h3>

              <ul className="mt-6 space-y-5">
                {group.items.map((item) => (
                  <li key={item.label} className="flex items-start gap-2.5">
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-3.5 w-3.5 shrink-0 stroke-[2.5] text-[#be185d]"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#0d1b2a]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
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
          className="inline-flex items-center justify-center rounded-lg bg-[#fbcfe8] px-6 py-3 text-sm font-semibold text-[#be185d] shadow-sm transition-colors hover:bg-[#9d174d] hover:text-white"
        >
          Ready to get started? Get in touch →
        </a>
      </motion.div>
    </section>
  );
}
