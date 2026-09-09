"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Deteksi perangkat low-power (padanan `usePerformance` repo
 * referensi): perangkat sentuh / layar sempit / RAM rendah tidak
 * mendapat blur scrub — hanya reveal opacity + y yang hemat
 * komposit. Deteksi berjalan setelah mount agar aman SSR.
 */
function useIsLowPowerDevice(): boolean {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMem =
      typeof nav.deviceMemory === "number" &&
      nav.deviceMemory > 0 &&
      nav.deviceMemory <= 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 768;
    setLowPower(coarse || narrow || lowMem);
  }, []);

  return lowPower;
}

interface ScrubWordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  baseOpacity: number;
  blurStrength: number;
}

/**
 * Satu kata yang ter-ungkap scrubbed via Framer Motion.
 */
function ScrubWord({ children, progress, range, baseOpacity, blurStrength }: ScrubWordProps) {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const filter = useTransform(
    progress,
    range,
    [`blur(${blurStrength}px)`, "blur(0px)"]
  );

  return (
    <motion.span
      aria-hidden="true"
      className="inline-block"
      style={
        blurStrength > 0 ? { opacity, y, filter } : { opacity, y }
      }
    >
      {children}
    </motion.span>
  );
}

export interface ScrubTextRevealProps {
  /** Teks yang akan dibagi per kata */
  text: string;
  /** Class styling untuk container */
  className?: string;
  /** Class tambahan untuk setiap kata */
  wordClassName?: string;
  /** Opacity awal kata sebelum ter-ungkap (default 0.35) */
  baseOpacity?: number;
  /** Kekuatan blur awal kata dalam px (default 6) */
  blurStrength?: number;
  /** Offset scroll Framer Motion */
  offset?: Parameters<typeof useScroll>[0] extends infer O
    ? O extends { offset?: infer T }
      ? T
      : never
    : never;
}

/**
 * ScrubTextReveal — reveal teks per-kata yang TERSAMBUNG ke scroll
 * (scrub), bukan trigger sekali. Teks mulai redup + blur lalu
 * mengikat semakin dalam Anda scroll via Framer Motion.
 */
export default function ScrubTextReveal({
  text,
  className = "",
  wordClassName = "",
  baseOpacity = 0.35,
  blurStrength = 6,
  offset = ["start 0.9", "start 0.5"],
}: ScrubTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const lowPower = useIsLowPowerDevice();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Pecah per kata namun pertahankan spasi agar line-break alami
  const words = text.split(/(\s+)/);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  // Gerbang perangkat low-power: tanpa blur (filter) — hanya
  // opacity + transform yang murah dikomposit.
  const effectiveBlur = lowPower ? 0 : blurStrength;

  const realWordIndexes = words
    .map((w, i) => (w.trim().length > 0 ? i : -1))
    .filter((i) => i >= 0);
  const totalWords = realWordIndexes.length;

  return (
    <span ref={ref} className={className} role="text" aria-label={text}>
      {words.map((chunk, i) => {
        if (chunk.trim().length === 0) {
          return <React.Fragment key={i}>{chunk}</React.Fragment>;
        }
        // Progres scrub di-distribusikan merata antar kata nyata
        const order = realWordIndexes.indexOf(i);
        const start = totalWords > 1 ? order / totalWords : 0;
        const end = totalWords > 1 ? (order + 1.6) / totalWords : 1;
        return (
          <ScrubWord
            key={i}
            progress={scrollYProgress}
            range={[Math.min(start, 1), Math.min(end, 1)]}
            baseOpacity={baseOpacity}
            blurStrength={effectiveBlur}
          >
            <span className={wordClassName}>{chunk}</span>
          </ScrubWord>
        );
      })}
    </span>
  );
}
