"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Grid,
  ListFilter,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Calendar,
  User,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePortfolio } from "@/context/PortfolioContext";

interface Publication {
  id: string;
  issueNumber: string;
  date: string;
  category: string;
  title: string;
  subtitle: string;
  abstract: string;
  author: string;
  badges: string[];
  coverGradient: string;
  accentColor: string;
  link: string;
}

const PUBLICATIONS_EN: Publication[] = [
  {
    id: "pub-1",
    issueNumber: "VOLUME 01 • 2026",
    date: "JANUARY 15, 2026",
    category: "DEEP REINFORCEMENT LEARNING",
    title: "Safe Continuous Soft Actor-Critic (SAC) for Sepsis Treatment Recommendation",
    subtitle: "Lagrangian safety multipliers on 20,913 longitudinal ICU trajectories",
    abstract:
      "This foundational 2026 paper formulates continuous action SAC ensembles with adaptive Lagrangian safety bounds. Evaluated against clinicians on MIMIC-III, our policy achieves an estimated 75.31% 90-day survival rate vs 73.55% clinician baseline, penalizing unsafe vasopressor over-titration.",
    author: "Raihan Ghifari Winata",
    badges: ["MIMIC-III", "Continuous SAC", "75.31% Survival", "Lagrangian Bounds"],
    coverGradient: "from-cyan-950 via-slate-900 to-black",
    accentColor: "#00f0ff",
    link: "/projects/sepsis-rl-ensemble",
  },
  {
    id: "pub-2",
    issueNumber: "VOLUME 02 • 2025",
    date: "DECEMBER 08, 2025",
    category: "SEQUENTIAL MODELING",
    title: "Offline Decision Transformers vs Continuous Actor-Critic in Clinical RL",
    subtitle: "Comparing autoregressive sequence modeling with temporal-difference learning",
    abstract:
      "Benchmarking Decision Transformers (DT) against policy-gradient TD learning on heterogeneous physiological state spaces. Explores context length trade-offs, conditioning on desired returns-to-go, and stochastic reward credit assignment across irregular ICU observations.",
    author: "Raihan Ghifari Winata",
    badges: ["Decision Transformer", "Sequence Modeling", "Offline RL", "Attention Maps"],
    coverGradient: "from-blue-950 via-indigo-950 to-black",
    accentColor: "#38bdf8",
    link: "/projects/transformer-clinical",
  },
  {
    id: "pub-3",
    issueNumber: "VOLUME 03 • 2025",
    date: "NOVEMBER 19, 2025",
    category: "COMPUTER VISION & EDGE AI",
    title: "Sub-50ms Edge Vision-Language Triage: Quantized LLaVA Defect Inspection",
    subtitle: "Zero cloud data leakage with micro-second deterministic inference",
    abstract:
      "Deploying quantized 4-bit Vision-Language Models directly to factory floor edge nodes. Achieves 42ms per-frame surface anomaly triage with strict zero-cloud data privacy, automated bounding polygon extraction, and Pydantic structured output validation.",
    author: "Raihan Ghifari Winata",
    badges: ["Edge VLM", "LLaVA Quantization", "42ms Latency", "Pydantic"],
    coverGradient: "from-emerald-950 via-teal-950 to-black",
    accentColor: "#10b981",
    link: "/projects/vlm-defect-triage",
  },
  {
    id: "pub-4",
    issueNumber: "VOLUME 04 • 2025",
    date: "OCTOBER 24, 2025",
    category: "AGENTIC SYSTEMS & MLOPS",
    title: "Hardening Enterprise RAG: Multi-Agent Confidence Routing & Prompt Shields",
    subtitle: "Deterministic LangGraph orchestrator with hybrid vector + BM25 retrieval",
    abstract:
      "A production blueprint for high-consequence enterprise RAG architectures. Implements multi-tier prompt injection shields, semantic cache invalidation, hybrid Qdrant + BM25 re-ranking, and deterministic fallback gates for mission-critical engineering documentation.",
    author: "Raihan Ghifari Winata",
    badges: ["LangGraph", "Qdrant Vector DB", "Hybrid BM25", "Defense in Depth"],
    coverGradient: "from-purple-950 via-violet-950 to-black",
    accentColor: "#a855f7",
    link: "/projects/agentic-ops-rag",
  },
  {
    id: "pub-5",
    issueNumber: "VOLUME 05 • 2025",
    date: "SEPTEMBER 12, 2025",
    category: "HIGH-PERFORMANCE COMPUTING",
    title: "Scaling 20,913 MIMIC-III ICU Trajectories: 10× Training Acceleration with CUDA",
    subtitle: "Overcoming state space volatility in clinical electronic health records",
    abstract:
      "Technical deep-dive on GPU parallelization for sequential offline reinforcement learning. Demonstrates how custom PyTorch memory pinning, vectorized replay buffers, and mixed-precision gradient computation reduced wall-clock training from 18 hours to 1.8 hours.",
    author: "Raihan Ghifari Winata",
    badges: ["CUDA", "10× Speedup", "PyTorch Parallel", "HPC MLOps"],
    coverGradient: "from-amber-950 via-orange-950 to-black",
    accentColor: "#f59e0b",
    link: "/projects/sepsis-rl-ensemble",
  },
  {
    id: "pub-6",
    issueNumber: "VOLUME 06 • 2025",
    date: "AUGUST 30, 2025",
    category: "THEORETICAL REINFORCEMENT LEARNING",
    title: "Lagrangian Safety Boundaries in Continuous Control Decisions",
    subtitle: "Constraining policy distributions under stochastic clinical penalty functions",
    abstract:
      "A mathematical examination of Constrained Markov Decision Processes (CMDPs). We prove that dual gradient ascent on Lagrangian multipliers guarantees non-violating exploration boundaries even in volatile multi-variable state spaces without sacrificing policy convergence.",
    author: "Raihan Ghifari Winata",
    badges: ["CMDP", "Lagrangian Duality", "Continuous Control", "Safe RL"],
    coverGradient: "from-rose-950 via-zinc-950 to-black",
    accentColor: "#f43f5e",
    link: "/projects/sepsis-rl-ensemble",
  },
];

