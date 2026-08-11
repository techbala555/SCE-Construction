import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/src/lib/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.scedevelopers.in"),
  title: {
    default: "SCE Developers | Civil Engineering & Construction Company in Coimbatore",
    template: "%s | SCE Developers",
  },
  description:
    "SCE Developers is a civil engineering and construction company in Coimbatore specializing in house construction, land development, and 3D elevation design.",
  keywords: [
    "SCE Developers",
    "civil engineering company Coimbatore",
    "construction company in Coimbatore",
    "residential construction Coimbatore",
    "commercial building construction",
    "house builders Coimbatore",
    "3D elevation design",
    "land development Coimbatore",
    "GPS land survey Tamil Nadu",
    "DTCP approval assistance",
    "Shylesh Circuits & Engineering",
  ],
  alternates: {
    canonical: "https://www.scedevelopers.in",
  },
  openGraph: {
    title: "SCE Developers | Civil Engineering & Construction Company in Coimbatore",
    description:
      "SCE Developers is a civil engineering and construction company in Coimbatore specializing in house construction, land development, and 3D elevation design.",
    url: "https://www.scedevelopers.in",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "dvOniLaO5v5Nw4XmR3DX3bYKeUmQ7wSd5wJDguihT2g",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": "https://www.scedevelopers.in/#organization",
  name: "Shylesh Circuits & Engineering",
  alternateName: ["SCE Developers", "SCE Construction"],
  url: "https://www.scedevelopers.in",
  logo: "https://www.scedevelopers.in/logo-dark.svg",
  image: "https://www.scedevelopers.in/images/hero-bg.webp",
  description:
    "Shylesh Circuits & Engineering (SCE Developers) is a civil engineering and construction company in Coimbatore specializing in house construction, land development, and 3D elevation design.",
  telephone: "+91 98422 29272",
  email: "info@scedevelopers.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "PMR Nagar, TVS Nagar",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641025",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.0490908,
    longitude: 76.9223518,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  areaServed: [
    {
      "@type": "City",
      name: "Coimbatore",
    },
    {
      "@type": "State",
      name: "Tamil Nadu",
    },
  ],
  knowsAbout: [
    "Residential House Construction",
    "Villa Construction",
    "Civil Engineering",
    "3D Elevation Design",
    "GPS Land Surveying",
    "DTCP Layout Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
