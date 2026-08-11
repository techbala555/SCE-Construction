import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  Clock3,
  Trophy,
  Users,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Compass,
  PencilRuler,
  Zap,
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
  title: "House Construction Services in Coimbatore",
  description:
    "SCE Developers offers independent house and villa construction services in Coimbatore with custom plan drawing, 3D elevation, and on-time completion.",
  alternates: {
    canonical: "https://www.scedevelopers.in/services/house-construction",
  },
  openGraph: {
    title: "House Construction Services in Coimbatore | SCE Developers",
    description:
      "SCE Developers offers independent house and villa construction services in Coimbatore with custom plan drawing, 3D elevation, and on-time completion.",
    url: "https://www.scedevelopers.in/services/house-construction",
    siteName: "SCE Developers",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/projects/villa-project.webp",
        width: 1200,
        height: 630,
        alt: "House Construction Services in Coimbatore - SCE Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "House Construction Services in Coimbatore | SCE Developers",
    description:
      "SCE Developers offers independent house and villa construction services in Coimbatore with custom plan drawing, 3D elevation, and on-time completion.",
    images: ["/images/projects/villa-project.webp"],
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
      name: "House Construction",
      item: "https://www.scedevelopers.in/services/house-construction",
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "House Construction Services in Coimbatore",
  serviceType: "House Construction",
  description:
    "SCE Developers offers independent house and villa construction services in Coimbatore with custom plan drawing, 3D elevation, and on-time completion.",
  provider: {
    "@type": "GeneralContractor",
    "@id": "https://www.scedevelopers.in/#organization",
  },
  areaServed: {
    "@type": "City",
    name: "Coimbatore",
  },
  url: "https://www.scedevelopers.in/services/house-construction",
};

const houseService = serviceDetails.construction;

// Residential projects from verified data
const residentialProjects = projects.filter(
  (p) => p.category === "Residential" || p.id === "interior-finishing"
);

const constructionProcess = [
  {
    step: "01",
    title: "Floor Plan & 3D Elevation",
    description:
      "Architectural floor plan drawing and 3D exterior elevation renders tailored to your plot dimensions.",
  },
  {
    step: "02",
    title: "Structural Design & Engineering",
    description:
      "Engineering calculation, structural safety checks, and material estimation before starting site work.",
  },
  {
    step: "03",
    title: "Foundation & Civil Construction",
    description:
      "Excavation, RCC foundation, column brickwork, roof slab casting, and structural masonry work.",
  },
  {
    step: "04",
    title: "Interior Woodwork & Finishing",
    description:
      "Plastering, electrical wiring, plumbing, flooring tiles, woodwork, and interior paint finish.",
  },
  {
    step: "05",
    title: "Final Inspection & Key Handover",
    description:
      "Quality inspection by civil site engineers, final cleaning, and key handover on schedule.",
  },
];

