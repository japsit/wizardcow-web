export default function Pricing() {
  const plans = [
    {
      name: 'Hourly Development',
      price: '€ —/hour',
      features: ['Senior engineer', 'Flexible scope', 'Time & materials'],
      cta: { label: 'Get Started', href: '#contact' },
      highlight: false,
    },
    {
      name: 'Project-Based Pricing',
      price: 'Custom',
      features: ['Fixed scope', 'Milestone based', 'Clear timelines'],
      cta: { label: 'Request Quote', href: '#contact' },
      highlight: true,
    },
    {
      name: 'Monthly Maintenance',
      price: '€ —/mo',
      features: ['Updates & patches', 'Monitoring & backups', 'Small tasks & fixes'],
      cta: { label: 'Contact Sales', href: '#contact' },
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Pricing</h2>
        <p className="mt-3 text-slate-600">Simple options for different needs</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
              p.highlight ? 'border-slate-300 ring-1 ring-slate-200' : 'border-slate-200'
            }`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
              {p.highlight && (
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">Most Popular</span>
              )}
            </div>
            <div className="mt-4 text-3xl font-bold text-slate-900">{p.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400" /> {f}
                </li>
              ))}
            </ul>
            <a
              href={p.cta.href}
              className={`mt-6 inline-block w-full rounded-xl px-4 py-2 text-center text-sm font-semibold shadow-sm ${
                p.highlight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              {p.cta.label}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
