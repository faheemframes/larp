import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
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

export const metadata: Metadata = {
  title: "larp. — for the top 1% performative and niche",
  description: "for the top 1% performative and niche. turn normal thoughts into unbearable lore. built by faheemframes and qubitsorg.",
  keywords: [
    "larp",
    "what is larp",
    "how to larp",
    "how to be performative",
    "how to be niche",
    "how to yap",
    "qubitsorg",
    "faheemframes",
    "lore generator",
    "comedy writing",
    "twitter monologue",
  ],
  authors: [{ name: "faheemframes", url: "https://github.com/faheemframes" }],
  creator: "faheemframes",
  publisher: "qubitsorg",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "larp. — for the top 1% performative and niche",
    description: "turn normal thoughts into unbearable lore. built by faheemframes and qubitsorg.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "larp. — for the top 1% performative and niche",
    description: "turn normal thoughts into unbearable lore.",
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
      "name": "LARP",
      "alternateName": ["larp", "larp generator", "the monologue engine"],
      "description": "The viral comedy tool for the top 1% performative and niche. Turn normal thoughts into unbearable lore.",
      "applicationCategory": "EntertainmentApplication",
      "operatingSystem": "All",
      "author": {
        "@type": "Person",
        "name": "faheemframes",
        "url": "https://github.com/faheemframes"
      },
      "publisher": {
        "@type": "Organization",
        "name": "qubitsorg",
        "url": "https://qubits.org"
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
            "text": "larp originally refers to live action role-playing, but in modern internet culture it describes someone performing an identity, expertise, lifestyle, or obsession as though they are deeply immersed in it. the larp tool by faheemframes and qubitsorg turns normal statements into absurdly elaborate, performative monologues."
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
            "text": "larp was created by faheemframes and published by qubitsorg as a minimalist internet writing tool."
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
