"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CurvedCurtain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const contentVariants = reduce
    ? undefined
    : {
        initial: { opacity: 0, scale: 1.02, y: 16 },
        enter: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] as const },
        },
      };

  return (
    <div className="relative min-h-screen">
      {/* Page Content: cinematic zoom-out + blur-in entrance */}
      <motion.div
        key={pathname}
        initial={contentVariants ? contentVariants.initial : undefined}
        animate={contentVariants ? contentVariants.enter : undefined}
        className="w-full"
        style={reduce ? undefined : { transformOrigin: "50% 0%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
