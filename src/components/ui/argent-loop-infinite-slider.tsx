"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Cpu, Activity, ShieldAlert } from "lucide-react";
import { Github } from "@/components/ui/social-icons";
import Link from "next/link";
import MagneticEffect from "@/components/ui/MagneticEffect";
import { usePortfolio } from "@/context/PortfolioContext";

interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
  slug: string;
  metrics: string[];
  telemetryCode: string;
}

const PROJECT_DATA_EN: ProjectData[] = [
  {
    title: "Transformer Clinical Decision Support",
    image: "/gallery/FotoSC1.webp",
    category: "Deep Sequence Modeling & Healthcare",
    year: "2026",
    description: "Autoregressive Decision Transformer pipeline predicting continuous ICU drug dosages conditioned on longitudinal patient trajectories and target returns.",
    slug: "transformer-clinical",
    metrics: ["94.2% AUROC", "Continuous Dosage", "MIMIC-IV Cohorts"],
    telemetryCode: "TR-ATTN : HEADS 16 | LAYERS 24 | PARAMS 175M"
  },
  {
    title: "Safe-RL Sepsis Policy Ensemble",
    image: "/project/Sepsis_Treatment_Recommendation.jpeg",
    category: "Safety-Constrained Deep RL",
    year: "2025-2026",
    description: "Ensemble of 5 continuous Soft Actor-Critic agents enforcing dynamic Lagrangian safety corridors on arterial pressure and fluid balance across 20,913 ICU cohorts.",
    slug: "sepsis-rl-ensemble",
    metrics: ["20,913 Patients", "0.0% Breach Rate", "Lagrangian SAC"],
    telemetryCode: "SAC-ENS : 5 AGENTS | LAGRANGIAN CORRIDOR | MAP SAFE"
  },
  {
    title: "VLM Edge Industrial Defect Triage",
    image: "/project/AI-Defect_Triage.png",
    category: "Computer Vision & Edge VLMs",
    year: "2026",
    description: "Sub-50ms hybrid on-premises inspection coupling classical OpenCV spatial anomaly extraction with localized 4-bit LLaVA inference for air-gapped manufacturing.",
    slug: "vlm-defect-triage",
    metrics: ["<14ms Latency", "4-bit Quantized", "0.92 mAP@50"],
    telemetryCode: "EDGE-VLM : 4-BIT QUANT | LATENCY <14MS | ON-PREM"
  },
  {
    title: "Agentic Ops Enterprise Hybrid RAG",
    image: "/project/terraflowplatform1.webp",
    category: "Autonomous Agents & Enterprise RAG",
    year: "2025",
    description: "Deterministic LangGraph orchestrator featuring hybrid dense vector and BM25 sparse retrieval, guarded by a 3-layer cryptographic prompt injection shield.",
    slug: "agentic-ops-rag",
    metrics: ["Hybrid BM25 + Dense", "3-Tier Guardrails", "Sub-120ms P99"],
    telemetryCode: "RAG-OPS : DENSE + BM25 | 3-LAYER SHIELD | 100% PASS"
  },
  {
    title: "Aero-Flare Autonomous Wildfire AI",
    image: "/project/Aero-flare-project.png",
    category: "Geospatial AI & Satellite Telemetry",
    year: "2026",
    description: "Wildfire intelligence engine streaming real-time NASA FIRMS orbital thermal anomalies into Qwen2-VL multimodal triage and predictive geospatial spread forecasting.",
    slug: "aero-flare",
    metrics: ["NASA FIRMS Stream", "Qwen2-VL Multimodal", "99.1% Confidence"],
    telemetryCode: "NASA-GIS : VIIRS STREAM | QWEN2-VL | SPREAD 24H"
  },
];

