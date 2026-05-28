'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import {
  SALARY, LOANS, RECURRING, BUDGETS, SAMPLE_TXNS,
  committedMonthly, budgetSpent, budgetTotal, daysLeftInCycle, dailyAllowance,
} from '@/lib/data';
import { CATEGORIES, CategoryIcon } from '@/lib/categories';
import { peso } from '@/lib/theme';
import { WalletBro } from '@/components/mascot/WalletBro';
import { NotificationBar } from '@/components/ui/NotificationBar';
import { Header } from '@/components/ui/Header';
import { Card, SectionLabel } from '@/components/ui/Card';

// ── Loan row with progress ─────────────────────────────────────
export function LoanRow({ loan, divider }: { loan: typeof LOANS[number]; divider?: boolean }) {
  const { T } = useTheme();
  const pct = loan.paidMonths / loan.totalMonths;
  const remainingBalance = loan.monthly * (loan.totalMonths - loan.paidMonths);
  return (
    <div style={{
      padding: '12px 16px',
      borderBottom: divider ? `1px solid ${T.surface2}` : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <CategoryIcon category={loan.cat} size={40} />
          <div style={{ position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, borderRadius: 99, background: T.ink, color: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>
            <svg width="9" height="10" viewBox="0 0 10 11" fill="currentColor"><rect x="2" y="5" width="6" height="5" rx="1" /><path d="M3.2 5V3.4a1.8 1.8 0 113.6 0V5" stroke="currentColor" strokeWidth="1.1" fill="none" /></svg>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 13.5, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{loan.name}</div>
          <div style={{ fontSize: 11.5, color: T.muted, fontFamily: 'Sora', fontWeight: 500 }}>
            Month <b style={{ color: T.ink2 }}>{loan.paidMonths}/{loan.totalMonths}</b> · ends {loan.endDate.slice(0, 7)}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 14.5, color: T.ink, letterSpacing: '-0.01em' }}>−{peso(loan.monthly)}</div>
          <div style={{ fontSize: 10.5, color: T.muted, fontFamily: 'Sora', fontWeight: 500 }}>{peso(remainingBalance, { compact: true })} left</div>
        </div>
      </div>
      {/* progress bar */}
      <div style={{ height: 5, borderRadius: 99, background: T.surface2, marginTop: 8, overflow: 'hidden' }}>
        <div style={{ width: `${pct * 100}%`, height: '100%', background: `linear-gradient(90deg, ${T.accent}, ${T.good})`, borderRadius: 99 }} />
      </div>
    </div>
  );
}

// ── Recurring (no end date) row ───────────────────────────────
export function RecurringRow({ item, divider }: { item: typeof RECURRING[number]; divider?: boolean }) {
  const { T } = useTheme();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px',
      borderBottom: divider ? `1px solid ${T.surface2}` : 'none',
    }}>
      <CategoryIcon category={item.cat} size={36} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 13.5, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
        <div style={{ fontSize: 11, color: T.muted, fontFamily: 'Sora', fontWeight: 500 }}>Recurring · due day {item.dueDay}</div>
      </div>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 14.5, color: T.ink, letterSpacing: '-0.01em' }}>−{peso(item.monthly)}</div>
    </div>
  );
}

