import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://quickr.app",
  ),
  title: {
    default: "QuickR — Dynamic QR Code Generator & Manager",
    template: "%s | QuickR",
  },
  description:
    "Generate, manage, and update dynamic QR codes without friction. Create scannable codes from links or text, update destinations after printing, and download high-res PNGs.",
  keywords: [
    "QR code generator",
    "dynamic QR codes",
    "QR code manager",
    "updateable QR codes",
    "QR code maker",
    "free QR generator",
    "QR code creator",
    "dynamic QR",
    "QR code download",
    "QR code PNG",
  ],
  authors: [{ name: "Shreeteja", url: "https://shreeteja.vercel.app" }],
  creator: "Shreeteja",
  publisher: "QuickR",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "QuickR",
    title: "QuickR — Dynamic QR Code Generator & Manager",
    description:
      "Generate, manage, and update dynamic QR codes without friction. Update destinations after printing and download high-res PNGs.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "QuickR — Dynamic QR Code Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickR — Dynamic QR Code Generator & Manager",
    description:
      "Generate, manage, and update dynamic QR codes without friction. Update destinations after printing and download high-res PNGs.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
};

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "QuickR",
    url: "https://quickr-fast.vercel.app",
    logo: "https://quickr-fast.vercel.app/logo.png",
    description:
      "Open-source dynamic QR code generator with workspace management and high-res exports.",
    sameAs: ["https://github.com/shreeteja172/quickr"],
    founder: {
      "@type": "Person",
      name: "Shreeteja",
      url: "https://shreeteja.vercel.app",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "QuickR",
    url: "https://quickr-fast.vercel.app",
    description:
      "Generate, manage, and update dynamic QR codes without friction.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://quickr-fast.vercel.app/dashboard/create?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function SoftwareAppJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "QuickR",
    url: "https://quickr-fast.vercel.app",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "124",
    },
    description:
      "Open-source dynamic QR code generator with workspace management, real-time destination updates, and high-res PNG exports.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src={process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js"}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <SoftwareAppJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-cream-light text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
