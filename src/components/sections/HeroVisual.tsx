"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Sparkles,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Zap,
  FileText,
  Activity,
  Cpu,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/social-icons";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import { EveHeroCanvas } from "@/components/three/EveHeroCanvas";
import { Interactive3DPixelTypography } from "@/components/ui/Interactive3DPixelTypography";
import { Interactive3DPixelBadge } from "@/components/ui/Interactive3DPixelBadge";
import { usePortfolio } from "@/context/PortfolioContext";

export function HeroVisual({ isExiting = true }: { isExiting?: boolean }) {
  const { personal } = portfolioData;
  const { t } = usePortfolio();

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent("portfolio:toggle-chatbot"));
  };

  const handleScrollToSystems = () => {
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between bg-[#030712] text-white overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Cyber Ambient Atmosphere */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Retro Pixel Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* 2. Top Header Spacing for Fixed Global Navbar */}
      <div className="w-full pt-24 md:pt-28" />

      {/* 3. Main Hero Dual-Column Deck (NO CARDS - PURE PIXEL + TRON TYPOGRAPHY) */}
      <main className="relative z-20 flex-1 w-full max-w-[1700px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-6 md:py-12">
        {/* Left Column: Pixel + Tron Cinematic Statement (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center gap-7"
        >
          {/* Pixel Status Bar (8-bit RPG style with Interactive 3D Badges) */}
          <div className="flex flex-wrap items-center gap-3 select-none">
            <Interactive3DPixelBadge
              label="SYS: [ONLINE]"
              size="pixel-xs"
              accent="cyan"
              statusDot={true}
              dotPulse={true}
            />
            <Interactive3DPixelBadge
              label="HP: [████████] 100%"
              size="pixel-xs"
              accent="emerald"
            />
            <Interactive3DPixelBadge
              label="LVL.99 ARCHITECT"
              size="pixel-xs"
              accent="purple"
            />
            <span className="hidden sm:inline-flex items-center px-3 py-1 bg-zinc-950 border border-cyan-500/30 text-cyan-300 font-heading text-xs tracking-wider uppercase">
              {t("hero.badgeRole", "AI, Data, & Software Engineer & Researcher")}
            </span>
          </div>

          {/* Interactive 3D Pixel Headline */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2.5 items-start">
              <span className="font-heading text-xs sm:text-sm text-cyan-400 tracking-[0.25em] uppercase flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-cyan-400 animate-ping" />
                {t("hero.eyebrow", "AUTONOMOUS INTELLIGENCE SYSTEMS")}
              </span>

              <Interactive3DPixelTypography
                as="h1"
                size="pixel-4xl"
                accent="cyan"
                glow={true}
                className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[30px] lg:leading-[60px] xl:text-[32px] xl:leading-[64px]"
              >
                {t("hero.headline.1", "ARCHITECTING")}
              </Interactive3DPixelTypography>

              <Interactive3DPixelTypography
                as="h1"
                size="pixel-4xl"
                accent="cyan"
                glow={true}
                className="text-cyan-400 text-xl sm:text-2xl md:text-3xl lg:text-[30px] lg:leading-[60px] xl:text-[32px] xl:leading-[64px]"
              >
                {t("hero.headline.2", "AUTONOMOUS AI")}
              </Interactive3DPixelTypography>

              <Interactive3DPixelTypography
                as="h1"
                size="pixel-4xl"
                accent="white"
                glow={true}
                className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[30px] lg:leading-[60px] xl:text-[32px] xl:leading-[64px]"
              >
                {t("hero.headline.3", "& DISTRIBUTED SYSTEMS")}
              </Interactive3DPixelTypography>
            </div>

            <p className="font-body text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl pt-2 font-normal">
              {t(
                "hero.subtitle",
                "Engineering high-performance neural architectures across Generative Agents, Real-Time Computer Vision, continuous-action Deep Reinforcement Learning, and distributed GPU pipelines designed for scale."
              )}
            </p>
          </div>

          {/* Retro Pixel Action Buttons (Stepped 8-Bit Arcade Style) */}
          <div className="flex flex-wrap items-center gap-4 pt-4 font-display pixel-sm">
            <button
              onClick={handleScrollToSystems}
              className="px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold uppercase tracking-wider border-2 border-white shadow-[4px_4px_0px_#fff] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>&gt; {t("hero.btnExplore", "EXPLORE_SYSTEMS")}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={handleOpenChat}
              className="px-6 py-3.5 bg-black hover:bg-cyan-950/60 text-cyan-400 font-bold uppercase tracking-wider border-2 border-cyan-400 shadow-[4px_4px_0px_#00f0ff] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>{t("hero.btnEve", "TALK_TO_EVE")}</span>
            </button>

            <Link
              href="/resume"
              className="px-5 py-3.5 bg-black hover:bg-zinc-900 text-zinc-300 hover:text-white font-bold uppercase tracking-wider border-2 border-zinc-600 shadow-[4px_4px_0px_#64748b] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px] transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>{t("hero.btnCredentials", "CREDENTIALS")}</span>
            </Link>
          </div>
        </motion.div>

        {/* Right Column: 3D Robot EVE inside Retro Pixel CRT Frame (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full flex flex-col items-center justify-center min-h-[460px] md:min-h-[580px]"
        >
          {/* Retro Pixel CRT Monitor Frame */}
          <div className="absolute inset-0 bg-black/90 border-4 border-cyan-500/60 shadow-[8px_8px_0px_rgba(0,240,255,0.35)] pointer-events-none" />

          {/* Pixel Top Header Telemetry */}
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-20 pointer-events-none font-display pixel-xs">
            <div className="flex items-center gap-2 text-cyan-400 tracking-wider">
              <span className="w-2 h-2 bg-cyan-400 animate-ping" />
              <span>[EVE_CORE : v2.6]</span>
            </div>
            <div className="text-zinc-400 tracking-wider font-heading text-xs">
              [PBR 42 FPS]
            </div>
          </div>

          {/* 3D EVE Canvas Engine */}
          <div className="relative w-full h-[460px] md:h-[560px] flex items-center justify-center z-10">
            <EveHeroCanvas />
          </div>

          {/* Retro 8-bit Pixel Speech Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-4 left-4 right-4 z-20 p-4 bg-black/95 border-2 border-cyan-400 shadow-[4px_4px_0px_#00f0ff] flex items-start gap-3 pointer-events-auto cursor-pointer group"
            onClick={handleOpenChat}
            title="Click to start chatting with EVE"
          >
            <div className="w-8 h-8 bg-cyan-950 border border-cyan-400 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#00f0ff]">
              <Bot className="w-4 h-4 text-cyan-300" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between font-display pixel-xs">
                <span className="text-cyan-400 tracking-wider">
                  {t("hero.eveCopilot", "EVE NAVIGATION CO-PILOT")}
                </span>
                <span className="text-zinc-400 group-hover:text-cyan-300 transition-colors flex items-center gap-1 font-heading text-xs">
                  {t("hero.chatTrigger", "CHAT ↗")} <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <p className="font-heading text-xs sm:text-sm text-cyan-200 leading-relaxed tracking-wide">
                {t("hero.eveBubble", "> HI! I AM EVE, RAIHAN'S RESEARCH CO-PILOT. EXPLORE HIS PRODUCTION WORKFLOWS IN GEN AI, COMPUTER VISION, DEEP RL, & DISTRIBUTED SYSTEMS.")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* 4. Bottom Separator & Social Links in Pixel Font */}
      <footer className="relative z-20 w-full max-w-[1700px] mx-auto px-6 md:px-12 py-6 border-t-2 border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-heading text-xs">
        <div className="tracking-wider text-zinc-400 uppercase">
          JAKARTA &amp; BEKASI, ID &bull; 2026 &bull; RAIHAN GHIFARI WINATA [ 0xAI ]
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={personal.socialLinks.find((s) => s.platform === "GitHub")?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-cyan-400 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a
            href={personal.socialLinks.find((s) => s.platform === "LinkedIn")?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={personal.socialLinks.find((s) => s.platform === "Instagram")?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-cyan-400 transition-colors"
            aria-label="Instagram Profile"
          >
            <Instagram size={18} />
          </a>
        </div>
      </footer>
    </section>
  );
}
