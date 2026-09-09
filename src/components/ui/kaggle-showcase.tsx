"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Maximize2,
  Minimize2,
  Database,
  Code2,
  Brain,
  MessageSquare,
  Trophy,
  ArrowRight,
  Clock,
  Layout,
  Users,
  TrendingUp,
  Star,
  Shield,
  ShieldCheck,
  Rocket,
  Terminal,
  Feather,
  FileCode,
  Cat,
  Tag,
  Layers,
  Calendar,
  Link as LinkIcon,
  Flame,
  Fingerprint,
  Book,
  GraduationCap,
  Moon,
  Check,
  ExternalLink
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { usePortfolio } from "@/context/PortfolioContext";

const KAGGLE_USER = "ghifariwinata";

const BADGE_ICONS: Record<string, any> = {
  Shield,
  ShieldCheck,
  Trophy,
  Rocket,
  Terminal,
  Layers,
  Brain,
  Users,
  Calendar,
  Activity,
  Code2,
  Star
};

const CyberHexagonBadge = ({ color, iconName }: { color: string, iconName?: string }) => {
  const Icon = (iconName && BADGE_ICONS[iconName]) ? BADGE_ICONS[iconName] : Trophy;
  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0 group/badge">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_currentColor] transition-transform duration-200 group-hover/badge:scale-110" style={{ color }}>
        <polygon
          points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
          fill="#040814"
          stroke={color}
          strokeWidth="4"
        />
        <polygon
          points="33,14 67,14 86,33 86,67 67,86 33,86 14,67 14,33"
          fill={color}
          fillOpacity="0.18"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
      </svg>
      <Icon className="relative z-10 text-white w-4 h-4 drop-shadow-[0_0_4px_#fff]" strokeWidth={2.5} />
    </div>
  );
};

const HexagonBadge = CyberHexagonBadge;

