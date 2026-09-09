"use client";

import React from "react";
import { motion } from "framer-motion";
import { WordReveal } from "@/components/animations/ScrollReveal";
import ScrubTextReveal from "@/components/animations/ScrubTextReveal";
import Parallax from "@/components/animations/Parallax";

export default function CoreFocusSection() {
  return (
    <section id="core-focus" className="relative py-24 sm:py-32 z-10 overflow-hidden bg-[#07070a] border-y border-white/[0.06]">
      {/* Subtle Background Glow — scroll parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <Parallax distance={110} className="absolute top-1/2 left-1/4 -translate-y-1/2">
          <div className="w-[600px] h-[300px] bg-red-500/[0.03] blur-[120px] rounded-full" />
        </Parallax>
        <Parallax distance={-150} className="absolute top-1/2 right-1/4 -translate-y-1/2">
          <div className="w-[500px] h-[300px] bg-sky-500/[0.03] blur-[120px] rounded-full" />
        </Parallax>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 relative z-10">
        {/* Top Meta Bar: Badge & Discipline Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.08] mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-red-400 uppercase">
              CORE FOCUS
            </span>
          </div>

          <div className="text-[11px] font-mono tracking-[0.2em] text-slate-400 uppercase">
            #1: AI &amp; MACHINE LEARNING ENGINEER
          </div>
        </div>

        {/* Monumental Headline Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 sm:mb-24"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.08] tracking-tight text-white select-none">
            <span className="text-white font-extrabold">
              &ldquo;<WordReveal text="Applied AI." stagger={0.08} />{" "}
            </span>
            <span className="italic font-light text-slate-400">
              <WordReveal text="Scalable Data." delay={0.35} stagger={0.08} />{" "}
            </span>
            <br className="hidden sm:inline" />
            <span className="text-white font-extrabold lowercase">
              <WordReveal text="robust software engineering." delay={0.7} stagger={0.055} />
            </span>
            <span className="text-white font-extrabold">&rdquo;</span>
          </h2>
        </motion.div>

        {/* 3-Column Architecture Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pt-4">
          {/* Column 1: Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col justify-between"
          >
            <ScrubTextReveal
              text="I build intelligent systems and the data infrastructure that makes them reliable at scale."
              className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed"
            />
          </motion.div>

          {/* Column 2: Scope & Platform */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-3.5"
          >
            <div className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase">
              SCOPE &amp; PLATFORM
            </div>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Focusing on predictive reinforcement learning models, continuous action policies, and LangGraph RAG pipelines designed for production environments and measurable clinical performance.
            </p>
            <p className="text-xs sm:text-sm font-mono text-red-400/90 italic pt-1">
              Bridging labs and live systems.
            </p>
          </motion.div>

          {/* Column 3: Integration & Signature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-3.5">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase">
                INTEGRATION
              </div>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Beyond standalone models, I architect full-stack ecosystems: secure backends, robust data architectures, micro-latency inference endpoints, and scalable pipelines.
              </p>
            </div>

            {/* Handwritten Signature */}
            <div className="pt-2">
              <motion.span
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)", rotate: -8 }}
                whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)", rotate: -3 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                style={{ fontFamily: "var(--font-cursive)" }}
                className="text-4xl sm:text-5xl text-slate-200 tracking-wider inline-block select-none hover:text-white transition-colors"
              >
                Raihan Ghifari
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
