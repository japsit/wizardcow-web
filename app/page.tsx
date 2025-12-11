import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Team from '../components/Team';
import Footer from '../components/Footer';
import MultiStepForm from "../components/MultiStepForm";
import AboutUsSection from "../components/AboutUsSection";
import RotatingTextHero from "../components/RotatingTextHero";
import ContactForm from "../components/ContactForm";



export default function Page() {
  return (
      <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
          <Header />

          {/* FULL-WIDTH HERO */}
          <Hero />

          {/* BOXED SECTION */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Services />
              {/*<MultiStepForm />*/}
          </div>

          {/* FULL-WIDTH SECTIONS — each component handles its own background */}
          <AboutUsSection />
          <div className="-mt-20 bg-[#6e0081]/100">
          <Team/>
          </div>
          {/* Contact section anchor target for "Pyydä tarjous" buttons */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </div>

          <Footer />
      </div>
  );
}
