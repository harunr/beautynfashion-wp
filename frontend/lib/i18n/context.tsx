"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import en from "./dictionaries/en.json";
import bn from "./dictionaries/bn.json";

export type Language = "en" | "bn";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof en;
  toBnDigits: (input: string | number) => string;
  formatPrice: (amountUSD: number, amountBDT?: number) => string;
}

const dictionaries = { en, bn };

const digitMap: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export function toBnDigits(input: string | number): string {
  const str = input.toString();
  return str.replace(/[0-9]/g, (digit) => digitMap[digit] || digit);
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    // Read persisted language on mount
    try {
      const match = document.cookie.match(/(^|;)\s*NEXT_LOCALE\s*=\s*([^;]+)/);
      const cookieLang = match ? (match[2] as Language) : null;
      const localLang = localStorage.getItem("abf_lang") as Language | null;
      const initialLang = cookieLang || localLang;

      if (initialLang === "bn" || initialLang === "en") {
        setLangState(initialLang);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("abf_lang", newLang);
      document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
  };

  const formatPrice = (amountUSD: number, amountBDT?: number): string => {
    if (lang === "bn") {
      const bdtValue = amountBDT ?? Math.round(amountUSD * 120);
      const formatted = bdtValue.toLocaleString("en-US");
      return `৳${toBnDigits(formatted)}`;
    }
    return `$${amountUSD.toFixed(2)}`;
  };

  const t = dictionaries[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toBnDigits, formatPrice }}>
      <div data-lang={lang} className={lang === "bn" ? "font-siliguri" : "font-dmsans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
