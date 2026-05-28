import React from 'react';

interface LogoProps {
  size?: number;        // icon size in px
  showText?: boolean;   // show "BillBro" text next to icon
  textColor?: string;
  textSize?: number;
}

/** Inline wallet icon + BillBro wordmark */
export function Logo({ size = 32, showText = true, textColor = '#1B1638', textSize }: LogoProps) {
  const ts = textSize ?? Math.round(size * 0.65);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(size * 0.3) }}>
      {/* Wallet icon SVG — brand colours, not theme-dependent */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
        style={{ display: 'block', flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#A88BFF" />
            <stop offset="60%"  stopColor="#7B5BE0" />
            <stop offset="100%" stopColor="#FF7A45" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" rx="110" fill="url(#logo-bg)" />
        <rect x="72"  y="130" width="368" height="266" rx="40" fill="rgba(255,255,255,0.93)" />
        <rect x="140" y="194" width="232" height="120" rx="22" fill="#FF7A45" />
        <circle cx="200" cy="172" r="16" fill="#1B1638" />
        <circle cx="312" cy="172" r="16" fill="#1B1638" />
        <path d="M 210 210 Q 256 250 302 210" stroke="#1B1638" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="398" cy="310" r="10" fill="#A88BFF" />
        <circle cx="416" cy="324" r="10" fill="#FF7A45" />
        <circle cx="426" cy="344" r="10" fill="#3FBF93" />
      </svg>

      {showText && (
        <span style={{
          fontFamily: "'Fraunces', serif",
          fontSize: ts,
          fontWeight: 700,
          color: textColor,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          BillBro
        </span>
      )}
    </div>
  );
}
