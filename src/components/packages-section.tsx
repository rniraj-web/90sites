"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { packages } from "@/lib/content";
import PageMarquee from "@/components/page-marquee";

const STARTER_BG = "#343a40";
const PLAN_BG = "#d9ed92";

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

export default function PackagesSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = motion[headingLevel];
  return (
    <section id="packages" className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
      {/* Header with #d9ed92 Pill Badge & Highlight Effect */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerContainer}
        className="text-center space-y-4"
      >
        {/* Pill Badge */}
        <motion.div variants={headerItem}>
          <span className="inline-block rounded-full bg-[#d9ed92] px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#2d6a4f] sm:text-sm">
            Packages
          </span>
        </motion.div>

        {/* Heading: Our Packages */}
        <Heading
          variants={headerItem}
          className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#0d1b2a]"
        >
          Our{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#2d6a4f]">Packages</span>
            {/* #d9ed92 highlighter bar */}
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-0 z-0 h-3 w-full -rotate-1 rounded bg-[#d9ed92]"
            />
          </span>
        </Heading>
      </motion.div>

      {headingLevel === "h1" && (
        <PageMarquee
          bgColor="rgba(217, 237, 146, 0.18)"
          textColor="#2d6a4f"
        />
      )}

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={cardContainer}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {packages.map((pkg, index) => {
          const isStarter = index === 0;
          const hasEnquiryGuarantee =
            pkg.name === "Business Small" ||
            pkg.name === "Business Pro" ||
            pkg.name === "Business Bespoke";
          const priceMatch = pkg.priceRange.match(/^(£\d+)\s*(.*)$/);
          const amount = priceMatch ? priceMatch[1] : pkg.priceRange;
          const suffix = priceMatch ? priceMatch[2] : "";

          const textColor = isStarter ? "text-white" : "text-[#0d1b2a]";
          const mutedColor = isStarter ? "text-white/60" : "text-[#0d1b2a]/60";
          const subtleColor = isStarter ? "text-white/80" : "text-[#0d1b2a]/80";
          const iconColor = isStarter ? "text-white/50" : "text-[#0d1b2a]/50";
          const buttonClass = isStarter
            ? "bg-white text-[#343a40]"
            : "bg-[#0d1b2a] text-white";

          return (
            <motion.div
              key={pkg.name}
              variants={cardItem}
              className="flex flex-col rounded-3xl p-6 sm:p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              style={{ backgroundColor: isStarter ? STARTER_BG : PLAN_BG }}
            >
              <p
                className={`font-mono text-xs uppercase tracking-widest ${mutedColor}`}
              >
                {pkg.name}
              </p>

              <p
                className={`mt-4 flex items-baseline gap-2 whitespace-nowrap font-serif text-4xl font-semibold ${textColor}`}
              >
                {amount}
                <span className={`font-sans text-sm font-normal ${mutedColor}`}>
                  {suffix || "one-off"}
                </span>
              </p>

              <a
                href="/contact"
                className={`mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 ${buttonClass}`}
              >
                Get started
              </a>

              {hasEnquiryGuarantee && (
                <p className={`mt-3 text-[11px] leading-snug ${subtleColor}`}>
                  ✅ Enquiry Guarantee: a genuine enquiry within 3 months, or
                  your money back.{" "}
                  <a
                    href="/terms#enquiry-guarantee"
                    className="underline underline-offset-2 hover:opacity-80"
                  >
                    Terms and conditions apply
                  </a>
                  .
                </p>
              )}

              <ul className="mt-6 space-y-3">
                {pkg.includes.map((listItem) => (
                  <li
                    key={listItem}
                    className={`flex items-start gap-2 text-xs sm:text-sm ${subtleColor}`}
                  >
                    <Check
                      aria-hidden="true"
                      className={`mt-0.5 h-3.5 w-3.5 shrink-0 stroke-[2.5] ${iconColor}`}
                    />
                    <span>{listItem}</span>
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
          href="/services"
          className="inline-flex items-center justify-center rounded-lg bg-[#ffb900]/25 px-6 py-3 text-sm font-semibold text-[#b45309] shadow-sm transition-colors hover:bg-[#b45309] hover:text-white"
        >
          Not sure what you need? Explore our services →
        </a>
      </motion.div>
      {headingLevel === "h1" && (
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
      )}
    </section>
  );
}
// "use client";

// import { motion } from "framer-motion";
// import { Check } from "lucide-react";
// import { packages } from "@/lib/content";

// const STARTER_BG = "#343a40";
// const PLAN_BG = "#d9ed92";

// const headerContainer = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08 } },
// };

// const headerItem = {
//   hidden: { opacity: 0, y: 14 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

// const cardContainer = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.1 } },
// };

// const cardItem = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

// export default function PackagesSection() {
//   return (
//     <section id="packages" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
//       {/* Header - same centered, large-serif treatment as the Our Work
//           section heading (section-heading.tsx stays untouched, used
//           elsewhere), so the two sections read as one visual language. */}
//       <motion.div
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.4 }}
//         variants={headerContainer}
//         className="text-center space-y-3"
//       >
//         <motion.div
//           variants={headerItem}
//           className="inline-flex items-center gap-2 rounded-full border border-[#0d1b2a]/10 bg-[#0d1b2a]/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#0d1b2a]/60"
//         >
//           <span className="h-1.5 w-1.5 rounded-full bg-[#0d1b2a]/60" />
//           Pricing
//         </motion.div>
//         <motion.h2
//           variants={headerItem}
//           className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#0d1b2a]"
//         >
//           Packages
//         </motion.h2>
//         <motion.p
//           variants={headerItem}
//           className="text-[#0d1b2a]/60 max-w-xl mx-auto text-sm sm:text-base font-light"
//         >
//           Pick the starting point that fits your business - every package can be
//           tailored once we talk.
//         </motion.p>
//       </motion.div>

//       <motion.div
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.2 }}
//         variants={cardContainer}
//         className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
//       >
//         {packages.map((pkg, index) => {
//           const isStarter = index === 0;
//           const priceMatch = pkg.priceRange.match(/^(£\d+)\s*(.*)$/);
//           const amount = priceMatch ? priceMatch[1] : pkg.priceRange;
//           const suffix = priceMatch ? priceMatch[2] : "";

//           // Starter sits on a dark card, so its text/button flip to light -
//           // everything else keeps the original dark-on-lime treatment.
//           const textColor = isStarter ? "text-white" : "text-[#0d1b2a]";
//           const mutedColor = isStarter ? "text-white/60" : "text-[#0d1b2a]/60";
//           const subtleColor = isStarter ? "text-white/80" : "text-[#0d1b2a]/80";
//           const iconColor = isStarter ? "text-white/50" : "text-[#0d1b2a]/50";
//           const buttonClass = isStarter
//             ? "bg-white text-[#343a40]"
//             : "bg-[#0d1b2a] text-white";

//           return (
//             <motion.div
//               key={pkg.name}
//               variants={cardItem}
//               className="flex flex-col rounded-3xl p-6 sm:p-7"
//               style={{ backgroundColor: isStarter ? STARTER_BG : PLAN_BG }}
//             >
//               <p
//                 className={`font-mono text-xs uppercase tracking-widest ${mutedColor}`}
//               >
//                 {pkg.name}
//               </p>

//               <p
//                 className={`mt-4 flex items-baseline gap-2 whitespace-nowrap font-serif text-4xl font-semibold ${textColor}`}
//               >
//                 {amount}
//                 <span className={`font-sans text-sm font-normal ${mutedColor}`}>
//                   {suffix || "one-off"}
//                 </span>
//               </p>

//               <a
//                 href="#contact"
//                 className={`mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 ${buttonClass}`}
//               >
//                 Get started
//               </a>

//               <ul className="mt-6 space-y-3">
//                 {pkg.includes.map((listItem) => (
//                   <li
//                     key={listItem}
//                     className={`flex items-start gap-2 text-xs sm:text-sm ${subtleColor}`}
//                   >
//                     <Check
//                       aria-hidden="true"
//                       className={`mt-0.5 h-3.5 w-3.5 shrink-0 stroke-[2.5] ${iconColor}`}
//                     />
//                     <span>{listItem}</span>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           );
//         })}
//       </motion.div>
//     </section>
//   );
// }

// Archived - the previous click-to-expand accordion UI, kept in case we
// want that interaction model back instead of the static reference-matched
// grid above.
//
// const smoothSlowEase = [0.65, 0, 0.35, 1] as const;
//
// function PackageDetailCard({ pkg }: { pkg: (typeof packages)[number] }) {
//   return (
//     <div className="relative z-10 flex flex-col justify-between">
//       <div>
//         <p className="text-sm sm:text-base text-[#0d1b2a]/75 leading-relaxed font-light">
//           {pkg.tagline}
//         </p>
//
//         <ul className="mt-5 sm:mt-7 space-y-3">
//           {pkg.includes.map((listItem) => (
//             <li
//               key={listItem}
//               className="flex items-center gap-3 text-xs sm:text-sm text-[#0d1b2a]"
//             >
//               <span
//                 aria-hidden="true"
//                 className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0d1b2a]/15 text-[#0d1b2a]"
//               >
//                 <Check className="h-3 w-3 stroke-[2.5]" />
//               </span>
//               <span>{listItem}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//
//       <div className="mt-6 sm:mt-8 border-t border-[#0d1b2a]/20 pt-5 sm:pt-6">
//         <p className="text-[11px] uppercase tracking-wider text-[#0d1b2a]/70 font-mono">
//           Selected Plan
//         </p>
//         <p className="mt-1 font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#0d1b2a]">
//           {pkg.priceRange}
//         </p>
//       </div>
//     </div>
//   );
// }
//
// export default function PackagesSection() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//
//   const isSelected = activeIndex !== null;
//   const active = isSelected ? packages[activeIndex] : null;
//
//   const handleToggle = (index: number) => {
//     setActiveIndex((prev) => (prev === index ? null : index));
//   };
//
//   return (
//     <section id="packages" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
//       <SectionHeading
//         eyebrow="Pricing"
//         title="Packages"
//         description="Pick the starting point that fits your business - every package can be tailored once we talk."
//       />
//
//       {/* Outer navy-gradient panel - parked for now, not deleted, in case we want this card
//           treatment back later. Its layout/spacing responsibilities (mt-12, the centered
//           max-w-xl when nothing's selected, the layout-animated transition) moved onto the
//           grid div directly below so removing the background didn't lose that behavior.
//       <motion.div
//         layout
//         transition={{ duration: 0.9, ease: smoothSlowEase }}
//         className={`mt-12 rounded-3xl bg-gradient-to-br from-[#0d1b2a] via-[#001d3d] to-[#003566] p-5 transition-all sm:p-8 ${
//           isSelected ? "" : "mx-auto max-w-xl"
//         }`}
//       >
//       */}
//         <motion.div
//           layout
//           transition={{ duration: 0.9, ease: smoothSlowEase }}
//           className={`mt-12 grid gap-10 items-start transition-all ${
//             isSelected
//               ? "grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
//               : "mx-auto max-w-xl grid-cols-1"
//           }`}
//         >
//           {/* Left Column (Desktop) / Main Accordion (Mobile) */}
//           <motion.div
//             layout
//             transition={{ duration: 0.9, ease: smoothSlowEase }}
//             className="flex flex-col gap-3 w-full"
//           >
//             {packages.map((pkg, index) => {
//               const isActive = index === activeIndex;
//
//               return (
//                 <motion.div
//                   key={pkg.name}
//                   layout
//                   transition={{ duration: 0.6, ease: smoothSlowEase }}
//                   className={`overflow-hidden rounded-3xl border transition-colors duration-500 ${
//                     isActive
//                       ? "border-[#fcba04]/30 bg-foreground/5 shadow-xl backdrop-blur-xl ring-1 ring-[#fcba04]/20"
//                       : "border-transparent bg-transparent hover:border-border hover:bg-foreground/5"
//                   }`}
//                 >
//                   <button
//                     type="button"
//                     onClick={() => handleToggle(index)}
//                     aria-expanded={isActive}
//                     className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors"
//                   >
//                     <motion.span
//                       animate={{ rotate: isActive ? 45 : 0 }}
//                       transition={{ duration: 0.5, ease: smoothSlowEase }}
//                       aria-hidden="true"
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
//                         isActive
//                           ? "border-[#fcba04]/60 text-[#fcba04] bg-[#fcba04]/10 shadow-sm"
//                           : "border-border text-muted-foreground"
//                       }`}
//                     >
//                       <Plus className="h-4 w-4" />
//                     </motion.span>
//
//                     <span
//                       className={`text-lg transition-colors duration-500 ${
//                         isActive ? "font-medium text-foreground" : "text-muted-foreground"
//                       }`}
//                     >
//                       {pkg.name}
//                     </span>
//
//                     <span className="ml-auto shrink-0 text-sm text-[#fcba04] font-mono">
//                       {pkg.priceRange}
//                     </span>
//                   </button>
//
//                   {/* --- MOBILE ONLY: Renders inline right below the label --- */}
//                   <AnimatePresence initial={false}>
//                     {isActive && (
//                       <motion.div
//                         key={`mobile-content-${pkg.name}`}
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.5, ease: smoothSlowEase }}
//                         className="md:hidden overflow-hidden border-t border-[#0d1b2a]/10 bg-[#fcba04] px-5 py-5"
//                       >
//                         <PackageDetailCard pkg={pkg} />
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//
//           {/* --- DESKTOP ONLY: Sticky side card (Hidden on Mobile) --- */}
//           {isSelected && active && (
//             <div className="hidden md:block relative min-h-[22rem] md:sticky md:top-24">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={active.name}
//                   initial={{
//                     opacity: 0,
//                     x: 55,
//                     scale: 0.96,
//                     filter: "blur(8px)",
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                     scale: 1,
//                     filter: "blur(0px)",
//                   }}
//                   exit={{
//                     opacity: 0,
//                     x: -35,
//                     scale: 0.97,
//                     filter: "blur(6px)",
//                   }}
//                   transition={{
//                     duration: 0.75,
//                     ease: smoothSlowEase,
//                   }}
//                   className="relative overflow-hidden rounded-3xl border border-[#0d1b2a]/10 bg-[#fcba04] p-6 sm:p-8 shadow-2xl"
//                 >
//                   {/* Ambient glow */}
//                   <div
//                     aria-hidden="true"
//                     className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0d1b2a]/10 blur-3xl"
//                   />
//
//                   <PackageDetailCard pkg={active} />
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           )}
//         </motion.div>
//       {/*
//       </motion.div>
//       */}
//     </section>
//   );
// }

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus } from "lucide-react";
// import SectionHeading from "@/components/section-heading";
// import { packages } from "@/lib/content";

