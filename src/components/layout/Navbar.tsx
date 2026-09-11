"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Layers,
  Briefcase,
  Cpu,
  Image as ImageIcon,
  Award,
  FileText,
  BookOpen,
  HeartPulse,
  Globe,
  Sun,
  Moon,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/context/PortfolioContext";

export interface NavSubItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: any;
  tag: string;
  accent: string;
  accentVar: string;
  previewTitle: string;
  previewDesc: string;
  previewMetric: string;
}

export const ABOUT_SUB_PAGES: NavSubItem[] = [
  {
    id: "portfolio",
    title: "Portfolio",
    subtitle: "Production AI & Systems Deployments",
    href: "/projects",
    icon: Layers,
    tag: "DEPLOYMENTS",
    accent: "#00f0ff",
    accentVar: "var(--neon-cyan)",
    previewTitle: "Safe-RL MIMIC-III Policy Ensembles",
    previewDesc:
      "Continuous Soft Actor-Critic (SAC) models with Lagrangian safety bounds on 20,913 ICU sepsis trajectories.",
    previewMetric: "75.31% SURVIVAL RATE",
  },
  {
    id: "experience",
    title: "Experience",
    subtitle: "Research Lab & Industry Leadership",
    href: "/experience",
    icon: Briefcase,
    tag: "RESEARCH LABS",
    accent: "#00ff66",
    accentVar: "var(--neon-emerald)",
    previewTitle: "Cyber Physical AI & Laboratory Lead",
    previewDesc:
      "Directing deep learning research, mentoring 100+ students, and architecting distributed MLOps pipelines.",
    previewMetric: "10X TRAINING SPEEDUP",
  },
  {
    id: "skills",
    title: "Skills",
    subtitle: "Deep RL & High-Throughput CUDA",
    href: "/skills",
    icon: Cpu,
    tag: "ARCHITECTURE",
    accent: "#38bdf8",
    accentVar: "var(--neon-sky)",
    previewTitle: "CUDA, PyTorch & Distributed Systems",
    previewDesc:
      "Low-latency tensor pipelines, Docker containerization, FastAPI endpoints, and hybrid vector indexing.",
    previewMetric: "CUDA • PYTORCH • FASTAPI",
  },
  {
    id: "biography",
    title: "Biography",
    subtitle: "Research Philosophy & Clinical Thesis",
    href: "/about",
    icon: HeartPulse,
    tag: "PHILOSOPHY",
    accent: "#c084fc",
    accentVar: "var(--neon-violet)",
    previewTitle: "Engineering Rigorous Intelligence",
    previewDesc:
      "Bridging mathematical control theory, reinforcement learning safety corridors, and production-scale MLOps.",
    previewMetric: "CLINICAL SAFETY BOUNDS",
  },
  {
    id: "gallery",
    title: "Gallery",
    subtitle: "Visual Research & 28 Verified Artifacts",
    href: "/gallery",
    icon: ImageIcon,
    tag: "ARCHIVES",
    accent: "#f59e0b",
    accentVar: "var(--neon-amber)",
    previewTitle: "Visual Research & Lab Archives",
    previewDesc:
      "Photographic documentation of Deep RL experiments, PRAGMA hackathons, DANA fintech, and faculty mentoring.",
    previewMetric: "28 VERIFIED ARTIFACTS",
  },
  {
    id: "achievements",
    title: "Achievements",
    subtitle: "PRAGMA Hackathon Winner & AWS Honors",
    href: "/achievements",
    icon: Award,
    tag: "HONORS",
    accent: "#eab308",
    accentVar: "var(--neon-yellow)",
    previewTitle: "PRAGMA Collaborative Hackathon Winner",
    previewDesc:
      "International AI competition champion (Thammasat, UCSD, Osaka) and certified AWS cloud practitioner.",
    previewMetric: "1ST PLACE TEAMWORK AWARD",
  },
  {
    id: "resume",
    title: "Resume",
    subtitle: "Curriculum Vitae & Distinctions",
    href: "/resume",
    icon: FileText,
    tag: "CREDENTIALS",
    accent: "#06b6d4",
    accentVar: "var(--neon-cyan-600)",
    previewTitle: "Academic & Professional CV",
    previewDesc:
      "Bachelor of Computer Science, Universitas YARSI with CGPA 3.92/4.00 (Highest Distinction).",
    previewMetric: "CGPA 3.92 • DISTINCTION",
  },
  {
    id: "blog",
    title: "Blog",
    subtitle: "Neural Archive Technical Publications",
    href: "/#publications",
    icon: BookOpen,
    tag: "PUBLICATIONS",
    accent: "#f43f5e",
    accentVar: "var(--neon-rose)",
    previewTitle: "Neural Archive Publications",
    previewDesc:
      "In-depth research papers, Decision Transformer benchmarks, and mathematical derivations of safe RL.",
    previewMetric: "6 PEER PUBLICATIONS",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, toggleTheme, isDark, t } = usePortfolio();

  const [scrollState, setScrollState] = useState<"top" | "scrolling-up" | "hidden">("top");
  const [isHovered, setIsHovered] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string>(ABOUT_SUB_PAGES[0].id);

  // Dynamic translated sub-pages
  const dynamicSubPages: NavSubItem[] = React.useMemo(() => {
    return ABOUT_SUB_PAGES.map((item) => ({
      ...item,
      title: t(`nav.sub.${item.id}.title`, item.title),
      subtitle: t(`nav.sub.${item.id}.subtitle`, item.subtitle),
      tag: t(`nav.sub.${item.id}.tag`, item.tag),
      previewTitle: t(`nav.sub.${item.id}.previewTitle`, item.previewTitle),
      previewDesc: t(`nav.sub.${item.id}.previewDesc`, item.previewDesc),
      previewMetric: t(`nav.sub.${item.id}.previewMetric`, item.previewMetric),
    }));
  }, [t, language]);

  const [activePreview, setActivePreview] = useState<NavSubItem>(dynamicSubPages[0]);

  // Keep activePreview updated on language toggle or hover changes
  useEffect(() => {
    const current = dynamicSubPages.find((p) => p.id === hoveredItemId) || dynamicSubPages[0];
    setActivePreview(current);
  }, [dynamicSubPages, hoveredItemId]);

  // References for scroll tracking and debounce
  const lastScrollYRef = useRef(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);
  const aboutOpenRef = useRef(false);

  useEffect(() => {
    isHoveredRef.current = isHovered;
    aboutOpenRef.current = aboutOpen;
  }, [isHovered, aboutOpen]);

  // Dynamic Scroll Physics:
  // Scroll Down -> Hidden
  // Scroll Up -> Low Opacity (0.65)
  // Idle after scroll-up (~1.8s) -> Fades out
  // Hover / Open Dropdown -> Opacity 1.0 (freeze timer)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      // 1. At Top of Page
      if (currentScrollY < 40) {
        setScrollState("top");
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      // 2. Scrolling Down
      if (delta > 4) {
        if (!isHoveredRef.current && !aboutOpenRef.current) {
          setScrollState("hidden");
        }
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      }
      // 3. Scrolling Up
      else if (delta < -4) {
        setScrollState("scrolling-up");

        // Reset and start idle auto-fade timer
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          if (!isHoveredRef.current && !aboutOpenRef.current && window.scrollY >= 40) {
            setScrollState("hidden");
          }
        }, 1800);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Dropdown hover bridges
  const handleMouseEnterAbout = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setAboutOpen(true);
  };

  const handleMouseLeaveAbout = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setAboutOpen(false);
    }, 200);
  };

  // Header Opacity Calculation
  const isSolid = scrollState === "top" || isHovered || aboutOpen;
  const headerOpacity = scrollState === "hidden" ? 0 : isSolid ? 1 : 0.65;
  const headerY = scrollState === "hidden" ? -90 : 0;

  return (
    <motion.header
      animate={{ y: headerY, opacity: headerOpacity }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (scrollState === "scrolling-up" && !aboutOpen) {
          if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
          idleTimerRef.current = setTimeout(() => {
            if (window.scrollY >= 40) setScrollState("hidden");
          }, 1800);
        }
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 pointer-events-auto",
        scrollState !== "top"
          ? "py-3 bg-zinc-950/80 dark:bg-[#030712]/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* 1. Tron Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-lg bg-zinc-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-pixel text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all">
            <span className="relative z-10">RG</span>
            <div className="absolute inset-0 bg-cyan-400/10 rounded-lg blur-sm" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[9.5px] tracking-wider text-white uppercase group-hover:text-cyan-300 transition-colors">
                RAIHAN GHIFARI
              </span>
              <span className="hidden sm:inline-block font-mono text-[9px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                [0xAI]
              </span>
            </div>
            <span className="font-heading text-[11px] text-zinc-400 tracking-wider uppercase">
              {t("nav.roleBadge", "AI, Data & Systems Researcher")}
            </span>
          </div>
        </Link>

        {/* 2. Center Pill Navigation Deck (Aave Style) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-zinc-950/80 dark:bg-[#040916]/90 border border-cyan-500/30 backdrop-blur-2xl px-2.5 py-1.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          {/* Home Link */}
          <Link
            href="/"
            className={cn(
              "px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all duration-200",
              pathname === "/"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                : "text-zinc-300 hover:text-white hover:bg-white/5"
            )}
          >
            {t("nav.home", "Home")}
          </Link>

          {/* About Mega-Menu Trigger (Aave Style Morphing Dropdown) */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterAbout}
            onMouseLeave={handleMouseLeaveAbout}
          >
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className={cn(
                "flex items-center gap-1.5 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer",
                aboutOpen || pathname !== "/"
                  ? "text-cyan-300 bg-white/5"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              )}
            >
              <span>{t("nav.about", "About")}</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200 text-cyan-400",
                  aboutOpen ? "rotate-180" : ""
                )}
              />
            </button>

            {/* Invisible hover bridge to prevent mouse-leave flicker */}
            <div className="absolute top-full left-0 right-0 h-4" />

            {/* Aave-Style Morphing Dropdown Card */}
            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ type: "spring", damping: 24, stiffness: 320 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[840px] max-w-[95vw] bg-[#030916]/95 dark:bg-[#030916]/95 backdrop-blur-3xl border border-cyan-500/40 rounded-3xl p-6 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(0,240,255,0.15)] text-white z-50 pointer-events-auto overflow-hidden"
                >
                  {/* Subtle Tron Laser Header Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(0,240,255,0.8)]" />

                  {/* Header Directive Bar */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-cyan-500/20 mb-4 text-[9.5px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
                      <span className="font-pixel text-cyan-400 tracking-wider uppercase">
                        {t("nav.directoryArchives", "[ DIRECTORY ARCHIVES ]")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <span>{t("nav.statusOnline", "STATUS: ONLINE")}</span>
                      <span className="text-cyan-300 font-bold">{t("nav.port", "PORT 443")}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6 items-stretch">
                    {/* Left Column: Sub-pages with Sliding Highlight (7 cols) */}
                    <div className="col-span-7 flex flex-col gap-1 relative">
                      {dynamicSubPages.map((item) => {
                        const Icon = item.icon;
                        const isHoveredItem = hoveredItemId === item.id;
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            onMouseEnter={() => {
                              setHoveredItemId(item.id);
                              setActivePreview(item);
                            }}
                            className="group/item relative flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200"
                          >
                            {/* Sliding Gliding Pill Highlight (Aave style) */}
                            {isHoveredItem && (
                              <motion.div
                                layoutId="navItemHoverHighlight"
                                className="absolute inset-0 rounded-xl bg-cyan-950/40 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.15)] -z-10"
                                transition={{ type: "spring", stiffness: 450, damping: 32 }}
                              />
                            )}

                            <div className="flex items-center gap-3.5">
                              {/* Icon */}
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover/item:scale-105"
                                style={{
                                  backgroundColor: `color-mix(in srgb, ${item.accentVar} 15%, transparent)`,
                                  borderColor: `color-mix(in srgb, ${item.accentVar} 50%, transparent)`,
                                  color: item.accentVar,
                                }}
                              >
                                <Icon className="w-4 h-4" />
                              </div>

                              {/* Titles */}
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-heading text-xs font-bold text-white group-hover/item:text-cyan-300 transition-colors">
                                    {item.title}
                                  </span>
                                  <span
                                    className="text-[8px] font-mono px-1 py-0.2 rounded border font-semibold"
                                    style={{
                                      backgroundColor: `color-mix(in srgb, ${item.accentVar} 15%, transparent)`,
                                      borderColor: `color-mix(in srgb, ${item.accentVar} 40%, transparent)`,
                                      color: item.accentVar,
                                    }}
                                  >
                                    {item.tag}
                                  </span>
                                </div>
                                <span className="font-body text-[11px] text-zinc-400 truncate mt-0.5">
                                  {item.subtitle}
                                </span>
                              </div>
                            </div>

                            <ArrowRight
                              className={cn(
                                "w-3.5 h-3.5 transition-all duration-200",
                                isHoveredItem
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-2 text-zinc-500"
                              )}
                              style={{ color: item.accentVar }}
                            />
                          </Link>
                        );
                      })}
                    </div>

                    {/* Right Column: Dynamic Holographic Cyber Preview Card (5 cols) */}
                    <div className="col-span-5 relative rounded-2xl bg-gradient-to-b from-[#06142a]/90 via-[#030914] to-black border border-cyan-500/40 p-5 flex flex-col justify-between overflow-hidden shadow-xl">
                      {/* Ambient Grid Pattern */}
                      <div
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(0,240,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.4) 1px, transparent 1px)",
                          backgroundSize: "18px 18px",
                        }}
                      />

                      {/* Corner Tabs */}
                      <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400" />
                      <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-400" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-400" />

                      {/* Header with Live Signal */}
                      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5" style={{ color: activePreview.accentVar }} />
                          <span
                            className="font-heading text-[11px] font-bold tracking-widest uppercase"
                            style={{ color: activePreview.accentVar }}
                          >
                            SYSTEM PREVIEW
                          </span>
                        </div>
                        <span className="relative flex h-2 w-2">
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ backgroundColor: activePreview.accentVar }}
                          />
                          <span
                            className="relative inline-flex rounded-full h-2 w-2"
                            style={{ backgroundColor: activePreview.accentVar }}
                          />
                        </span>
                      </div>

                      {/* Dynamic Abstract Cyber Vector Pattern (Aave Video Morph Effect) */}
                      <div className="relative z-10 my-3 flex items-center justify-center h-28 overflow-hidden rounded-xl bg-black/40 border border-white/5">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activePreview.id}
                            initial={{ scale: 0.85, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.85, opacity: 0, rotate: 10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center gap-2"
                          >
                            {/* Animated Concentric Rings / Geometry */}
                            <div className="relative w-16 h-16 flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border border-dashed"
                                style={{ borderColor: `color-mix(in srgb, ${activePreview.accentVar} 60%, transparent)` }}
                              />
                              <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 rounded-full border"
                                style={{ borderColor: `color-mix(in srgb, ${activePreview.accentVar} 40%, transparent)` }}
                              />
                              <div
                                className="w-9 h-9 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundColor: `color-mix(in srgb, ${activePreview.accentVar} 25%, transparent)`,
                                  boxShadow: `0 0 15px color-mix(in srgb, ${activePreview.accentVar} 50%, transparent)`,
                                  color: activePreview.accentVar,
                                }}
                              >
                                <activePreview.icon className="w-5 h-5" />
                              </div>
                            </div>

                            <span
                              className="font-pixel text-[8px] tracking-wider uppercase"
                              style={{ color: activePreview.accentVar }}
                            >
                              {activePreview.tag}
                            </span>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Dynamic Content Details */}
                      <div className="relative z-10 space-y-1.5">
                        <span
                          className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full inline-block border"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${activePreview.accentVar} 15%, transparent)`,
                            borderColor: `color-mix(in srgb, ${activePreview.accentVar} 40%, transparent)`,
                            color: activePreview.accentVar,
                          }}
                        >
                          {activePreview.previewMetric}
                        </span>
                        <h5 className="text-sm font-bold text-white font-heading leading-tight truncate">
                          {activePreview.previewTitle}
                        </h5>
                        <p className="text-[11px] text-zinc-300 leading-relaxed font-body line-clamp-2">
                          {activePreview.previewDesc}
                        </p>
                      </div>

                      {/* Bottom Direct Link Button */}
                      <div className="relative z-10 pt-3 mt-3 border-t border-white/10">
                        <Link
                          href={activePreview.href}
                          className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-mono font-bold text-xs transition-all shadow-lg group/btn cursor-pointer"
                          style={{
                            backgroundColor: activePreview.accentVar,
                            color: "var(--neon-ink)",
                            boxShadow: `0 0 20px color-mix(in srgb, ${activePreview.accentVar} 60%, transparent)`,
                          }}
                        >
                          <span>{t("nav.exploreAction", "Explore")} {activePreview.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Link */}
          <Link
            href="/contact"
            className={cn(
              "px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all duration-200",
              pathname === "/contact"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                : "text-zinc-300 hover:text-white hover:bg-white/5"
            )}
          >
            {t("nav.contact", "Contact")}
          </Link>
        </nav>

        {/* 3. Action Deck (Far Right): Language Toggle + Theme Toggle */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Language Switcher Button (ID / EN) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.04] hover:bg-cyan-500/15 border border-slate-200 dark:border-cyan-500/30 hover:border-cyan-500 text-cyan-700 dark:text-cyan-300 font-mono text-[11px] font-bold tracking-wider transition-all shadow-sm dark:shadow-[0_0_12px_rgba(0,240,255,0.1)] cursor-pointer"
            title="Switch Language (ID / EN)"
            aria-label="Switch Language between English and Indonesian"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Theme Switcher Button (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer",
              isDark
                ? "bg-white/[0.04] hover:bg-amber-500/15 border border-amber-500/30 hover:border-amber-400/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                : "bg-slate-100 hover:bg-cyan-500/15 border border-cyan-600/40 hover:border-cyan-600 text-cyan-800 shadow-sm"
            )}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme between Dark and Light"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-800 transition-transform hover:-rotate-12" />
            )}
          </button>
        </div>

        {/* 4. Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold cursor-pointer"
          >
            {language.toUpperCase()}
          </button>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-1.5 rounded-full transition-all cursor-pointer",
              isDark
                ? "bg-white/[0.05] border border-amber-500/30 text-amber-300"
                : "bg-slate-100 border border-cyan-600/40 text-cyan-800"
            )}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme between Dark and Light"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-cyan-800" />}
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-zinc-400 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Accordion Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#030712]/95 border-b border-cyan-500/30 px-6 py-6 flex flex-col gap-4 backdrop-blur-3xl md:hidden text-white pointer-events-auto shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-base font-mono font-bold text-white hover:text-cyan-400"
            >
              {t("nav.home", "Home")}
            </Link>

            <div className="border-t border-white/10 pt-3">
              <span className="text-[10px] font-pixel text-cyan-400 uppercase tracking-widest block mb-3">
                {t("nav.mobileAbout", "[ ABOUT DIRECTORY ]")}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {dynamicSubPages.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/[0.03] hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/30 transition-colors"
                    >
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${item.accentVar} 15%, transparent)`,
                          color: item.accentVar,
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-white leading-tight">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 truncate">
                          {item.subtitle}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/10 pt-3">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-heading font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                <span>{t("nav.mobileContact", "Initiate Contact")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
