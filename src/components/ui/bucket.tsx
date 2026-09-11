"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { Binary, BrainCircuit, Cpu, Sparkles, Activity, Layers, ShieldCheck, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import ImageTrail from "@/components/ImageTrail";
import { usePortfolio } from "@/context/PortfolioContext";

// 3 Non-redundant Core Engineering Primitives (EN)
const ACCENT_VAR: Record<string, string> = {
  "#00f0ff": "var(--neon-cyan)",
  "#00ff66": "var(--neon-emerald)",
  "#38bdf8": "var(--neon-sky)",
};

export const CONVERGENCE_PRIMITIVES = [
  {
    id: 1,
    code: "01 • FORMAL CONTROL",
    title: "MATHEMATICAL RIGOR",
    description: "Lagrangian corridors & provable safety bounds",
    icon: Binary,
    accent: "#00f0ff",
    accentVar: "var(--neon-cyan)",
    secondaryAccent: "#0284c7",
    tag: "OPTIMIZATION",
    metric: "0.0% BOUND BREACH",
  },
  {
    id: 2,
    code: "02 • LATENT MODELS",
    title: "NEURAL PERCEPTION",
    description: "Continuous policy ensembles & latent space",
    icon: BrainCircuit,
    accent: "#00ff66",
    accentVar: "var(--neon-emerald)",
    secondaryAccent: "#059669",
    tag: "EMBEDDINGS",
    metric: "24-DIM LATENT SPACE",
  },
  {
    id: 3,
    code: "03 • SYSTEM THROUGHPUT",
    title: "DISTRIBUTED SCALE",
    description: "Sub-15ms inference & GPU runtime pipelines",
    icon: Cpu,
    accent: "#38bdf8",
    accentVar: "var(--neon-sky)",
    secondaryAccent: "#6366f1",
    tag: "RUNTIME",
    metric: "<15MS DETERMINISTIC",
  },
];

// 3 Non-redundant Core Engineering Primitives (ID)
export const CONVERGENCE_PRIMITIVES_ID = [
  {
    id: 1,
    code: "01 • KONTROL FORMAL",
    title: "KETEGASAN MATEMATIKA",
    description: "Koridor Lagrangian & batas keselamatan terbukti",
    icon: Binary,
    accent: "#00f0ff",
    accentVar: "var(--neon-cyan)",
    secondaryAccent: "#0284c7",
    tag: "OPTIMISASI",
    metric: "0.0% PELANGGARAN BATAS",
  },
  {
    id: 2,
    code: "02 • MODEL LATEN",
    title: "PERSEPSI NEURAL",
    description: "Ensemble kebijakan kontinu & ruang laten terstruktur",
    icon: BrainCircuit,
    accent: "#00ff66",
    accentVar: "var(--neon-emerald)",
    secondaryAccent: "#059669",
    tag: "EMBEDDING",
    metric: "RUANG LATEN 24-DIM",
  },
  {
    id: 3,
    code: "03 • THROUGHPUT SISTEM",
    title: "SKALA TERDISTRIBUSI",
    description: "Inferensi sub-15ms & pipeline runtime GPU",
    icon: Cpu,
    accent: "#38bdf8",
    accentVar: "var(--neon-sky)",
    secondaryAccent: "#6366f1",
    tag: "RUNTIME",
    metric: "<15MS DETERMINISTIK",
  },
];

