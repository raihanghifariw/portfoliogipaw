"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 34,
    stiffness: 320,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      ref={ref}
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[99991] origin-left bg-gradient-to-r from-[#8b5cf6] via-sky-400 to-[#d4ff3f] shadow-[0_0_12px_rgba(139,92,246,0.6)] pointer-events-none"
      aria-hidden="true"
    />
  );
}
