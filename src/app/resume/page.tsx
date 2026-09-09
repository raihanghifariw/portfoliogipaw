"use client";

import React from "react";
import Navbar from "@/components/ui/Navbar";
import FooterMarquee from "@/components/ui/FooterMarquee";
import NeuralConstellation from "@/components/3d/NeuralConstellation";
import ClickSpark from "@/components/animations/ClickSpark";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import NextPageTransition from "@/components/animations/NextPageTransition";
import TextScramble from "@/components/animations/TextScramble";
import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, CheckCircle2, Award, Mail, Phone } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ResumePage() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const pdfUrl = "/assets/RaihanGhifariWinata_AIEngineer_CV_ver2.pdf";

  return (
    <div className="relative min-h-screen bg-[#09090d] text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white">
      <NeuralConstellation />
      <ClickSpark />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20 max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 mb-3 uppercase flex items-center gap-2">
            <FileText size={14} />
            <TextScramble text={isId ? "KURIKULUM VITAE RESMI" : "OFFICIAL CURRICULUM VITAE"} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight mb-2">
                Curriculum Vitae
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {isId
                  ? "Raihan Ghifari Winata : AI & Machine Learning Engineer. Sarjana Ilmu Komputer, Universitas Yarsi (IPK 3.92 / 4.00)."
                  : "Raihan Ghifari Winata : AI & Machine Learning Engineer. Bachelor of Computer Science, Universitas Yarsi (CGPA 3.92 / 4.00)."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={pdfUrl}
                download="RaihanGhifariWinata_AIEngineer_CV.pdf"
                className="px-5 py-2.5 rounded-full bg-white text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-sky-400 transition-colors shadow-lg cursor-pointer"
              >
                <Download size={15} />
                <span>{isId ? "Unduh PDF" : "Download PDF"}</span>
              </a>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ExternalLink size={15} />
                <span>{isId ? "Buka di Tab Baru" : "Open in Tab"}</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Quick Credentials Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#11111a]/80 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block">
                {isId ? "PRESTASI AKADEMIK" : "ACADEMIC HONORS"}
              </span>
              <span className="text-sm font-bold text-white">
                {isId ? "IPK 3.92 / 4.00" : "CGPA 3.92 / 4.00"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#11111a]/80 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block">
                {isId ? "KREDENSIAL CLOUD" : "CLOUD CREDENTIAL"}
              </span>
              <span className="text-sm font-bold text-white">AWS AI Practitioner</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#11111a]/80 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Mail size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block">
                {isId ? "KONTAK EMAIL" : "EMAIL CONTACT"}
              </span>
              <span className="text-xs font-mono font-bold text-white">ghifariwinata@gmail.com</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#11111a]/80 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Phone size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block">
                {isId ? "TELEPON / WHATSAPP" : "PHONE / WHATSAPP"}
              </span>
              <span className="text-xs font-mono font-bold text-white">+62 898-9641-777</span>
            </div>
          </div>
        </div>

        {/* Embedded PDF Viewer Container */}
        <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-[#11111a] shadow-2xl">
          <div className="px-6 py-3 bg-[#0d0d14] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>RaihanGhifariWinata_AIEngineer_CV_ver2.pdf</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500">{isId ? "FORMAT:" : "FORMAT:"}</span>
              <span className="text-sky-400">VECTOR PDF</span>
            </div>
          </div>

          <div className="w-full h-[850px] bg-slate-900">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              className="w-full h-full border-0"
              title="Raihan Ghifari Winata CV Viewer"
            />
          </div>
        </div>
      </main>

      {/* Monumental Next Chapter Banner */}
      <NextPageTransition
        nextChapterNum="09"
        nextChapterTitle={isId ? "TRANSMISI LANGSUNG & KONTAK" : "DIRECT TRANSMISSION & CONTACT"}
        nextChapterSubtitle={isId ? "Hubungi Saya untuk Posisi Penuh Waktu, Kolaborasi Riset, atau Verifikasi Sistem" : "Reach Out for Full-Time Roles, Research Collaborations, or 3D ID Verification"}
        nextHref="/contact"
      />

      <ChatBotWidget />
      <FooterMarquee />
    </div>
  );
}
