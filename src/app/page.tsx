import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/src/components/Navbar/Navbar";
import Hero from "@/src/components/Hero/Hero";
import About from "@/src/components/About/About";
import Services from "@/src/components/Services/Services";
import Footer from "@/src/components/Footer/Footer";

export const metadata: Metadata = {
  title: "SCE Developers | Civil Engineering & Construction Company in Coimbatore",
  description:
    "SCE Developers is a civil engineering and construction company in Coimbatore specializing in house construction, land development, and 3D elevation design.",
  alternates: {
    canonical: "https://www.scedevelopers.in/",
  },
  openGraph: {
    title: "SCE Developers | Civil Engineering & Construction Company in Coimbatore",
    description:
      "SCE Developers is a civil engineering and construction company in Coimbatore specializing in house construction, land development, and 3D elevation design.",
    url: "https://www.scedevelopers.in/",
    siteName: "SCE Developers",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "SCE Developers - Civil Engineering & Construction Company in Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SCE Developers | Civil Engineering & Construction Company in Coimbatore",
    description:
      "SCE Developers is a civil engineering and construction company in Coimbatore specializing in house construction, land development, and 3D elevation design.",
    images: ["/images/hero-bg.webp"],
  },
};

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
