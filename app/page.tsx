import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
  return (
    <div className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>
      <Header />
      {/* Full-bleed hero outside the constrained container */}
      <Hero />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
