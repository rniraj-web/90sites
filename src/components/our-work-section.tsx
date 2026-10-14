// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ExternalLink,
//   ChevronLeft,
//   ChevronRight,
//   Pause,
//   Play,
// } from "lucide-react";

// export const PROJECTS = [
//   {
//     id: "beirut",
//     name: "Beirut Restaurant",
//     category: "Hospitality & Dining",
//     tagline: "Authentic Lebanese dining experience with online reservations",
//     image: "/our-work_hero/Beirut.webp",
//     url: "https://beirutable.co.uk/",
//   },
//   {
//     id: "senses",
//     name: "The Fifth Sense",
//     category: "Aesthetics & Wellness",
//     tagline:
//       "Naturally refined medical aesthetics with direct treatment bookings",
//     image: "/our-work_hero/Senses.webp",
//     url: "https://thefifthsense.co.uk/",
//   },
//   {
//     id: "exhaust",
//     name: "Exhaust Centre & Tyres",
//     category: "Automotive Services",
//     tagline:
//       "Specialist local garage tyre finder and service appointment system",
//     image: "/our-work_hero/Exhuast.webp",
//     url: "https://exhaustcentreandtyres.co.uk/",
//   },
//   {
//     id: "greek",
//     name: "Greek Street Food",
//     category: "Food & Delivery",
//     tagline: "Vibrant fast-casual menu ordering and local delivery portal",
//     image: "/our-work_hero/Greek.webp",
//     url: "https://mygreekstreetfood.com/",
//   },
//   {
//     id: "huda",
//     name: "Huda Gifts",
//     category: "E-Commerce & Retail",
//     tagline: "Bespoke Islamic gifts and curated spiritual lifestyle storefront",
//     image: "/our-work_hero/Huda.webp",
//     url: "https://hudagifts.com/",
//   },
//   {
//     id: "cheshire",
//     name: "Cheshire Kitchens & Bedrooms",
//     category: "Interior Architecture",
//     tagline:
//       "Luxury bespoke kitchen design gallery with client consultation planner",
//     image: "/our-work_hero/Cheshire.webp",
//     url: "https://cheshirekitchensandbedrooms.co.uk/",
//   },
//   {
//     id: "northwest",
//     name: "North West Furniture",
//     category: "Home & Living",
//     tagline:
//       "Showroom catalog with custom dimensions and direct WhatsApp enquiries",
//     image: "/our-work_hero/Northwest.webp",
//     url: "https://northwestfurnituremanchester.co.uk/",
//   },
//   {
//     id: "sb-autos",
//     name: "SB Autos Leek",
//     category: "Vehicle Maintenance",
//     tagline: "MOT & service booking with seasonal discount coupon integrations",
//     image: "/our-work_hero/SB-autos.webp",
//     url: "https://sbautosleek.co.uk/",
//   },
// ];

// export default function OurWorkSection({
//   headingLevel = "h2",
// }: {
//   headingLevel?: "h1" | "h2";
// }) {
//   const Heading = motion[headingLevel];
//   const SubHeading = headingLevel === "h1" ? "h2" : "h3";
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [userPaused, setUserPaused] = useState(false);
//   const [reducedMotion, setReducedMotion] = useState(false);
//   const stageRef = useRef<HTMLDivElement>(null);
//   const lastWheelTimeRef = useRef(0);

//   const activeProject = PROJECTS[activeIndex];

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
//   };

//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//     setReducedMotion(mq.matches);
//     const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
//     mq.addEventListener("change", handler);
//     return () => mq.removeEventListener("change", handler);
//   }, []);

//   useEffect(() => {
//     if (isPaused || userPaused || reducedMotion) return;

//     const interval = setInterval(() => {
//       handleNext();
//     }, 3500);

//     return () => clearInterval(interval);
//   }, [isPaused, userPaused, reducedMotion, activeIndex]);

//   useEffect(() => {
//     const stage = stageRef.current;
//     if (!stage) return;

//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault();

//       const now = Date.now();
//       if (now - lastWheelTimeRef.current < 280) return;

//       const delta =
//         Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

//       if (delta > 25) {
//         lastWheelTimeRef.current = now;
//         handleNext();
//       } else if (delta < -25) {
//         lastWheelTimeRef.current = now;
//         handlePrev();
//       }
//     };