// const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// export default function PackagesSection() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const active = packages[activeIndex];

//   return (
//     <section id="packages" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
//       <SectionHeading
//         eyebrow="Pricing"
//         title="Packages"
//         description="Pick the starting point that fits your business - every package can be tailored once we talk."
//       />

//       <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-start">
//         <div className="flex flex-col gap-3">
//           {packages.map((pkg, index) => {
//             const isActive = index === activeIndex;
//             return (
//               <motion.div
//                 key={pkg.name}
//                 layout
//                 transition={{ type: "spring", stiffness: 300, damping: 32 }}
//                 className={`overflow-hidden rounded-3xl border transition-colors ${
//                   isActive ? "border-border bg-card" : "border-transparent"
//                 }`}
//               >
//                 <button
//                   type="button"
//                   onClick={() => setActiveIndex(index)}
//                   aria-expanded={isActive}
//                   className="flex w-full items-center gap-4 px-5 py-4 text-left"
//                 >
//                   <span
//                     aria-hidden="true"
//                     className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </span>
//                   <span className={`text-lg ${isActive ? "font-medium text-foreground" : "text-muted-foreground"}`}>
//                     {pkg.name}
//                   </span>
//                   <span className="ml-auto shrink-0 text-sm text-muted-foreground">
//                     {pkg.priceRange}
//                   </span>
//                 </button>

