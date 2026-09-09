"use client";

import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import FooterMarquee from "@/components/ui/FooterMarquee";
import NeuralConstellation from "@/components/3d/NeuralConstellation";
import ClickSpark from "@/components/animations/ClickSpark";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import { PROJECTS_DATA, PROJECTS_DATA_ID } from "@/data/portfolioData";
import { Project } from "@/types";
import TiltCard from "@/components/ui/TiltCard";
import TextScramble from "@/components/animations/TextScramble";
import NextPageTransition from "@/components/animations/NextPageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ArrowRight, Layers } from "lucide-react";
import TransitionLink from "@/components/animations/TransitionLink";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ProjectsPage() {
  const { language, t } = usePortfolio();
  const isId = language === "id";
  const projects = isId ? PROJECTS_DATA_ID : PROJECTS_DATA;
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = [
    { id: "all", label: isId ? `Semua Sistem (${projects.length})` : `All Systems (${projects.length})` },
    { id: "healthcare", label: isId ? "Deep RL & Kesehatan" : "Deep RL & Healthcare" },
    { id: "agents", label: isId ? "GenAI & Agen AI" : "GenAI & Agents" },
    { id: "vision", label: isId ? "Computer Vision & VLM" : "Computer Vision & VLMs" },
    { id: "fullstack", label: isId ? "Fullstack & Cloud" : "Fullstack & Cloud" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-[#09090d] text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white">
      <NeuralConstellation />
      <ClickSpark />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24 max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 mb-3 uppercase flex items-center gap-2">
            <Layers size={14} />
            <TextScramble text={isId ? "PROYEK UNGGULAN & ARSITEKTUR SISTEM" : "FEATURED PROJECTS & SYSTEMS ARCHITECTURE"} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight mb-4">
            {t("projects.title", "Flagship Engineering & Research Systems")}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {t("projects.lead", "A comprehensive portfolio of deep reinforcement learning agents, on-prem vision-language models, enterprise RAG multi-agents, and full-stack systems built by Raihan Ghifari Winata.")}
          </p>
        </motion.div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`relative px-4 py-2 rounded-full text-xs font-display font-bold whitespace-nowrap transition-all ${
                activeFilter === f.id
                  ? "bg-white text-slate-950 shadow-md shadow-white/20"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard className="flex flex-col h-full rounded-2xl overflow-hidden group">
                  {/* Media Banner */}
                  <div className="relative aspect-video w-full bg-[#090d16] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} Architecture`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span
                      className={`absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono backdrop-blur-md border ${
                        project.badgeType === "gold"
                          ? "bg-[#09090d]/85 text-amber-400 border-amber-400/40"
                          : project.badgeType === "purple"
                          ? "bg-[#09090d]/85 text-purple-400 border-purple-400/40"
                          : "bg-[#09090d]/85 text-sky-400 border-sky-400/40"
                      }`}
                    >
                      {project.badge}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
                      <div className="flex items-center gap-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-sky-400 transition-colors"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                          </svg>
                          <span>{isId ? "Kode" : "Code"}</span>
                        </a>

                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-sky-400 transition-colors"
                          >
                            <ExternalLink size={14} /> Demo
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <TransitionLink
                          href={`/projects/${project.id}`}
                          className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1"
                        >
                          <span>{isId ? "Studi Kasus" : "Case Study"}</span>
                          <ArrowRight size={11} />
                        </TransitionLink>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500 hover:text-white transition-all"
                        >
                          {isId ? "Analisis Mendalam ↗" : "Deep Dive ↗"}
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#050508]/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0f0f17] border border-white/15 p-6 sm:p-10 rounded-2xl shadow-2xl shadow-black/80"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <span className="text-[11px] font-mono font-bold tracking-widest text-sky-400 block mb-1">
                {selectedProject.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-4">
                {selectedProject.title}
              </h2>

              <div className="w-full rounded-xl overflow-hidden border border-white/10 mb-6 bg-[#090d16]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-wider text-sky-400 uppercase mb-1">
                    {isId ? "KONTEKS MASALAH" : "PROBLEM CONTEXT"}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedProject.deepDive.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold tracking-wider text-purple-400 uppercase mb-1">
                    {isId ? "ARSITEKTUR SISTEM" : "SYSTEM ARCHITECTURE"}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedProject.deepDive.architecture}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase mb-1">
                    {isId ? "DAMPAK & HASIL TERUKUR" : "MEASURABLE IMPACT & RESULTS"}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedProject.deepDive.results}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-2">
                    {isId ? "STACK TEKNIS" : "TECHNICAL STACK"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.deepDive.stack.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-medium bg-white/5 border border-white/10 text-slate-200 px-2.5 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-2">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-sky-400 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                    <span>{isId ? "Repositori GitHub" : "GitHub Repository"}</span>
                  </a>
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/10 text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink size={15} /> {isId ? "Demo Langsung" : "Live Demo"}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Monumental Next Chapter Banner */}
      <NextPageTransition
        nextChapterNum="04"
        nextChapterTitle={isId ? "ARSENAL TEKNIS & KEAHLIAN" : "TECHNICAL ARSENAL & SKILLS"}
        nextChapterSubtitle={isId ? "Periksa Matriks Kompetensi 4-Domain dengan Micro-HUD Interaktif dan Model Robot 3D" : "Inspect the 4-Domain Competency Matrix with Interactive Hover Micro-HUDs"}
        nextHref="/skills"
      />

      <ChatBotWidget />
      <FooterMarquee />
    </div>
  );
}
