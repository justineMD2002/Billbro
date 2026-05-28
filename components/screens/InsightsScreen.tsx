'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { SALARY, CATEGORY_BREAKDOWN, TREND_6MO, dailyAllowance, daysLeftInCycle, availableThisCycle } from '@/lib/data';
import { CATEGORIES } from '@/lib/categories';
import { peso } from '@/lib/theme';
import { WalletBro } from '@/components/mascot/WalletBro';
import { Header } from '@/components/ui/Header';
import { Card, SectionLabel } from '@/components/ui/Card';

function SuggestionCard({ mood, tag, tagColor, title, body }: {
  mood: string; tag: string; tagColor: string; title: string; body: string;
}) {
  const { T } = useTheme();
  return (
    <Card style={{ padding: '12px 14px 12px 0', display: 'flex', gap: 4, alignItems: 'center' }}>
      <div style={{ flexShrink: 0, marginLeft: -6 }}>
        <WalletBro expression={mood} size={72} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 99, background: `${tagColor}1A`, color: tagColor, fontFamily: 'Sora', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 4 }}>{tag}</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600, color: T.ink, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontFamily: 'Sora', fontSize: 12, color: T.ink2, marginTop: 2, lineHeight: 1.35 }}>{body}</div>
      </div>
    </Card>
  );
}

function TrendChart({ data }: { data: typeof TREND_6MO }) {
  const { T } = useTheme();
  const W = 320, H = 130;
  const PAD_L = 14, PAD_R = 14, PAD_T = 10, PAD_B = 24;
  const innerW = W - PAD_L - PAD_R, innerH = H - PAD_T - PAD_B;
  const max = Math.max(...data.map(d => d.spent));
  const step = innerW / (data.length - 1);

  // smooth spent line
  const smoothPath = data.map((d, i) => {
    const x = PAD_L + i * step;
    const y = PAD_T + innerH - (d.spent / max) * innerH;
    if (i === 0) return `M${x} ${y}`;
    const px = PAD_L + (i - 1) * step;
    const py = PAD_T + innerH - (data[i - 1].spent / max) * innerH;
    const cx1 = px + step * 0.4;
    const cx2 = x - step * 0.4;
    return `C${cx1} ${py}, ${cx2} ${y}, ${x} ${y}`;
  }).join(' ');

  const peakIdx = data.findIndex(d => d.spent === max);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={T.accent} stopOpacity="0.3" />
          <stop offset="1" stopColor={T.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* fill */}
      <path d={`${smoothPath} L ${PAD_L + (data.length - 1) * step} ${PAD_T + innerH} L ${PAD_L} ${PAD_T + innerH} Z`} fill="url(#trendFill)" />
      {/* line */}
      <path d={smoothPath} stroke={T.accent} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* dots */}
      {data.map((d, i) => {
        const x = PAD_L + i * step;
        const y = PAD_T + innerH - (d.spent / max) * innerH;
        const isCurrent = i === data.length - 1;
        return (
          <g key={d.m}>
            <circle cx={x} cy={y} r={isCurrent ? 6 : 3.5} fill={isCurrent ? T.pop : T.accent} stroke={T.surface} strokeWidth={isCurrent ? 3 : 0} />
            <text x={x} y={H - 8} textAnchor="middle" fontFamily="Sora" fontSize="10" fontWeight="600" fill={i === data.length - 1 ? T.ink : T.muted}>{d.m}</text>
          </g>
        );
      })}
      {/* milestone callout — biggest spend month */}
      {peakIdx >= 0 && (() => {
        const x = PAD_L + peakIdx * step;
        const y = PAD_T + innerH - (data[peakIdx].spent / max) * innerH;
        return (
          <g>
            <line x1={x} y1={y - 6} x2={x} y2={y - 18} stroke={T.muted} strokeWidth="1" strokeDasharray="2 2" />
            <rect x={x - 28} y={y - 32} width="56" height="14" rx="7" fill={T.bad} />
            <text x={x} y={y - 22} textAnchor="middle" fontFamily="Sora" fontWeight="700" fontSize="9" fill="#fff">peak · Mar</text>
          </g>
        );
      })()}
      {/* current month label */}
      {(() => {
        const i = data.length - 1;
        const x = PAD_L + i * step;
        const y = PAD_T + innerH - (data[i].spent / max) * innerH;
        return (
          <g>
            <rect x={x - 38} y={y - 24} width="36" height="14" rx="7" fill={T.pop} />
            <text x={x - 20} y={y - 14} textAnchor="middle" fontFamily="Sora" fontWeight="700" fontSize="9" fill="#fff">now</text>
          </g>
        );
      })()}
    </svg>
  );
}

