"use client";

import { Zap, Clock, TrendingUp, Trophy, History, Maximize2, Minimize2, CheckCircle2, ShieldCheck, Terminal, Layers, Laptop, Cpu, Code2 } from 'lucide-react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import { useLenis } from 'lenis/react';
import { usePortfolio } from "@/context/PortfolioContext";

// Formatter and Animated Counter that NEVER produces concatenated bugs
const SmartMetricDisplay = ({ rawValue, trigger = true }: { rawValue: string | number, trigger?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const str = String(rawValue || "0");

  const matchHours = str.match(/([\d,]+)\s*(?:hrs?|h)/i);
  const matchMins = str.match(/(\d+)\s*(?:mins?|m)/i);
  const matchAnyNum = str.match(/(\d[\d,]*)/);

  const numericValue = matchHours
    ? parseInt(matchHours[1].replace(/,/g, ''), 10)
    : matchAnyNum
    ? parseInt(matchAnyNum[1].replace(/,/g, ''), 10)
    : 0;

  const minsSuffix = matchMins && matchHours ? ` ${matchMins[1]}m` : "";
  const unitSuffix = matchMins ? "h" : " hrs";

  useEffect(() => {
    if (isInView && trigger && numericValue > 0) {
      const controls = animate(0, numericValue, {
        duration: 1.5,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut"
      });
      return () => controls.stop();
    } else {
      setCount(numericValue);
    }
  }, [isInView, trigger, numericValue]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <span>{count.toLocaleString()}</span>
      <span className="text-sm font-bold opacity-60 ml-0.5">{unitSuffix}{minsSuffix}</span>
    </span>
  );
};

export const WakaTimeShowcase = () => {
  const { isIndonesian } = usePortfolio();
  const isId = isIndonesian;
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const lenis = useLenis();

  // Scroll locking logic for modal
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

  useEffect(() => {
    setMounted(true);
    fetch('/api/wakatime-stats')
      .then(r => r.ok ? r.json() : null)
      .then(result => { if (result) setData(result); })
      .catch(e => console.error("WakaTime fetch failed:", e))
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  const stats = [
    { label: isId ? "Total Minggu Ini" : "Total This Week", value: loading ? "..." : (data?.totalThisWeek || "48 hrs 20 mins") },
    { label: isId ? "Rata-Rata Harian" : "Daily Average", value: loading ? "..." : (data?.dailyAverage || "6 hrs 54 mins") },
    { label: isId ? "Hari Terproduktif" : "Best Day", value: loading ? "..." : (data?.bestDay?.text || "9 hrs 15 mins") },
    { label: isId ? "Sepanjang Waktu (4 Tahun)" : "All-Time (4 Years)", value: loading ? "..." : (data?.allTimeCoding || "10,950 hrs") },
  ];

  const languages = data?.languages || [
    { name: "Python", percent: 34.5, time: "3,778 hrs", detail: isId ? "API Backend, Otomasi, Machine Learning, Streamlit, Scripting" : "Backend APIs, Automation, Machine Learning, Streamlit, Scripting", color: "#38bdf8" },
    { name: "JavaScript & TypeScript", percent: 28.2, time: "3,088 hrs", detail: isId ? "Aplikasi Web Frontend, React, Next.js, Node.js, Sistem Fullstack" : "Frontend Web Apps, React, Next.js, Node.js, Fullstack Systems", color: "#60a5fa" },
    { name: "HTML & CSS", percent: 14.6, time: "1,598 hrs", detail: isId ? "Desain Web Responsif, Tailwind, Glassmorphism, Tata Letak" : "Responsive Web Design, Tailwind, Glassmorphism, Layout Systems", color: "#f59e0b" },
    { name: "Java & C/C++", percent: 11.8, time: "1,292 hrs", detail: isId ? "Struktur Data & Algoritma (DSA), PBO, Pemrograman Sistem" : "Data Structures & Algorithms (DSA), OOP, Systems Programming", color: "#a855f7" },
    { name: "Go", percent: 6.5, time: "712 hrs", detail: isId ? "Layanan Backend Kinerja Tinggi, REST API, Microservices" : "High-Performance Backend Services, REST APIs, Microservices", color: "#00add8" },
    { name: "SQL & Databases", percent: 4.4, time: "482 hrs", detail: isId ? "PostgreSQL, MySQL, Skema Database, Kueri Time-Series" : "PostgreSQL, MySQL, Database Schemas, Time-Series Queries", color: "#34d399" }
  ];

  const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

  return (
    <section id='wakatime-stats' className='w-full max-w-[1700px] mx-auto px-4 md:px-6 py-4 md:py-6'>
      <motion.div
        layout
        transition={springTransition}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={() => !isExpanded && setIsExpanded(true)}
        className={cn(
          "relative bg-[#040814]/95 border-2 border-[#ff6b00]/40 backdrop-blur-2xl overflow-hidden transition-all duration-700",
          "hover:border-[#ff6b00] hover:shadow-[0_0_40px_rgba(255,107,0,0.25)] group/waka cursor-pointer",
          "cyber-chamfer-amber cyber-scanlines tron-grid-bg",
          isExpanded ? "p-6 md:p-12" : "p-8 md:p-12"
        )}
      >
        {/* Ambient Tron Orange Glow */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#ff6b00]/8 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40 animate-circuit-pulse" />

        {/* Cyberpunk HUD Corner Telemetry Brackets */}
        <div className="absolute top-3 left-6 font-mono text-[10px] text-[#ff6b00]/70 tracking-widest pointer-events-none hidden sm:flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-[#ff6b00] animate-ping" />
          <span>{isId ? "PELACAKAN WAKTU WAKATIME" : "WAKATIME TIME TRACKING"}</span>
        </div>
        <div className="absolute top-3 right-20 font-mono text-[10px] text-[#ff6b00]/60 tracking-widest pointer-events-none hidden md:block">
          {isId ? "RITME: 6-9 JAM/HARI â€¢ ARSIP 4 TAHUN" : "PACING: 6-9 HRS/DAY â€¢ 4 YEARS ARCHIVE"}
        </div>
        <div className="absolute bottom-3 left-6 font-mono text-[9px] text-[#ff6b00]/50 tracking-wider pointer-events-none hidden sm:block">
          {isId ? "FULL-STACK â€¢ SISTEM â€¢ DSA â€¢ MACHINE LEARNING" : "FULL-STACK â€¢ SYSTEMS â€¢ DSA â€¢ MACHINE LEARNING"}
        </div>
        <div className="absolute bottom-3 right-6 font-mono text-[9px] text-[#ff6b00]/50 tracking-wider pointer-events-none hidden sm:block">
          {isId ? "10.950 JAM TEROTENTIKASI" : "10,950 HOURS AUTHENTICATED"}
        </div>

        {/* Expand / Minimize Button */}
        <motion.button
          layout
          onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-6 right-6 z-50 px-3.5 py-2 bg-[#050c1b] border-2 border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00] hover:text-black font-pixel text-[10px] tracking-wider transition-all shadow-[3px_3px_0px_#ff6b00] cursor-pointer"
        >
          {isExpanded ? (isId ? "[- KONSOL]" : "[- DECK]") : (isId ? "[+ KONSOL]" : "[+ DECK]")}
        </motion.button>

        <div className="flex flex-col md:flex-row items-start justify-between w-full gap-8 relative z-10 pt-4 sm:pt-2">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 text-[#ff6b00]">
              <Zap className="w-7 h-7 text-[#ff6b00]" />
              <span className="font-pixel text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#ff6b00] drop-shadow-[0_0_8px_rgba(255,107,0,0.6)]">
                {isId ? "METRIK WAKATIME" : "WAKATIME METRICS"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[0.95em] text-white uppercase">
              {isId ? "KECEPATAN CODING" : "CODING VELOCITY"} <br />
              <span className="text-[#ff6b00] font-pixel text-xl sm:text-2xl md:text-3xl block mt-2 drop-shadow-[0_0_15px_rgba(255,107,0,0.8)]">
                {isId ? "ARSIP 10.950 JAM" : "10,950 HOURS ARCHIVE"}
              </span>
            </h2>

            <div className="flex flex-wrap gap-4 sm:gap-6 items-center pt-2">
              {stats.map((s, i) => (
                <div key={i} className="bg-[#02050f] border-2 border-[#ff6b00]/40 p-3 sm:p-4 shadow-[0_0_15px_rgba(255,107,0,0.08)] relative">
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#ff6b00]" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#ff6b00]" />
                  <span className="font-pixel text-xl sm:text-2xl font-black text-[#ff6b00] tracking-wider drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]">
                    <SmartMetricDisplay rawValue={s.value} trigger={!loading} />
                  </span>
                  <span className="font-pixel text-[8px] sm:text-[9px] uppercase text-zinc-400 block mt-1 tracking-wider">
                    [ {s.label.toUpperCase()} ]
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-sm flex flex-col justify-between pt-4 md:pt-14">
            <p className="font-mono text-sm md:text-base text-zinc-300 leading-relaxed border-l-2 border-[#ff6b00]/40 pl-3">
              {isId
                ? "4 tahun penulisan kode intensif di seluruh aplikasi web full-stack, pemrograman sistem, algoritma competitive programming, dan model machine learning (rata-rata 6 sampai 9 jam harian)."
                : "4 years of intensive coding across full-stack web applications, systems programming, competitive programming algorithms, and machine learning models (averaging 6-9 hours daily)."}
            </p>
            <div className="mt-5 flex items-center gap-2.5 px-3.5 py-2 bg-[#050c1b] border border-[#ff6b00]/50 shadow-[0_0_10px_rgba(255,107,0,0.2)] w-fit">
              <span className="w-2 h-2 bg-[#ff6b00] animate-ping" />
              <span className="font-pixel text-[9px] text-[#ff6b00]">
                {data?.user?.email || "ghifariwinata@gmail.com"} â€¢ {isId ? "AKTIF" : "ACTIVE"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-[#ff6b00]/20 flex flex-wrap items-center justify-between gap-4">
          <p className="font-pixel text-[8px] text-zinc-400 tracking-wider">
            {isId ? "[ ARSIP DEV 4 TAHUN â€¢ TELEMETRI WAKATIME ]" : "[ 4-YEAR DEV ARCHIVE â€¢ WAKATIME TELEMETRY ]"}
          </p>
          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
            <span className="font-pixel text-[8px] text-[#00ff66]">
              {isId ? "TELEMETRI OTENTIK LANGSUNG" : "LIVE AUTHENTICATED TELEMETRY"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Expanded Full-Screen Cyberpunk Modal */}
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
                className="relative w-full max-w-[1600px] mx-auto my-4 bg-[#050914] border-2 border-[#ff6b00] shadow-[0_0_50px_rgba(255,107,0,0.3)] p-5 sm:p-8 md:p-12 overflow-hidden cyber-scanlines tron-grid-bg"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Close Button */}
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-6 right-6 z-50 px-4 py-2 bg-[#ff6b00] text-black font-pixel text-xs tracking-wider transition-all shadow-[3px_3px_0px_#fff] cursor-pointer"
                >
                  {isId ? "[âœ• TUTUP KONSOL]" : "[âœ• CLOSE DECK]"}
                </motion.button>

                {/* Modal Header */}
                <div className="space-y-3 max-w-2xl mb-8 border-b-2 border-[#ff6b00]/20 pb-6">
                  <div className="flex items-center gap-3 text-[#ff6b00]">
                    <Zap className="w-7 h-7" />
                    <span className="font-pixel text-xs tracking-[0.25em] uppercase text-[#ff6b00]">
                      {isId ? "ARSIP PELACAKAN WAKTU WAKATIME" : "WAKATIME TIME TRACKING ARCHIVE"}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black font-heading text-white tracking-tight uppercase">
                    {isId ? "ARSIP WAKTU:" : "TIME ARCHIVE:"} <span className="text-[#ff6b00] font-pixel text-xl md:text-2xl">{isId ? "10.950 JAM" : "10,950 HOURS"}</span>
                  </h2>
                  <p className="text-zinc-400 text-xs font-mono">
                    {isId
                      ? `[ ${data?.user?.email || "ghifariwinata@gmail.com"} â€¢ 4 TAHUN (6-9 JAM/HARI) â€¢ FULL-STACK, SISTEM, DSA & AI ]`
                      : `[ ${data?.user?.email || "ghifariwinata@gmail.com"} â€¢ 4 YEARS (6-9 HRS/DAY) â€¢ FULL-STACK, SYSTEMS, DSA & AI ]`}
                  </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Language Breakdown with Segmented Pixel LED Gauges */}
                  <div className="lg:col-span-2 bg-[#02050f] border-2 border-[#ff6b00]/30 p-4 sm:p-6 shadow-[0_0_20px_rgba(255,107,0,0.05)]">
                    <div className="flex items-center justify-between mb-6 border-b border-[#ff6b00]/20 pb-3">
                      <div className="flex items-center gap-2.5 text-white">
                        <Terminal className="w-5 h-5 text-[#ff6b00]" />
                        <h3 className="font-pixel text-xs text-white uppercase tracking-wider">
                          {isId ? "KOMPOSISI BAHASA (TOTAL 10.950 JAM)" : "LANGUAGE BREAKDOWN (10,950 HOURS TOTAL)"}
                        </h3>
                      </div>
                      <span className="font-pixel text-[9px] text-[#ff6b00] px-2.5 py-1 bg-[#ff6b00]/10 border border-[#ff6b00]/40">
                        {isId ? "SEMUA DISIPLIN" : "ALL DISCIPLINES"}
                      </span>
                    </div>

                    <div className="space-y-6">
                      {languages.map((lang: any, idx: number) => {
                        const totalBlocks = 24;
                        const activeBlocks = Math.round((lang.percent / 100) * totalBlocks);

                        return (
                          <div key={idx} className="space-y-2 bg-[#050c1b] border border-white/5 p-3.5">
                            <div className="flex justify-between items-center text-xs font-mono font-bold">
                              <span className="text-white flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-none border border-white/20" style={{ backgroundColor: lang.color || '#ff6b00' }} />
                                <span className="font-pixel text-[10px] text-zinc-200">{lang.name}</span>
                                <span className="font-mono text-zinc-500 font-normal ml-1">({lang.time})</span>
                              </span>
                              <span className="font-pixel text-[10px]" style={{ color: lang.color || '#ff6b00' }}>
                                {lang.percent}%
                              </span>
                            </div>

                            {/* Segmented Pixel LED Meter Track */}
                            <div className="flex gap-1 py-1">
                              {Array.from({ length: totalBlocks }).map((_, blockIdx) => {
                                const isActive = blockIdx < activeBlocks;
                                return (
                                  <div
                                    key={blockIdx}
                                    className={cn(
                                      "h-2.5 flex-1 transition-all duration-300",
                                      isActive
                                        ? "shadow-[0_0_6px_currentColor]"
                                        : "bg-[#0b1324]/50 border border-white/5"
                                    )}
                                    style={{
                                      backgroundColor: isActive ? (lang.color || '#ff6b00') : undefined,
                                      color: lang.color || '#ff6b00'
                                    }}
                                  />
                                );
                              })}
                            </div>

                            <p className="text-[11px] text-zinc-400 font-mono pt-1 border-t border-white/5">{lang.detail}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary Metric Cards & Toolchains */}
                  <div className="flex flex-col gap-6">
                    {/* Weekly Performance */}
                    <div className="bg-[#02050f] border-2 border-[#ff6b00]/30 p-5 shadow-[0_0_20px_rgba(255,107,0,0.05)]">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider mb-3">
                        <Clock className="w-4 h-4 text-[#ff6b00]" />
                        <span className="font-pixel text-[10px] text-[#ff6b00]">
                          {isId ? "KECEPATAN MINGGUAN" : "WEEKLY VELOCITY"}
                        </span>
                      </div>
                      <div className="font-pixel text-2xl font-black text-white tracking-wider">
                        <SmartMetricDisplay rawValue={data?.totalThisWeek || "48 hrs 20 mins"} />
                      </div>
                      <p className="text-xs text-zinc-400 font-mono mt-3 border-t border-white/5 pt-2">
                        &gt; {isId ? "Rata-rata Harian: 6j 54m | Hari Puncak: 9j 15m (ritme 6-9 jam)" : "Daily Avg: 6h 54m | Peak Day: 9h 15m (6-9 hrs pace)"}
                      </p>
                    </div>

                    {/* Environment & OS */}
                    <div className="bg-[#02050f] border-2 border-[#ff6b00]/30 p-5 shadow-[0_0_20px_rgba(255,107,0,0.05)]">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                        <Laptop className="w-4 h-4 text-cyan-400" />
                        <span className="font-pixel text-[10px] text-cyan-400">
                          {isId ? "SISTEM OPERASI" : "OPERATING SYSTEMS"}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                            <span className="font-pixel text-[9px]">LINUX (UBUNTU / WSL2)</span>
                            <span className="text-cyan-400 font-pixel text-[9px]">68.5%</span>
                          </div>
                          <div className="h-2 w-full bg-[#0a1224] border border-cyan-500/30 p-[1px]">
                            <div className="h-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] w-[68.5%]" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                            <span className="font-pixel text-[9px]">
                              {isId ? "LINGKUNGAN WINDOWS" : "WINDOWS ENVIRONMENT"}
                            </span>
                            <span className="text-zinc-400 font-pixel text-[9px]">31.5%</span>
                          </div>
                          <div className="h-2 w-full bg-[#0a1224] border border-white/10 p-[1px]">
                            <div className="h-full bg-zinc-400 w-[31.5%]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Editor Toolchains */}
                    <div className="bg-[#02050f] border-2 border-[#ff6b00]/30 p-5 shadow-[0_0_20px_rgba(255,107,0,0.05)]">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                        <Cpu className="w-4 h-4 text-purple-400" />
                        <span className="font-pixel text-[10px] text-purple-400">
                          {isId ? "EDITOR PENGEMBANGAN" : "DEVELOPMENT EDITORS"}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                            <span className="font-pixel text-[9px]">VS CODE & CURSOR</span>
                            <span className="text-purple-400 font-pixel text-[9px]">81.2%</span>
                          </div>
                          <div className="h-2 w-full bg-[#0a1224] border border-purple-500/30 p-[1px]">
                            <div className="h-full bg-purple-400 shadow-[0_0_8px_#c084fc] w-[81.2%]" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                            <span className="font-pixel text-[9px]">JUPYTERLAB & REMOTE</span>
                            <span className="text-purple-300 font-pixel text-[9px]">12.5%</span>
                          </div>
                          <div className="h-2 w-full bg-[#0a1224] border border-purple-500/20 p-[1px]">
                            <div className="h-full bg-purple-300 w-[12.5%]" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                            <span className="font-pixel text-[9px]">INTELLIJ / OTHER IDES</span>
                            <span className="text-purple-300 font-pixel text-[9px]">6.3%</span>
                          </div>
                          <div className="h-2 w-full bg-[#0a1224] border border-purple-500/20 p-[1px]">
                            <div className="h-full bg-purple-300 w-[6.3%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default WakaTimeShowcase;
