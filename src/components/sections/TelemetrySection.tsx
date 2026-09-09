"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import TiltCard from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import TextScramble from "@/components/animations/TextScramble";

export default function TelemetrySection() {
  const { t, language } = usePortfolio();
  const isId = language === "id";

  return (
    <section id="telemetry" className="relative py-24 z-10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="text-xs font-heading font-bold tracking-[0.2em] text-cyan-400 mb-3 uppercase flex items-center gap-2">
            <Activity size={14} className="animate-pulse" />
            <TextScramble text={isId ? "TELEMETRI REKAYASA" : "ENGINEERING TELEMETRY"} speed={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-display pixel-2xl text-white uppercase leading-snug max-w-4xl mb-4">
            {t("telemetry.title")}
          </h2>
          <p className="font-body text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {t("telemetry.lead")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Node Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard
              data-detail={
                isId
                  ? "Telemetri status live simulasi dari kluster node edge AWS ap-southeast-1"
                  : "Simulated live status telemetry from AWS ap-southeast-1 edge node cluster"
              }
              data-title={isId ? "METRIK_INFRASTRUKTUR" : "INFRASTRUCTURE_METRICS"}
              className="p-8 flex flex-col gap-5 h-full cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                <span>{isId ? "KLUSTER_NODE : ONLINE" : "NODE_CLUSTER : ONLINE"}</span>
              </div>

              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-slate-500">{isId ? "STATUS_SISTEM:" : "SYSTEM_STATUS:"}</span>
                  <span className="text-emerald-400 font-bold">{isId ? "AKTIF & SIAP" : "ACTIVE & READY"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-slate-500">{isId ? "LATENSI_AWS:" : "AWS_LATENCY:"}</span>
                  <span className="text-sky-400 font-bold">14ms (ap-southeast-1)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-slate-500">{isId ? "RISET_AKTIF:" : "ACTIVE_RESEARCH:"}</span>
                  <span className="text-purple-400 font-bold">Lagrangian Sepsis SAC &amp; Multi-Agent</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-slate-500">{isId ? "PENGGUNA_GITHUB:" : "GITHUB_USER:"}</span>
                  <a
                    href="https://github.com/raihanghifariw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 underline font-bold"
                  >
                    @raihanghifariw
                  </a>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 2: Stack Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TiltCard
              data-detail={
                isId
                  ? "Distribusi relatif kompetensi teknis di seluruh pengembangan riset & produksi"
                  : "Relative distribution of technical competencies across research & production development"
              }
              data-title={isId ? "KESEIMBANGAN_REKAYASA" : "ENGINEERING_BALANCE"}
              className="p-8 flex flex-col gap-5 h-full cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-slate-400">
                <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#8b5cf6]" />
                <span>{isId ? "DISTRIBUSI_STACK_UTAMA" : "CORE_STACK_DISTRIBUTION"}</span>
              </div>

              <div className="flex flex-col gap-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-1.5 text-slate-300">
                    <span>Deep RL &amp; PyTorch</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-sky-400 w-[95%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5 text-slate-300">
                    <span>FastAPI &amp; Backend APIs</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-400 w-[90%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5 text-slate-300">
                    <span>Computer Vision &amp; VLMs</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[85%]" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
