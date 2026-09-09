"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  distance?: number;
  className?: string;
  innerClassName?: string;
  rotate?: number;
}

export default function Parallax({
  children,
  distance = 70,
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
