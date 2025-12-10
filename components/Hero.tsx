"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ShapeDivider from './ShapeDivider';
import dynamic from 'next/dynamic';

const HeroAnimated = dynamic(() => import('./HeroAnimated'), { ssr: false });

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedData, setPrefersReducedData] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [heroInView, setHeroInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
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
    let resizeTimeout: number | undefined;
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    const onResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(check, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Respect Data Saver
    const dataQuery = window.matchMedia('(prefers-reduced-data: reduce)');
    const updateDataPref = () => setPrefersReducedData(!!dataQuery.matches);
    updateDataPref();
    dataQuery.addEventListener?.('change', updateDataPref);

    // Respect Reduced Motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPref = () => setPrefersReducedMotion(!!motionQuery.matches);
    updateMotionPref();
    motionQuery.addEventListener?.('change', updateMotionPref);

    // Lazy-render video when hero enters viewport
    const el = sectionRef.current;
    if (el) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              setHeroInView(true);
              io.disconnect();
              break;
            }
          }
        },
        { root: null, rootMargin: '0px 0px 200px 0px', threshold: 0.01 }
      );
      io.observe(el);
      return () => {
        window.removeEventListener('resize', onResize);
        dataQuery.removeEventListener?.('change', updateDataPref);
        motionQuery.removeEventListener?.('change', updateMotionPref);
        io.disconnect();
      };
    }

    return () => {
      window.removeEventListener('resize', onResize);
      dataQuery.removeEventListener?.('change', updateDataPref);
      motionQuery.removeEventListener?.('change', updateMotionPref);
    };
  }, []);

  const useImageBackground = isMobile || prefersReducedData;
  const animationsEnabled = !prefersReducedMotion && !isMobile;

  return (
    <section ref={sectionRef} id="hero" className="relative overflow-hidden py-24 sm:py-32">
      {/* Video taustana */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {useImageBackground ? (
          <Image
            src="/bg2.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
            role="presentation"
            aria-hidden
          />
        ) : (
          heroInView && (
            <video
              className="h-full w-full object-cover"
              src="https://www.wizardcow.fi/wp-content/uploads/2021/01/data.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/bg2.webp"
              aria-hidden
              role="presentation"
            />
          )
        )}
        {/* Tumma kerros tekstin luettavuuden varmistamiseksi */}
        <div className="absolute inset-0 bg-black/50 sm:bg-black/30" />
      </div>

      {/* Centered content */}
      {isMobile || !animationsEnabled ? (
        <div className="relative mx-auto max-w-4xl px-4 text-center drop-shadow-lg sm:px-6 lg:px-8">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Modernia ohjelmistokehitystä yrityksesi tarpeisiin
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/85">
                Toteutamme räätälöityjä ratkaisuja, integraatioita ja automaatioita, jotka
                tehostavat liiketoimintaasi ja tukevat kasvua. Laadukasta koodia – turvallisesti ja suorituskykyisesti.
            </p>

            <div className="mt-8">
                <a
                    href="#contact"
                    className="inline-block rounded-full bg-[#ccff00] px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:scale-105 hover:bg-[#dfff33]"
                >
                    Pyydä tarjous
                </a>
            </div>


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
        <HeroAnimated tags={tags} />
      )}

      {/* Staattinen aaltojakaja ilman efektejä */}
      <ShapeDivider variant="wave" color="#f8fafc" animated={false} className="bottom-0" />
    </section>
  );
}