//     stage.addEventListener("wheel", handleWheel, { passive: false });
//     return () => stage.removeEventListener("wheel", handleWheel);
//   }, []);

//   return (
//     <section
//       id="work"
//       className="relative w-full py-24 sm:py-32 overflow-hidden"
//     >
//       {/* Ambient Glow accented with #5829a7 */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full bg-[#5829a7]/10 blur-[130px]"
//       />

//       {/* Header with #5829a7 Pill Badge & Highlight Effect */}
//       <motion.div
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.4 }}
//         variants={{
//           hidden: {},
//           show: { transition: { staggerChildren: 0.08 } },
//         }}
//         className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-16"
//       >
//         {/* Pill Badge */}
//         <motion.div
//           variants={{
//             hidden: { opacity: 0, y: 14 },
//             show: { opacity: 1, y: 0 },
//           }}
//           transition={{ duration: 0.5 }}
//         >
//           <span className="inline-block rounded-full bg-[#5829a7]/15 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#5829a7] sm:text-sm">
//             Portfolio
//           </span>
//         </motion.div>

//         {/* Heading: Our Client Work */}
//         <Heading
//           variants={{
//             hidden: { opacity: 0, y: 14 },
//             show: { opacity: 1, y: 0 },
//           }}
//           transition={{ duration: 0.5 }}
//           className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1b1f27]"
//         >
//           Our{" "}
//           <span className="relative inline-block">
//             <span className="relative z-10 text-[#5829a7]">Client Work</span>
//             {/* #5829a7 highlighter bar */}
//             <span
//               aria-hidden="true"
//               className="absolute bottom-1 left-0 z-0 h-3 w-full -rotate-1 rounded bg-[#5829a7]/20"
//             />
//           </span>
//         </Heading>
//       </motion.div>

//       {/* 3D Vinyl Sleeve Stage */}
//       <motion.div
//         ref={stageRef}
//         initial={{ opacity: 0, scale: 0.94 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         viewport={{ once: true, amount: 0.2 }}
//         transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//         onFocus={() => setIsPaused(true)}
//         onBlur={() => setIsPaused(false)}
//         className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing"
//         style={{
//           perspective: "1500px",
//           perspectiveOrigin: "50% 50%",
//         }}
//       >
//         <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
//           {PROJECTS.map((project, index) => {
//             let distance = index - activeIndex;
//             if (distance > PROJECTS.length / 2) distance -= PROJECTS.length;
//             if (distance < -PROJECTS.length / 2) distance += PROJECTS.length;

//             const isCenter = distance === 0;
//             const absDistance = Math.abs(distance);

//             if (absDistance > 3) return null;

//             const xOffset = distance * 190;
//             const zOffset = isCenter ? 140 : Math.max(0, 80 - absDistance * 40);
//             const rotateY = isCenter ? 0 : distance < 0 ? 38 : -38;
//             const scale = isCenter
//               ? 1.35
//               : Math.max(0.78, 1 - absDistance * 0.14);
//             const zIndex = 30 - absDistance * 8;
//             const blur = isCenter ? 0 : Math.min(absDistance * 1.5, 4);
//             const opacity = isCenter
//               ? 1
//               : Math.max(0.35, 1 - absDistance * 0.28);

//             return (
//               <motion.div
//                 key={project.id}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={
//                   isCenter
//                     ? `${project.name} (current)`
//                     : `Show ${project.name}`
//                 }
//                 onClick={() => setActiveIndex(index)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     e.preventDefault();
//                     setActiveIndex(index);
//                   }
//                 }}
//                 animate={{
//                   x: xOffset,
//                   z: zOffset,
//                   rotateY: rotateY,
//                   scale: scale,
//                   filter: `blur(${blur}px)`,
//                   opacity: opacity,
//                   zIndex: zIndex,
//                 }}
//                 transition={{
//                   duration: 0.65,
//                   ease: [0.65, 0, 0.35, 1],
//                 }}
//                 whileHover={
//                   isCenter
//                     ? { scale: scale * 1.03, y: -6 }
//                     : { opacity: 0.95, scale: scale * 1.04 }
//                 }
//                 style={{
//                   transformStyle: "preserve-3d",
//                 }}
//                 className="absolute w-52 sm:w-60 h-72 sm:h-80 rounded-2xl cursor-pointer group"
//               >
//                 <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-white/15 bg-zinc-900">
//                   {isCenter && (
//                     <motion.div
//                       initial={{ x: 0, rotate: 0 }}
//                       animate={{
//                         x: 38,
//                         rotate:
//                           isPaused || userPaused || reducedMotion ? 45 : 360,
//                       }}
//                       transition={{
//                         x: { duration: 0.6 },
//                         rotate: {
//                           repeat:
//                             isPaused || userPaused || reducedMotion
//                               ? 0
//                               : Infinity,
//                           duration: 8,
//                           ease: "linear",
//                         },
//                       }}
//                       className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 -z-10 shadow-2xl flex items-center justify-center pointer-events-none"
//                     >
//                       <div className="w-36 h-36 rounded-full border border-zinc-800/80 flex items-center justify-center">
//                         <div className="w-24 h-24 rounded-full border border-zinc-800/80 flex items-center justify-center">
//                           <div className="w-12 h-12 rounded-full bg-[#5829a7] border-2 border-white/30" />
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}

