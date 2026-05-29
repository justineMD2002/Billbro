'use client';

import React from 'react';
import { WalletBro } from '@/components/mascot/WalletBro';
import { CategoryIcon, CATEGORIES } from '@/lib/categories';
import { peso } from '@/lib/theme';

const T = {
  bg: '#EEFBF8',
  surface: '#FFFFFF',
  surface2: '#E5F8F2',
  ink: '#0E2F2A',
  ink2: '#2A5C53',
  muted: '#73968E',
  accent: '#16C5A8',
  accentDeep: '#0E9A82',
  pop: '#FF4F92',
  good: '#16C5A8',
  cardShadow: '0 10px 30px rgba(14, 154, 130, 0.10), 0 2px 6px rgba(14, 47, 42, 0.05)',
};

function NavIconMini({ icon, active }: { icon: string; active: boolean }) {
  const c = {
    width: 18, height: 18, viewBox: '0 0 24 24',
    fill: active ? 'currentColor' : 'none',
    stroke: 'currentColor', strokeWidth: 2.2,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  };
  switch (icon) {
    case 'home': return <svg {...c}><path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2v-9z"/></svg>;
    case 'list': return <svg {...c} fill="none"><path d="M8 6h13M8 12h13M8 18h13"/></svg>;
    case 'chart': return <svg {...c} fill="none"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>;
    case 'grid': return <svg {...c} fill="none"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>;
    default: return null;
  }
}

function MiniDashboard() {
  return (
    <div style={{ padding: '46px 14px 14px', display: 'flex', flexDirection: 'column', gap: 10, height: '100%', background: T.bg }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, color: T.muted, fontWeight: 600 }}>May 28 · Thursday</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 600, color: T.ink, letterSpacing: '-0.02em' }}>Sup, Jamie 👋</div>
        </div>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill={T.ink}><path d="M20 14.5A8.5 8.5 0 1110 4a7 7 0 0010 10.5z"/></svg>
        </div>
      </div>

      <div style={{ borderRadius: 16, padding: '13px 15px', color: '#fff', position: 'relative', overflow: 'hidden', background: `linear-gradient(120deg, ${T.accent}, ${T.accentDeep} 60%, ${T.pop} 130%)` }}>
        <div style={{ position: 'absolute', top: 4, right: 4 }}>
          <WalletBro expression="hyped" size={50} accent="#C7F8EF" accentDark="#A0F0E0" pop="#FF4F92" animated={false} />
        </div>
        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.9, textTransform: 'uppercase' }}>Salary cycle · day 3/30</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 11, fontStyle: 'italic', opacity: 0.9, marginTop: 4 }}>Left to spend</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>₱15,292</div>
        <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.25)', marginTop: 9, overflow: 'hidden' }}>
          <div style={{ width: '10%', height: '100%', background: '#fff', borderRadius: 99 }} />
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 9 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.18)', borderRadius: 9, padding: '5px 8px' }}>
            <div style={{ fontSize: 7, opacity: 0.85, fontWeight: 600 }}>DAILY</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 700 }}>₱566</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.18)', borderRadius: 9, padding: '5px 8px' }}>
            <div style={{ fontSize: 7, opacity: 0.85, fontWeight: 600 }}>DAYS LEFT</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 700 }}>27</div>
          </div>
        </div>
      </div>

      <div style={{ background: T.surface, borderRadius: 14, padding: '8px 8px 8px 0', display: 'flex', alignItems: 'center', gap: 2, border: `1px dashed ${T.pop}44`, boxShadow: T.cardShadow }}>
        <div style={{ flexShrink: 0, marginLeft: -6 }}>
          <WalletBro expression="coaching" size={50} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} animated={false} />
        </div>
        <div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 7, fontWeight: 700, color: T.pop, letterSpacing: '0.06em', textTransform: 'uppercase' }}>🧠 Bro&apos;s plan</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 10.5, fontWeight: 500, color: T.ink, lineHeight: 1.25, marginTop: 1 }}>
            Stick to <b style={{ color: T.accent }}>₱566/day</b> and you&apos;ll cruise to payday with <b style={{ color: T.good }}>₱14K</b> spare.
          </div>
        </div>
      </div>

      <div style={{ background: T.surface, borderRadius: 14, overflow: 'hidden', boxShadow: T.cardShadow }}>
        {([
          { c: 'food', m: 'Jollibee · BGC', a: -385 },
          { c: 'transport', m: 'Grab · office', a: -240 },
          { c: 'salary', m: 'Acme · Payroll', a: 55000 },
        ] as const).map((tx, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderBottom: i < 2 ? `1px solid ${T.surface2}` : 'none' }}>
            <CategoryIcon category={tx.c} size={26} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.m}</div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 8, color: T.muted }}>{CATEGORIES[tx.c]?.label}</div>
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 11, fontWeight: 600, color: tx.a > 0 ? T.good : T.ink }}>
              {tx.a > 0 ? '+' : '−'}{peso(Math.abs(tx.a), { compact: true })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', background: T.surface, borderRadius: 16, padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: T.cardShadow }}>
        {(['home', 'list', 'add', 'chart', 'grid'] as const).map((ic, i) => ic === 'add' ? (
          <div key={i} style={{ width: 32, height: 32, borderRadius: 11, background: `linear-gradient(135deg, ${T.pop}, ${T.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-8px)', boxShadow: `0 6px 12px ${T.accent}66` }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </div>
        ) : (
          <div key={i} style={{ width: 18, height: 18, color: i === 0 ? T.accent : T.muted }}>
            <NavIconMini icon={ic} active={i === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhoneMock({ w = 272 }: { w?: number }) {
  const h = w * 2.06;
  return (
    <div style={{
      width: w, height: h, borderRadius: w * 0.135, background: '#0E0A1F',
      padding: w * 0.028,
      boxShadow: '0 40px 80px rgba(80,50,160,0.35), 0 12px 28px rgba(0,0,0,0.25)',
      position: 'relative', flexShrink: 0,
    }}>
      <div style={{ width: '100%', height: '100%', borderRadius: w * 0.11, background: T.bg, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: w * 0.04, left: '50%', transform: 'translateX(-50%)', width: w * 0.3, height: w * 0.08, background: '#0E0A1F', borderRadius: 99, zIndex: 5 }} />
        <MiniDashboard />
      </div>
    </div>
  );
}
