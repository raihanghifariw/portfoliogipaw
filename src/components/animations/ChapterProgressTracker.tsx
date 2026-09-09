"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";

import { usePortfolio } from "@/context/PortfolioContext";

const CHAPTERS_MAP_EN: Record<string, { num: string; title: string }> = {
  "/": { num: "01", title: "HOME" },
  "/about": { num: "02", title: "ABOUT" },
  "/projects": { num: "03", title: "PROJECTS" },
  "/skills": { num: "04", title: "SKILLS" },
  "/experience": { num: "05", title: "EXPERIENCE" },
  "/achievements": { num: "06", title: "HONORS" },
  "/telemetry": { num: "07", title: "PULSE" },
  "/resume": { num: "08", title: "RESUME" },
  "/contact": { num: "09", title: "CONTACT" },
};

const CHAPTERS_MAP_ID: Record<string, { num: string; title: string }> = {
  "/": { num: "01", title: "BERANDA" },
  "/about": { num: "02", title: "TENTANG" },
  "/projects": { num: "03", title: "PROYEK" },
  "/skills": { num: "04", title: "KEAHLIAN" },
  "/experience": { num: "05", title: "PENGALAMAN" },
  "/achievements": { num: "06", title: "PRESTASI" },
  "/telemetry": { num: "07", title: "PULSA" },
  "/resume": { num: "08", title: "RESUME" },
  "/contact": { num: "09", title: "KONTAK" },
};

export default function ChapterProgressTracker() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const chaptersMap = isId ? CHAPTERS_MAP_ID : CHAPTERS_MAP_EN;
  const pathname = usePathname();
  const [currentChapter, setCurrentChapter] = useState({ num: "01", title: "HOME" });
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const matched = Object.keys(chaptersMap).find((key) =>
      key === "/" ? pathname === "/" : pathname.startsWith(key)
    );
    if (matched) {
      setCurrentChapter(chaptersMap[matched]);
    } else {
      setCurrentChapter({ num: "✦", title: isId ? "LIHAT" : "VIEW" });
    }
  }, [pathname, chaptersMap, isId]);

  return (
    <div
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Chapter Number Badge */}
      <div className="px-2 py-1 bg-[#11111a]/90 border border-cyan-500/30 shadow-[2px_2px_0px_#00f0ff] text-center">
        <span className="font-display pixel-xs text-cyan-400 block">
          {currentChapter.num}
        </span>
        <span className="font-mono text-[8px] text-slate-500 block">09</span>
      </div>

      {/* Progress Track Line */}
      <div className="w-[2px] h-28 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-gradient-to-b from-purple-500 via-sky-400 to-emerald-400"
        />
      </div>

      {/* Vertical Page Label */}
      <div className="[writing-mode:vertical-rl] font-heading text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
        {currentChapter.title}
      </div>
    </div>
  );
}
