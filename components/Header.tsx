"use client";

import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Käytetään glass-taustaa scrollissa TAI kun mobiilivalikko on auki
  const useGlass = scrolled || open;

  return (
      <header
          className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${useGlass
              ? "bg-white/90 backdrop-blur-xl border-b border-white/30 shadow-sm text-slate-900"
              : "bg-transparent text-white"
          }
      `}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="text-4xl font-semibold tracking-tight">
            <span className="font-medium">Wizard </span>
            <span className="text-[#ff0000] font-light">Cow </span>
            <span className="font-medium">Oy</span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#services" className="hover:opacity-70 transition">Palvelut</a>
            <a href="#team" className="hover:opacity-70 transition">Tiimi</a>
            <a href="#contact" className="hover:opacity-70 transition">Yhteys</a>
          </nav>

          {/* Mobile menu button */}
          <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Sulje valikko" : "Avaa valikko"}
              aria-expanded={open}
              aria-controls="mobile-nav"
          >
            {open ? (
                <XMarkIcon className="w-6 h-6" />
            ) : (
                <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {open && (
            <div id="mobile-nav" className="md:hidden px-6 pb-4 space-y-3 text-sm font-medium">
              <a href="#services" onClick={() => setOpen(false)} className="block py-2">Palvelut</a>
              <a href="#team" onClick={() => setOpen(false)} className="block py-2">Tiimi</a>
              <a href="#contact" onClick={() => setOpen(false)} className="block py-2">Yhteys</a>
            </div>
        )}
      </header>
  );
}
