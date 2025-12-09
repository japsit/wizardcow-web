"use client";
import Link from 'next/link';
import { useState } from 'react';

const nav = [{ href: '#services', label: 'Palvelut' }];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-brand">
          <img src="/logo.svg" alt="Wizard Cow logo" className="h-8 w-auto sm:h-9" />
          <span>Wizard Cow Oy</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-slate-700 hover:text-brand">
              {n.label}
            </a>
          ))}
        </nav>
        <button
          aria-label="Valikon avaaminen"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M3.75 6.75h16.5v1.5H3.75zm0 4.5h16.5v1.5H3.75zm0 4.5h16.5v1.5H3.75z" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200/60 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-base font-medium text-slate-700 hover:text-brand" onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
