"use client";

import React, { useState, useEffect, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  autoStart?: boolean;
  speed?: number;
  scrambleChars?: string;
}

export default function TextScramble({
  text,
  className = "",
  triggerOnHover = true,
  autoStart = false,
  speed = 30,
  scrambleChars = "!<>-_[]{}~=+*^?#________010101",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const targetLength = text.length;

    const update = () => {
      const current = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return text[index];
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join("");

      setDisplayText(current);

      if (iteration < targetLength) {
        iteration += 1 / 3;
        frameRef.current = requestAnimationFrame(() => {
          setTimeout(update, speed);
        });
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    update();
  };

  useEffect(() => {
    setDisplayText(text);
    if (autoStart) {
      startScramble();
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, autoStart]);

  return (
    <span
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      className={`font-mono tracking-tight cursor-default transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
}
