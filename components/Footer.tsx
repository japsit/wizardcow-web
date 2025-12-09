export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="-mt-px border-t border-slate-800 bg-black text-white">
      <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-center gap-8 text-sm sm:gap-10 md:grid-cols-12">
          {/* Col 1: Logo only */}
          <div className="flex items-center justify-center md:col-span-3 md:justify-start">
            <img
              src="/logo.svg"
              alt="Wizard Cow"
              className="w-full max-w-full h-auto max-h-28 sm:max-h-32 md:max-h-36 lg:max-h-40 object-contain"
            />
          </div>

          {/* Col 2: Tagline (left aligned on md+) */}
          <div className="text-center md:col-span-9 md:text-left">
            <p className="mx-auto md:mx-0 max-w-[90vw] md:max-w-none text-xl font-semibold text-white sm:text-2xl md:text-3xl">
              Wizad Cow Oy on iloinen ja innovatiivinen yhteistyökumppani!
            </p>
            <p className="mt-4 text-sm text-white/70 md:text-left">© {year} Wizard Cow Oy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
