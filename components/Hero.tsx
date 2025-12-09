"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ShapeDivider from './ShapeDivider';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
    const tags = [
        'Yrityksen verkkosivut',
        'Moderni web-suunnittelu',
        'Verkkokaupat ja WooCommerce',
        'WordPress-kehitys',
        'Nopeat Next.js-sivustot',
        'Hakukoneoptimointi (SEO)',
        'Sivustojen ylläpito ja hosting',
        'Tietoturva-auditoinnit',
        'Räätälöidyt integraatiot',
        'Odoo-kehitys',
        'Automaatio ja API-ratkaisut',
        'Räätälöidyt lomakkeet',
        'Web-konsultointi',
        'Digitaalisten palveluiden suunnittelu',
        'Mobiiliapplikaatiot'
    ];


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
          src="/bg3.webp"
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
                Modernia ohjelmistokehitystä yrityksesi tarpeisiin
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/85">
                Toteutamme räätälöityjä ratkaisuja, integraatioita ja automaatioita, jotka
                tehostavat liiketoimintaasi ja tukevat kasvua. Laadukasta koodia – turvallisesti ja suorituskykyisesti.
            </p>

          <ul aria-label="Avainsanat" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm backdrop-blur"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <motion.div
          className="relative mx-auto max-w-4xl px-4 text-center drop-shadow-lg sm:px-6 lg:px-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={item} className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Modernia ohjelmistokehitystä yrityksesi tarpeisiin
          </motion.h1>
          <motion.p variants={item} className="mt-6 text-lg leading-8 text-white/85">
              Toteutamme räätälöityjä ratkaisuja, integraatioita ja automaatioita, jotka
              tehostavat liiketoimintaasi ja tukevat kasvua. Laadukasta koodia – turvallisesti ja suorituskykyisesti.
          </motion.p>
          <motion.ul variants={item} aria-label="Avainsanat" className="mt-10 flex flex-wrap items-center justify-center gap-2">
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
      )}

      {/* Staattinen aaltojakaja ilman efektejä */}
      <ShapeDivider variant="wave" color="#f8fafc" animated={false} className="bottom-0" />
    </section>
  );
}
