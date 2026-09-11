"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { AWARDS_DATA, AWARDS_DATA_ID } from "@/data/portfolioData";
import TiltCard from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { Trophy, Award, Sparkles, Globe } from "lucide-react";
import TextScramble from "@/components/animations/TextScramble";

const getAwardIcon = (iconName: string) => {
  switch (iconName) {
    case "Trophy":
      return <Trophy className="w-6 h-6 text-amber-500 dark:text-amber-400" />;
    case "Sparkles":
      return <Sparkles className="w-6 h-6 text-amber-500 dark:text-amber-300" />;
    case "Award":
      return <Award className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
    case "Globe":
      return <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
    default:
      return <Award className="w-6 h-6 text-amber-500 dark:text-amber-400" />;
  }
};

export default function AccoladesSection() {
  const { t, language } = usePortfolio();
  const isId = language === "id";
  const awards = isId ? AWARDS_DATA_ID : AWARDS_DATA;

  return (
    <section id="accolades" className="relative py-8 z-10">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="text-[10px] font-display text-amber-600 dark:text-amber-400 mb-2 uppercase flex items-center gap-2">
            <Trophy size={14} className="text-amber-600 dark:text-amber-400" />
            <TextScramble text={isId ? "PENGHARGAAN & PRESTASI" : "HONORS & DISTINCTIONS"} speed={20} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white leading-tight max-w-4xl mb-3">
            {t("awards.title")}
          </h2>
          <p className="text-xs sm:text-sm font-body text-slate-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
            {t("awards.lead")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {awards.map((award, idx) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <TiltCard
                data-detail={isId ? `${award.title} dianugerahkan oleh ${award.issuer} (${award.period})` : `${award.title} awarded by ${award.issuer} (${award.period})`}
                data-title="VERIFIED_HONOR"
                className="p-6 sm:p-7 flex flex-col gap-3 h-full justify-between cursor-pointer border border-slate-200 dark:border-amber-500/20 hover:border-amber-500/60 transition-all bg-card dark:bg-[#06080e] shadow-sm dark:shadow-none"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-display tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded">
                      {award.badge}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                      {getAwardIcon(award.icon)}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 dark:text-white mt-3 mb-1">
                    {award.title}
                  </h3>
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 block mb-2">
                    {award.issuer}
                  </span>
                  <p className="text-xs font-body text-slate-600 dark:text-zinc-300 leading-relaxed">
                    {award.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-[9px] font-mono text-slate-500 dark:text-zinc-500">
                  <span>{award.period}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Sparkles size={10} />
                    <span>{isId ? "PENGHARGAAN TERVERIFIKASI" : "HONOR VERIFIED"}</span>
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
