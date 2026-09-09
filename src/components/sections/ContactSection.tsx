"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { FAQ_DATA } from "@/data/portfolioData";
import TiltCard from "@/components/ui/TiltCard";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Send, ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import TextScramble from "@/components/animations/TextScramble";

export default function ContactSection() {
  const { t, language } = usePortfolio();
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
    <section id="contact" className="relative py-24 z-10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 mb-3 uppercase flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <TextScramble text={isId ? "SALURAN LANGSUNG" : "DIRECT CHANNEL"} speed={20} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight max-w-3xl mx-auto mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t("contact.lead")}
          </p>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard
              data-detail={isId ? "Kanal transmisi langsung untuk riset AI, rekayasa penuh waktu, dan konsultasi" : "Direct transmission channels for AI research, full-time engineering, and consulting"}
              data-title="COMMUNICATION_CHANNELS"
              className="p-8 sm:p-10 flex flex-col justify-between gap-6 h-full cursor-pointer"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{t("contact.infoTitle")}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">{t("contact.infoDesc")}</p>

                <div className="flex flex-col gap-5">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 block mb-1">
                      {isId ? "EMAIL UTAMA" : "PRIMARY EMAIL"}
                    </span>
                    <div className="flex items-center gap-3">
                      <a
                        href="mailto:ghifariwinata@gmail.com"
                        data-detail={isId ? "Klik untuk mengirim email ke ghifariwinata@gmail.com" : "Click to compose email to ghifariwinata@gmail.com"}
                        data-title="TRANSMIT_EMAIL"
                        className="text-base font-semibold text-sky-400 hover:underline flex items-center gap-2 cursor-pointer"
                      >
                        <Mail size={16} /> ghifariwinata@gmail.com
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        data-detail={isId ? "Salin alamat email ke papan klip" : "Copy email address to clipboard"}
                        data-title="CLIPBOARD_ACTION"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 transition-colors cursor-pointer"
                        title={isId ? "Salin email" : "Copy email"}
                        aria-label={isId ? "Salin email" : "Copy email"}
                      >
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 block mb-1">
                      {isId ? "TELEPON & WHATSAPP" : "PHONE & WHATSAPP"}
                    </span>
                    <a
                      href="tel:+628989641777"
                      data-detail={isId ? "Tautan langsung telepon & WhatsApp (+62 898-9641-777)" : "Direct telephone & WhatsApp link (+62 898-9641-777)"}
                      data-title="DIRECT_CALL"
                      className="text-sm font-semibold text-slate-200 hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <Phone size={15} /> +62 898-9641-777
                    </a>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 block mb-1">
                      {isId ? "LOKASI UTAMA" : "BASE LOCATION"}
                    </span>
                    <span
                      data-detail={isId ? "Zona Waktu: UTC+7 (Waktu Indonesia Barat / WIB)" : "Timezone: UTC+7 (Western Indonesia Time / WIB)"}
                      data-title="GEOLOCATION"
                      className="text-sm text-slate-300 flex items-center gap-2 cursor-pointer"
                    >
                      <MapPin size={15} /> Bekasi &amp; Jakarta, Indonesia (WIB / UTC+7)
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                <a
                  href="https://github.com/raihanghifariw"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-detail="Open GitHub Profile @raihanghifariw"
                  data-title="GITHUB_NETWORK"
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all hover:-translate-y-1 cursor-pointer"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/raihan-ghifari-553a1a26a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-detail={isId ? "Terhubung di LinkedIn: in/raihan-ghifari" : "Connect on LinkedIn: in/raihan-ghifari"}
                  data-title="LINKEDIN_NETWORK"
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all hover:-translate-y-1 cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/pawwdanyap"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-detail="Instagram @pawwdanyap"
                  data-title="INSTAGRAM"
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all hover:-translate-y-1 cursor-pointer"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </TiltCard>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TiltCard className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{t("contact.formTitle")}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {isId
                    ? "Isi data di bawah untuk mengirim pesan langsung atau pertanyaan kerja sama proyek."
                    : "Fill in the details below to transmit a direct message or project inquiry."}
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(isId ? "Pesan berhasil terkirim!" : "Message transmitted successfully!");
                  }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 block mb-1.5">
                      {t("contact.labelName")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isId ? "contoh: Dr. Jennifer Hayes" : "Alex Mercer"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 block mb-1.5">
                      {t("contact.labelEmail")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={isId ? "jennifer@organisasi.com" : "alex@enterprise.com"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 block mb-1.5">
                      {t("contact.labelSubject")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isId ? "Inisiatif AI & Riset Kesehatan" : "AI Engineering / Healthcare Research Collaboration"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 block mb-1.5">
                      {t("contact.labelMessage")}
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={isId ? "Diskusikan kebutuhan proyek, linimasa, atau ruang lingkup rekayasa..." : "Discuss project requirements, timelines, or engineering scope..."}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="TRANSMIT"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-sky-400 text-white text-on-accent font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send size={14} />
                    <span>{t("contact.submitBtn")}</span>
                  </button>
                </form>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white text-center mb-8">
            {t("faq.title")}
          </h3>

          <div className="flex flex-col gap-3">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaq === idx;
              const question = t(faq.qKey) || faq.qFallback;
              const answer = t(faq.aKey) || faq.aFallback;

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-[#11111a]/70 backdrop-blur-md overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    <span>{question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-sky-400" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
