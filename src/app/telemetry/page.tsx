"use client";

import React from "react";
import Navbar from "@/components/ui/Navbar";
import FooterMarquee from "@/components/ui/FooterMarquee";
import NeuralConstellation from "@/components/3d/NeuralConstellation";
import ClickSpark from "@/components/animations/ClickSpark";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import TelemetrySection from "@/components/sections/TelemetrySection";
import NextPageTransition from "@/components/animations/NextPageTransition";
import TextScramble from "@/components/animations/TextScramble";
import TiltCard from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { Activity, Server, Cpu, Database, Wifi } from "lucide-react";

import { usePortfolio } from "@/context/PortfolioContext";

export default function TelemetryPage() {
  const { language } = usePortfolio();
  const isId = language === "id";

  return (
    <div className="relative min-h-screen bg-[#09090d] text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white">
      <NeuralConstellation />
      <ClickSpark />
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 max-w-[1240px] mx-auto px-5 sm:px-8">

        {/* Live Cluster Specs Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Server size={14} />
              <span>{isId ? "STATUS NODE" : "NODE STATUS"}</span>
            </div>
            <span className="text-lg font-bold text-white">{isId ? "SEHAT : 99.9%" : "HEALTHY : 99.9%"}</span>
            <span className="text-[10px] font-mono text-slate-500">AWS ap-southeast-1</span>
          </div>

          <div className="p-4 rounded-xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <Wifi size={14} />
              <span>{isId ? "LATENSI INFERENSI" : "INFERENCE LATENCY"}</span>
            </div>
            <span className="text-lg font-bold text-white">~14ms P99</span>
            <span className="text-[10px] font-mono text-slate-500">{isId ? "FastAPI Asinkron" : "FastAPI Asynchronous"}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <Cpu size={14} />
              <span>{isId ? "PELATIHAN GPU" : "GPU TRAINING"}</span>
            </div>
            <span className="text-lg font-bold text-white">{isId ? "CUDA PARALEL" : "CUDA PARALLEL"}</span>
            <span className="text-[10px] font-mono text-slate-500">{isId ? "Akselerasi 10× AWS" : "10× AWS Speedup"}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Database size={14} />
              <span>{isId ? "DANAU DATA" : "DATA LAKE"}</span>
            </div>
            <span className="text-lg font-bold text-white">{isId ? "35.608 EPISODE" : "35,608 EPISODES"}</span>
            <span className="text-[10px] font-mono text-slate-500">MIMIC-III Sepsis-3</span>
          </div>
        </div>

        <TelemetrySection />
      </main>

      {/* Monumental Next Chapter Banner */}
      <NextPageTransition
        nextChapterNum="08"
        nextChapterTitle="CURRICULUM VITAE"
        nextChapterSubtitle={
          isId
            ? "Periksa Resume PDF Vektor Interaktif & Kredensial Akademik"
            : "Inspect the Interactive Vector PDF Resume & Academic Credentials"
        }
        nextHref="/resume"
      />

      <ChatBotWidget />
      <FooterMarquee />
    </div>
  );
}
