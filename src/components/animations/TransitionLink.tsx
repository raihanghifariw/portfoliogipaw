"use client";

import React, { MouseEvent } from "react";
import Link from "next/link";
import { usePageTransition } from "@/components/animations/PageTransitionProvider";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
  prefetch?: boolean;
  onClick?: () => void;
}

export default function TransitionLink({
  href,
  children,
  className,
  ariaLabel,
  title,
  prefetch = true,
  onClick,
}: TransitionLinkProps) {
  const { navigate, phase } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;

    e.preventDefault();
    if (phase !== "idle") return;
    navigate(href);
  };

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      title={title}
      prefetch={prefetch}
      onClick={handleClick}
      data-transitioning={phase === "exit" ? "true" : undefined}
    >
      {children}
    </Link>
  );
}
