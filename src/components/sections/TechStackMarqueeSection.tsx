"use client";

import React from "react";
import { motion } from "framer-motion";
import { WordReveal } from "@/components/animations/ScrollReveal";

interface Tech {
  name: string;
  icon: string;
}

const ROW_A: Tech[] = [
  { name: "Python", icon: "python/python-original" },
  { name: "PyTorch", icon: "pytorch/pytorch-original" },
  { name: "TypeScript", icon: "typescript/typescript-original" },
  { name: "React", icon: "react/react-original" },
  { name: "Next.js", icon: "nextjs/nextjs-original" },
  { name: "OpenCV", icon: "opencv/opencv-original" },
  { name: "Docker", icon: "docker/docker-original" },
  { name: "Go", icon: "go/go-original-wordmark" },
];

const ROW_B: Tech[] = [
  { name: "FastAPI", icon: "fastapi/fastapi-original" },
  { name: "TensorFlow", icon: "tensorflow/tensorflow-original" },
  { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
  { name: "Node.js", icon: "nodejs/nodejs-original" },
  { name: "Linux", icon: "linux/linux-original" },
  { name: "Git", icon: "git/git-original" },
  { name: "Jupyter", icon: "jupyter/jupyter-original" },
  { name: "VS Code", icon: "vscode/vscode-original" },
];

const DEVICON = (icon: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}.svg`;

function MarqueeRow({ techs, reverse = false, duration = 32 }: { techs: Tech[]; reverse?: boolean; duration?: number }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex w-max items-center gap-10 py-4 ${reverse ? "animate-[marquee-reverse_36s_linear_infinite]" : "animate-[marquee_32s_linear_infinite]"
          }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10">
            {techs.map((t) => (
              <div
                key={`${copy}-${t.name}`}
                className="group flex flex-col items-center gap-2 px-2"
                title={t.name}
                data-detail={`Production-grade experience with ${t.name}`}
                data-title={`STACK_${t.name.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`}
              >
                <img
                  src={DEVICON(t.icon)}
                  alt={t.name}
                  width={52}
                  height={52}
                  loading="lazy"
                  className="w-10 h-10 md:w-[52px] md:h-[52px] opacity-70 grayscale-[30%] transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_rgba(212,255,63,0.35)]"
                />
                <span className="font-mono text-[9px] tracking-[0.15em] text-slate-500 group-hover:text-white uppercase transition-colors">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#09090d] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#09090d] to-transparent pointer-events-none" />
    </div>
  );
}

export default function TechStackMarqueeSection() {
  return (
    <section id="stack" className="relative py-24 sm:py-32 z-10 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 mb-12 md:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-4xl"
        >
          <WordReveal text="Architecting Scalable Systems" stagger={0.07} />{" "}
          <span className="italic font-light text-slate-400">
            <WordReveal text="Where Intelligence Meets Engineering." delay={0.5} stagger={0.05} />
          </span>
        </motion.p>
      </div>

      <div className="flex flex-col gap-2 border-y border-white/[0.08] bg-[#0b0b11]/60">
        <MarqueeRow techs={ROW_A} duration={30} />
        <div className="h-px bg-white/[0.06]" />
        <MarqueeRow techs={ROW_B} reverse duration={38} />
      </div>
    </section>
  );
}
