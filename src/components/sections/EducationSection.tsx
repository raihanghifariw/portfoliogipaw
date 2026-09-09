"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { EDUCATION_DATA, EDUCATION_DATA_ID } from "@/data/portfolioData";
import TiltCard from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import TextScramble from "@/components/animations/TextScramble";

export default function EducationSection() {
  const { t, language } = usePortfolio();
  const isId = language === "id";
  const education = isId ? EDUCATION_DATA_ID : EDUCATION_DATA;

  return (
    <section id="education" className="relative py-24 z-10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 mb-3 uppercase flex items-center gap-2">
            <GraduationCap size={14} />
            <TextScramble text={isId ? "PENDIDIKAN & AKADEMIK" : "EDUCATION & ACADEMICS"} speed={20} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight max-w-4xl mb-4">
            {t("education.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {t("education.lead")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <TiltCard
            data-detail={`${education.degree}, ${education.institution}, CGPA ${education.gpa}`}
            data-title="ACADEMIC_DEGREE"
            className="p-8 sm:p-10 flex flex-col gap-6 cursor-pointer"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <span className="text-[11px] font-mono font-bold tracking-widest text-purple-400">
                {education.period}
              </span>
              <div
                data-detail={
                  isId
                    ? "Predikat kehormatan tertinggi atas prestasi akademik selama 8 semester"
                    : "Highest distinction with academic merit across 8 semesters"
                }
                data-title={isId ? "IPK_AKADEMIK" : "ACADEMIC_GPA"}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs"
              >
                <Award size={14} />
                <span>{isId ? `IPK: ${education.gpa}` : `CGPA: ${education.gpa}`}</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-1">
                {education.institution}
              </h3>
              <span className="text-sm font-mono text-sky-400">
                {education.faculty}
              </span>
            </div>

            {/* Thesis Box */}
            <div
              data-detail={
                isId
                  ? "Skripsi Sarjana: Lagrangian Safety-Constrained Soft Actor-Critic (SAC) untuk perawatan sepsis ICU"
                  : "Undergraduate Thesis: Lagrangian Safety-Constrained Soft Actor-Critic (SAC) for ICU sepsis treatment"
              }
              data-title={isId ? "SKRIPSI_SARJANA" : "BACHELOR_THESIS"}
              className="bg-black/30 border border-white/10 rounded-xl p-5 sm:p-6 flex flex-col gap-2 cursor-pointer hover:border-purple-400/40 transition-colors"
            >
              <span className="text-[11px] font-mono font-bold tracking-widest text-purple-400">
                {education.thesis.label}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                {education.thesis.title}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {education.thesis.description}
              </p>
            </div>

            {/* Coursework */}
            <div>
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 block mb-3">
                {isId ? "MATA KULIAH AKADEMIK UTAMA:" : "KEY ACADEMIC COURSEWORK:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((course, i) => (
                  <span
                    key={i}
                    data-detail={isId ? `Kurikulum Akademik Lanjutan: ${course}` : `Advanced Academic Curriculum: ${course}`}
                    data-title={isId ? "MATA_KULIAH" : "COURSEWORK"}
                    className={`text-xs px-3 py-1 rounded-full border cursor-pointer ${
                      i < 2
                        ? "bg-purple-500/15 border-purple-500/35 text-white shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
