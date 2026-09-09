"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Eye, ShieldCheck, Sparkles } from "lucide-react";
import { CredlyBadge } from "@/data/certificates";
import { usePortfolio } from "@/context/PortfolioContext";

interface CredlyBadgeCardProps {
  badge: CredlyBadge;
  onViewEmbed: (badge: CredlyBadge) => void;
}

export default function CredlyBadgeCard({ badge, onViewEmbed }: CredlyBadgeCardProps) {
  const { language } = usePortfolio();
  const isId = language === "id";

  return (
    <div className="group relative flex flex-col justify-between p-5 sm:p-6 bg-[#06080e] border border-cyan-500/25 hover:border-cyan-400 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] overflow-hidden">
      {/* Corner Pixel Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-40" />

      {/* Top Meta Bar */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-[9px] font-display text-cyan-400 tracking-wider uppercase px-2 py-0.5 bg-cyan-950/60 border border-cyan-500/30">
          {badge.categoryLabel}
        </span>
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5">
          <ShieldCheck size={11} />
          <span>{isId ? "TERVERIFIKASI CREDLY" : "CREDLY VERIFIED"}</span>
        </div>
      </div>

      {/* Center Badge Image with Tron Aura */}
      <div className="relative z-10 my-4 flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {/* Cybernetic Aura */}
          <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-400/20 transition-all duration-300" />
          
          <img
            src={badge.localImage}
            alt={badge.title}
            className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
            loading="lazy"
            onError={(e) => {
              // Fallback to remote image if local fails
              (e.target as HTMLImageElement).src = badge.remoteImage;
            }}
          />
        </div>
      </div>

      {/* Badge Content */}
      <div className="relative z-10 mt-2 space-y-2">
        <h3 className="text-base sm:text-lg font-bold font-heading text-white line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
          {badge.title}
        </h3>
        <p className="text-xs font-mono text-zinc-400">
          {badge.issuer}
        </p>
        <p className="text-xs font-body text-zinc-300 line-clamp-2 leading-relaxed">
          {badge.description}
        </p>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-1 pt-2">
          {badge.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono text-cyan-300/90 bg-cyan-950/40 border border-cyan-500/20 px-1.5 py-0.5"
            >
              #{skill}
            </span>
          ))}
          {badge.skills.length > 3 && (
            <span className="text-[9px] font-mono text-zinc-500 px-1 py-0.5">
              +{badge.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 pt-4 mt-4 border-t border-zinc-800/80 flex items-center gap-2">
        <button
          onClick={() => onViewEmbed(badge)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 font-display text-[9px] tracking-wider transition-all duration-200"
        >
          <Eye size={12} />
          <span>{isId ? "LIHAT EMBED" : "VIEW EMBED"}</span>
        </button>

        <a
          href={badge.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-cyan-500 hover:bg-cyan-400 text-black font-display text-[9px] font-bold tracking-wider transition-all duration-200 shadow-[0_0_12px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]"
        >
          <span>{isId ? "VERIFIKASI" : "VERIFY"}</span>
          <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}
