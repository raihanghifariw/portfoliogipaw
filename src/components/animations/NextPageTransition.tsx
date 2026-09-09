"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import TextScramble from "@/components/animations/TextScramble";
import TransitionLink from "@/components/animations/TransitionLink";

interface NextPageTransitionProps {
  nextChapterNum: string;
  nextChapterTitle: string;
  nextChapterSubtitle: string;
  nextHref: string;
}

export default function NextPageTransition({
  nextChapterNum = "02",
  nextChapterTitle = "PORTFOLIO & PROJECTS",
  nextChapterSubtitle = "Explore 6 Flagship Deep RL & VLM Systems",
  nextHref = "/projects",
}: NextPageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.85, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 px-5 sm:px-8 border-t border-white/10 overflow-hidden bg-gradient-to-b from-transparent via-[#100d1c]/40 to-[#141026]"
    >
      {/* Background Animated Text Marquee */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
        <span className="font-display font-black text-[clamp(6rem,18vw,20rem)] whitespace-nowrap uppercase tracking-tighter">
          NEXT CHAPTER • {nextChapterTitle} • NEXT CHAPTER •
        </span>
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="max-w-[1240px] mx-auto relative z-10 flex flex-col items-center text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold tracking-wider mb-4">
          <Sparkles size={13} className="text-purple-400" />
          <span>UP NEXT : CHAPTER {nextChapterNum}</span>
        </div>

        <motion.div style={{ y: textY }} className="flex flex-col items-center gap-3 mb-8">
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-slate-400 uppercase">
            CONTINUE EXPLORING
          </span>

          <h2 className="text-3xl sm:text-6xl font-display font-black text-white uppercase tracking-tight max-w-3xl leading-[1.05]">
            <TextScramble text={nextChapterTitle} triggerOnHover={true} />
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            {nextChapterSubtitle}
          </p>
        </motion.div>

        {/* Huge Interactive Magnetic CTA Pill */}
        <TransitionLink
          href={nextHref}
          className="group relative inline-flex items-center gap-4 px-8 sm:px-12 py-5 sm:py-6 rounded-full bg-white text-slate-950 font-display font-black text-sm sm:text-base uppercase tracking-wider shadow-2xl shadow-purple-500/30 hover:bg-sky-400 hover:shadow-sky-400/40 hover:scale-105 transition-all duration-300"
        >
          <span>ENTER CHAPTER {nextChapterNum}</span>
          <div className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-300">
            <ArrowRight size={18} />
          </div>
        </TransitionLink>
      </motion.div>
    </section>
  );
}
