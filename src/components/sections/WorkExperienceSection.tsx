"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { WORK_EXPERIENCES, WORK_EXPERIENCES_ID } from "@/data/portfolioData";
import TiltCard from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import TextScramble from "@/components/animations/TextScramble";

export default function WorkExperienceSection() {
  const { t, language } = usePortfolio();
  const isId = language === "id";
  const experiences = isId ? WORK_EXPERIENCES_ID : WORK_EXPERIENCES;

  return (
    <section id="experience" className="relative py-24 z-10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="text-xs font-heading font-bold tracking-[0.2em] text-cyan-400 mb-3 uppercase flex items-center gap-2">
            <Briefcase size={14} />
            <TextScramble text={isId ? "PENGALAMAN KERJA" : "WORK EXPERIENCE"} speed={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-display pixel-2xl text-white uppercase leading-snug max-w-4xl mb-4">
            {t("experience.title")}
          </h2>
          <p className="font-body text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {t("experience.lead")}
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <TiltCard
                data-detail={isId ? `${exp.role} di ${exp.organization} (${exp.period})` : `${exp.role} at ${exp.organization} (${exp.period})`}
                data-title="CAREER_POSITION"
                className="p-8 flex flex-col gap-4 cursor-pointer"
              >
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <span
                    className={`text-xs font-heading font-bold tracking-wider px-2.5 py-1 rounded border ${
                      exp.active
                        ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                        : "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    {exp.period}
                  </span>
                  <span className="text-xs font-heading font-bold tracking-widest text-slate-400 uppercase">
                    {exp.organization}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-white">{exp.role}</h3>

                <div>
                  <div className="text-xs font-heading font-bold tracking-wider text-purple-400 mb-2 uppercase">
                    {isId ? "TUGAS & TANGGUNG JAWAB" : "TASKS & RESPONSIBILITIES"}
                  </div>
                  <ul className="flex flex-col gap-2 font-body">
                    {exp.tasks.map((task, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="text-cyan-400 mt-1">▹</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {exp.impact.length > 0 && (
                  <div className="mt-1">
                    <div className="text-[11px] font-mono font-bold tracking-wider text-sky-400 mb-2">
                      {isId ? "DAMPAK & HASIL KLINIS" : "IMPACT & CLINICAL OUTCOMES"}
                    </div>
                    <ul className="flex flex-col gap-2">
                      {exp.impact.map((imp, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                          <span className="text-purple-400 mt-1">▹</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10 mt-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      data-detail={isId ? `Kompetensi inti dalam peran ini: ${tag}` : `Core competency used in this role: ${tag}`}
                      data-title="EXPERIENCE_SKILL"
                      className="text-[11px] font-mono bg-white/5 border border-white/10 text-purple-300 px-2.5 py-0.5 rounded cursor-pointer hover:border-purple-400/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
