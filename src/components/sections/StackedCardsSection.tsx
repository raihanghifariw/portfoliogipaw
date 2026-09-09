"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  Brain,
  Server,
  FlaskConical,
  Scale,
  Workflow,
  ShieldCheck,
} from "lucide-react";
import { WordReveal } from "@/components/animations/ScrollReveal";

interface StackCard {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  icon: React.ElementType;
  accent: string;
  borderAccent: string;
  glow: string;
  bgGlow: string;
}

const CARDS: StackCard[] = [
  {
    num: "01",
    title: "Deep Reinforcement Learning",
    subtitle: "SAFETY-CONSTRAINED CLINICAL POLICIES",
    description:
      "SAC & TD3 with constrained action spaces for ICU drug dosing on MIMIC-III. Architected safety envelopes reducing hypotensive shock occurrences in intensive care.",
    metric: "75.31%",
    metricLabel: "Estimated Survival Rate (vs 73.55% Clinician Baseline)",
    tags: ["PyTorch", "SAC / TD3", "MIMIC-III", "Clinical RL"],
    icon: Brain,
    accent: "text-purple-400",
    borderAccent: "border-purple-500/40",
    glow: "bg-purple-600/25",
    bgGlow: "from-purple-900/20 via-transparent to-transparent",
  },
  {
    num: "02",
    title: "Agentic LLM Systems",
    subtitle: "LANGGRAPH ORCHESTRATION & RAG",
    description:
      "Cyclic multi-agent graphs, semantic vector retrieval with Qdrant, deterministic tool routing, and multi-layer prompt-injection defense. Self-correcting tool execution loop.",
    metric: "100%",
    metricLabel: "Intent Classification & Tool Routing Precision",
    tags: ["LangGraph", "Qdrant Vector DB", "FastAPI", "Agentic RAG"],
    icon: Workflow,
    accent: "text-sky-400",
    borderAccent: "border-sky-500/40",
    glow: "bg-sky-600/25",
    bgGlow: "from-sky-900/20 via-transparent to-transparent",
  },
  {
    num: "03",
    title: "Vision-Language Perception",
    subtitle: "EDGE-DEPLOYED MULTIMODAL VLMs",
    description:
      "LLaVA & Qwen2-VL quantized for on-premises edge inference, fused with classical CV anomaly detectors for explainable industrial and aerospace defect triage.",
    metric: "18ms",
    metricLabel: "Quantized Edge Inference Latency per Frame",
    tags: ["Qwen2-VL", "LLaVA", "Edge TensorRT", "Zero Cloud Leaks"],
    icon: FlaskConical,
    accent: "text-emerald-400",
    borderAccent: "border-emerald-500/40",
    glow: "bg-emerald-600/25",
    bgGlow: "from-emerald-900/20 via-transparent to-transparent",
  },
  {
    num: "04",
    title: "Production Engineering",
    subtitle: "FULLSTACK & CLOUD INFRASTRUCTURE",
    description:
      "10× accelerated PyTorch pipelines, Docker & FastAPI micro-services, PostgreSQL data layers with connection pooling, AWS EC2/S3, and Next.js command dashboards.",
    metric: "10x",
    metricLabel: "Training Throughput via Mixed Precision & Distributed Workers",
    tags: ["Docker", "AWS Cloud", "FastAPI", "Next.js", "PostgreSQL"],
    icon: Server,
    accent: "text-amber-400",
    borderAccent: "border-amber-500/40",
    glow: "bg-amber-600/25",
    bgGlow: "from-amber-900/20 via-transparent to-transparent",
  },
  {
    num: "05",
    title: "Research Leadership",
    subtitle: "FROM PAPER TO PRODUCTION",
    description:
      "Asia-Pacific PRAGMA Hackathon Winner, teaching assistant across 5 computer science courses, and certified in AI research ethics. Bridging academic breakthroughs into production.",
    metric: "1st Place",
    metricLabel: "PRAGMA Asia-Pacific AI Hackathon Winner (Clinical AI)",
    tags: ["AP-PRAGMA", "5x CS Head TA", "Paper to Prod", "Mentorship"],
    icon: Scale,
    accent: "text-rose-400",
    borderAccent: "border-rose-500/40",
    glow: "bg-rose-600/25",
    bgGlow: "from-rose-900/20 via-transparent to-transparent",
  },
];

/**
 * Satu kartu pillar dalam tumpukan fisik. Desain panel dipertahankan
 * dari versi DeckCard sebelumnya; mekanismenya kini Sticky Stacking:
 * kartu berikutnya meluncur menumpuk DI ATAS kartu sebelumnya yang
 * otomatis mengecil & tetap terlihat di pinggirannya.
 */
