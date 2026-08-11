import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPinned,
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
  projects,
  contactDetails,
  statistics,
} from "@/src/data/content";

export const metadata: Metadata = {
  title: "Land & Layout Development in Coimbatore",
  description:
    "SCE Developers provides land development, precision GPS land survey, and DTCP layout approval assistance in Coimbatore, Tamil Nadu.",
  alternates: {
    canonical: "https://www.scedevelopers.in/services/land-development",
  },
  openGraph: {
    title: "Land & Layout Development in Coimbatore | SCE Developers",
    description:
      "SCE Developers provides land development, precision GPS land survey, and DTCP layout approval assistance in Coimbatore, Tamil Nadu.",
    url: "https://www.scedevelopers.in/services/land-development",
    siteName: "SCE Developers",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/projects/layout-development.webp",
        width: 1200,
        height: 630,
        alt: "Land & Layout Development in Coimbatore - SCE Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Land & Layout Development in Coimbatore | SCE Developers",
    description:
      "SCE Developers provides land development, precision GPS land survey, and DTCP layout approval assistance in Coimbatore, Tamil Nadu.",
    images: ["/images/projects/layout-development.webp"],
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
      name: "Land & Layout Development",
      item: "https://www.scedevelopers.in/services/land-development",
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Land & Layout Development in Coimbatore",
  serviceType: "Land Development",
  description:
    "SCE Developers provides land development, precision GPS land survey, and DTCP layout approval assistance in Coimbatore, Tamil Nadu.",
  provider: {
    "@type": "GeneralContractor",
    "@id": "https://www.scedevelopers.in/#organization",
  },
  areaServed: {
    "@type": "City",
    name: "Coimbatore",
  },
  url: "https://www.scedevelopers.in/services/land-development",
};

const landService = serviceDetails["land-development"];

const landProjects = projects.filter(
  (p) => p.category === "Layout Development" || p.category === "Land Development"
);

const developmentProcess = [
  {
    step: "01",
    title: "GPS Survey & Boundary Mapping",
    description:
      "Accurate boundary survey using modern GPS instruments to mark exact plot dimensions and contours.",
  },
  {
    step: "02",
    title: "Layout Plan & DTCP Approval Support",
    description:
      "Assistance with DTCP approval paperwork, layout blueprint drawing, and regulatory guidelines compliance.",
  },
  {
    step: "03",
    title: "Site Clearing & Earthwork",
    description:
      "Site levelling, earthmoving, boundary fencing, and preliminary terrain preparation.",
  },
  {
    step: "04",
    title: "Roads & Underground Drainage",
    description:
      "Construction of internal tar/concrete roads, drainage networks, and utility infrastructure.",
  },
  {
    step: "05",
    title: "Water Tank & Compound Wall",
    description:
      "Overhead water tank construction, perimeter compound walls, and final site handover.",
  },
];

export default function LandDevelopmentPage() {
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
                    Land & Layout Development
                  </li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
                <MapPinned className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                <span>Land Infrastructure</span>
              </div>

              <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                Land & Layout Development in{" "}
                <span className="text-gold-gradient">Coimbatore</span>
              </h1>

              <p className="text-muted body-lg mb-8 leading-relaxed max-w-xl text-sm sm:text-base md:text-lg">
                {landService.fullDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/#contact"
                  className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold rounded-xl shadow-md"
                >
                  <span>Get Land Survey Estimate</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </Link>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-semibold rounded-xl border border-border text-foreground hover:bg-surface-elevated transition-colors"
                >
                  <span>View Layout Projects</span>
                </a>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-elevated border border-border shadow-lg">
              <Image
                src="/images/projects/layout-development.webp"
                alt="Land & Layout Development in Coimbatore - SCE Developers"
                fill
                priority
                fetchPriority="high"
                quality={75}
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
                GPS Land Survey & <span className="text-gold-gradient">Layout Infrastructure</span>
              </h2>
              <p className="text-muted body-relaxed text-sm sm:text-base">
                We transform unorganized land into well-planned, government-approved residential layouts complete with roads, drainage, water supply, and boundary demarcation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
              {landService.keyBenefits.map((benefit) => (
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
                Land & Layout Development <span className="text-gold-gradient">Services</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {landService.items.map((item, index) => (
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
                      Precision site planning, technical execution, and engineering management for {item.toLowerCase()}.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="divider-gold" />
                <span className="label-sm text-primary">Workflow</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                Layout Development <span className="text-gold-gradient">Process</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {developmentProcess.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-surface border border-border shadow-sm flex flex-col"
                >
                  <span className="text-xs font-extrabold text-primary uppercase tracking-widest mb-2">
                    Stage {step.step}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted text-xs sm:text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREDENTIALS STATS */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface border-b border-border/70">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 rounded-2xl bg-background border border-border shadow-sm text-center">
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

        {/* FEATURED PROJECTS */}
        <section id="projects" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="divider-gold" />
                <span className="label-sm text-primary">Portfolio</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                Featured Layout & <span className="text-gold-gradient">Survey Projects</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {landProjects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-2xl overflow-hidden bg-surface border border-border shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-elevated">
                    <Image
                      src={project.image}
                      alt={`${project.title} - ${project.category} project in ${project.location}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <p className="text-muted/70 text-xs font-medium">{project.location}</p>
                  </div>
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
                Why Choose SCE Developers <span className="text-gold-gradient">for Land Development</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {landService.whyChooseUs.map((reason) => (
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
            <p className="text-muted body-relaxed text-sm sm:text-base mb-8 max-w-2xl mx-auto">
              Shylesh Circuits & Engineering provides GPS land survey, DTCP layout planning, and site development across Coimbatore and Tamil Nadu.
            </p>

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
              Start Your <span className="text-gold-gradient">Land Development Project</span>
            </h2>
            <p className="text-muted body-relaxed text-sm sm:text-base mb-8">
              Contact our engineering team to schedule a GPS land survey, DTCP layout consultation, or site preparation estimate.
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
              <span>Submit Land Development Enquiry</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