export default function HouseConstructionPage() {
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
        {/* ── SECTION 1 — HERO ─────────────────────────────────── */}
        <section className="relative bg-surface border-b border-border/80 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              {/* Breadcrumb */}
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
                    House Construction
                  </li>
                </ol>
              </nav>

              {/* Title & Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
                <Building2 className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                <span>Residential Construction</span>
              </div>

              <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                House Construction Services in{" "}
                <span className="text-gold-gradient">Coimbatore</span>
              </h1>

              <p className="text-muted body-lg mb-8 leading-relaxed max-w-xl text-sm sm:text-base md:text-lg">
                {houseService.fullDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/#contact"
                  className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold rounded-xl shadow-md"
                >
                  <span>Get Construction Estimate</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </Link>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-semibold rounded-xl border border-border text-foreground hover:bg-surface-elevated transition-colors"
                >
                  <span>View Our Projects</span>
                </a>
              </div>
            </div>

            {/* Right Visual Image (LCP optimized) */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-elevated border border-border shadow-lg">
              <Image
                src="/images/about-us.webp"
                alt="Civil engineers inspecting house construction plans in Coimbatore - SCE Developers"
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

        {/* ── SECTION 2 — SERVICE OVERVIEW ────────────────────── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/70">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="divider-gold" />
                <span className="label-sm text-primary">Overview</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                Quality Independent House &{" "}
                <span className="text-gold-gradient">Villa Construction</span>
              </h2>
              <p className="text-muted body-relaxed text-sm sm:text-base">
                We manage your entire house construction project with experienced site supervisors, transparent pricing, and quality materials from foundation work to final handover.
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
              {houseService.keyBenefits.map((benefit) => (
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

        {/* ── SECTION 3 — WHAT WE BUILD ───────────────────────── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface border-b border-border/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="divider-gold" />
                <span className="label-sm text-primary">Our Solutions</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                Residential Building Solutions <span className="text-gold-gradient">We Offer</span>
              </h2>
              <p className="text-muted body-relaxed text-sm sm:text-base">
                Customized residential building solutions designed around your family&apos;s lifestyle and budget requirements.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {houseService.items.map((item, index) => (
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
                      Complete project planning, civil masonry, quality finishing, and supervision tailored for {item.toLowerCase()}.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — CONSTRUCTION APPROACH ───────────────── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="divider-gold" />
                <span className="label-sm text-primary">Workflow</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                Our Step-by-Step <span className="text-gold-gradient">Construction Process</span>
              </h2>
              <p className="text-muted body-relaxed text-sm sm:text-base">
                From initial floor plan drawings to structural civil execution and key handover.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {constructionProcess.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-surface border border-border shadow-sm flex flex-col relative"
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

        {/* ── SECTION 5 — BUSINESS CREDENTIALS ────────────────── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface border-b border-border/70">
          <div className="max-w-7xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 rounded-2xl bg-background border border-border shadow-sm text-center mb-14">
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

            {/* Team Breakdown */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                In-House Technical Team
              </h3>
              <p className="text-muted text-xs sm:text-sm">
                Architects, plan drawing experts, and civil engineers collaborating on your project.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-5 rounded-2xl bg-background border border-border text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto flex items-center justify-center text-primary mb-3">
                  <Compass className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h4 className="font-bold text-foreground text-base">2 Architects</h4>
                <p className="text-muted text-xs mt-1">Experienced floor plan designers</p>
              </div>

              <div className="p-5 rounded-2xl bg-background border border-border text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto flex items-center justify-center text-primary mb-3">
                  <PencilRuler className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h4 className="font-bold text-foreground text-base">3 Drawing Experts</h4>
                <p className="text-muted text-xs mt-1">CAD & 3D elevation specialists</p>
              </div>

              <div className="p-5 rounded-2xl bg-background border border-border text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto flex items-center justify-center text-primary mb-3">
                  <Zap className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h4 className="font-bold text-foreground text-base">4 Circuit Engineers</h4>
                <p className="text-muted text-xs mt-1">Electrical wiring & safety experts</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6 — FEATURED PROJECTS ───────────────────── */}
        <section id="projects" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="divider-gold" />
                <span className="label-sm text-primary">Portfolio</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                Recent House Construction Projects in <span className="text-gold-gradient">Coimbatore</span>
              </h2>
              <p className="text-muted body-relaxed text-sm sm:text-base">
                Real completed independent house builds and villa projects across Coimbatore, Tamil Nadu.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {residentialProjects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-2xl overflow-hidden bg-surface border border-border shadow-sm hover:border-primary/40 transition-colors flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-elevated">
                    <Image
                      src={project.image}
                      alt={`${project.title} - ${project.category} construction project in ${project.location}`}
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

        {/* ── SECTION 7 — WHY CHOOSE SCE DEVELOPERS ───────────── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface border-b border-border/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="divider-gold" />
                <span className="label-sm text-primary">Why Choose Us</span>
                <div className="divider-gold" />
              </div>
              <h2 className="heading-lg text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
                Why Choose SCE Developers <span className="text-gold-gradient">for Your Home</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {houseService.whyChooseUs.map((reason) => (
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

        {/* ── SECTION 8 — SERVICE AREA ─────────────────────────── */}
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
              Shylesh Circuits & Engineering provides residential house construction and land development services across Coimbatore and surrounding regions in Tamil Nadu.
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

        {/* ── SECTION 9 — CONTACT CTA ──────────────────────────── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-surface text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-3xl sm:text-4xl text-foreground mb-4">
              Start Your <span className="text-gold-gradient">Construction Project</span>
            </h2>
            <p className="text-muted body-relaxed text-sm sm:text-base mb-8">
              Contact our civil engineering team today to discuss your floor plan, 3D elevation design, and house construction estimate.
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
              <span>Submit Online Project Enquiry</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
