'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTokens, type PaletteKey, type ThemeTokens } from '@/lib/theme';

interface ThemeContextValue {
  T: ThemeTokens;
  dark: boolean;
  toggleDark: () => void;
  paletteKey: PaletteKey;
  changePalette: (k: PaletteKey) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [paletteKey, setPaletteKey] = useState<PaletteKey>('tropical');

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setDark(mq.matches);
    const saved = localStorage.getItem('billbro-dark');
    if (saved !== null) setDark(saved === 'true');
    const savedPalette = localStorage.getItem('billbro-palette');
    if (savedPalette) setPaletteKey(savedPalette as PaletteKey);
  }, []);

  const toggleDark = () => {
    setDark(d => {
      localStorage.setItem('billbro-dark', String(!d));
      return !d;
    });
  };

  const changePalette = (k: PaletteKey) => {
    localStorage.setItem('billbro-palette', k);
    setPaletteKey(k);
  };

  const T = getTokens(paletteKey, dark);

  useEffect(() => {
    document.documentElement.style.setProperty('--bg', T.bg);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', T.bg);
  }, [T.bg]);

  return (
    <ThemeContext.Provider value={{ T, dark, toggleDark, paletteKey, changePalette }}>
      <div style={{ background: T.bg, minHeight: '100%' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
