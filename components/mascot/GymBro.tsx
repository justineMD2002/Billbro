'use client';

import React from 'react';

export interface BroGymLifterProps {
  size?: number;
  accent?: string;
  accentDark?: string;
  pop?: string;
  cream?: string;
  ink?: string;
  speed?: number;
}

export function BroGymLifter({
  size = 200,
  accent = '#A88BFF',
  accentDark = '#7B5BE0',
  pop = '#FF7A45',
  cream = '#FFF1DA',
  ink = '#1B1638',
  speed = 0.9,
}: BroGymLifterProps) {
  const dur = `${speed}s`;
  const dur2 = `${speed * 2}s`;

  return (
    <svg viewBox="0 0 240 280" width={size} height={size * 280 / 240} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="gymBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor={accentDark} />
        </linearGradient>
      </defs>

      {/* GROUND SHADOW pulses */}
      <ellipse cx="120" cy="265" rx="62" ry="6" fill="rgba(0,0,0,0.18)">
        <animate attributeName="rx" values="62;55;62" dur={dur} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.18;0.28;0.18" dur={dur} repeatCount="indefinite" />
      </ellipse>

      {/* WHOLE BODY squat-bob */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="0 0; 0 6; 0 0" dur={dur} repeatCount="indefinite" />

        {/* LEGS + sneakers (stationary) */}
        <g>
          <rect x="86" y="218" width="18" height="32" rx="8" fill={accentDark} />
          <rect x="136" y="218" width="18" height="32" rx="8" fill={accentDark} />
          <rect x="74" y="244" width="38" height="20" rx="9" fill={cream} />
          <rect x="74" y="257" width="38" height="7" rx="3.5" fill={ink} />
          <path d="M82 250 L92 250" stroke={pop} strokeWidth="2.5" strokeLinecap="round" />
          <rect x="128" y="244" width="38" height="20" rx="9" fill={cream} />
          <rect x="128" y="257" width="38" height="7" rx="3.5" fill={ink} />
          <path d="M148 250 L158 250" stroke={pop} strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* LEFT arm + dumbbell — curling */}
        <g style={{ transformOrigin: '52px 145px' }}>
          <animateTransform attributeName="transform" type="rotate"
            values="-10 52 145; -110 52 145; -10 52 145" dur={dur} repeatCount="indefinite" calcMode="spline"
            keySplines="0.3 0 0.5 1; 0.4 0 0.7 1" keyTimes="0;0.5;1" />
          <rect x="40" y="120" width="22" height="62" rx="11" fill={accent} />
          <ellipse cx="51" cy="115" rx="14" ry="10" fill={accent} stroke={accentDark} strokeWidth="1.5" />
          <circle cx="51" cy="106" r="9" fill="#FFCDA8" stroke={ink} strokeOpacity="0.15" strokeWidth="1" />
          {/* dumbbell */}
          <g transform="translate(51 96)">
            <rect x="-3" y="-2" width="6" height="4" rx="1" fill={ink} />
            <rect x="-10" y="-7" width="6" height="14" rx="2" fill={ink} />
            <rect x="4" y="-7" width="6" height="14" rx="2" fill={ink} />
            <rect x="-9" y="-5" width="2" height="10" fill={pop} opacity="0.7" />
            <rect x="7" y="-5" width="2" height="10" fill={pop} opacity="0.7" />
          </g>
        </g>

        {/* RIGHT arm + dumbbell — opposite phase */}
        <g style={{ transformOrigin: '188px 145px' }}>
          <animateTransform attributeName="transform" type="rotate"
            values="10 188 145; 110 188 145; 10 188 145" dur={dur} repeatCount="indefinite" calcMode="spline"
            keySplines="0.3 0 0.5 1; 0.4 0 0.7 1" keyTimes="0;0.5;1" begin={`-${speed / 2}s`} />
          <rect x="178" y="120" width="22" height="62" rx="11" fill={accent} />
          <ellipse cx="189" cy="115" rx="14" ry="10" fill={accent} stroke={accentDark} strokeWidth="1.5" />
          <circle cx="189" cy="106" r="9" fill="#FFCDA8" stroke={ink} strokeOpacity="0.15" strokeWidth="1" />
          {/* friendship beads on right wrist */}
          <g transform="translate(189 99)">
            <circle cx="0" cy="0" r="2.6" fill={pop} />
            <circle cx="5" cy="0" r="2.6" fill="#7BD8B8" />
            <circle cx="-5" cy="0" r="2.6" fill="#FFD66B" />
            <circle cx="10" cy="0" r="2.6" fill={cream} />
            <circle cx="-10" cy="0" r="2.6" fill="#A88BFF" />
          </g>
          {/* dumbbell */}
          <g transform="translate(189 96)">
            <rect x="-3" y="-2" width="6" height="4" rx="1" fill={ink} />
            <rect x="-10" y="-7" width="6" height="14" rx="2" fill={ink} />
            <rect x="4" y="-7" width="6" height="14" rx="2" fill={ink} />
            <rect x="-9" y="-5" width="2" height="10" fill={pop} opacity="0.7" />
            <rect x="7" y="-5" width="2" height="10" fill={pop} opacity="0.7" />
          </g>
        </g>

        {/* CARD peeks */}
        <g transform="rotate(-4 120 70)">
          <rect x="80" y="50" width="80" height="34" rx="6" fill={pop} />
          <rect x="80" y="50" width="80" height="34" rx="6" fill="none" stroke={ink} strokeOpacity="0.15" strokeWidth="1" />
          <rect x="88" y="58" width="18" height="12" rx="2" fill="#FFE6A8" />
        </g>

        {/* WALLET BODY */}
        <rect x="56" y="76" width="128" height="148" rx="28" fill="url(#gymBody)" />
        <path d="M64 152 L176 152" stroke={ink} strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="108" y="145" width="24" height="14" rx="3" fill={accentDark} />
        <rect x="112" y="148" width="16" height="8" rx="1.5" fill={cream} />
        <circle cx="120" cy="152" r="2.2" fill={ink} />

        {/* FACE PATCH */}
        <ellipse cx="120" cy="118" rx="48" ry="34" fill={cream} />

        {/* HYPED EYES (stars) */}
        <g fill={pop}>
          <path d="M100 105 L102 113 L110 115 L102 117 L100 125 L98 117 L90 115 L98 113 Z" />
          <path d="M140 105 L142 113 L150 115 L142 117 L140 125 L138 117 L130 115 L138 113 Z" />
        </g>

        {/* hype brows */}
        <g stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M92 100 Q100 96 108 100" />
          <path d="M132 100 Q140 96 148 100" />
        </g>

        {/* BIG OPEN SMILE */}
        <path d="M102 134 Q120 152 138 134 Z" fill={ink} />
        <path d="M108 142 Q120 148 132 142" fill="#FF6B8E" />

        {/* cheeks */}
        <ellipse cx="92" cy="126" rx="7" ry="4.5" fill="#FF93B7" opacity="0.7" />
        <ellipse cx="148" cy="126" rx="7" ry="4.5" fill="#FF93B7" opacity="0.7" />
      </g>

      {/* SWEAT DROPLETS that fly off */}
      <g fill="#7BC8FF" stroke={ink} strokeOpacity="0.2" strokeWidth="0.8">
        <path d="M70 60 Q66 70 70 78 Q74 70 70 60 Z">
          <animate attributeName="opacity" values="0;1;0" dur={dur2} repeatCount="indefinite" begin="0s" />
          <animateTransform attributeName="transform" type="translate" values="0 0; -10 -20" dur={dur2} repeatCount="indefinite" begin="0s" />
        </path>
        <path d="M170 60 Q166 70 170 78 Q174 70 170 60 Z">
          <animate attributeName="opacity" values="0;1;0" dur={dur2} repeatCount="indefinite" begin={`-${speed * 0.7}s`} />
          <animateTransform attributeName="transform" type="translate" values="0 0; 14 -22" dur={dur2} repeatCount="indefinite" begin={`-${speed * 0.7}s`} />
        </path>
      </g>

      {/* SPARKLES */}
      <g fill={pop}>
        <path d="M30 90 L31 94 L35 95 L31 96 L30 100 L29 96 L25 95 L29 94 Z">
          <animate attributeName="opacity" values="0;1;0" dur={dur2} repeatCount="indefinite" begin="0s" />
        </path>
        <path d="M210 90 L211 94 L215 95 L211 96 L210 100 L209 96 L205 95 L209 94 Z">
          <animate attributeName="opacity" values="0;1;0" dur={dur2} repeatCount="indefinite" begin={`-${speed}s`} />
        </path>
      </g>
    </svg>
  );
}
