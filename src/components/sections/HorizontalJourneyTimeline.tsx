"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { WordReveal } from "@/components/animations/ScrollReveal";
import TransitionLink from "@/components/animations/TransitionLink";
import { usePortfolio } from "@/context/PortfolioContext";

interface Milestone {
  year: string;
  date: string;
  title: string;
  role: string;
  description: string;
  tag: string;
  image: string;
}

const MILESTONES_EN: Milestone[] = [
  {
    year: "2022",
    date: "2022 - PRESENT",
    title: "B.Sc. Informatics, Universitas Yarsi",
    role: "STUDENT : CGPA 3.92/4.00",
    description:
      "Faculty of Information Technology. Coursework across deep learning, algorithms, and software engineering with highest academic distinction.",
    tag: "EDUCATION",
    image: "/gallery/academic-symposium-stage-2.webp",
  },
  {
    year: "2023",
    date: "2023 : JOINED",
    title: "AI Lab Universitas Yarsi",
    role: "RESEARCH ASSISTANT",
    description:
      "Joined the campus AI Lab for deep RL experiments, clinical dataset pipelines, and PyTorch research infrastructure on AWS.",
    tag: "RESEARCH",
    image: "/journey/raker-lab-ai.webp",
  },
  {
    year: "2024",
    date: "2024 : DANA HQ",
    title: "DANA Indonesia Technology Immersion",
    role: "FINTECH EXPOSURE",
    description:
      "Explored production fintech architectures, distributed microservices, and transaction risk scoring at DANA Indonesia Headquarters.",
    tag: "INDUSTRY",
    image: "/journey/dana-fintech.webp",
  },
  {
    year: "2024",
    date: "2024 : APPOINTED",
    title: "Informatics Teaching Assistant",
    role: "MENTOR : 5 COURSES",
    description:
      "Appointed teaching assistant across 5 informatics courses; mentored dozens of CS students in algorithms, programming, and AI fundamentals.",
    tag: "LEADERSHIP",
    image: "/journey/assistant-lecturer.webp",
  },
  {
    year: "2024",
    date: "12/2024 : GRANT",
    title: "PKM-RE National Research Grant",
    role: "PRINCIPAL INVESTIGATOR",
    description:
      "Defended and secured competitive national research funding from Kemdikbud-Ditjen Diktiristek for clinical continuous AI dosage recommendation systems.",
    tag: "GRANT",
    image: "/journey/pkm-re-grant.webp",
  },
  {
    year: "2025",
    date: "01/2025 : WON",
    title: "PRAGMA Collaborative Hackathon",
    role: "WINNER : ASIA-PACIFIC",
    description:
      "Teamwork Award at a 15-university Asia-Pacific hackathon (Thammasat, UCSD, Osaka) with Decision Transformer for ICU drug dosage on MIMIC-III.",
    tag: "HACKATHON",
    image: "/journey/pragma-award.webp",
  },
  {
    year: "2026",
    date: "08/2025 - 01/2026",
    title: "Lab AI Researcher & Undergraduate Thesis",
    role: "AI RESEARCHER",
    description:
      "Engineered the Sepsis-3 clinical pipeline (94,458 -> 35,608 episodes), denoising autoencoder, and the Ensemble SAC thesis system, achieving 75.31% estimated survival vs 73.55% clinician baseline.",
    tag: "THESIS",
    image: "/journey/ai-researcher-lab.webp",
  },
];

const MILESTONES_ID: Milestone[] = [
  {
    year: "2022",
    date: "2022 - SEKARANG",
    title: "S1 Teknik Informatika, Universitas YARSI",
    role: "MAHASISWA : IPK 3.92/4.00",
    description:
      "Fakultas Teknologi Informasi. Kurikulum mencakup deep learning, algoritma, dan rekayasa perangkat lunak dengan predikat akademik tertinggi.",
    tag: "PENDIDIKAN",
    image: "/gallery/academic-symposium-stage-2.webp",
  },
  {
    year: "2023",
    date: "2023 : BERGABUNG",
    title: "Lab AI Universitas YARSI",
    role: "ASISTEN PENELITI",
    description:
      "Bergabung dengan Lab AI kampus untuk eksperimen deep RL, pipeline dataset klinis, dan infrastruktur riset PyTorch di AWS.",
    tag: "RISET",
    image: "/journey/raker-lab-ai.webp",
  },
  {
    year: "2024",
    date: "2024 : DANA HQ",
    title: "Imersi Teknologi DANA Indonesia",
    role: "EKSPOSUR FINTECH",
    description:
      "Mendalami arsitektur fintech produksi, microservice terdistribusi, dan penilaian risiko transaksi di Kantor Pusat DANA Indonesia.",
    tag: "INDUSTRI",
    image: "/journey/dana-fintech.webp",
  },
  {
    year: "2024",
    date: "2024 : DITUNJUK",
    title: "Asisten Dosen Informatika",
    role: "MENTOR : 5 MATA KULIAH",
    description:
      "Ditunjuk sebagai asisten dosen untuk 5 mata kuliah informatika; membimbing puluhan mahasiswa CS dalam algoritma, pemrograman, dan fundamental AI.",
    tag: "KEPEMIMPINAN",
    image: "/journey/assistant-lecturer.webp",
  },
  {
    year: "2024",
    date: "12/2024 : HIBAH",
    title: "Hibah Riset Nasional PKM-RE",
    role: "KETUA PENELITI",
    description:
      "Mempertahankan dan meraih pendanaan riset nasional kompetitif dari Kemdikbud-Ditjen Diktiristek untuk sistem rekomendasi dosis klinis AI kontinu.",
    tag: "HIBAH",
    image: "/journey/pkm-re-grant.webp",
  },
  {
    year: "2025",
    date: "01/2025 : JUARA",
    title: "Hackathon Kolaboratif PRAGMA",
    role: "JUARA : ASIA-PASIFIK",
    description:
      "Teamwork Award di hackathon Asia-Pasifik 15 universitas (Thammasat, UCSD, Osaka) dengan Decision Transformer untuk dosis obat ICU pada MIMIC-III.",
    tag: "HACKATHON",
    image: "/journey/pragma-award.webp",
  },
  {
    year: "2026",
    date: "08/2025 - 01/2026",
    title: "Peneliti Lab AI & Skripsi Sarjana",
    role: "PENELITI AI",
    description:
      "Merekayasa pipeline klinis Sepsis-3 (94.458 -> 35.608 episode), denoising autoencoder, dan sistem skripsi Ensemble SAC, mencapai estimasi kelangsungan hidup 75.31% vs 73.55% baseline klinisi.",
    tag: "SKRIPSI",
    image: "/journey/ai-researcher-lab.webp",
  },
];

