'use client';

import React from 'react';
import { type ThemeTokens } from '@/lib/theme';

const SAMPLE_NOTIFS = [
  {
    id: 'n1', kind: 'warn',
    icon: '⚠',
    title: 'Shop budget blown',
    body: "You're ₱1,120 over the ₱2,000 envelope. Bro suggests pausing Shopee.",
    cta: 'See plan',
  },
  {
    id: 'n2', kind: 'info',
    icon: '🔔',
    title: 'Car loan due Jun 5',
    body: '₱8,500 auto-debit · month 24 of 60. After this, 36 months left.',
    cta: 'Manage',
  },
  {
    id: 'n3', kind: 'win',
    icon: '💪',
    title: 'Transport under by ₱2,260',
    body: 'Bro says: stash it in savings before payday hits June 26.',
    cta: 'Save it',
  },
  {
    id: 'n4', kind: 'tip',
    icon: '🧠',
    title: 'Tip from Bro',
    body: "Stick to ₱566/day allowance and you'll land payday with ₱14K spare.",
    cta: 'Got it',
  },
];

export function NotificationBar({ T }: { T: ThemeTokens }) {
  const [items, setItems] = React.useState(SAMPLE_NOTIFS);
  const [idx, setIdx] = React.useState(0);
  const total = items.length;
  if (total === 0) return null;

  const active = items[idx % total];
  const next = () => setIdx(i => (i + 1) % total);
  const dismiss = (id: string) => {
    const newItems = items.filter(n => n.id !== id);
    setItems(newItems);
    if (idx >= newItems.length) setIdx(0);
  };

  const kindColor: Record<string, string> = {
    warn: T.pop,
    info: T.accent,
    win:  T.good,
    tip:  T.accentDeep,
  };
  const color = kindColor[active.kind] || T.accent;

  return (
    <div style={{ padding: '0 18px 8px' }}>
      <div style={{
        background: T.surface, borderRadius: 18,
        padding: '12px 14px',
        boxShadow: T.cardShadow,
        display: 'flex', alignItems: 'center', gap: 12,
        position: 'relative', overflow: 'hidden',
        borderLeft: `4px solid ${color}`,
        animation: 'notif-in 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)',
      }}
      key={active.id}
      >
        {/* Icon bubble */}
        <div style={{
          width: 36, height: 36, borderRadius: 12, flexShrink: 0,
          background: `${color}22`, color: color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}>{active.icon}</div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 1 }}>
            <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 13, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{active.title}</div>
            {total > 1 && (
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 9, letterSpacing: '0.08em', color: T.muted, background: T.surface2, padding: '1px 6px', borderRadius: 99 }}>
                {(idx % total) + 1}/{total}
              </div>
            )}
          </div>
          <div style={{ fontFamily: 'Sora', fontSize: 11.5, color: T.ink2, lineHeight: 1.35 }}>{active.body}</div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', flexShrink: 0 }}>
          <button onClick={() => dismiss(active.id)} aria-label="Dismiss" style={{
            width: 24, height: 24, borderRadius: 8, border: 'none', background: T.surface2,
            color: T.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <button onClick={next} style={{
            border: 'none', background: 'none', padding: 0, cursor: 'pointer',
            color: color, fontFamily: 'Sora', fontSize: 11, fontWeight: 700,
            whiteSpace: 'nowrap',
          }}>{active.cta} →</button>
        </div>
      </div>

      {/* Pagination dots */}
      {total > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 6 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Go to notification ${i + 1}`} style={{
              width: i === (idx % total) ? 16 : 5, height: 5, borderRadius: 99,
              border: 'none', cursor: 'pointer', padding: 0,
              background: i === (idx % total) ? T.accent : T.muted,
              opacity: i === (idx % total) ? 1 : 0.4,
              transition: 'all 0.25s',
            }} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes notif-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
