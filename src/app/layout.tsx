import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SmoothScroll } from "@/components/smooth-scroll";
import { AIAssistant } from "@/components/ai-assistant";

export const metadata: Metadata = {
  title: "NEXUS MALL — The Future of Shopping",
  description:
    "Step into the world's first immersive 3D luxury shopping experience. Explore virtual floors, holographic products, and AI-powered concierge.",
  keywords: [
    "futuristic mall",
    "3D shopping",
    "luxury ecommerce",
    "virtual mall",
    "AI shopping assistant",
  ],
  authors: [{ name: "NEXUS" }],
  openGraph: {
    title: "NEXUS MALL — The Future of Shopping",
    description: "Step into the world's first immersive 3D luxury shopping mall.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Providers>
          <SmoothScroll>
            {children}
            <AIAssistant />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
