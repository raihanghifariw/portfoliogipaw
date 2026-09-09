"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  TargetAndTransition,
} from "framer-motion";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// ==========================================
// 1. FADE IN / OUT
// ==========================================
interface FadeProps extends BaseProps {
  blur?: boolean;
}

function Fade({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
  blur = true,
}: FadeProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: blur ? "blur(10px)" : "none" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 2. SLIDE (MELUNCUR: UP, DOWN, LEFT, RIGHT)
// ==========================================
interface SlideProps extends BaseProps {
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

function Slide({
  children,
  className = "",
  direction = "up",
  distance = 50,
  delay = 0,
  duration = 0.85,
  once = true,
}: SlideProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const getInitial = (): TargetAndTransition => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.35, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 3. PARALLAX (KEDALAMAN 3D MULTI-KECEPATAN)
// ==========================================
interface ParallaxProps {
  children: React.ReactNode;
  distance?: number;
  className?: string;
  innerClassName?: string;
  rotate?: number;
}

function Parallax({
  children,
  distance = 80,
  className = "",
  innerClassName = "",
  rotate = 0,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [rotate, -rotate]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={reduce ? undefined : { y, rotate: rotateZ }}
        className={innerClassName}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ==========================================
// 4. ZOOM / SCALE (FOKUS VISUAL SPRING POP)
// ==========================================
interface ZoomProps extends BaseProps {
  scaleFrom?: number;
  scaleTo?: number;
}

function Zoom({
  children,
  className = "",
  scaleFrom = 0.85,
  scaleTo = 1,
  delay = 0,
  duration = 0.75,
  once = true,
}: ZoomProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: scaleFrom }}
      whileInView={{ opacity: 1, scale: scaleTo }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1], // subtle spring pop
      }}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 5. WIPE / REVEAL (THEATRICAL CURTAIN SWEEP)
// ==========================================
interface WipeProps extends BaseProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  curtainColor?: string;
}

function Wipe({
  children,
  className = "",
  direction = "right",
  delay = 0,
  duration = 0.9,
  once = true,
  curtainColor = "bg-[#d4ff3f]/20",
}: WipeProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const getClipPath = () => {
    switch (direction) {
      case "right":
        return {
          hidden: "inset(0% 100% 0% 0%)",
          shown: "inset(0% 0% 0% 0%)",
        };
      case "left":
        return {
          hidden: "inset(0% 0% 0% 100%)",
          shown: "inset(0% 0% 0% 0%)",
        };
      case "up":
        return {
          hidden: "inset(100% 0% 0% 0%)",
          shown: "inset(0% 0% 0% 0%)",
        };
      case "down":
        return {
          hidden: "inset(0% 0% 100% 0%)",
          shown: "inset(0% 0% 0% 0%)",
        };
      case "diagonal":
        return {
          hidden: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          shown: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        };
    }
  };

  const clip = getClipPath();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Content reveals with smooth clip path */}
      <motion.div
        initial={{ clipPath: clip.hidden, opacity: 0.3 }}
        whileInView={{ clipPath: clip.shown, opacity: 1 }}
        viewport={{ once, margin: "-60px" }}
        transition={{
          duration,
          delay,
          ease: [0.77, 0, 0.175, 1], // Cinematic cubic-bezier sweep
        }}
      >
        {children}
      </motion.div>

      {/* Optional theatrical accent flash curtain that wipes across */}
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once, margin: "-60px" }}
        transition={{
          duration: duration * 0.9,
          delay,
          ease: [0.77, 0, 0.175, 1],
        }}
        className={`pointer-events-none absolute inset-0 ${curtainColor} mix-blend-overlay z-20`}
      />
    </div>
  );
}

// ==========================================
// SCROLLFX EXPORT SUITE
// ==========================================
export const ScrollFX = {
  Fade,
  Slide,
  Parallax,
  Zoom,
  Wipe,
};

export default ScrollFX;
