"use client";

import React from "react";
import { motion } from "framer-motion";
import TransitionLink from "@/components/animations/TransitionLink";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function EngineeringFutureRadarBanner() {
  const { language } = usePortfolio();
  const isId = language === "id";

  const radarNodes = [
    { name: "React", angle: 0, radius: 90, color: "#61dafb", speed: 20 },
    { name: "Python", angle: 72, radius: 135, color: "#3776ab", speed: 28 },
    { name: "TypeScript", angle: 144, radius: 175, color: "#3178c6", speed: 36 },
    { name: "Next.js", angle: 216, radius: 110, color: "#ffffff", speed: 24 },
    { name: "PyTorch", angle: 288, radius: 155, color: "#ee4c2c", speed: 32 },
  ];

  return (
    <section className="relative w-full py-20 z-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#11111a] via-[#141422] to-[#09090d] border border-white/15 backdrop-blur-2xl p-8 sm:p-14 overflow-hidden shadow-2xl">
          {/* Subtle background ambient light glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-sky-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, Subtitle & Buttons */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span className="tracking-[0.2em] uppercase font-bold">
                  {isId ? "ORIENTASI MASA DEPAN" : "FORWARD LOOKING"}
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
                {isId ? (
                  <>
                    Rekayasa <br className="hidden sm:block" />
                    Masa Depan
                  </>
                ) : (
                  <>
                    Engineering <br className="hidden sm:block" />
                    the Future
                  </>
                )}
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                {isId
                  ? "AI Engineer • Software Engineer | Menghubungkan Inovasi Teknis dengan Eksekusi Strategis pada agen otonom cerdas dan arsitektur produksi."
                  : "AI Engineer • Software Engineer | Bridging Technical Innovation with Strategic Execution across intelligent autonomous agents and production architectures."}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-2">
                <TransitionLink
                  href="/projects"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-display font-bold text-sm hover:bg-slate-200 transition-all shadow-lg hover:shadow-sky-500/20 group"
                >
                  <span>{isId ? "Lihat Proyek" : "View Projects"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </TransitionLink>

                <TransitionLink
                  href="/resume"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 border border-white/15 text-white font-display font-bold text-sm hover:bg-white/10 hover:border-white/30 transition-all group"
                >
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>{isId ? "Resume Saya" : "My Resume"}</span>
                </TransitionLink>
              </div>
            </div>

            {/* Right Column: Animated Concentric Radar */}
            <div className="lg:col-span-5 relative w-full aspect-square max-w-[380px] mx-auto flex items-center justify-center select-none">
              {/* Concentric Orbital Radar Rings */}
              <div className="absolute w-[90px] h-[90px] rounded-full border border-sky-500/20" />
              <div className="absolute w-[180px] h-[180px] rounded-full border border-sky-500/15" />
              <div className="absolute w-[270px] h-[270px] rounded-full border border-purple-500/15 border-dashed animate-[spin_120s_linear_infinite]" />
              <div className="absolute w-[350px] h-[350px] rounded-full border border-white/10" />

              {/* Radar Sweeping Beam */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(56,189,248,0.15)_360deg)] animate-[spin_8s_linear_infinite]" />
              </div>

              {/* Glowing Center Core */}
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-purple-500 shadow-[0_0_20px_#38bdf8] flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-white animate-ping" />
              </div>

              {/* Orbiting Tech Nodes */}
              {radarNodes.map((node) => {
                return (
                  <motion.div
                    key={node.name}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: node.speed,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div
                      className="absolute pointer-events-auto"
                      style={{
                        transform: `translate(${node.radius}px, 0px)`,
                      }}
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: node.speed,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="px-2.5 py-1 rounded-full bg-[#11111a]/90 border border-white/20 backdrop-blur-md shadow-xl flex items-center gap-1.5 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: node.color, boxShadow: `0 0 6px ${node.color}` }}
                        />
                        <span className="text-[10px] font-mono font-bold text-white whitespace-nowrap">
                          {node.name}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
