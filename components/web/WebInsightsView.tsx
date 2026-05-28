'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { TREND_6MO, CATEGORY_BREAKDOWN, availableThisCycle, dailyAllowance } from '@/lib/data';
import { CATEGORIES } from '@/lib/categories';
import { peso } from '@/lib/theme';
import { WalletBro } from '@/components/mascot/WalletBro';

const BRO_TIPS = [
  { icon: '🍔', title: 'Food is your top spend', body: 'You spent ₱6,420 on food — 7% over budget. Try meal prepping 2x a week to save ₱800+.' },
  { icon: '🚗', title: 'Transport under control', body: 'Only ₱1,240 of your ₱3,500 transport budget used. You\'re saving big on commute this month!' },
  { icon: '🛍️', title: 'Shopping spike alert', body: 'Shopping is ₱1,120 over budget. That Shopee haul hit different. Pause one-click buying for a week.' },
  { icon: '💰', title: 'Best savings month yet', body: 'You saved ₱8,045 this May — your highest in 6 months. Keep the streak going, bro!' },
];

export function WebInsightsView() {
  const { T } = useTheme();

  const available = availableThisCycle();
  const daily = dailyAllowance();

  // SVG line chart
  const W = 400, H = 120;
  const maxVal = Math.max(...TREND_6MO.map(d => d.spent));
  const pts = TREND_6MO.map((d, i) => ({
    x: 40 + (i / (TREND_6MO.length - 1)) * (W - 60),
    y: H - 20 - ((d.spent / maxVal) * (H - 40)),
    ...d,
  }));
  const spentPath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const savePts = TREND_6MO.map((d, i) => ({
    x: 40 + (i / (TREND_6MO.length - 1)) * (W - 60),
    y: H - 20 - ((d.saved / maxVal) * (H - 40)),
  }));
  const savedPath = savePts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Donut
  const donutData = CATEGORY_BREAKDOWN.sort((a, b) => b.spent - a.spent);
  const donutTotal = donutData.reduce((s, d) => s + d.spent, 0);
  const R = 52, CX = 65, CY = 65, SW = 16;
  let cumAngle = -Math.PI / 2;
  const donutSlices = donutData.map(({ cat, spent }) => {
    const frac = spent / donutTotal;
    const startAngle = cumAngle;
    cumAngle += frac * 2 * Math.PI;
    const endAngle = cumAngle;
    const x1 = CX + R * Math.cos(startAngle);
    const y1 = CY + R * Math.sin(startAngle);
    const x2 = CX + R * Math.cos(endAngle);
    const y2 = CY + R * Math.sin(endAngle);
    const largeArc = frac > 0.5 ? 1 : 0;
    const d = `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return { d, color: CATEGORIES[cat]?.bg ?? '#ccc', cat, spent };
  });

  return (
    <div style={{ padding: '28px 32px 40px', display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Hero card */}
      <div style={{
        background: `linear-gradient(135deg, ${T.accent}22, ${T.pop}11)`,
        borderRadius: 20, padding: '24px 28px',
        border: `1.5px solid ${T.accent}33`, boxShadow: T.cardShadow,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <WalletBro expression="celebrate" size={90} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: T.ink, marginBottom: 8 }}>
            You saved ₱8,045 more than April 🎉
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'Available now', value: peso(available, { compact: true }) },
              { label: 'Daily allowance', value: `${peso(daily)}/day` },
              { label: 'Saved vs last month', value: '+₱8,045' },
            ].map(chip => (
              <div key={chip.label} style={{ background: T.surface, borderRadius: 12, padding: '8px 14px', border: `1px solid ${T.surface2}` }}>
                <div style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted, fontWeight: 600 }}>{chip.label}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 700, color: T.ink }}>{chip.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend chart + donut */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        {/* Line chart */}
        <div style={{ background: T.surface, borderRadius: 20, padding: 22, border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: T.ink, marginBottom: 16 }}>6-month trend</div>
          <svg width="100%" viewBox={`0 0 ${W} ${H + 30}`} style={{ overflow: 'visible', display: 'block' }}>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1].map(f => {
              const y = H - 20 - f * (H - 40);
              return <line key={f} x1={40} y1={y} x2={W - 20} y2={y} stroke={T.surface2} strokeWidth={1} />;
            })}
            {/* Spent line */}
            <path d={spentPath} stroke={T.accent} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Saved line */}
            <path d={savedPath} stroke={T.good} strokeWidth={2} fill="none" strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Data points */}
            {pts.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={4} fill={T.accent} stroke={T.surface} strokeWidth={2} />
                <text x={p.x} y={H + 10} textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="11" fill={T.muted}>{p.m}</text>
              </g>
            ))}
          </svg>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 16, height: 2.5, background: T.accent, borderRadius: 2 }} />
              <span style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted }}>Spent</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 16, height: 2, background: T.good, borderRadius: 2 }} />
              <span style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted }}>Saved</span>
            </div>
          </div>
        </div>

        {/* Donut */}
        <div style={{ background: T.surface, borderRadius: 20, padding: 22, border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: T.ink, marginBottom: 14 }}>Spending mix</div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <svg width="130" height="130" viewBox="0 0 130 130" style={{ flexShrink: 0 }}>
              {donutSlices.map((sl, i) => <path key={i} d={sl.d} fill={sl.color} opacity={0.9} />)}
              <circle cx={CX} cy={CY} r={R - SW} fill={T.surface} />
              <text x={CX} y={CY + 5} textAnchor="middle" fontFamily="Fraunces, serif" fontSize="12" fontWeight="700" fill={T.ink}>{peso(donutTotal, { compact: true })}</text>
            </svg>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {donutSlices.slice(0, 5).map(sl => (
                <div key={sl.cat} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 9, height: 9, borderRadius: 3, background: sl.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, fontFamily: 'Sora', fontSize: 11.5, color: T.ink2 }}>{CATEGORIES[sl.cat]?.label}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: T.ink }}>{peso(sl.spent, { compact: true })}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bro's tips 2-col grid */}
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: T.ink, marginBottom: 14 }}>Bro&apos;s tips</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {BRO_TIPS.map(tip => (
            <div key={tip.title} style={{ background: T.surface, borderRadius: 18, padding: '18px 20px', border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{tip.icon}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: T.ink, marginBottom: 6 }}>{tip.title}</div>
              <div style={{ fontFamily: 'Sora', fontSize: 13, color: T.ink2, lineHeight: 1.55 }}>{tip.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
