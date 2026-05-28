'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export function Header({ title, subtitle, right }: HeaderProps) {
  const { T, dark, toggleDark } = useTheme();

  return (
    <div className="screen-header" style={{ padding: 'calc(env(safe-area-inset-top, 44px) + 20px) 22px 12px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontFamily: 'Sora, system-ui', fontWeight: 500, fontSize: 13, color: T.muted, letterSpacing: '0.02em' }}>{subtitle}</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 26, color: T.ink, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{title}</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {right}
        <button onClick={toggleDark} aria-label="Toggle theme" style={{
          width: 40, height: 40, borderRadius: 14, border: 'none', cursor: 'pointer',
          background: T.surface2, color: T.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {dark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5" /><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M4.5 19.5l2-2M17.5 6.5l2-2" /></g></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8.5 8.5 0 1110 4a7 7 0 0010 10.5z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}
