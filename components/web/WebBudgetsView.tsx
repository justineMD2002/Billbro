'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { BUDGETS } from '@/lib/data';
import { CATEGORIES, CategoryIcon } from '@/lib/categories';
import { peso } from '@/lib/theme';
import { WalletBro } from '@/components/mascot/WalletBro';

export function WebBudgetsView() {
  const { T } = useTheme();
  const overBudgets = BUDGETS.filter(b => b.spent > b.monthly);
  const broMood = overBudgets.length === 0 ? 'hyped' : overBudgets.length === 1 ? 'sus' : 'worried';
  const totalBudget = BUDGETS.reduce((s, b) => s + b.monthly, 0);
  const totalSpent = BUDGETS.reduce((s, b) => s + b.spent, 0);

  // Donut data
  const donutData = BUDGETS.map(b => ({ cat: b.cat, val: b.spent })).sort((a, b) => b.val - a.val);
  const donutTotal = donutData.reduce((s, d) => s + d.val, 0);
  const R = 56, CX = 70, CY = 70, SW = 18;
  let cumAngle = -Math.PI / 2;
  const donutSlices = donutData.map(({ cat, val }) => {
    const frac = val / donutTotal;
    const startAngle = cumAngle;
    cumAngle += frac * 2 * Math.PI;
    const endAngle = cumAngle;
    const x1 = CX + R * Math.cos(startAngle);
    const y1 = CY + R * Math.sin(startAngle);
    const x2 = CX + R * Math.cos(endAngle);
    const y2 = CY + R * Math.sin(endAngle);
    const largeArc = frac > 0.5 ? 1 : 0;
    const d = `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return { d, color: CATEGORIES[cat]?.bg ?? '#ccc', cat, val };
  });

  return (
    <div style={{ padding: '28px 32px 40px', display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Overview row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Bro card */}
        <div style={{ background: T.surface, borderRadius: 20, padding: 22, border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow, display: 'flex', gap: 16, alignItems: 'center' }}>
          <WalletBro expression={broMood} size={80} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: T.ink, marginBottom: 8 }}>Bro&apos;s read</div>
            <div style={{ fontFamily: 'Sora', fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>
              {overBudgets.length === 0
                ? 'All envelopes green 💪 You\'re crushing it this month!'
                : `${overBudgets.length} envelope${overBudgets.length > 1 ? 's' : ''} over budget. Keep tabs on ${CATEGORIES[overBudgets[0].cat]?.label}.`}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
              <div>
                <div style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted, fontWeight: 600 }}>Total budget</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: T.ink }}>{peso(totalBudget)}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted, fontWeight: 600 }}>Spent so far</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: T.ink }}>{peso(totalSpent)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Donut allocation */}
        <div style={{ background: T.surface, borderRadius: 20, padding: 22, border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: T.ink, marginBottom: 14 }}>Spending allocation</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ flexShrink: 0 }}>
              {donutSlices.map((sl, i) => <path key={i} d={sl.d} fill={sl.color} opacity={0.9} />)}
              <circle cx={CX} cy={CY} r={R - SW} fill={T.surface} />
              <text x={CX} y={CY + 5} textAnchor="middle" fontFamily="Fraunces, serif" fontSize="13" fontWeight="700" fill={T.ink}>{peso(donutTotal, { compact: true })}</text>
            </svg>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {donutSlices.map(sl => (
                <div key={sl.cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 9, height: 9, borderRadius: 3, background: sl.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, fontFamily: 'Sora', fontSize: 12, color: T.ink2 }}>{CATEGORIES[sl.cat]?.label}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: T.ink }}>{Math.round((sl.val / donutTotal) * 100)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3-column budget cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {BUDGETS.map(b => {
          const cat = CATEGORIES[b.cat];
          const ratio = b.spent / b.monthly;
          const over = ratio > 1;
          const left = b.monthly - b.spent;
          return (
            <div key={b.cat} style={{ background: T.surface, borderRadius: 20, padding: 20, border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <CategoryIcon category={b.cat} size={40} />
                <div>
                  <div style={{ fontFamily: 'Sora', fontSize: 14, fontWeight: 700, color: T.ink }}>{cat?.label}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted }}>{peso(b.spent)} of {peso(b.monthly)}</div>
                </div>
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: over ? T.bad : T.ink, letterSpacing: '-0.02em', marginBottom: 10 }}>
                {Math.round(ratio * 100)}%
              </div>
              <div style={{ height: 8, borderRadius: 99, background: T.surface2, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ width: `${Math.min(ratio, 1) * 100}%`, height: '100%', borderRadius: 99, background: over ? T.bad : cat?.bg }} />
              </div>
              <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: over ? T.bad : T.good }}>
                {over ? `${peso(Math.abs(left))} over` : `${peso(left)} left`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
