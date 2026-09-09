"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Camera } from "lucide-react";
import MarqueeRibbon from "@/components/ui/MarqueeRibbon";
import { WordReveal } from "@/components/animations/ScrollReveal";
import { usePortfolio } from "@/context/PortfolioContext";

import Link from "next/link";

const BOOKS_EN = [
  {
    title: "Safety-Constrained Reinforcement Learning in Clinical Sepsis",
    kind: "RESEARCH ARTICLE",
    spine: "from-purple-600/80 to-purple-900/80",
  },
  {
    title: "Zero-Shot Multimodal Inspection with Edge VLMs",
    kind: "ENGINEERING LOG",
    spine: "from-sky-600/80 to-sky-900/80",
  },
  {
    title: "Cyclic Multi-Agent Orchestration with LangGraph",
    kind: "SYSTEMS NOTES",
    spine: "from-emerald-600/80 to-emerald-900/80",
  },
];

const BOOKS_ID = [
  {
    title: "Reinforcement Learning Berbatas Keselamatan pada Sepsis Klinis",
    kind: "ARTIKEL RISET",
    spine: "from-purple-600/80 to-purple-900/80",
  },
  {
    title: "Inspeksi Multimodal Zero-Shot dengan Edge VLM",
    kind: "CATATAN REKAYASA",
    spine: "from-sky-600/80 to-sky-900/80",
  },
  {
    title: "Orkestrasi Multi-Agen Siklik dengan LangGraph",
    kind: "CATATAN SISTEM",
    spine: "from-emerald-600/80 to-emerald-900/80",
  },
];

const GALLERY = [
  {
    label: "PRAGMA 39 Hackathon Winner : Team Demo Day",
    image: "/gallery/pragma-hackathon-team-1.webp",
    tag: "HACKATHON WINNER",
    location: "Thammasat University, Thailand",
  },
  {
    label: "Lab AI Strategic Board : Sepsis SAC Research Runs",
    image: "/gallery/raker-lab-ai-strategic-1.webp",
    tag: "AI RESEARCH",
    location: "Universitas Yarsi",
  },
  {
    label: "Informatics Assistant Lecturer : CS Mentoring Lab",
    image: "/gallery/assistant-lecturer-mentoring.webp",
    tag: "MENTORSHIP",
    location: "Faculty of IT",
  },
  {
    label: "DANA Indonesia HQ : Fintech Systems Immersion",
    image: "/gallery/dana-fintech-hq-1.webp",
    tag: "INDUSTRY",
    location: "Jakarta",
  },
  {
    label: "PKM-RE National Research Grant : Defense Session",
    image: "/gallery/pkm-re-national-research-grant.webp",
    tag: "NATIONAL GRANT",
    location: "Kemdikbud / Yarsi",
  },
  {
    label: "Senat Mahasiswa FTI : Executive Cabinet Assembly",
    image: "/gallery/sema-fti-student-senate-2.webp",
    tag: "LEADERSHIP",
    location: "FTI Yarsi",
  },
];

export default function JournalInsightsSection() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const books = isId ? BOOKS_ID : BOOKS_EN;

  return (
    <section
      id="journal"
      className="relative z-10 overflow-hidden py-24 sm:py-32"
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12">
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-cyan-400 uppercase mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
            {isId ? "JURNAL & WAWASAN • CATATAN DARI LAB" : "JOURNAL & INSIGHTS • STORIES FROM THE LAB"}
          </p>
          <h2 className="font-display font-black uppercase tracking-tight text-white text-4xl md:text-6xl">
            {isId ? (
              <>
                <WordReveal text="Catatan" />{" "}
                <span className="text-shiny">
                  <WordReveal text="Lapangan & Riset" delay={0.2} />
                </span>
              </>
            ) : (
              <>
                <WordReveal text="Field" />{" "}
                <span className="text-shiny">
                  <WordReveal text="Notes & Research" delay={0.2} />
                </span>
              </>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Camera size={18} className="text-cyan-400" /> {isId ? "Galeri Foto" : "Photo Gallery"}
              </h3>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.2em] uppercase text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {isId ? "BUKA ARSIP (28 FOTO)" : "ENTER ARCHIVE (28 SHOTS)"} <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
              {GALLERY.map((g) => (
                <Link
                  key={g.label}
                  href="/gallery"
                  className="group snap-start shrink-0 w-64 md:w-72 h-44 md:h-48 rounded-xl border border-white/10 hover:border-cyan-400/40 relative overflow-hidden block bg-[#06080e] transition-all"
                >
                  <img
                    src={g.image}
                    alt={g.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/40 to-transparent" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-cyan-500/30 text-[9px] font-mono tracking-widest text-cyan-300 uppercase">
                      {g.tag}
                    </span>
                  </div>
                  <figcaption className="absolute bottom-3 left-3 right-3">
                    <p className="text-[11px] font-mono text-white font-bold leading-snug line-clamp-2">
                      {g.label}
                    </p>
                    <p className="text-[9px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                      <span>📍 {g.location}</span>
                    </p>
                  </figcaption>
                </Link>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase">
              <span>{isId ? "→ 28 ARTIFAK OTENTIK TERVERIFIKASI" : "→ 28 AUTHENTIC ARTIFACTS VERIFIED"}</span>
              <Link href="/gallery" className="text-cyan-400 hover:text-cyan-300">
                {isId ? "BUKA GALERI LENGKAP ↗" : "OPEN FULL GALLERY ↗"}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2 mb-5">
              <BookOpen size={18} className="text-sky-400" /> {isId ? "Kisah Riset • Rak Buku 3D" : "Research Stories • 3D Bookshelf"}
            </h3>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {books.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 50, rotateZ: 6 - i * 6, rotateY: 25 }}
                  whileInView={{ opacity: 1, y: 0, rotateZ: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.85, delay: i * 0.14, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ rotateY: -28, rotateZ: -2, y: -6 }}
                  className="relative cursor-pointer h-52 md:h-64"
                  style={{ transformStyle: "preserve-3d", perspective: "700px" }}
                  data-detail={b.title}
                  data-title={isId ? "KISAH_RISET" : "RESEARCH_STORY"}
                >
                  <div
                    className={`absolute inset-0 rounded-r-lg rounded-l-sm bg-gradient-to-br ${b.spine} border-l-4 border-black/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] p-3 flex flex-col`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <span className="font-mono text-[8px] tracking-[0.25em] text-white/70 uppercase">
                      {b.kind}
                    </span>
                    <span className="mt-2 font-display text-[13px] md:text-sm font-bold leading-snug text-white">
                      {b.title}
                    </span>
                    <span className="mt-auto font-cursive text-lg text-white/60">Raihan G. Winata</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-28 -mb-24 overflow-hidden">
        <div className="rotate-[2deg] scale-[1.02]">
          <MarqueeRibbon
            items={isId ? ["RISET", "WAWASAN", "REKAYASA", "KISAH"] : ["RESEARCH", "INSIGHT", "ENGINEERING", "STORY"]}
            compact
            duration={26}
          />
        </div>
        <div className="-mt-6 md:-mt-8 rotate-[-2deg] scale-[1.02]">
          <MarqueeRibbon
            items={isId ? ["JURNAL", "CATATAN LAPANGAN", "LOG LAB"] : ["JOURNAL", "FIELD NOTES", "LAB LOG"]}
            compact
            duration={34}
            reverse
          />
        </div>
      </div>
    </section>
  );
}