export default function HorizontalJourneyTimeline() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const milestones = isId ? MILESTONES_ID : MILESTONES_EN;
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.5"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative py-24 sm:py-32 z-10 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12">
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-cyan-400 uppercase mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
            {isId ? "PERJALANAN PROFESIONAL • JALUR INTERAKTIF" : "PROFESSIONAL JOURNEY • INTERACTIVE TRACK"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
            {isId ? (
              <>
                Langkah <span className="text-shiny">Sejauh Ini</span>
              </>
            ) : (
              <>
                <WordReveal text="The" />{" "}
                <span className="text-shiny">
                  <WordReveal text="Road So Far" delay={0.2} />
                </span>
              </>
            )}
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-[52px] left-0 w-full h-[2px] bg-white/10" />
        <motion.div
          className="absolute top-[52px] left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 shadow-[0_0_12px_rgba(0,240,255,0.5)]"
          style={reduce ? { width: "100%" } : { width: lineWidth }}
        />
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 sm:px-12 pb-6"
        >
          {milestones.map((m, i) => (
            <motion.div
              key={m.year + m.title}
              initial={reduce ? undefined : { opacity: 0, y: 60, rotate: 2 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="snap-start shrink-0 w-[300px] md:w-[360px] relative pt-20"
            >
              <span className="absolute top-[44px] left-0 -translate-x-1/4 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(0,240,255,0.8)]" />
              <span className="absolute top-[38px] left-0 -translate-x-1/4 w-6 h-6 rounded-full bg-cyan-400/20 animate-ping" />
              <span className="absolute top-2 left-0 -translate-x-1/4 px-2.5 py-1 rounded-md bg-white text-black font-mono text-[10px] font-black tracking-widest">
                {m.year}
              </span>

              <div className="spotlight-card group p-5 h-full flex flex-col border border-white/10 hover:border-cyan-400/40 transition-colors bg-[#06080e]/80">
                {m.image && (
                  <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-white/10 bg-black/50">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-transparent to-transparent opacity-75" />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-cyan-500/30 text-[9px] font-mono tracking-widest text-cyan-300 uppercase">
                      {m.tag}
                    </span>
                  </div>
                )}
                <p className="font-mono text-[10px] tracking-[0.25em] text-cyan-400 uppercase mb-2">
                  {m.date}
                </p>
                <h3 className="font-display text-lg md:text-xl font-bold text-white tracking-tight mb-1.5 line-clamp-2">
                  {m.title}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.2em] text-purple-300 uppercase mb-3">
                  {m.role}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed flex-1">{m.description}</p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-slate-400">
                    {m.tag}
                  </span>
                  <Link
                    href="/gallery"
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    {isId ? "Lihat di Galeri →" : "View in Gallery →"}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="snap-start shrink-0 w-[300px] md:w-[360px] relative pt-20 flex items-center">
            <div className="spotlight-card p-6 w-full flex flex-col items-center text-center gap-3 border border-white/10 bg-[#06080e]/80">
              <p className="font-display text-lg font-bold text-white">
                {isId ? "Arsip Visual Lengkap" : "Full Visual Archive"}
              </p>
              <p className="text-xs text-slate-400">
                {isId
                  ? "Inspeksi 28 artefak otentik laboratorium, riset, dan hackathon."
                  : "Inspect 28 authentic lab, research, and hackathon artifacts."}
              </p>
              <Link
                href="/gallery"
                className="mt-1 px-5 py-2.5 rounded-full bg-cyan-400 text-black text-xs font-display font-black uppercase tracking-widest hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                {isId ? "Buka Galeri ↗" : "Open Gallery ↗"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 mt-4">
        <TransitionLink
          href="/experience"
          className="font-mono text-[11px] tracking-[0.25em] text-slate-500 hover:text-[#d4ff3f] uppercase transition-colors"
        >
          {isId ? "→ Halaman detail pengalaman kerja" : "→ Detailed work experience page"}
        </TransitionLink>
      </div>
    </section>
  );
}