function PillarStackCard({ card }: { card: StackCard }) {
  const Icon = card.icon;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Ambient glow sesuai aksen kartu */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] ${card.glow}`}
      />

      <div
        className={`relative h-[min(72vh,500px)] w-full overflow-hidden rounded-3xl border ${card.borderAccent} bg-[#10101a]/95 p-6 shadow-2xl backdrop-blur-3xl sm:p-10`}
      >
        {/* Giant Watermark Card Number */}
        <span className="pointer-events-none absolute -bottom-4 right-4 select-none font-display text-8xl font-black leading-none text-white/[0.04] sm:text-9xl">
          {card.num}
        </span>

        {/* Top Card Row: Icon, Subtitle, Metric Beacon */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] shadow-inner sm:h-14 sm:w-14 ${card.accent}`}
            >
              <Icon size={26} strokeWidth={1.8} />
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
                {card.subtitle}
              </p>
              <h3 className="mt-0.5 font-display text-xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl">
                {card.title}
              </h3>
            </div>
          </div>

          {/* Highlight Metric Pill */}
          <div className="hidden flex-col items-end rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-right sm:flex">
            <span className={`font-mono text-lg font-bold md:text-xl ${card.accent}`}>
              {card.metric}
            </span>
            <span className="line-clamp-1 max-w-[180px] font-mono text-[9px] uppercase tracking-wider text-slate-400">
              {card.metricLabel}
            </span>
          </div>
        </div>

        {/* Middle Card Row: Descriptive Architecture Narrative */}
        <div className="my-auto py-3">
          <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg">
            {card.description}
          </p>

          {/* Metric in mobile view */}
          <div className="mt-3 flex items-baseline gap-2 border-t border-white/10 pt-2 sm:hidden">
            <span className={`font-mono text-base font-bold ${card.accent}`}>
              {card.metric}
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {card.metricLabel}
            </span>
          </div>
        </div>

        {/* Bottom Card Row: Tech Stack Tags & Security/Safety Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {card.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-medium text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <ShieldCheck size={14} className={card.accent} />
            <span className="uppercase tracking-wider">PRODUCTION VALIDATED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Satu lapis kartu pada panggung deck: meluncur masuk dari bawah pada
 * jendela progress-nya; kartu yang tertimbus mengecil & meredup.
 */
function StackCardLayer({
  card,
  index,
  total,
  progress,
}: {
  card: StackCard;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const base = index * step;
  const isLast = index === total - 1;

  /* Kartu meluncur masuk dari bawah pada jendelanya */
  const enterStart = index === 0 ? 0 : base - step * 0.15;
  const enterEnd = index === 0 ? 0.001 : base + step * 0.45;
  const y = useTransform(progress, [enterStart, enterEnd], ["110vh", "0vh"]);

  /* Kartu yang tertimbus mengecil & meredup saat kartu berikutnya
     menumpuk di atasnya */
  const coveredStart = base + step * 0.55;
  const coveredEnd = base + step;
  const scale = useTransform(
    progress,
    isLast ? [coveredEnd, 1] : [coveredStart, coveredEnd],
    [1, 0.94]
  );
  const dim = useTransform(
    progress,
    isLast ? [coveredEnd, 1] : [coveredStart, coveredEnd],
    [1, 0.55]
  );

  return (
    <motion.div
      style={{ y, scale, opacity: dim, zIndex: index + 1 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <PillarStackCard card={card} />
    </motion.div>
  );
}

/**
 * Five Pillars — 450vh sticky stacking deck: panggung ter-pin satu layar,
 * kartu-kartu pillar meluncur masuk dari bawah satu per satu mengikuti
 * progress scroll; kartu di bawahnya mengecil & meredup — seperti
 * menyusun setumpuk kartu fisik.
 */
export default function StackedCardsSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Fallback tanpa animasi untuk preferensi reduced motion
  if (reduce) {
    return (
      <section id="pillars" className="relative py-24 z-10">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-12 flex flex-col gap-6">
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
            Engineering <span className="text-shiny">Pillars</span>
          </h2>
          {CARDS.map((c) => (
            <div key={c.num} className="spotlight-card p-8">
              <h3 className="font-display text-2xl font-bold text-white">{c.title}</h3>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="pillars"
      ref={sectionRef}
      aria-label="Five Engineering Pillars : Sticky Stacking Cards"
      className="relative h-[450vh]"
    >
      {/* Headline (scroll normal, lalu panggung ter-pin & kartu menumpuk) */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 pb-14 pt-24 text-center sm:px-12 sm:pt-32">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
          STICKY STACK : CARDS PILE UP AS YOU SCROLL
        </p>
        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
          <WordReveal text="Five" />{" "}
          <span className="text-shiny">
            <WordReveal text="Pillars of Practice" delay={0.15} />
          </span>
        </h2>
      </div>

      {/* Panggung sticky: satu layar penuh, kartu bergantian menumpuk */}
      <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden">
        <div className="relative h-full w-full max-w-[1100px] px-4 sm:px-6">
          {CARDS.map((card, i) => (
            <StackCardLayer
              key={card.num}
              card={card}
              index={i}
              total={CARDS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
