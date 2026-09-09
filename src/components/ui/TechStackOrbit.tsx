"use client";

import React from "react";
import { motion } from "framer-motion";
import HolographicNeuralCore from "@/components/3d/HolographicNeuralCore";

interface OrbitItem {
  name: string;
  angle: number;
  radius: number;
  color: string;
  tag: string;
}

export default function TechStackOrbit() {
  const orbitItems: OrbitItem[] = [
    { name: "PyTorch", angle: 0, radius: 175, color: "#ee4c2c", tag: "DL Core" },
    { name: "SAC RL", angle: 60, radius: 175, color: "#38bdf8", tag: "Continuous Policy" },
    { name: "LangGraph", angle: 120, radius: 175, color: "#8b5cf6", tag: "Agentic RAG" },
    { name: "FastAPI", angle: 180, radius: 175, color: "#009688", tag: "Sub-15ms Serving" },
    { name: "Docker", angle: 240, radius: 175, color: "#2496ed", tag: "Containerized" },
    { name: "AWS Cloud", angle: 300, radius: 175, color: "#f59e0b", tag: "GPU Clusters" },
  ];

  return (
    <div className="relative w-full max-w-[440px] aspect-square mx-auto flex items-center justify-center">
      {/* Outer Orbit Guide Track */}
      <div className="absolute inset-4 rounded-full border border-purple-500/20 border-dashed animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-16 rounded-full border border-sky-500/15" />

      {/* Center 3D Holographic AI Core */}
      <div className="relative z-10">
        <HolographicNeuralCore size={280} />
      </div>

      {/* Orbiting Tech Floating Chips */}
      {orbitItems.map((item, index) => {
        const rad = (item.angle * Math.PI) / 180;
        const x = Math.cos(rad) * item.radius;
        const y = Math.sin(rad) * item.radius;

        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [x - 4, x + 4, x - 4],
              y: [y - 4, y + 4, y - 4],
            }}
            transition={{
              opacity: { delay: index * 0.1, duration: 0.5 },
              scale: { delay: index * 0.1, duration: 0.5 },
              x: { repeat: Infinity, duration: 4 + index, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 3.5 + index, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.15, zIndex: 30 }}
            className="absolute z-20 cursor-pointer"
            style={{
              left: `calc(50% + ${x}px - 45px)`,
              top: `calc(50% + ${y}px - 18px)`,
            }}
          >
            <div className="px-2.5 py-1 rounded-full bg-[#11111a]/90 border border-white/15 backdrop-blur-md shadow-xl flex items-center gap-1.5 hover:border-sky-400/60 transition-colors group">
              <span
                className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]"
                style={{ color: item.color, backgroundColor: item.color }}
              />
              <span className="text-[11px] font-mono font-bold text-slate-200 group-hover:text-white">
                {item.name}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
