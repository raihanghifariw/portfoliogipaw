"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, QrCode } from "lucide-react";

export default function LanyardCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none">
      {/* Lanyard Top Strap & Clip */}
      <div className="w-6 h-14 bg-gradient-to-b from-purple-700 to-purple-900 rounded-t-sm shadow-md flex items-center justify-center">
        <div className="w-1.5 h-full bg-black/20" />
      </div>
      <div className="w-10 h-3 bg-slate-400 rounded-sm shadow border-t border-white/40 mb-1" />
      <div className="w-5 h-5 rounded-full border-2 border-slate-400 bg-[#161624] -mt-2 mb-1 z-10" />

      {/* 3D Hanging Badge */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-72 sm:w-80 rounded-2xl bg-gradient-to-b from-[#181828] to-[#0c0c14] border border-white/20 p-6 shadow-2xl shadow-black/80 overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Holographic Iridescent Light Sheen */}
        <motion.div
          style={{ x: sheenX }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none -skew-x-12"
        />

        {/* Card Content with 3D Depth Layers */}
        <div style={{ transform: "translateZ(30px)" }} className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
                RGW
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 border border-white/10 px-1.5 py-0.5 rounded bg-white/5">
                VERIFIED ID
              </span>
            </div>
            <ShieldCheck size={18} className="text-emerald-400" />
          </div>

          {/* Photo & Identity */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-sky-400 p-[2px] shadow-lg shrink-0 overflow-hidden">
              <div className="w-full h-full bg-[#11111a] rounded-[10px] flex items-center justify-center font-display font-black text-xl text-white">
                RGW
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Raihan Ghifari Winata
              </h3>
              <p className="text-xs font-mono text-sky-400 mt-0.5">
                AI &amp; ML Engineer / Researcher
              </p>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                ID: YARSI-FTI-2022
              </p>
            </div>
          </div>

          {/* Core Focus Badges */}
          <div className="bg-black/30 border border-white/10 rounded-xl p-3 flex flex-col gap-1.5 font-mono text-[10.5px]">
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">SPECIALIZATION:</span>
              <span className="text-purple-400 font-bold">Deep RL &amp; MLOps</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">ACADEMIC CGPA:</span>
              <span className="text-emerald-400 font-bold">3.92 / 4.00</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">STATUS:</span>
              <span className="text-sky-400 font-bold">AVAILABLE GLOBALLY</span>
            </div>
          </div>

          {/* Bottom Bar with QR */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="font-mono text-[9px] text-slate-500">
              <p>BEKASI / JAKARTA, ID</p>
              <p>ghifariwinata@gmail.com</p>
            </div>
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-slate-300">
              <QrCode size={18} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
