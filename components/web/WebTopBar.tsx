'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  '/home':     { title: 'Dashboard',       subtitle: 'May 29 · Friday' },
  '/txns':     { title: 'Activity',         subtitle: 'May 2026 · 12 transactions' },
  '/budgets':  { title: 'Budgets',          subtitle: 'May 2026 · envelope tracking' },
  '/loans':    { title: 'Loans & Bills',    subtitle: 'Recurring obligations' },
  '/insights': { title: "Bro's Report",     subtitle: 'May 2026 · monthly recap' },
  '/settings': { title: 'Account Settings', subtitle: 'Profile & preferences' },
};

export function WebTopBar() {
  const { T, dark, toggleDark } = useTheme();
  const pathname = usePathname();

  const match = Object.keys(PAGE_META).find(k => pathname.includes(k.replace('/app/', '')));
  const meta = match ? PAGE_META[match] : { title: 'BillBro', subtitle: '' };

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: `${T.bg}E6`, backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${T.surface2}`,
      padding: '22px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 24,
    }}>
      {/* Left: title + subtitle */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 28, color: T.ink, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{meta.title}</div>
        {meta.subtitle && <div style={{ fontFamily: 'Sora', fontSize: 12.5, color: T.muted, fontWeight: 500, marginTop: 2 }}>{meta.subtitle}</div>}
      </div>

      {/* Center: search bar */}
      <div style={{ flex: 1, maxWidth: 480, minWidth: 280 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.muted, pointerEvents: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Ask Bro — 'how much on Grab?'"
            style={{
              width: '100%', padding: '10px 14px 10px 38px',
              borderRadius: 14, border: `1.5px solid ${T.surface2}`,
              background: T.surface2, fontFamily: 'Sora', fontSize: 13.5,
              color: T.ink, outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Right: dark toggle + settings gear */}
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button onClick={toggleDark} aria-label="Toggle dark mode" style={{
          width: 42, height: 42, borderRadius: 14, border: 'none', cursor: 'pointer',
          background: T.surface2, color: T.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {dark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5"/>
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M4.5 19.5l2-2M17.5 6.5l2-2"/>
              </g>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 14.5A8.5 8.5 0 1110 4a7 7 0 0010 10.5z"/>
            </svg>
          )}
        </button>
        <Link href="/settings" style={{
          width: 42, height: 42, borderRadius: 14,
          background: T.surface2, color: T.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
