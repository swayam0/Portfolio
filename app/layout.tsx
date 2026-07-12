import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Spotlight from "@/components/Spotlight";
import dynamic from 'next/dynamic';

const CommandCenter = dynamic(() => import('@/components/CommandCenter'), { ssr: false });
const LiveAIWidget = dynamic(() => import('@/components/LiveAIWidget'), { ssr: false });
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import { Analytics } from "@vercel/analytics/next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://swayamawari.com'),
  title: "Swayam Awari | Software Engineer & Full Stack Developer",
  description: "Software Engineer and Full Stack Developer building reliable web applications, backend systems, and AI-powered digital products. Open to engineering opportunities and selected freelance projects.",
  applicationName: "Swayam Awari Portfolio",
  authors: [{ name: "Swayam Awari" }],
  creator: "Swayam Awari",
  publisher: "Swayam Awari",
  keywords: ["Swayam Awari", "Software Engineer", "Full Stack Developer", "AI Developer", "Next.js", "React", "Node.js", "Freelance Developer"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Swayam Awari | Software Engineer",
    description: "Software Engineer and Full Stack Developer building reliable web applications, backend systems, and AI-powered digital products.",
    url: "/",
    siteName: "Swayam Awari",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swayam Awari | Software Engineer",
    description: "Software Engineer and Full Stack Developer building reliable web applications, backend systems, and AI-powered digital products.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Swayam Awari",
  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://swayamawari.com",
  "jobTitle": "Software Engineer & Full Stack Developer",
  "sameAs": [
    "https://github.com/swayam0",
    "https://linkedin.com/in/swayam-awari"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${jetbrainsMono.variable} font-body selection:bg-primary/20 selection:text-primary antialiased`}
      >
        <FilmGrain />
        <CustomCursor />
        <Spotlight />
        <CommandCenter />
        {children}
        <LiveAIWidget />
        <Analytics />
      </body>
    </html>
  );
}
