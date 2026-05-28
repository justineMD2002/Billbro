'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { CATEGORY_BREAKDOWN } from '@/lib/data';
import { CATEGORIES, CategoryIcon } from '@/lib/categories';
import { peso } from '@/lib/theme';
import { WalletBro } from '@/components/mascot/WalletBro';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';

export function CategoriesScreen() {
  const { T } = useTheme();

  const sorted = [...CATEGORY_BREAKDOWN].sort((a, b) => b.spent - a.spent);
  const topCat = sorted[0];

  return (
    <div className="cats-screen" style={{ background: T.bg, minHeight: '100%', paddingBottom: 110 }}>
      <Header subtitle="Spending by category" title="Categories" />

      {/* Month selector */}
      <div style={{ padding: '0 18px 16px' }}>
        <div style={{
          background: T.surface, borderRadius: 18, padding: 6,
          display: 'flex', alignItems: 'center', gap: 6, boxShadow: T.cardShadow,
        }}>
          <button style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: T.surface2, color: T.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontFamily: 'Sora', fontWeight: 600, color: T.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>This month</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: T.ink, letterSpacing: '-0.01em' }}>May 2026</div>
          </div>
          <button style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: T.surface2, color: T.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      {/* ── Desktop: [hero + summary left | 2-col cards right]; Mobile: stack ── */}
      <div className="cats-grid">

        {/* Left column: top category hero */}
        <div className="cats-col-left">
          <div style={{ padding: '0 18px 14px' }}>
            <div style={{
              borderRadius: 24, padding: '14px 12px 14px 0',
              background: `linear-gradient(120deg, ${CATEGORIES[topCat.cat]?.bg}33, ${T.surface})`,
              border: `2px solid ${CATEGORIES[topCat.cat]?.bg}55`,
              display: 'flex', gap: 6, alignItems: 'center',
            }}>
              <div style={{ flexShrink: 0, marginLeft: -8 }}>
                <WalletBro expression="sus" size={92} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 99, background: `${T.bad}1A`, color: T.bad, fontFamily: 'Sora', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 4 }}>
                  👀 TOP SPEND
                </div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 18, color: T.ink, lineHeight: 1.15 }}>
                  {CATEGORIES[topCat.cat]?.label} ate the most.
                </div>
                <div style={{ fontFamily: 'Sora', fontSize: 12, color: T.ink2, marginTop: 2 }}>
                  {peso(topCat.spent)} of {peso(topCat.budget)} budget · {topCat.txns} txns
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: category cards in a 2-col grid on desktop */}
        <div className="cats-col-right">
          <div className="cats-cards-grid" style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sorted.map(c => {
              const ratio = c.spent / c.budget;
              const over = ratio > 1;
              return (
                <Card key={c.cat} style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <CategoryIcon category={c.cat} size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: T.ink }}>{CATEGORIES[c.cat]?.label}</div>
                      <div style={{ fontFamily: 'Sora', fontSize: 11, color: T.muted, fontWeight: 500 }}>{c.txns} txns · {Math.round(ratio * 100)}% of budget</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 15, color: over ? T.bad : T.ink, letterSpacing: '-0.01em' }}>{peso(c.spent)}</div>
                      <div style={{ fontFamily: 'Sora', fontSize: 10.5, color: T.muted, fontWeight: 500 }}>of {peso(c.budget)}</div>
                    </div>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: T.surface2, overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      height: '100%', borderRadius: 4,
                      width: `${Math.min(ratio, 1) * 100}%`,
                      background: over
                        ? `linear-gradient(90deg, ${CATEGORIES[c.cat]?.bg}, ${T.bad})`
                        : CATEGORIES[c.cat]?.bg,
                      transition: 'width 0.6s ease',
                    }} />
                    {over && (
                      <div style={{
                        position: 'absolute', top: -1, right: 0, height: 10,
                        width: `${(ratio - 1) * 60}%`, maxWidth: '40%',
                        background: `repeating-linear-gradient(45deg, ${T.bad}, ${T.bad} 4px, ${T.bg2} 4px, ${T.bg2} 8px)`,
                        borderRadius: 4,
                      }} />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

      </div>{/* end cats-grid */}
    </div>
  );
}
