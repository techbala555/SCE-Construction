import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Footer/Footer";
import { ArrowLeft, Scale, Mail, Phone, MapPin } from "lucide-react";
import { contactDetails } from "@/src/data/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Shylesh Circuit & Engineering (SCE Developers). Read the terms governing the use of our website and services.",
  alternates: {
    canonical: "https://www.scedevelopers.in/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | SCE Developers",
    description:
      "Terms of Service for Shylesh Circuit & Engineering (SCE Developers). Read our terms and conditions.",
    url: "https://www.scedevelopers.in/terms-of-service",
    siteName: "SCE Developers",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | SCE Developers",
    description:
      "Terms of Service for Shylesh Circuit & Engineering (SCE Developers). Read our terms and conditions.",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Navigation & Header */}
        <div className="mb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={2} aria-hidden="true" />
            <span>Back to Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Scale className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            <span>Legal & Terms</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted text-xs sm:text-sm mt-3 font-medium">
            Last Updated: August 10, 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-surface border border-border shadow-soft rounded-2xl p-6 sm:p-10 md:p-12 space-y-8 text-foreground">
          {/* Section 1 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              1. Acceptance of Terms
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Welcome to the official website of Shylesh Circuit & Engineering (&quot;SCE Developers&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing, browsing, or using our website (<strong className="text-foreground">scedevelopers.in</strong>), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, please discontinue using this website.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              2. Use of the Website
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-3">
              You are granted a non-exclusive, non-transferable, revocable license to access and use our website strictly for personal, non-commercial informational purposes and to submit legitimate project enquiries for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted text-sm sm:text-base">
              <li>Residential & Villa Construction</li>
              <li>Land & Layout Development</li>
              <li>GPS Land Survey & Boundary Mapping</li>
              <li>DTCP & Municipal Approval Assistance</li>
              <li>3D Architectural Elevation & Interior Design</li>
            </ul>
            <p className="text-muted text-sm sm:text-base leading-relaxed mt-3">
              You agree not to use this website for any unlawful purpose, submit false or fraudulent enquiries, or attempt to compromise website security or infrastructure.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              3. Services and Informational Content
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              The descriptions, project portfolios, photo galleries, estimated cost ranges, and specifications provided on this website are for general guidance only. Formal construction commitments, finalized floor plans, exact project costs, material specifications, and completion schedules are established exclusively through signed written contracts executed directly between you and Shylesh Circuit & Engineering.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              4. Accuracy of Submitted Information
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              When submitting an enquiry form, you agree to provide accurate and complete contact information (Full Name, Phone Number, Email, and Location). Providing inaccurate or false contact details may prevent our engineering team from responding to your request.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              5. Intellectual Property Rights
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              All materials on this website—including company logos, brand names (&quot;SCE Construction&quot;, &quot;SCE Developers&quot;, &quot;Shylesh Circuit & Engineering&quot;), website design, text content, 3D elevation renders, layout drawings, and graphic icons—are the intellectual property of Shylesh Circuit & Engineering and protected by Indian copyright, trademark, and intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from website content without prior written permission.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              6. External Links & Third-Party Services
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Our website may contain links to external services such as Google Maps and WhatsApp. We do not control or assume responsibility for the content, privacy practices, or availability of third-party platforms. Accessing external links is at your own discretion.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              7. Limitation of Liability
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              To the fullest extent permitted by applicable law, Shylesh Circuit & Engineering shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to access this website, or reliance on any information presented herein.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              8. Modifications to Terms
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              We reserve the right to update or modify these Terms of Service at any time without prior notice. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of the website following changes constitutes your acceptance of the revised terms.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              9. Governing Law & Jurisdiction
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes or claims arising out of or in connection with the use of this website shall be subject to the exclusive jurisdiction of the competent courts in <strong className="text-foreground">Coimbatore, Tamil Nadu, India</strong>.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              10. Contact Us
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-4">
              If you have any questions regarding these Terms of Service, please contact us:
            </p>

            <div className="p-5 rounded-xl bg-surface-elevated border border-border space-y-3 text-xs sm:text-sm">
              <p className="font-bold text-foreground text-sm sm:text-base">Shylesh Circuit & Engineering (SCE Developers)</p>
              <div className="flex items-start gap-2.5 text-muted">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
                <span>{contactDetails.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                <a href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`} className="hover:text-primary transition-colors font-medium text-foreground">
                  {contactDetails.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-muted">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                <a href={`mailto:${contactDetails.email}`} className="hover:text-primary transition-colors font-medium text-foreground">
                  {contactDetails.email}
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
