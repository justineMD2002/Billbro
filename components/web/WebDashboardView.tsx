'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import {
  SALARY, LOANS, RECURRING, BUDGETS, SAMPLE_TXNS,
  committedMonthly, budgetSpent, daysLeftInCycle, dailyAllowance,
} from '@/lib/data';
import { CATEGORIES, CategoryIcon } from '@/lib/categories';
import { peso } from '@/lib/theme';
import { WalletBro } from '@/components/mascot/WalletBro';

function WCard({ children, style = {}, pad = 22 }: { children: React.ReactNode; style?: React.CSSProperties; pad?: number }) {
  const { T } = useTheme();
  return (
    <div style={{
      background: T.surface, borderRadius: 20, padding: pad,
      border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow,
      ...style,
    }}>
      {children}
    </div>
  );
}

function StatTile({ label, value, unit, sub }: { label: string; value: string; unit?: string; sub?: string }) {
  const { T } = useTheme();
  return (
    <WCard pad={16}>
      <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 26, color: T.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
        {unit && <div style={{ fontFamily: 'Sora', fontSize: 12, color: T.muted }}>{unit}</div>}
      </div>
      {sub && <div style={{ fontFamily: 'Sora', fontSize: 11.5, color: T.muted, marginTop: 4 }}>{sub}</div>}
    </WCard>
  );
}

