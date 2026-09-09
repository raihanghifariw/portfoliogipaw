"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ORGANIZATIONS_DATA, ORGANIZATIONS_DATA_ID } from "@/data/portfolioData";
import TiltCard from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { Users2 } from "lucide-react";
import TextScramble from "@/components/animations/TextScramble";

export default function OrganizationsSection() {
  const { t, language } = usePortfolio();
  const isId = language === "id";
  const organizations = isId ? ORGANIZATIONS_DATA_ID : ORGANIZATIONS_DATA;

  return (
    <section id="organizations" className="relative py-24 z-10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 mb-3 uppercase flex items-center gap-2">
            <Users2 size={14} />
            <TextScramble text={isId ? "ORGANISASI & KEPEMIMPINAN" : "ORGANIZATIONS & LEADERSHIP"} speed={20} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight max-w-4xl mb-4">
            {t("organizations.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {t("organizations.lead")}
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {organizations.map((org, idx) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <TiltCard
                data-detail={isId ? `${org.role} di ${org.organization} (${org.period})` : `${org.role} at ${org.organization} (${org.period})`}
                data-title="LEADERSHIP_ROLE"
                className="p-8 flex flex-col gap-4 cursor-pointer"
              >
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <span
                    className={`text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded border ${
                      org.active
                        ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                        : "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    {org.period}
                  </span>
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-400">
                    {org.organization}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white">{org.role}</h3>

                <div>
                  <div className="text-[11px] font-mono font-bold tracking-wider text-sky-400 mb-2">
                    {isId ? "KEPEMIMPINAN UTAMA & CAPAIAN" : "KEY LEADERSHIP & DELIVERABLES"}
                  </div>
                  <ul className="flex flex-col gap-2">
                    {org.highlights.map((item, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="text-purple-400 mt-1">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10 mt-2">
                  {org.tags.map((tag) => (
                    <span
                      key={tag}
                      data-detail={isId ? `Fokus kepemimpinan: ${tag}` : `Leadership focus: ${tag}`}
                      data-title="LEADERSHIP_TAG"
                      className="text-[11px] font-mono bg-white/5 border border-white/10 text-sky-300 px-2.5 py-0.5 rounded cursor-pointer hover:border-sky-400/40"
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
