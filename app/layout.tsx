import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import ClientProviders from '../components/ClientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wizard Cow Oy — Nopea ja moderni web‑kehitys',
  description: 'Rakennamme turvallisia ja suorituskykyisiä verkkosivustoja sekä räätälöityjä digiratkaisuja.',
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
