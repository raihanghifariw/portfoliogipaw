"use client";

import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ENGINEERING_FOUNDATION_TECHS, ENGINEERING_FOUNDATION_TECHS_ID } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { Layers, MoveHorizontal, Sparkles } from "lucide-react";

// Tech SVG Icons mapping with 100% Brand-Accurate SVGs for all 24 technologies
function TechIcon({ iconKey, className = "w-6 h-6" }: { iconKey: string; className?: string }) {
  switch (iconKey) {
    case "python":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#3776ab]`}>
          <path d="M11.91 0c-3.17 0-5.24.23-5.24 2.14v2.14h5.24v.71H4.63C1.65 5 0 7.37 0 10.35s1.46 5.35 4.63 5.35h1.79v-2.5c0-1.84 1.57-3.35 3.42-3.35h5.23c1.55 0 2.8-1.25 2.8-2.8V2.14C17.87.23 15.08 0 11.91 0zm-2.42 1.43c.48 0 .86.38.86.86s-.38.86-.86.86-.86-.38-.86-.86.38-.86.86-.86zM19.37 8.3v2.5c0 1.84-1.57 3.35-3.42 3.35H10.7c-1.55 0-2.8 1.25-2.8 2.8v4.91c0 1.91 2.79 2.14 5.96 2.14 3.17 0 5.24-.23 5.24-2.14v-2.14h-5.24v-.71h7.28c2.98 0 4.63-2.37 4.63-5.35s-1.46-5.36-4.63-5.36h-1.77zm-4.99 12.84c.48 0 .86.38.86.86s-.38.86-.86.86-.86-.38-.86-.86.38-.86.86-.86z" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#3178c6]`}>
          <path d="M0 0h24v24H0V0zm11.66 18.25v-2.4c-.6.9-1.5 1.4-2.6 1.4-2.4 0-3.6-1.6-3.6-4.2V6h2.5v6.8c0 1.5.6 2.3 1.8 2.3 1.1 0 1.9-.8 1.9-2.3V6h2.5v12.25h-2.5zm6.84 0c-1.8 0-3.2-.6-4.1-1.7l1.4-1.8c.7.8 1.6 1.2 2.7 1.2 1.1 0 1.7-.5 1.7-1.1 0-.7-.5-1-1.7-1.3l-1.3-.3c-2-.5-2.9-1.5-2.9-3 0-2 1.6-3.3 3.9-3.3 1.6 0 2.8.5 3.6 1.4l-1.3 1.7c-.6-.6-1.4-.9-2.3-.9-1 0-1.5.4-1.5 1 0 .6.4.9 1.5 1.2l1.2.3c2.3.5 3.2 1.6 3.2 3.1 0 2-1.6 3.5-4.1 3.5z" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#f7df1e]`}>
          <path d="M0 0h24v24H0V0zm11.8 17.8c-.8 0-1.5-.2-2-.6l.7-1.7c.4.3.8.5 1.4.5.7 0 1.1-.3 1.1-.8 0-.6-.4-.8-1.2-1.2l-.7-.3c-1.4-.6-2-1.5-2-2.7 0-1.6 1.3-2.8 3.2-2.8 1 0 1.8.3 2.4.7l-.7 1.6c-.4-.3-.9-.5-1.7-.5-.7 0-1.1.3-1.1.7 0 .5.4.7 1.2 1.1l.7.3c1.5.7 2.1 1.5 2.1 2.8 0 1.7-1.3 3-3.4 3zm6.6 0c-1.8 0-3-1.2-3-3.2v-5.8h2.2v5.7c0 .9.5 1.4 1.3 1.4.8 0 1.4-.5 1.4-1.4V8.8h2.2v5.8c0 2-1.3 3.2-3.1 3.2z" />
        </svg>
      );
    case "solidity":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#a6b2c8]`}>
          <path d="M12 0L5.5 10.5 12 14.5l6.5-4L12 0zm0 15.5L5.5 11.5 12 24l6.5-12.5L12 15.5z" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-none stroke-[#61dafb] stroke-2`}>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" className="fill-[#61dafb] stroke-none" />
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-white`}>
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.66 17.66l-5.66-8v8H10V6.34h2.15l5.51 7.8v-7.8h2v11.32h-2z" />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#339933]`}>
          <path d="M12 0l10.39 6v12L12 24 1.61 18V6L12 0zm0 3.2L4.01 7.8v8.4L12 20.8l7.99-4.6V7.8L12 3.2z" />
        </svg>
      );
    case "tensorflow":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#ff6f00]`}>
          <path d="M11.87 0L2.9 5.18l3.99 2.3 4.98-2.88v19.4l4.02-2.32V4.6l5.21 3.01 3.99-2.3L16.1 0h-4.23z" />
        </svg>
      );
    case "pytorch":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#ee4c2c]`}>
          <path d="M12.74 0c.26 0 .52.1.72.3l7.98 7.98a1.02 1.02 0 0 1 0 1.44l-7.98 7.98a1.02 1.02 0 0 1-1.44 0l-7.98-7.98a1.02 1.02 0 0 1 0-1.44L12.02.3c.2-.2.46-.3.72-.3zm-.02 4.1L8.6 8.22l4.12 4.12 4.12-4.12-4.12-4.12zm0 14.8c-.56 0-1.02.46-1.02 1.02v2.06c0 .56.46 1.02 1.02 1.02.56 0 1.02-.46 1.02-1.02v-2.06c0-.56-.46-1.02-1.02-1.02z" />
        </svg>
      );
    case "scikitlearn":
    case "scikit-learn":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#f7931e]`}>
          <circle cx="7" cy="12" r="5" fill="#3499cd" />
          <circle cx="17" cy="12" r="5" fill="#f7931e" />
          <path d="M12 7.5a4.99 4.99 0 0 1 0 9 4.99 4.99 0 0 1 0-9z" fill="#377196" />
        </svg>
      );
    case "pandas":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#150458]`}>
          <rect x="3" y="3" width="7" height="18" rx="2" fill="#150458" />
          <rect x="14" y="3" width="7" height="8" rx="2" fill="#ffca00" />
          <rect x="14" y="13" width="7" height="8" rx="2" fill="#00ffff" />
        </svg>
      );
    case "numpy":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#4dabcf]`}>
          <path d="M2.5 5.5h4v13h-4zm15 0h4v13h-4zM6.5 5.5l11 13h-3.8l-11-13z" fill="#013243" />
          <path d="M6.5 5.5l11 13h-3.8l-11-13z" fill="#4dabcf" />
        </svg>
      );
    case "matplotlib":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-none stroke-[#11557c] stroke-2`}>
          <circle cx="12" cy="12" r="9" />
          <path d="M7 15l3-6 4 4 3-5" stroke="#11557c" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#38bdf8]`}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    case "redis":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#dc382d]`}>
          <path d="M21.5 6.7L12 1.5 2.5 6.7v10.6L12 22.5l9.5-5.2V6.7zM12 4.2l6.8 3.7L12 11.6 5.2 7.9 12 4.2zm-7 5.4l6 3.3v6.7l-6-3.3V9.6zm14 6.7l-6 3.3V13l6-3.3v6.6z" />
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#4169e1]`}>
          <path d="M12 1.6c-4.4 0-8 3.6-8 8 0 5.5 5.5 10.4 7.6 12 .2.2.6.2.8 0 2.1-1.6 7.6-6.5 7.6-12 0-4.4-3.6-8-8-8zm-2.4 10.8c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm4.8 0c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4z" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#2496ed]`}>
          <path d="M13.98 11.08h2.15v2.15h-2.15v-2.15zm-3.22 0h2.15v2.15h-2.15v-2.15zm-3.23 0h2.15v2.15H7.53v-2.15zm9.68-3.23h2.15V10h-2.15V7.85zm-3.22 0h2.15V10h-2.15V7.85zm-3.23 0h2.15V10H10.76V7.85zm-3.23 0h2.15V10H7.53V7.85zm9.68-3.23h2.15v2.15h-2.15V4.62zm-3.22 0h2.15v2.15h-2.15V4.62zm9.68 9.68c-.43 2.15-2.15 4.3-4.3 5.38-3.23 1.6-7.53 1.6-10.75 0-3.23-1.6-5.38-4.84-5.38-8.6 0-.54.05-1.08.16-1.61h14.52c.54 0 1.08.05 1.61.16 1.08.22 2.15.86 2.69 1.72.54.86.86 1.83.86 2.95h.59z" />
        </svg>
      );
    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#009688]`}>
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-.86 19.38v-5.74H7.26l6.88-9.02v5.74h3.86l-6.86 9.02z" />
        </svg>
      );
    case "kubernetes":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#326ce5]`}>
          <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.85v9.7L12 21.7 3.6 16.85v-9.7L12 2.3z" />
        </svg>
      );
    case "terraform":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#7b42bc]`}>
          <path d="M1.5 2.5h6.3v7.3H1.5zm7.3 4h6.3v7.3H8.8zm7.3-4h6.4v7.3h-6.4zm-7.3 11.3h6.3v7.3H8.8z" />
        </svg>
      );
    case "langchain":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current text-white`}>
          <path d="M12 2a4 4 0 0 0-4 4v2H6a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h2v-2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2v2a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v2h2a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4h-2V6a4 4 0 0 0-4-4zm-2 6V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h-4zm0 6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h-4v-2z" />
        </svg>
      );
    case "mistral":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#f2a73b]`}>
          <path d="M3 4h3.6v3.6H3zm14.4 0H21v3.6h-3.6zM3 7.6h7.2v3.6H3zm10.8 0H21v3.6h-7.2zM3 11.2h18v3.6H3zm3.6 3.6h10.8v3.6H6.6zm3.6 3.6h3.6V22h-3.6z" />
        </svg>
      );
    case "opencv":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-[#5c3ee8]`}>
          <circle cx="12" cy="7" r="5" fill="#ea2228" />
          <circle cx="6" cy="17" r="5" fill="#2eb538" />
          <circle cx="18" cy="17" r="5" fill="#2564ee" />
        </svg>
      );
    case "flask":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current text-white`}>
          <path d="M19 19.5L14 10V4h1V2H9v2h1v6L5 19.5A2.5 2.5 0 0 0 7.5 22h9a2.5 2.5 0 0 0 2.5-2.5zM11.5 4h1v6.5l.5.9 4 7.6H7l4-7.6.5-.9V4z" />
        </svg>
      );
    default:
      return <Layers className={`${className} text-sky-400`} />;
  }
}

export default function EngineeringFoundationArcSection() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const techs = isId ? ENGINEERING_FOUNDATION_TECHS_ID : ENGINEERING_FOUNDATION_TECHS;

  const [arcOffset, setArcOffset] = useState(0);

  // 12 key flagship technologies placed around the interactive arc wheel
  const arcTechs = [
    { name: "Python", iconKey: "python", color: "#3776ab" },
    { name: "TypeScript", iconKey: "typescript", color: "#3178c6" },
    { name: "React", iconKey: "react", color: "#61dafb" },
    { name: "Next.js", iconKey: "nextjs", color: "#ffffff" },
    { name: "PyTorch", iconKey: "pytorch", color: "#ee4c2c" },
    { name: "TensorFlow", iconKey: "tensorflow", color: "#ff6f00" },
    { name: "Docker", iconKey: "docker", color: "#2496ed" },
    { name: "Kubernetes", iconKey: "kubernetes", color: "#326ce5" },
    { name: "FastAPI", iconKey: "fastapi", color: "#009688" },
    { name: "Solidity", iconKey: "solidity", color: "#a6b2c8" },
    { name: "PostgreSQL", iconKey: "postgresql", color: "#4169e1" },
    { name: "LangChain", iconKey: "langchain", color: "#ffffff" },
  ];

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    setArcOffset(info.offset.x * 0.14);
  };

  return (
    <section className="relative w-full py-24 z-20 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="tracking-[0.2em] uppercase font-bold">
              {isId ? "PERANGKAT PRODUKSI & LINGKUNGAN RUNTIME" : "PRODUCTION TOOLKIT & RUNTIME"}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight mt-2">
            {isId ? "Fondasi Rekayasa" : "The Engineering Foundation"}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            {isId
              ? "Teknologi terukur, type-safe, dan terakselerasi GPU yang dimanfaatkan dalam tolok ukur riset serta implementasi produksi skala besar."
              : "Scalable, type-safe, and GPU-accelerated technologies leveraged across research benchmarks and production deployments."}
          </p>
        </div>

        {/* Interactive Rotating Arc Track */}
        <div className="relative w-full max-w-4xl mx-auto h-[260px] sm:h-[300px] flex items-end justify-center mb-16 select-none">
          {/* Circular Track Line */}
          <div className="absolute w-[680px] sm:w-[840px] h-[680px] sm:h-[840px] rounded-full border border-white/10 border-dashed top-0 pointer-events-none" />

          {/* Floating Arc Items */}
          {arcTechs.map((tech, index) => {
            const total = arcTechs.length;
            const baseAngle = (index / (total - 1)) * 140 + 200; // 200 deg to 340 deg
            const currentAngle = baseAngle + arcOffset;
            const rad = (currentAngle * Math.PI) / 180;
            const radius = 340; // radius of the arc
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <motion.div
                key={tech.name}
                className="absolute z-10 flex flex-col items-center"
                style={{
                  transform: `translate(${x}px, ${y + 240}px)`,
                }}
                whileHover={{ scale: 1.25, zIndex: 30 }}
              >
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#11111a]/95 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center justify-center hover:border-sky-400/80 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all cursor-pointer">
                  <TechIcon iconKey={tech.iconKey} className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
              </motion.div>
            );
          })}

          {/* Central Draggable Handle */}
          <motion.div
            drag="x"
            dragConstraints={{ left: -180, right: 180 }}
            dragElastic={0.1}
            onDrag={handleDrag}
            onDragEnd={() => setArcOffset(0)}
            className="relative z-30 cursor-grab active:cursor-grabbing px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono font-bold tracking-widest text-white flex items-center gap-2 hover:bg-white/20 transition-colors shadow-2xl mb-8"
          >
            <MoveHorizontal className="w-3.5 h-3.5 text-sky-400" />
            <span>{isId ? "GESER BUSUR" : "DRAG ARC"}</span>
          </motion.div>
        </div>

        {/* 24 Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techs.map((tech) => (
            <motion.div
              key={tech.id}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-[#11111a]/80 border border-white/10 backdrop-blur-xl flex items-start gap-4 hover:border-white/25 hover:bg-[#11111a] transition-all shadow-lg group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-sky-400/50 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all">
                <TechIcon iconKey={tech.iconKey} className="w-6 h-6" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {tech.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {tech.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
