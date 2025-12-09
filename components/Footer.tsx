export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-slate-800 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <img src="/logo.svg" alt="Wizard Cow" className="h-12 w-auto sm:h-14" />
          <p className="mt-6 max-w-3xl text-balance text-lg font-medium">
            Wizard Cow on iloinen ja innovaatinen yhteistyökumppani
          </p>
          <nav aria-label="Alatunniste" className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a href="#services" className="text-white/80 hover:text-white">Palvelut</a>
            <a href="#" className="text-white/80 hover:text-white">Tietosuoja</a>
            <a href="#" className="text-white/80 hover:text-white">Ehdot</a>
          </nav>
          <p className="mt-6 text-xs text-white/60">© {year} Wizard Cow Oy</p>
        </div>
      </div>
    </footer>
  );
}
