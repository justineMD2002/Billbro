'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { createClient } from '@/lib/supabase/client';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export function Header({ title, subtitle, right }: HeaderProps) {
  const { T, dark, toggleDark } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="flex items-end justify-between gap-[10px] md:[padding-top:32px]!" style={{ padding: 'calc(env(safe-area-inset-top, 44px) + 20px) 22px 12px' }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontFamily: 'Sora, system-ui', fontWeight: 500, fontSize: 13, color: T.muted, letterSpacing: '0.02em' }}>{subtitle}</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 26, color: T.ink, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{title}</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {right}
        <div ref={ref} style={{ position: 'relative' }}>
          <button onClick={() => setOpen(v => !v)} aria-label="Settings" style={{
            width: 40, height: 40, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: open ? `${T.accent}22` : T.surface2, color: T.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
            </svg>
          </button>

          {open && (
            <div style={{
              position: 'absolute', right: 0, top: '110%', zIndex: 200,
              background: T.surface, borderRadius: 16, boxShadow: T.cardShadow,
              border: `1px solid ${T.surface2}`, minWidth: 200, overflow: 'hidden',
            }}>
              <button onClick={toggleDark} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                cursor: 'pointer', fontFamily: 'Sora', fontSize: 14, fontWeight: 600,
                color: T.ink, background: 'none', border: 'none', width: '100%',
                borderBottom: `1px solid ${T.surface2}`,
              }}>
                {dark ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="5" />
                    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M4.5 19.5l2-2M17.5 6.5l2-2" />
                    </g>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 14.5A8.5 8.5 0 1110 4a7 7 0 0010 10.5z" />
                  </svg>
                )}
                {dark ? 'Light mode' : 'Dark mode'}
              </button>

              <Link href="/settings" onClick={() => setOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                cursor: 'pointer', fontFamily: 'Sora', fontSize: 14, fontWeight: 600,
                color: T.ink, textDecoration: 'none',
                borderBottom: `1px solid ${T.surface2}`,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Account Settings
              </Link>

              <button onClick={handleLogout} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                cursor: 'pointer', fontFamily: 'Sora', fontSize: 14, fontWeight: 600,
                color: '#E53935', background: 'none', border: 'none', width: '100%',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
