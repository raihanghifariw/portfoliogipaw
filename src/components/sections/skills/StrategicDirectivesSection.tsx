"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { STRATEGIC_DIRECTIVES, STRATEGIC_DIRECTIVES_ID } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Puzzle,
  GitMerge,
  Brain,
  BookOpen,
  LineChart,
  RefreshCw,
  Users,
  MessageSquare,
  Handshake,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  puzzle: <Puzzle className="w-5 h-5" />,
  "git-merge": <GitMerge className="w-5 h-5" />,
  brain: <Brain className="w-5 h-5" />,
  "book-open": <BookOpen className="w-5 h-5" />,
  "line-chart": <LineChart className="w-5 h-5" />,
  "refresh-cw": <RefreshCw className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  "message-square": <MessageSquare className="w-5 h-5" />,
  handshake: <Handshake className="w-5 h-5" />,
  search: <Search className="w-5 h-5" />,
};

// Procedural schematic visual for top of each directive card
function DirectiveGraphic({ index }: { index: number }) {
  const colors = [
    "from-purple-500/20 to-sky-500/10",
    "from-sky-500/20 to-emerald-500/10",
    "from-indigo-500/20 to-purple-500/10",
    "from-emerald-500/20 to-teal-500/10",
    "from-amber-500/20 to-orange-500/10",
    "from-cyan-500/20 to-blue-500/10",
    "from-purple-500/20 to-pink-500/10",
    "from-blue-500/20 to-cyan-500/10",
    "from-emerald-500/20 to-sky-500/10",
    "from-purple-500/20 to-indigo-500/10",
  ];

  return (
    <div className={`relative w-full h-36 rounded-xl bg-gradient-to-br ${colors[index % colors.length]} border border-white/10 overflow-hidden flex items-center justify-center p-4 group-hover:border-sky-400/40 transition-colors`}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Abstract geometric graphic */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.07] border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:border-sky-400/60 transition-all duration-300">
          {index === 0 && <Puzzle className="w-7 h-7 text-purple-400" />}
          {index === 1 && <GitMerge className="w-7 h-7 text-sky-400" />}
          {index === 2 && <Brain className="w-7 h-7 text-indigo-400" />}
          {index === 3 && <BookOpen className="w-7 h-7 text-emerald-400" />}
          {index === 4 && <LineChart className="w-7 h-7 text-amber-400" />}
          {index === 5 && <RefreshCw className="w-7 h-7 text-cyan-400" />}
          {index === 6 && <Users className="w-7 h-7 text-pink-400" />}
          {index === 7 && <MessageSquare className="w-7 h-7 text-blue-400" />}
          {index === 8 && <Handshake className="w-7 h-7 text-teal-400" />}
          {index === 9 && <Search className="w-7 h-7 text-purple-300" />}
        </div>
      </div>

      {/* Subtle glowing circuit dot */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 animate-ping" />
        <span className="text-[10px] font-mono text-slate-400">#0{index + 1}</span>
      </div>
    </div>
  );
}

export default function StrategicDirectivesSection() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const directives = isId ? STRATEGIC_DIRECTIVES_ID : STRATEGIC_DIRECTIVES;

  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = direction === "left" ? -340 : 340;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-20 overflow-hidden z-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-sky-400 uppercase">
                {isId ? "DIREKTIF STRATEGIS & KAPABILITAS" : "DIRECTIVES & CAPABILITIES"}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight">
              {isId ? "Direktif Strategis" : "Strategic Directives"}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-3 leading-relaxed">
              {isId
                ? "Kapabilitas interpersonal yang dirancang untuk kepemimpinan berdampak tinggi dan pemecahan masalah sistemik dalam lingkungan rekayasa kompleks."
                : "Interpersonal capabilities engineered for high-impact leadership and systemic problem solving in complex engineering environments."}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {directives.map((directive, index) => {
            const isHovered = hoveredCard === directive.id;

            return (
              <motion.div
                key={directive.id}
                onMouseEnter={() => setHoveredCard(directive.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -6 }}
                className="relative min-w-[290px] sm:min-w-[320px] max-w-[320px] snap-start flex flex-col p-5 rounded-2xl bg-[#11111a]/80 border border-white/10 backdrop-blur-xl transition-all duration-300 group shadow-xl"
              >
                {/* Tech HUD Corner Brackets */}
                <div
                  className={`absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 rounded-tl transition-colors duration-300 ${
                    isHovered ? "border-sky-400" : "border-transparent"
                  }`}
                />
                <div
                  className={`absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 rounded-tr transition-colors duration-300 ${
                    isHovered ? "border-sky-400" : "border-transparent"
                  }`}
                />
                <div
                  className={`absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 rounded-bl transition-colors duration-300 ${
                    isHovered ? "border-sky-400" : "border-transparent"
                  }`}
                />
                <div
                  className={`absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 rounded-br transition-colors duration-300 ${
                    isHovered ? "border-sky-400" : "border-transparent"
                  }`}
                />

                {/* Directive Visual Graphic */}
                <DirectiveGraphic index={index} />

                {/* Directive Number & Icon */}
                <div className="flex items-center justify-between mt-5 mb-2 text-slate-400 font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    {ICON_MAP[directive.iconName]}
                    <span className="font-bold text-sky-400/90">{directive.number}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">{isId ? "DIREKTIF" : "DIRECTIVE"}</span>
                </div>

                {/* Directive Title */}
                <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-2 group-hover:text-sky-300 transition-colors">
                  {directive.title}
                </h3>

                {/* Directive Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-auto">
                  {directive.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