//                 <AnimatePresence initial={false}>
//                   {isActive && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.25, ease: "easeOut" }}
//                     >
//                       <p className="px-5 pb-4 pl-[4.25rem] text-sm text-muted-foreground">
//                         <span className="font-medium text-foreground">{pkg.name}.</span> {pkg.tagline}
//                       </p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             );
//           })}
//         </div>

//         <div className="shadow-metal relative min-h-[18rem] overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 md:sticky md:top-24">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={active.name}
//               initial={{ opacity: 0, y: 16, scale: 0.98 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -16, scale: 0.98 }}
//               transition={{ duration: 0.4, ease: easeOutExpo }}
//             >
//               <p className="text-muted-foreground">{active.tagline}</p>
//               <ul className="mt-5 space-y-2">
//                 {active.includes.map((listItem) => (
//                   <li key={listItem} className="flex gap-2 text-sm">
//                     <span aria-hidden="true" className="text-primary">
//                       ✓
//                     </span>
//                     {listItem}
//                   </li>
//                 ))}
//               </ul>
//               <p className="mt-6 font-serif text-2xl font-semibold text-primary">
//                 {active.priceRange}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus } from "lucide-react";
// import SectionHeading from "@/components/section-heading";
// import { packages } from "@/lib/content";

// // Smooth custom ease curve
// const easeTransition = {
//   duration: 0.5,
//   ease: [0.16, 1, 0.3, 1] as const,
// };

