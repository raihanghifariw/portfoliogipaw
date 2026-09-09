"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CORE_FOCUS_DOMAINS, CORE_FOCUS_DOMAINS_ID } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { CapabilityItem, SkillLevel } from "@/types";
import { ChevronDown, ChevronUp, Sparkles, Brain, Cpu, Server } from "lucide-react";

function getLevelBadgeStyle(level: SkillLevel) {
  switch (level) {
    case "BEGINNER":
      return {
        bg: "bg-sky-500/10 border-sky-500/30 text-sky-400",
        bar: "from-sky-500 to-cyan-400",
      };
    case "INTERMEDIATE":
      return {
        bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        bar: "from-emerald-500 to-teal-400",
      };
    case "ADVANCED":
      return {
        bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        bar: "from-amber-500 to-orange-400",
      };
    case "EXPERT":
      return {
        bg: "bg-purple-500/10 border-purple-500/30 text-purple-400",
        bar: "from-purple-500 to-indigo-400",
      };
  }
}

function CapabilityCard({ item }: { item: CapabilityItem }) {
  const badgeStyle = getLevelBadgeStyle(item.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
      className="p-5 rounded-2xl bg-[#11111a]/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-4 hover:border-white/20 transition-all shadow-lg group"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
          {item.title}
        </h4>
        <span
          className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold tracking-wider shrink-0 ${badgeStyle.bg}`}
        >
          {item.level}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        {item.description}
      </p>

      {/* Proficiency Slider Bar */}
      <div className="w-full">
        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${badgeStyle.bar}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${item.proficiencyScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function CoreFocusMatrixSection() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const domains = isId ? CORE_FOCUS_DOMAINS_ID : CORE_FOCUS_DOMAINS;

  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({});

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) => ({
      ...prev,
      [domainId]: !prev[domainId],
    }));
  };

  const domainIcons: Record<string, React.ReactNode> = {
    "applied-ai": <Brain className="w-5 h-5 text-purple-400" />,
    "software-engineering": <Cpu className="w-5 h-5 text-sky-400" />,
    "additional-skills": <Server className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <section className="relative w-full py-20 z-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="tracking-[0.2em] uppercase font-bold">
              {isId ? "KAPABILITAS & ARSITEKTUR" : "CAPABILITIES & ARCHITECTURES"}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight">
            {isId ? "Fokus Utama" : "Core Focus"}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            {isId
              ? "Pilar kapabilitas terspesialisasi yang mencakup deep learning terapan, rekayasa perangkat lunak terdistribusi, serta infrastruktur produksi."
              : "Specialized capability pillars categorized by applied deep learning, distributed software engineering, and production infrastructure."}
          </p>
        </div>

        {/* 3 Domain Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {domains.map((domain) => {
            const isExpanded = !!expandedDomains[domain.id];
            const visibleSkills = isExpanded ? domain.skills : domain.skills.slice(0, 3);
            const remainingCount = domain.skills.length - 3;

            return (
              <div
                key={domain.id}
                className="flex flex-col gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {domainIcons[domain.id]}
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{domain.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {domain.skills.length} {isId ? "Keahlian" : "Skills"}
                  </span>
                </div>

                {/* Capability Cards List */}
                <div className="flex flex-col gap-4">
                  <AnimatePresence mode="popLayout">
                    {visibleSkills.map((item) => (
                      <CapabilityCard key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Accordion Expand / Collapse Button */}
                {domain.skills.length > 3 && (
                  <button
                    onClick={() => toggleDomain(domain.id)}
                    className="w-full mt-2 py-3 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-xs font-mono font-bold tracking-wider text-slate-300 hover:text-white hover:border-sky-400/40 hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {isExpanded ? (
                      <>
                        <span>{isId ? "Tampilkan Lebih Sedikit" : "View Less"}</span>
                        <ChevronUp className="w-4 h-4 text-sky-400 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    ) : (
                      <>
                        <span>{isId ? `Lihat Lainnya (${remainingCount})` : `View More (${remainingCount})`}</span>
                        <ChevronDown className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
