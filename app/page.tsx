import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Team from '../components/Team';
import Footer from '../components/Footer';
import MultiStepForm from "../components/MultiStepForm";
import AboutUsSection from "../components/AboutUsSection";
import RotatingTextHero from "../components/RotatingTextHero";



export default function Page() {
  return (
      <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
          <Header />

          {/* FULL-WIDTH HERO */}
          <Hero />

          {/* BOXED SECTION */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Services />
          </div>

          {/* FULL-WIDTH SECTIONS — each component handles its own background */}
          <AboutUsSection />
          <MultiStepForm />
          <Team />

          <Footer />
      </div>
  );
}
