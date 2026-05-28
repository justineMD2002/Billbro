'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { Logo } from '@/components/ui/Logo';

function NavIcon({ icon, active }: { icon: string; active: boolean }) {
  const sw = 2.2;
  switch (icon) {
    case 'home':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2v-9z" />
        </svg>
      );
    case 'list':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 6h13M8 12h13M8 18h13" />
          <circle cx="4" cy="6" r="1.2" fill="currentColor" />
          <circle cx="4" cy="12" r="1.2" fill="currentColor" />
          <circle cx="4" cy="18" r="1.2" fill="currentColor" />
        </svg>
      );
    case 'chart':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      );
    case 'grid':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="3" width="7" height="7" rx="2" />
          <rect x="3" y="14" width="7" height="7" rx="2" />
          <rect x="14" y="14" width="7" height="7" rx="2" />
        </svg>
      );
    case 'lock':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="10" width="16" height="11" rx="2" fill={active ? 'currentColor' : 'none'}/>
          <path d="M8 10V7a4 4 0 018 0v3"/>
        </svg>
      );
    case 'gear':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      );
    default:
      return null;
  }
}

const NAV_ITEMS = [
  { id: 'home',     label: 'Dashboard',  icon: 'home',  href: '/home' },
  { id: 'txns',     label: 'Activity',   icon: 'list',  href: '/txns' },
  { id: 'budgets',  label: 'Budgets',    icon: 'grid',  href: '/budgets' },
  { id: 'loans',    label: 'Loans',      icon: 'lock',  href: '/loans' },
  { id: 'insights', label: 'Insights',   icon: 'chart', href: '/insights' },
];

export function Sidebar({ onAdd }: { onAdd: () => void }) {
  const { T, dark, toggleDark } = useTheme();
  const pathname = usePathname();

  const activeId = pathname.includes('/txns') ? 'txns'
    : pathname.includes('/insights') ? 'insights'
    : pathname.includes('/budgets') ? 'budgets'
    : pathname.includes('/loans') ? 'loans'
    : pathname.includes('/settings') ? 'settings'
    : 'home';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: '100%',
      background: T.surface,
      borderRight: `1.5px solid ${T.surface2}`,
      padding: '28px 14px 24px',
    }}>
      <div style={{ padding: '0 10px', marginBottom: 36 }}>
        <Logo size={30} textColor={T.ink} textSize={20} />
        <div style={{ fontSize: 11, color: T.muted, marginTop: 6, fontWeight: 500 }}>
          your brother in budgeting
        </div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(item => {
          const isActive = activeId === item.id;
          return (
            <Link key={item.id} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 11,
              padding: '11px 12px', borderRadius: 14,
              background: isActive ? `${T.accent}1A` : 'transparent',
              color: isActive ? T.accent : T.ink2,
              fontSize: 14, fontWeight: isActive ? 600 : 500,
              textDecoration: 'none',
            }}>
              <NavIcon icon={item.icon} active={isActive} />
              {item.label}
            </Link>
          );
        })}

        <button onClick={onAdd} style={{
          display: 'flex', alignItems: 'center', gap: 11,
          marginTop: 14, padding: '13px 12px', borderRadius: 14,
          background: `linear-gradient(135deg, ${T.pop}, ${T.accent})`,
          color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
          boxShadow: `0 6px 20px ${T.accent}44`,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add transaction
        </button>
      </nav>

      <Link href="/settings" style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 12px', borderRadius: 14,
        color: activeId === 'settings' ? T.accent : T.muted,
        fontSize: 13, fontWeight: 500, textDecoration: 'none',
        background: activeId === 'settings' ? `${T.accent}1A` : 'none',
        marginBottom: 2,
      }}>
        <NavIcon icon="gear" active={activeId === 'settings'} />
        Settings
      </Link>

      <button onClick={toggleDark} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 12px', borderRadius: 14,
        background: 'none', border: 'none', cursor: 'pointer',
        color: T.muted, fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
      }}>
        {dark ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5" />
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M4.5 19.5l2-2M17.5 6.5l2-2" />
              </g>
            </svg>
            Light mode
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 14.5A8.5 8.5 0 1110 4a7 7 0 0010 10.5z" />
            </svg>
            Dark mode
          </>
        )}
      </button>
    </div>
  );
}