export function WebDashboardView() {
  const { T } = useTheme();

  const cycleProgress = SALARY.daysIn / SALARY.cycleDays;
  const daysLeft = daysLeftInCycle();
  const committed = committedMonthly();
  const spentBudgets = budgetSpent();
  const remaining = SALARY.amount - committed - spentBudgets;
  const daily = dailyAllowance();
  const overBudgets = BUDGETS.filter(b => b.spent > b.monthly);
  const heroMood = remaining > 12000 ? 'hyped' : remaining > 5000 ? 'happy' : remaining > 0 ? 'sus' : 'worried';
  const totalBudget = BUDGETS.reduce((s, b) => s + b.monthly, 0);
  const budgetUsedPct = Math.round((spentBudgets / totalBudget) * 100);

  // Donut chart data from SAMPLE_TXNS
  const catTotals: Record<string, number> = {};
  for (const t of SAMPLE_TXNS) {
    if (t.amount < 0) {
      catTotals[t.category] = (catTotals[t.category] ?? 0) + Math.abs(t.amount);
    }
  }
  const donutData = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  const donutTotal = donutData.reduce((s, [, v]) => s + v, 0);

  // SVG donut
  const R = 64, CX = 80, CY = 80, SW = 20;
  const circumference = 2 * Math.PI * R;
  let cumAngle = -Math.PI / 2;
  const donutSlices = donutData.map(([cat, val]) => {
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
    const c = CATEGORIES[cat];
    return { d, color: c?.bg ?? '#ccc', cat, val, frac };
  });

  return (
    <div style={{ padding: '28px 32px 40px', display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Row 1: Salary hero + stat tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        {/* Salary hero */}
        <div style={{
          borderRadius: 20, padding: '22px 24px 20px',
          background: `linear-gradient(135deg, ${T.accent} 0%, ${T.accentDeep} 60%, ${T.pop} 130%)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
          boxShadow: `0 18px 40px ${T.accent}44`,
        }}>
          <div aria-hidden style={{ position: 'absolute', top: -30, right: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', filter: 'blur(28px)' }} />
          <div style={{ position: 'absolute', top: 10, right: 12 }}>
            <WalletBro expression={heroMood} size={90} accent="#FFF3DC" accentDark="#FFD0A8" pop="#FF7A45" />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.85, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
            Salary cycle · Day {SALARY.daysIn}/{SALARY.cycleDays}
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 13, opacity: 0.85, fontStyle: 'italic' }}>Left to spend</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
            <span style={{ fontSize: 22, fontWeight: 500 }}>₱</span>{remaining.toLocaleString('en-PH')}
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ height: 10, borderRadius: 99, background: 'rgba(255,255,255,0.22)', overflow: 'hidden' }}>
              <div style={{ width: `${cycleProgress * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FFF1DA, #fff)', borderRadius: 99 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, opacity: 0.85, fontFamily: 'Sora', fontWeight: 600 }}>
              <span>May 26 · payday</span>
              <span>Jun 26 · next ₱{SALARY.amount.toLocaleString('en-PH')}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <div style={{ flex: 1, padding: '10px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.18)' }}>
              <div style={{ fontSize: 10, opacity: 0.85, fontFamily: 'Sora', fontWeight: 600, letterSpacing: '0.04em' }}>DAILY ALLOWANCE</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700 }}>{peso(daily)}<span style={{ fontSize: 11, opacity: 0.7 }}>/day</span></div>
            </div>
            <div style={{ flex: 1, padding: '10px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.18)' }}>
              <div style={{ fontSize: 10, opacity: 0.85, fontFamily: 'Sora', fontWeight: 600, letterSpacing: '0.04em' }}>DAYS LEFT</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700 }}>{daysLeft}<span style={{ fontSize: 11, opacity: 0.7 }}> days</span></div>
            </div>
          </div>
        </div>

        {/* 2×2 stat tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14 }}>
          <StatTile label="Daily allowance" value={peso(daily)} sub="per day remaining" />
          <StatTile label="Saved vs April" value="+₱8,045" sub="ahead of last month" />
          <StatTile label="Locked in/mo" value={peso(committed, { compact: true })} sub="loans + recurring" />
          <StatTile label="Budgets used" value={`${budgetUsedPct}%`} sub={`${overBudgets.length} envelopes over`} />
        </div>
      </div>

      {/* Row 2: Bro's plan banner */}
      <WCard style={{ display: 'flex', alignItems: 'center', gap: 16, borderLeft: `4px solid ${T.pop}`, padding: '16px 20px' }}>
        <div style={{ flexShrink: 0 }}>
          <WalletBro expression={overBudgets.length ? 'sus' : 'coaching'} size={72} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px', borderRadius: 999, background: `${T.pop}1A`, color: T.pop, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
            🧠 Bro&apos;s plan
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500, color: T.ink, lineHeight: 1.4 }}>
            Stick to <b style={{ color: T.accent }}>{peso(daily)}/day</b> and you&apos;ll cruise to June 26 with <b style={{ color: T.good }}>₱{Math.max(0, remaining - daily * daysLeft).toLocaleString('en-PH')}</b> spare.{' '}
            {overBudgets.length > 0 && <>You&apos;re <b style={{ color: T.bad }}>over on {CATEGORIES[overBudgets[0].cat]?.label}</b> — cool it for a week, bro.</>}
          </div>
        </div>
        <button style={{
          padding: '10px 18px', borderRadius: 12, border: 'none', cursor: 'pointer',
          background: `${T.pop}18`, color: T.pop, fontFamily: 'Sora', fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>
          See full plan →
        </button>
      </WCard>

      {/* Row 3: Donut + Budget envelopes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Donut chart */}
        <WCard>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: T.ink, marginBottom: 16 }}>Where it went</div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
              {donutSlices.map((sl, i) => (
                <path key={i} d={sl.d} fill={sl.color} opacity={0.9} />
              ))}
              <circle cx={CX} cy={CY} r={R - SW} fill={T.surface} />
              <text x={CX} y={CY - 6} textAnchor="middle" fontFamily="Fraunces, serif" fontSize="14" fontWeight="700" fill={T.ink}>
                {peso(donutTotal, { compact: true })}
              </text>
              <text x={CX} y={CY + 12} textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="10" fill={T.muted}>
                total spent
              </text>
            </svg>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {donutSlices.slice(0, 6).map(sl => (
                <div key={sl.cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: sl.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, fontFamily: 'Sora', fontSize: 12, color: T.ink2 }}>{CATEGORIES[sl.cat]?.label ?? sl.cat}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: T.ink }}>{peso(sl.val, { compact: true })}</div>
                </div>
              ))}
            </div>
          </div>
        </WCard>

        {/* Budget envelopes */}
        <WCard>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: T.ink, marginBottom: 16 }}>Budget envelopes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {BUDGETS.map(b => {
              const cat = CATEGORIES[b.cat];
              const ratio = b.spent / b.monthly;
              const over = ratio > 1;
              return (
                <div key={b.cat}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                    <CategoryIcon category={b.cat} size={26} />
                    <div style={{ flex: 1, fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: T.ink }}>{cat?.label}</div>
                    <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 700, color: over ? T.bad : T.ink2 }}>
                      {peso(b.spent)} <span style={{ color: T.muted, fontWeight: 400 }}>/ {peso(b.monthly)}</span>
                    </div>
                  </div>
                  <div style={{ height: 7, borderRadius: 99, background: T.surface2, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(ratio, 1) * 100}%`, height: '100%', borderRadius: 99, background: over ? T.bad : cat?.bg }} />
                  </div>
                </div>
              );
            })}
          </div>
        </WCard>
      </div>

      {/* Row 4: Loans + Recent activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 20 }}>
        {/* Loans */}
        <WCard>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: T.ink, marginBottom: 14 }}>Active loans</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {LOANS.map(loan => {
              const pct = loan.paidMonths / loan.totalMonths;
              const remainingBalance = loan.monthly * (loan.totalMonths - loan.paidMonths);
              return (
                <div key={loan.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <CategoryIcon category={loan.cat} size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: T.ink }}>{loan.name}</div>
                      <div style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted }}>Month {loan.paidMonths}/{loan.totalMonths}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 700, color: T.ink }}>−{peso(loan.monthly)}</div>
                      <div style={{ fontFamily: 'Sora', fontSize: 10.5, color: T.muted }}>{peso(remainingBalance, { compact: true })} left</div>
                    </div>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: T.surface2, overflow: 'hidden' }}>
                    <div style={{ width: `${pct * 100}%`, height: '100%', background: `linear-gradient(90deg, ${T.accent}, ${T.good})`, borderRadius: 99 }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 14, borderTop: `1px solid ${T.surface2}`, paddingTop: 12 }}>
            <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8 }}>Recurring bills</div>
            {RECURRING.map(r => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: `1px solid ${T.surface2}` }}>
                <CategoryIcon category={r.cat} size={28} />
                <div style={{ flex: 1, fontFamily: 'Sora', fontSize: 12, color: T.ink }}>{r.name}</div>
                <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: T.ink }}>−{peso(r.monthly)}</div>
              </div>
            ))}
          </div>
        </WCard>

        {/* Recent activity */}
        <WCard>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: T.ink, marginBottom: 14 }}>Recent activity</div>
          <div>
            {SAMPLE_TXNS.slice(0, 6).map((t, i) => {
              const isInflow = t.amount > 0;
              return (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 5 ? `1px solid ${T.surface2}` : 'none' }}>
                  <CategoryIcon category={t.category} size={36} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Sora', fontSize: 13.5, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.merchant}</div>
                    <div style={{ fontFamily: 'Sora', fontSize: 11.5, color: T.muted }}>{CATEGORIES[t.category]?.label} · {t.time}</div>
                  </div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600, color: isInflow ? T.good : T.ink, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                    {isInflow ? '+' : '−'}{peso(Math.abs(t.amount))}
                  </div>
                </div>
              );
            })}
          </div>
        </WCard>
      </div>
    </div>
  );
}