export function InsightsScreen() {
  const { T } = useTheme();

  const donut = CATEGORY_BREAKDOWN.slice(0, 6);
  const total = donut.reduce((s, c) => s + c.spent, 0);

  const R = 70, CX = 90, CY = 90, SW = 22;
  let acc = 0;
  const arcs = donut.map(d => {
    const frac = d.spent / total;
    const start = acc;
    acc += frac;
    return { ...d, start, end: acc };
  });

  const polar = (frac: number, r = R) => {
    const a = frac * Math.PI * 2 - Math.PI / 2;
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
  };
  const arcPath = (s: number, e: number) => {
    const p1 = polar(s), p2 = polar(e);
    const large = e - s > 0.5 ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${R} ${R} 0 ${large} 1 ${p2.x} ${p2.y}`;
  };

  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 110, position: 'relative' }}>
      {/* decorative confetti */}
      <div aria-hidden style={{ position: 'absolute', top: 110, left: 24, width: 6, height: 6, background: T.pop, borderRadius: 2, transform: 'rotate(20deg)' }} />
      <div aria-hidden style={{ position: 'absolute', top: 80, right: 30, width: 8, height: 4, background: T.accent, borderRadius: 2, transform: 'rotate(-15deg)' }} />
      <div aria-hidden style={{ position: 'absolute', top: 140, right: 70, width: 5, height: 5, background: T.good, borderRadius: 99 }} />

      <Header subtitle="May 2026 · Monthly recap" title="Bro's Report" />

      {/* HERO — Mascot presenting */}
      <div style={{ padding: '0 18px 14px' }}>
        <div style={{
          borderRadius: 28, padding: '14px 14px 14px 0',
          background: `linear-gradient(135deg, ${T.surface}, ${T.surface2})`,
          boxShadow: T.cardShadow, display: 'flex', alignItems: 'center', gap: 6,
          position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden style={{ position: 'absolute', top: -30, left: 30, width: 120, height: 200, background: `radial-gradient(ellipse, ${T.pop}33, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ flexShrink: 0, marginLeft: -10 }}>
            <WalletBro expression="celebrate" size={110} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 22, color: T.ink, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              You saved <span style={{ color: T.good }}>₱8,045</span><br />
              more than April 🎉
            </div>
            <div style={{ marginTop: 6, fontFamily: 'Sora', fontSize: 12.5, color: T.ink2, lineHeight: 1.4 }}>
              That&apos;s a <b style={{ color: T.good }}>+49%</b> jump, bro. <br />Keep it locked.
            </div>
          </div>
        </div>
      </div>

      {/* DONUT — Category breakdown */}
      <div style={{ padding: '4px 22px 8px' }}>
        <SectionLabel>Where it went</SectionLabel>
      </div>
      <div style={{ padding: '0 18px 14px' }}>
        <Card style={{ padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ flexShrink: 0, position: 'relative' }}>
            <svg width="180" height="180" viewBox="0 0 180 180">
              <circle cx={CX} cy={CY} r={R} stroke={T.surface2} strokeWidth={SW} fill="none" />
              {arcs.map(a => (
                <path key={a.cat} d={arcPath(a.start + 0.005, a.end - 0.005)}
                  stroke={CATEGORIES[a.cat]?.bg} strokeWidth={SW} fill="none" strokeLinecap="round" />
              ))}
              <text x={CX} y={CY - 4} textAnchor="middle" fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" fill={T.muted} letterSpacing="0.06em">SPENT</text>
              <text x={CX} y={CY + 16} textAnchor="middle" fontFamily="Fraunces, serif" fontSize="22" fontWeight="700" fill={T.ink} letterSpacing="-0.02em">{peso(total, { compact: true })}</text>
            </svg>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {donut.map(d => (
              <div key={d.cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: CATEGORIES[d.cat]?.bg, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 11.5, fontFamily: 'Sora', fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{CATEGORIES[d.cat]?.label}</div>
                <div style={{ fontSize: 10.5, fontFamily: 'Sora', fontWeight: 700, color: T.ink2 }}>{Math.round(d.spent / total * 100)}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* TREND LINE — 6 months */}
      <div style={{ padding: '4px 22px 8px' }}>
        <SectionLabel>6-month trend</SectionLabel>
      </div>
      <div style={{ padding: '0 18px 14px' }}>
        <Card style={{ padding: '16px 14px 10px' }}>
          <TrendChart data={TREND_6MO} />
        </Card>
      </div>

      {/* AI SUGGESTION CARDS */}
      <div style={{ padding: '4px 22px 8px' }}>
        <SectionLabel>Bro&apos;s tips</SectionLabel>
      </div>
      <div style={{ padding: '0 18px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SuggestionCard mood="coaching"
          tag="PLAN" tagColor={T.accent}
          title={`${peso(dailyAllowance())}/day until next payday`}
          body={`After loans + bills + budgets, you've got ${peso(availableThisCycle())} for ${daysLeftInCycle()} days. Stick to it and you'll land June 26 in the green.`} />
        <SuggestionCard mood="sus"
          tag="REVIEW" tagColor={T.pop}
          title="Shopping envelope blown"
          body="₱3,120 spent on a ₱2,000 budget. Skip 2 Shopee orders + 1 coffee/day this week → back on plan." />
        <SuggestionCard mood="hyped"
          tag="WIN" tagColor={T.good}
          title="Transport · ₱2,260 under"
          body="Roll it into savings? Hit the +Save button to lock it before next salary lands." />
        <SuggestionCard mood="coaching"
          tag="TIP" tagColor={T.accent}
          title="50/30/20 rule"
          body={`With ${peso(SALARY.amount)} in: ₱27,500 needs · ₱16,500 wants · ₱11,000 savings. You're tracking ₱8,045 saved → 73% of target.`} />
      </div>
    </div>
  );
}
