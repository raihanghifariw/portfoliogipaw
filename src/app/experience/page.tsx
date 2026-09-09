"use client";

import React from "react";
import Navbar from "@/components/ui/Navbar";
import FooterMarquee from "@/components/ui/FooterMarquee";
import NeuralConstellation from "@/components/3d/NeuralConstellation";
import ClickSpark from "@/components/animations/ClickSpark";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import WorkExperienceSection from "@/components/sections/WorkExperienceSection";
import OrganizationsSection from "@/components/sections/OrganizationsSection";
import EducationSection from "@/components/sections/EducationSection";
import NextPageTransition from "@/components/animations/NextPageTransition";
import TextScramble from "@/components/animations/TextScramble";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ExperiencePage() {
  const { language } = usePortfolio();
  const isId = language === "id";

  return (
    <div className="relative min-h-screen bg-[#09090d] text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white">
      <NeuralConstellation />
      <ClickSpark />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20 max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 mb-3 uppercase flex items-center gap-2">
            <Briefcase size={14} />
            <TextScramble
              text={
                isId
                  ? "KARIER, KEPEMIMPINAN & LATAR BELAKANG AKADEMIK"
                  : "CAREER, LEADERSHIP & ACADEMIC BACKGROUND"
              }
            />
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight mb-4">
            {isId ? "Trajektori Profesional" : "Professional Trajectory"}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {isId
              ? "Rekayasa riset AI mutakhir, bimbingan mahasiswa sarjana, peran koordinasi konsorsium internasional, dan predikat kehormatan ilmu komputer di Universitas YARSI."
              : "Frontier AI research engineering, undergraduate mentorship, international consortium liaison roles, and formal computer science honors at Universitas Yarsi."}
          </p>
        </motion.div>

        {/* Separated Subsections */}
        <WorkExperienceSection />
        <OrganizationsSection />
        <EducationSection />
      </main>

      {/* Monumental Next Chapter Banner */}
      <NextPageTransition
        nextChapterNum="06"
        nextChapterTitle={isId ? "PRESTASI & PENGHARGAAN" : "HONORS & ACCOLADES"}
        nextChapterSubtitle={
          isId
            ? "Lihat Trofi Pemenang Hackathon PRAGMA & Sertifikasi AI Resmi AWS"
            : "Inspect the PRAGMA Hackathon Winner Trophy & AWS Certified AI Credentials"
        }
        nextHref="/achievements"
      />

      <ChatBotWidget />
      <FooterMarquee />
    </div>
  );
}
