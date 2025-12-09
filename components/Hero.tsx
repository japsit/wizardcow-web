"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ShapeDivider from './ShapeDivider';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
      transition: { type: 'spring', stiffness: 140, damping: 18 }
    },
  };

  return (
    <section id="hero" className="relative overflow-hidden py-24 sm:py-32">
      {/* Image background with optimized Next/Image for better LCP */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/waterfall.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={60}
          className="object-cover"
        />
        {/* Dark scrim to ensure text readability over the image */}
        <div className="absolute inset-0 bg-black/35 sm:bg-black/30" />
      </div>

      {/* Centered content */}
      {isMobile ? (
        <div className="relative mx-auto max-w-4xl px-4 text-center drop-shadow-lg sm:px-6 lg:px-8">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Nopea ja moderni web‑kehitys yrityksellesi
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/85">
            Rakennamme turvallisia ja suorituskykyisiä verkkosivustoja sekä räätälöityjä digiratkaisuja.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#services"
              className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand/90"
            >
              Katso palvelut
            </a>
          </div>
        </div>
      ) : (
        <motion.div
          className="relative mx-auto max-w-4xl px-4 text-center drop-shadow-lg sm:px-6 lg:px-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={item} className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Nopea ja moderni web‑kehitys yrityksellesi
          </motion.h1>
          <motion.p variants={item} className="mt-6 text-lg leading-8 text-white/85">
            Rakennamme turvallisia ja suorituskykyisiä verkkosivustoja sekä räätälöityjä digiratkaisuja.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#services"
              className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand/90"
            >
              Katso palvelut
            </a>
          </motion.div>
        </motion.div>
      )}

      {/* Ei-suora alareuna: tyylikäs aaltomuoto */}
      <ShapeDivider variant="wave" color="#f8fafc" animated className="bottom-0" />
    </section>
  );
}
