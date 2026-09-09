"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface MarqueeRibbonProps {
  items: string[];
  reverse?: boolean;
  duration?: number;
  rotate?: number;
  compact?: boolean;
  className?: string;
}

export default function MarqueeRibbon({
  items,
  reverse = false,
  duration = 28,
  rotate = 0,
  compact = false,
  className = "",
}: MarqueeRibbonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    damping: 60,
    stiffness: 280,
    restDelta: 1,
  });
  const skewX = useTransform(smoothVelocity, [-2600, 2600], [-5, 5]);
  const scaleX = useTransform(smoothVelocity, [-2600, 0, 2600], [1.045, 1, 1.045]);

  const row = (
    <>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span
            className={`font-display font-black uppercase tracking-tighter whitespace-nowrap select-none ${
              compact ? "text-4xl md:text-6xl" : "text-6xl md:text-8xl"
            } text-white`}
          >
            {item}
          </span>
          <span
            className={`${
              compact ? "text-2xl md:text-4xl" : "text-4xl md:text-6xl"
            } text-[#d4ff3f] drop-shadow-[0_0_18px_rgba(212,255,63,0.55)]`}
            aria-hidden="true"
          >
            ✦
          </span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <motion.div
      ref={wrapRef}
      className={`relative w-full overflow-hidden border-y border-white/10 bg-[#0b0b11] py-5 md:py-7 ${className}`}
      style={{
        ...(rotate !== 0 ? { rotate } : {}),
        ...(reduce ? {} : { skewX, scaleX }),
      }}
      aria-hidden="true"
    >
      <div
        className={`flex w-max items-center gap-8 md:gap-12 ${
          reverse ? "animate-[marquee-reverse_30s_linear_infinite]" : "animate-[marquee_28s_linear_infinite]"
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex items-center gap-8 md:gap-12">{row}</div>
        <div className="flex items-center gap-8 md:gap-12">{row}</div>
      </div>
    </motion.div>
  );
}