const PUBLICATIONS_ID: Publication[] = [
  {
    id: "pub-1",
    issueNumber: "VOLUME 01 • 2026",
    date: "15 JANUARI 2026",
    category: "DEEP REINFORCEMENT LEARNING",
    title: "Safe Continuous Soft Actor-Critic (SAC) untuk Rekomendasi Pengobatan Sepsis",
    subtitle: "Pengali keselamatan Lagrangian pada 20.913 trajektori longitudinal ICU",
    abstract:
      "Makalah fundamental tahun 2026 ini memformulasikan ensemble continuous SAC dengan batas keselamatan Lagrangian adaptif. Dievaluasi terhadap dokter di MIMIC-III, kebijakan ini meraih estimasi survival rate 90-hari sebesar 75.31% vs 73.55% baseline dokter, mencegah over-titrasi vasopressor yang tidak aman.",
    author: "Raihan Ghifari Winata",
    badges: ["MIMIC-III", "Continuous SAC", "Survival 75.31%", "Batasan Lagrangian"],
    coverGradient: "from-cyan-950 via-slate-900 to-black",
    accentColor: "#00f0ff",
    link: "/projects/sepsis-rl-ensemble",
  },
  {
    id: "pub-2",
    issueNumber: "VOLUME 02 • 2025",
    date: "08 DESEMBER 2025",
    category: "PEMODELAN SEKUENSIAL",
    title: "Offline Decision Transformers vs Continuous Actor-Critic dalam RL Klinis",
    subtitle: "Membandingkan pemodelan sekuensial autoregresif dengan temporal-difference learning",
    abstract:
      "Benchmarking Decision Transformers (DT) terhadap policy-gradient TD learning pada ruang status fisiologis heterogen. Mengeksplorasi trade-off panjang konteks, pengkondisian target return-to-go, dan atribusi reward stokastik pada observasi ICU.",
    author: "Raihan Ghifari Winata",
    badges: ["Decision Transformer", "Pemodelan Sekuensial", "Offline RL", "Attention Maps"],
    coverGradient: "from-blue-950 via-indigo-950 to-black",
    accentColor: "#38bdf8",
    link: "/projects/transformer-clinical",
  },
  {
    id: "pub-3",
    issueNumber: "VOLUME 03 • 2025",
    date: "19 NOVEMBER 2025",
    category: "COMPUTER VISION & VLM EDGE",
    title: "Triase VLM Edge Sub-50ms: Inspeksi Cacat LLaVA Terkuantisasi",
    subtitle: "Nol kebocoran data cloud dengan inferensi deterministik mikrodetik",
    abstract:
      "Mendeploy model Vision-Language 4-bit terkuantisasi langsung pada node edge lantai pabrik. Mencapai triase anomali permukaan 42ms per frame dengan privasi data cloud nol, ekstraksi poligon otomatis, dan validasi output terstruktur Pydantic.",
    author: "Raihan Ghifari Winata",
    badges: ["Edge VLM", "Kuantisasi LLaVA", "Latensi 42ms", "Pydantic"],
    coverGradient: "from-emerald-950 via-teal-950 to-black",
    accentColor: "#10b981",
    link: "/projects/vlm-defect-triage",
  },
  {
    id: "pub-4",
    issueNumber: "VOLUME 04 • 2025",
    date: "24 OKTOBER 2025",
    category: "SISTEM AGEN & MLOPS",
    title: "Penguatan RAG Enterprise: Multi-Agent Confidence Routing & Perisai Prompt",
    subtitle: "Orkestrator LangGraph deterministik dengan retrieval hibrida dense vector + BM25",
    abstract:
      "Cetak biru produksi arsitektur RAG enterprise berkonsekuensi tinggi. Mengimplementasikan perisai injeksi prompt berlapis, semantic cache invalidation, re-ranking hibrida Qdrant + BM25, dan fallback deterministik untuk dokumentasi rekayasa mission-critical.",
    author: "Raihan Ghifari Winata",
    badges: ["LangGraph", "Qdrant Vector DB", "Hibrida BM25", "Pertahanan Berlapis"],
    coverGradient: "from-purple-950 via-violet-950 to-black",
    accentColor: "#a855f7",
    link: "/projects/agentic-ops-rag",
  },
  {
    id: "pub-5",
    issueNumber: "VOLUME 05 • 2025",
    date: "12 SEPTEMBER 2025",
    category: "KOMPUTASI KINERJA TINGGI",
    title: "Penskalaan 20.913 Trajektori ICU MIMIC-III: 10× Akselerasi Training dengan CUDA",
    subtitle: "Mengatasi volatilitas ruang status pada rekam medis elektronik klinis",
    abstract:
      "Investigasi teknis mendalam tentang paralelisasi GPU untuk offline reinforcement learning sekuensial. Mendemonstrasikan bagaimana memory pinning kustom PyTorch, vectorized replay buffer, dan mixed-precision gradient computation memangkas waktu training dari 18 jam menjadi 1.8 jam.",
    author: "Raihan Ghifari Winata",
    badges: ["CUDA", "Akselerasi 10×", "PyTorch Paralel", "MLOps HPC"],
    coverGradient: "from-amber-950 via-orange-950 to-black",
    accentColor: "#f59e0b",
    link: "/projects/sepsis-rl-ensemble",
  },
  {
    id: "pub-6",
    issueNumber: "VOLUME 06 • 2025",
    date: "30 AGUSTUS 2025",
    category: "TEORI REINFORCEMENT LEARNING",
    title: "Batas Keselamatan Lagrangian dalam Keputusan Kontrol Kontinu",
    subtitle: "Membatasi distribusi kebijakan di bawah fungsi penalti klinis stokastik",
    abstract:
      "Kajian matematis tentang Constrained Markov Decision Processes (CMDPs). Kami membuktikan bahwa dual gradient ascent pada pengali Lagrangian menjamin eksplorasi tanpa pelanggaran batas bahkan pada ruang status multi-variabel yang volatil tanpa mengorbankan konvergensi kebijakan.",
    author: "Raihan Ghifari Winata",
    badges: ["CMDP", "Dualitas Lagrangian", "Kontrol Kontinu", "Safe RL"],
    coverGradient: "from-rose-950 via-zinc-950 to-black",
    accentColor: "#f43f5e",
    link: "/projects/sepsis-rl-ensemble",
  },
];

