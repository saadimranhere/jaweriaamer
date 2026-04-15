import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/lib/data";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "O Level English Teacher Karachi",
    "A Level English Online Classes",
    "Best O Level English Teacher Karachi",
    "CAIE English Tutor",
    "Cambridge English Karachi",
    "O Level English 1123",
    "A Level English 9093",
    "English Language Tuition Karachi",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
