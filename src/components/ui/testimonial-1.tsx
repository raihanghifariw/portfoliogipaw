"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Award, Brain, Zap, Users } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/context/PortfolioContext";

function AnimatedStatCounter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setCount(latest)
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <span>{count.toFixed(decimals)}</span>
      {suffix && <span className="text-sm sm:text-lg lg:text-xl font-mono ml-0.5 opacity-80">{suffix}</span>}
    </span>
  );
}

interface StatItem {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  subtext: string;
  href: string;
  cta: string;
  accentColor: string;
  accentBorder: string;
  glowColor: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

export default function Testimonial1() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const stats: StatItem[] = [
    {
      value: 3.92,
      decimals: 2,
      suffix: "/4.0",
      label: isId ? "IPK AKADEMIK" : "ACADEMIC CGPA",
      subtext: "Universitas Yarsi",
      href: "/resume",
      cta: isId ? "LIHAT PRESTASI" : "VIEW DISTINCTION",
      accentColor: "var(--neon-cyan)",
      accentBorder: "border-[#00f0ff]/40 hover:border-[#00f0ff]",
      glowColor: "rgba(0,240,255,0.25)",
      icon: Award
    },
    {
      value: 75.31,
      decimals: 2,
      suffix: "%",
      label: isId ? "TINGKAT SURVIVAL" : "SURVIVAL RATE",
      subtext: isId ? "AI Sepsis Klinis" : "Clinical Sepsis AI",
      href: "/projects",
      cta: isId ? "LIHAT RISET" : "VIEW RESEARCH",
      accentColor: "var(--neon-emerald)",
      accentBorder: "border-[#00ff66]/40 hover:border-[#00ff66]",
      glowColor: "rgba(0,255,102,0.25)",
      icon: Brain
    },
    {
      value: 10,
      decimals: 0,
      suffix: "x",
      label: isId ? "AKSELERASI GPU" : "GPU SPEEDUP",
      subtext: isId ? "Pemrosesan Paralel" : "Parallel Processing",
      href: "/experience",
      cta: isId ? "LIHAT LAB" : "VIEW LAB WORK",
      accentColor: "var(--neon-orange)",
      accentBorder: "border-[#ff6b00]/40 hover:border-[#ff6b00]",
      glowColor: "rgba(255,107,0,0.25)",
      icon: Zap
    },
    {
      value: 100,
      decimals: 0,
      suffix: "+",
      label: isId ? "MENTORING AI" : "AI MENTORSHIP",
      subtext: isId ? "Kurikulum CS & AI" : "CS & AI Curriculum",
      href: "/about",
      cta: isId ? "LIHAT KELAS" : "VIEW COURSES",
      accentColor: "var(--neon-violet)",
      accentBorder: "border-[#c084fc]/40 hover:border-[#c084fc]",
      glowColor: "rgba(192,132,252,0.25)",
      icon: Users
    }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-background dark:bg-[#040814] text-foreground dark:text-white py-6 md:py-10 px-4 sm:px-6 md:px-10 lg:px-16 cyber-scanlines">
      {/* Background Tron Circuit Glow Accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#00f0ff]/6 rounded-full blur-3xl pointer-events-none animate-circuit-pulse" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#00ff66]/6 rounded-full blur-3xl pointer-events-none animate-circuit-pulse" />
      
      {/* Ambient Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#00f0ff0d_1px,_transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-40" />

      {/* Main Content Container (Controlled max-height to ensure zero overflow or cutoff) */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center justify-center my-auto">
        
        {/* Top Cyber Telemetry Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-card dark:bg-[#050c1b] border border-slate-200 dark:border-[#00f0ff]/40 shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.15)] mb-4 sm:mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-ping" />
          <span className="font-pixel text-[8px] sm:text-[9px] text-cyan-600 dark:text-[#00f0ff] uppercase tracking-[0.22em]">
            {isId ? "TELEMETRI SISTEM • BENCHMARK UTAMA" : "SYSTEM TELEMETRY • CORE BENCHMARKS"}
          </span>
        </motion.div>

        {/* Statement Headline with Tron & Modern Hybrid Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center max-w-5xl mx-auto space-y-3 mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.08] text-white uppercase">
            {isId ? (
              <>
                Memformulasikan Kecerdasan. Mengakselerasi Komputasi. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#00ff66] to-[#38bdf8] drop-shadow-[0_0_25px_rgba(0,255,102,0.4)]">
                  Merancang Sistem Otonom Berskala Besar.
                </span>
              </>
            ) : (
              <>
                Formulating Intelligence. Accelerating Compute. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#00ff66] to-[#38bdf8] drop-shadow-[0_0_25px_rgba(0,255,102,0.4)]">
                  Architecting Autonomous Systems at Scale.
                </span>
              </>
            )}
          </h2>
          
          <p className="font-mono text-zinc-400 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed pt-1">
            {isId
              ? "Menjembatani ketelitian matematika dan runtime produksi latensi rendah, divalidasi melalui tolok ukur operasional terverifikasi."
              : "Bridging mathematical rigor and low-latency production runtimes, validated through verified operational benchmarks."}
          </p>
        </motion.div>

        {/* 4 Tron Cyberpunk Telemetry Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 w-full max-w-5xl">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const isHovered = hoveredIndex === index;

            return (
              <Link
                key={stat.label}
                href={stat.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group/stat block relative focus:outline-none"
              >
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={cn(
                    "relative p-4 sm:p-5 lg:p-6 bg-[#050914]/90 border-2 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden backdrop-blur-xl",
                    stat.accentBorder
                  )}
                  style={{
                    boxShadow: isHovered ? `0 0 30px ${stat.glowColor}` : `0 0 15px rgba(0,0,0,0.5)`
                  }}
                >
                  {/* Pixel Corner Tabs */}
                  <div className="absolute top-0 left-0 w-2 h-2" style={{ backgroundColor: stat.accentColor }} />
                  <div className="absolute top-0 right-0 w-2 h-2" style={{ backgroundColor: stat.accentColor }} />
                  <div className="absolute bottom-0 left-0 w-2 h-2" style={{ backgroundColor: stat.accentColor }} />
                  <div className="absolute bottom-0 right-0 w-2 h-2" style={{ backgroundColor: stat.accentColor }} />

                  {/* Header: Label & Icon */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-pixel text-[7.5px] sm:text-[9px] text-zinc-400 tracking-wider truncate">
                        [ {stat.label} ]
                      </span>
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color: stat.accentColor }} />
                    </div>

                    {/* Metric Counter in Pixel Font */}
                    <div
                      className="font-pixel text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-1"
                      style={{
                        color: stat.accentColor,
                        textShadow: `0 0 12px ${stat.glowColor}`
                      }}
                    >
                      <AnimatedStatCounter
                        value={stat.value}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                      />
                    </div>
                  </div>

                  {/* Footer Info & Interactive CTA */}
                  <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] sm:text-xs text-zinc-400 group-hover/stat:text-white transition-colors truncate">
                      {stat.subtext}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 font-pixel text-[8px] opacity-0 group-hover/stat:opacity-100 transition-opacity"
                      style={{ color: stat.accentColor }}
                    >
                      <span>GO</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
