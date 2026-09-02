import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@descope/nextjs-sdk";
import { cn } from "@/lib/utils";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const heading = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-heading",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Muhurat AI — Autonomous Calendar Intelligence",
    template: "%s | Muhurat AI",
  },
  description:
    "Autonomous AI calendar assistant inspired by Vedic time optimization. Seamless Google Calendar scheduling, conflict-free meeting detection, instant Google Meet generation, and persistent Mastra memory.",
  keywords: [
    "Muhurat AI",
    "AI Calendar Assistant",
    "Google Calendar AI",
    "Autonomous Scheduling",
    "Smart Calendar",
    "Google Meet Automation",
    "Free Busy Conflict Checker",
    "Mastra AI",
    "Model Context Protocol",
    "MCP Calendar",
    "Descope Authentication",
  ],
  authors: [{ name: "Muhurat AI Team", url: baseUrl }],
  creator: "Muhurat AI",
  publisher: "Muhurat AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/muhurat-logo.png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
    shortcut: ["/muhurat-logo.png"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Muhurat AI",
    title: "Muhurat AI — Autonomous Calendar Intelligence",
    description:
      "Vedic time intelligence & agentic scheduling assistant powered by Google Gemini, Mastra AI, and Descope.",
    images: [
      {
        url: "/muhurat-logo.png",
        width: 1024,
        height: 1024,
        alt: "Muhurat AI 3D Celestial Emblem Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhurat AI — Autonomous Calendar Intelligence",
    description:
      "Vedic time intelligence & agentic scheduling assistant powered by Google Gemini, Mastra AI, and Descope.",
    images: ["/muhurat-logo.png"],
    creator: "@muhurat_ai",
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

import { ThemeProvider } from "@/components/theme/theme-provider";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const projectId = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID ?? "";

  const cookieOptions = {
    sameSite: "Lax" as const,
    secure: process.env.NODE_ENV !== "development",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Muhurat AI",
    alternateName: "Muhurat Calendar Agent",
    description:
      "Autonomous AI calendar assistant inspired by Vedic time optimization. Seamless Google Calendar scheduling, conflict-free meeting detection, and instant Google Meet generation.",
    url: baseUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Autonomous Google Calendar Scheduling",
      "Conflict & Free/Busy Intelligence",
      "Automatic Google Meet Generation",
      "Persistent Working Memory with Mastra AI",
      "Interactive Visual Calendar Dashboard",
      "Model Context Protocol (MCP) Integration",
    ],
  };

  return (
    <AuthProvider
      projectId={projectId}
      sessionTokenViaCookie={cookieOptions}
      refreshTokenViaCookie={cookieOptions}
    >
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(sans.variable, heading.variable)}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className="min-h-svh bg-background font-sans text-foreground antialiased selection:bg-primary/30">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
