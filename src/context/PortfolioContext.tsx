"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, Theme } from "@/types";
import { I18N_DATA } from "@/data/portfolioData";

interface PortfolioContextType {
  language: Language;
  isIndonesian: boolean;
  theme: Theme;
  isDark: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  t: (key: string, fallback?: string) => string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("portfolio-theme") || localStorage.getItem("portfolio_theme")) as Theme || "dark";
    const rawLang = (localStorage.getItem("portfolio-lang") || localStorage.getItem("portfolio_lang"))?.toLowerCase() as Language || "en";
    const savedLang: Language = rawLang === "id" ? "id" : "en";

    setThemeState(savedTheme);
    setLanguageState(savedLang);
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.setAttribute("lang", savedLang);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio-lang", lang);
    localStorage.setItem("portfolio_lang", lang);
    document.documentElement.setAttribute("lang", lang);
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "en" ? "id" : "en";
    setLanguage(nextLang);
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setThemeState(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const t = (key: string, fallback?: string): string => {
    const dict = I18N_DATA[language] || I18N_DATA.en;
    return dict[key] || fallback || key;
  };

  const isIndonesian = language === "id";
  const isDark = theme === "dark";

  return (
    <PortfolioContext.Provider
      value={{
        language,
        isIndonesian,
        theme,
        isDark,
        setLanguage,
        toggleLanguage,
        toggleTheme,
        t,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
