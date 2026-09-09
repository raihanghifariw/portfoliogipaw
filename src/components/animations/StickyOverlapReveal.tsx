"use client";

import React from "react";

export interface StickyOverlapRevealProps {
  /**
   * Section yang dipin (sticky top-0, z-0) — tetap terlihat
   * di layar sementara section berikutnya meluncur menimpanya.
   */
  underlay: React.ReactNode;
  /**
   * Section penimpa (relative z-20) yang slide-over menghapus underlay.
   */
  children: React.ReactNode;
  /** Class tambahan untuk layer penimpa (bg dsb.) */
  overlayClassName?: string;
}

/**
 * StickyOverlapReveal — transisi antar section "slide-over":
 * layer bawah dipin sticky, lapisan atas bergerak normal dan
 * menimpanya dengan bayangan atas lembut supaya tidak ada
 * "bleed" cahaya ke arah bawah (trik shadow -z-10 dari repo
 * referensi).
 *
 * Kontrak penting: konten `underlay` HARUS muat dalam satu
 * viewport — container sticky dipaksa `h-dvh overflow-hidden`
 * sehingga saat pin terjadi seluruh underlay terlihat sebelum
 * ditimpa overlay. Jika underlay lebih tinggi dari viewport,
 * bagian bawahnya tidak akan pernah terlihat; gunakan varian
 * ringkas pada section underlay (mis. `fitUnderlay`).
 *
 * Catatan: elemen ancestor TIDAK boleh memakai overflow-y:hidden;
 * proyek ini memakai `overflow-x-clip` (clip tidak membuat scroll
 * container) sehingga sticky tetap bekerja.
 */
export default function StickyOverlapReveal({
  underlay,
  children,
  overlayClassName = "",
}: StickyOverlapRevealProps) {
  return (
    <div className="relative">
      {/* Layer 1: section ter-pin — dipaksa tepat satu viewport */}
      <div className="sticky top-0 z-0 h-dvh overflow-hidden">{underlay}</div>

      {/* Layer 2: section penimpa yang meluncur di atasnya */}
      <div className={`relative z-20 bg-[#09090d] ${overlayClassName}`.trim()}>
        {/* Bayangan atas — mencegah bleed ke bawah footer ala repo referensi */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-10 shadow-[0_-50px_150px_rgba(0,0,0,0.85)] -z-10"
        />
        {children}
      </div>
    </div>
  );
}
