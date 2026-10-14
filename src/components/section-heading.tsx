"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      <motion.p
        variants={item}
        className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
      >
        ( {eyebrow} )
      </motion.p>
      <motion.h2
        variants={item}
        className="mt-3 font-serif text-3xl font-semibold sm:text-4xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={item} className="mt-3 max-w-xl text-muted-foreground">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
