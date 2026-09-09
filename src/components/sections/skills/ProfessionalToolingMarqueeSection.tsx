"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { PROFESSIONAL_TOOLS_ROW1, PROFESSIONAL_TOOLS_ROW2 } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import type { ToolingItem } from "@/types";

function ToolIcon({ iconKey }: { iconKey: string }) {
  switch (iconKey) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#007acc]">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.276a1 1 0 00-.074 1.486L4.01 12 .253 15.238a1 1 0 00.074 1.486l1.322 1.217a1 1 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
        </svg>
      );
    case "jupyter":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f37626]">
          <path d="M12 0C7.5 0 3.75 2.25 2 5.625c.5.25 1 .625 1.5 1 1.5-2.75 4.5-4.625 8.5-4.625 4.875 0 8.875 2.875 9.75 6.75.5-.125 1-.25 1.5-.25C22.25 3.75 17.625 0 12 0zm0 22c-4.875 0-8.875-2.875-9.75-6.75-.5.125-1 .25-1.5.25C1.75 20.25 6.375 24 12 24c4.5 0 8.25-2.25 10-5.625-.5-.25-1-.625-1.5-1-1.5 2.75-4.5 4.625-8.5 4.625z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "colab":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f9ab00]">
          <path d="M16.9 7.6a4.4 4.4 0 100 8.8 4.4 4.4 0 000-8.8zm-9.8 0a4.4 4.4 0 100 8.8 4.4 4.4 0 000-8.8z" />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f24e1e]">
          <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zM4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4zm0-8c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4zm8-4h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0zm0 8h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V8z" />
        </svg>
      );
    case "postman":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#ff6c37]">
          <path d="M13.5 0a10.5 10.5 0 100 21 10.5 10.5 0 000-21zm-1.8 17.5l-4-4 1.4-1.4 2.6 2.6 6.6-6.6 1.4 1.4-8 8z" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#2496ed]">
          <path d="M13.98 11.08h2.15v2.15h-2.15v-2.15zm-3.22 0h2.15v2.15h-2.15v-2.15zm-3.23 0h2.15v2.15H7.53v-2.15zm9.68-3.23h2.15V10h-2.15V7.85zm-3.22 0h2.15V10h-2.15V7.85zm-3.23 0h2.15V10H10.76V7.85zm-3.23 0h2.15V10H7.53V7.85zm9.68-3.23h2.15v2.15h-2.15V4.62zm-3.22 0h2.15v2.15h-2.15V4.62zm9.68 9.68c-.43 2.15-2.15 4.3-4.3 5.38-3.23 1.6-7.53 1.6-10.75 0-3.23-1.6-5.38-4.84-5.38-8.6 0-.54.05-1.08.16-1.61h14.52c.54 0 1.08.05 1.61.16 1.08.22 2.15.86 2.69 1.72.54.86.86 1.83.86 2.95h.59z" />
        </svg>
      );
    case "linux":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#fcc624]">
          <path d="M12 0C8.5 0 7 2.5 7 5.5c0 1.5.5 3.5 1 5-1.5 1-3 3-3 5.5 0 3 2.5 5 5 5h4c2.5 0 5-2 5-5 0-2.5-1.5-4.5-3-5.5.5-1.5 1-3.5 1-5C17 2.5 15.5 0 12 0z" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f05032]">
          <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.126 0L8.81 2.583l3.35 3.35a1.86 1.86 0 0 1 2.36 2.39l3.22 3.22a1.86 1.86 0 1 1-1.07 1.07l-3.08-3.08v4.94a1.86 1.86 0 1 1-1.5 0V9.37a1.86 1.86 0 0 1-.99-.99L7.74 5.03.454 12.32a1.5 1.5 0 0 0 0 2.126l10.478 10.48a1.5 1.5 0 0 0 2.126 0l10.488-10.49a1.5 1.5 0 0 0 0-2.125z" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f59e0b]">
          <path d="M6.88 12.28a.5.5 0 0 1-.48-.36 7.4 7.4 0 0 1-.2-1.72 7.46 7.46 0 0 1 7.45-7.45 7.46 7.46 0 0 1 7.3 6.01 4.7 4.7 0 0 1 1.7.35 4.67 4.67 0 0 1-4.35 6.36H6.38a4.39 4.39 0 0 1-4.38-4.39 4.39 4.39 0 0 1 4.88-4.37v1.17zm13.14 6.72c-2.4 1.52-5.46 2.33-8.52 2.33-4.28 0-8.16-1.6-11.08-4.28-.24-.22-.04-.52.24-.35 3.18 1.9 7.02 3.03 10.96 3.03 2.72 0 5.67-.62 8.28-1.92.39-.2.62.24.12.59v.6z" />
        </svg>
      );
    case "conda":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#44a833]">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#44a833" strokeWidth="2.5" />
          <path d="M7 12a5 5 0 0 1 9-3" stroke="#44a833" strokeWidth="2.5" fill="none" />
          <circle cx="12" cy="12" r="2.5" fill="#44a833" />
        </svg>
      );
    case "terraform":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#7b42bc]">
          <path d="M1.5 2.5h6.3v7.3H1.5zm7.3 4h6.3v7.3H8.8zm7.3-4h6.4v7.3h-6.4zm-7.3 11.3h6.3v7.3H8.8z" />
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#4169e1]">
          <path d="M12 1.6c-4.4 0-8 3.6-8 8 0 5.5 5.5 10.4 7.6 12 .2.2.6.2.8 0 2.1-1.6 7.6-6.5 7.6-12 0-4.4-3.6-8-8-8zm-2.4 10.8c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm4.8 0c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4z" />
        </svg>
      );
    default:
      return <Wrench className="w-5 h-5 text-sky-400" />;
  }
}

