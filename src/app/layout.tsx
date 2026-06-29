import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { Navigation, Footer } from "@/components/layout/Navigation";
import { ExploreShell } from "@/components/providers/ExploreShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoKeywords, siteConfig } from "@/lib/data";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryprestige.com"),
  title: {
    default: "ARY Prestige | Ankara Yenibağlıca Lüks Konut Projesi",
    template: "%s | ARY Prestige",
  },
  description:
    "185 m² net 4+1 lüks rezidans daireler, panoramik Ankara manzarası ve ayrıcalıklı sosyal yaşam konseptiyle Yenibağlıca'da yükselen ARY Prestige. Ankara'nın yeni prestij noktası.",
  keywords: seoKeywords,
  authors: [{ name: siteConfig.company }],
  creator: siteConfig.company,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://aryprestige.com",
    siteName: "ARY Prestige",
    title: "ARY Prestige | Ankara'nın Yeni Prestij Noktası",
    description:
      "185 m² net 4+1 lüks daireler, panoramik Ankara manzarası. Yenibağlıca'da prestijli yaşam.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ARY Prestige - Ankara Yenibağlıca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARY Prestige | Ankara'nın Yeni Prestij Noktası",
    description:
      "185 m² net 4+1 lüks daireler, panoramik Ankara manzarası. Yenibağlıca'da prestijli yaşam.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans">
        <ExploreShell>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ExploreShell>
      </body>
    </html>
  );
}
