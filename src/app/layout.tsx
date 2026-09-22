import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "the larp machine — for the top 1% performative and niche",
    template: "%s | the larp machine",
  },
  description: "the larp machine. turn normal thoughts into unbearable lore for the top 1% performative and niche. by qubitsorg.",
  keywords: [
    "the larp machine",
    "larp",
    "larp machine",
    "what is larp",
    "how to larp",
    "larp generator",
    "larping",
    "how to be performative",
    "how to be niche",
    "how to yap",
    "yapping generator",
    "performative monologue",
    "qubitsorg",
    "lore generator",
    "comedy writing",
    "twitter monologue",
  ],
  authors: [{ name: "qubitsorg", url: "https://qubitsorg.netlify.app/" }],
  creator: "qubitsorg",
  publisher: "qubitsorg",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "the larp machine",
    description: "turn normal thoughts into unbearable lore. by qubitsorg.",
    url: siteUrl,
    siteName: "the larp machine",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "the larp machine",
    description: "turn normal thoughts into unbearable lore. by qubitsorg.",
    creator: "@qubitsorg",
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

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "the larp machine",
      "url": siteUrl,
      "alternateName": ["the larp machine", "larp", "larp generator", "the monologue engine"],
      "description": "the viral comedy tool for the top 1% performative and niche. turn normal thoughts into unbearable lore.",
      "applicationCategory": "EntertainmentApplication",
      "operatingSystem": "All",
      "author": {
        "@type": "Organization",
        "name": "qubitsorg",
        "url": "https://qubitsorg.netlify.app/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "qubitsorg",
        "url": "https://qubitsorg.netlify.app/"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "what is larp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "larp originally refers to live action role-playing, but in modern internet culture it describes someone performing an identity, expertise, lifestyle, or obsession as though they are deeply immersed in it. the larp tool by qubitsorg turns normal statements into absurdly elaborate, performative monologues."
          }
        },
        {
          "@type": "Question",
          "name": "how to larp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "to larp a thought, take a completely ordinary human sentence (like 'i like football' or 'i drink coffee') and replace it with an elaborate, hyper-specific monologue featuring niche references, technical details, and escalating commitment."
          }
        },
        {
          "@type": "Question",
          "name": "how to be performative?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "to be performative on the internet, treat a casual habit or preference as a defining philosophical worldview and spiritual crusade. escalate ordinary observations into uncompromising aesthetic stances."
          }
        },
        {
          "@type": "Question",
          "name": "how to be niche?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "being niche means citing obscure details, specific match moments, 40-micron grinder burrs, valgrind segfaults, or subculture minutiae that make readers ask why you know this information."
          }
        },
        {
          "@type": "Question",
          "name": "how to yap?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "yapping is the art of delivering a high-velocity, impassioned monologue with zero generic corporate filler, turning a single conversational thought into dense, entertaining lore."
          }
        },
        {
          "@type": "Question",
          "name": "who built larp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "larp was created and published by qubitsorg (https://qubitsorg.netlify.app/) as a minimalist internet writing tool."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf9f9] text-[#18181b] font-sans selection:bg-pink-100 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}
