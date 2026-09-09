"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface RotatingStampProps {
  text?: string;
  size?: number;
  className?: string;
}

export default function RotatingStamp({
  text = "SCROLL TO EXPLORE • AI ENGINEER • ",
  size = 128,
  className = "",
}: RotatingStampProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 2400], [0, 360]);
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const chars = text.repeat(Math.ceil(28 / text.length));

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { rotate, y, opacity }}
      className={`relative select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 128 128" className="drop-shadow-[0_0_16px_rgba(139,92,246,0.35)]">
        <defs>
          <path
            id="stamp-circle"
            d="M 64,64 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
          />
        </defs>
        <text className="fill-slate-400 font-mono uppercase" style={{ fontSize: "10.5px", letterSpacing: "2.6px" }}>
          <textPath href="#stamp-circle">{chars}</textPath>
        </text>
        <circle cx="64" cy="64" r="30" className="fill-none stroke-purple-500/30" strokeWidth="1" strokeDasharray="3 5" />
      </svg>
      <ArrowDown
        size={20}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#d4ff3f] animate-bounce"
      />
    </motion.div>
  );
}