const PROJECT_DATA_ID: ProjectData[] = [
  {
    title: "Transformer Dukungan Keputusan Klinis",
    image: "/gallery/FotoSC1.webp",
    category: "Pemodelan Sekuensial & Healthcare AI",
    year: "2026",
    description: "Pipeline Decision Transformer autoregresif memprediksi dosis obat kontinu ICU berdasarkan trajektori riwayat pasien longitudinal dan target return.",
    slug: "transformer-clinical",
    metrics: ["94.2% AUROC", "Dosis Kontinu", "Kohort MIMIC-IV"],
    telemetryCode: "TR-ATTN : HEADS 16 | LAYERS 24 | PARAMS 175M"
  },
  {
    title: "Ensemble Kebijakan Safe-RL Sepsis",
    image: "/project/Sepsis_Treatment_Recommendation.jpeg",
    category: "Deep RL dengan Batasan Keselamatan",
    year: "2025-2026",
    description: "Ensemble 5 agen continuous Soft Actor-Critic yang menegakkan koridor keselamatan Lagrangian dinamis pada tekanan arteri dan keseimbangan cairan di 20.913 kohort ICU.",
    slug: "sepsis-rl-ensemble",
    metrics: ["20.913 Pasien", "0.0% Pelanggaran", "Lagrangian SAC"],
    telemetryCode: "SAC-ENS : 5 AGENTS | LAGRANGIAN CORRIDOR | MAP SAFE"
  },
  {
    title: "Triase Cacat Industri VLM Edge",
    image: "/project/AI-Defect_Triage.png",
    category: "Computer Vision & VLM Edge",
    year: "2026",
    description: "Inspeksi on-premises hibrida sub-50ms memadukan ekstraksi anomali spasial OpenCV klasik dengan inferensi 4-bit LLaVA lokal untuk fasilitas manufaktur tertutup.",
    slug: "vlm-defect-triage",
    metrics: ["<14ms Latensi", "Terkuantisasi 4-bit", "0.92 mAP@50"],
    telemetryCode: "EDGE-VLM : 4-BIT QUANT | LATENCY <14MS | ON-PREM"
  },
  {
    title: "RAG Hibrida Perusahaan Agentic Ops",
    image: "/project/terraflowplatform1.webp",
    category: "Agen Otonom & RAG Perusahaan",
    year: "2025",
    description: "Orkestrator LangGraph deterministik dengan retrieval dense vector dan BM25 sparse, dilindungi perisai kriptografis pertahanan prompt 3-lapis.",
    slug: "agentic-ops-rag",
    metrics: ["Hibrida BM25 + Vektor", "Perisai 3-Lapis", "Sub-120ms P99"],
    telemetryCode: "RAG-OPS : DENSE + BM25 | 3-LAYER SHIELD | 100% PASS"
  },
  {
    title: "AI Kebakaran Hutan Otonom Aero-Flare",
    image: "/project/Aero-flare-project.png",
    category: "Geospatial AI & Telemetri Satelit",
    year: "2026",
    description: "Engine intelijen kebakaran hutan mengalirkan anomali termal orbital NASA FIRMS real-time ke dalam triase multimodal Qwen2-VL dan prakiraan persebaran geospasial.",
    slug: "aero-flare",
    metrics: ["Stream NASA FIRMS", "Multimodal Qwen2-VL", "99.1% Akurasi"],
    telemetryCode: "NASA-GIS : VIIRS STREAM | QWEN2-VL | SPREAD 24H"
  },
];

