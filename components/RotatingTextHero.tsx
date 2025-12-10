"use client";
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  items: string[];
  intervalMs?: number; // default ~2.5s
  variant?: 'standalone' | 'inline';
};

export default function RotatingTextHero({ items, intervalMs = 2500, variant = 'standalone' }: Props) {
  const safeItems = useMemo(() => (items && items.length > 0 ? items : ["ratkaisut"]), [items]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeItems.length);
    }, Math.max(1500, intervalMs));
    return () => window.clearInterval(id);
  }, [safeItems.length, intervalMs]);

  const Wrapper: React.ElementType = variant === 'inline' ? 'div' : 'section';
  const wrapperClass =
    variant === 'inline'
      ? 'text-left text-white'
      : 'my-16 rounded-2xl bg-[#6e0081] px-6 py-16 text-center text-white shadow-sm';

  return (
    <Wrapper className={wrapperClass}>
      <h2 className={variant === 'inline' ? 'text-2xl sm:text-3xl font-bold leading-tight' : 'mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl'}>
        <span className="whitespace-pre">Wizard Cow </span>
        <span className="inline min-w-[8ch] align-baseline">
          <AnimatePresence mode="wait">
<motion.span
    key={safeItems[index]}
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.1, ease: "easeOut" }}
    className="text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.35)]"
>
  {safeItems[index]}
</motion.span>

          </AnimatePresence>
        </span>{' '}
        <span>päivittäin.</span>
      </h2>
    </Wrapper>
  );
}
