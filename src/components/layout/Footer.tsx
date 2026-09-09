'use client';

import React from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { Github, Linkedin, Instagram } from '@/components/ui/social-icons';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full bg-black text-white border-t border-white/10 pt-16 pb-12 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
                {/* Brand & Mission */}
                <div className="md:col-span-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white text-black font-black flex items-center justify-center text-sm">
                            RG
                        </div>
                        <span className="font-bold text-lg text-white tracking-wider uppercase">
                            Raihan Ghifari Winata
                        </span>
                    </div>
                    <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
                        AI Engineer & Researcher specializing in safety-constrained continuous Deep Reinforcement Learning, high-throughput MLOps pipelines, and full-stack systems.
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                        <a
                            href="https://github.com/raihanghifariw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href="https://linkedin.com/in/raihan-ghifari-winata"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                            href="https://instagram.com/raihanghifari"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Quick Navigation */}
                <div className="md:col-span-3 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block pb-2">
                        Navigation
                    </span>
                    <ul className="space-y-2 text-sm text-zinc-300">
                        <li>
                            <Link href="/#about" className="hover:text-white transition-colors">
                                Core Focus & Biography
                            </Link>
                        </li>
                        <li>
                            <Link href="/projects" className="hover:text-white transition-colors">
                                Flagship Projects
                            </Link>
                        </li>
                        <li>
                            <Link href="/experience" className="hover:text-white transition-colors">
                                Career & Timeline
                            </Link>
                        </li>
                        <li>
                            <Link href="/resume" className="hover:text-white transition-colors">
                                Curriculum Vitae
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact & Status */}
                <div className="md:col-span-3 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block pb-2">
                        Availability
                    </span>
                    <p className="text-sm text-zinc-400">
                        Jakarta / Bekasi, Indonesia • WIB (UTC+7)
                    </p>
                    <a
                        href="mailto:raihanghifariw@gmail.com"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-primary transition-colors"
                    >
                        <span>raihanghifariw@gmail.com</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="max-w-[1600px] mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                <p>© {new Date().getFullYear()} Raihan Ghifari Winata. Built with Next.js, Tailwind CSS & Framer Motion.</p>
                <p className="font-mono">Highest Distinction • CGPA 3.92/4.00</p>
            </div>
        </footer>
    );
}