type ViewPerspective = "stacked" | "grid" | "traditional";

export function BlogArchive3D() {
  const { language, isDark } = usePortfolio();
  const isId = language === "id";
  const publications = isId ? PUBLICATIONS_ID : PUBLICATIONS_EN;
  const [activePerspective, setActivePerspective] = useState<ViewPerspective>("stacked");
  const [activeIndex, setActiveIndex] = useState(0);
  const activePub = publications[activeIndex] || publications[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % publications.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + publications.length) % publications.length);
  };

  return (
    <section
      id="publications"
      className="relative w-full min-h-[900px] bg-background dark:bg-[#030712] text-foreground dark:text-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden select-none"
    >
      {/* Tron Grid Atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,240,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Main 3-Column Layout from NewYorkOver Video */}
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* LEFT SIDEBAR: Header & Perspective Switcher (3 cols) */}
        <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 uppercase bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded">
                {isId ? "PUBLIKASI RISET" : "RESEARCH PUBLICATIONS"}
              </span>
            </div>
            <h2 className="font-display pixel-2xl text-slate-900 dark:text-white uppercase leading-snug">
              {isId ? "ARSIP RISET" : "RESEARCH ARCHIVE"}
            </h2>
            <p className="font-body text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-4 leading-relaxed">
              {isId
                ? "Publikasi teknis, riset reinforcement learning klinis, dan arsitektur pemodelan sekuensial mendalam."
                : "Technical publications, clinical reinforcement learning research, and deep sequence modeling architectures."}
            </p>
          </div>

          {/* Perspective Selector (Matching NewYorkOver Buttons) */}
          <div className="space-y-2 pt-2">
            <span className="text-[9.5px] font-mono font-bold tracking-[0.25em] text-slate-500 dark:text-zinc-500 uppercase block mb-2">
              {isId ? "PILIH PERSPEKTIF" : "SELECT PERSPECTIVE"}
            </span>

            <button
              onClick={() => setActivePerspective("stacked")}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl border text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300",
                activePerspective === "stacked"
                  ? "bg-cyan-500/15 border-cyan-500 text-cyan-700 dark:text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  : "bg-card dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
              )}
            >
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{isId ? "TAMPILAN TUMPUK" : "STACKED VIEW"}</span>
            </button>

            <button
              onClick={() => setActivePerspective("grid")}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl border text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300",
                activePerspective === "grid"
                  ? "bg-cyan-500/15 border-cyan-500 text-cyan-700 dark:text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  : "bg-card dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
              )}
            >
              <Grid className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{isId ? "TAMPILAN GRID" : "GRID VIEW"}</span>
            </button>

            <button
              onClick={() => setActivePerspective("traditional")}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl border text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300",
                activePerspective === "traditional"
                  ? "bg-cyan-500/15 border-cyan-500 text-cyan-700 dark:text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  : "bg-card dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
              )}
            >
              <ListFilter className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{isId ? "TAMPILAN TRADISIONAL" : "TRADITIONAL VIEW"}</span>
            </button>
          </div>

          {/* Navigation Controls */}
          {activePerspective === "stacked" && (
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-card dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all active:scale-95 text-slate-700 dark:text-zinc-300"
                title={isId ? "Publikasi sebelumnya" : "Previous publication"}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 text-center font-mono text-xs font-bold text-slate-700 dark:text-zinc-400">
                {isId ? "EDISI" : "ISSUE"} <span className="text-cyan-600 dark:text-cyan-400">{activeIndex + 1}</span> / {publications.length}
              </div>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-card dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all active:scale-95 text-slate-700 dark:text-zinc-300"
                title={isId ? "Publikasi selanjutnya" : "Next publication"}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Footer Citation */}
          <div className="pt-6 border-t border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-500 dark:text-zinc-500 tracking-wider uppercase">
            {isId ? "© 2026 • PUBLIKASI RISET & SISTEM" : "© 2026 • RESEARCH & SYSTEMS DISPATCHES"}
          </div>
        </div>

        {/* CENTER STAGE: 3D Isometric Stack / Grid Stage (6 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center min-h-[550px] relative">
          {activePerspective === "stacked" && (
            <div className="relative w-full h-[540px] flex items-center justify-center perspective-[1200px]">
              {/* 3D Diagonal Perspective Stack from NewYorkOver */}
              <div
                className="relative w-[320px] sm:w-[360px] h-[460px] sm:h-[500px] transition-transform duration-700 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(18deg) rotateY(-22deg) rotateZ(8deg)",
                }}
              >
                {publications.map((pub, idx) => {
                  const offset = idx - activeIndex;
                  const isCurrent = idx === activeIndex;

                  // 3D Isometric depth calculation
                  const zDepth = -Math.abs(offset) * 55;
                  const xShift = offset * 42;
                  const yShift = -offset * 20;
                  const opacity = Math.max(1 - Math.abs(offset) * 0.22, 0.15);

                  return (
                    <motion.div
                      key={pub.id}
                      onClick={() => setActiveIndex(idx)}
                      animate={{
                        x: xShift,
                        y: yShift,
                        z: isCurrent ? 40 : zDepth,
                        scale: isCurrent ? 1.05 : 1 - Math.abs(offset) * 0.05,
                        opacity: opacity,
                      }}
                      transition={{ type: "spring", damping: 24, stiffness: 220 }}
                      className={cn(
                        "absolute inset-0 rounded-2xl p-6 flex flex-col justify-between border cursor-pointer shadow-2xl backdrop-blur-xl transition-shadow duration-300 select-none",
                        isCurrent
                          ? "border-cyan-500 dark:border-cyan-400 shadow-[0_10px_35px_rgba(2,132,199,0.2)] dark:shadow-[0_20px_60px_rgba(0,240,255,0.4)] z-30 ring-2 ring-cyan-500/40 dark:ring-cyan-400/40"
                          : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 z-10"
                      )}
                      style={{
                        background: isDark
                          ? `linear-gradient(145deg, rgba(15,23,42,0.95) 0%, rgba(3,7,18,0.98) 100%)`
                          : `linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)`,
                      }}
                    >
                      {/* Top Header of Magazine Cover */}
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/15">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
                            {pub.issueNumber}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 dark:text-zinc-400">
                            {isId ? "TINJAUAN SEJAWAT" : "PEER REVIEWED"}
                          </span>
                        </div>
                        <div className="pt-4">
                          <span className="text-[9px] font-mono font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                            {pub.category}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-white mt-1 leading-snug">
                            {pub.title}
                          </h3>
                        </div>
                      </div>

                      {/* Cover Center Art / Abstract Blueprint Graphic */}
                      <div className="relative my-auto py-4 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border border-slate-300 dark:border-cyan-500/30 flex items-center justify-center relative bg-slate-50 dark:bg-transparent">
                          <div className="w-16 h-16 rounded-full border border-dashed border-cyan-500/60 dark:border-cyan-400/60 animate-spin-slow" />
                          <BookOpen className="w-7 h-7 text-cyan-600 dark:text-cyan-300 absolute" />
                        </div>
                      </div>

                      {/* Bottom Footer of Magazine Cover */}
                      <div className="pt-4 border-t border-slate-200 dark:border-white/15 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                        <span>RAIHAN G. WINATA</span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">{pub.date}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {activePerspective === "grid" && (
            <div className="grid grid-cols-2 gap-4 w-full">
              {publications.map((pub, idx) => (
                <div
                  key={pub.id}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer",
                    idx === activeIndex
                      ? "border-cyan-500 dark:border-cyan-400 bg-cyan-500/10 dark:bg-cyan-950/40 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                      : "border-slate-200 dark:border-white/10 bg-card dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20"
                  )}
                >
                  <span className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400 uppercase block">
                    {pub.issueNumber}
                  </span>
                  <h4 className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                    {pub.title}
                  </h4>
                  <span className="text-[9px] text-slate-500 dark:text-zinc-400 block mt-2">{pub.date}</span>
                </div>
              ))}
            </div>
          )}

          {activePerspective === "traditional" && (
            <div className="w-full space-y-3">
              {publications.map((pub, idx) => (
                <div
                  key={pub.id}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                    idx === activeIndex
                      ? "border-cyan-500 dark:border-cyan-400 bg-cyan-500/10 dark:bg-cyan-950/40"
                      : "border-slate-200 dark:border-white/10 bg-card dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20"
                  )}
                >
                  <div>
                    <span className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400 uppercase">
                      {pub.issueNumber} • {pub.date}
                    </span>
                    <h4 className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {pub.title}
                    </h4>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-zinc-400 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: Publication Details Panel from NewYorkOver Video (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-card/95 dark:bg-zinc-950/70 border border-slate-200 dark:border-cyan-500/25 rounded-2xl p-6 md:p-8 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="space-y-4">
            {/* Date Tag */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <span className="font-heading text-xs font-bold tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase">
                {activePub.date}
              </span>
              <span className="font-heading text-xs text-slate-500 dark:text-zinc-400">
                {activePub.issueNumber}
              </span>
            </div>

            {/* Author Citation */}
            <div className="flex items-center gap-2 font-heading text-xs text-slate-700 dark:text-zinc-300">
              <User className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>
                {isId ? "Peneliti Utama: " : "Lead Researcher: "}
                <strong className="text-slate-900 dark:text-white font-bold">{activePub.author}</strong>
              </span>
            </div>

            {/* Architecture Focus / Subtitle */}
            <div className="space-y-1 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold block">
                {isId ? "ARSITEKTUR INTI" : "CORE ARCHITECTURE"}
              </span>
              <h3 className="font-heading text-base md:text-lg font-bold tracking-tight text-emerald-600 dark:text-emerald-300 leading-snug">
                {activePub.subtitle}
              </h3>
            </div>

            {/* Abstract */}
            <div className="space-y-1 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-zinc-400 font-bold block">
                {isId ? "ABSTRAK & METODOLOGI" : "ABSTRACT & METHODOLOGY"}
              </span>
              <p className="font-body text-xs md:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                {activePub.abstract}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 pt-3">
              {activePub.badges.map((badge, bIdx) => (
                <span
                  key={bIdx}
                  className="font-display pixel-xs text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
            <Link
              href={activePub.link}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-black font-mono font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.55)] transition-all group"
            >
              <span>{isId ? "Pelajari Riset & Makalah Lengkap" : "Explore Research & Full Paper"}</span>
              <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