// Interactive 3D Holographic Viewport with true 3D layer depth
function Interactive3DViewport({ 
  image, 
  title, 
  category,
  telemetryCode
}: { 
  image: string; 
  title: string; 
  category: string; 
  telemetryCode: string;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 220, damping: 24 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] aspect-[16/10] select-none mx-auto lg:mx-0"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded bg-[#02040a] border border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.2)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(0,240,255,0.4)]"
      >
        {/* Recessed Project Image Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ transform: "translateZ(0px)" }}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.08] transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Dynamic Holographic Cursor Glare */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(0,240,255,0.5) 0%, transparent 60%)`
            ),
            transform: "translateZ(10px)"
          }}
        />

        {/* Cyber Scanline Grid Overlay */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.04)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-60"
          style={{ transform: "translateZ(15px)" }}
        />

        {/* Stepped Pixel Corner Brackets Floating in 3D Space */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20 shadow-[0_0_8px_#00f0ff]" style={{ transform: "translateZ(25px)" }} />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-20 shadow-[0_0_8px_#00f0ff]" style={{ transform: "translateZ(25px)" }} />
        <div className="absolute bottom-6 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-20 shadow-[0_0_8px_#00f0ff]" style={{ transform: "translateZ(25px)" }} />
        <div className="absolute bottom-6 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-20 shadow-[0_0_8px_#00f0ff]" style={{ transform: "translateZ(25px)" }} />

        {/* HUD Crosshairs */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400/90 pointer-events-none z-20" style={{ transform: "translateZ(20px)" }}>+</div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-400/90 pointer-events-none z-20" style={{ transform: "translateZ(20px)" }}>+</div>
        <div className="absolute bottom-8 left-2 text-[10px] font-mono text-cyan-400/90 pointer-events-none z-20" style={{ transform: "translateZ(20px)" }}>+</div>
        <div className="absolute bottom-8 right-2 text-[10px] font-mono text-cyan-400/90 pointer-events-none z-20" style={{ transform: "translateZ(20px)" }}>+</div>

        {/* Top-Right Floating Neural Status Chip */}
        <div 
          className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/40 text-[9px] font-mono font-bold text-cyan-300 pointer-events-none z-20 flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
          style={{ transform: "translateZ(28px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#00ff66]" />
          <span>NEURAL VIEW 3D</span>
        </div>

        {/* Bottom Telemetry HUD Banner Floating in 3D Space */}
        <div 
          className="absolute bottom-0 inset-x-0 bg-[#040814]/95 backdrop-blur-md border-t border-cyan-500/40 px-3.5 py-1.5 flex items-center justify-between text-[9px] font-mono text-cyan-300/90 z-20"
          style={{ transform: "translateZ(24px)" }}
        >
          <span className="truncate max-w-[70%] uppercase font-semibold text-zinc-200">{telemetryCode}</span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
            LIVE
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function ArgentLoopInfiniteSlider() {
  const { language, isDark } = usePortfolio();
  const projectData = language === "id" ? PROJECT_DATA_ID : PROJECT_DATA_EN;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.8 });

  const projectArea = 0.85;
  const projectStep = projectArea / projectData.length; // 0.17

  // Track active slide index from scroll
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.max(0, Math.floor(v / projectStep)),
        projectData.length - 1
      );
      setActiveIdx(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, projectStep, projectData.length]);

  // Programmatic smooth scroll to specific slide
  const scrollToSlide = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, projectData.length - 1));
    setActiveIdx(clampedIndex);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const containerTop = rect.top + scrollTop;
    const totalScrollableDistance = containerRef.current.offsetHeight - window.innerHeight;

    // Center the target progress within the slide's bracket
    const targetProgress = clampedIndex * projectStep + projectStep * 0.45;
    const targetY = containerTop + targetProgress * totalScrollableDistance;

    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetY, { duration: 1.0, immediate: false });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  // Global backgrounds and button transitions
  const bgOpacity = useTransform(smoothProgress, [0, 0.05, projectArea, 1], [0, 1, 1, 0]);
  const mainUIOpacity = useTransform(smoothProgress, [0, 0.04, projectArea, 0.95], [0, 1, 1, 0]);
  const buttonOpacity = useTransform(smoothProgress, [projectArea, projectArea + 0.06], [0, 1]);
  const containerShiftY = useTransform(smoothProgress, [projectArea, projectArea + 0.06], ["0px", "-40px"]);

  const currentProject = projectData[activeIdx] || projectData[0];
  const num = (activeIdx + 1).toString().padStart(2, "0");

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <style>{`
        .custom-btn {
          background: #040814;
          color: #00f0ff;
          border: 1px solid rgba(0, 240, 255, 0.6);
          border-radius: 4px;
          padding: 1rem 2.4rem;
          font-family: var(--font-pixel), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 0 25px rgba(0, 240, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .custom-btn:hover {
          background: #00f0ff;
          color: #02040a;
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.7);
        }
        .custom-btn-arrow,
        .custom-btn-github {
          border: 1px solid rgba(0, 240, 255, 0.6);
          width: 50px;
          height: 50px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 25px rgba(0, 240, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .custom-btn-arrow:hover,
        .custom-btn-github:hover {
          background: #00f0ff !important;
          color: #02040a !important;
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.7) !important;
        }
      `}</style>

      {/* Sticky Fullscreen Wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-background dark:bg-[#02040a] z-20 flex items-center justify-center">
        {/* Ambient Blurred Project Background Synchronized with Active Slide */}
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 z-10" 
            style={{
              background: isDark
                ? "radial-gradient(circle at center, rgba(4, 8, 20, 0.45) 10%, #02040a 92%)"
                : "radial-gradient(circle at center, rgba(240, 245, 255, 0.6) 10%, #f8fafc 92%)"
            }} 
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${activeIdx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover filter brightness-[0.15] blur-2xl contrast-125 transform scale-110"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Main Central Cyberdeck Console */}
        <motion.div
          style={{ 
            opacity: mainUIOpacity, 
            y: containerShiftY,
            willChange: "transform, opacity" 
          }}
          className="relative z-30 w-[94vw] max-w-[1360px] flex flex-col items-center pointer-events-auto px-2"
        >
          {/* Cyberdeck Outer Glass Frame */}
          <div className="relative w-full rounded-md bg-card/95 dark:bg-[#040814]/92 backdrop-blur-2xl border border-cyan-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_0_60px_-10px_rgba(0,240,255,0.25),inset_0_0_30px_rgba(0,240,255,0.04),0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Stepped Pixel Corner Accents */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-30 shadow-[0_0_8px_#00f0ff]" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-30 shadow-[0_0_8px_#00f0ff]" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-30 shadow-[0_0_8px_#00f0ff]" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-30 shadow-[0_0_8px_#00f0ff]" />

            {/* Subtle Cyber Scanline Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-0 opacity-40" />

            <div className="relative z-10 p-5 sm:p-7 md:p-8 lg:p-10 flex flex-col justify-between">
              {/* Top HUD Console Header */}
              <div className="w-full flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6 md:mb-8">
                {/* Status indicator & directive */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                  </div>
                  <span className="font-pixel text-[9px] sm:text-[11px] text-cyan-600 dark:text-cyan-400/90 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                    {language === "id" ? "KONSOL SISTEM : ARSITEKTUR UTAMA" : "SYSTEM CONSOLE : CORE ARCHITECTURES"}
                  </span>
                </div>

                {/* Quick-Jump Slide Selector Tabs */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {projectData.map((p, pIdx) => {
                    const isCurrent = activeIdx === pIdx;
                    return (
                      <button
                        key={pIdx}
                        onClick={() => scrollToSlide(pIdx)}
                        className={`px-2.5 py-1 text-[10px] sm:text-xs font-mono font-bold rounded transition-all duration-300 ${
                          isCurrent
                            ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.8)] scale-105"
                            : "bg-slate-100 dark:bg-[#061022] text-slate-700 dark:text-cyan-400/60 border border-slate-300 dark:border-cyan-500/20 hover:border-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-200"
                        }`}
                        title={p.title}
                      >
                        0{pIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Content Area: Single Active Slide Rendered with AnimatePresence */}
              <div className="relative w-full min-h-[360px] sm:min-h-[390px] md:min-h-[410px] lg:min-h-[430px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
                  >
                    {/* Left Column: Comprehensive Intel & Telemetry (60% width on Desktop) */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-4 md:space-y-5 pr-0 lg:pr-2">
                      {/* Domain Tag & Timeline Badge */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-pixel text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm tracking-widest drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                            {num} .
                          </span>
                          <span className="font-mono text-[10px] sm:text-xs font-semibold text-cyan-700 dark:text-cyan-300 uppercase px-2.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-500/30">
                            {currentProject.category}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] sm:text-xs text-emerald-700 dark:text-emerald-400 font-bold tracking-wider px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 shadow-[0_0_10px_rgba(0,255,102,0.2)]">
                          {currentProject.year}
                        </span>
                      </div>

                      {/* Project Title: Generous Full-Width Typography, 0% Truncation */}
                      <h3 className="font-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        {currentProject.title}
                      </h3>

                      {/* Complete Description: Ample space, 0% Truncation */}
                      <p className="font-sans text-xs sm:text-sm md:text-[15px] text-slate-600 dark:text-zinc-300 leading-relaxed drop-shadow-sm max-w-2xl">
                        {currentProject.description}
                      </p>

                      {/* Empirical Telemetry & Specs Chips */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {currentProject.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="flex items-center gap-2 px-3 py-1 rounded bg-cyan-50 dark:bg-[#071328]/80 border border-cyan-500/30 text-cyan-800 dark:text-cyan-200 text-[11px] sm:text-xs font-mono tracking-wide shadow-[0_0_10px_rgba(0,240,255,0.08)]"
                          >
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00f0ff]" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions & Slide Navigation Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <Link
                          href={`/projects/${currentProject.slug}`}
                          className="font-mono text-xs uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 px-5 py-2.5 rounded font-bold transition-all duration-300 inline-flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)]"
                        >
                          <span>{language === "id" ? "Lihat Sistem" : "View System"}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>

                        {/* Quick Step Buttons */}
                        <div className="flex items-center gap-1.5 ml-2">
                          <button
                            onClick={() => scrollToSlide(activeIdx - 1)}
                            disabled={activeIdx === 0}
                            className="px-2.5 py-2 rounded font-mono text-xs uppercase border border-cyan-500/30 text-cyan-800 dark:text-cyan-300 hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 disabled:opacity-25 disabled:pointer-events-none transition-all flex items-center gap-1"
                            title={language === "id" ? "Sistem Sebelumnya" : "Previous System"}
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{language === "id" ? "SEBELUMNYA" : "PREV"}</span>
                          </button>
                          <button
                            onClick={() => scrollToSlide(activeIdx + 1)}
                            disabled={activeIdx === projectData.length - 1}
                            className="px-2.5 py-2 rounded font-mono text-xs uppercase border border-cyan-500/30 text-cyan-800 dark:text-cyan-300 hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 disabled:opacity-25 disabled:pointer-events-none transition-all flex items-center gap-1"
                            title={language === "id" ? "Sistem Selanjutnya" : "Next System"}
                          >
                            <span className="hidden sm:inline">{language === "id" ? "SELANJUTNYA" : "NEXT"}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: 3D Holographic Viewport (40% width on Desktop) */}
                    <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
                      <Interactive3DViewport
                        image={currentProject.image}
                        title={currentProject.title}
                        category={currentProject.category}
                        telemetryCode={currentProject.telemetryCode}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom HUD Telemetry Footer Bar */}
              <div className="w-full flex items-center justify-between border-t border-cyan-500/20 pt-4 mt-6 md:mt-8">
                {/* Slide Counter */}
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[9px] text-cyan-600 dark:text-cyan-400/80 tracking-widest uppercase">
                    {language === "id" ? "HALAMAN" : "PAGE"}
                  </span>
                  <span className="font-mono text-xs text-cyan-800 dark:text-cyan-300 font-bold tabular-nums">
                    0{activeIdx + 1} / 0{projectData.length}
                  </span>
                </div>

                {/* Cyber Progress Track Line */}
                <div className="w-32 sm:w-48 md:w-64 h-1.5 bg-slate-200 dark:bg-cyan-950/60 rounded-full border border-slate-300 dark:border-cyan-500/30 overflow-hidden relative mx-4">
                  <div
                    className="h-full bg-cyan-400 shadow-[0_0_12px_#00f0ff] transition-all duration-300"
                    style={{ width: `${((activeIdx + 1) / projectData.length) * 100}%` }}
                  />
                </div>

                {/* Direct Interactive Dot Markers */}
                <div className="flex items-center gap-2">
                  {projectData.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => scrollToSlide(dotIdx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeIdx === dotIdx
                          ? "bg-cyan-400 scale-125 shadow-[0_0_8px_#00f0ff]"
                          : "bg-slate-300 dark:bg-cyan-900/60 hover:bg-cyan-400"
                      }`}
                      title={language === "id" ? `Lompat ke sistem 0${dotIdx + 1}` : `Jump to system 0${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* End of Slider CTA Actions */}
          <motion.div
            style={{
              opacity: buttonOpacity,
              pointerEvents: useTransform(smoothProgress, (v) => (v > projectArea ? "auto" : "none")),
            }}
            className="w-full flex items-center justify-center pt-8"
          >
            <div className="flex items-center gap-4 pointer-events-auto">
              <MagneticEffect>
                <a
                  href="https://github.com/raihanghifariw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-btn-github hover:scale-105 active:scale-95 transition-transform block"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
              </MagneticEffect>

              <MagneticEffect>
                <div className="group-projects flex items-center gap-2">
                  <Link href="/projects" className="custom-btn hover:scale-105 active:scale-95">
                    <span>{language === "id" ? "Jelajahi Semua Sistem" : "Explore All Systems"}</span>
                  </Link>
                  <Link href="/projects" className="custom-btn-arrow hover:scale-105 active:scale-95 transition-transform">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </MagneticEffect>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
