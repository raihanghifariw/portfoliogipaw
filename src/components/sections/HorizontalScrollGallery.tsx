"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { AWARDS_DATA } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";

export default function HorizontalScrollGallery() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  if (reduce) {
    return (
      <section id="honors-gallery" className="relative py-24 z-10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {AWARDS_DATA.map((a) => (
            <div key={a.id} className="spotlight-card p-8">
              <span className="text-4xl">{a.icon}</span>
              <h3 className="font-display text-2xl font-bold text-white mt-4">{a.title}</h3>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#d4ff3f] uppercase mt-2">{a.badge}</p>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="honors-gallery"
      ref={sectionRef}
      className="relative z-10"
      style={{ height: "380vh" }}
      aria-label="Honors and awards horizontal gallery"
    >
      {/* Sticky viewport pins while user scrolls vertically */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1320px] mx-auto w-full px-6 sm:px-12 mb-10">
          <p className="font-mono text-[11px] tracking-[0.3em] text-slate-500 uppercase mb-3">
            {isId ? "PRESTASI & SERTIFIKASI • GULIR HORIZONTAL" : "HONORS & CERTIFICATIONS • HORIZONTAL SCROLL"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
            {isId ? (
              <>
                Memvalidasi <span className="text-shiny">Keunggulan</span>
              </>
            ) : (
              <>
                Validating <span className="text-shiny">Excellence</span>
              </>
            )}
          </h2>
          <p className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">
            {isId ? "TERUS GULIR" : "KEEP SCROLLING"} <MoveRight size={14} className="text-[#d4ff3f] animate-pulse" />
          </p>
        </div>

        <motion.div
          style={{ x }}
          className="flex gap-6 md:gap-8 items-stretch pl-6 sm:pl-12 pr-[12vw] w-max will-change-transform"
        >
          {AWARDS_DATA.map((a, i) => (
            <article
              key={a.id}
              className="spotlight-card relative w-[82vw] sm:w-[440px] md:w-[520px] shrink-0 p-8 md:p-10 flex flex-col min-h-[380px] md:min-h-[440px]"
              data-detail={a.description}
              data-title={`HONOR_${String(i + 1).padStart(2, "0")}`}
            >
              <span className="absolute top-6 right-8 font-display text-7xl md:text-8xl font-black text-white/[0.06] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="text-5xl md:text-6xl mb-6">{a.icon}</span>

              <p className="font-mono text-[10px] tracking-[0.25em] text-[#d4ff3f] uppercase mb-2">
                {a.badge}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                {a.title}
              </h3>
              <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase mt-2">
                {a.issuer}
              </p>

              <p className="text-sm text-slate-400 leading-relaxed mt-5 flex-1">{a.description}</p>

              <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.3em] text-slate-600 uppercase">
                  {a.period}
                </span>
                <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-slate-400 group-hover:border-[#d4ff3f]/50 group-hover:text-[#d4ff3f] transition-colors">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </article>
          ))}

          {/* End-cap card */}
          <div className="w-[70vw] sm:w-[380px] shrink-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-display text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                {isId ? (
                  <>
                    Dan perjalanan
                    <br />
                    <span className="text-shiny">berlanjut...</span>
                  </>
                ) : (
                  <>
                    And the journey
                    <br />
                    <span className="text-shiny">continues...</span>
                  </>
                )}
              </p>
              <a
                href="https://www.linkedin.com/in/raihan-ghifari-553a1a26a/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-display font-black uppercase tracking-widest hover:bg-[#d4ff3f] transition-colors"
              >
                {isId ? "Kredensial lengkap di LinkedIn" : "Full credentials on LinkedIn"} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Horizontal progress rail */}
        <div className="max-w-[1320px] mx-auto w-full px-6 sm:px-12 mt-12">
          <div className="h-[3px] w-full bg-white/[0.08] rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: progressScale }}
              className="h-full w-full bg-gradient-to-r from-[#d4ff3f] to-sky-400 origin-left rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