//                   <Image
//                     src={project.image}
//                     alt={`${project.name} — ${project.category} website design by WebBizo`}
//                     fill
//                     sizes="(max-width: 640px) 208px, 240px"
//                     className="object-cover object-top"
//                   />

//                   <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-60 group-hover:opacity-90 transition-opacity" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

//                   <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
//                     <span className="text-xs font-medium text-white truncate drop-shadow-md">
//                       {project.name}
//                     </span>
//                   </div>
//                 </div>

//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute -bottom-36 left-0 right-0 h-26 rounded-2xl overflow-hidden opacity-70 [transform:scaleY(-1)] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)] [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]"
//                 >
//                   <Image
//                     src={project.image}
//                     alt=""
//                     fill
//                     sizes="(max-width: 640px) 208px, 240px"
//                     className="object-cover object-top"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10" />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </motion.div>

//       {/* Active Project Details & Live CTA Drawer */}
//       <div
//         className="relative z-20 max-w-2xl mx-auto px-4 mt-8"
//         aria-live="polite"
//         aria-atomic="true"
//       >
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeProject.id}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
//             className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 sm:p-7 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6"
//           >
//             <div className="space-y-1.5">
//               <span className="text-[11px] font-mono uppercase tracking-widest text-[#a87ff5]">
//                 {activeProject.category}
//               </span>
//               <SubHeading className="text-xl sm:text-2xl font-serif font-medium text-white">
//                 {activeProject.name}
//               </SubHeading>
//               <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md">
//                 {activeProject.tagline}
//               </p>
//             </div>

//             <a
//               href={activeProject.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-zinc-900 hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
//             >
//               <span>Visit live site</span>
//               <ExternalLink className="w-3.5 h-3.5" />
//             </a>
//           </motion.div>
//         </AnimatePresence>

//         {/* Navigation Buttons */}
//         <div className="flex items-center justify-center gap-4 mt-8">
//           <button
//             onClick={handlePrev}
//             aria-label="Previous project"
//             className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 bg-white/70 hover:bg-white text-neutral-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>

//           {/* Dots Indicator */}
//           <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-neutral-100 border border-neutral-200">
//             {PROJECTS.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setActiveIndex(i)}
//                 aria-label={`Go to slide ${i + 1}`}
//                 aria-current={i === activeIndex ? "true" : undefined}
//                 className="flex items-center justify-center w-6 h-6"
//               >
//                 <span
//                   className={`block rounded-full transition-all ${
//                     i === activeIndex
//                       ? "w-6 h-1.5 bg-[#5829a7]"
//                       : "w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-500"
//                   }`}
//                 />
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={handleNext}
//             aria-label="Next project"
//             className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 bg-white/70 hover:bg-white text-neutral-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>

//           <button
//             onClick={() => setUserPaused((p) => !p)}
//             aria-label={
//               userPaused
//                 ? "Resume automatic slideshow"
//                 : "Pause automatic slideshow"
//             }
//             aria-pressed={userPaused}
//             className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 bg-white/70 hover:bg-white text-neutral-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
//           >
//             {userPaused ? (
//               <Play className="w-4 h-4" />
//             ) : (
//               <Pause className="w-4 h-4" />
//             )}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageMarquee from "@/components/page-marquee";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

