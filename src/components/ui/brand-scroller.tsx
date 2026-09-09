"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const techStackItems = [
    { name: "Python", icon: "/tech-icons/python.svg" },
    { name: "PyTorch", icon: "/tech-icons/pytorch.svg" },
    { name: "TensorFlow", icon: "/tech-icons/tensorflow.svg" },
    { name: "Scikit-learn", icon: "/tech-icons/scikitlearn.svg" },
    { name: "CUDA", icon: "/tech-icons/cuda.svg" },
    { name: "Golang", icon: "/tech-icons/golang.svg" },
    { name: "TypeScript", icon: "/tech-icons/typescript.svg" },
    { name: "React", icon: "/tech-icons/react.svg" },
    { name: "Next.js", icon: "/tech-icons/nextjs.svg" },
    { name: "FastAPI", icon: "/tech-icons/fastapi.svg" },
    { name: "Google Colab", icon: "/tech-icons/colab.svg" },
];

const toolItems = [
    { name: "AWS", icon: "/tech-icons/aws.svg" },
    { name: "Docker", icon: "/tech-icons/docker.svg" },
    { name: "Kubernetes", icon: "/tech-icons/kubernetes.svg" },
    { name: "Microsoft Azure", icon: "/tech-icons/azure.svg" },
    { name: "Google Cloud", icon: "/tech-icons/googlecloud.svg" },
    { name: "Microsoft Fabric", icon: "/tech-icons/fabric.svg" },
    { name: "Celery", icon: "/tech-icons/celery.svg" },
    { name: "Qdrant", icon: "/tech-icons/qdrant.svg" },
    { name: "PostgreSQL", icon: "/tech-icons/postgresql.svg" },
    { name: "MongoDB", icon: "/tech-icons/mongodb.svg" },
    { name: "Git", icon: "/tech-icons/git.svg" },
    { name: "LangChain", icon: "/tech-icons/langchain.svg" },
];

const ScrollerItem = ({ name, icon }: { name: string; icon: string }) => (
    <div className="flex items-center gap-3.5 px-7 py-3.5 mx-2 rounded-xl bg-[#050914]/80 border border-white/10 hover:border-cyan-400/60 hover:bg-[#071328] shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] transition-all duration-300 group cursor-pointer select-none">
        <div className="relative w-8 h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <Image
                src={icon}
                alt={name}
                fill
                className="object-contain grayscale contrast-125 opacity-60 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-300"
                unoptimized
            />
        </div>
        <p className="text-base font-mono font-medium tracking-wider text-zinc-400 group-hover:text-white group-hover:font-bold transition-all duration-300 whitespace-nowrap">
            {name}
        </p>
    </div>
);

export const BrandScroller = () => {
    return (
        <div className="relative flex overflow-hidden py-2 w-full px-8 md:px-16 lg:px-24 [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
            <motion.div
                animate={{
                    x: ["-50%", "0%"],
                }}
                transition={{
                    duration: 38,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex whitespace-nowrap"
            >
                <div className="flex shrink-0">
                    {techStackItems.map((item, idx) => (
                        <ScrollerItem key={`tech-1-${idx}`} name={item.name} icon={item.icon} />
                    ))}
                </div>
                <div className="flex shrink-0">
                    {techStackItems.map((item, idx) => (
                        <ScrollerItem key={`tech-2-${idx}`} name={item.name} icon={item.icon} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export const BrandScrollerReverse = () => {
    return (
        <div className="relative flex overflow-hidden py-2 w-full px-8 md:px-16 lg:px-24 [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
            <motion.div
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex whitespace-nowrap"
            >
                <div className="flex shrink-0">
                    {toolItems.map((item, idx) => (
                        <ScrollerItem key={`tool-1-${idx}`} name={item.name} icon={item.icon} />
                    ))}
                </div>
                <div className="flex shrink-0">
                    {toolItems.map((item, idx) => (
                        <ScrollerItem key={`tool-2-${idx}`} name={item.name} icon={item.icon} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
