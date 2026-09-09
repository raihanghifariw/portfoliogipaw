"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import TransitionLink from "@/components/animations/TransitionLink";

interface CounterProps {
  from?: number;
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ from = 0, to, decimals = 0, suffix = "", duration = 2 }: CounterProps) {
  const [val, setVal] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * easeOut;
      setVal(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setVal(to);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className="font-display font-extrabold tracking-tight text-white">
      {decimals > 0 ? val.toFixed(decimals) : Math.round(val)}
      {suffix}
    </span>
  );
}

export default function ProfessionalStatisticsSection() {
  const stats = [
    {
      label: "CURRENT CGPA",
      value: 3.92,
      decimals: 2,
      suffix: "/4.0",
      subtext: "Faculty of IT, Universitas Yarsi",
      detail: "Graduating with highest distinction, specialized in Deep RL and AI systems",
    },
    {
      label: "PROJECTS COMPLETED",
      value: 18,
      decimals: 0,
      suffix: "+",
      subtext: "Production & Research",
      detail: "From clinical Decision Transformers to on-premises quantized VLMs",
    },
    {
      label: "PROFESSIONAL EXP",
      value: 2,
      decimals: 0,
      suffix: "+ Years",
      subtext: "Lab & Engineering Roles",
      detail: "Research assistant, laboratory mentor, and enterprise AI developer",
    },
    {
      label: "TECH & TOOLS",
      value: 34,
      decimals: 0,
      suffix: "+",
      subtext: "Frameworks & Cloud",
      detail: "PyTorch, CUDA, FastAPI, Docker, AWS, Next.js, LangGraph, OpenCV",
    },
  ];

  return (
    <section id="statistics" className="relative py-24 sm:py-32 z-10 overflow-hidden bg-[#09090d]">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-40" />

      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Pill Badge */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
              PROFESSIONAL STATISTICS
            </span>
          </div>
        </div>

        {/* Big Statement Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-5xl mx-auto mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white leading-[1.08] tracking-tight uppercase">
            Formulating Intelligence. Accelerating Compute.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Architecting Autonomous Systems at Scale.
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-mono text-slate-400 mt-4 leading-relaxed max-w-3xl mx-auto">
            Bridging mathematical rigor and low-latency production runtimes, validated through verified operational benchmarks.
          </p>
        </motion.div>

        {/* 4 Stat Cards Row with Zoom / Scale In Spring Pop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="h-full"
            >
              <div className="group relative h-full p-6 sm:p-8 rounded-2xl bg-[#111116] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.15em] text-slate-400 block mb-3 uppercase">
                    {stat.label}
                  </span>

                  <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mb-2">
                    <AnimatedCounter
                      to={stat.value}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                      duration={2.2}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] mt-4">
                  <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                    {stat.subtext}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Row: Scroll to Explore + About Me Pill + My Short Story */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 uppercase">
            <ArrowDown size={14} className="animate-bounce text-slate-300" />
            <span>Scroll to Explore</span>
          </div>

          <div className="flex items-center gap-6">
            <TransitionLink
              href="/about"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-display font-extrabold text-xs tracking-wider uppercase hover:bg-slate-200 hover:scale-105 transition-all shadow-xl"
            >
              <span>About Me</span>
              <ArrowUpRight size={16} className="text-black" />
            </TransitionLink>

            <span className="text-xs font-mono tracking-widest text-slate-500 uppercase hidden sm:inline-block">
              My Short Story
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
