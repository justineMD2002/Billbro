'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export interface CardProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export function Card({ style = {}, children, ...rest }: CardProps) {
  const { T } = useTheme();
  return (
    <div style={{
      background: T.surface, borderRadius: 22, boxShadow: T.cardShadow,
      ...style,
    }} {...rest}>{children}</div>
  );
}

export interface PillProps {
  active?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  color?: string;
}

export function Pill({ active, children, onClick, color }: PillProps) {
  const { T } = useTheme();
  return (
    <button onClick={onClick} style={{
      padding: '8px 14px', borderRadius: 999, border: 'none',
      fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
      background: active ? (color || T.accent) : T.surface2,
      color: active ? '#fff' : T.ink2,
      boxShadow: active ? `0 4px 12px ${(color || T.accent)}55` : 'none',
      transition: 'all 0.2s',
    }}>{children}</button>
  );
}

export interface SectionLabelProps {
  children?: React.ReactNode;
  action?: string;
}

export function SectionLabel({ children, action }: SectionLabelProps) {
  const { T } = useTheme();
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '4px 4px',
    }}>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 20, margin: 0, color: T.ink, letterSpacing: '-0.01em' }}>{children}</h3>
      {action && <button style={{ background: 'none', border: 'none', color: T.accent, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{action}</button>}
    </div>
  );
}
