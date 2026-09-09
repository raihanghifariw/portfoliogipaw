"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignatureSplash() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[9999] bg-[#050508] flex items-center justify-center pointer-events-auto"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-4 max-w-[400px] w-[90%]">
            <div className="w-[260px] h-[85px] text-white">
              <svg
                viewBox="0 0 638 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                className="w-full h-full"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  d="M8.6 166.5C36.2 151.2 61.3 131.5 89.8 98C109.2 75.1 119.6 49 120.1 31C120.3 17.6 113.8 7.4 101.7 7.4C88.3 7.4 79.9 17.6 74.7 40.9C69 66.5 64.7 96 54.1 190.3"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
                  d="M55.1 181.1C60.6 133.1 81.4 98 107.9 98C123.8 98 133.9 110.7 131 128.8C129.4 139.4 127.5 150.4 125.4 163C122.8 178.9 130.1 191.3 152.1 191.3C184.1 191.3 219.1 173.5 237 145.9C243.1 136.5 245.6 128 245.9 119.8C246.1 104.9 237.7 93.8 222.8 93.8C203.9 93.8 189.6 115.1 189.6 142.4C189.6 171.7 205.4 192.3 239.2 192.3C285 192.3 335.8 137.2 359.1 75.8C365.7 58.5 368.2 42.4 368.2 31.1C368.2 17.8 364 7.5 352.1 7.5C340.4 7.5 332.7 16.6 325.8 30.9C317.6 47.4 311.6 71.4 309.2 98.4C303 166.3 316.8 191.3 349.9 191.3C390 191.3 434.5 135.5 457.2 75.6C463.8 58.5 466.2 42.4 466.2 31.1C466.2 17.8 462 7.5 450.1 7.5C438.4 7.5 430.7 16.6 423.8 30.9C415.7 47.4 409.6 71.4 407.2 98.4C401 166.3 414.9 191.3 444.4 191.3C473.8 191.3 489.8 165.6 499.4 138.4C508.9 111.4 520.6 94.8 544.9 94.8C565 94.8 580.9 109.7 580.9 137.7C580.9 168.7 560.7 192 535.3 192.3C512.9 192.5 498.2 174.4 499.7 147.1C501.5 116.9 519.8 94.8 543.9 94.8C557.8 94.8 569.5 101 578.6 107.7C603.5 125.8 622.7 114.6 630 96.7"
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-black font-display bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent"
            >
              RGW
            </motion.div>

            <div className="w-44 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                className="h-full bg-gradient-to-r from-purple-500 to-sky-400"
              />
            </div>

            <div className="text-[11px] font-mono tracking-widest text-slate-400">
              INITIALIZING_NEURAL_SPACE...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
