'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { SAMPLE_TXNS } from '@/lib/data';
import { CATEGORIES, CategoryIcon } from '@/lib/categories';
import { peso } from '@/lib/theme';
import { WalletBro } from '@/components/mascot/WalletBro';
import { Header } from '@/components/ui/Header';
import { Card, Pill } from '@/components/ui/Card';

function TxnRow({ t, divider }: { t: typeof SAMPLE_TXNS[number]; divider?: boolean }) {
  const { T } = useTheme();
  const isInflow = t.amount > 0;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
      borderBottom: divider ? `1px solid ${T.surface2}` : 'none',
    }}>
      <CategoryIcon category={t.category} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 14, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.merchant}</div>
        <div style={{ fontSize: 11.5, color: T.muted, fontFamily: 'Sora', fontWeight: 500 }}>{CATEGORIES[t.category]?.label} · {t.time}</div>
      </div>
      <div style={{
        fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 15,
        color: isInflow ? T.good : T.ink, letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
      }}>{isInflow ? '+' : '−'}{peso(Math.abs(t.amount))}</div>
    </div>
  );
}

export function TransactionsScreen() {
  const { T } = useTheme();
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');

  // Group by date.day
  const grouped = SAMPLE_TXNS.reduce<Record<string, typeof SAMPLE_TXNS>>((acc, t) => {
    if (filter === 'in' && t.amount < 0) return acc;
    if (filter === 'out' && t.amount > 0) return acc;
    if (search && !t.merchant.toLowerCase().includes(search.toLowerCase())) return acc;
    (acc[t.day] = acc[t.day] || []).push(t);
    return acc;
  }, {});

  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 110 }}>
      <Header subtitle="May 2026 · 32 transactions" title="Activity" />

      {/* Search bar with WalletBro */}
      <div style={{ padding: '4px 18px 14px' }}>
        <div style={{
          background: T.surface, borderRadius: 18, padding: '4px 14px 4px 4px',
          display: 'flex', alignItems: 'center', gap: 10, boxShadow: T.cardShadow,
          border: `1px solid ${T.surface2}`,
        }}>
          <div style={{ flexShrink: 0, width: 50, height: 50, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ transform: 'scale(0.6) translateY(-4px)' }}>
              <WalletBro expression="coaching" size={70} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} />
            </div>
          </div>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Ask Bro — 'how much on Grab?'"
            style={{
              flex: 1, border: 'none', background: 'none', outline: 'none',
              fontFamily: 'Sora', fontSize: 14, color: T.ink, fontWeight: 500,
              padding: '12px 0',
            }}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" />
          </svg>
        </div>
      </div>

      {/* Month filter w/ swipe hint */}
      <div style={{ padding: '0 18px 14px', position: 'relative' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none' }}>
          {['Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
            <button key={m} style={{
              padding: '8px 18px', borderRadius: 14, border: 'none',
              background: m === 'May' ? T.ink : T.surface,
              color: m === 'May' ? T.bg : T.ink2,
              fontFamily: 'Sora', fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
              boxShadow: m === 'May' ? T.cardShadow : 'none',
            }}>{m} {m === 'May' ? '2026' : ''}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 4, color: T.muted, fontSize: 10, fontFamily: 'Sora', fontWeight: 500 }}>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor"><path d="M1 5h10M8 1l3 4-3 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>swipe to change month</span>
        </div>
      </div>

      {/* Type filter chips */}
      <div style={{ padding: '0 18px 12px', display: 'flex', gap: 8 }}>
        <Pill active={filter === 'all'} onClick={() => setFilter('all')}>All</Pill>
        <Pill active={filter === 'in'}  onClick={() => setFilter('in')}  color={T.good}>↓ Inflow</Pill>
        <Pill active={filter === 'out'} onClick={() => setFilter('out')} color={T.pop}>↑ Outflow</Pill>
      </div>

      {/* Grouped list */}
      <div style={{ padding: '0 18px' }}>
        {Object.entries(grouped).map(([day, items]) => (
          <div key={day} style={{ marginBottom: 14 }}>
            {/* illustrated divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 4px 8px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.accent }} />
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 12, color: T.ink2, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{day}</div>
              <div style={{ flex: 1, height: 1, background: `repeating-linear-gradient(90deg, ${T.muted}55 0 4px, transparent 4px 8px)` }} />
              <div style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 11.5, color: T.muted }}>
                {(() => {
                  const sum = items.reduce((s, t) => s + t.amount, 0);
                  return (sum >= 0 ? '+' : '−') + peso(Math.abs(sum));
                })()}
              </div>
            </div>
            <Card style={{ overflow: 'hidden' }}>
              {items.map((t, i) => (
                <TxnRow key={t.id} t={t} divider={i < items.length - 1} />
              ))}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
