"use client";
declare const grecaptcha: any;

import { useEffect, useState } from 'react';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  // Lataa reCAPTCHA v3 skripti
  useEffect(() => {
    const existing = document.querySelector(`script[src^="https://www.google.com/recaptcha/api.js"]`);
    if (!existing) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const userMessage = String(formData.get('message') || '');

    try {
      // Varmista, että grecaptcha on valmis ja suorita
      if (typeof grecaptcha === 'undefined' || !grecaptcha.execute) {
        throw new Error('reCAPTCHA ei ole ladannut');
      }

      const token: string = await new Promise<string>((resolve, reject) => {
        try {
          grecaptcha.ready(async () => {
            try {
              const t = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
              resolve(t);
            } catch (e) {
              reject(e);
            }
          });
        } catch (e) {
          reject(e);
        }
      });

      // Muotoile pyyntö samaksi kuin muu lomake käyttää
      const payload = {
        service: '',
        websiteFeatures: [],
        securityNeeds: [],
        serverNeeds: [],
        projectDescription: userMessage,
        budget: '',
        timeline: '',
        contact: { name, email, phone: '' },
        recaptchaToken: token,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.error || 'request-failed');
      }

      const json = await res.json();
      if (json?.ok) {
        setStatus('success');
        setMessage('Kiitos! Otamme sinuun pian yhteyttä.');
        form.reset();
      } else {
        throw new Error('unexpected-response');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Jokin meni pieleen. Yritä uudelleen.');
    }
  }

  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Yhteydenotto</h2>
        <p className="mt-3 text-slate-600">Kerro lyhyesti projektistasi – palaamme pian asiaan.</p>
      </div>
      <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">Nimi</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-slate-200 placeholder:text-slate-400 focus:border-slate-400 focus:ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Sähköposti</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-slate-200 placeholder:text-slate-400 focus:border-slate-400 focus:ring"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">Viesti</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-slate-200 placeholder:text-slate-400 focus:border-slate-400 focus:ring"
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-70"
          >
            {status === 'loading' ? 'Lähetetään…' : 'Lähetä viesti'}
          </button>
          {status !== 'idle' && (
            <p className={`text-sm ${status === 'success' ? 'text-emerald-600' : status === 'error' ? 'text-red-600' : 'text-slate-600'}`}>
              {message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
