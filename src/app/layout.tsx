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
  title: "SCE Construction — Premium Construction & Engineering Company",
  description:
    "Shylesh Circuits & Engineering - Builders & Developers. Delivering world-class residential, commercial, and industrial projects with over two decades of excellence.",
  keywords: [
    "construction company",
    "luxury construction",
    "commercial construction",
    "residential construction",
    "engineering",
    "SCE Construction",
    "Shylesh Circuits & Engineering",
    "builders and developers",
  ],
  openGraph: {
    title: "SCE Construction — Premium Construction & Engineering",
    description:
      "Building tomorrow's landmarks today. World-class residential, commercial, and industrial construction services.",
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
