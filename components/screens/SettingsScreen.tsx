'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { Card, SectionLabel } from '@/components/ui/Card';
import { THEMES, type PaletteKey } from '@/lib/theme';

const PALETTE_SWATCHES: Record<PaletteKey, { accent: string; pop: string }> = {
  surprise: { accent: '#A88BFF', pop: '#FF7A45' },
  sunset:   { accent: '#FF6B85', pop: '#FFB347' },
  tropical: { accent: '#16C5A8', pop: '#FF4F92' },
};

const PALETTE_KEYS: PaletteKey[] = ['surprise', 'sunset', 'tropical'];

export function SettingsScreen() {
  const { T, dark, toggleDark, paletteKey, changePalette } = useTheme();
  const router = useRouter();

  const [name, setName] = useState('Jamie Cruz');
  const [email, setEmail] = useState('jamie@example.com');
  const [toast, setToast] = useState('');

  function handleChangePassword() {
    setToast('Password changed!');
    setTimeout(() => setToast(''), 2800);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 12,
    border: `1.5px solid ${T.surface2}`, background: T.bg2,
    fontFamily: 'Sora', fontSize: 14, color: T.ink, outline: 'none',
  };

  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 110 }}>
      {/* Header */}
      <div className="screen-header" style={{ padding: 'calc(env(safe-area-inset-top, 44px) + 20px) 22px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => router.back()} style={{
          width: 38, height: 38, borderRadius: 12, border: 'none', cursor: 'pointer',
          background: T.surface2, color: T.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 24, color: T.ink, letterSpacing: '-0.02em' }}>Account Settings</div>
          <div style={{ fontFamily: 'Sora', fontWeight: 500, fontSize: 12, color: T.muted }}>Profile & preferences</div>
        </div>
      </div>

      <div style={{ padding: '0 18px' }}>
        {/* Profile section */}
        <div style={{ marginBottom: 8, padding: '4px 4px' }}>
          <SectionLabel>Profile</SectionLabel>
        </div>
        <Card style={{ padding: '18px 16px', marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>
          <button onClick={handleChangePassword} style={{
            padding: '12px 16px', borderRadius: 12,
            background: `${T.accent}18`, color: T.accent,
            border: `1.5px solid ${T.accent}44`, cursor: 'pointer',
            fontFamily: 'Sora', fontSize: 14, fontWeight: 700,
            textAlign: 'left',
          }}>
            Change Password
          </button>
        </Card>

        {/* Appearance section */}
        <div style={{ marginBottom: 8, padding: '4px 4px' }}>
          <SectionLabel>Appearance</SectionLabel>
        </div>
        <Card style={{ padding: '4px 0', marginBottom: 18, overflow: 'hidden' }}>
          {PALETTE_KEYS.map((key, i) => {
            const swatch = PALETTE_SWATCHES[key];
            const isActive = paletteKey === key;
            return (
              <button key={key} onClick={() => changePalette(key)} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', width: '100%',
                background: isActive ? `${T.accent}14` : 'none',
                border: 'none', borderBottom: i < PALETTE_KEYS.length - 1 ? `1px solid ${T.surface2}` : 'none',
                cursor: 'pointer', textAlign: 'left',
                outline: isActive ? `1.5px solid ${T.accent}` : 'none',
              }}>
                {/* Color swatch */}
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: swatch.accent }} />
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: swatch.pop }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Sora', fontSize: 14, fontWeight: 600, color: T.ink }}>{THEMES[key].name}</div>
                </div>
                {isActive && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                )}
              </button>
            );
          })}
        </Card>

        {/* Dark mode toggle */}
        <Card style={{ padding: '0', marginBottom: 18, overflow: 'hidden' }}>
          <button onClick={toggleDark} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.ink }}>
              {dark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="5" />
                  <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M4.5 19.5l2-2M17.5 6.5l2-2" />
                  </g>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 14.5A8.5 8.5 0 1110 4a7 7 0 0010 10.5z" />
                </svg>
              )}
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontFamily: 'Sora', fontSize: 14, fontWeight: 600, color: T.ink }}>{dark ? 'Dark mode' : 'Light mode'}</div>
              <div style={{ fontFamily: 'Sora', fontSize: 12, color: T.muted }}>Currently {dark ? 'on' : 'off'}</div>
            </div>
            {/* Toggle pill */}
            <div style={{
              width: 44, height: 26, borderRadius: 99,
              background: dark ? T.accent : T.surface2,
              position: 'relative', transition: 'background 0.2s',
            }}>
              <div style={{
                position: 'absolute', top: 3, left: dark ? 21 : 3,
                width: 20, height: 20, borderRadius: 99,
                background: '#fff', transition: 'left 0.2s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
              }} />
            </div>
          </button>
        </Card>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)',
          background: T.good, color: '#fff', padding: '10px 20px', borderRadius: 99,
          fontFamily: 'Sora', fontSize: 14, fontWeight: 700, zIndex: 1000,
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
