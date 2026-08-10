import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Footer/Footer";
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { contactDetails } from "@/src/data/content";

export const metadata: Metadata = {
  title: "Privacy Policy | SCE Developers",
  description:
    "Privacy Policy for Shylesh Circuits & Engineering (SCE Developers). Learn how we collect, use, and protect your project enquiry information.",
  alternates: {
    canonical: "https://scedevelopers.in/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | SCE Developers",
    description:
      "Privacy Policy for Shylesh Circuits & Engineering (SCE Developers). Learn how we handle your information.",
    url: "https://scedevelopers.in/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            <span>Legal & Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Privacy Policy
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
              1. Introduction
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Shylesh Circuits & Engineering (&quot;SCE Developers&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard your details when you visit our website (<strong className="text-foreground">scedevelopers.in</strong>) or submit an enquiry for our construction and land development services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              2. Information We Collect
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-3">
              We collect information that you voluntarily provide to us when filling out enquiry forms on our website:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted text-sm sm:text-base">
              <li><strong className="text-foreground">Full Name:</strong> To address you properly in communications.</li>
              <li><strong className="text-foreground">Phone Number:</strong> To call or message you regarding your project consultation.</li>
              <li><strong className="text-foreground">Email Address (Optional):</strong> To send project estimates, 3D elevation samples, or confirmation receipts.</li>
              <li><strong className="text-foreground">Project Details:</strong> Project type (e.g., Independent House, Villa, Land Development, GPS Survey, 3D Elevation), location, estimated budget, preferred contact method, and custom requirements message.</li>
              <li><strong className="text-foreground">Technical Log Data:</strong> Basic standard web request headers (such as browser type and IP address) logged automatically by web server infrastructure for operational security and performance monitoring.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              3. How We Use Your Information
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-3">
              Your information is used strictly for legitimate business purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted text-sm sm:text-base">
              <li>To respond to your project enquiries via phone call, WhatsApp, or email.</li>
              <li>To schedule site visits, land surveys, or engineering consultations in Tamil Nadu.</li>
              <li>To prepare customized construction estimates, floor plans, and project proposals.</li>
              <li>To maintain internal customer record-keeping.</li>
            </ul>
            <p className="text-muted text-sm sm:text-base leading-relaxed mt-3 font-semibold text-primary/90">
              We do NOT sell, rent, trade, or share your personal information with third-party marketers or advertisers.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              4. Cookies and Session Storage
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Our website uses minimal essential browser storage (<code className="text-xs px-1.5 py-0.5 rounded bg-surface-elevated text-primary font-mono">sessionStorage</code>) solely to remember user interface states during your browsing session—such as preventing duplicate modal popups from interrupting your navigation. We do not place third-party advertising cookies or cross-site tracking tags on your device.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              5. Third-Party Services
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-3">
              To operate our website securely, we utilize the following trusted infrastructure providers:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted text-sm sm:text-base">
              <li><strong className="text-foreground">Database Provider (Neon PostgreSQL):</strong> Stores submitted enquiry data in secure, encrypted cloud database tables.</li>
              <li><strong className="text-foreground">Email Service (Resend):</strong> Transmits enquiry notifications to our administrative email (<code className="text-xs px-1.5 py-0.5 rounded bg-surface-elevated text-primary font-mono">info@scedevelopers.in</code>) and dispatches customer confirmation emails.</li>
              <li><strong className="text-foreground">Embedded Maps (Google Maps):</strong> Displays our office location in Coimbatore. Interacting with Google Maps is governed by Google&apos;s Privacy Policy.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              6. Data Security & Retention
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              We implement industry-standard security measures—including HTTPS encryption for data in transit, strict environment key isolation, and database access controls—to safeguard your information against unauthorized access, loss, or misuse. We retain enquiry records only for as long as necessary to fulfill project services or legal accounting obligations.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              7. Your Rights & Data Requests
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              You have the right to request access to the personal information we hold about you, request corrections, or ask us to remove your contact details from our active records. To submit a data request, please email us at <strong className="text-foreground">info@scedevelopers.in</strong>.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              8. Children&apos;s Privacy
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Our website and construction services are intended for adults. We do not knowingly collect personal data from individuals under 18 years of age.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border pb-2.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              9. Contact Us
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-4">
              If you have any questions or concerns regarding this Privacy Policy, please contact our team:
            </p>

            <div className="p-5 rounded-xl bg-surface-elevated border border-border space-y-3 text-xs sm:text-sm">
              <p className="font-bold text-foreground text-sm sm:text-base">Shylesh Circuits & Engineering (SCE Developers)</p>
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