const Counter = ({ value, duration = 1.5, trigger = true }: { value: string | number, duration?: number, trigger?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const targetValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) || 0 : value;

  useEffect(() => {
    if (isInView && trigger && targetValue > 0) {
      const controls = animate(0, targetValue, {
        duration,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut"
      });
      return () => controls.stop();
    } else {
      setCount(targetValue);
    }
  }, [isInView, trigger, targetValue, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {typeof value === 'string' && value.includes('+') ? '+' : ''}
    </span>
  );
};

export const KaggleShowcase = () => {
  const { isIndonesian } = usePortfolio();
  const isId = isIndonesian;
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const lenis = useLenis();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredBadge) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredBadge]);

  useEffect(() => {
    if (isExpanded) {
      if (lenis) lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isExpanded, lenis]);

  const [data, setData] = useState<any>({
    user: "ghifariwinata",
    displayName: "Ghifari Winata",
    stats: { notebooks: 7, models: 1, competitions: 1, datasets: 0, badgesCount: 9 },
    badges: [],
    notebooks: [],
    models: [],
    competitions: [],
    datasets: [],
    activity: []
  });

  const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const response = await fetch('/api/kaggle-stats');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch Kaggle stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!mounted) return null;

  const badges = data?.badges || [];

  return (
    <section id='kaggle-stats' className='w-full max-w-[1700px] mx-auto px-4 md:px-6 py-4 md:py-6'>
      <motion.div
        layout
        transition={springTransition}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={() => !isExpanded && setIsExpanded(true)}
        className={cn(
          "relative bg-[#040814]/95 border-2 border-[#00f0ff]/40 backdrop-blur-2xl overflow-hidden transition-all duration-700",
          "hover:border-[#00f0ff] hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] group/kaggle cursor-pointer",
          "cyber-chamfer-cyan cyber-scanlines tron-grid-bg",
          isExpanded ? "p-6 md:p-12" : "p-8 md:p-12"
        )}
      >
        {/* Ambient Tron Cyan Glow */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#00f0ff]/8 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40 animate-circuit-pulse" />

        {/* Cyberpunk HUD Corner Telemetry Brackets */}
        <div className="absolute top-3 left-6 font-mono text-[10px] text-[#00f0ff]/70 tracking-widest pointer-events-none hidden sm:flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-[#00f0ff] animate-ping" />
          <span>{isId ? "JARINGAN MACHINE LEARNING KAGGLE" : "KAGGLE INTELLIGENCE"}</span>
        </div>
        <div className="absolute top-3 right-20 font-mono text-[10px] text-[#00f0ff]/60 tracking-widest pointer-events-none hidden md:block">
          {isId ? "STATUS: TERSINKRONISASI" : "STATUS: SYNCHRONIZED"}
        </div>
        <div className="absolute bottom-3 left-6 font-mono text-[9px] text-[#00f0ff]/50 tracking-wider pointer-events-none hidden sm:block">
          COMPFEST 18: RANK #25 (TOP 12%)
        </div>
        <div className="absolute bottom-3 right-6 font-mono text-[9px] text-[#00f0ff]/50 tracking-wider pointer-events-none hidden sm:block">
          TF2 RESNET-50 ARCHITECTURE
        </div>

        {/* Expand / Minimize Button */}
        <motion.button
          layout
          onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-6 right-6 z-50 px-3.5 py-2 bg-[#050c1b] border-2 border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-pixel text-[10px] tracking-wider transition-all shadow-[3px_3px_0px_#00f0ff] cursor-pointer"
        >
          {isExpanded ? (isId ? "[- KONSOL]" : "[- DECK]") : (isId ? "[+ KONSOL]" : "[+ DECK]")}
        </motion.button>

        <motion.div layout className='flex flex-col md:flex-row items-start justify-between w-full gap-8 relative z-10 pt-4 sm:pt-2'>
          <motion.div layout className="space-y-6 max-w-2xl">
            <motion.div layout className="flex items-center gap-3 text-[#00f0ff]">
              <Activity className="w-7 h-7 text-[#00f0ff]" />
              <span className="font-pixel text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                {isId ? "EKOSISTEM KAGGLE" : "KAGGLE INTELLIGENCE"}
              </span>
            </motion.div>

            <motion.h2 layout className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[0.95em] text-white uppercase">
              {loading ? (isId ? "MENGHUBUNGKAN KE API KAGGLE..." : "CONNECTING TO KAGGLE API...") : (
                <>
                  MACHINE LEARNING <br />
                  <span className="text-[#00f0ff] font-pixel text-xl sm:text-2xl md:text-3xl block mt-2 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                    {isId ? "NOTEBOOK & BENCHMARK" : "NOTEBOOKS & BENCHMARKS"}
                  </span>
                </>
              )}
            </motion.h2>

            <motion.div layout className='flex flex-wrap gap-4 sm:gap-6 items-center pt-2'>
              {/* Notebooks */}
              <div className="bg-[#02050f] border-2 border-[#00f0ff]/40 p-3 sm:p-4 shadow-[0_0_15px_rgba(0,240,255,0.08)] relative">
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00f0ff]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00f0ff]" />
                <span className="font-pixel text-xl sm:text-2xl font-black text-[#00f0ff] tracking-wider drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                  <Counter value={data?.stats?.notebooks ?? 7} trigger={!loading} />
                </span>
                <span className="font-pixel text-[8px] sm:text-[9px] uppercase text-zinc-400 block mt-1 tracking-wider">
                  {isId ? "[ NOTEBOOK ]" : "[ NOTEBOOKS ]"}
                </span>
              </div>

              {/* Competitions */}
              <div className="bg-[#02050f] border-2 border-[#00f0ff]/40 p-3 sm:p-4 shadow-[0_0_15px_rgba(0,240,255,0.08)] relative">
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00f0ff]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00f0ff]" />
                <span className="font-pixel text-xl sm:text-2xl font-black text-[#00f0ff] tracking-wider drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                  <Counter value={data?.stats?.competitions ?? 3} trigger={!loading} />
                </span>
                <span className="font-pixel text-[8px] sm:text-[9px] uppercase text-zinc-400 block mt-1 tracking-wider">
                  {isId ? "[ KOMPETISI ]" : "[ COMPETITIONS ]"}
                </span>
              </div>

              {/* Model Hub */}
              <div className="bg-[#02050f] border-2 border-[#00f0ff]/40 p-3 sm:p-4 shadow-[0_0_15px_rgba(0,240,255,0.08)] relative">
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00f0ff]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00f0ff]" />
                <span className="font-pixel text-xl sm:text-2xl font-black text-[#00f0ff] tracking-wider drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                  <Counter value={data?.stats?.models ?? 1} trigger={!loading} />
                </span>
                <span className="font-pixel text-[8px] sm:text-[9px] uppercase text-zinc-400 block mt-1 tracking-wider">
                  {isId ? "[ HUB MODEL ]" : "[ MODEL HUB ]"}
                </span>
              </div>

              {/* Earned Badges */}
              <div className="bg-[#02050f] border-2 border-[#00f0ff]/40 p-3 sm:p-4 shadow-[0_0_15px_rgba(0,240,255,0.08)] relative">
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00f0ff]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00f0ff]" />
                <span className="font-pixel text-xl sm:text-2xl font-black text-[#00f0ff] tracking-wider drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                  <Counter value={data?.stats?.badgesCount ?? 9} trigger={!loading} />
                </span>
                <span className="font-pixel text-[8px] sm:text-[9px] uppercase text-zinc-400 block mt-1 tracking-wider">
                  {isId ? "[ LENCANA DIRAIH ]" : "[ EARNED BADGES ]"}
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div className="max-w-sm flex flex-col justify-between pt-4 md:pt-14">
            <motion.p layout className='font-mono text-sm md:text-base text-zinc-300 leading-relaxed border-l-2 border-[#00f0ff]/40 pl-3'>
              {isId
                ? "Profil machine learning terverifikasi dari API Kaggle. Notebook yang dipublikasikan, model deep learning, peringkat kompetisi, dan lencana komunitas."
                : "Verified machine learning profile from the Kaggle API. Published notebooks, deep learning models, competition rankings, and community badges."}
            </motion.p>
            <div className="mt-5 flex items-center gap-2.5 px-3.5 py-2 bg-[#050c1b] border border-[#00f0ff]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)] w-fit">
              <span className="w-2 h-2 bg-[#00f0ff] animate-ping" />
              <span className="font-pixel text-[9px] text-[#00f0ff]">
                @{data?.user || KAGGLE_USER} • {data?.displayName || "Ghifari Winata"}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Fullscreen Cyberpunk Mainframe Terminal Deck Modal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] bg-[#02050e]/90 backdrop-blur-xl overflow-y-auto p-3 sm:p-6 md:p-8"
              onClick={() => setIsExpanded(false)}
              data-lenis-prevent
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={springTransition}
                className="relative w-full max-w-[1600px] mx-auto my-4 bg-[#050914] border-2 border-[#00f0ff] shadow-[0_0_50px_rgba(0,240,255,0.3)] p-5 sm:p-8 md:p-12 overflow-hidden cyber-scanlines tron-grid-bg"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-6 right-6 z-50 px-4 py-2 bg-[#00f0ff] text-black font-pixel text-xs tracking-wider transition-all shadow-[3px_3px_0px_#fff] cursor-pointer"
                >
                  {isId ? "[✕ TUTUP KONSOL]" : "[✕ CLOSE DECK]"}
                </motion.button>

                <div className='flex flex-col md:flex-row items-start justify-between w-full gap-6 mb-8 border-b-2 border-[#00f0ff]/20 pb-6'>
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-3 text-[#00f0ff]">
                      <Activity className="w-7 h-7" />
                      <span className="font-pixel text-xs tracking-[0.25em] uppercase text-[#00f0ff]">
                        {isId ? "KARYA & PRESTASI KAGGLE" : "KAGGLE WORK & ACHIEVEMENTS"}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black font-heading text-white tracking-tight uppercase">
                      {isId ? "PROFIL KAGGLE TERVERIFIKASI:" : "VERIFIED KAGGLE PROFILE:"} <span className="text-[#00f0ff] font-pixel text-xl md:text-2xl">@{data?.user || KAGGLE_USER}</span>
                    </h2>
                    <p className="text-zinc-400 text-xs font-mono">
                      {isId
                        ? `[ PERINGKAT #25 COMPFEST 18 • PENERBIT MODEL TF2 • 9 LENCANA OTENTIK ]`
                        : `[ COMPFEST 18 RANK #25 • TF2 MODEL PUBLISHER • 9 AUTHENTIC BADGES ]`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* 1. Verified Notebooks */}
                  <div className="lg:col-span-2 bg-[#02050f] border-2 border-[#00f0ff]/30 p-4 sm:p-6 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                    <div className="flex items-center justify-between mb-4 border-b border-[#00f0ff]/20 pb-3">
                      <div className="flex items-center gap-2 text-white">
                        <FileCode className="w-5 h-5 text-[#00f0ff]" />
                        <h3 className="font-pixel text-xs text-[#00f0ff] uppercase tracking-wider">
                          {isId
                            ? `NOTEBOOK TERPUBLIKASI (${data?.notebooks?.length || 7})`
                            : `PUBLISHED NOTEBOOKS (${data?.notebooks?.length || 7})`}
                        </h3>
                      </div>
                      <span className="font-pixel text-[9px] text-[#00f0ff] px-2.5 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/40">
                        {isId ? "ALIRAN API LANGSUNG" : "LIVE API STREAM"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[420px] overflow-y-auto pr-1">
                      {(data.notebooks || []).map((item: any, i: number) => (
                        <a
                          key={i}
                          href={item.url || `https://www.kaggle.com/code/${item.ref}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-[#050c1b] border border-[#00f0ff]/30 flex flex-col gap-2 group/item transition-all duration-300 hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-pixel text-[8px] uppercase tracking-wider px-2 py-0.5 bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40">
                              {item.category || "NOTEBOOK"}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500">{item.updated}</span>
                          </div>
                          <h4 className="font-mono text-sm font-bold text-white group-hover/item:text-[#00f0ff] transition-colors line-clamp-1 flex items-center justify-between">
                            <span>{item.title}</span>
                            <ExternalLink size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[#00f0ff]" />
                          </h4>
                          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 pt-1 border-t border-white/5">
                            <span className="flex items-center gap-1 text-amber-400"><Star size={11} /> {item.votes || 0} Upvotes</span>
                            <span className="text-zinc-500 ml-auto">{item.author || "Ghifari Winata"}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* 2. Adaptive Authentic Badges (9 Badges) */}
                  <div className="bg-[#02050f] border-2 border-[#00f0ff]/30 p-4 sm:p-6 flex flex-col shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                    <div className="flex items-center justify-between mb-4 border-b border-[#00f0ff]/20 pb-3">
                      <div className="flex items-center gap-2 text-white">
                        <Trophy className="w-5 h-5 text-amber-400" />
                        <h3 className="font-pixel text-xs text-white uppercase tracking-wider">
                          {isId ? `LENCANA DIRAIH (${badges.length})` : `EARNED BADGES (${badges.length})`}
                        </h3>
                      </div>
                      <span className="font-pixel text-[9px] text-amber-400">
                        {isId ? "OTENTIK" : "AUTHENTIC"}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-y-4 gap-x-2 place-items-center flex-1">
                      {badges.map((ach: any, i: number) => (
                        <div
                          key={i}
                          className="relative cursor-pointer transition-transform hover:scale-115 duration-200 flex flex-col items-center gap-1.5"
                          onMouseEnter={(e) => {
                            setHoveredBadge(ach);
                            setMousePos({ x: e.clientX, y: e.clientY });
                          }}
                          onMouseLeave={() => setHoveredBadge(null)}
                        >
                          <HexagonBadge color={ach.color} iconName={ach.icon} />
                          <span className="font-pixel text-[8px] text-zinc-300 text-center line-clamp-1 max-w-[75px] mt-1">
                            {ach.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Competitions & Standings */}
                  <div className="bg-[#02050f] border-2 border-purple-500/40 p-4 sm:p-6 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                    <div className="flex items-center justify-between mb-4 border-b border-purple-500/20 pb-3">
                      <div className="flex items-center gap-2 text-white">
                        <Trophy className="w-5 h-5 text-purple-400" />
                        <h3 className="font-pixel text-xs text-purple-400 uppercase tracking-wider">
                          {isId ? `KOMPETISI (${data?.competitions?.length || 1})` : `COMPETITIONS (${data?.competitions?.length || 1})`}
                        </h3>
                      </div>
                      <span className="font-pixel text-[9px] text-purple-400">
                        {isId ? "TEROTENTIKASI" : "AUTHENTICATED"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {(data.competitions || []).map((comp: any, i: number) => (
                        <a
                          key={i}
                          href={comp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 bg-[#050c1b] border border-purple-500/30 flex flex-col gap-1.5 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all group/comp"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-pixel text-[8px] text-purple-300 bg-purple-500/20 px-2 py-0.5 border border-purple-500/40">
                              {comp.type}
                            </span>
                            <span className="font-pixel text-[10px] text-emerald-400 font-bold">
                              {comp.userRank ? `RANK #${comp.userRank}` : comp.time}
                            </span>
                          </div>
                          <h4 className="font-mono text-sm font-bold text-white line-clamp-1 group-hover/comp:text-purple-300 transition-colors flex items-center justify-between">
                            <span>{comp.title}</span>
                            <ExternalLink size={12} className="opacity-0 group-hover/comp:opacity-100 transition-opacity" />
                          </h4>
                          <p className="text-xs text-zinc-400 font-mono line-clamp-1">{comp.msg}</p>
                          <div className="text-[10px] font-mono text-zinc-500 mt-1 flex justify-between border-t border-white/5 pt-1">
                            <span>TEAMS: {comp.teams}</span>
                            <span>METRIC: {comp.metric}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* 4. Model Hub */}
                  <div className="bg-[#02050f] border-2 border-emerald-500/40 p-4 sm:p-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <div className="flex items-center justify-between mb-4 border-b border-emerald-500/20 pb-3">
                      <div className="flex items-center gap-2 text-white">
                        <Brain className="w-5 h-5 text-emerald-400" />
                        <h3 className="font-pixel text-xs text-emerald-400 uppercase tracking-wider">
                          {isId ? `HUB MODEL (${data?.models?.length || 1})` : `MODEL HUB (${data?.models?.length || 1})`}
                        </h3>
                      </div>
                      <span className="font-pixel text-[9px] text-emerald-400">
                        {isId ? "DITERBITKAN" : "PUBLISHED"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {(data.models || []).map((m: any, i: number) => (
                        <a
                          key={i}
                          href={m.url || `https://www.kaggle.com/models/${m.ref}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 bg-[#050c1b] border border-emerald-500/30 flex flex-col gap-2 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all group/model"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-pixel text-[8px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 border border-emerald-500/40">
                              {m.category}
                            </span>
                            <span className="text-xs font-mono text-zinc-500">{m.updated}</span>
                          </div>
                          <h4 className="font-mono text-sm font-bold text-white group-hover/model:text-emerald-400 transition-colors flex items-center justify-between">
                            <span>{m.title}</span>
                            <ExternalLink size={12} className="opacity-0 group-hover/model:opacity-100 transition-opacity" />
                          </h4>
                          <p className="text-xs text-zinc-400 font-mono">{m.description || "Fine-Tunable Deep Learning Architecture"}</p>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* 5. Production Milestones */}
                  <div className="bg-[#02050f] border-2 border-amber-500/40 p-4 sm:p-6 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                    <div className="flex items-center justify-between mb-4 border-b border-amber-500/20 pb-3">
                      <div className="flex items-center gap-2 text-white">
                        <Activity className="w-5 h-5 text-amber-400" />
                        <h3 className="font-pixel text-xs text-amber-400 uppercase tracking-wider">
                          {isId ? "LOG AKTIVITAS" : "ACTIVITY LOG"}
                        </h3>
                      </div>
                      <span className="font-pixel text-[9px] text-amber-400">
                        {isId ? "OTENTIK" : "AUTHENTIC"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {(data.activity || []).map((act: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#050c1b] border border-amber-500/20 flex items-center gap-3 hover:border-amber-500/50 transition-all"
                        >
                          <div className="w-2 h-2 bg-cyan-400 animate-ping shrink-0" />
                          <div className="flex flex-col overflow-hidden">
                            <span className="font-mono text-xs font-bold text-white truncate">{act.repo}</span>
                            <span className="font-pixel text-[8px] text-amber-400/80">{act.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Floating Tooltip for Badges */}
      {mounted && typeof document !== 'undefined' && hoveredBadge && createPortal(
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed z-[99999] pointer-events-none flex flex-col w-64 bg-[#050c1b] border-2 border-[#00f0ff] p-4 shadow-[0_0_25px_rgba(0,240,255,0.4)] cyber-scanlines"
          style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <HexagonBadge color={hoveredBadge.color} iconName={hoveredBadge.icon} />
            <div>
              <span className="font-pixel text-[7px] text-[#00f0ff] block tracking-widest">
                {isId ? "[LENCANA TERVERIFIKASI]" : "[VERIFIED BADGE]"}
              </span>
              <h4 className="font-mono text-xs font-bold text-white leading-tight">{hoveredBadge.title}</h4>
            </div>
          </div>
          <p className="font-mono text-[11px] text-zinc-300 leading-tight mb-2 border-l border-[#00f0ff]/30 pl-2">{hoveredBadge.desc}</p>
          <div className="flex items-center gap-1 font-pixel text-[8px] bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 w-fit px-2 py-0.5">
            <Check className="w-3 h-3 text-[#00f0ff]" />
            <span>{hoveredBadge.date}</span>
          </div>
        </motion.div>,
        document.body
      )}
    </section>
  );
};

export default KaggleShowcase;
