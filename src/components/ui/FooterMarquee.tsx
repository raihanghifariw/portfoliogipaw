"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowUp } from "lucide-react";

export default function FooterMarquee() {
  const { language } = usePortfolio();
  const isId = language === "id";

  return (
    <footer className="relative bg-[#050508] border-t border-white/10 pt-10 pb-16 overflow-hidden z-10">
      {/* Ticker 1 - Leftward */}
      <div className="w-full overflow-hidden whitespace-nowrap py-3 bg-purple-500/10 border-y border-purple-500/20 group cursor-pointer">
        <div className="inline-block animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] font-display font-black text-xs uppercase tracking-widest text-slate-200">
          <span>PyTorch • Deep Reinforcement Learning • Generative AI • LangGraph • FastAPI • AWS Cloud • Docker • OpenCV • MIMIC-III • Next.js • TypeScript • SAC • Decision Transformers •&nbsp;</span>
          <span>PyTorch • Deep Reinforcement Learning • Generative AI • LangGraph • FastAPI • AWS Cloud • Docker • OpenCV • MIMIC-III • Next.js • TypeScript • SAC • Decision Transformers •&nbsp;</span>
        </div>
      </div>

      {/* Ticker 2 - Rightward */}
      <div className="w-full overflow-hidden whitespace-nowrap py-3 bg-sky-500/5 border-b border-sky-500/20 mt-2 group cursor-pointer">
        <div className="inline-block animate-[marquee-reverse_35s_linear_infinite] group-hover:[animation-play-state:paused] font-display font-black text-xs uppercase tracking-widest text-sky-400">
          <span>
            {isId
              ? "AI Engineer • Peneliti Machine Learning • AI Klinis • MLOps Engineer • Juara PRAGMA Hackathon • AWS Certified AI Practitioner • Data Scientist • "
              : "AI Engineer • Machine Learning Researcher • Clinical AI • MLOps Engineer • PRAGMA Hackathon Winner • AWS Certified AI Practitioner • Data Scientist • "}
            &nbsp;
          </span>
          <span>
            {isId
              ? "AI Engineer • Peneliti Machine Learning • AI Klinis • MLOps Engineer • Juara PRAGMA Hackathon • AWS Certified AI Practitioner • Data Scientist • "
              : "AI Engineer • Machine Learning Researcher • Clinical AI • MLOps Engineer • PRAGMA Hackathon Winner • AWS Certified AI Practitioner • Data Scientist • "}
            &nbsp;
          </span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="font-display font-black text-2xl bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent block mb-3">
            RGW
          </span>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            {isId
              ? "Raihan Ghifari Winata • Machine Learning & AI Engineer. Merancang kecerdasan komputasi yang andal, aman, dan siap produksi."
              : "Raihan Ghifari Winata • Machine Learning & AI Engineer. Architecting reliable, safe, and production-minded intelligence."}
          </p>
        </div>

        <div className="font-mono text-xs flex flex-col gap-2">
          <span className="font-bold text-slate-500 uppercase tracking-widest mb-1">
            {isId ? "NAVIGASI" : "NAVIGATION"}
          </span>
          <ul className="flex flex-col gap-1.5 text-slate-400">
            <li><a href="#identity" className="hover:text-white transition-colors">{isId ? "01 • Identitas" : "01 • Identity"}</a></li>
            <li><a href="#projects" className="hover:text-white transition-colors">{isId ? "02 • Portofolio Proyek" : "02 • Portfolio Projects"}</a></li>
            <li><a href="#competency" className="hover:text-white transition-colors">{isId ? "03 • Kapabilitas & Arsenal" : "03 • Arsenal"}</a></li>
            <li><a href="#experience" className="hover:text-white transition-colors">{isId ? "04 • Pengalaman" : "04 • Experience"}</a></li>
            <li><a href="#organizations" className="hover:text-white transition-colors">{isId ? "05 • Organisasi" : "05 • Organizations"}</a></li>
            <li><a href="#education" className="hover:text-white transition-colors">{isId ? "06 • Pendidikan" : "06 • Education"}</a></li>
            <li><a href="#accolades" className="hover:text-white transition-colors">{isId ? "07 • Penghargaan" : "07 • Accolades"}</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">{isId ? "09 • Kontak" : "09 • Contact"}</a></li>
          </ul>
        </div>

        <div className="font-mono text-xs flex flex-col justify-between">
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-widest mb-2 block">
              {isId ? "TELEMETRI LOKAL" : "LOCAL TELEMETRY"}
            </span>
            <p className="text-slate-400">{isId ? "LOKASI: BEKASI, INDONESIA" : "LOCATION: BEKASI, INDONESIA"}</p>
            <p className="text-slate-400">{isId ? "ZONA WAKTU: WIB (UTC+7)" : "TIMEZONE: WIB (UTC+7)"}</p>
            <p className="text-slate-500 mt-2">© 2026 RAIHAN GHIFARI WINATA</p>
          </div>

          <a
            href="#home"
            data-detail="Smooth scroll jump back to the top hero section"
            data-title="SCROLL_TOP"
            className="inline-flex items-center gap-1 text-sky-400 hover:text-white font-bold mt-4 tracking-wider cursor-pointer"
          >
            <span>{isId ? "KEMBALI KE ATAS" : "BACK TO TOP"}</span>
            <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
