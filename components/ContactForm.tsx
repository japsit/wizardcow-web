"use client";
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      const json = await res.json();
      if (json?.success) {
        setStatus('success');
        setMessage('Thanks! We will get back to you soon.');
        form.reset();
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Contact Us</h2>
        <p className="mt-3 text-slate-600">Tell us about your project and we’ll reach out.</p>
      </div>
      <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-slate-200 placeholder:text-slate-400 focus:border-slate-400 focus:ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Email</label>
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
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">Message</label>
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
            {status === 'loading' ? 'Sending…' : 'Send Request'}
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