// export default function PackagesSection() {
//   // Set to `null` initially so it starts centered with no package selected.
//   // (If you want the first package unselected by default, keep null. If you want a close button, clicking the active one toggles it back to null.)
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const isSelected = activeIndex !== null;
//   const active = isSelected ? packages[activeIndex] : null;

//   const handleToggle = (index: number) => {
//     // Clicking the already active package can optionally close it, or keep it open:
//     setActiveIndex((prev) => (prev === index ? null : index));
//   };

//   return (
//     <section id="packages" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
//       <SectionHeading
//         eyebrow="Pricing"
//         title="Packages"
//         description="Pick the starting point that fits your business - every package can be tailored once we talk."
//       />

//       {/* Outer animated layout container */}
//       <motion.div
//         layout
//         transition={easeTransition}
//         className={`mt-12 grid gap-8 items-start transition-all ${
//           isSelected
//             ? "grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
//             : "grid-cols-1 max-w-xl mx-auto"
//         }`}
//       >
//         {/* Left Div: Starts centered, slides left when a package is selected */}
//         <motion.div
//           layout
//           transition={easeTransition}
//           className="flex flex-col gap-3 w-full"
//         >
//           {packages.map((pkg, index) => {
//             const isActive = index === activeIndex;

//             return (
//               <motion.div
//                 key={pkg.name}
//                 layout
//                 transition={{ type: "spring", stiffness: 350, damping: 30 }}
//                 className={`overflow-hidden rounded-3xl border transition-colors ${
//                   isActive
//                     ? "border-border bg-card shadow-sm"
//                     : "border-transparent hover:border-border/50 hover:bg-card/50"
//                 }`}
//               >
//                 <button
//                   type="button"
//                   onClick={() => handleToggle(index)}
//                   aria-expanded={isActive}
//                   className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors"
//                 >
//                   {/* Rotating plus icon */}
//                   <motion.span
//                     animate={{ rotate: isActive ? 45 : 0 }}
//                     transition={{ duration: 0.25 }}
//                     aria-hidden="true"
//                     className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
//                       isActive
//                         ? "border-primary text-primary bg-primary/10"
//                         : "border-border text-muted-foreground"
//                     }`}
//                   >
//                     <Plus className="h-4 w-4" />
//                   </motion.span>

