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
    default:
      return null;
  }
}

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',       icon: 'home',  href: '/app/home' },
  { id: 'txns',     label: 'Activity',   icon: 'list',  href: '/app/txns' },
  { id: 'insights', label: 'Insights',   icon: 'chart', href: '/app/insights' },
  { id: 'cats',     label: 'Categories', icon: 'grid',  href: '/app/cats' },
];

export function Sidebar({ onAdd }: { onAdd: () => void }) {
  const { T, dark, toggleDark } = useTheme();
  const pathname = usePathname();

  const activeId = pathname.includes('/txns') ? 'txns'
    : pathname.includes('/insights') ? 'insights'
    : pathname.includes('/cats') ? 'cats'
    : 'home';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: '100%',
      background: T.surface,
      borderRight: `1.5px solid ${T.surface2}`,
      padding: '28px 14px 24px',
    }}>
      {/* Brand */}
      <div style={{ padding: '0 10px', marginBottom: 36 }}>
        <Logo size={30} textColor={T.ink} textSize={20} />
        <div style={{ fontSize: 11, color: T.muted, marginTop: 6, fontWeight: 500 }}>
          your brother in budgeting
        </div>
      </div>

      {/* Nav items */}
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

        {/* Add transaction button */}
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

      {/* Dark mode toggle */}
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
