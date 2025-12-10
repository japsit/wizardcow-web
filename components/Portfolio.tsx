import Image from 'next/image';

const projects = [
  {
    title: 'E‑commerce Revamp',
    desc: 'High‑performance storefront with headless CMS.',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
    href: '#',
  },
  {
    title: 'SaaS Dashboard',
    desc: 'Realtime analytics and admin tools in TypeScript.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop',
    href: '#',
  },
  {
    title: 'Odoo Integration',
    desc: 'Custom connectors syncing orders and inventory.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    href: '#',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Portfolio</h2>
        <p className="mt-3 text-slate-600">Recent projects and case studies</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/9] w-full bg-slate-100">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
              <a href={p.href} className="mt-4 inline-block text-sm font-semibold text-slate-900">
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
