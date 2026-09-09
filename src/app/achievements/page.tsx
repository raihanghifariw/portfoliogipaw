"use client";

import React from "react";
import Navbar from "@/components/ui/Navbar";
import FooterMarquee from "@/components/ui/FooterMarquee";
import NeuralConstellation from "@/components/3d/NeuralConstellation";
import ClickSpark from "@/components/animations/ClickSpark";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import AccoladesSection from "@/components/sections/AccoladesSection";
import AchievementsMatrixSection from "@/components/sections/AchievementsMatrixSection";
import NextPageTransition from "@/components/animations/NextPageTransition";
import TextScramble from "@/components/animations/TextScramble";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function AchievementsPage() {
  const { language } = usePortfolio();
  const isId = language === "id";

  return (
    <div className="relative min-h-screen bg-[#05070c] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <NeuralConstellation />
      <ClickSpark />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Page Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 border-b border-cyan-500/20 pb-8"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.25em] text-cyan-400 mb-3 uppercase flex items-center gap-2">
            <Trophy size={14} className="text-cyan-400" />
            <TextScramble text={isId ? "PENGHARGAAN, HACKATHON & KREDENSIAL RESMI" : "HONORS, HACKATHONS & CERTIFIED CREDENTIALS"} />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white leading-tight mb-4 tracking-tight">
            {isId ? (
              <>PENGHARGAAN &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300">SERTIFIKASI</span></>
            ) : (
              <>ACCOLADES &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300">CERTIFICATIONS</span></>
            )}
          </h1>

          <p className="text-sm sm:text-base font-body text-zinc-300 max-w-3xl leading-relaxed">
            {isId
              ? "Kemenangan hackathon internasional terverifikasi, penghargaan Samsung Innovation Campus, 9 lencana digital resmi Credly (AWS, Google Cloud, IBM, Cisco), serta sertifikat etika riset klinis terakreditasi."
              : "Verified international hackathon victories, Samsung Innovation Campus honors, 9 official Credly digital badges (AWS, Google Cloud, IBM, Cisco), and clinical research ethics credentials."}
          </p>
        </motion.div>

        {/* Highlighted Honors & Competitions */}
        <AccoladesSection />

        {/* Complete Credly Badges & Document Certificate Matrix */}
        <div className="mt-16 pt-12 border-t border-cyan-500/20">
          <AchievementsMatrixSection />
        </div>
      </main>

      {/* Monumental Next Chapter Banner */}
      <NextPageTransition
        nextChapterNum="07"
        nextChapterTitle={isId ? "KURIKULUM VITAE & BERKAS" : "CURRICULUM VITAE & DOSSIER"}
        nextChapterSubtitle={isId ? "Tinjau Ringkasan Eksekutif, Rekam Jejak Rekayasa Sistem & Unduh Resume Resmi PDF" : "Inspect Executive Summary, Full Engineering Track Record & Download Official PDF"}
        nextHref="/resume"
      />

      <ChatBotWidget />
      <FooterMarquee />
    </div>
  );
}
