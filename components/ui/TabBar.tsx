'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

function TabIcon({ icon, active }: { icon: string; active: boolean }) {
  const sw = 2.2;
  switch (icon) {
    case 'home':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2v-9z" />
        </svg>
      );
    case 'list':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 6h13M8 12h13M8 18h13" />
          <circle cx="4" cy="6" r="1.2" fill="currentColor" />
          <circle cx="4" cy="12" r="1.2" fill="currentColor" />
          <circle cx="4" cy="18" r="1.2" fill="currentColor" />
        </svg>
      );
    case 'chart':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      );
    case 'grid':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="3" width="7" height="7" rx="2" />
          <rect x="3" y="14" width="7" height="7" rx="2" />
          <rect x="14" y="14" width="7" height="7" rx="2" />
        </svg>
      );
    default:
      return null;
  }
}

export interface TabBarProps {
  active: string;
  onChange: (id: string) => void;
}

export function TabBar({ active, onChange }: TabBarProps) {
  const { T } = useTheme();

  const tabs = [
    { id: 'home',     label: 'Home',       icon: 'home' },
    { id: 'txns',     label: 'Activity',   icon: 'list' },
    { id: 'add',      label: '',           icon: 'add',  center: true },
    { id: 'insights', label: 'Insights',   icon: 'chart' },
    { id: 'budgets',  label: 'Budgets',    icon: 'grid' },
  ];

  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, bottom: 20, zIndex: 30,
      borderRadius: 28, padding: '10px 12px',
      background: T.surface, boxShadow: T.cardShadow,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      border: `1px solid ${T.surface2}`,
    }}>
      {tabs.map(tab => {
        if (tab.center) {
          return (
            <button key={tab.id} onClick={() => onChange('add')} style={{
              width: 54, height: 54, borderRadius: 18,
              background: `linear-gradient(135deg, ${T.pop}, ${T.accent})`,
              boxShadow: `0 8px 18px ${T.accent}66`,
              border: 'none', cursor: 'pointer', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'translateY(-12px)',
              animation: 'fab-pulse 2.2s ease-in-out infinite',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          );
        }
        const isActive = active === tab.id;
        return (
          <button key={tab.id} onClick={() => onChange(tab.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: isActive ? T.accent : T.muted,
            fontFamily: 'inherit', fontSize: 10, fontWeight: 600,
            padding: '6px 10px', minWidth: 56,
          }}>
            <TabIcon icon={tab.icon} active={isActive} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
