"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Download } from "lucide-react";
import { WordReveal, LetterReveal } from "@/components/animations/ScrollReveal";
import Parallax from "@/components/animations/Parallax";
import { usePortfolio } from "@/context/PortfolioContext";

function WibClock() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Jakarta",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-center">
      <p className="font-mono text-5xl md:text-7xl font-bold tracking-[0.08em] text-white tabular-nums">
        {time}
      </p>
      <p className="font-mono text-[10px] tracking-[0.35em] text-slate-500 uppercase mt-2">
        {isId ? "WIB • WAKTU INDONESIA BARAT (UTC+7)" : "WIB • WESTERN INDONESIA TIME (UTC+7)"}
      </p>
    </div>
  );
}

export default function CtaFooterSection() {
  const { language } = usePortfolio();
  const isId = language === "id";

  return (
    <footer id="contact" className="relative pt-24 sm:pt-32 pb-8 z-10 overflow-hidden border-t border-white/[0.06]">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <Parallax distance={130} className="absolute -bottom-40 left-1/2 -translate-x-1/2">
          <div className="w-[900px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full" />
        </Parallax>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
            {isId ? (
              <>
                <LetterReveal text="Mari Bangun" delay={0.1} />{" "}
                <WordReveal text="Sesuatu yang" delay={0.4} />{" "}
                <span className="text-shiny">
                  <LetterReveal text="Inovatif" delay={0.6} />
                </span>{" "}
                <WordReveal text="Bersama" delay={0.9} />
              </>
            ) : (
              <>
                <LetterReveal text="Let's Build" delay={0.1} />{" "}
                <WordReveal text="Something" delay={0.4} />{" "}
                <span className="text-shiny">
                  <LetterReveal text="Innovative" delay={0.6} />
                </span>{" "}
                <WordReveal text="Together" delay={0.9} />
              </>
            )}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center gap-10"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/raihan-ghifari-553a1a26a/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-display text-sm font-black uppercase tracking-widest hover:bg-[#d4ff3f] transition-colors cursor-pointer"
            >
              <span>{isId ? "Rekrut Saya" : "Hire Me"}</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </a>
            <a
              href="/assets/RaihanGhifariWinata_AIEngineer_CV_ver2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-display text-sm font-black uppercase tracking-widest hover:border-[#d4ff3f]/60 hover:text-[#d4ff3f] transition-colors cursor-pointer"
            >
              <span>{isId ? "Lihat Resume Saya" : "View My Resume"}</span>
              <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          <WibClock />
        </motion.div>

        <div className="mt-16 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
            © 2026 RAIHAN GHIFARI WINATA • {isId ? "MERANCANG SISTEM CERDAS" : "ARCHITECTING INTELLIGENT SYSTEMS"}
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "GitHub", href: "https://github.com/raihanghifariw" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/raihan-ghifari-553a1a26a/" },
              { label: "Instagram", href: "https://instagram.com/pawwdanyap" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.2em] text-slate-400 hover:text-[#d4ff3f] uppercase transition-colors"
              >
                {s.label}
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-slate-300 hover:border-[#d4ff3f]/60 hover:text-[#d4ff3f] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
