"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ProfileBanner() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const [src, setSrc] = useState("/assets/img/portrait.jpg");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.22, 1.14]);
  const clip = useTransform(
    scrollYProgress,
    [0, 0.18],
    ["inset(22% 6% 22% 6% round 24px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  useEffect(() => {
    const probe = new Image();
    probe.onload = () => setSrc("/assets/img/portrait.jpg");
    probe.onerror = () => setSrc("/assets/img/profile-fallback.svg");
    probe.src = "/assets/img/portrait.jpg";
  }, []);

  return (
    <section
      id="portrait"
      ref={ref}
      className="group relative w-full overflow-hidden border-y border-white/10 bg-[#0b0b11]"
      aria-label="Profile portrait"
    >
      <motion.div
        className="relative h-[46vh] min-h-[340px] max-h-[560px] md:h-[60vh]"
        style={reduce ? undefined : { clipPath: clip }}
      >
        <motion.img
          src={src}
          alt="Portrait of Raihan Ghifari Winata"
          className="h-full w-full object-cover object-top grayscale-[35%] transition-[filter] duration-700 group-hover:grayscale-0"
          style={reduce ? undefined : { y, scale }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-transparent to-[#09090d]/40" />
        <div className="absolute bottom-5 left-6 md:left-12 flex items-end justify-between w-[calc(100%-3rem)]">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#d4ff3f] uppercase mb-1">
              RAIHAN GHIFARI WINATA
            </p>
            <p className="font-display text-xl md:text-3xl font-bold text-white uppercase tracking-tight">
              {isId ? "Perekayasa Sistem Cerdas" : "Engineer of Intelligent Systems"}
            </p>
          </div>
          <p className="hidden md:block font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase">
            {isId ? "GMBR. 01 • SOSOK DI BALIK MODEL" : "FIG. 01 • THE HUMAN BEHIND THE MODELS"}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
