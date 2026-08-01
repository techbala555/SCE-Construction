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
  title: "SCE Construction — Residential Construction, Land Development & Real Estate",
  description:
    "Shylesh Circuits & Engineering — Builders & Developers. Complete construction, land development, GPS land survey, DTCP approval, layout planning, interior design, and real estate solutions in Madurai, Tamil Nadu.",
  keywords: [
    "residential construction",
    "villa construction",
    "independent house builder",
    "land development",
    "GPS land survey",
    "DTCP approval",
    "layout development",
    "interior design",
    "property development",
    "farmhouse construction",
    "SCE Construction",
    "Shylesh Circuits & Engineering",
    "builders and developers Madurai",
    "construction company Tamil Nadu",
  ],
  openGraph: {
    title: "SCE Construction — Construction, Land Development & Real Estate",
    description:
      "Complete construction, land development, and real estate solutions. Villa construction, GPS land survey, DTCP approval, layout planning, and more.",
    type: "website",
    images: [{ url: "/logo-dark.svg", alt: "SCE Construction Logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