function ToolCard({ tool }: { tool: ToolingItem }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#11111a]/90 border border-white/15 backdrop-blur-md shrink-0 hover:border-sky-400/50 hover:bg-white/10 transition-all shadow-lg select-none group cursor-default">
      <div className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform">
        <ToolIcon iconKey={tool.iconKey} />
      </div>
      <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-200 group-hover:text-white uppercase">
        {tool.name}
      </span>
    </div>
  );
}

export default function ProfessionalToolingMarqueeSection() {
  const row1Duplicates = [...PROFESSIONAL_TOOLS_ROW1, ...PROFESSIONAL_TOOLS_ROW1, ...PROFESSIONAL_TOOLS_ROW1];
  const row2Duplicates = [...PROFESSIONAL_TOOLS_ROW2, ...PROFESSIONAL_TOOLS_ROW2, ...PROFESSIONAL_TOOLS_ROW2];

  return (
    <section className="relative w-full py-20 z-20 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 mb-12 text-center">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-sky-400 uppercase bg-sky-500/10 px-3.5 py-1 rounded-full border border-sky-500/20">
          WORKFLOW &amp; INFRASTRUCTURE
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight mt-3">
          Professional Tooling
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-3 leading-relaxed">
          Leveraging industrial-grade platforms for development, design, and deployment to ensure rapid and reliable software delivery.
        </p>
      </div>

      {/* Infinite Marquee Track 1 (Leftward) */}
      <div className="relative w-full flex overflow-hidden mb-5 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <motion.div
          className="flex gap-4"
          animate={{ x: [0, -1400] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 32,
            ease: "linear",
          }}
        >
          {row1Duplicates.map((tool, idx) => (
            <ToolCard key={`${tool.id}-r1-${idx}`} tool={tool} />
          ))}
        </motion.div>
      </div>

      {/* Infinite Marquee Track 2 (Rightward) */}
      <div className="relative w-full flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <motion.div
          className="flex gap-4"
          animate={{ x: [-1400, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          }}
        >
          {row2Duplicates.map((tool, idx) => (
            <ToolCard key={`${tool.id}-r2-${idx}`} tool={tool} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
