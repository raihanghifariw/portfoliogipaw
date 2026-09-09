"use client";

import React from "react";
import { motion } from "framer-motion";

interface TextRingProps {
  text?: string;
  size?: number;
  className?: string;
  icon?: React.ReactNode;
}

export default function TextRing({
  text = "• ARTIFICIAL INTELLIGENCE • DEEP LEARNING • RESEARCH",
  size = 130,
  className = "",
  icon,
}: TextRingProps) {
  const radius = size * 0.38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      >
        <defs>
          <path
            id="circlePath"
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text className="font-mono text-[9px] font-bold tracking-[0.25em] fill-slate-300 uppercase">
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </motion.svg>

      {/* Center Icon / Glyph */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {icon || (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-sky-400 p-[1px] shadow-[0_0_12px_rgba(139,92,246,0.5)]">
            <div className="w-full h-full bg-[#0d0d14] rounded-full flex items-center justify-center text-[10px] font-bold text-sky-400 font-mono">
              AI
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
