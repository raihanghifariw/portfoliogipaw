"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import FooterMarquee from "@/components/ui/FooterMarquee";
import NeuralConstellation from "@/components/3d/NeuralConstellation";
import ClickSpark from "@/components/animations/ClickSpark";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import RobotNeuralHeroSection from "@/components/sections/skills/RobotNeuralHeroSection";
import StrategicDirectivesSection from "@/components/sections/skills/StrategicDirectivesSection";
import CoreFocusMatrixSection from "@/components/sections/skills/CoreFocusMatrixSection";
import EngineeringFoundationArcSection from "@/components/sections/skills/EngineeringFoundationArcSection";
import ProfessionalToolingMarqueeSection from "@/components/sections/skills/ProfessionalToolingMarqueeSection";
import EngineeringFutureRadarBanner from "@/components/sections/skills/EngineeringFutureRadarBanner";
import NextPageTransition from "@/components/animations/NextPageTransition";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

export default function SkillsPage() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#09090d] text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* 3D WebGL Neural Background & Dynamic Particle Spark */}
      <NeuralConstellation />
      <ClickSpark />

      {/* Ambient Dotted Grid + Angled Light Rays */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
        <div className="absolute -top-72 left-0 w-[500px] h-[1200px] bg-gradient-to-b from-sky-600/15 to-transparent blur-3xl -rotate-45" />
        <div className="absolute -top-72 right-0 w-[500px] h-[1200px] bg-gradient-to-b from-purple-600/15 to-transparent blur-3xl rotate-45" />
      </div>

      {/* Global Navigation Bar */}
      <Navbar />

      <main className="relative z-10 w-full flex flex-col items-center">
        {/* 00:01 — Cybernetic Humanoid Robot & Dynamic Neural Synapse Lines to Skills */}
        <RobotNeuralHeroSection />

        {/* 00:15 — Strategic Directives (Horizontal Draggable Carousel with HUD Corner Brackets) */}
        <div id="strategic-directives" className="w-full">
          <StrategicDirectivesSection />
        </div>

        {/* 00:28 — Core Focus (Capabilities Matrix: 3 Domain Columns with Accordion Expansion) */}
        <CoreFocusMatrixSection />

        {/* 01:04 — The Engineering Foundation (Interactive Semi-Circular Draggable Arc & 24 Tech Stack Grid) */}
        <EngineeringFoundationArcSection />

        {/* 01:29 — Professional Tooling (Dual-Row Infinite Continuous Marquee) */}
        <ProfessionalToolingMarqueeSection />

        {/* 01:37 — Engineering the Future (Concentric Orbital Radar CTA Banner) */}
        <EngineeringFutureRadarBanner />

        {/* Monumental Chapter Bridge to Experience */}
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 mb-12">
          <NextPageTransition
            nextChapterNum="05"
            nextChapterTitle={isId ? "PENGALAMAN PROFESIONAL" : "PROFESSIONAL EXPERIENCE"}
            nextChapterSubtitle={isId ? "Jelajahi Riset AI Lab, Formulasi RL Klinis Sepsis & Diplomasi Konsorsium Internasional" : "Explore AI Research Lab Experience, Sepsis RL Formulations & International Consortium Liaison"}
            nextHref="/experience"
          />
        </div>
      </main>

      {/* Floating Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#11111a]/90 border border-white/20 text-white backdrop-blur-xl hover:bg-white/20 hover:border-sky-400 shadow-2xl transition-all group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform text-sky-400" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating AI Assistant Chatbot Widget */}
      <ChatBotWidget />

      {/* Global Footer */}
      <FooterMarquee />
    </div>
  );
}
