import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  CheckCircle2,
  ArrowRight,
  Clock3,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Footer/Footer";
import {
  serviceDetails,
  contactDetails,
  statistics,
} from "@/src/data/content";

export const metadata: Metadata = {
  title: "3D Elevation Design Services in Coimbatore",
  description:
    "SCE Developers provides realistic 3D architectural elevation design, exterior facade rendering, and residential visualization in Coimbatore.",
  alternates: {
    canonical: "https://www.scedevelopers.in/services/3d-elevation-design",
  },
  openGraph: {
    title: "3D Elevation Design Services in Coimbatore | SCE Developers",
    description:
      "SCE Developers provides realistic 3D architectural elevation design, exterior facade rendering, and residential visualization in Coimbatore.",
    url: "https://www.scedevelopers.in/services/3d-elevation-design",
    siteName: "SCE Developers",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/services/elevation-3d.webp",
        width: 1200,
        height: 630,
        alt: "3D Elevation Design Services in Coimbatore - SCE Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Elevation Design Services in Coimbatore | SCE Developers",
    description:
      "SCE Developers provides realistic 3D architectural elevation design, exterior facade rendering, and residential visualization in Coimbatore.",
    images: ["/images/services/elevation-3d.webp"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.scedevelopers.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://www.scedevelopers.in/#services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "3D Elevation Design",
      item: "https://www.scedevelopers.in/services/3d-elevation-design",
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "3D Elevation Design Services in Coimbatore",
  serviceType: "3D Elevation Design",
  description:
    "SCE Developers provides realistic 3D architectural elevation design, exterior facade rendering, and residential visualization in Coimbatore.",
  provider: {
    "@type": "GeneralContractor",
    "@id": "https://www.scedevelopers.in/#organization",
  },
  areaServed: {
    "@type": "City",
    name: "Coimbatore",
  },
  url: "https://www.scedevelopers.in/services/3d-elevation-design",
};

const elevationService = serviceDetails["elevation-3d"];

export default function ElevationDesignPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 md:pt-32">
        {/* HERO */}
        <section className="relative bg-surface border-b border-border/80 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs sm:text-sm text-muted font-medium flex-wrap">
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center text-muted/60">
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-primary transition-colors">
                      Services
                    </Link>
                  </li>
                  <li className="flex items-center text-muted/60">
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </li>
                  <li className="text-primary font-semibold" aria-current="page">
                    3D Elevation Design
                  </li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
                <Box className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                <span>Architectural Visualization</span>
              </div>

              <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                3D Elevation Design Services in{" "}
                <span className="text-gold-gradient">Coimbatore</span>
              </h1>

              <p className="text-muted body-lg mb-8 leading-relaxed max-w-xl text-sm sm:text-base md:text-lg">
                {elevationService.fullDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/#contact"
                  className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold rounded-xl shadow-md"
                >
                  <span>Get 3D Design Estimate</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-elevated border border-border shadow-lg">
              <Image
                src="/images/services/elevation-design-tn.webp"
                alt="3D Elevation Design Services in Coimbatore - SCE Developers"
                fill
                priority
                fetchPriority="high"
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/70">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="divider-gold" />
                <span className="label-sm text-primary">Overview</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                Realistic Exterior Facade & <span className="text-gold-gradient">3D Renders</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
              {elevationService.keyBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="p-5 rounded-2xl bg-surface border border-border flex items-start gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <p className="text-foreground font-medium text-sm sm:text-base leading-relaxed pt-1">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface border-b border-border/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="divider-gold" />
                <span className="label-sm text-primary">Services</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                3D Exterior Design <span className="text-gold-gradient">Solutions</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {elevationService.items.map((item, index) => (
                <div
                  key={item}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 transition-colors shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg mb-5">
                      0{index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{item}</h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">
                      Custom color schemes, texture combinations, lighting renders, and material visualization for {item.toLowerCase()}.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREDENTIALS STATS */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/70">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 rounded-2xl bg-surface border border-border shadow-sm text-center">
              {statistics.slice(0, 3).map((stat) => (
                <div key={stat.label} className="py-2">
                  <p className="text-3xl sm:text-4xl font-extrabold text-gold-gradient">
                    {stat.value}{stat.suffix}
                  </p>
                  <p className="text-muted text-xs sm:text-sm font-medium mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface border-b border-border/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="divider-gold" />
                <span className="label-sm text-primary">Why Choose Us</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                Why Choose SCE Developers <span className="text-gold-gradient">for 3D Elevation</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {elevationService.whyChooseUs.map((reason) => (
                <div
                  key={reason}
                  className="p-6 rounded-2xl bg-background border border-border flex items-start gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5 text-primary" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <p className="text-foreground font-semibold text-sm sm:text-base leading-relaxed">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE AREA */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/70">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="divider-gold" />
              <span className="label-sm text-primary">Location</span>
              <div className="divider-gold" />
            </div>
            <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-6">
              Our Service Area in <span className="text-gold-gradient">Coimbatore</span>
            </h2>

            <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-sm max-w-xl mx-auto text-left space-y-4 text-xs sm:text-sm">
              <p className="font-bold text-foreground text-sm sm:text-base">
                Shylesh Circuits & Engineering (SCE Developers)
              </p>
              <div className="flex items-start gap-3 text-muted">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
                <span>{contactDetails.address}</span>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <Clock3 className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                <span>{contactDetails.workingHours}</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-surface text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-3xl sm:text-4xl text-foreground mb-4">
              Start Your <span className="text-gold-gradient">3D Design Renders</span>
            </h2>
            <p className="text-muted body-relaxed text-sm sm:text-base mb-8">
              Contact our architectural visualization team to convert your floor plans into photorealistic 3D exterior renders.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
              <a
                href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-surface-elevated border border-border text-foreground font-semibold text-sm hover:border-primary/40 transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" strokeWidth={2} aria-hidden="true" />
                <span>{contactDetails.phone}</span>
              </a>

              <a
                href={`mailto:${contactDetails.email}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-surface-elevated border border-border text-foreground font-semibold text-sm hover:border-primary/40 transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" strokeWidth={2} aria-hidden="true" />
                <span>{contactDetails.email}</span>
              </a>
            </div>

            <Link
              href="/#contact"
              className="btn-shine inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-bold rounded-xl shadow-lg"
            >
              <span>Submit 3D Elevation Enquiry</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
