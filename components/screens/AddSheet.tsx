'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { BUDGETS, SALARY, daysLeftInCycle, dailyAllowance, budgetSpent, committedMonthly } from '@/lib/data';
import { CATEGORIES, CategoryIcon } from '@/lib/categories';
import { peso } from '@/lib/theme';
import { WalletBro } from '@/components/mascot/WalletBro';
import { BroGymLifter } from '@/components/mascot/GymBro';

// ── Bro Tips ───────────────────────────────────────────────────
const BRO_TIPS = [
  "Pre-budget your food — Bro hates surprises in May.",
  "Round up coffee buys to ₱100 and stash the diff.",
  "Pay loans before payday FOMO hits, every time.",
  "Set 1 'no-spend' day per week. Bro guarantees gains.",
  "Sari-sari runs > Shopee scrolls. Smaller wallet damage.",
  "If salary just hit, pay loans + bills FIRST. Splurge later.",
  "₱100/day saved = ₱36,500 in a year. Receipts don't lie.",
  "Cap fun at 10% of paycheck. Live a little, save a lot.",
  "Track Grab > track gym. One drains way faster.",
  "Daily allowance > monthly budget. Bro thinks in days.",
];

// ── Save Loader overlay ─────────────────────────────────────────
function SaveLoader({ kind = 'out', amount = 0, label = '', onDone }: {
  kind?: string; amount?: number; label?: string; onDone?: () => void;
}) {
  const { T } = useTheme();
  const [phase, setPhase] = React.useState<'lifting' | 'success'>('lifting');
  const [tipIdx, setTipIdx] = React.useState(() => Math.floor(Math.random() * BRO_TIPS.length));

  React.useEffect(() => {
    const tipTimer = setInterval(() => setTipIdx(i => (i + 1) % BRO_TIPS.length), 1400);
    const phaseTimer = setTimeout(() => setPhase('success'), 2400);
    const doneTimer  = setTimeout(() => onDone && onDone(), 2400 + 1400);
    return () => { clearInterval(tipTimer); clearTimeout(phaseTimer); clearTimeout(doneTimer); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isInflow = kind === 'in';
  const headline = phase === 'lifting'
    ? (isInflow ? "Stackin' that paper…" : "Lockin' it in…")
    : (isInflow ? 'INFLOW LOGGED 💸' : 'SAVED, BRO 💪');

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: `linear-gradient(135deg, ${T.accent}EE, ${T.accentDeep}EE, ${T.pop}DD)`,
      backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 28px', color: '#fff',
      animation: 'loader-in 0.25s ease-out',
    }}>
      <div aria-hidden style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 340, height: 340, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(40px)' }} />

      <div style={{ position: 'relative', marginBottom: 18 }}>
        {phase === 'lifting' ? (
          <BroGymLifter size={220} accent="#FFF3DC" accentDark="#FFCFA8" pop={T.pop} ink="#1B1638" cream="#FFF1DA" speed={0.85} />
        ) : (
          <div style={{ animation: 'bro-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <WalletBro expression={isInflow ? 'celebrate' : 'hyped'} size={220} accent="#FFF3DC" accentDark="#FFCFA8" pop={T.pop} animated={false} />
          </div>
        )}
      </div>

      <div style={{
        fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em',
        textAlign: 'center', lineHeight: 1.05, position: 'relative',
      }}>{headline}</div>

      <div style={{ marginTop: 8, fontFamily: 'Sora', fontSize: 14, fontWeight: 600, opacity: 0.85, position: 'relative' }}>
        {isInflow ? '+' : '−'}{peso(Math.abs(amount))} · {label}
      </div>

      <div style={{
        marginTop: 30, padding: '16px 18px', borderRadius: 18,
        background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)',
        width: '100%', maxWidth: 320, textAlign: 'center', position: 'relative',
        border: '1px solid rgba(255,255,255,0.22)',
      }}>
        <div style={{ fontFamily: 'Sora', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', opacity: 0.8, marginBottom: 6 }}>
          {phase === 'lifting' ? 'BRO TIP' : "WHAT'S NEXT"}
        </div>
        {phase === 'lifting' ? (
          <div key={tipIdx} style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            fontSize: 16, fontWeight: 500, lineHeight: 1.3,
            animation: 'tip-flip 0.4s ease-out',
            minHeight: 44,
          }}>&quot;{BRO_TIPS[tipIdx]}&quot;</div>
        ) : (
          <div style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, lineHeight: 1.45, minHeight: 44 }}>
            {isInflow
              ? `New daily allowance: ${peso(Math.floor((SALARY.amount - committedMonthly() - budgetSpent()) / Math.max(1, daysLeftInCycle())))}/day until June 26 🔥`
              : `Daily allowance: ${peso(dailyAllowance())}/day · ${daysLeftInCycle()} days to next payday`}
          </div>
        )}
      </div>

      <style>{`
        @keyframes loader-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tip-flip { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ADD SHEET
// ════════════════════════════════════════════════════════════
export interface AddSheetProps {
  onClose: () => void;
}

export function AddSheet({ onClose }: AddSheetProps) {
  const { T } = useTheme();
  const [type, setType]         = React.useState('out');   // 'in' | 'out'
  const [outKind, setOutKind]   = React.useState('one');   // 'one' | 'budget' | 'loan'
  const [amount, setAmount]     = React.useState('385');
  const [category, setCategory] = React.useState('food');
  const [note, setNote]         = React.useState('Chickenjoy w/ rice');
  const [months, setMonths]     = React.useState(60);
  const [saving, setSaving]     = React.useState(false);

  const n = Number(amount) || 0;

  // ── Mascot mood ──────────────────────────────────────────
  let mood = 'happy';
  if (type === 'in') {
    mood = n >= 30000 ? 'hyped' : n >= 5000 ? 'celebrate' : 'happy';
  } else if (outKind === 'budget') {
    const b = BUDGETS.find(b => b.cat === category);
    if (b) {
      const proj = b.spent + n;
      if (proj > b.monthly) mood = 'worried';
      else if (proj > b.monthly * 0.85) mood = 'sus';
      else mood = 'happy';
    }
  } else if (outKind === 'loan') {
    mood = n >= 8000 ? 'coaching' : 'neutral';
  } else {
    if (n >= 2000) mood = 'worried';
    else if (n >= 1000) mood = 'sus';
    else if (n >= 200) mood = 'happy';
    else mood = 'neutral';
  }

  // ── Categories per mode ────────────────────────────────────
  const cats =
    type === 'in'            ? ['salary', 'freelance']
    : outKind === 'budget'   ? BUDGETS.map(b => b.cat)
    : outKind === 'loan'     ? ['transport', 'shop', 'rent', 'bills']
    :                          ['food', 'transport', 'bills', 'shop', 'fun', 'groceries', 'health', 'rent'];

  React.useEffect(() => {
    if (!cats.includes(category)) setCategory(cats[0]);
  }, [type, outKind]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Mascot caption ─────────────────────────────────────────
  let caption = 'noted';
  if (type === 'in') caption = n >= 30000 ? 'PAYDAY BABY 🎉' : 'LFG bro 💪';
  else if (outKind === 'budget') {
    const b = BUDGETS.find(b => b.cat === category);
    if (b) {
      const proj = b.spent + n;
      const left = b.monthly - proj;
      if (left < 0) caption = `bruh — ₱${Math.abs(left)} over budget`;
      else caption = `${peso(left)} left in ${CATEGORIES[b.cat].label.split(' ')[0]}`;
    }
  } else if (outKind === 'loan') {
    const total = n * months;
    caption = `Total ${peso(total, { compact: true })} over ${months} mo`;
  } else {
    caption = n >= 2000 ? "bruh, that ain't it" : n >= 1000 ? 'u sure about that?' : 'gotchu';
  }

  // ── Loan computations ──────────────────────────────────────
  const today = new Date('2026-05-28');
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + months);
  const endLabel = endDate.toLocaleDateString('en-PH', { month: 'short', year: 'numeric' });

  return (
    <div className="add-sheet-overlay" style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end',
    }} onClick={onClose}>
      <div className="add-sheet-panel" onClick={e => e.stopPropagation()} style={{
        background: T.bg, width: '100%', borderRadius: '32px 32px 0 0',
        padding: '14px 18px calc(24px + env(safe-area-inset-bottom, 0px))',
        maxHeight: 'calc(100% - 72px)', display: 'flex', flexDirection: 'column',
        boxShadow: '0 -20px 60px rgba(0,0,0,0.3)',
        animation: 'sheetIn 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)',
        overflowY: 'auto',
      }}>
        {/* grab handle */}
        <div style={{ width: 44, height: 5, borderRadius: 99, background: T.muted, opacity: 0.4, margin: '4px auto 14px' }} />

        {/* Header w/ close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: T.ink }}>New transaction</div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 12, border: 'none', background: T.surface2, color: T.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {/* In/Out toggle */}
        <div style={{
          background: T.surface2, borderRadius: 16, padding: 4, display: 'flex', position: 'relative', marginBottom: 12,
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: 4, left: type === 'in' ? 4 : '50%',
            width: 'calc(50% - 4px)', height: 'calc(100% - 8px)',
            background: type === 'in' ? T.good : T.pop,
            borderRadius: 12, transition: 'left 0.25s cubic-bezier(0.2,0.9,0.3,1)',
            boxShadow: `0 4px 14px ${(type === 'in' ? T.good : T.pop)}55`,
          }} />
          {[
            { id: 'in',  label: '↓ Inflow' },
            { id: 'out', label: '↑ Outflow' },
          ].map(opt => (
            <button key={opt.id} onClick={() => setType(opt.id)} style={{
              flex: 1, padding: '10px 0', border: 'none', background: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: 700, fontSize: 14, zIndex: 1,
              color: type === opt.id ? '#fff' : T.ink2, transition: 'color 0.2s',
            }}>{opt.label}</button>
          ))}
        </div>

        {/* Outflow kind segmented */}
        {type === 'out' && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {[
              { id: 'one',    label: 'One-time',  sub: 'restaurant, etc.' },
              { id: 'budget', label: 'Budgeted',  sub: 'counts vs envelope' },
              { id: 'loan',   label: 'Loan',      sub: 'monthly · w/ end' },
            ].map(k => {
              const active = outKind === k.id;
              return (
                <button key={k.id} onClick={() => setOutKind(k.id)} style={{
                  flex: 1, padding: '8px 6px', borderRadius: 14,
                  border: active ? `2px solid ${T.accent}` : `2px solid transparent`,
                  background: active ? T.surface : T.surface2,
                  cursor: 'pointer', fontFamily: 'inherit',
                  color: T.ink, textAlign: 'left',
                  boxShadow: active ? `0 6px 14px ${T.accent}33` : 'none',
                  transition: 'all 0.2s',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: active ? T.accent : T.ink }}>{k.label}</div>
                  <div style={{ fontSize: 10, fontWeight: 500, color: T.muted, marginTop: 1 }}>{k.sub}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Mascot + Amount */}
        <div style={{
          background: T.surface, borderRadius: 24, padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: T.cardShadow, marginBottom: 12,
        }}>
          <div style={{ flexShrink: 0, marginLeft: -8 }}>
            <WalletBro expression={mood} size={86} accent={T.accent} accentDark={T.accentDeep} pop={T.pop} />
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: T.muted, textTransform: 'uppercase' }}>
              {outKind === 'loan' && type === 'out' ? 'Monthly amount' : 'Amount'}
            </div>
            <div style={{
              fontFamily: "'Fraunces', serif", fontWeight: 600,
              fontSize: n.toString().length > 5 ? 36 : 44,
              color: type === 'in' ? T.good : T.ink,
              lineHeight: 1, letterSpacing: '-0.03em',
            }}>
              <span style={{ fontSize: '0.55em', opacity: 0.7, marginRight: 2 }}>₱</span>{n.toLocaleString('en-PH')}
            </div>
            <div style={{ fontSize: 11, color: T.muted, fontFamily: 'Sora', marginTop: 2, fontStyle: 'italic' }}>
              &quot;{caption}&quot;
            </div>
          </div>
        </div>

        {/* Quick-add chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {['+100', '+500', '+1000', 'clear'].map(b => (
            <button key={b} onClick={() => {
              if (b === 'clear') setAmount('0');
              else setAmount(String((Number(amount) || 0) + Number(b.replace('+', ''))));
            }} style={{
              flex: 1, padding: '10px 0', borderRadius: 14, border: 'none', cursor: 'pointer',
              background: T.surface2, color: T.ink, fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
            }}>{b}</button>
          ))}
        </div>

        {/* CATEGORY PICKER */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: T.muted, textTransform: 'uppercase', marginBottom: 8, padding: '0 4px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Category</span>
            {outKind === 'budget' && type === 'out' && (() => {
              const b = BUDGETS.find(b => b.cat === category);
              if (!b) return null;
              const left = b.monthly - b.spent - n;
              return (
                <span style={{ color: left < 0 ? T.bad : T.good, fontWeight: 700 }}>
                  {left < 0 ? `−${peso(Math.abs(left))} over` : `${peso(left)} left`}
                </span>
              );
            })()}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {cats.map(c => {
              const active = category === c;
              const b = BUDGETS.find(b => b.cat === c);
              return (
                <button key={c} onClick={() => setCategory(c)} style={{
                  background: active ? T.surface : T.surface2,
                  border: active ? `2px solid ${T.accent}` : `2px solid transparent`,
                  borderRadius: 16, padding: '10px 4px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  fontFamily: 'inherit', color: T.ink, position: 'relative',
                  boxShadow: active ? `0 6px 14px ${T.accent}33` : 'none',
                  transition: 'all 0.2s',
                }}>
                  <CategoryIcon category={c} size={34} />
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: T.ink2 }}>{CATEGORIES[c]?.label.split(' ')[0]}</span>
                  {outKind === 'budget' && b && (
                    <span style={{ fontSize: 9, fontWeight: 700, color: b.spent > b.monthly ? T.bad : T.muted }}>
                      {Math.round((b.spent / b.monthly) * 100)}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONDITIONAL — Budgeted: show envelope status */}
        {type === 'out' && outKind === 'budget' && (() => {
          const b = BUDGETS.find(b => b.cat === category);
          if (!b) return null;
          const proj = b.spent + n;
          const over = proj > b.monthly;
          return (
            <div style={{ background: T.surface, borderRadius: 16, padding: '12px 14px', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{CATEGORIES[b.cat]?.label} envelope</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 13, fontWeight: 600, color: over ? T.bad : T.ink }}>
                  {peso(proj)} <span style={{ color: T.muted, fontWeight: 500 }}>/ {peso(b.monthly)}</span>
                </div>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: T.surface2, overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: `${Math.min(b.spent / b.monthly, 1) * 100}%`, height: '100%', background: CATEGORIES[b.cat]?.bg, borderRadius: 99 }} />
                <div style={{ position: 'absolute', top: 0, left: `${(b.spent / b.monthly) * 100}%`, width: `${Math.min(((proj - b.spent) / b.monthly) * 100, 50)}%`, height: '100%', background: over ? T.bad : `${CATEGORIES[b.cat]?.bg}88`, opacity: 0.7 }} />
              </div>
              {over ? (
                <div style={{ marginTop: 8, fontFamily: 'Sora', fontSize: 11.5, color: T.bad, fontWeight: 600 }}>
                  ⚠ Would push you {peso(proj - b.monthly)} over. Bro says: skip 1 Grab + 2 coffees this week to break even.
                </div>
              ) : (
                <div style={{ marginTop: 8, fontFamily: 'Sora', fontSize: 11.5, color: T.muted }}>
                  Still in the green. Daily allowance: <b style={{ color: T.ink }}>{peso(Math.floor((b.monthly - proj) / Math.max(1, daysLeftInCycle())))}</b>/day to month end.
                </div>
              )}
            </div>
          );
        })()}

        {/* CONDITIONAL — Loan: term + computed end */}
        {type === 'out' && outKind === 'loan' && (
          <div style={{ background: T.surface, borderRadius: 16, padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Loan term</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 13, color: T.ink }}>{months} months</div>
            </div>
            <input type="range" min="6" max="84" step="6" value={months} onChange={e => setMonths(Number(e.target.value))}
              style={{ width: '100%', accentColor: T.accent, marginBottom: 4 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.muted, fontFamily: 'Sora', fontWeight: 500 }}>
              <span>6mo</span><span>84mo</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <div style={{ flex: 1, padding: '8px 10px', borderRadius: 12, background: T.surface2 }}>
                <div style={{ fontSize: 10, color: T.muted, fontFamily: 'Sora', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ends</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 700, color: T.ink }}>{endLabel}</div>
              </div>
              <div style={{ flex: 1, padding: '8px 10px', borderRadius: 12, background: T.surface2 }}>
                <div style={{ fontSize: 10, color: T.muted, fontFamily: 'Sora', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total balance</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 700, color: T.ink }}>{peso(n * months, { compact: true })}</div>
              </div>
              <div style={{ flex: 1, padding: '8px 10px', borderRadius: 12, background: T.surface2 }}>
                <div style={{ fontSize: 10, color: T.muted, fontFamily: 'Sora', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Paid</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 700, color: T.ink }}>0 <span style={{ color: T.muted, fontWeight: 500 }}>/ {months}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Date + Note */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, background: T.surface, borderRadius: 14, padding: '10px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.muted, fontFamily: 'Sora', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {outKind === 'loan' && type === 'out' ? 'Start date' : 'Date'}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, fontFamily: 'Sora' }}>Today · May 28</div>
          </div>
          <div style={{ flex: 1.5, background: T.surface, borderRadius: 14, padding: '10px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.muted, fontFamily: 'Sora', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Note</div>
            <input value={note} onChange={e => setNote(e.target.value)} style={{
              width: '100%', border: 'none', background: 'none', outline: 'none',
              fontSize: 14, fontWeight: 600, color: T.ink, fontFamily: 'Sora', padding: 0,
            }} />
          </div>
        </div>

        {/* Save button */}
        <button onClick={() => setSaving(true)} style={{
          marginTop: 4, padding: '16px', border: 'none', cursor: 'pointer',
          borderRadius: 18, color: '#fff',
          background: `linear-gradient(135deg, ${T.accent}, ${T.accentDeep})`,
          boxShadow: `0 12px 24px ${T.accent}55`,
          fontFamily: 'inherit', fontSize: 16, fontWeight: 700,
        }}>
          {type === 'in' ? 'Add inflow'
           : outKind === 'loan' ? 'Add loan'
           : outKind === 'budget' ? 'Save (counts vs budget)'
           : 'Save transaction'}
        </button>

        {saving && (
          <SaveLoader
            kind={type}
            amount={n}
            label={
              type === 'in' ? CATEGORIES[category]?.label
              : outKind === 'loan' ? `Loan · ${months} mo · ${CATEGORIES[category]?.label}`
              : outKind === 'budget' ? `Budgeted · ${CATEGORIES[category]?.label}`
              : CATEGORIES[category]?.label
            }
            onDone={onClose}
          />
        )}

        <style>{`@keyframes sheetIn { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
      </div>
    </div>
  );
}
