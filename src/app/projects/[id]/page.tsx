"use client";

import React, { use } from "react";
import Navbar from "@/components/ui/Navbar";
import FooterMarquee from "@/components/ui/FooterMarquee";
import NeuralConstellation from "@/components/3d/NeuralConstellation";
import ClickSpark from "@/components/animations/ClickSpark";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import { PROJECTS_DATA, PROJECTS_DATA_ID } from "@/data/portfolioData";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/animations/TransitionLink";
import { ArrowLeft, ExternalLink, ShieldCheck, Cpu, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { language } = usePortfolio();
  const isId = language === "id";
  const projectSource = isId ? PROJECTS_DATA_ID : PROJECTS_DATA;
  const project = projectSource.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#09090d] text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white">
      <NeuralConstellation />
      <ClickSpark />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24 max-w-[1040px] mx-auto px-5 sm:px-8">
        {/* Back Link */}
        <TransitionLink
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-sky-400 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> {isId ? "KEMBALI KE DIREKTORI PROYEK" : "BACK TO PROJECTS DIRECTORY"}
        </TransitionLink>

        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300">
              {project.badge}
            </span>
            <span className="text-xs font-mono text-slate-400">{project.subtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </motion.div>

        {/* Hero Media Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full rounded-2xl overflow-hidden border border-white/15 mb-12 shadow-2xl bg-[#090d16]"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Deep Dive Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Main 2 Cols: Challenge & Architecture */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <div className="p-8 rounded-2xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-sky-400">
                <ShieldCheck size={16} />
                <span>{isId ? "MASALAH & KONTEKS KLINIS" : "PROBLEM & CLINICAL CONTEXT"}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {isId ? "Tantangan Rekayasa" : "The Engineering Challenge"}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.deepDive.challenge}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-purple-400">
                <Cpu size={16} />
                <span>{isId ? "ARSITEKTUR SISTEM & PIPELINE" : "SYSTEM ARCHITECTURE & PIPELINES"}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {isId ? "Formulasi Algoritmik" : "Algorithmic Formulation"}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.deepDive.architecture}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-emerald-400">
                <Layers size={16} />
                <span>{isId ? "DAMPAK TERUKUR & BENCHMARK" : "MEASURABLE IMPACT & BENCHMARKS"}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {isId ? "Hasil Klinis & Kinerja" : "Clinical & Performance Results"}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.deepDive.results}
              </p>
            </div>
          </div>

          {/* Right Col: Metadata, Stack, Repos */}
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-4">
              <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                {isId ? "ARSENAL TEKNIS" : "TECHNICAL ARSENAL"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.deepDive.stack.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-medium bg-white/5 border border-white/10 text-slate-200 px-3 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-3">
              <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-1">
                {isId ? "AKSES REPOSITORI" : "ACCESS REPOSITORIES"}
              </h4>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-white text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-sky-400 transition-colors shadow-lg cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                <span>{isId ? "Repositori GitHub" : "GitHub Repository"}</span>
              </a>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-white/10 border border-white/15 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <ExternalLink size={15} />
                  <span>{isId ? "Demo Produksi Langsung" : "Live Production Demo"}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      <ChatBotWidget />
      <FooterMarquee />
    </div>
  );
}
