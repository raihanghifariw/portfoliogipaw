"use client";

import React from "react";
import { ExternalLink, Eye, Download, Award, FileText } from "lucide-react";
import { DocumentCertificate } from "@/data/certificates";
import { usePortfolio } from "@/context/PortfolioContext";

interface DocumentCertificateCardProps {
  certificate: DocumentCertificate;
  onView: (certificate: DocumentCertificate) => void;
}

export default function DocumentCertificateCard({
  certificate,
  onView
}: DocumentCertificateCardProps) {
  const { language } = usePortfolio();
  const isId = language === "id";

  return (
    <div className="group relative flex flex-col justify-between p-5 sm:p-6 bg-[#06080e] border border-emerald-500/25 hover:border-emerald-400 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(0,255,157,0.2)] overflow-hidden">
      {/* Corner Pixel Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-400" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-400" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-400" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-400" />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,157,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-40" />

      {/* Top Meta Bar */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-[9px] font-display text-emerald-400 tracking-wider uppercase px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/30">
          {certificate.categoryLabel}
        </span>
        <span className="text-[10px] font-mono text-zinc-400">
          {certificate.date}
        </span>
      </div>

      {/* Certificate Preview Thumbnail */}
      <div
        onClick={() => onView(certificate)}
        className="relative z-10 my-3 w-full aspect-[16/10] bg-[#020305] border border-emerald-500/20 rounded-none overflow-hidden cursor-pointer group-hover:border-emerald-400/50 transition-colors"
      >
        <img
          src={certificate.previewImage}
          alt={certificate.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
          <span className="text-[9px] font-display text-emerald-300 tracking-wider bg-black/80 border border-emerald-500/40 px-2 py-1">
            {isId ? "KLIK UNTUK INSPEKSI DOKUMEN LENGKAP" : "CLICK TO INSPECT FULL DOCUMENT"}
          </span>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="relative z-10 mt-2 space-y-2">
        <h3 className="text-base sm:text-lg font-bold font-heading text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
          {certificate.title}
        </h3>
        <p className="text-xs font-mono text-cyan-300/80">
          {certificate.issuer}
        </p>
        <p className="text-xs font-body text-zinc-300 line-clamp-2 leading-relaxed">
          {certificate.description}
        </p>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-1 pt-2">
          {certificate.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono text-emerald-300/90 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5"
            >
              #{skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="text-[9px] font-mono text-zinc-500 px-1 py-0.5">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 pt-4 mt-4 border-t border-zinc-800/80 flex items-center gap-2">
        <button
          onClick={() => onView(certificate)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-display text-[9px] tracking-wider transition-all duration-200"
        >
          <Eye size={12} />
          <span>{isId ? "LIHAT DOKUMEN" : "VIEW DOC"}</span>
        </button>

        <a
          href={certificate.pdfUrl}
          download
          className="inline-flex items-center justify-center p-2 bg-zinc-800/70 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
          title="Download original PDF"
        >
          <Download size={13} />
        </a>

        {certificate.verificationUrl && (
          <a
            href={certificate.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-black font-display text-[9px] font-bold tracking-wider transition-all duration-200 shadow-[0_0_12px_rgba(0,255,157,0.3)] hover:shadow-[0_0_20px_rgba(0,255,157,0.6)]"
          >
            <span>{isId ? "VERIFIKASI" : "VERIFY"}</span>
            <ExternalLink size={11} />
          </a>
        )}
      </div>
    </div>
  );
}
