"use client";

import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import FooterMarquee from "@/components/ui/FooterMarquee";
import NeuralConstellation from "@/components/3d/NeuralConstellation";
import ClickSpark from "@/components/animations/ClickSpark";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import LanyardCard3D from "@/components/3d/LanyardCard3D";
import NextPageTransition from "@/components/animations/NextPageTransition";
import TextScramble from "@/components/animations/TextScramble";
import { FAQ_DATA } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, Check, Copy, ChevronDown, MessageSquare } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ContactPage() {
  const { language, t } = usePortfolio();
  const isId = language === "id";
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ghifariwinata@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
          className="mb-12 text-center"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 mb-3 uppercase flex items-center justify-center gap-2">
            <MessageSquare size={14} />
            <TextScramble text={isId ? "TRANSMISI LANGSUNG & ID INTERAKTIF" : "DIRECT TRANSMISSION & INTERACTIVE ID"} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight mb-4">
            {t("contact.title", "Let's Build Something Intelligent")}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t("contact.lead", "Open to global AI/ML Engineering roles, deep reinforcement learning research collaborations, and clinical MLOps consulting.")}
          </p>
        </motion.div>

        {/* 3D Lanyard & Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left: 3D ID Lanyard Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <LanyardCard3D />
            <span className="text-[11px] font-mono text-slate-500 mt-2">
              <TextScramble text={isId ? "BADGE 3D INTERAKTIF : FISIKA GESER & KEMIRINGAN" : "INTERACTIVE 3D BADGE : DRAG & TILT PHYSICS"} />
            </span>
          </div>

          {/* Right: Message Form & Direct Info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Quick Contact Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-slate-500">
                  {isId ? "TRANSMISI UTAMA" : "PRIMARY TRANSMISSION"}
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href="mailto:ghifariwinata@gmail.com"
                    className="text-sm font-bold text-sky-400 hover:underline flex items-center gap-1.5"
                  >
                    <Mail size={15} /> ghifariwinata@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="w-7 h-7 rounded bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300"
                    title={isId ? "Salin email" : "Copy email"}
                    aria-label={isId ? "Salin email" : "Copy email"}
                  >
                    {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#11111a]/80 border border-white/10 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-slate-500">
                  {isId ? "TELEPON / WHATSAPP LANGSUNG" : "DIRECT PHONE / WHATSAPP"}
                </span>
                <a
                  href="tel:+628989641777"
                  className="text-sm font-bold text-white hover:text-sky-400 flex items-center gap-1.5"
                >
                  <Phone size={15} /> +62 898-9641-777
                </a>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="p-8 rounded-2xl bg-[#11111a]/80 border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">
                {t("contact.formTitle", "Send a Direct Message")}
              </h3>

              <form
                action="mailto:ghifariwinata@gmail.com"
                method="POST"
                encType="text/plain"
                className="flex flex-col gap-4"
              >
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400">
                      {t("contact.labelName", "YOUR NAME")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={isId ? "contoh: Dr. Jennifer Hayes" : "e.g. Dr. Jennifer Hayes"}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400">
                      {t("contact.labelEmail", "EMAIL ADDRESS")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={isId ? "jennifer@organisasi.com" : "jennifer@organization.com"}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400">
                    {t("contact.labelSubject", "SUBJECT / PROJECT")}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder={isId ? "Inisiatif AI & Reinforcement Learning" : "AI & Reinforcement Learning Initiative"}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400">
                    {t("contact.labelMessage", "MESSAGE")}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={isId ? "Jelaskan proyek, linimasa, dan sasaran riset Anda..." : "Describe your project, timeline, and research objectives..."}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3.5 rounded-full bg-white text-slate-950 font-display font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-sky-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t("contact.submitBtn", "Transmit Direct Message")}</span>
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-10">
          <h3 className="text-2xl font-display font-extrabold text-white text-center mb-6">
            {t("faq.title", "Frequently Asked Questions")}
          </h3>

          <div className="flex flex-col gap-3">
            {FAQ_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#11111a]/70 border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-sm text-white hover:bg-white/5 transition-colors"
                >
                  <span>{t(faq.qKey) || faq.qFallback}</span>
                  <ChevronDown
                    size={16}
                    className={`text-sky-400 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3"
                    >
                      {t(faq.aKey) || faq.aFallback}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Return to Home Banner */}
      <NextPageTransition
        nextChapterNum="01"
        nextChapterTitle={isId ? "KEMBALI KE BERANDA" : "RETURN TO HOME OVERVIEW"}
        nextChapterSubtitle={isId ? "Jelajahi kembali Tipografi Kinetik Hero & Inti Neural Holografik 3D" : "Revisit the Hero Kinetic Typography & 3D Holographic Neural Core"}
        nextHref="/"
      />

      <ChatBotWidget />
      <FooterMarquee />
    </div>
  );
}
