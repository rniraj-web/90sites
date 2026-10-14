"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

// 8 Projects in sequential order: 0, 1, 2, 3, 4, 5, 6, 7
const PROJECTS = [
  {
    id: "beirut", // 0
    image: "/our-work_hero/Beirut.webp",
    url: "https://beirutable.co.uk/",
    name: "Beirut Restaurant",
  },
  {
    id: "senses", // 1
    image: "/our-work_hero/Senses.webp",
    url: "https://thefifthsense.co.uk/",
    name: "The Fifth Sense",
  },
  {
    id: "exhaust", // 2
    image: "/our-work_hero/Exhuast.webp",
    url: "https://exhaustcentreandtyres.co.uk/",
    name: "Exhaust Centre",
  },
  {
    id: "greek", // 3
    image: "/our-work_hero/Greek.webp",
    url: "https://mygreekstreetfood.com/",
    name: "Greek Street Food",
  },
  {
    id: "huda", // 4
    image: "/our-work_hero/Huda.webp",
    url: "https://hudagifts.com/",
    name: "Huda Gifts",
  },
  {
    id: "cheshire", // 5
    image: "/our-work_hero/Cheshire.webp",
    url: "https://cheshirekitchensandbedrooms.co.uk/",
    name: "Cheshire Kitchens",
  },
  {
    id: "northwest", // 6
    image: "/our-work_hero/Northwest.webp",
    url: "https://northwestfurnituremanchester.co.uk/",
    name: "Northwest Furniture",
  },
  {
    id: "sb-autos", // 7
    image: "/our-work_hero/SB-autos.webp",
    url: "https://sbautosleek.co.uk/",
    name: "SB Autos",
  },
];

// 8 Spatial Positions calibrated so Left and Right NEVER overlap the Middle Machine on desktop:
const SPATIAL_SLOTS = [
  // LEFT WING (0, 1, 2, 3)
  { x: -570, rotateY: 50, scale: 1.25, z: 90, zIndex: 1 }, // Left 0 (outermost)
  { x: -440, rotateY: 38, scale: 1.12, z: 55, zIndex: 2 }, // Left 1
  { x: -320, rotateY: 24, scale: 1.0, z: 25, zIndex: 3 }, // Left 2
  { x: -215, rotateY: 12, scale: 0.9, z: 5, zIndex: 4 }, // Left 3 (closest to machine)

  // RIGHT WING (4, 5, 6, 7)
  { x: 215, rotateY: -12, scale: 0.9, z: 5, zIndex: 4 }, // Right 4 (closest to machine)
  { x: 320, rotateY: -24, scale: 1.0, z: 25, zIndex: 3 }, // Right 5
  { x: 440, rotateY: -38, scale: 1.12, z: 55, zIndex: 2 }, // Right 6
  { x: 570, rotateY: -50, scale: 1.25, z: 90, zIndex: 1 }, // Right 7 (outermost)
];

const EASE_FACTORY = [0.65, 0, 0.35, 1] as const;