// ── Budget row with bar ───────────────────────────────────────
export function BudgetRow({ b, last }: { b: typeof BUDGETS[number]; last?: boolean }) {
  const { T } = useTheme();
  const ratio = b.spent / b.monthly;
  const over = ratio > 1;
  const c = CATEGORIES[b.cat];
  return (
    <div style={{ padding: last ? '8px 0 2px' : '8px 0 12px', borderBottom: last ? 'none' : `1px solid ${T.surface2}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <CategoryIcon category={b.cat} size={28} />
        <div style={{ flex: 1, fontFamily: 'Sora', fontWeight: 600, fontSize: 13, color: T.ink }}>{c?.label}</div>
        <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 12, color: over ? T.bad : T.ink2 }}>
          {peso(b.spent)} <span style={{ color: T.muted, fontWeight: 500 }}>/ {peso(b.monthly)}</span>
        </div>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: T.surface2, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          width: `${Math.min(ratio, 1) * 100}%`, height: '100%',
          background: over ? `linear-gradient(90deg, ${c?.bg}, ${T.bad})` : c?.bg,
          borderRadius: 99,
        }} />
        {over && (
          <div style={{
            position: 'absolute', top: 0, right: 0, height: '100%',
            width: `${Math.min((ratio - 1), 0.6) * 80}%`,
            background: `repeating-linear-gradient(45deg, ${T.bad} 0 4px, transparent 4px 8px)`,
            opacity: 0.6,
          }} />
        )}
      </div>
    </div>
  );
}

// Inflow/outflow wave graphic
export function FlowWave({ inflow, outflow }: { inflow?: number; outflow?: number }) {
  const inflowPts = [10, 18, 14, 22, 30, 26, 28];
  const outflowPts = [6, 10, 8, 16, 14, 22, 18];
  const W = 320, H = 50;
  const max = 32;
  const path = (pts: number[], smooth = 0.3) => {
    const step = W / (pts.length - 1);
    let d = `M0 ${H - (pts[0] / max) * H}`;
    for (let i = 1; i < pts.length; i++) {
      const x = i * step;
      const y = H - (pts[i] / max) * H;
      const px = (i - 1) * step;
      const py = H - (pts[i - 1] / max) * H;
      const cx1 = px + step * smooth;
      const cx2 = x - step * smooth;
      d += ` C${cx1} ${py}, ${cx2} ${y}, ${x} ${y}`;
    }
    return d;
  };
  return (
    <svg viewBox={`0 0 ${W} ${H + 6}`} width="100%" height="56" style={{ display: 'block', overflow: 'visible' }}>
      <path d={`${path(inflowPts)} L${W} ${H} L0 ${H} Z`} fill="rgba(255,255,255,0.25)" />
      <path d={path(inflowPts)} stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d={path(outflowPts)} stroke="rgba(255,255,255,0.55)" strokeWidth="2" fill="none" strokeDasharray="4 4" strokeLinecap="round" />
      <circle cx={W} cy={H - (inflowPts[6] / max) * H} r="4" fill="#fff" />
    </svg>
  );
}

// ── Transaction row ────────────────────────────────────────────
export function TxnRow({ t, divider }: { t: typeof SAMPLE_TXNS[number]; divider?: boolean }) {
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

// ════════════════════════════════════════════════════════════
// DASHBOARD SCREEN
// ════════════════════════════════════════════════════════════
export interface DashboardScreenProps {
  onNav?: (id: string) => void;
  openSheet?: () => void;
}

export function DashboardScreen({ onNav, openSheet }: DashboardScreenProps) {
  const { T } = useTheme();

  const cycleProgress = SALARY.daysIn / SALARY.cycleDays;
  const daysLeft = daysLeftInCycle();
  const committed = committedMonthly();
  const spentBudgets = budgetSpent();
  const remaining = SALARY.amount - committed - spentBudgets;
  const daily = dailyAllowance();

  const heroMood = remaining > 12000 ? 'hyped' : remaining > 5000 ? 'happy' : remaining > 0 ? 'sus' : 'worried';
  const overBudgets = BUDGETS.filter(b => b.spent > b.monthly);

  return (
    <div className="dash-screen" style={{ background: T.bg, minHeight: '100%', paddingBottom: 110, position: 'relative', overflow: 'hidden' }}>
      {/* decorative blob */}
      <div aria-hidden style={{
        position: 'absolute', top: -40, right: -60, width: 220, height: 220,
        background: `radial-gradient(circle, ${T.accent}33, transparent 70%)`,
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <Header
        subtitle="May 28 · Thursday"
        title="Sup, Jamie 👋"
      />

      {/* NOTIFICATION BAR */}
      <NotificationBar T={T} />

      {/* ── Desktop: 2-column grid; Mobile: stack ── */}
      <div className="dash-grid">

      {/* ── LEFT COLUMN ── */}
      <div className="dash-col-a">

      {/* SALARY CYCLE CARD (hero) */}
      <div style={{ padding: '0 18px 14px' }}>
        <div style={{
          borderRadius: 28, padding: '20px 22px 18px',
          background: `linear-gradient(135deg, ${T.accent} 0%, ${T.accentDeep} 60%, ${T.pop} 130%)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
          boxShadow: `0 18px 40px ${T.accent}44`,
        }}>
          {/* shines */}
          <div aria-hidden style={{ position: 'absolute', top: -30, right: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', filter: 'blur(28px)' }} />
          <div aria-hidden style={{ position: 'absolute', bottom: -60, left: -20, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(14px)' }} />

          {/* Mascot floats top-right */}
          <div style={{ position: 'absolute', top: 6, right: 8, opacity: 0.95 }}>
            <WalletBro expression={heroMood} size={84} accent="#FFF3DC" accentDark="#FFD0A8" pop="#FF7A45" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.85, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Salary cycle</div>
            <div style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.22)' }}>Day {SALARY.daysIn}/{SALARY.cycleDays}</div>
          </div>

          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 13, opacity: 0.88, fontStyle: 'italic', position: 'relative' }}>
            Left to spend
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, position: 'relative', fontFamily: "'Fraunces', serif", letterSpacing: '-0.03em' }}>
            <span style={{ fontSize: 22, fontWeight: 500, opacity: 0.9 }}>₱</span>
            <span style={{ fontSize: 48, fontWeight: 600, lineHeight: 1 }}>{remaining.toLocaleString('en-PH')}</span>
          </div>

          {/* cycle progress bar */}
          <div style={{ marginTop: 12, position: 'relative' }}>
            <div style={{ height: 10, borderRadius: 99, background: 'rgba(255,255,255,0.22)', overflow: 'hidden', position: 'relative' }}>
              <div style={{
                width: `${cycleProgress * 100}%`, height: '100%',
                background: 'linear-gradient(90deg, #FFF1DA, #fff)', borderRadius: 99,
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, opacity: 0.85, fontFamily: 'Sora', fontWeight: 600 }}>
              <span>May 26 · payday</span>
              <span>Jun 26 · next ₱{SALARY.amount.toLocaleString('en-PH')}</span>
            </div>
          </div>

          {/* daily allowance pills */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, position: 'relative' }}>
            <div style={{ flex: 1, padding: '8px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 10, opacity: 0.85, fontFamily: 'Sora', fontWeight: 600, letterSpacing: '0.04em' }}>DAILY ALLOWANCE</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{peso(daily)}<span style={{ fontSize: 11, fontWeight: 500, opacity: 0.7 }}> /day</span></div>
            </div>
            <div style={{ flex: 1, padding: '8px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 10, opacity: 0.85, fontFamily: 'Sora', fontWeight: 600, letterSpacing: '0.04em' }}>DAYS LEFT</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{daysLeft}<span style={{ fontSize: 11, fontWeight: 500, opacity: 0.7 }}> days</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* AI INSIGHT */}
      <div style={{ padding: '0 18px 14px' }}>
        <Card style={{ padding: '14px 14px 14px 0', display: 'flex', gap: 6, alignItems: 'center', position: 'relative', overflow: 'hidden', border: `1.5px dashed ${T.pop}44` }}>
          <div style={{ flexShrink: 0, marginLeft: -4 }}>
            <WalletBro expression={overBudgets.length ? 'sus' : 'coaching'} size={84} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px', borderRadius: 999, background: `${T.pop}1A`, color: T.pop, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>
              <span>🧠</span> Bro&apos;s plan
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15.5, fontWeight: 500, color: T.ink, lineHeight: 1.3 }}>
              Stick to <b style={{ color: T.accent }}>{peso(daily)}/day</b> and you&apos;ll cruise to June 26 with <b style={{ color: T.good }}>₱{Math.max(0, remaining - daily * daysLeft).toLocaleString('en-PH')}</b> spare. {overBudgets.length > 0 && <>You&apos;re <b style={{ color: T.bad }}>over on {CATEGORIES[overBudgets[0].cat]?.label}</b> — cool it for a week, bro.</>}
            </div>
          </div>
        </Card>
      </div>

      </div>{/* end dash-col-a */}

      {/* ── RIGHT COLUMN ── */}
      <div className="dash-col-b">

      {/* LOCKED-IN OBLIGATIONS */}
      <div style={{ padding: '4px 22px 8px' }}>
        <SectionLabel action="Manage">Locked in this month</SectionLabel>
      </div>
      <div style={{ padding: '0 18px 14px' }}>
        <Card style={{ padding: '4px 0', overflow: 'hidden' }}>
          {LOANS.map((l) => <LoanRow key={l.id} loan={l} divider />)}
          {RECURRING.map((r, i) => <RecurringRow key={r.id} item={r} divider={i < RECURRING.length - 1} />)}
        </Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 8px 0', fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: T.muted }}>
          <span>Auto-debited every month</span>
          <span style={{ color: T.ink, fontWeight: 700 }}>Total · {peso(committed)}</span>
        </div>
      </div>

      {/* BUDGET TRACKER */}
      <div style={{ padding: '4px 22px 8px' }}>
        <SectionLabel action="All →">Budgets</SectionLabel>
      </div>
      <div style={{ padding: '0 18px 14px' }}>
        <Card style={{ padding: '12px 14px' }}>
          {BUDGETS.slice(0, 4).map((b, i) => <BudgetRow key={b.cat} b={b} last={i === 3} />)}
        </Card>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div style={{ padding: '4px 22px 8px' }}>
        <SectionLabel action="See all">Recent activity</SectionLabel>
      </div>
      <div style={{ padding: '0 18px' }}>
        <Card style={{ padding: '4px 0', overflow: 'hidden' }}>
          {SAMPLE_TXNS.slice(0, 4).map((t, i) => (
            <TxnRow key={t.id} t={t} divider={i < 3} />
          ))}
        </Card>
      </div>

      </div>{/* end dash-col-b */}
      </div>{/* end dash-grid */}
    </div>
  );
}
