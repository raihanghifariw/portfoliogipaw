"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Interactive3DPixelBadgeProps {
  label: string;
  size?: "pixel-xs" | "pixel-sm" | "pixel-md";
  accent?: "cyan" | "emerald" | "amber" | "purple" | "white";
  statusDot?: boolean;
  dotPulse?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const BADGE_STYLES = {
  cyan: {
    border: "border-cyan-400 text-cyan-400 bg-black",
    shadow: "shadow-[3px_3px_0px_#00f0ff]",
    dot: "bg-cyan-400",
    hoverShadow: "hover:shadow-[5px_5px_0px_#00f0ff]",
  },
  emerald: {
    border: "border-emerald-400 text-emerald-400 bg-black",
    shadow: "shadow-[3px_3px_0px_#10b981]",
    dot: "bg-emerald-400",
    hoverShadow: "hover:shadow-[5px_5px_0px_#10b981]",
  },
  amber: {
    border: "border-amber-400 text-amber-400 bg-black",
    shadow: "shadow-[3px_3px_0px_#f59e0b]",
    dot: "bg-amber-400",
    hoverShadow: "hover:shadow-[5px_5px_0px_#f59e0b]",
  },
  purple: {
    border: "border-purple-400 text-purple-400 bg-black",
    shadow: "shadow-[3px_3px_0px_#a855f7]",
    dot: "bg-purple-400",
    hoverShadow: "hover:shadow-[5px_5px_0px_#a855f7]",
  },
  white: {
    border: "border-white/80 text-white bg-black",
    shadow: "shadow-[3px_3px_0px_#ffffff]",
    dot: "bg-white",
    hoverShadow: "hover:shadow-[5px_5px_0px_#ffffff]",
  },
};

export function Interactive3DPixelBadge({
  label,
  size = "pixel-xs",
  accent = "cyan",
  statusDot = false,
  dotPulse = true,
  className,
  onClick,
  icon,
}: Interactive3DPixelBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const currentStyle = BADGE_STYLES[accent];

  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.03,
      }}
      whileTap={{
        x: 2,
        y: 2,
        scale: 0.98,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "pixel-badge-3d inline-flex items-center gap-2 border-2 px-3 py-1 font-display uppercase tracking-wider select-none cursor-default transition-all duration-150",
        size,
        currentStyle.border,
        currentStyle.shadow,
        currentStyle.hoverShadow,
        onClick && "cursor-pointer active:shadow-none",
        className
      )}
    >
      {statusDot && (
        <span
          className={cn(
            "inline-block w-2 h-2 shrink-0",
            currentStyle.dot,
            dotPulse && "animate-pulse"
          )}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{label}</span>
    </motion.div>
  );
}
