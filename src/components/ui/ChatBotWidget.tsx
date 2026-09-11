"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export default function ChatBotWidget() {
  const { isDark } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I am Raihan's AI Assistant. Ask me anything about his <strong>Deep RL research</strong>, <strong>PRAGMA Hackathon win</strong>, <strong>MLOps on AWS</strong>, or <strong>skills</strong>!",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptChips = [
    { label: "Sepsis RL Thesis", query: "Tell me about Raihan's thesis on Sepsis RL" },
    { label: "PRAGMA Hackathon", query: "What did he do at PRAGMA Hackathon?" },
    { label: "Tech Stack", query: "What is his full tech stack?" },
    { label: "Contact Info", query: "How can I contact Raihan?" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (query: string) => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const answer = generateAnswer(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: answer,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 650);
  };

  const generateAnswer = (q: string): string => {
    const lower = q.toLowerCase();

    if (lower.includes("thesis") || lower.includes("sepsis") || lower.includes("reinforcement")) {
      return "Raihan's bachelor thesis at Universitas Yarsi focuses on developing a <strong>Soft Actor-Critic (SAC)</strong> ensemble model for ICU sepsis treatment. It combines a denoising autoencoder with 5 SAC agents and <em>Lagrangian safety constraints</em> on blood pressure and fluid balance, outperforming clinical baselines with a <strong>75.31% estimated survival rate</strong>.";
    }
    if (lower.includes("pragma") || lower.includes("hackathon") || lower.includes("award") || lower.includes("thammasat")) {
      return "At the <strong>PRAGMA Collaborative Hackathon (01/2026)</strong> involving UCSD and Osaka University, Raihan won the <em>Winner Teamwork Award</em> for co-developing a continuous Decision Transformer pipeline predicting ICU drug dosages from longitudinal clinical trajectories.";
    }
    if (lower.includes("stack") || lower.includes("skill") || lower.includes("technology") || lower.includes("tools")) {
      return "Raihan's primary stack includes: <strong>PyTorch, Deep RL (SAC/DQN), LangChain/LangGraph, FastAPI, Docker, AWS (SageMaker/EC2), Python, OpenCV/VLMs</strong>, and frontend dashboards built with <strong>Next.js, TypeScript &amp; Tailwind CSS</strong>.";
    }
    if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("phone")) {
      return "You can reach Raihan directly via email at <a href='mailto:ghifariwinata@gmail.com' class='text-sky-400 underline'>ghifariwinata@gmail.com</a>, WhatsApp at <strong>+62 898-9641-777</strong>, or connect on <a href='https://linkedin.com/in/raihan-ghifari-553a1a26a/' target='_blank' class='text-sky-400 underline'>LinkedIn</a>.";
    }
    if (lower.includes("gpa") || lower.includes("education") || lower.includes("university") || lower.includes("yarsi")) {
      return "Raihan is graduating with a <strong>Bachelor of Computer Science (S.Kom.)</strong> from <strong>Universitas Yarsi</strong> with an outstanding <strong>CGPA of 3.92 / 4.00</strong>, specializing in Artificial Intelligence and Software Engineering.";
    }
    if (lower.includes("aws") || lower.includes("certif")) {
      return "Raihan is an <strong>AWS Certified AI Practitioner</strong> (Score: 826 / 1000) and holds certifications in CITI Research Ethics as well as an ETS TOEIC score of 605.";
    }
    if (lower.includes("vlm") || lower.includes("defect") || lower.includes("vision")) {
      return "Raihan developed an <strong>Automated Industrial Defect Triage System</strong> combining on-prem Vision-Language Models (LLaVA via Ollama) with classical OpenCV for quantized, low-latency (~42ms) edge defect classification on assembly feeds.";
    }

    return "Raihan Ghifari Winata is an <strong>AI &amp; Machine Learning Engineer</strong> specializing in Deep Reinforcement Learning, Generative AI (LLMs/VLMs), and clinical MLOps. Feel free to ask about his <em>thesis</em>, <em>hackathon awards</em>, <em>tech stack</em>, or <em>contact information</em>!";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[150]">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-sky-400 text-white text-on-accent flex items-center justify-center shadow-2xl shadow-purple-500/50 cursor-pointer"
        aria-label="Open AI Assistant"
      >
        <span className="absolute -inset-1 rounded-full border-2 border-sky-400/60 animate-ping pointer-events-none" />
        <Bot size={24} />
        <span className="absolute -top-1 -right-1 bg-emerald-400 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full font-mono">
          AI
        </span>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className={`absolute bottom-16 right-0 w-[360px] max-w-[calc(100vw-32px)] h-[490px] backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
              isDark 
                ? "bg-[#0d0d14]/95 border-white/15 shadow-black text-white" 
                : "bg-white/95 border-slate-200 shadow-slate-300 text-slate-900"
            }`}
          >
            {/* Header */}
            <div className={`p-4 border-b flex items-center justify-between ${
              isDark ? "bg-[#11111a] border-white/10" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-sky-400 flex items-center justify-center font-bold text-xs text-white text-on-accent">
                  AI
                </div>
                <div>
                  <div className={`font-display pixel-xs ${isDark ? "text-white" : "text-slate-900 font-bold"}`}>
                    RGW Neural Assistant
                  </div>
                  <div className="text-[10px] font-heading text-emerald-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span>ONLINE // TRAINED ON CV</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className={`transition-colors ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "self-end" : "self-start"
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white text-on-accent rounded-tr-none"
                        : isDark
                        ? "bg-[#161624] border border-white/10 text-slate-200 rounded-tl-none"
                        : "bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none"
                    }`}
                  />
                </div>
              ))}

              {isTyping && (
                <div className={`self-start p-2.5 rounded-xl rounded-tl-none text-[11px] font-mono flex items-center gap-1.5 border ${
                  isDark ? "bg-[#161624] border-white/10 text-sky-400" : "bg-slate-100 border-slate-200 text-sky-600"
                }`}>
                  <Sparkles size={12} className="animate-spin" />
                  <span>Reasoning...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className={`px-3 py-2 border-t flex gap-1.5 overflow-x-auto no-scrollbar ${
              isDark ? "border-white/10 bg-black/20" : "border-slate-200 bg-slate-50"
            }`}>
              {promptChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleSend(chip.query)}
                  className={`px-2.5 py-1 rounded-full font-heading text-xs whitespace-nowrap transition-colors border ${
                    isDark
                      ? "bg-white/5 hover:bg-cyan-400 hover:text-slate-950 border-white/10 text-cyan-300"
                      : "bg-white hover:bg-cyan-600 hover:text-white border-slate-200 text-cyan-700 shadow-sm"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputVal);
              }}
              className={`p-3 border-t flex items-center gap-2 ${
                isDark ? "bg-[#11111a] border-white/10" : "bg-slate-50 border-slate-200"
              }`}
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Raihan's AI assistant..."
                className={`flex-1 rounded-full px-4 py-2 font-body text-xs focus:outline-none focus:border-cyan-400 border ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                    : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-inner"
                }`}
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-sky-400 flex items-center justify-center text-white text-on-accent shrink-0 shadow hover:opacity-90"
                aria-label="Send"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
