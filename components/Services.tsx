"use client";
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Räätälöity koodaus',
    desc: 'Senioritason TypeScript ja full‑stack‑kehitys. Frontend, backend ja integraatiot.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M8.47 4.97a.75.75 0 0 1 0 1.06L4.56 9.94l3.91 3.91a.75.75 0 1 1-1.06 1.06L2.97 10.47a1.5 1.5 0 0 1 0-2.12l4.44-4.44a.75.75 0 0 1 1.06 0Zm7.06 0a.75.75 0 0 1 1.06 0l4.44 4.44a1.5 1.5 0 0 1 0 2.12l-4.44 4.44a.75.75 0 0 1-1.06-1.06l3.91-3.91-3.91-3.91a.75.75 0 0 1 0-1.06Z" />
      </svg>
    ),
  },
  {
    title: 'Odoo',
    desc: 'Odoo‑konsultointi ja integraatiot — ERP saumattomasti osaksi verkkopalveluitasi.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <circle cx="8.5" cy="12" r="3.5" />
        <circle cx="15.5" cy="12" r="3.5" />
      </svg>
    ),
  },
  {
    title: 'Verkkokehitys (WordPress)',
    desc: 'Nopeat ja turvalliset sivustot Next.js:llä tai WordPressillä — teemat, suorituskyky ja SEO.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M3.75 6A2.25 2.25 0 0 1 6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6Zm1.5 1.5h13.5v3.75H5.25V7.5Z" />
      </svg>
    ),
  },
];

export default function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 140, damping: 18 },
    },
  };

  return (
    <section id="services" className="py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Palvelut</h2>
        <p className="mt-3 text-slate-600">Ratkaisut yrityksesi tarpeisiin</p>
      </div>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((s) => (
          <motion.div
            key={s.title}
            variants={card}
            whileHover={{ y: -3, rotateX: 0.5, rotateY: -0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm will-change-transform transition-shadow hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white">
              {s.icon}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
