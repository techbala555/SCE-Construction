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
  metadataBase: new URL("https://sceconstruction.com"),
  title: "SCE Construction - House Construction & Land Development in Tamil Nadu",
  description:
    "Shylesh Circuits & Engineering is a trusted builder in Coimbatore, Tamil Nadu. We specialize in independent house construction, villa building, land development, GPS land survey, DTCP approvals, and 3D elevation design.",
  keywords: [
    "house construction",
    "villa construction",
    "independent house builder",
    "land development",
    "GPS land survey",
    "DTCP approval assistance",
    "layout development",
    "3D elevation design",
    "interior design works",
    "property development",
    "farmhouse construction",
    "SCE Construction",
    "Shylesh Circuits & Engineering",
    "builders and developers Coimbatore",
    "construction company Tamil Nadu",
  ],
  openGraph: {
    title: "SCE Construction - House Construction & Land Development",
    description:
      "Trusted construction and land development in Tamil Nadu. Independent house construction, villa building, GPS survey, DTCP approvals, and 3D elevation designs.",
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