export const PROJECTS = [
  {
    id: "beirut",
    name: "Beirut Restaurant",
    category: "Hospitality & Dining",
    tagline: "Authentic Lebanese dining experience with online reservations",
    image: "/our-work_hero/Beirut.webp",
    url: "https://beirutable.co.uk/",
  },
  {
    id: "senses",
    name: "The Fifth Sense",
    category: "Aesthetics & Wellness",
    tagline:
      "Naturally refined medical aesthetics with direct treatment bookings",
    image: "/our-work_hero/Senses.webp",
    url: "https://thefifthsense.co.uk/",
  },
  {
    id: "exhaust",
    name: "Exhaust Centre & Tyres",
    category: "Automotive Services",
    tagline:
      "Specialist local garage tyre finder and service appointment system",
    image: "/our-work_hero/Exhuast.webp",
    url: "https://exhaustcentreandtyres.co.uk/",
  },
  {
    id: "greek",
    name: "Greek Street Food",
    category: "Food & Delivery",
    tagline: "Vibrant fast-casual menu ordering and local delivery portal",
    image: "/our-work_hero/Greek.webp",
    url: "https://mygreekstreetfood.com/",
  },
  {
    id: "huda",
    name: "Huda Gifts",
    category: "E-Commerce & Retail",
    tagline: "Bespoke Islamic gifts and curated spiritual lifestyle storefront",
    image: "/our-work_hero/Huda.webp",
    url: "https://hudagifts.com/",
  },
  {
    id: "cheshire",
    name: "Cheshire Kitchens & Bedrooms",
    category: "Interior Architecture",
    tagline:
      "Luxury bespoke kitchen design gallery with client consultation planner",
    image: "/our-work_hero/Cheshire.webp",
    url: "https://cheshirekitchensandbedrooms.co.uk/",
  },
  {
    id: "northwest",
    name: "North West Furniture",
    category: "Home & Living",
    tagline:
      "Showroom catalog with custom dimensions and direct WhatsApp enquiries",
    image: "/our-work_hero/Northwest.webp",
    url: "https://northwestfurnituremanchester.co.uk/",
  },
  {
    id: "sb-autos",
    name: "SB Autos Leek",
    category: "Vehicle Maintenance",
    tagline: "MOT & service booking with seasonal discount coupon integrations",
    image: "/our-work_hero/SB-autos.webp",
    url: "https://sbautosleek.co.uk/",
  },
];

