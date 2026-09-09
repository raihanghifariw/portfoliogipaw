"use client";

import React from "react";
import Navbar from "@/components/ui/Navbar";
import FooterMarquee from "@/components/ui/FooterMarquee";
import NeuralConstellation from "@/components/3d/NeuralConstellation";
import ClickSpark from "@/components/animations/ClickSpark";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import IdentitySection from "@/components/sections/IdentitySection";
import NextPageTransition from "@/components/animations/NextPageTransition";
import TextScramble from "@/components/animations/TextScramble";
import TiltCard from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { User, Cpu, Award, Code2, Globe, HeartPulse } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function AboutPage() {
  const { language } = usePortfolio();
  const isId = language === "id";

  return (
    <div className="relative min-h-screen bg-[#09090d] text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white">
      <NeuralConstellation />
      <ClickSpark />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20 max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 mb-3 uppercase flex items-center gap-2">
            <User size={14} />
            <TextScramble text={isId ? "BIOGRAFI & FILOSOFI RISET" : "BIOGRAPHY & RESEARCH PHILOSOPHY"} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight mb-4">
            {isId ? "Rekayasa Kecerdasan Rigorus" : "Engineering Rigorous Intelligence"}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {isId 
              ? "Menjembatani teori kontrol matematika, koridor keselamatan reinforcement learning, dan MLOps skala produksi untuk menghadirkan sistem AI klinis yang transparan dan berdampak nyata."
              : "Bridging mathematical control theory, reinforcement learning safety corridors, and production-scale MLOps to deliver interpretable, high-impact clinical AI systems."}
          </p>
        </motion.div>

        {/* Narrative Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <TiltCard className="p-8 md:col-span-2 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 mb-2">
                <HeartPulse size={16} />
                <span>{isId ? "MOTIVASI KLINIS & DUKUNGAN KEPUTUSAN" : "CLINICAL MOTIVATION & DECISION SUPPORT"}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                {isId ? "Mengapa Healthcare & Safe RL?" : "Why Healthcare & Safety-Constrained RL?"}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {isId
                  ? "Pada pengobatan sepsis di ruang perawatan intensif (ICU), dosis obat memiliki tingkat volatilitas fisiologis yang tinggi. Model AI konvensional tanpa batasan keselamatan kerap merekomendasikan tindakan ekstrem yang berisiko memicu hipotensi fatal."
                  : "During intensive care unit (ICU) sepsis treatment, clinical dosages are fraught with physiological volatility. Unconstrained AI models often prescribe volatile actions that could trigger irreversible hypotension."}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isId ? (
                  <>Tesis sarjana saya di Universitas YARSI merumuskan <strong>batasan Lagrangian</strong> pada ensemble Soft Actor-Critic (SAC), memaksa jaringan kebijakan kontinu untuk beroperasi secara patuh di dalam koridor aman Mean Arterial Pressure (MAP) dan keseimbangan cairan.</>
                ) : (
                  <>My undergraduate research thesis at Universitas Yarsi focuses on formulating <strong>Lagrangian bounds</strong> over Soft Actor-Critic (SAC) ensembles, forcing continuous policy networks to operate strictly within safe Mean Arterial Pressure (MAP) and fluid balance corridors.</>
                )}
              </p>
            </div>

            <div className="text-[11px] font-mono text-sky-400 pt-3 border-t border-white/10 mt-2">
              {isId ? "KOHORT SEPSIS-3 • 35.608 EPISODE ICU • DATA LAKE MIMIC-III" : "SEPSIS-3 COHORT • 35,608 ICU EPISODES • MIMIC-III DATA LAKE"}
            </div>
          </TiltCard>

          <TiltCard className="p-8 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-2">
                <Award size={16} />
                <span>{isId ? "PREDIKAT KELULUSAN TERBAIK" : "ACADEMIC DISTINCTION"}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{isId ? "IPK 3.92 / 4.00" : "CGPA 3.92 / 4.00"}</h2>
              <p className="text-xs font-mono text-slate-400 mb-3">
                {isId ? "Sarjana Ilmu Komputer (S.Kom.), Universitas YARSI" : "Bachelor of Computer Science (S.Kom.), Universitas Yarsi"}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isId
                  ? "Meraih predikat lulusan terbaik di Program Studi Informatika dan bertugas sebagai Asisten Dosen untuk 100+ mahasiswa di 5 mata kuliah inti AI/Deep Learning."
                  : "Ranked in top distinction honors across Department of Informatics, serving as Assistant Lecturer for 100+ students across 5 core DL/AI modules."}
              </p>
            </div>

            <div className="text-[11px] font-mono text-emerald-400 pt-3 border-t border-white/10 mt-2">
              {isId ? "KELULUSAN: 04/2026 • JAKARTA, INDONESIA" : "GRADUATION: 04/2026 • JAKARTA, ID"}
            </div>
          </TiltCard>
        </div>

        {/* 4 Core Pillars */}
        <IdentitySection />
      </main>

      {/* Monumental Next Chapter Banner */}
      <NextPageTransition
        nextChapterNum="03"
        nextChapterTitle={isId ? "PORTOFOLIO & PROYEK" : "PORTFOLIO & PROJECTS"}
        nextChapterSubtitle={isId ? "Jelajahi 6 Sistem Deep RL, VLM & Full-Stack Unggulan" : "Explore 6 Flagship Deep RL, VLM & Full-Stack Systems"}
        nextHref="/projects"
      />

      <ChatBotWidget />
      <FooterMarquee />
    </div>
  );
}
