export interface ThemeTokens {
  bg: string; bg2: string;
  surface: string; surface2: string;
  ink: string; ink2: string; muted: string;
  accent: string; accentDeep: string;
  pop: string; good: string; bad: string;
  cardShadow: string;
}

export type PaletteKey = 'surprise' | 'sunset' | 'tropical';

export const THEMES: Record<PaletteKey, { name: string; light: ThemeTokens; dark: ThemeTokens }> = {
  surprise: {
    name: 'Lilac × Tangerine',
    light: {
      bg: '#FFF7EC', bg2: '#FFEFDC', surface: '#FFFFFF', surface2: '#FFF1E1',
      ink: '#1B1638', ink2: '#4A4368', muted: '#8A82A8',
      accent: '#A88BFF', accentDeep: '#7B5BE0', pop: '#FF7A45',
      good: '#3FBF93', bad: '#FF5A6A',
      cardShadow: '0 10px 30px rgba(123,91,224,0.10), 0 2px 6px rgba(27,22,56,0.05)',
    },
    dark: {
      bg: '#15102B', bg2: '#1F1840', surface: '#231B47', surface2: '#2E2454',
      ink: '#FFF1DA', ink2: '#D9CFF0', muted: '#8B82B2',
      accent: '#B89DFF', accentDeep: '#8A6BF0', pop: '#FF8A5A',
      good: '#5BD5A8', bad: '#FF6E80',
      cardShadow: '0 12px 36px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
    },
  },
  sunset: {
    name: 'Sunset Coral',
    light: {
      bg: '#FFF3EA', bg2: '#FFE6D4', surface: '#FFFFFF', surface2: '#FFEAD8',
      ink: '#3A1E2E', ink2: '#5F3D52', muted: '#9B7E8E',
      accent: '#FF6B85', accentDeep: '#D9446B', pop: '#FFB347',
      good: '#3FBF93', bad: '#E54545',
      cardShadow: '0 10px 30px rgba(217,68,107,0.10), 0 2px 6px rgba(58,30,46,0.05)',
    },
    dark: {
      bg: '#1F0F1B', bg2: '#2C162A', surface: '#341F36', surface2: '#3F2843',
      ink: '#FFE8DC', ink2: '#F0CFD4', muted: '#A88298',
      accent: '#FF7E96', accentDeep: '#FF5A78', pop: '#FFBE5A',
      good: '#5BD5A8', bad: '#FF6E80',
      cardShadow: '0 12px 36px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
    },
  },
  tropical: {
    name: 'Tropical Teal × Pink',
    light: {
      bg: '#EEFBF8', bg2: '#DDF6F0', surface: '#FFFFFF', surface2: '#E5F8F2',
      ink: '#0E2F2A', ink2: '#2A5C53', muted: '#73968E',
      accent: '#16C5A8', accentDeep: '#0E9A82', pop: '#FF4F92',
      good: '#16C5A8', bad: '#FF4F92',
      cardShadow: '0 10px 30px rgba(14,154,130,0.10), 0 2px 6px rgba(14,47,42,0.05)',
    },
    dark: {
      bg: '#0A1E1B', bg2: '#0F2A26', surface: '#143632', surface2: '#1B423C',
      ink: '#E8FBF6', ink2: '#BCEFE3', muted: '#7BB0A6',
      accent: '#3CDFC0', accentDeep: '#1FB59B', pop: '#FF6FA8',
      good: '#3CDFC0', bad: '#FF6FA8',
      cardShadow: '0 12px 36px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
    },
  },
};

export function getTokens(paletteKey: PaletteKey, dark: boolean): ThemeTokens {
  const p = THEMES[paletteKey] ?? THEMES.surprise;
  return dark ? p.dark : p.light;
}

export function peso(n: number, { compact = false } = {}): string {
  const abs = Math.abs(n);
  if (compact && abs >= 1000) {
    if (abs >= 1_000_000) return `₱${(n / 1_000_000).toFixed(1)}M`;
    return `₱${(n / 1000).toFixed(1)}K`;
  }
  return `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