export default function OurWorkSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = motion[headingLevel];
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const lastWheelTimeRef = useRef(0);

  const activeProject = PROJECTS[activeIndex];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation (Left / Right Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Respect OS reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Auto-scroll slideshow
  useEffect(() => {
    if (isPaused || userPaused || reducedMotion) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, userPaused, reducedMotion, handleNext]);

  // Wheel handling: ONLY captures horizontal gestures, leaves vertical scroll free
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      // If the scroll is predominantly horizontal (deltaX > deltaY)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 25) {
        e.preventDefault();

        const now = Date.now();
        if (now - lastWheelTimeRef.current < 280) return;

        if (e.deltaX > 25) {
          lastWheelTimeRef.current = now;
          handleNext();
        } else if (e.deltaX < -25) {
          lastWheelTimeRef.current = now;
          handlePrev();
        }
      }
      // If it's vertical (deltaY), we do NOT preventDefault, allowing normal page scrolling!
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [handleNext, handlePrev]);

  return (
    <section
      id="work"
      className="relative w-full py-20 sm:py-28 overflow-hidden"
    >
      {/* Ambient Glow accented with #5829a7 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full bg-[#5829a7]/10 blur-[130px] "
      />

      {/* Header with #5829a7 Pill Badge & Highlight Effect */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4 "
      >
        {/* Pill Badge */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block rounded-full bg-[#5829a7]/15 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#5829a7] sm:text-sm">
            Portfolio
          </span>
        </motion.div>

        {/* Heading: Our Client Work */}
        <Heading
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1b1f27]"
        >
          Our{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#5829a7]">Client Work</span>
            {/* #5829a7 highlighter bar */}
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-0 z-0 h-3 w-full -rotate-1 rounded bg-[#5829a7]/20"
            />
          </span>
        </Heading>
      </motion.div>

      {headingLevel === "h1" && (
        <div className="mb-8">
          <PageMarquee bgColor="rgba(88, 41, 167, 0.18)" textColor="#5829a7" />
        </div>
      )}

      {/* 3D Vinyl Sleeve Stage */}
      <motion.div
        ref={stageRef}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1500px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {PROJECTS.map((project, index) => {
            let distance = index - activeIndex;
            if (distance > PROJECTS.length / 2) distance -= PROJECTS.length;
            if (distance < -PROJECTS.length / 2) distance += PROJECTS.length;

            const isCenter = distance === 0;
            const absDistance = Math.abs(distance);

            if (absDistance > 3) return null;

            const xOffset = distance * 190;
            const zOffset = isCenter ? 140 : Math.max(0, 80 - absDistance * 40);
            const rotateY = isCenter ? 0 : distance < 0 ? 38 : -38;
            const scale = isCenter
              ? 1.35
              : Math.max(0.78, 1 - absDistance * 0.14);
            const zIndex = 30 - absDistance * 8;
            const blur = isCenter ? 0 : Math.min(absDistance * 1.5, 4);
            const opacity = isCenter
              ? 1
              : Math.max(0.35, 1 - absDistance * 0.28);

            return (
              <motion.div
                key={project.id}
                role="button"
                tabIndex={0}
                aria-label={
                  isCenter
                    ? `${project.name} (current)`
                    : `Show ${project.name}`
                }
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY: rotateY,
                  scale: scale,
                  filter: `blur(${blur}px)`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.65, 0, 0.35, 1],
                }}
                whileHover={
                  isCenter
                    ? { scale: scale * 1.03, y: -6 }
                    : { opacity: 0.95, scale: scale * 1.04 }
                }
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="absolute w-52 sm:w-60 h-72 sm:h-80 rounded-2xl cursor-pointer group"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-white/15 bg-zinc-900">
                  {isCenter && (
                    <motion.div
                      initial={{ x: 0, rotate: 0 }}
                      animate={{
                        x: 38,
                        rotate:
                          isPaused || userPaused || reducedMotion ? 45 : 360,
                      }}
                      transition={{
                        x: { duration: 0.6 },
                        rotate: {
                          repeat:
                            isPaused || userPaused || reducedMotion
                              ? 0
                              : Infinity,
                          duration: 8,
                          ease: "linear",
                        },
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 -z-10 shadow-2xl flex items-center justify-center pointer-events-none"
                    >
                      <div className="w-36 h-36 rounded-full border border-zinc-800/80 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border border-zinc-800/80 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#5829a7] border-2 border-white/30" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <Image
                    src={project.image}
                    alt={`${project.name} — ${project.category} website design by WebBizo`}
                    fill
                    sizes="(max-width: 640px) 208px, 240px"
                    className="object-cover object-top"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-white truncate drop-shadow-md">
                      {project.name}
                    </span>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-36 left-0 right-0 h-26 rounded-2xl overflow-hidden opacity-70 [transform:scaleY(-1)] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)] [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]"
                >
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 208px, 240px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Active Project Details & Live CTA Drawer */}
      <div
        className="relative z-20 max-w-2xl mx-auto px-4 mt-8"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 sm:p-7 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#a87ff5]">
                {activeProject.category}
              </span>
              <SubHeading className="text-xl sm:text-2xl font-serif font-medium text-white">
                {activeProject.name}
              </SubHeading>
              <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md">
                {activeProject.tagline}
              </p>
            </div>

            <a
              href={activeProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-zinc-900 hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              <span>Visit live site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 bg-white/70 hover:bg-white text-neutral-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-neutral-100 border border-neutral-200">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
                className="flex items-center justify-center w-6 h-6"
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === activeIndex
                      ? "w-6 h-1.5 bg-[#5829a7]"
                      : "w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-500"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next project"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 bg-white/70 hover:bg-white text-neutral-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setUserPaused((p) => !p)}
            aria-label={
              userPaused
                ? "Resume automatic slideshow"
                : "Pause automatic slideshow"
            }
            aria-pressed={userPaused}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 bg-white/70 hover:bg-white text-neutral-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            {userPaused ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="mt-10 text-center"
      >
        <a
          href="/testimonials"
          className="inline-flex items-center justify-center rounded-lg bg-[#5829a7]/15 px-6 py-3 text-sm font-semibold text-[#5829a7] shadow-sm transition-colors hover:bg-[#5829a7] hover:text-white"
        >
          Don’t just take our word for it. View all reviews →
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
