import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter, JetBrains_Mono, Alex_Brush, Silkscreen, Press_Start_2P, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { PreloaderProvider } from "@/context/PreloaderContext";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ChapterProgressTracker from "@/components/animations/ChapterProgressTracker";
import PageTransitionProvider from "@/components/animations/PageTransitionProvider";
import MagneticCursor from "@/components/animations/MagneticCursor";
import ScrollRevealObserver from "@/components/providers/ScrollRevealObserver";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-alex-brush",
  weight: ["400"],
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: ["400", "700"],
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  weight: ["400"],
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Raihan Ghifari Winata | AI & Machine Learning Engineer",
  description:
    "Portfolio of Raihan Ghifari Winata: AI & Machine Learning Engineer specializing in Deep Reinforcement Learning, Generative AI (LLMs/VLMs), and clinical MLOps. PRAGMA Hackathon Winner & AWS Certified AI Practitioner.",
  keywords: [
    "Raihan Ghifari Winata",
    "AI Engineer",
    "Machine Learning Engineer",
    "Deep Reinforcement Learning",
    "Generative AI",
    "LLM",
    "VLM",
    "MLOps",
    "PyTorch",
    "FastAPI",
    "Sepsis RL",
    "Jakarta",
    "Indonesia",
  ],
  authors: [{ name: "Raihan Ghifari Winata", url: "https://raihanghifariw.github.io/" }],
  creator: "Raihan Ghifari Winata",
  metadataBase: new URL("https://raihanghifariw.github.io/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raihanghifariw.github.io/",
    title: "Raihan Ghifari Winata | AI & Machine Learning Engineer",
    description:
      "Architecting intelligent systems at the intersection of Deep Reinforcement Learning, Generative AI, and clinical MLOps.",
    siteName: "Raihan Ghifari Winata",
    images: [
      {
        url: "/assets/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Raihan Ghifari Winata Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raihan Ghifari Winata | AI & Machine Learning Engineer",
    description:
      "Architecting intelligent systems at the intersection of Deep Reinforcement Learning, Generative AI, and clinical MLOps.",
    images: [
      {
        url: "/assets/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Raihan Ghifari Winata Portfolio",
      },
    ],
  },
  icons: {
    icon: "/assets/favicon.svg",
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
      data-theme="dark"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${alexBrush.variable} ${silkscreen.variable} ${pressStart2P.variable} ${shareTechMono.variable} dark scroll-smooth`}
    >
      <body className="antialiased bg-[var(--bg-base)] text-[var(--text-primary)] font-sans">
        {/* Set saved theme before first paint (prevents dark flash on light-theme users) */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("portfolio-theme")||localStorage.getItem("portfolio_theme")||"dark";var d=document.documentElement;d.setAttribute("data-theme",t);d.classList.toggle("dark",t==="dark")}catch(e){}})();`,
          }}
        />
        <PortfolioProvider>
          <PreloaderProvider>
            <SmoothScrollProvider>
              <PageTransitionProvider>
                {/* Custom Magnetic Cursor + Inspector HUD (desktop only) */}
                <MagneticCursor />
                {/* Sticky Chapter & Scroll Progress HUD Tracker */}
                <ChapterProgressTracker />
                {/* Native Intersection Observer Scroll Reveal "CCTV Layar" */}
                <ScrollRevealObserver />
                {children}
              </PageTransitionProvider>
            </SmoothScrollProvider>
          </PreloaderProvider>
        </PortfolioProvider>
      </body>
    </html>
  );
}
