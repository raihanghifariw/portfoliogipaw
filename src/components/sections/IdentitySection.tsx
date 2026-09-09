"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import TiltCard from "@/components/ui/TiltCard";
import { ShieldCheck, Zap, Cpu, Scan } from "lucide-react";
import { motion } from "framer-motion";
import TextScramble from "@/components/animations/TextScramble";

export default function IdentitySection() {
  const { t, language } = usePortfolio();
  const isId = language === "id";

  const pillars = [
    {
      num: "01",
      icon: <ShieldCheck size={28} className="text-sky-400" />,
      title: t("pillar.1.title"),
      desc: t("pillar.1.desc"),
      tags: "SAC • Lagrangian Bounds • OPE",
      detail: isId
        ? "Constrained Markov Decision Processes (CMDP) dengan optimisasi pengali Lagrange dual untuk jaminan keselamatan klinis"
        : "Constrained Markov Decision Processes (CMDPs) with dual multiplier optimization for clinical safety guarantees",
    },
    {
      num: "02",
      icon: <Zap size={28} className="text-amber-400" />,
      title: t("pillar.2.title"),
      desc: t("pillar.2.desc"),
      tags: "10× PyTorch Speed • Docker • AWS",
      detail: isId
        ? "Akselerasi tensor CUDA, kontainerisasi Docker multi-tahap, dan penyajian model FastAPI berlatensi mikro"
        : "CUDA tensor acceleration, multi-stage Docker containerization & micro-latency FastAPI model serving",
    },
    {
      num: "03",
      icon: <Cpu size={28} className="text-purple-400" />,
      title: t("pillar.3.title"),
      desc: t("pillar.3.desc"),
      tags: "LangGraph • Gemini • Prompt Shield",
      detail: isId
        ? "Graf siklik stateful dengan validasi human-in-the-loop, retrieval vektor hibrida, dan perutean deterministik"
        : "Stateful cyclical graphs with human-in-the-loop validation, hybrid vector retrieval & deterministic routing",
    },
    {
      num: "04",
      icon: <Scan size={28} className="text-emerald-400" />,
      title: t("pillar.4.title"),
      desc: t("pillar.4.desc"),
      tags: "LLaVA • OpenCV • Edge Quantization",
      detail: isId
        ? "Model visi-bahasa multimodal terkuantisasi 4-bit yang diterapkan di server edge untuk triase defek real-time"
        : "4-bit quantized multimodal vision-language models deployed on edge servers for real-time defect triage",
    },
  ];

  return (
    <section id="identity" className="relative py-24 z-10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 mb-3 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <TextScramble text={isId ? "IDENTITAS & ARSITEKTUR" : "IDENTITY & ARCHITECTURE"} speed={20} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight max-w-4xl mb-4">
            {t("identity.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {t("identity.lead")}
          </p>
        </motion.div>

        {/* 4 Core Engineering Pillars Bento Grid with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <TiltCard
                data-detail={pillar.detail}
                data-title={isId ? `PILAR_${pillar.num}` : `PILLAR_${pillar.num}`}
                className="p-7 flex flex-col justify-between h-full gap-4 cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-slate-500 block mb-1">
                    {isId ? "PILAR" : "PILLAR"} {pillar.num}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>

                <div className="text-[11px] font-mono text-purple-400 pt-3 border-t border-white/10 mt-2">
                  {pillar.tags}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* High-Impact Stats Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 p-6 rounded-2xl bg-[#11111a]/70 border border-white/10 backdrop-blur-md"
        >
          <div
            data-detail={
              isId
                ? "Indeks Prestasi Kumulatif 3.92 / 4.00 selama 8 semester akademik di Universitas YARSI"
                : "Cumulative Grade Point Average of 3.92 / 4.00 across 8 academic semesters"
            }
            data-title={isId ? "PRESTASI_AKADEMIK" : "ACADEMIC_EXCELLENCE"}
            className="flex flex-col gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="font-display font-black text-3xl sm:text-5xl bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
              3.92
            </span>
            <span className="text-xs text-slate-400">{t("stats.gpa")}</span>
          </div>

          <div
            data-detail={
              isId
                ? "Multiprocessing GPU Cloud AWS mengoptimalkan loader data PyTorch dan eksekusi CUDA"
                : "AWS Cloud GPU multiprocessing optimizing PyTorch data loaders and CUDA execution"
            }
            data-title={isId ? "AKSELERASI_PELATIHAN" : "TRAINING_ACCELERATION"}
            className="flex flex-col gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="font-display font-black text-3xl sm:text-5xl bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
              10×
            </span>
            <span className="text-xs text-slate-400">{t("stats.speed")}</span>
          </div>

          <div
            data-detail={
              isId
                ? "Evaluasi Off-Policy (OPE) membuktikan peningkatan kelangsungan hidup +14% dibanding baseline historis"
                : "Off-Policy Evaluation (OPE) showing +14% survival improvement over historical baselines"
            }
            data-title={isId ? "DAMPAK_KLINIS" : "CLINICAL_IMPACT"}
            className="flex flex-col gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="font-display font-black text-3xl sm:text-5xl bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
              +14%
            </span>
            <span className="text-xs text-slate-400">{t("stats.baseline")}</span>
          </div>

          <div
            data-detail={
              isId
                ? "Asisten Dosen membimbing 100+ mahasiswa CS dalam Algoritma & Kecerdasan Buatan"
                : "Teaching Assistant mentoring over 100+ CS students in Algorithms & Artificial Intelligence"
            }
            data-title={isId ? "DAMPAK_KEPEMIMPINAN" : "LEADERSHIP_IMPACT"}
            className="flex flex-col gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="font-display font-black text-3xl sm:text-5xl bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
              100+
            </span>
            <span className="text-xs text-slate-400">{t("stats.mentored")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
