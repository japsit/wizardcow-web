import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Team from '../components/Team';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden`}>
      <Header />
      {/* Full-bleed hero outside the constrained container */}
      <Hero />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Services />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
