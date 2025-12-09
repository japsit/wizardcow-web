export default function WhyUs() {
  const items = [
    { emoji: '⚡', title: 'Fast delivery', desc: 'Efficient processes to ship your project quickly.' },
    { emoji: '🔒', title: 'Secure modern stack', desc: 'Best practices and tooling to keep your data safe.' },
    { emoji: '🧩', title: 'Flexible solutions', desc: 'Tailored to your business with room to grow.' },
  ];
  return (
    <section id="why-us" className="py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Why Choose Us</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-3xl">{i.emoji}</div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{i.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
