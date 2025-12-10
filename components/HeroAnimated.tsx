"use client";
import { motion } from 'framer-motion';

export default function HeroAnimated({ tags }: { tags: string[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 140, damping: 18 },
    },
  };

  return (
    <motion.div
      className="relative mx-auto max-w-4xl px-4 text-center drop-shadow-lg sm:px-6 lg:px-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={item}
        className="will-change-transform text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl"
      >
        Modernia ohjelmistokehitystä yrityksesi tarpeisiin
      </motion.h1>
      <motion.p
        variants={item}
        className="will-change-transform mt-6 text-lg leading-8 text-white/85"
      >
        Toteutamme räätälöityjä ratkaisuja, integraatioita ja automaatioita, jotka tehostavat
        liiketoimintaasi ja tukevat kasvua. Laadukasta koodia – turvallisesti ja suorituskykyisesti.
      </motion.p>
      <motion.ul
        variants={item}
        aria-label="Avainsanat"
        className="will-change-transform mt-10 flex flex-wrap items-center justify-center gap-2"
      >
        {tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm backdrop-blur"
          >
            {t}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
