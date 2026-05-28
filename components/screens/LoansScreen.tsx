'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { LOANS, RECURRING, committedMonthly } from '@/lib/data';
import { CategoryIcon } from '@/lib/categories';
import { peso } from '@/lib/theme';
import { Card, SectionLabel } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';

export function LoansScreen() {
  const { T } = useTheme();
  const totalCommitted = committedMonthly();
  const loanTotal = LOANS.reduce((s, l) => s + l.monthly, 0);
  const recurringTotal = RECURRING.reduce((s, r) => s + r.monthly, 0);

  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 110 }}>
      <Header title="Loans & Bills" subtitle="Recurring obligations" />

      {/* Stat summary */}
      <div style={{ padding: '0 18px 16px' }}>
        <Card style={{ padding: '16px 18px', background: `linear-gradient(135deg, ${T.accent}22, ${T.pop}11)`, border: `1.5px solid ${T.accent}33` }}>
          <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Total monthly obligation</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 700, color: T.ink, letterSpacing: '-0.03em' }}>{peso(totalCommitted)}</div>
          <div style={{ fontFamily: 'Sora', fontSize: 12, color: T.muted, marginTop: 4 }}>
            Loans: {peso(loanTotal)} · Recurring: {peso(recurringTotal)}
          </div>
        </Card>
      </div>

      {/* Loans */}
      <div style={{ padding: '4px 22px 8px' }}>
        <SectionLabel>Active Loans</SectionLabel>
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        {LOANS.map(loan => {
          const pct = loan.paidMonths / loan.totalMonths;
          const monthsLeft = loan.totalMonths - loan.paidMonths;
          const remainingBalance = loan.monthly * monthsLeft;
          return (
            <Card key={loan.id} style={{ padding: '16px 16px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <CategoryIcon category={loan.cat} size={42} />
                  <div style={{ position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, borderRadius: 99, background: T.ink, color: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>
                    <svg width="9" height="10" viewBox="0 0 10 11" fill="currentColor"><rect x="2" y="5" width="6" height="5" rx="1" /><path d="M3.2 5V3.4a1.8 1.8 0 113.6 0V5" stroke="currentColor" strokeWidth="1.1" fill="none" /></svg>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{loan.name}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 11.5, color: T.muted, fontWeight: 500 }}>
                    Month {loan.paidMonths}/{loan.totalMonths} · ends {loan.endDate.slice(0, 7)}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 16, color: T.ink, letterSpacing: '-0.01em' }}>−{peso(loan.monthly)}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted }}>/month</div>
                </div>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: T.surface2, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ width: `${pct * 100}%`, height: '100%', background: `linear-gradient(90deg, ${T.accent}, ${T.good})`, borderRadius: 99 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Sora', fontSize: 12, fontWeight: 600 }}>
                <span style={{ color: T.muted }}>{monthsLeft} months left</span>
                <span style={{ color: T.ink2 }}>{peso(remainingBalance, { compact: true })} remaining</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recurring Bills */}
      <div style={{ padding: '4px 22px 8px' }}>
        <SectionLabel>Recurring Bills</SectionLabel>
      </div>
      <div style={{ padding: '0 18px 16px' }}>
        <Card style={{ padding: '4px 0', overflow: 'hidden' }}>
          {RECURRING.map((item, i) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < RECURRING.length - 1 ? `1px solid ${T.surface2}` : 'none' }}>
              <CategoryIcon category={item.cat} size={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 13.5, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                <div style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted }}>Recurring · due day {item.dueDay}</div>
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 15, color: T.ink, letterSpacing: '-0.01em' }}>−{peso(item.monthly)}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