//                   <span
//                     className={`text-lg transition-colors ${
//                       isActive
//                         ? "font-medium text-foreground"
//                         : "text-muted-foreground"
//                     }`}
//                   >
//                     {pkg.name}
//                   </span>

//                   <span className="ml-auto shrink-0 text-sm text-muted-foreground">
//                     {pkg.priceRange}
//                   </span>
//                 </button>

//                 {/* Subtitle / expandable tagline in left item */}
//                 <AnimatePresence initial={false}>
//                   {isActive && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{
//                         duration: 0.3,
//                         ease: [0.16, 1, 0.3, 1] as const,
//                       }}
//                     >
//                       <p className="px-5 pb-4 pl-[4.25rem] text-sm text-muted-foreground">
//                         <span className="font-medium text-foreground">
//                           {pkg.name}.
//                         </span>{" "}
//                         {pkg.tagline}
//                       </p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* Right Div: Enters smoothly from the right with ease-in/spring when active */}
//         <AnimatePresence mode="wait">
//           {isSelected && active && (
//             <motion.div
//               key="details-card-container"
//               initial={{ opacity: 0, x: 40, scale: 0.96 }}
//               animate={{ opacity: 1, x: 0, scale: 1 }}
//               exit={{ opacity: 0, x: 30, scale: 0.96 }}
//               transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
//               className="shadow-metal relative min-h-[20rem] overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 md:sticky md:top-24"
//             >
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={active.name}
//                   initial={{ opacity: 0, y: 14 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -14 }}
//                   transition={{ duration: 0.3, ease: "easeOut" }}
//                 >
//                   <p className="text-base text-muted-foreground leading-relaxed">
//                     {active.tagline}
//                   </p>

