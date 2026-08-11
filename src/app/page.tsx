import dynamic from "next/dynamic";
import Navbar from "@/src/components/Navbar/Navbar";
import Hero from "@/src/components/Hero/Hero";
import About from "@/src/components/About/About";
import Services from "@/src/components/Services/Services";
import Footer from "@/src/components/Footer/Footer";

// Lazy-load non-critical interactive & below-the-fold components to keep initial bundle size lean
const Projects = dynamic(() => import("@/src/components/Projects/Projects"));
const WhyChooseUs = dynamic(() => import("@/src/components/WhyChooseUs/WhyChooseUs"));
const Contact = dynamic(() => import("@/src/components/Contact/Contact"));
const LeadPopup = dynamic(() => import("@/src/components/LeadPopup/LeadPopup"));
const BackToTop = dynamic(() => import("@/src/components/BackToTop/BackToTop"));

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero id="home" />
      <About id="about" />
      <Services id="services" />
      <Projects id="projects" />
      <WhyChooseUs id="why-us" />
      <Contact id="contact" />
      <Footer />
      <LeadPopup />
      <BackToTop />
    </>
  );
}
