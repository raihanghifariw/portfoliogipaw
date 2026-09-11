"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download, ShieldCheck, CheckCircle2 } from "lucide-react";
import { CredlyBadge, DocumentCertificate } from "@/data/certificates";
import { usePortfolio } from "@/context/PortfolioContext";

interface CredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  credlyBadge?: CredlyBadge | null;
  certificate?: DocumentCertificate | null;
}

export default function CredentialModal({
  isOpen,
  onClose,
  credlyBadge,
  certificate
}: CredentialModalProps) {
  const [mounted, setMounted] = useState(false);
  const { language } = usePortfolio();
  const isId = language === "id";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-auto">
          {/* Backdrop with scanlines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#07090e] border-2 border-cyan-400/80 rounded-none shadow-[0_0_60px_rgba(0,240,255,0.35)] z-10 flex flex-col custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cyber Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0a0d14]/95 border-b border-cyan-500/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
                <span className="text-[10px] font-display text-cyan-300 tracking-wider">
                  {isId ? "SISTEM • MATRIKS_VERIFIKASI_KREDENSIAL" : "SYSTEM • CREDENTIAL_VERIFICATION_MATRIX"}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6">
              {/* CREDLY BADGE VIEW */}
              {credlyBadge && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Official Embed Preview */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#040609] border border-cyan-500/30 relative group">
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-cyan-400/70 uppercase">
                      CREDLY_IFRAME_NODE • 150x270
                    </div>

                    <div className="my-4 flex items-center justify-center min-h-[290px] w-full">
                      <iframe
                        src={credlyBadge.embedUrl}
                        width="150"
                        height="270"
                        title={credlyBadge.title}
                        className="border-0 shadow-lg rounded-sm"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 mt-2">
                      <CheckCircle2 size={12} />
                      <span>{isId ? "TERVERIFIKASI RESMI DI CREDLY" : "OFFICIALLY VERIFIED ON CREDLY"}</span>
                    </div>
                  </div>

                  {/* Right Column: Metadata & Actions */}
                  <div className="md:col-span-7 space-y-5">
                    <div>
                      <div className="inline-block text-[9px] font-display text-cyan-400 tracking-wider mb-2 uppercase px-2.5 py-1 bg-cyan-950/50 border border-cyan-500/30">
                        {credlyBadge.categoryLabel}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold font-heading text-white leading-snug">
                        {credlyBadge.title}
                      </h2>
                      <p className="text-xs font-mono text-cyan-300/80 mt-1 flex items-center gap-2">
                        <span>{isId ? "PENERBIT:" : "ISSUER:"} {credlyBadge.issuer}</span>
                        <span>•</span>
                        <span>{isId ? "TAHUN:" : "YEAR:"} {credlyBadge.issueDate}</span>
                      </p>
                    </div>

                    <p className="text-sm font-body text-zinc-300 leading-relaxed">
                      {credlyBadge.description}
                    </p>

                    {/* Verified Skills Pills */}
                    <div>
                      <span className="text-[10px] font-display text-zinc-400 block mb-2">
                        {isId ? "KOMPETENSI TERVERIFIKASI:" : "VERIFIED COMPETENCIES:"}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {credlyBadge.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap gap-3">
                      <a
                        href={credlyBadge.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-display text-[10px] font-bold tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.7)]"
                      >
                        <span>{isId ? "BUKA VERIFIKASI CREDLY" : "OPEN CREDLY VERIFICATION"}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* DOCUMENT CERTIFICATE VIEW */}
              {certificate && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                    <div>
                      <div className="inline-block text-[9px] font-display text-emerald-400 tracking-wider mb-2 uppercase px-2.5 py-1 bg-emerald-950/50 border border-emerald-500/30">
                        {certificate.categoryLabel}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold font-heading text-white leading-snug">
                        {certificate.title}
                      </h2>
                      <p className="text-xs font-mono text-zinc-400 mt-1">
                        {isId ? "DITERBITKAN OLEH:" : "ISSUED BY:"} <span className="text-cyan-300">{certificate.issuer}</span> • {certificate.date}
                        {certificate.certNumber && (
                          <span className="block sm:inline sm:ml-2 text-zinc-500">
                            [REF: {certificate.certNumber}]
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Quick Download / External Actions */}
                    <div className="flex items-center gap-3">
                      <a
                        href={certificate.pdfUrl}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs border border-zinc-700 transition-colors"
                      >
                        <Download size={14} />
                        <span>{isId ? "UNDUH PDF" : "DOWNLOAD PDF"}</span>
                      </a>
                      {certificate.verificationUrl && (
                        <a
                          href={certificate.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-display text-[9px] font-bold tracking-wider transition-colors shadow-[0_0_15px_rgba(0,255,157,0.3)]"
                        >
                          <span>{isId ? "VERIFIKASI ONLINE" : "VERIFY ONLINE"}</span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Certificate High-Res Viewer */}
                  <div className="w-full bg-black/80 border border-emerald-500/30 p-2 sm:p-4 rounded-none overflow-hidden relative">
                    <img
                      src={certificate.previewImage}
                      alt={certificate.title}
                      className="w-full h-auto object-contain max-h-[60vh] mx-auto shadow-2xl ring-1 ring-white/10"
                    />
                  </div>

                  {/* Description & Competencies */}
                  <div className="space-y-3">
                    <p className="text-sm font-body text-zinc-300 leading-relaxed">
                      {certificate.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {certificate.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cyber Footer Bar */}
            <div className="px-6 py-3 bg-[#0a0d14] border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>{isId ? "DITANDATANGANI & DIVERIFIKASI SECARA KRIPTOGRAFIS" : "CRYPTOGRAPHICALLY SIGNED & VERIFIED"}</span>
              </span>
              <button
                onClick={onClose}
                className="text-cyan-400 hover:text-white transition-colors underline cursor-pointer"
              >
                {isId ? "[TUTUP ESC]" : "[CLOSE ESC]"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
