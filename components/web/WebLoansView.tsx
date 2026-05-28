'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { LOANS, RECURRING, committedMonthly } from '@/lib/data';
import { CategoryIcon } from '@/lib/categories';
import { peso } from '@/lib/theme';

export function WebLoansView() {
  const { T } = useTheme();
  const totalCommitted = committedMonthly();
  const loanTotal = LOANS.reduce((s, l) => s + l.monthly, 0);
  const recurringTotal = RECURRING.reduce((s, r) => s + r.monthly, 0);
  const outstandingBalance = LOANS.reduce((s, l) => s + l.monthly * (l.totalMonths - l.paidMonths), 0);

  return (
    <div style={{ padding: '28px 32px 40px', display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Stat tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Monthly obligation', value: peso(totalCommitted), sub: 'loans + recurring' },
          { label: 'Outstanding balance', value: peso(outstandingBalance, { compact: true }), sub: 'across all loans' },
          { label: 'Recurring bills', value: peso(recurringTotal), sub: `${RECURRING.length} active subscriptions` },
        ].map(s => (
          <div key={s.label} style={{ background: T.surface, borderRadius: 20, padding: 20, border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow }}>
            <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: T.ink, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ fontFamily: 'Sora', fontSize: 12, color: T.muted, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Loan cards */}
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: T.ink, marginBottom: 14 }}>Active Loans</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {LOANS.map(loan => {
            const pct = loan.paidMonths / loan.totalMonths;
            const monthsLeft = loan.totalMonths - loan.paidMonths;
            const remainingBalance = loan.monthly * monthsLeft;
            const payoffDate = loan.endDate.slice(0, 7);
            return (
              <div key={loan.id} style={{ background: T.surface, borderRadius: 20, padding: 22, border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <CategoryIcon category={loan.cat} size={46} />
                    <div style={{ position: 'absolute', bottom: -2, right: -2, width: 17, height: 17, borderRadius: 99, background: T.ink, color: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>
                      <svg width="9" height="10" viewBox="0 0 10 11" fill="currentColor"><rect x="2" y="5" width="6" height="5" rx="1" /><path d="M3.2 5V3.4a1.8 1.8 0 113.6 0V5" stroke="currentColor" strokeWidth="1.1" fill="none" /></svg>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: T.ink }}>{loan.name}</div>
                    <div style={{ fontFamily: 'Sora', fontSize: 12, color: T.muted }}>Month {loan.paidMonths} of {loan.totalMonths}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: T.ink }}>−{peso(loan.monthly)}</div>
                    <div style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted }}>/month</div>
                  </div>
                </div>
                <div style={{ height: 12, borderRadius: 99, background: T.surface2, overflow: 'hidden', marginBottom: 12 }}>
                  <div style={{ width: `${pct * 100}%`, height: '100%', background: `linear-gradient(90deg, ${T.accent}, ${T.good})`, borderRadius: 99 }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {[
                    { label: 'Months left', value: String(monthsLeft) },
                    { label: 'Balance', value: peso(remainingBalance, { compact: true }) },
                    { label: 'Payoff', value: payoffDate },
                  ].map(stat => (
                    <div key={stat.label} style={{ background: T.surface2, borderRadius: 10, padding: '8px 10px' }}>
                      <div style={{ fontFamily: 'Sora', fontSize: 10, color: T.muted, fontWeight: 600 }}>{stat.label}</div>
                      <div style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 700, color: T.ink }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recurring bills table */}
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: T.ink, marginBottom: 14 }}>Recurring Bills</div>
        <div style={{ background: T.surface, borderRadius: 20, border: `1px solid ${T.surface2}`, boxShadow: T.cardShadow, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 0 }}>
            <div style={{ display: 'contents' }}>
              {['Name', 'Due day', 'Monthly'].map(h => (
                <div key={h} style={{ padding: '12px 20px', fontFamily: 'Sora', fontSize: 11, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: `1px solid ${T.surface2}` }}>{h}</div>
              ))}
            </div>
            {RECURRING.map((r, i) => (
              <React.Fragment key={r.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: i < RECURRING.length - 1 ? `1px solid ${T.surface2}` : 'none' }}>
                  <CategoryIcon category={r.cat} size={34} />
                  <span style={{ fontFamily: 'Sora', fontSize: 14, fontWeight: 600, color: T.ink }}>{r.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', fontFamily: 'Sora', fontSize: 13, color: T.muted, borderBottom: i < RECURRING.length - 1 ? `1px solid ${T.surface2}` : 'none' }}>Day {r.dueDay}</div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 700, color: T.ink, borderBottom: i < RECURRING.length - 1 ? `1px solid ${T.surface2}` : 'none' }}>−{peso(r.monthly)}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
