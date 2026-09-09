"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { LetterReveal } from "@/components/animations/ScrollReveal";
import { Interactive3DPixelTypography } from "@/components/ui/Interactive3DPixelTypography";
import { usePortfolio } from "@/context/PortfolioContext";

interface Feature {
  num: string;
  title: string;
  description: string;
  tags: string[];
  faces: string[];
}

const FEATURES_EN: Feature[] = [
  {
    num: "01",
    title: "INTELLIGENCE SYSTEMS",
    description:
      "Safety-constrained Deep RL (SAC/TD3) for clinical dosing, Decision Transformers on MIMIC-III, LangGraph agentic RAG, and edge-quantized Vision-Language Models (LLaVA/Qwen2-VL) for zero-shot perception.",
    tags: ["LLM Fine-Tuning", "RAG Systems", "Deep Learning", "Computer Vision", "MLOps", "Data Analytics"],
    faces: ["DATA", "VISION", "NN", "AI", "ML", "RAG"],
  },
  {
    num: "02",
    title: "SCALABLE SYSTEMS",
    description:
      "10× accelerated PyTorch pipelines on AWS, Docker containerization, micro-latency FastAPI serving, PostgreSQL data layers, and fullstack Next.js command dashboards.",
    tags: ["System Architecture", "Full-Stack Dev", "Docker & K8s", "API Design", "DevOps", "Software Design"],
    faces: ["CLI", "BACKEND", "SECURE", "CODE", "ARCH", "API"],
  },
  {
    num: "03",
    title: "STRATEGIC INNOVATION & RESEARCH",
    description:
      "Asia-Pacific PRAGMA Hackathon Winner, clinical ICU modeling with international collaborators, CS mentorship across 5 courses, and systemic research thinking from paper to production.",
    tags: ["Systemic Thinking", "Leadership", "Problem Solving", "Teamwork", "Communication", "Research"],
    faces: ["GOAL", "IDEA", "TEAM", "SYSTEM", "PAPER", "WIN"],
  },
];

const FEATURES_ID: Feature[] = [
  {
    num: "01",
    title: "SISTEM INTELIGENSI",
    description:
      "Deep RL berbatas keselamatan (SAC/TD3) untuk dosis klinis, Decision Transformer pada MIMIC-III, RAG agen LangGraph, dan Vision-Language Model (LLaVA/Qwen2-VL) terkuantisasi edge untuk persepsi zero-shot.",
    tags: ["Fine-Tuning LLM", "Sistem RAG", "Deep Learning", "Computer Vision", "MLOps", "Analisis Data"],
    faces: ["DATA", "VISI", "NN", "AI", "ML", "RAG"],
  },
  {
    num: "02",
    title: "SISTEM BERSKALA",
    description:
      "Pipeline PyTorch terakselerasi 10x di AWS, kontainerisasi Docker, serving FastAPI berlatensi mikro, layer data PostgreSQL, dan dashboard perintah fullstack Next.js.",
    tags: ["Arsitektur Sistem", "Pengembangan Full-Stack", "Docker & K8s", "Desain API", "DevOps", "Desain Perangkat Lunak"],
    faces: ["CLI", "BACKEND", "AMAN", "KODE", "ARSITEK", "API"],
  },
  {
    num: "03",
    title: "INOVASI STRATEGIS & RISET",
    description:
      "Juara Hackathon PRAGMA Asia-Pasifik, pemodelan ICU klinis bersama kolaborator internasional, bimbingan mahasiswa CS di 5 mata kuliah, dan pola pikir riset sistemik dari publikasi ilmiah hingga produksi.",
    tags: ["Pola Pikir Sistemik", "Kepemimpinan", "Penyelesaian Masalah", "Kerja Tim", "Komunikasi", "Riset"],
    faces: ["TARGET", "GAGASAN", "TIM", "SISTEM", "PAPER", "JUARA"],
  },
];