export default function Bucket({ trailImages }: { trailImages?: string[] }) {
  const { isIndonesian } = usePortfolio();
  const primitives = isIndonesian ? CONVERGENCE_PRIMITIVES_ID : CONVERGENCE_PRIMITIVES;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [shockwaveKey, setShockwaveKey] = useState(0);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Parallax Tilt Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const lightX = useTransform(smoothX, [-0.5, 0.5], ["20%", "80%"]);
  const lightY = useTransform(smoothY, [-0.5, 0.5], ["20%", "80%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsPaused(false);
  };

  // Auto-cycle through the 3 primitives every 3 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % primitives.length;
        setShockwaveKey((k) => k + 1);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, primitives.length]);

  const selectPrimitive = (idx: number) => {
    setActiveIdx(idx);
    setShockwaveKey((k) => k + 1);
  };

  const currentPrimitive = primitives[activeIdx];

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-8 items-center justify-center h-fit relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* 3D Perspective Viewport Container */}
      <div
        className="bucket-scene relative isolate w-full max-w-[680px] cursor-pointer group"
        style={{
          aspectRatio: "680/380",
          perspective: isMobile ? "none" : "1200px",
        }}
        onClick={() => selectPrimitive((activeIdx + 1) % primitives.length)}
        title={isIndonesian ? "Klik untuk mengganti primitif konvergensi" : "Click to cycle convergence primitive"}
      >
        {/* Tilting 3D Card Chassis */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: isMobile ? "flat" : "preserve-3d",
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
          }}
        >
          {/* ========================================================= */}
          {/* LAYER 0 (Z: -30px): Volumetric Floor Halo & Grid           */}
          {/* ========================================================= */}
          <div
            className="absolute -inset-10 rounded-3xl pointer-events-none transition-all duration-700 blur-3xl opacity-40 -z-10"
            style={{
              background: `radial-gradient(ellipse at center, ${currentPrimitive.accent}33 0%, transparent 70%)`,
              transform: "translateZ(-30px)",
            }}
          />

          {/* ========================================================= */}
          {/* LAYER 1 (Z: 0px): Box Back Chamber, Flaps & Core Cavity   */}
          {/* ========================================================= */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 680 370"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bucket-vault-svg absolute inset-0 z-0 overflow-visible"
            style={{ transform: "translateZ(0px)" }}
          >
            <defs>
              {/* Dynamic Neon Glow Filter */}
              <filter id="neon_glow_strong" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Chamber Interior Gradient */}
              <linearGradient id="vault_depth_gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={currentPrimitive.accent} stopOpacity="0.4" />
                <stop offset="40%" stopColor="#061226" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#02050c" stopOpacity="0.98" />
              </linearGradient>

              {/* Cyber Flap Gradients */}
              <linearGradient id="flap_left_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#081c38" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#040c1a" stopOpacity="0.7" />
              </linearGradient>

              <linearGradient id="flap_right_gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#081c38" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#040c1a" stopOpacity="0.7" />
              </linearGradient>

              {/* Matrix Grid Pattern */}
              <pattern id="matrix_interior_grid" width="18" height="18" patternUnits="userSpaceOnUse">
                <path d="M 18 0 L 0 0 0 18" fill="none" stroke={currentPrimitive.accent} strokeWidth="0.75" strokeOpacity="0.2" />
              </pattern>
            </defs>

            {/* Core Cavity Aperture Background */}
            <path
              d="M508 44L172 44L122 84L558 84L508 44Z"
              fill="url(#vault_depth_gradient)"
              stroke={currentPrimitive.accent}
              strokeWidth="1.8"
              strokeOpacity="0.85"
            />
            <path d="M508 44L172 44L122 84L558 84L508 44Z" fill="url(#matrix_interior_grid)" />

            {/* Left Angled Wing Flap */}
            <g>
              <path
                d="M122 84L172 44L92 12C89 11 87 11 84 12L52 32C44 37 40 40 40 43C40 46 44 48 53 52L122 84Z"
                fill="url(#flap_left_gradient)"
                stroke={currentPrimitive.accent}
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
              <line x1="160" y1="48" x2="88" y2="18" stroke={currentPrimitive.accent} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
            </g>

            {/* Right Angled Wing Flap */}
            <g>
              <path
                d="M558 84L508 44L588 12C591 11 593 11 596 12L628 32C636 37 640 40 640 43C640 46 636 48 627 52L558 84Z"
                fill="url(#flap_right_gradient)"
                stroke={currentPrimitive.accent}
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
              <line x1="520" y1="48" x2="592" y2="18" stroke={currentPrimitive.accent} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
            </g>

            {/* Rear Luminous Aperture Horizon */}
            <line
              x1="172"
              y1="44"
              x2="508"
              y2="44"
              stroke={currentPrimitive.accent}
              strokeWidth="3"
              strokeOpacity="0.95"
              filter="url(#neon_glow_strong)"
            />
          </svg>

          {/* ========================================================= */}
          {/* LAYER 2 (Z: 25px): Holographic Particle Core & Laser Shaft*/}
          {/* ========================================================= */}
          <div
            className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
            style={{ transform: "translateZ(25px)" }}
          >
            {/* Vertical Laser Light Shaft Shooting Up from Box */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-4 w-[280px] h-[140px] opacity-60 transition-colors duration-700"
              style={{
                background: `radial-gradient(ellipse at 50% 100%, ${currentPrimitive.accent}55 0%, ${currentPrimitive.accent}11 50%, transparent 80%)`,
                filter: "blur(8px)",
              }}
            />

            {/* Reactive Aperture Shockwave Pulse */}
            <AnimatePresence>
              <motion.div
                key={shockwaveKey}
                initial={{ scaleX: 0.6, scaleY: 0.4, opacity: 0.9, y: 70 }}
                animate={{ scaleX: 1.4, scaleY: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-1/2 -translate-x-1/2 w-[340px] h-[40px] rounded-full border-2 pointer-events-none"
                style={{
                  borderColor: currentPrimitive.accentVar,
                  boxShadow: `0 0 25px ${currentPrimitive.accent}`,
                }}
              />
            </AnimatePresence>

            {/* Rising Holographic Quantum Energy Sparks */}
            {[
              { x: "38%", delay: 0, dur: 2.2 },
              { x: "46%", delay: 0.4, dur: 1.8 },
              { x: "54%", delay: 0.8, dur: 2.4 },
              { x: "62%", delay: 0.2, dur: 2.0 },
              { x: "50%", delay: 1.1, dur: 1.6 },
            ].map((spark, sIdx) => (
              <motion.div
                key={sIdx}
                animate={{
                  y: [85, 5],
                  opacity: [0, 0.9, 0],
                  scale: [0.6, 1.2, 0.4],
                }}
                transition={{
                  duration: spark.dur,
                  repeat: Infinity,
                  delay: spark.delay,
                  ease: "easeInOut",
                }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  left: spark.x,
                  backgroundColor: currentPrimitive.accentVar,
                  boxShadow: `0 0 10px ${currentPrimitive.accent}`,
                }}
              />
            ))}
          </div>

          {/* ========================================================= */}
          {/* LAYER 3 (Z: 65px): Falling Holographic Data Capsule       */}
          {/* ========================================================= */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            style={{ transform: "translateZ(65px)" }}
          >
            {trailImages && trailImages.length > 0 && (
              <div className="absolute inset-0">
                <ImageTrail items={trailImages} variant={3} />
              </div>
            )}

            <div
              className="relative w-full h-full flex justify-center items-center"
              style={{ paddingBottom: "58%" }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentPrimitive.id}
                  initial={{
                    y: isMobile ? -60 : -95,
                    opacity: 0,
                    scale: 0.84,
                    rotateX: -15,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: isMobile ? 1 : 1.15,
                    rotateX: 0,
                  }}
                  exit={{
                    y: isMobile ? 85 : 125,
                    scale: 0.82,
                    opacity: 0.15,
                    rotateX: 20,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="pointer-events-auto flex items-center gap-4 px-5 py-3.5 rounded-xl border-2 backdrop-blur-2xl w-[320px] sm:w-[380px] origin-bottom shadow-2xl relative group/capsule"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--bg-surface) 94%, transparent)",
                    borderColor: currentPrimitive.accentVar,
                    boxShadow: `0 0 35px ${currentPrimitive.accent}55, inset 0 0 15px ${currentPrimitive.accent}22`,
                  }}
                >
                  {/* Pixel Corner Reticle Tabs */}
                  <div
                    className="absolute top-0 left-0 w-2 h-2 -translate-x-0.5 -translate-y-0.5"
                    style={{ backgroundColor: currentPrimitive.accentVar }}
                  />
                  <div
                    className="absolute top-0 right-0 w-2 h-2 translate-x-0.5 -translate-y-0.5"
                    style={{ backgroundColor: currentPrimitive.accentVar }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-2 h-2 -translate-x-0.5 translate-y-0.5"
                    style={{ backgroundColor: currentPrimitive.accentVar }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-2 h-2 translate-x-0.5 translate-y-0.5"
                    style={{ backgroundColor: currentPrimitive.accentVar }}
                  />

                  {/* High-Gloss Light Sweep Glare */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] animate-[shimmer_3s_infinite]"
                    />
                  </div>

                  {/* Holographic Glowing Icon Emblem */}
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border relative transition-transform duration-300 group-hover/capsule:scale-110"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${currentPrimitive.accentVar} 20%, transparent)`,
                      borderColor: `color-mix(in srgb, ${currentPrimitive.accentVar} 80%, transparent)`,
                      boxShadow: `0 0 20px ${currentPrimitive.accent}60`,
                      color: currentPrimitive.accentVar,
                    }}
                  >
                    <currentPrimitive.icon className="w-6 h-6" />
                    <span
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: currentPrimitive.accentVar }}
                    />
                  </div>

                  {/* Capsule Metadata Dossier */}
                  <div className="flex flex-col min-w-0 text-left flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span
                        className="font-pixel text-[8.5px] tracking-wider font-bold"
                        style={{ color: currentPrimitive.accentVar }}
                      >
                        {currentPrimitive.code}
                      </span>
                      <span
                        className="text-[8px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold border"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${currentPrimitive.accentVar} 15%, transparent)`,
                          borderColor: `color-mix(in srgb, ${currentPrimitive.accentVar} 50%, transparent)`,
                          color: currentPrimitive.accentVar,
                        }}
                      >
                        {currentPrimitive.tag}
                      </span>
                    </div>

                    <h4 className="font-heading font-black text-sm sm:text-[15px] text-white tracking-wide uppercase truncate mt-0.5 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                      {currentPrimitive.title}
                    </h4>

                    <p className="font-mono text-[10.5px] text-slate-300 truncate leading-tight mt-0.5">
                      {currentPrimitive.description}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1.5 pt-1 border-t border-white/10">
                      <Zap className="w-3 h-3" style={{ color: currentPrimitive.accentVar }} />
                      <span className="font-mono text-[9px] text-slate-400 tracking-wider">
                        {currentPrimitive.metric}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LAYER 4 (Z: 40px): Front Chassis Face & Cyber Visor       */}
          {/* ========================================================= */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 680 370"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bucket-vault-svg absolute inset-0 z-30 pointer-events-none overflow-visible"
            style={{ transform: "translateZ(40px)" }}
          >
            <defs>
              <linearGradient id="front_chassis_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#071428" stopOpacity="0.98" />
                <stop offset="50%" stopColor="#040916" stopOpacity="0.99" />
                <stop offset="100%" stopColor="#02050e" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* 1. Main Front Chassis Plate */}
            <g>
              <path
                d="M536 84L144 84C132 84 122 94 122 106V344C122 356 132 366 144 366H536C548 366 558 356 558 344V106C558 94 548 84 536 84Z"
                fill="url(#front_chassis_gradient)"
                stroke={currentPrimitive.accent}
                strokeWidth="2.2"
                strokeOpacity="0.8"
                style={{
                  filter: "drop-shadow(0 20px 45px rgba(0, 0, 0, 0.95))",
                }}
              />

              {/* Front Lip Laser Edge */}
              <line
                x1="122"
                y1="84"
                x2="558"
                y2="84"
                stroke={currentPrimitive.accent}
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#neon_glow_strong)"
              />

              {/* Horizontal Circuit Scanlines */}
              <line x1="140" y1="135" x2="540" y2="135" stroke={currentPrimitive.accent} strokeWidth="0.8" strokeOpacity="0.16" strokeDasharray="4 6" />
              <line x1="140" y1="215" x2="540" y2="215" stroke={currentPrimitive.accent} strokeWidth="0.8" strokeOpacity="0.16" strokeDasharray="4 6" />
              <line x1="140" y1="295" x2="540" y2="295" stroke={currentPrimitive.accent} strokeWidth="0.8" strokeOpacity="0.16" strokeDasharray="4 6" />

              {/* 4 Stepped Corner Reticles [ + ] */}
              <path d="M 136 98 L 136 112 M 136 98 L 150 98" stroke={currentPrimitive.accent} strokeWidth="2.2" strokeLinecap="square" />
              <path d="M 544 98 L 544 112 M 544 98 L 530 98" stroke={currentPrimitive.accent} strokeWidth="2.2" strokeLinecap="square" />
              <path d="M 136 352 L 136 338 M 136 352 L 150 352" stroke={currentPrimitive.accent} strokeWidth="2.2" strokeLinecap="square" />
              <path d="M 544 352 L 544 338 M 544 352 L 530 352" stroke={currentPrimitive.accent} strokeWidth="2.2" strokeLinecap="square" />
            </g>

            {/* 2. Hanging Semi-Translucent Cyber Flap (Front Apron) */}
            <g>
              <path
                d="M72 170L122 84L558 84L608 170C615 182 612 195 598 195H82C68 195 65 182 72 170Z"
                fill="#051022"
                fillOpacity="0.75"
                stroke={currentPrimitive.accent}
                strokeWidth="1.6"
                strokeOpacity="0.7"
              />
              <line x1="88" y1="194" x2="592" y2="194" stroke={currentPrimitive.accent} strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 4" />
            </g>

            {/* 3. Live HUD Telemetry Elements On Front Face */}
            <g transform="translate(150, 240)">
              <rect
                x="0"
                y="0"
                width="380"
                height="30"
                rx="6"
                fill="#030814"
                fillOpacity="0.95"
                stroke={currentPrimitive.accent}
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              {/* Dynamic Status Beacon */}
              <circle cx="16" cy="15" r="4" fill={currentPrimitive.accent} />
              <circle cx="16" cy="15" r="8" fill={currentPrimitive.accent} fillOpacity="0.3" className="animate-pulse" />
              <text
                x="32"
                y="19"
                fill={currentPrimitive.accent}
                fontFamily="var(--font-heading), monospace"
                fontSize="9.5"
                fontWeight="bold"
                letterSpacing="0.15em"
              >
                {isIndonesian ? "KONVERGENSI_INTI : TERSINKRONISASI" : "CORE_CONVERGENCE : SYNCHRONIZED"}
              </text>
              <text
                x="365"
                y="19"
                textAnchor="end"
                fill="#94a3b8"
                fontFamily="var(--font-mono), monospace"
                fontSize="8.5"
                letterSpacing="0.1em"
              >
                {isIndonesian ? "FREK 4.8GHz" : "FREQ 4.8GHz"}
              </text>
            </g>

            {/* Dynamic Equalizer Energy Bars */}
            <g transform="translate(235, 290)">
              {[
                { x: 0, h: 16 },
                { x: 14, h: 26 },
                { x: 28, h: 12 },
                { x: 42, h: 32 },
                { x: 56, h: 20 },
                { x: 70, h: 36 },
                { x: 84, h: 28 },
                { x: 98, h: 14 },
                { x: 112, h: 34 },
                { x: 126, h: 18 },
                { x: 140, h: 30 },
                { x: 154, h: 22 },
                { x: 168, h: 38 },
                { x: 182, h: 24 },
                { x: 196, h: 16 },
              ].map((bar, i) => (
                <rect
                  key={i}
                  x={bar.x}
                  y={40 - bar.h}
                  width="7"
                  height={bar.h}
                  rx="2"
                  fill={currentPrimitive.accent}
                  fillOpacity={0.35 + (i % 3) * 0.28}
                />
              ))}
            </g>

            {/* Bottom Directive Inscription */}
            <g transform="translate(340, 350)">
              <text
                textAnchor="middle"
                fill="#64748b"
                fontFamily="var(--font-pixel), cursive"
                fontSize="7.5"
                letterSpacing="0.22em"
              >
                {isIndonesian ? "[+] WADAH KONVERGENSI KONTINU" : "[+] CONTINUOUS CONVERGENCE RECEPTACLE"}
              </text>
            </g>
          </svg>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE PRIMITIVE SWITCHER CONTROLLER DECK             */}
      {/* ========================================================= */}
      <div className="flex flex-col items-center gap-3 z-30 w-full max-w-xl px-4">
        {/* Quick Select Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 w-full">
          {primitives.map((p, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={p.id}
                onClick={(e) => {
                  e.stopPropagation();
                  selectPrimitive(idx);
                }}
                className={`group/btn relative px-3.5 py-2 rounded-lg border font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#06152b] text-white font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                    : "bg-[#040814]/80 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200"
                }`}
                style={{
                  borderColor: isActive ? ACCENT_VAR[p.accent] ?? p.accent : undefined,
                }}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                    isActive ? "scale-125" : "scale-75 opacity-50"
                  }`}
                  style={{ backgroundColor: ACCENT_VAR[p.accent] ?? p.accent }}
                />
                <span>{p.title}</span>
                {isActive && (
                  <span
                    className="text-[9px] font-pixel px-1 rounded bg-black/50"
                    style={{ color: ACCENT_VAR[p.accent] ?? p.accent }}
                  >
                    {isIndonesian ? "AKTIF" : "ACTIVE"}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Live System Diagnostics Telemetry Readout */}
        <div className="flex items-center justify-between w-full text-[9px] font-mono text-slate-400 px-2 py-1 bg-black/40 border border-slate-800/60 rounded-md">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">STATUS: OPTIMAL</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>{isIndonesian ? "PIPELINE: DETERMINISTIK" : "PIPELINE: DETERMINISTIC"}</span>
            <span>{isIndonesian ? "TERVERIFIKASI: 100% LOLOS" : "VERIFIED: 100% PASS"}</span>
          </div>
          <div className="text-cyan-400 font-bold">
            {isIndonesian ? "LATENSI: <15MS" : "LATENCY: <15MS"}
          </div>
        </div>
      </div>
    </div>
  );
}
