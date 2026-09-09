"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { WordReveal } from "@/components/animations/ScrollReveal";
import TransitionLink from "@/components/animations/TransitionLink";
import { PROJECTS_DATA, PROJECTS_DATA_ID } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";

const FLAGSHIP_IDS = [
  "transformer-clinical",
  "sepsis-rl-ensemble",
  "vlm-defect-triage",
  "agentic-ops-rag",
  "aero-flare",
];

const BADGE_STYLES: Record<string, string> = {
  gold: "border-amber-400/40 text-amber-300 bg-amber-400/10",
  cyan: "border-sky-400/40 text-sky-300 bg-sky-400/10",
  purple: "border-purple-400/40 text-purple-300 bg-purple-400/10",
};

export default function FlagshipProjectsSlider() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const projectSource = isId ? PROJECTS_DATA_ID : PROJECTS_DATA;
  const flagshipProjects = FLAGSHIP_IDS.map((id) =>
    projectSource.find((p) => p.id === id)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const scrollTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;
    const card = track.children[0] as HTMLElement;
    const step = card.offsetWidth + 24;
    setPage(Math.min(flagshipProjects.length - 1, Math.round(track.scrollLeft / step)));
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 z-10 overflow-hidden bg-[#07070a] border-y border-white/[0.06]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] text-slate-500 uppercase mb-3">
              {isId ? "SISTEM UNGGULAN • 2025 / 2026" : "FLAGSHIP SYSTEMS • 2025 / 2026"}
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
              <WordReveal text={isId ? "Proyek" : "Engineering"} />{" "}
              <span className="text-shiny">
                <WordReveal text={isId ? "Unggulan" : "Flagships"} delay={0.25} />
              </span>
            </h2>
          </motion.div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo(Math.max(0, page - 1))}
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-slate-300 hover:border-[#d4ff3f]/50 hover:text-[#d4ff3f] transition-colors cursor-pointer"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollTo(Math.min(flagshipProjects.length - 1, page + 1))}
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-slate-300 hover:border-[#d4ff3f]/50 hover:text-[#d4ff3f] transition-colors cursor-pointer"
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 sm:px-12 pb-4"
      >
        {flagshipProjects.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="spotlight-card snap-start shrink-0 w-[88vw] sm:w-[70vw] lg:w-[58vw] max-w-[860px] overflow-hidden"
          >
            <div className="relative h-52 md:h-64 overflow-hidden bg-[#0d0d14]">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11111a] via-transparent to-transparent" />
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${BADGE_STYLES[p.badgeType]}`}
              >
                {p.badge}
              </span>
              <span className="absolute bottom-3 right-5 font-display text-6xl md:text-8xl font-black text-white/[0.07] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {p.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
                {p.title}
              </h3>
              <p className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase mb-4">
                {p.subtitle}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">{p.description}</p>
              <div className="flex items-center gap-3">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black text-xs font-display font-bold uppercase tracking-wider hover:bg-[#d4ff3f] transition-colors"
                >
                  <span>{isId ? "Lihat Repo" : "View Repo"}</span>
                  <ArrowUpRight size={14} />
                </a>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/15 text-xs font-display font-bold uppercase tracking-wider text-slate-200 hover:border-[#d4ff3f]/50 hover:text-[#d4ff3f] transition-colors"
                  >
                    <span>{isId ? "Demo Langsung" : "Live Demo"}</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-full border border-white/15 bg-white/5 font-mono text-[11px] font-bold tracking-[0.25em] text-white">
            {isId ? "HALAMAN" : "PAGE"} {page + 1} / {flagshipProjects.length}
          </span>
          <div className="hidden sm:flex gap-1.5">
            {flagshipProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === page ? "w-8 bg-[#d4ff3f]" : "w-3 bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
        </div>
        <TransitionLink
          href="/projects"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-display font-black uppercase tracking-widest hover:bg-[#d4ff3f] transition-colors"
        >
          {isId ? "Lihat Semua Proyek" : "View More"}
          <ArrowUpRight size={15} className="group-hover:rotate-45 transition-transform" />
        </TransitionLink>
      </div>
    </section>
  );
}
