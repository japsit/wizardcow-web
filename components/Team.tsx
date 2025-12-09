type Member = {
  name: string;
  title: string;
  blurb: string;
};

const members: Member[] = [
  {
    name: 'Jukka Hyttinen',
    title: 'Odoo & integraatiot',
    blurb: 'Odoo‑konsultointi ja integraatiot – sujuvat prosessit ja mitattavat hyödyt.',
  },
  {
    name: 'Juha Sarkkinen',
    title: 'Full‑stack‑kehitys',
    blurb: 'Nopeat ja modernit toteutukset Next.js:llä ja WordPressillä – suorituskyky ja laatu.',
  },
  {
    name: 'Asiakaspalvelu',
    title: 'Yhteydenotto',
    blurb: 'Autamme nopeasti – kysy tarjous tai jätä viesti, palaamme pian.',
  },
];

function InitialAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');
  return (
    <div className="relative h-14 w-14 select-none overflow-hidden rounded-full shadow-sm ring-1 ring-slate-200">
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-fuchsia-500/80 to-violet-600/80" />
      <div className="relative flex h-full w-full items-center justify-center text-base font-semibold text-white">
        {initials}
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Tiimimme</h2>
        <p className="mt-3 text-slate-600">Kokeneet tekijät koodauksesta Odoo‑integraatioihin</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {members.map((m) => (
          <div key={m.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <InitialAvatar name={m.name} />
              <div>
                <h3 className="text-base font-semibold text-slate-900">{m.name}</h3>
                <p className="text-sm text-slate-600">{m.title}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">{m.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
