'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { BUDGETS } from '@/lib/data';
import { CATEGORIES, CategoryIcon } from '@/lib/categories';
import { peso } from '@/lib/theme';
import { WalletBro } from '@/components/mascot/WalletBro';
import { Card, SectionLabel } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';

export function BudgetsScreen() {
  const { T } = useTheme();
  const overBudgets = BUDGETS.filter(b => b.spent > b.monthly);
  const broMood = overBudgets.length === 0 ? 'hyped' : overBudgets.length === 1 ? 'sus' : 'worried';
  const broMessage = overBudgets.length === 0
    ? 'All envelopes green 💪 Keep it up!'
    : `${overBudgets.length} envelope${overBudgets.length > 1 ? 's' : ''} over budget — cool it, bro.`;

  return (
    <div style={{ background: T.bg, minHeight: '100%', paddingBottom: 110, overflowX: 'hidden' }}>
      <Header title="Budgets" subtitle="May 2026 · envelope tracking" />

      {/* Bro card */}
      <div style={{ padding: '0 18px 16px' }}>
        <Card style={{ padding: '14px 14px 14px 0', display: 'flex', gap: 6, alignItems: 'center', border: `1.5px dashed ${T.pop}44`, overflow: 'hidden' }}>
          <div style={{ flexShrink: 0, marginLeft: -4 }}>
            <WalletBro expression={broMood} size={80} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px', borderRadius: 999, background: `${T.pop}1A`, color: T.pop, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 5 }}>
              Bro&apos;s read
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 500, color: T.ink, lineHeight: 1.35 }}>
              {broMessage}
            </div>
          </div>
        </Card>
      </div>

      {/* Budget cards */}
      <div style={{ padding: '4px 22px 8px' }}>
        <SectionLabel>Envelopes</SectionLabel>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ padding: '0 18px', gap: 12 }}>
        {BUDGETS.map(b => {
          const cat = CATEGORIES[b.cat];
          const ratio = b.spent / b.monthly;
          const over = ratio > 1;
          const left = b.monthly - b.spent;
          return (
            <Card key={b.cat} style={{ padding: '16px 16px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <CategoryIcon category={b.cat} size={42} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: T.ink }}>{cat?.label}</div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 500, fontSize: 12, color: T.muted }}>
                    {peso(b.spent)} <span style={{ color: T.muted }}>of {peso(b.monthly)}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, color: over ? T.bad : T.ink, letterSpacing: '-0.02em' }}>
                    {Math.round(ratio * 100)}%
                  </div>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ height: 10, borderRadius: 99, background: T.surface2, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{
                  width: `${Math.min(ratio, 1) * 100}%`, height: '100%', borderRadius: 99,
                  background: over ? `linear-gradient(90deg, ${cat?.bg}, ${T.bad})` : cat?.bg,
                }} />
              </div>
              <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: over ? T.bad : T.good }}>
                {over ? `${peso(Math.abs(left))} over budget` : `${peso(left)} left`}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
