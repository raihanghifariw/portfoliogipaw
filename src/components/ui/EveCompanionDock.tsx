"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Compass,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

interface SectionHint {
  id: string;
  tag: string;
  hint: string;
}

export function EveCompanionDock() {
  const { language } = usePortfolio();
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("about");
  const [hasInteracted, setHasInteracted] = useState(false);

  const sectionHints: SectionHint[] = React.useMemo(() => {
    return language === "id"
      ? [
          {
            id: "about",
            tag: "AKADEMIK & SAC RL",
            hint: "Raihan meraih IPK 3.92 dengan model continuous SAC pada dataset MIMIC-III (survival rate 75.31% vs 73.55% baseline dokter).",
          },
          {
            id: "argent-slider",
            tag: "SISTEM UNGGULAN",
            hint: "Menganalisis ensemble kebijakan Safe-RL Sepsis dan platform triase Vision-Language edge.",
          },
          {
            id: "github-stats",
            tag: "KODE SUMBER TERBUKA",
            hint: "Repositori terverifikasi pemenang Hackathon PRAGMA dan pipeline Python kinerja tinggi.",
          },
          {
            id: "kaggle-stats",
            tag: "KAGGLE & DATASET",
            hint: "Jelajahi kumpulan dataset healthcare AI dan notebook riset Decision Transformer.",
          },
          {
            id: "contact",
            tag: "KOLABORASI",
            hint: "Siap berdiskusi mengenai riset AI, sistem kritis keselamatan, atau peluang kerja rekayasa? Mari terhubung!",
          },
        ]
      : [
          {
            id: "about",
            tag: "ACADEMIC & SAC RL",
            hint: "Raihan achieved 3.92 CGPA with continuous SAC models on MIMIC-III (75.31% survival vs 73.55% clinician).",
          },
          {
            id: "argent-slider",
            tag: "FLAGSHIP SYSTEMS",
            hint: "Inspecting Safe-RL Sepsis policy ensembles and edge Vision-Language triage platforms.",
          },
          {
            id: "github-stats",
            tag: "OPEN SOURCE",
            hint: "Verified PRAGMA Hackathon Winner repositories and high-throughput Python pipelines.",
          },
          {
            id: "kaggle-stats",
            tag: "KAGGLE & DATASETS",
            hint: "Browse curated healthcare AI datasets and Decision Transformer research notebooks.",
          },
          {
            id: "contact",
            tag: "COLLABORATION",
            hint: "Ready to discuss AI research, safety-critical systems, or engineering roles? Let's connect!",
          },
        ];
  }, [language]);

  const activeHint = sectionHints.find((h) => h.id === activeSectionId) || sectionHints[0];

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // Check which section is in view
      const scrollMiddle = scrollY + window.innerHeight * 0.4;
      for (const section of sectionHints) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollMiddle >= top && scrollMiddle < top + height) {
            if (section.id !== activeSectionId) {
              setActiveSectionId(section.id);
              // Auto-expand speech bubble briefly when entering a new section
              setIsExpanded(true);
              clearTimeout(hideTimer);
              hideTimer = setTimeout(() => {
                setIsExpanded(false);
              }, 6000);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimer);
    };
  }, [activeSectionId, sectionHints]);

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent("portfolio:toggle-chatbot"));
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end pointer-events-auto select-none">
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="mb-3 max-w-[320px] md:max-w-[360px] bg-zinc-950/85 dark:bg-black/90 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,240,255,0.15)] text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10 mb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase">
                  EVE COMPANION • {activeHint.tag}
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-zinc-400 hover:text-white p-1 transition-colors rounded-md"
                aria-label="Minimize companion"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Contextual Message */}
            <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-3">
              {activeHint.hint}
            </p>

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleOpenChat}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-[11px] shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all group"
              >
                <MessageSquare className="w-3 h-3 text-black group-hover:scale-110 transition-transform" />
                <span>{language === "id" ? "Tanya AI EVE" : "Ask EVE AI"}</span>
              </button>

              <button
                onClick={handleScrollToTop}
                className="flex items-center justify-center py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors"
                title={language === "id" ? "Kembali ke Atas" : "Scroll back to Hero"}
              >
                <Compass className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating EVE Capsule Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative flex items-center gap-2 py-2 px-3.5 rounded-full bg-zinc-950/90 dark:bg-black/90 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_25px_rgba(0,240,255,0.25)] cursor-pointer text-white"
      >
        {/* Holographic Glowing Pulse */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-md group-hover:blur-lg transition-all" />

        {/* Mini EVE Avatar Icon */}
        <div className="relative z-10 w-7 h-7 rounded-full bg-cyan-950 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.5)]">
          <Bot className="w-4 h-4 text-cyan-300 group-hover:text-cyan-100 transition-colors" />
        </div>

        {/* Label */}
        <div className="relative z-10 flex flex-col items-start pr-1">
          <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase leading-none">
            EVE HUD
          </span>
          <span className="text-[8.5px] font-mono text-zinc-400 uppercase tracking-tight">
            {isExpanded 
              ? (language === "id" ? "Panduan Aktif" : "Active Guide") 
              : (language === "id" ? "Ketuk untuk buka" : "Tap to expand")}
          </span>
        </div>

        {/* Toggle Icon */}
        <div className="relative z-10 text-cyan-400/80 group-hover:text-cyan-200 transition-colors">
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