//                   <ul className="mt-6 space-y-3">
//                     {active.includes.map((listItem) => (
//                       <li
//                         key={listItem}
//                         className="flex items-center gap-3 text-sm text-foreground/90"
//                       >
//                         <span
//                           aria-hidden="true"
//                           className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold"
//                         >
//                           ✓
//                         </span>
//                         <span>{listItem}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <div className="mt-8 border-t border-border/60 pt-6">
//                     <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
//                       Pricing
//                     </p>
//                     <p className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-primary">
//                       {active.priceRange}
//                     </p>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// }

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Check } from "lucide-react";
// import SectionHeading from "@/components/section-heading";
// import { packages } from "@/lib/content";

// // Smooth, cinematic slow ease-in-out curve (cubic-bezier)
// const smoothSlowEase = [0.65, 0, 0.35, 1] as const;
// const TRANSITION_DURATION = 0.95; // ~1 second for that slow, luxurious feel

// export default function PackagesSection() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const isSelected = activeIndex !== null;
//   const active = isSelected ? packages[activeIndex] : null;

//   const handleToggle = (index: number) => {
//     setActiveIndex((prev) => (prev === index ? null : index));
//   };

//   return (
//     <section id="packages" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
//       <SectionHeading
//         eyebrow="Pricing"
//         title="Packages"
//         description="Pick the starting point that fits your business - every package can be tailored once we talk."
//       />

//       {/* Main container: smoothly transitions from center-aligned (max-w-xl) to 2-column grid */}
//       <motion.div
//         layout
//         transition={{
//           duration: TRANSITION_DURATION,
//           ease: smoothSlowEase,
//         }}
//         className={`mt-12 grid gap-10 items-start transition-all ${
//           isSelected
//             ? "grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
//             : "grid-cols-1 max-w-xl mx-auto"
//         }`}
//       >
//         {/* Left Div: Smoothly glides from center to the left */}
//         <motion.div
//           layout
//           transition={{
//             duration: TRANSITION_DURATION,
//             ease: smoothSlowEase,
//           }}
//           className="flex flex-col gap-3 w-full"
//         >
//           {packages.map((pkg, index) => {
//             const isActive = index === activeIndex;

