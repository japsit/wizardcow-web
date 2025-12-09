"use client";
import { useState } from 'react';
import ShapeDivider from './ShapeDivider';

type Member = {
  name: string;
  title: string;
  blurb: string;
  image?: string; // path under /public, e.g., "/jukka.svg"
  email?: string;
  about?: string;
  tags?: string[];
};

const members: Member[] = [
  {
    name: 'Jukka Hyttinen',
    title: 'WordPress, koulutukset & projektinhallinta',
    blurb: 'WordPress‑sivustot ja sisällönhallinta, käytännön koulutukset sekä ketterä projektinhallinta tuloksiin.',
    image: '/jukka.jpeg',
    email: 'mailto:info@wizardcow.fi',
    about:
      'Autan yrityksiä rakentamaan selkeitä ja nopeasti päivitettäviä WordPress‑sivustoja. ' +
      'Vahvuuteni on käytännönläheinen koulutus ja projektinhallinta: pidän kokonaisuuden kasassa ja varmistun, että liiketoimintatavoitteet toteutuvat.',
    tags: ['WordPress', 'Projektinhallinta', 'Koulutukset', 'SEO', 'Saavutettavuus', 'Raspberry Pi', 'Arduino', 'InDesign', 'CAD-suunnittelu', 'Catia'],
  },
  {
    name: 'Juha Sarkkinen',
    title: 'Ohjelmistokehitys, Odoo & integraatiot',
    blurb: 'Tehokas ohjelmistokehitys ja Odoo‑ratkaisut – integraatiot, rajapinnat ja suorituskykyiset web‑palvelut.',
    image: '/juha.jpeg',
    email: 'mailto:info@wizardcow.fi',
    about:
      'Suunnittelen ja toteutan suorituskykyisiä web‑ratkaisuja modernilla stackilla (Next.js, TypeScript). ' +
      'Odoon integraatiot, rajapinnat ja datavirrat ovat erikoisaluettani – tavoite on sujuva automaatio ja mitattava hyöty. ' +
      'Minulla on GIAC Systems and Network Auditor (GSNA) ‑sertifikaatti.',
    tags: ['Python', 'PHP', 'JavaScript', 'React', 'Next.js', 'C++', 'Splunk', 'Pilvipalvelut (AWS/Vercel)', 'Tietoturva', 'Pentesting'],
  },
  {
    name: 'Asiakaspalvelu',
    title: 'Yhteydenotto',
    blurb: 'Autamme nopeasti - kysy tarjous tai jätä viesti, palaamme pian ilman muu-uu-uu-ta!',
    image: '/cow.png',
    email: 'mailto:info@wizardcow.fi',
    about:
      'Ota rohkeasti yhteyttä – vastaamme ripeästi ja ohjaamme tarpeesi oikealle asiantuntijalle. ' +
      'Voit pyytää tarjouksen tai kysyä neuvoa pienestäkin asiasta.',
    tags: ['Tuki', 'Aikataulutus', 'Triage', 'Laskutus'],
  },
];

function InitialAvatar({ name, large = false }: { name: string; large?: boolean }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');
  return (
    <div
      className={`relative select-none overflow-hidden rounded-full shadow-sm ring-1 ring-slate-200 ${
        large ? 'h-28 w-28' : 'h-14 w-14'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-fuchsia-500/80 to-violet-600/80" />
      <div className="relative flex h-full w-full items-center justify-center text-base font-semibold text-white">
        {initials}
      </div>
    </div>
  );
}

function TeamImage({ src, alt, initials }: { src?: string; alt: string; initials: string }) {
  const [error, setError] = useState(false);
  if (!src || error) {
    return <InitialAvatar name={initials} large />;
  }
  return (
    <div className="relative h-36 w-36 select-none overflow-hidden rounded-full bg-white shadow-md">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        onError={() => setError(true)}
      />
    </div>
  );
}

function TeamCard({ m }: { m: Member }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="group relative flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
    >
      {/* Corner ribbon (thicker, larger, stays within card) */}
      <div aria-hidden className="pointer-events-none absolute -right-3 top-4 rotate-45 z-10">
        <span className="block rounded-[3px] bg-brand px-9 py-2 text-[12px] sm:text-[13px] font-bold uppercase tracking-widest text-white shadow-lg ring-1 ring-white/15">
          Team
        </span>
      </div>
      <TeamImage src={m.image} alt={`${m.name} – ${m.title}`} initials={m.name} />
      <h3 className="mt-6 text-lg font-semibold text-slate-900">{m.name}</h3>
      <p className="text-sm text-slate-600">{m.title}</p>
      <p className="mt-3 text-sm text-slate-600">{m.blurb}</p>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        aria-expanded={expanded}
        aria-controls={`team-extra-${m.name}`}
      >
        {expanded ? 'Piilota' : 'Lue lisää'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Hidden section: tags (and could add more later) */}
      {expanded && m.tags && m.tags.length > 0 && (
        <ul
          id={`team-extra-${m.name}`}
          aria-label="Tekniikat"
          className="mt-5 flex flex-wrap justify-center gap-2"
        >
          {m.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-slate-300 bg-white/60 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative overflow-hidden bg-violet-100 pt-16 pb-12">
      {/* Top wave divider blending from previous section (slate-50) to this yellow section */}
      <ShapeDivider variant="wave" color="#f8fafc" flip animated={false} className="top-0" />
      {/* Constrained content container matching the rest of the site */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          {/*<h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl pt-16">Tiimimme</h2>*/}
          {/*<p className="mt-3 text-slate-600">Kokeneet tekijät koodauksesta Odoo‑integraatioihin</p>*/}
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {members.map((m) => (
            <TeamCard key={m.name} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
