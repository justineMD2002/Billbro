import React from 'react';

export interface Category { label: string; bg: string; fg: string; }
export const CATEGORIES: Record<string, Category> = {
  food:      { label: 'Food & Drink',  bg: '#FF7A45', fg: '#FFF1DA' },
  transport: { label: 'Transport',     bg: '#A88BFF', fg: '#FFF1DA' },
  bills:     { label: 'Bills',         bg: '#FFC857', fg: '#1B1638' },
  shop:      { label: 'Shopping',      bg: '#FF6B85', fg: '#FFF1DA' },
  fun:       { label: 'Fun',           bg: '#7BD8B8', fg: '#0E2F2A' },
  groceries: { label: 'Groceries',     bg: '#86C7FF', fg: '#0E1B36' },
  health:    { label: 'Health',        bg: '#FF93B7', fg: '#3A1E2E' },
  rent:      { label: 'Rent',          bg: '#8A6BF0', fg: '#FFF1DA' },
  salary:    { label: 'Salary',        bg: '#3FBF93', fg: '#FFF1DA' },
  freelance: { label: 'Freelance',     bg: '#FFD66B', fg: '#1B1638' },
};

export function CategoryIcon({ category, size = 40 }: { category: string; size?: number }) {
  const c = CATEGORIES[category] ?? CATEGORIES.food;
  const r = (size / 2) * 0.7;
  return React.createElement('div', {
    style: {
      width: size, height: size, borderRadius: r,
      background: c.bg, color: c.fg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    },
  }, React.createElement(CategoryGlyph, { category, size: size * 0.55, color: c.fg }));
}

export function CategoryGlyph({ category, size = 22, color = '#fff' }: { category: string; size?: number; color?: string }) {
  const s = size;
  const props = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (category) {
    case 'food': return React.createElement('svg', props,
      React.createElement('path', { d: 'M4 9c0-3 4-5 8-5s8 2 8 5' }),
      React.createElement('path', { d: 'M3 10h18' }),
      React.createElement('path', { d: 'M5 10v3a3 3 0 003 3h8a3 3 0 003-3v-3' }));
    case 'transport': return React.createElement('svg', props,
      React.createElement('rect', { x: 4, y: 5, width: 16, height: 11, rx: 2 }),
      React.createElement('circle', { cx: 8, cy: 18, r: 1.5, fill: color }),
      React.createElement('circle', { cx: 16, cy: 18, r: 1.5, fill: color }),
      React.createElement('path', { d: 'M4 10h16' }));
    case 'bills': return React.createElement('svg', props,
      React.createElement('path', { d: 'M6 3v18l3-2 3 2 3-2 3 2V3z' }),
      React.createElement('path', { d: 'M9 8h6M9 12h6M9 16h4' }));
    case 'shop': return React.createElement('svg', props,
      React.createElement('path', { d: 'M5 8h14l-1.5 11a2 2 0 01-2 2H8.5a2 2 0 01-2-2L5 8z' }),
      React.createElement('path', { d: 'M9 8V6a3 3 0 016 0v2' }));
    case 'fun': return React.createElement('svg', props,
      React.createElement('path', { d: 'M9 18l-4 3 1-5-3-3 4-1 2-4 2 4 4 1-3 3 1 5z' }));
    case 'groceries': return React.createElement('svg', props,
      React.createElement('path', { d: 'M5 7h14l-2 11H7L5 7z' }),
      React.createElement('path', { d: 'M9 7l1-3h4l1 3' }),
      React.createElement('path', { d: 'M10 11v4M14 11v4' }));
    case 'health': return React.createElement('svg', props,
      React.createElement('path', { d: 'M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z' }));
    case 'rent': return React.createElement('svg', props,
      React.createElement('path', { d: 'M4 11l8-7 8 7' }),
      React.createElement('path', { d: 'M6 10v10h12V10' }),
      React.createElement('path', { d: 'M10 20v-5h4v5' }));
    case 'salary': return React.createElement('svg', props,
      React.createElement('rect', { x: 3, y: 6, width: 18, height: 12, rx: 2 }),
      React.createElement('circle', { cx: 12, cy: 12, r: 2.5 }),
      React.createElement('path', { d: 'M6 10v.01M18 14v.01' }));
    case 'freelance': return React.createElement('svg', props,
      React.createElement('rect', { x: 4, y: 7, width: 16, height: 13, rx: 2 }),
      React.createElement('path', { d: 'M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2' }),
      React.createElement('path', { d: 'M8 13h8' }));
    default: return null;
  }
}
