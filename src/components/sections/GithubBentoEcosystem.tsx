"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SquareTerminal, Trophy, Timer } from "lucide-react";
import { WordReveal } from "@/components/animations/ScrollReveal";
import { usePortfolio } from "@/context/PortfolioContext";

function GithubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const LEVEL_COLORS = [
  "bg-white/[0.06]",
  "bg-emerald-900/70",
  "bg-emerald-700/80",
  "bg-emerald-500/90",
  "bg-[#d4ff3f]",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["M", "", "W", "", "F", "", ""];

const LANGUAGES = [
  { name: "Python", pct: 45, color: "bg-[#3776ab]" },
  { name: "TypeScript", pct: 28, color: "bg-sky-400" },
  { name: "Jupyter", pct: 15, color: "bg-orange-400" },
  { name: "Go", pct: 7, color: "bg-cyan-400" },
  { name: "CSS", pct: 5, color: "bg-purple-400" },
];

const COMMIT_FEED = [
  { repo: "vlm-cv-defect-triage", msg: "feat: add CV anomaly overlay to dashboard", sha: "a3f9c21" },
  { repo: "aero-flare", msg: "perf: batch NASA FIRMS ingestion worker", sha: "7d2e0b4" },
  { repo: "RLEnsembleSepsiRecommendations", msg: "fix: stabilize ESS at 1374 via Smooth L1", sha: "e91f77a" },
  { repo: "agentic-ops-rag-system", msg: "test: pass 31/31 pytest routing suite", sha: "b5c8d02" },
  { repo: "Transformers_TreatmentRecommendation", msg: "feat: return-to-go conditioning for DT", sha: "c4a1e88" },
  { repo: "sharing-vision-be-repo", msg: "perf: sub-5ms pagination via GORM indices", sha: "f0d93ba" },
  { repo: "vlm-cv-defect-triage", msg: "chore: quantize LLaVA 4-bit for edge CPU", sha: "21ab6f0" },
];

function seeded(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildHeatmap() {
  const weeks = 52;
  const cells: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: number[] = [];
    for (let d = 0; d < 7; d++) {
      const r = seeded(w * 7 + d);
      const weekend = d === 0 || d === 6;
      const burst = seeded(w) > 0.72;
      let level = 0;
      const threshold = weekend ? 0.62 : 0.3;
      if (r > threshold) {
        const lvl = r + (burst ? 0.35 : 0);
        level = lvl > 1.15 ? 4 : lvl > 0.95 ? 3 : lvl > 0.75 ? 2 : 1;
      }
      col.push(level);
    }
    cells.push(col);
  }
  return cells;
}

export default function GithubBentoEcosystem() {
  const heatmap = useMemo(() => buildHeatmap(), []);
  const totalContributions = useMemo(
    () => heatmap.flat().reduce((acc, lvl) => acc + lvl * 3, 0),
    [heatmap]
  );
  const longestStreak = useMemo(() => {
    let streak = 0;
    let best = 0;
    heatmap.flat().forEach((lvl) => {
      if (lvl > 0) {
        streak += 1;
        best = Math.max(best, streak);
      } else streak = 0;
    });
    return best;
  }, [heatmap]);

  const { language } = usePortfolio();
  const isId = language === "id";

  const [gameMode, setGameMode] = useState(false);
  const [lines, setLines] = useState<string[]>([`${COMMIT_FEED[0].sha} : ${COMMIT_FEED[0].msg} (main → ${COMMIT_FEED[0].repo})`]);
  const feedIdx = useRef(1);

  useEffect(() => {
    const id = setInterval(() => {
      const c = COMMIT_FEED[feedIdx.current % COMMIT_FEED.length];
      feedIdx.current += 1;
      setLines((prev) => [...prev.slice(-5), `${c.sha} : ${c.msg} (main → ${c.repo})`]);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="github" className="relative py-24 sm:py-32 z-10 overflow-hidden bg-[#07070a] border-y border-white/[0.06]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12">
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-slate-500 uppercase mb-3">
            {isId ? "EKOSISTEM GITHUB • @raihanghifariw" : "GITHUB ECOSYSTEM • @raihanghifariw"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
            {isId ? (
              <>
                <WordReveal text="Rekayasa Kreatif," />{" "}
                <span className="text-shiny">
                  <WordReveal text="Kini Open Source." delay={0.3} />
                </span>
              </>
            ) : (
              <>
                <WordReveal text="Creative Engineering," />{" "}
                <span className="text-shiny">
                  <WordReveal text="Now Open Source." delay={0.3} />
                </span>
              </>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="spotlight-card p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <GithubIcon /> {isId ? "Aktivitas Kontribusi" : "Contribution Activity"}
                </h3>
                <button
                  onClick={() => setGameMode((g) => !g)}
                  className={`px-3.5 py-1.5 rounded-full border text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-colors ${gameMode
                      ? "border-[#d4ff3f] text-[#d4ff3f] bg-[#d4ff3f]/10"
                      : "border-white/15 text-slate-400 hover:text-white"
                    }`}
                >
                  {gameMode
                    ? isId ? "● MODE GAME ON" : "● GAME MODE ON"
                    : isId ? "MODE GAME" : "GAME MODE"}
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                <div className="flex flex-col gap-[3px] pt-[2px] shrink-0">
                  {DAYS.map((d, i) => (
                    <span key={i} className="h-[10px] font-mono text-[7px] text-slate-600 leading-[10px]">
                      {d}
                    </span>
                  ))}
                </div>
                <div className="flex gap-[3px]">
                  {heatmap.map((week, w) => (
                    <div key={w} className="flex flex-col gap-[3px]">
                      <span className="h-[8px] font-mono text-[7px] text-slate-600">
                        {w % 4 === 0 && w < 48 ? MONTHS[Math.floor((w / 52) * 12)] : ""}
                      </span>
                      {week.map((lvl, d) => (
                        <span
                          key={d}
                          title={
                            isId
                              ? `${lvl * 3} kontribusi • minggu ${w + 1}, hari ${d + 1}`
                              : `${lvl * 3} contributions • week ${w + 1}, day ${d + 1}`
                          }
                          className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_COLORS[lvl]} ${gameMode ? "animate-[game-pulse_1.2s_ease-in-out_infinite]" : ""
                            }`}
                          style={gameMode ? { animationDelay: `${((w * 7 + d) % 20) * 0.06}s` } : undefined}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-5 content-start">
              {[
                { label: isId ? "TOTAL KONTRIBUSI" : "TOTAL CONTRIBUTIONS", value: `${totalContributions}+` },
                { label: isId ? "REPOSITORI PUBLIK" : "PUBLIC REPOSITORIES", value: "14" },
                { label: isId ? "STREAK TERPANJANG" : "LONGEST STREAK", value: isId ? `${longestStreak} hari` : `${longestStreak} days` },
                { label: isId ? "BINTANG DIRAIH" : "STARS EARNED", value: "1" },
              ].map((m) => (
                <div key={m.label} className="spotlight-card p-5">
                  <p className="font-display text-3xl font-black text-white tracking-tight">{m.value}</p>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="spotlight-card p-6"
          >
            <h3 className="font-display text-lg font-bold text-white mb-5">
              {isId ? "Komposisi Bahasa" : "Language Breakdown"}
            </h3>
            <div className="flex flex-col gap-4">
              {LANGUAGES.map((l) => (
                <div key={l.name}>
                  <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1.5">
                    <span>{l.name}</span>
                    <span>{l.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
                      className={`h-full rounded-full ${l.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="spotlight-card p-6 md:col-span-2"
          >
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 mb-4">
              <SquareTerminal size={17} className="text-emerald-400" /> {isId ? "Riwayat Komit • Stream Langsung" : "Commit History • Live Stream"}
            </h3>
            <div className="rounded-lg bg-black/60 border border-white/10 p-4 font-mono text-[11px] leading-relaxed text-emerald-300/90 min-h-[150px]">
              <p className="text-slate-500">$ git log --oneline --all --graph</p>
              {lines.map((line, i) => (
                <p key={`${line}-${i}`} className="truncate">
                  <span className="text-amber-300">●</span> {line}
                </p>
              ))}
              <span className="inline-block w-2 h-3.5 bg-emerald-400 animate-pulse align-middle" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid grid-cols-1 gap-4 md:gap-5 content-start"
          >
            <div className="spotlight-card p-6">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 mb-3">
                <Trophy size={17} className="text-amber-400" /> {isId ? "Intelijen Kaggle" : "Kaggle Intelligence"}
              </h3>
              <ul className="font-mono text-[11px] text-slate-400 space-y-2">
                <li className="flex justify-between">
                  <span>Notebooks</span>
                  <span className="text-white">{isId ? "3 publik" : "3 public"}</span>
                </li>
                <li className="flex justify-between">
                  <span>{isId ? "Kompetisi" : "Competitions"}</span>
                  <span className="text-white">{isId ? "2 aktif" : "2 active"}</span>
                </li>
                <li className="flex justify-between">
                  <span>{isId ? "Fokus" : "Focus"}</span>
                  <span className="text-white">{isId ? "ML Klinis" : "Clinical ML"}</span>
                </li>
              </ul>
            </div>
            <div className="spotlight-card p-6">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 mb-3">
                <Timer size={17} className="text-sky-400" /> {isId ? "Metrik WakaTime" : "WakaTime Metrics"}
              </h3>
              <ul className="font-mono text-[11px] text-slate-400 space-y-2">
                <li className="flex justify-between">
                  <span>{isId ? "Minggu ini" : "This week"}</span>
                  <span className="text-white">28j 42m</span>
                </li>
                <li className="flex justify-between">
                  <span>{isId ? "Bahasa utama" : "Top language"}</span>
                  <span className="text-white">Python 62%</span>
                </li>
                <li className="flex justify-between">
                  <span>{isId ? "Rata-rata harian" : "Daily avg"}</span>
                  <span className="text-white">4j 06m</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