function Cube({ faces, id, isId }: { faces: string[]; id: number; isId: boolean }) {
  const [rotate, setRotate] = useState({ x: -18, y: 32 });
  const [dragging, setDragging] = useState(false);
  const last = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    last.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setRotate((r) => ({ x: r.x - dy * 0.5, y: r.y + dx * 0.5 }));
  };
  const onPointerUp = () => setDragging(false);

  const faceStyle = (i: number): React.CSSProperties => {
    const t = "translateZ(var(--half))";
    const transforms = [
      `rotateY(0deg) ${t}`,
      `rotateY(90deg) ${t}`,
      `rotateY(180deg) ${t}`,
      `rotateY(-90deg) ${t}`,
      `rotateX(90deg) ${t}`,
      `rotateX(-90deg) ${t}`,
    ];
    return { transform: transforms[i] };
  };

  return (
    <div
      className="cube-scene w-44 h-44 cursor-grab active:cursor-grabbing touch-none select-none"
      style={{ ["--half" as string]: "5.5rem" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      data-detail={isId ? "Tarik untuk memutar kisi inteligensi" : "Drag to rotate the intelligence lattice"}
      data-title={isId ? `KUBUS_FITUR_${id}` : `FEATURE_CUBE_${id}`}
    >
      <div
        className={`cube relative w-full h-full ${dragging ? "" : "animate-[cube-spin_16s_linear_infinite]"}`}
        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      >
        {faces.map((word, i) => (
          <div
            key={i}
            style={faceStyle(i)}
            className="absolute inset-0 flex items-center justify-center border border-[#d4ff3f]/25 bg-[#101018]/85 backdrop-blur-sm shadow-[inset_0_0_40px_rgba(212,255,63,0.06)]"
          >
            <span className="font-display font-black text-lg tracking-tight text-[#d4ff3f]/90 uppercase">
              {word}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeatureCubeShowcase() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const features = isId ? FEATURES_ID : FEATURES_EN;

  return (
    <section id="features" className="relative py-24 sm:py-32 z-10 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12">
        <ScrollReveal variant="blurIn" className="flex items-center gap-3 mb-14 md:mb-20">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] animate-pulse" />
          <span className="text-xs font-heading font-bold tracking-[0.25em] text-cyan-400 uppercase">
            {isId ? "[ KAPABILITAS • MATRIKS VOKSEL 3D INTERAKTIF ]" : "[ CAPABILITIES • INTERACTIVE 3D VOXEL MATRIX ]"}
          </span>
        </ScrollReveal>

        <div className="flex flex-col gap-24 md:gap-32">
          {features.map((f, idx) => (
            <ScrollReveal
              key={f.num}
              variant={idx % 2 === 1 ? "slideLeft" : "slideRight"}
              duration={0.9}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
            >
              <div>
                <p className="font-heading text-xs tracking-[0.25em] text-cyan-400 uppercase mb-3 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-cyan-400" />
                  {isId ? `[ FITUR_${f.num} ]` : `[ FEATURE_${f.num} ]`}
                </p>
                <div className="mb-5">
                  <Interactive3DPixelTypography
                    as="h3"
                    size="pixel-xl"
                    accent={idx === 1 ? "purple" : idx === 2 ? "amber" : "cyan"}
                    glow={true}
                    className="text-white text-base sm:text-lg md:text-xl lg:text-2xl"
                  >
                    {f.title}
                  </Interactive3DPixelTypography>
                </div>
                <p className="font-body text-slate-300 leading-relaxed text-sm md:text-base mb-6 max-w-xl">
                  {f.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {f.tags.map((tag, ti) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.7, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, delay: 0.3 + ti * 0.06 }}
                      className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-slate-300 hover:border-[#d4ff3f]/40 hover:text-[#d4ff3f] transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.75, rotateY: -25 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="flex justify-center"
                style={{ perspective: "900px" }}
              >
                <Cube faces={f.faces} id={idx + 1} isId={isId} />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