//             return (
//               <motion.div
//                 key={pkg.name}
//                 layout
//                 transition={{
//                   duration: TRANSITION_DURATION,
//                   ease: smoothSlowEase,
//                 }}
//                 className={`overflow-hidden rounded-3xl border transition-colors duration-500 ${
//                   isActive
//                     ? "border-border/80 bg-card/90 shadow-xl backdrop-blur-xl ring-1 ring-primary/20"
//                     : "border-transparent bg-transparent hover:border-border/40 hover:bg-card/40"
//                 }`}
//               >
//                 <button
//                   type="button"
//                   onClick={() => handleToggle(index)}
//                   aria-expanded={isActive}
//                   className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors"
//                 >
//                   {/* Rotating plus icon */}
//                   <motion.span
//                     animate={{ rotate: isActive ? 45 : 0 }}
//                     transition={{
//                       duration: 0.6,
//                       ease: smoothSlowEase,
//                     }}
//                     aria-hidden="true"
//                     className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
//                       isActive
//                         ? "border-primary/50 text-primary bg-primary/10 shadow-sm"
//                         : "border-border text-muted-foreground"
//                     }`}
//                   >
//                     <Plus className="h-4 w-4" />
//                   </motion.span>

//                   <span
//                     className={`text-lg transition-colors duration-500 ${
//                       isActive
//                         ? "font-medium text-foreground"
//                         : "text-muted-foreground"
//                     }`}
//                   >
//                     {pkg.name}
//                   </span>

//                   <span className="ml-auto shrink-0 text-sm text-muted-foreground font-mono">
//                     {pkg.priceRange}
//                   </span>
//                 </button>

//                 {/* Subtitle dropdown */}
//                 <AnimatePresence initial={false}>
//                   {isActive && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{
//                         duration: 0.6,
//                         ease: smoothSlowEase,
//                       }}
//                     >
//                       <p className="px-5 pb-4 pl-[4.25rem] text-sm text-muted-foreground">
//                         <span className="font-medium text-foreground">
//                           {pkg.name}.
//                         </span>{" "}
//                         {pkg.tagline}
//                       </p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* Right Div: Enters smoothly and slowly from the right with easeInOut */}
//         <AnimatePresence mode="wait">
//           {isSelected && active && (
//             <motion.div
//               key="detail-card-shell"
//               initial={{
//                 opacity: 0,
//                 x: 60,
//                 scale: 0.96,
//                 filter: "blur(8px)",
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//               }}
//               exit={{
//                 opacity: 0,
//                 x: 40,
//                 scale: 0.97,
//                 filter: "blur(6px)",
//               }}
//               transition={{
//                 duration: TRANSITION_DURATION,
//                 ease: smoothSlowEase,
//               }}
//               className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/70 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl md:sticky md:top-24 ring-1 ring-white/10"
//             >
//               {/* Subtle glass radial ambient glow */}
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
//               />

//               {/* Internal content with subtle crossfade when switching active plans */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={active.name}
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{
//                     duration: 0.5,
//                     ease: smoothSlowEase,
//                   }}
//                   className="relative z-10 flex flex-col justify-between"
//                 >
//                   <div>
//                     {/* Tagline */}
//                     <p className="text-base text-muted-foreground leading-relaxed font-light">
//                       {active.tagline}
//                     </p>

//                     {/* Features list */}
//                     <ul className="mt-7 space-y-3.5">
//                       {active.includes.map((listItem) => (
//                         <li
//                           key={listItem}
//                           className="flex items-center gap-3 text-sm text-foreground/90"
//                         >
//                           <span
//                             aria-hidden="true"
//                             className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
//                           >
//                             <Check className="h-3 w-3 stroke-[2.5]" />
//                           </span>
//                           <span>{listItem}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Pricing footer */}
//                   <div className="mt-8 border-t border-border/50 pt-6">
//                     <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
//                       Selected Plan
//                     </p>
//                     <p className="mt-1 font-serif text-3xl font-semibold tracking-tight text-primary">
//                       {active.priceRange}
//                     </p>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// }
