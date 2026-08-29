import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Trees,
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
  title: "Farmhouse Projects in Coimbatore",
  description:
    "SCE Developers offers custom farmhouse planning, land preparation, perimeter fencing, and farmhouse construction services in Coimbatore.",
  alternates: {
    canonical: "https://www.scedevelopers.in/services/farmhouse-projects",
  },
  openGraph: {
    title: "Farmhouse Projects in Coimbatore | SCE Developers",
    description:
      "SCE Developers offers custom farmhouse planning, land preparation, perimeter fencing, and farmhouse construction services in Coimbatore.",
    url: "https://www.scedevelopers.in/services/farmhouse-projects",
    siteName: "SCE Developers",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/services/farmhouse.webp",
        width: 1200,
        height: 630,
        alt: "Farmhouse Projects in Coimbatore - SCE Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farmhouse Projects in Coimbatore | SCE Developers",
    description:
      "SCE Developers offers custom farmhouse planning, land preparation, perimeter fencing, and farmhouse construction services in Coimbatore.",
    images: ["/images/services/farmhouse.webp"],
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
      name: "Farmhouse Projects",
      item: "https://www.scedevelopers.in/services/farmhouse-projects",
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Farmhouse Projects in Coimbatore",
  serviceType: "Farmhouse Construction",
  description:
    "SCE Developers offers custom farmhouse planning, land preparation, perimeter fencing, and farmhouse construction services in Coimbatore.",
  provider: {
    "@type": "GeneralContractor",
    "@id": "https://www.scedevelopers.in/#organization",
  },
  areaServed: {
    "@type": "City",
    name: "Coimbatore",
  },
  url: "https://www.scedevelopers.in/services/farmhouse-projects",
};

const farmhouseService = serviceDetails["future-projects"];

export default function FarmhouseProjectsPage() {
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
                    Farmhouse Projects
                  </li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
                <Trees className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                <span>Countryside Estate Build</span>
              </div>

              <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                Farmhouse Projects in{" "}
                <span className="text-gold-gradient">Coimbatore</span>
              </h1>

              <p className="text-muted body-lg mb-8 leading-relaxed max-w-xl text-sm sm:text-base md:text-lg">
                {farmhouseService.fullDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/#contact"
                  className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold rounded-xl shadow-md"
                >
                  <span>Get Farmhouse Estimate</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-elevated border border-border shadow-lg">
              <Image
                src="/images/services/farmhouse-project-tn.webp"
                alt="Farmhouse Projects in Coimbatore - SCE Developers"
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
                Farmhouse Planning & <span className="text-gold-gradient">Construction</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
              {farmhouseService.keyBenefits.map((benefit) => (
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
                <span className="label-sm text-primary">Scope</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                Farmhouse Project <span className="text-gold-gradient">Services</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {farmhouseService.items.map((item, index) => (
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
                      Custom design, terrain clearing, water setup, and durable execution for {item.toLowerCase()}.
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
                Why Choose SCE Developers <span className="text-gold-gradient">for Your Farmhouse</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {farmhouseService.whyChooseUs.map((reason) => (
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
                Shylesh Circuit & Engineering (SCE Developers)
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
              Start Your <span className="text-gold-gradient">Farmhouse Project</span>
            </h2>
            <p className="text-muted body-relaxed text-sm sm:text-base mb-8">
              Contact our engineering team to plan your farmhouse layout, terrain preparation, and construction.
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
              <span>Submit Farmhouse Enquiry</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