const getProject = (index: number) => {
  const safeIndex =
    ((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
  return PROJECTS[safeIndex];
};

export default function Hero() {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven curtain
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const curtainY = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);

  const [showCurtainText, setShowCurtainText] = useState(false);
  const lastProgressRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const scrollingDown = latest > lastProgressRef.current;
    lastProgressRef.current = latest;
    if (scrollingDown && latest > 0.45) {
      setShowCurtainText(true);
    } else if (!scrollingDown) {
      setShowCurtainText(false);
    }
  });

  const goToNextSection = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    // 5s cycle per transition
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % PROJECTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    });
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full bg-[#ebeae5] text-[#191919] overflow-hidden flex flex-col justify-between">
        {/* 1. Canvas Dot Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #a19f96 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* 2. Hero Header Content */}
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 pt-16 sm:pt-20 pb-6">
          <div className="text-center max-w-4xl mx-auto space-y-2 mb-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-1 inline-flex items-center gap-2 rounded-full bg-[#d9ed92] px-3.5 py-1 font-serif text-xs font-medium tracking-wide text-[#3a3935]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#3a3935]" />
              Web design &amp; development studio
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-[#111111] leading-[1.08]"
            >
              No website yet? <br />
              We&apos;ll get your business online from just £90
              <span className="ml-1 font-sans text-xs md:text-sm font-medium tracking-normal text-neutral-600">
                + VAT
              </span>
              .
            </motion.h1>
          </div>

          {/* 3. Showcase Section */}
          <div className="relative w-full overflow-visible py-4 flex justify-center items-center">
            <div
              className="relative flex items-center justify-center h-44 sm:h-72 md:h-80 w-full max-w-6xl origin-center"
              style={{
                perspective: "1400px",
                perspectiveOrigin: "50% 50%",
              }}
            >
              {/* Center Console with 3 Active Cards: Sized nicely on mobile and desktop */}
              <div
                style={{
                  transform: "translate3d(0, 0, -15px)",
                  zIndex: 10,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-sm sm:w-72 md:w-80 h-36 sm:h-28 md:h-32 bg-[#121214] rounded-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-2 sm:p-2.5 flex items-center justify-between gap-2 overflow-hidden ring-1 ring-white/10"
              >
                {/* Interior machine conveyor scanner light */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

                {/* 3 Active items inside middle machine */}
                <AnimatePresence mode="popLayout">
                  {[1, 2, 3].map((offsetIndex, screenSlot) => {
                    const item = getProject(offsetIndex - step);
                    if (!item) return null;
                    return (
                      <motion.a
                        key={`middle-${screenSlot}-${item.id}`}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${item.name}`}
                        initial={{ opacity: 0, scale: 0.85, x: -10 }}
                        animate={{ opacity: 0.9, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 1.1, x: 10 }}
                        transition={{ duration: 0.8, ease: EASE_FACTORY }}
                        className="relative block flex-1 h-full rounded-lg bg-cover bg-center overflow-hidden border border-white/10 cursor-pointer shadow-md"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      >
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/5 transition-colors" />
                      </motion.a>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* 8 3D Side Cards: Hidden on small screens to prevent clutter, active from sm and above */}
              {PROJECTS.map((project, pIndex) => {
                const currentSlot = (pIndex + step) % 8;
                const slot = SPATIAL_SLOTS[currentSlot];

                return (
                  <motion.div
                    key={project.id}
                    animate={{
                      x: slot.x,
                      rotateY: slot.rotateY,
                      scale: slot.scale,
                      z: slot.z,
                      zIndex: slot.zIndex,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1.25,
                      ease: EASE_FACTORY,
                    }}
                    whileHover={{
                      scale: slot.scale * 1.08,
                      z: slot.z + 40,
                      zIndex: 60,
                    }}
                    className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0 sm:w-28 md:w-32 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-black/15 bg-black/5"
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.name}`}
                      className="block w-full h-full relative"
                    >
                      <Image
                        src={project.image}
                        alt={`${project.name} website homepage screenshot`}
                        fill
                        sizes="(max-width: 768px) 112px, 128px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors" />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 4. Action Button */}
          <motion.a
            href="/packages"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 inline-flex min-h-14 items-center justify-center rounded-xl bg-[#f46036] px-10 py-4 font-serif text-lg font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
          >
            View packages
          </motion.a>

          {/* Disclaimer (Fixed nested p tag hydration bug) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-xs text-[#191919]/70 text-center space-y-1"
          >
            <p>
              ✅ Enquiry Guarantee: a genuine enquiry within 3 months, or your
              money back. Applies to selected packages.
            </p>
            <span className="block underline underline-offset-2 hover:opacity-80 cursor-pointer">
              Terms and conditions apply
            </span>
          </motion.div>
        </main>

        {/* 5. Scroll curtain */}
        <motion.div
          style={{
            y: curtainY,
            pointerEvents: showCurtainText ? "auto" : "none",
          }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#121214]"
        >
          <motion.span
            initial={false}
            animate={{
              opacity: showCurtainText ? 1 : 0,
              y: showCurtainText ? 0 : 16,
            }}
            transition={{ duration: 0.4, ease: EASE_FACTORY }}
            className="font-serif text-5xl md:text-7xl text-white"
          >
            Let&apos;s build
          </motion.span>
          <motion.button
            type="button"
            onClick={goToNextSection}
            aria-label="Scroll to next section"
            initial={false}
            animate={{
              opacity: showCurtainText ? 1 : 0,
              y: showCurtainText ? 0 : 16,
            }}
            transition={{ duration: 0.4, ease: EASE_FACTORY, delay: 0.05 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white animate-bounce"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Creative showcase cards that curve across the 3D ribbon
// const ribbonCards = [
//   {
//     id: 1,
//     image: "/our-work_hero/Beirut.webp",
//     url: "https://beirutable.co.uk/",
//     rotateY: 48,
//     scale: 1.25,
//     z: 90,
//   },
//   {
//     id: 2,
//     image: "/our-work_hero/Senses.webp",
//     url: "https://thefifthsense.co.uk/",
//     rotateY: 34,
//     scale: 1.1,
//     z: 50,
//   },
//   {
//     id: 3,
//     image: "/our-work_hero/Exhuast.webp",
//     url: "https://exhaustcentreandtyres.co.uk/",
//     rotateY: 20,
//     scale: 0.98,
//     z: 15,
//   },
//   {
//     id: 4,
//     image: "/our-work_hero/Greek.webp",
//     url: "https://mygreekstreetfood.com/",
//     rotateY: 10,
//     scale: 0.9,
//     z: 0,
//   },
//   // Center Card (The Node Canvas / Workflow strip)
//   {
//     id: 5,
//     image: "",
//     url: "",
//     isCenterCanvas: true,
//     rotateY: 0,
//     scale: 0.88,
//     z: -10,
//   },
//   {
//     id: 6,
//     image: "/our-work_hero/Huda.webp",
//     url: "https://hudagifts.com/",
//     rotateY: -10,
//     scale: 0.9,
//     z: 0,
//   },
//   {
//     id: 7,

//     image: "/our-work_hero/Cheshire.webp",
//     url: "https://cheshirekitchensandbedrooms.co.uk/",
//     rotateY: -20,
//     scale: 0.98,
//     z: 15,
//   },
//   {
//     id: 8,
//     image: "/our-work_hero/Northwest.webp",
//     url: "https://northwestfurnituremanchester.co.uk/",
//     rotateY: -34,
//     scale: 1.1,
//     z: 50,
//   },
//   {
//     id: 9,
//     image: "/our-work_hero/SB-autos.webp",
//     url: "https://sbautosleek.co.uk/",
//     rotateY: -48,
//     scale: 1.25,
//     z: 90,
//   },
// ];

// // The 8 real cards in their fixed visual order (left-outer → left-inner →
// // right-inner → right-outer), used both to render and as the content pool
// // the conveyor cycles through. The canvas card isn't part of the loop.
// const realSlots = ribbonCards.filter((c) => !c.isCenterCanvas);

// // Fixed x/scale/rotation for the moving-conveyor variant - not active right
// // now, kept for when we want visible sliding motion again instead of the
// // fixed-position crossfade.
// // const SLOT_POSITIONS = [
// //   { x: -480, scale: 0.75, rotateY: 38, zIndex: 1 },
// //   { x: -320, scale: 0.88, rotateY: 24, zIndex: 2 },
// //   { x: -160, scale: 1.0, rotateY: 12, zIndex: 3 },
// //   { x: -50, scale: 1.12, rotateY: 4, zIndex: 5 },
// //   { x: 50, scale: 1.12, rotateY: -4, zIndex: 5 },
// //   { x: 160, scale: 1.0, rotateY: -12, zIndex: 3 },
// //   { x: 320, scale: 0.88, rotateY: -24, zIndex: 2 },
// //   { x: 480, scale: 0.75, rotateY: -38, zIndex: 1 },
// // ];

// export default function Hero() {
//   const [offset, setOffset] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setOffset((o) => (o + 1) % realSlots.length);
//     }, 5000);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div className="relative min-h-screen w-full bg-[#ebeae5] text-[#191919] overflow-hidden flex flex-col justify-between">
//       {/* 1. Subtle Canvas Dot Matrix Background */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.35]"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle, #a19f96 1px, transparent 1px)",
//           backgroundSize: "24px 24px",
//         }}
//       />

//       {/* 3. Hero Content Center */}
//       <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 pt-4 pb-16">
//         {/* Editorial Heading */}
//         <div className="text-center max-w-4xl mx-auto space-y-2 mb-1">
//           <motion.span
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//             className="mb-1 inline-flex items-center gap-2 rounded-full bg-[#d9ed92] px-3 py-1 font-serif text-xs font-medium tracking-wide text-[#3a3935]"
//           >
//             <span className="h-1.5 w-1.5 rounded-full bg-[#3a3935]" />
//             Web design &amp; development studio
//           </motion.span>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//             className="font-serif text-5xl md:text-7xl font-normal tracking-tight text-[#111111] leading-[1.08]"
//           >
//             No website yet? <br />
//             We'll get your business online from just £99.
//           </motion.h1>
//         </div>

//         {/* Fixed-position ribbon with crossfading content (8 real cards +
//             static center canvas). Each slot keeps its own 3D transform;
//             only which project's image/url shows there cycles every 5s. */}
//         <div className="relative w-full overflow-visible py-4 flex justify-center items-center">
//           <div
//             className="flex items-center justify-center"
//             style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
//           >
//             {ribbonCards.map((card, idx) => {
//               if (card.isCenterCanvas) {
//                 return (
//                   <motion.div
//                     key={card.id}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: card.scale }}
//                     transition={{ duration: 0.9, delay: 0.1 * idx }}
//                     style={{
//                       transform: `rotateY(${card.rotateY}deg) translateZ(${card.z}px)`,
//                     }}
//                     className="shrink-0 w-64 md:w-80 h-28 md:h-32 bg-[#121214] rounded-xl border border-white/10 shadow-2xl p-2 flex items-center justify-between gap-1.5 overflow-hidden"
//                   >
//                     <div
//                       className="flex-1 h-full rounded-lg bg-cover bg-center overflow-hidden border border-white/5 opacity-80"
//                       style={{
//                         backgroundImage: `url('/our-work_hero/Cheshire.webp')`,
//                       }}
//                     />
//                     <div
//                       className="flex-1 h-full rounded-lg bg-cover bg-center overflow-hidden border border-white/5 opacity-80"
//                       style={{
//                         backgroundImage: `url('/our-work_hero/Beirut.webp')`,
//                       }}
//                     />
//                     <div
//                       className="flex-1 h-full rounded-lg bg-cover bg-center overflow-hidden border border-white/5 opacity-80"
//                       style={{
//                         backgroundImage: `url('/our-work_hero/Senses.webp')`,
//                       }}
//                     />
//                   </motion.div>
//                 );
//               }
//               // This card's fixed position in the conveyor loop (left-outer
//               // → ... → right-outer), independent of which project is
//               // currently shown there.
//               const slotIndex = idx > 4 ? idx - 1 : idx;
//               const displayed = realSlots[(slotIndex - offset + realSlots.length) % realSlots.length];
//               const label = displayed.image.split("/").pop()?.replace(/\.(png|jpe?g)$/i, "") ?? "";
//               return (
//                 <motion.div
//                   key={card.id}
//                   initial={{
//                     opacity: 0,
//                     scale: 0.7,
//                     rotateY: card.rotateY,
//                     z: card.z,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scale: card.scale,
//                     rotateY: card.rotateY,
//                     z: card.z,
//                     zIndex: 9 - Math.abs(idx - 4),
//                   }}
//                   whileHover={{
//                     scale: card.scale * 1.08,
//                     z: card.z + 40,
//                     zIndex: 50,
//                   }}
//                   transition={{ duration: 0.9, delay: 0.05 * idx }}
//                   className="relative shrink-0 w-24 sm:w-28 md:w-36 h-48 sm:h-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-black/5"
//                 >
//                   <AnimatePresence mode="wait">
//                     <motion.a
//                       key={displayed.id}
//                       href={displayed.url || undefined}
//                       target={displayed.url ? "_blank" : undefined}
//                       rel={displayed.url ? "noopener noreferrer" : undefined}
//                       aria-label={
//                         displayed.url
//                           ? `Visit the ${label} website (opens in a new tab)`
//                           : label
//                       }
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.6 }}
//                       style={{ cursor: displayed.url ? "pointer" : "default" }}
//                       className="absolute inset-0 block"
//                     >
//                       <img
//                         src={displayed.image}
//                         alt={label}
//                         className="w-full h-full object-cover"
//                       />
//                     </motion.a>
//                   </AnimatePresence>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Moving conveyor (no static center, true sliding x/scale/rotation
//             motion) - parked here, not deleted, in case we want visible
//             sliding motion back instead of the fixed-position crossfade.
//         <div className="relative w-full overflow-visible py-4" style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}>
//           <div className="relative mx-auto h-48 sm:h-56 md:h-72 max-w-4xl">
//             {realSlots.map((card, originalIndex) => {
//               const slot = (originalIndex + offset) % realSlots.length;
//               const t = SLOT_POSITIONS[slot];
//               const label = card.image.split("/").pop()?.replace(/\.(png|jpe?g)$/i, "") ?? "";
//               return (
//                 <motion.a key={card.id} href={card.url || undefined} target={card.url ? "_blank" : undefined} rel={card.url ? "noopener noreferrer" : undefined} aria-label={card.url ? `Visit the ${label} website (opens in a new tab)` : label} animate={{ x: t.x, scale: t.scale, rotateY: t.rotateY, zIndex: t.zIndex }} whileHover={{ scale: t.scale * 1.08, zIndex: 50 }} transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }} style={{ cursor: card.url ? "pointer" : "default" }} className="absolute left-1/2 top-1/2 block w-24 h-48 sm:w-28 sm:h-56 md:w-36 md:h-72 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-black/5">
//                   <img src={card.image} alt={label} className="w-full h-full object-cover" />
//                 </motion.a>
//               );
//             })}
//           </div>
//         </div>
//         */}

//         {/* 4. Rotating 3-card carousel: a card enters on the left, slides to
//             the middle, then exits on the right - holds each arrangement for
//             5s before advancing. Only the 8 real project cards cycle through;
//             the special canvas card doesn't fit a uniform 3-slot layout. */}
//         {/* <ProjectCarousel /> */}

//         {/* CTA */}
//         <motion.a
//           href="/packages"
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
//           className="mt-12 inline-flex min-h-14 items-center justify-center rounded-xl bg-[#f46036] px-10 py-4 font-serif text-lg font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
//         >
//           View packages
//         </motion.a>
//       </main>
//     </div>
//   );
// }

// const realCards = ribbonCards.filter((c) => !c.isCenterCanvas);

// const CAROUSEL_SLOTS = [
//   { x: -260, scale: 0.78, rotateY: 24, zIndex: 1, opacity: 0.7 },
//   { x: 0, scale: 1.15, rotateY: 0, zIndex: 3, opacity: 1 },
//   { x: 260, scale: 0.78, rotateY: -24, zIndex: 1, opacity: 0.7 },
// ] as const;

// function ProjectCarousel() {
//   const [startIndex, setStartIndex] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setStartIndex((i) => (i + 1) % realCards.length);
//     }, 5000);
//     return () => clearInterval(id);
//   }, []);

//   const visible = CAROUSEL_SLOTS.map((slot, slotIndex) => ({
//     card: realCards[(startIndex + slotIndex) % realCards.length],
//     slot,
//   }));

//   return (
//     <div
//       className="relative flex h-56 w-full items-center justify-center sm:h-72 md:h-80"
//       style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
//     >
//       <AnimatePresence initial={false}>
//         {visible.map(({ card, slot }) => {
//           const label = card.image.split("/").pop()?.replace(/\.(png|jpe?g)$/i, "") ?? "";
//           return (
//             <motion.a
//               key={card.id}
//               href={card.url || undefined}
//               target={card.url ? "_blank" : undefined}
//               rel={card.url ? "noopener noreferrer" : undefined}
//               aria-label={card.url ? `Visit the ${label} website (opens in a new tab)` : label}
//               initial={{ x: -520, opacity: 0, scale: 0.6 }}
//               animate={{ x: slot.x, opacity: slot.opacity, scale: slot.scale, rotateY: slot.rotateY, zIndex: slot.zIndex }}
//               exit={{ x: 520, opacity: 0, scale: 0.6, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
//               whileHover={{ scale: slot.scale * 1.1, zIndex: 50 }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//               style={{ cursor: card.url ? "pointer" : "default" }}
//               className="absolute block w-28 h-52 sm:w-36 sm:h-64 md:w-44 md:h-72 rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-black/5"
//             >
//               <img src={card.image} alt={label} className="w-full h-full object-cover" />
//             </motion.a>
//           );
//         })}
//       </AnimatePresence>
//     </div>
//   );
// }
