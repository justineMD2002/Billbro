'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { SAMPLE_TXNS } from '@/lib/data';
import { CATEGORIES, CategoryIcon } from '@/lib/categories';
import { peso } from '@/lib/theme';

type Filter = 'all' | 'inflow' | 'outflow';

export function WebActivityView() {
  const { T } = useTheme();
  const [filter, setFilter] = useState<Filter>('all');

  const inflow = SAMPLE_TXNS.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const outflow = SAMPLE_TXNS.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  const filtered = SAMPLE_TXNS.filter(t => {
    if (filter === 'inflow') return t.amount > 0;
    if (filter === 'outflow') return t.amount < 0;
    return true;
  });

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px', borderRadius: 99, border: 'none', cursor: 'pointer',
    fontFamily: 'Sora', fontSize: 13, fontWeight: 600,
    background: active ? T.accent : T.surface2,
    color: active ? '#fff' : T.ink2,
    transition: 'all 0.15s',
  });

  return (
    <div style={{ padding: '28px 32px 40px', display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Stat tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Total inflow', value: peso(inflow), color: T.good },
          { label: 'Total outflow', value: peso(outflow), color: T.bad },
          { label: 'Transactions', value: String(SAMPLE_TXNS.length), sub: 'this cycle' },
        ].map(s => (
          <div key={s.label} style={{ background: T.surface, borderRadius: 20, padding: 20, border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow }}>
            <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: s.color ?? T.ink, letterSpacing: '-0.02em' }}>{s.value}</div>
            {s.sub && <div style={{ fontFamily: 'Sora', fontSize: 12, color: T.muted, marginTop: 4 }}>{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Filter chips + table */}
      <div style={{ background: T.surface, borderRadius: 20, border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow, overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 10, padding: '16px 20px', borderBottom: `1px solid ${T.surface2}` }}>
          <button style={chipStyle(filter === 'all')} onClick={() => setFilter('all')}>All</button>
          <button style={chipStyle(filter === 'inflow')} onClick={() => setFilter('inflow')}>↓ Inflow</button>
          <button style={chipStyle(filter === 'outflow')} onClick={() => setFilter('outflow')}>↑ Outflow</button>
        </div>

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '10px 20px', borderBottom: `1px solid ${T.surface2}` }}>
          {['Merchant', 'Category', 'Date', 'Type', 'Amount'].map(h => (
            <div key={h} style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((t, i) => {
          const isInflow = t.amount > 0;
          return (
            <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '12px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${T.surface2}` : 'none', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CategoryIcon category={t.category} size={32} />
                <span style={{ fontFamily: 'Sora', fontSize: 13.5, fontWeight: 600, color: T.ink }}>{t.merchant}</span>
              </div>
              <div style={{ fontFamily: 'Sora', fontSize: 12.5, color: T.ink2 }}>{CATEGORIES[t.category]?.label}</div>
              <div style={{ fontFamily: 'Sora', fontSize: 12.5, color: T.muted }}>{t.time} · {t.day}</div>
              <div>
                <span style={{
                  padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                  background: isInflow ? `${T.good}22` : `${T.bad}18`,
                  color: isInflow ? T.good : T.bad,
                }}>
                  {isInflow ? 'Inflow' : 'Outflow'}
                </span>
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 700, color: isInflow ? T.good : T.ink, letterSpacing: '-0.01em' }}>
                {isInflow ? '+' : '−'}{peso(Math.abs(t.amount))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
