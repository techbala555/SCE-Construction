import Navbar from "@/src/components/Navbar/Navbar";
import Hero from "@/src/components/Hero/Hero";
import About from "@/src/components/About/About";
import Services from "@/src/components/Services/Services";
import Projects from "@/src/components/Projects/Projects";
import WhyChooseUs from "@/src/components/WhyChooseUs/WhyChooseUs";
import Contact from "@/src/components/Contact/Contact";
import Footer from "@/src/components/Footer/Footer";
import LeadPopup from "@/src/components/LeadPopup/LeadPopup";
import BackToTop from "@/src/components/BackToTop/BackToTop";

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
