'use client';

import React from 'react';

export const EXPRESSION_LABELS: Record<string, string> = {
  happy: 'Happy',
  worried: 'Worried',
  celebrate: 'Celebrating',
  neutral: 'Neutral',
  laughing: 'Crying-laughing',
  sus: 'Sus side-eye',
  coaching: 'Coaching',
  hyped: 'Hyped / flex',
  sleepy: 'Sleepy / chill',
};

export const EXPRESSION_CAPTIONS: Record<string, string> = {
  happy: "yo we're on track 👊",
  worried: 'bruh… check ur food spend',
  celebrate: 'BRO LFG savings 🎉',
  neutral: "checkin' the books…",
  laughing: 'lmao the Grab bill',
  sus: 'u sure about that?',
  coaching: 'tip: 50/30/20 rule',
  hyped: 'GOAL HIT 💪',
  sleepy: 'chill week. nice.',
};

interface ExpressionDef {
  eyes: string;
  mouth: string;
  arms: string;
  cheeks: boolean;
  brows?: string;
  accessory?: string;
  cardTilt?: number;
}

const EXPRESSIONS: Record<string, ExpressionDef> = {
  happy:     { eyes: 'open',        mouth: 'smile',       arms: 'down',     cheeks: true },
  worried:   { eyes: 'small',       mouth: 'frown',       arms: 'down',     cheeks: false, brows: 'worry',  accessory: 'sweat', cardTilt: -10 },
  celebrate: { eyes: 'closed_up',   mouth: 'open_smile',  arms: 'up',       cheeks: true,  accessory: 'sparkles' },
  neutral:   { eyes: 'open',        mouth: 'flat',        arms: 'down',     cheeks: false },
  laughing:  { eyes: 'closed_up',   mouth: 'wide_open',   arms: 'down',     cheeks: true,  accessory: 'tears' },
  sus:       { eyes: 'side_eye',    mouth: 'smirk',       arms: 'arm_chin', cheeks: false, brows: 'sus' },
  coaching:  { eyes: 'open',        mouth: 'open_talk',   arms: 'point',    cheeks: true,  brows: 'coach' },
  hyped:     { eyes: 'stars',       mouth: 'big_smile',   arms: 'flex',     cheeks: true,  brows: 'hype',   accessory: 'sparkles' },
  sleepy:    { eyes: 'closed_flat', mouth: 'tiny',        arms: 'down',     cheeks: false, accessory: 'zzz' },
};

// ─── EYES ─────────────────────────────────────────────────────
function Eyes({ type, ink, pop }: { type: string; ink: string; pop: string }) {
  switch (type) {
    case 'open':
      return (
        <g>
          <ellipse cx="100" cy="115" rx="6" ry="8" fill={ink} />
          <ellipse cx="140" cy="115" rx="6" ry="8" fill={ink} />
          <circle cx="102" cy="112" r="2" fill="#fff" />
          <circle cx="142" cy="112" r="2" fill="#fff" />
        </g>
      );
    case 'small':
      return (
        <g>
          <circle cx="100" cy="116" r="3" fill={ink} />
          <circle cx="140" cy="116" r="3" fill={ink} />
        </g>
      );
    case 'closed_up':
      return (
        <g fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round">
          <path d="M91 118 Q100 108 109 118" />
          <path d="M131 118 Q140 108 149 118" />
        </g>
      );
    case 'closed_flat':
      return (
        <g fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round">
          <path d="M92 116 L108 116" />
          <path d="M132 116 L148 116" />
        </g>
      );
    case 'side_eye':
      return (
        <g>
          <ellipse cx="100" cy="115" rx="7" ry="8" fill="#fff" stroke={ink} strokeWidth="1.5" />
          <ellipse cx="140" cy="115" rx="7" ry="8" fill="#fff" stroke={ink} strokeWidth="1.5" />
          <circle cx="104" cy="116" r="3.5" fill={ink} />
          <circle cx="144" cy="116" r="3.5" fill={ink} />
        </g>
      );
    case 'stars':
      return (
        <g fill={pop}>
          <path d="M100 105 L102 113 L110 115 L102 117 L100 125 L98 117 L90 115 L98 113 Z" />
          <path d="M140 105 L142 113 L150 115 L142 117 L140 125 L138 117 L130 115 L138 113 Z" />
        </g>
      );
    case 'hearts':
      return (
        <g fill={pop}>
          <path d="M100 110 C97 107 92 108 92 113 C92 118 100 122 100 122 C100 122 108 118 108 113 C108 108 103 107 100 110 Z" />
          <path d="M140 110 C137 107 132 108 132 113 C132 118 140 122 140 122 C140 122 148 118 148 113 C148 108 143 107 140 110 Z" />
        </g>
      );
    case 'wink':
      return (
        <g>
          <path d="M91 118 Q100 108 109 118" fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="140" cy="115" rx="6" ry="8" fill={ink} />
          <circle cx="142" cy="112" r="2" fill="#fff" />
        </g>
      );
    default:
      return null;
  }
}

// ─── MOUTH ────────────────────────────────────────────────────
function Mouth({ type, ink, pop }: { type: string; ink: string; pop: string }) {
  switch (type) {
    case 'smile':
      return <path d="M108 138 Q120 148 132 138" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />;
    case 'big_smile':
      return (
        <g>
          <path d="M102 134 Q120 152 138 134 Z" fill={ink} />
          <path d="M108 142 Q120 148 132 142" fill="#FF6B8E" strokeWidth="0" />
        </g>
      );
    case 'open_smile':
      return (
        <g>
          <path d="M104 132 Q120 150 136 132 Q132 142 120 144 Q108 142 104 132 Z" fill={ink} />
          <path d="M110 138 Q120 144 130 138" fill="#FF6B8E" />
        </g>
      );
    case 'wide_open':
      return (
        <g>
          <ellipse cx="120" cy="138" rx="14" ry="10" fill={ink} />
          <ellipse cx="120" cy="142" rx="9" ry="5" fill="#FF6B8E" />
        </g>
      );
    case 'flat':
      return <path d="M112 138 L128 138" stroke={ink} strokeWidth="3" strokeLinecap="round" />;
    case 'frown':
      return <path d="M110 142 Q120 134 130 142" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />;
    case 'smirk':
      return <path d="M112 140 Q122 138 130 134" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />;
    case 'open_talk':
      return (
        <g>
          <ellipse cx="120" cy="139" rx="7" ry="5" fill={ink} />
          <path d="M114 138 Q120 142 126 138" stroke="#fff" strokeWidth="1" fill="none" />
        </g>
      );
    case 'tiny':
      return <circle cx="120" cy="138" r="2.5" fill={ink} />;
    default:
      return null;
  }
}

// ─── BROWS ─────────────────────────────────────────────────────
function Brows({ type, ink }: { type: string; ink: string }) {
  switch (type) {
    case 'worry':
      return (
        <g stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M92 102 L108 104" />
          <path d="M132 104 L148 102" />
        </g>
      );
    case 'sus':
      return (
        <g stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M92 104 L108 100" />
          <path d="M132 102 L146 106" />
        </g>
      );
    case 'coach':
      return (
        <g stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M92 100 L108 104" />
          <path d="M132 104 L148 100" />
        </g>
      );
    case 'hype':
      return (
        <g stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M92 100 Q100 96 108 100" />
          <path d="M132 100 Q140 96 148 100" />
        </g>
      );
    default:
      return null;
  }
}

// ─── ARMS ─────────────────────────────────────────────────────
function Arms({ pose, accent, accentDark, ink, cream, pop }: {
  pose: string; accent: string; accentDark: string; ink: string; cream: string; pop: string;
}) {
  const Bracelet = ({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) => (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <circle cx="0" cy="0" r="3" fill={pop} />
      <circle cx="6" cy="0" r="3" fill="#7BD8B8" />
      <circle cx="-6" cy="0" r="3" fill="#FFD66B" />
      <circle cx="12" cy="0" r="3" fill={cream} />
      <circle cx="-12" cy="0" r="3" fill="#A88BFF" />
    </g>
  );

  const Hand = ({ cx, cy, r = 9 }: { cx: number; cy: number; r?: number }) => (
    <circle cx={cx} cy={cy} r={r} fill="#FFCDA8" stroke={ink} strokeOpacity="0.15" strokeWidth="1" />
  );

  const Bicep = ({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) => (
    <ellipse cx={x} cy={y} rx="14" ry="11"
      fill={accent} stroke={accentDark} strokeWidth="1.5"
      transform={flip ? `rotate(20 ${x} ${y})` : `rotate(-20 ${x} ${y})`} />
  );

  switch (pose) {
    case 'down':
      return (
        <g>
          <rect x="36" y="140" width="22" height="55" rx="11" fill={accent} />
          <Hand cx={47} cy={196} />
          <rect x="182" y="140" width="22" height="55" rx="11" fill={accent} />
          <Hand cx={193} cy={196} />
          <Bracelet x={193} y={186} />
        </g>
      );
    case 'flex':
      return (
        <g>
          <g transform="rotate(-30 56 150)">
            <rect x="40" y="120" width="22" height="60" rx="11" fill={accent} />
          </g>
          <Bicep x={42} y={120} />
          <Hand cx={45} cy={108} r={10} />
          <g transform="rotate(30 184 150)">
            <rect x="178" y="120" width="22" height="60" rx="11" fill={accent} />
          </g>
          <Bicep x={198} y={120} flip />
          <Hand cx={195} cy={108} r={10} />
          <Bracelet x={195} y={100} rotate={15} />
        </g>
      );
    case 'up':
      return (
        <g>
          <g transform="rotate(-25 56 150)">
            <rect x="40" y="100" width="22" height="70" rx="11" fill={accent} />
          </g>
          <Hand cx={32} cy={92} r={10} />
          <g transform="rotate(25 184 150)">
            <rect x="178" y="100" width="22" height="70" rx="11" fill={accent} />
          </g>
          <Hand cx={208} cy={92} r={10} />
          <Bracelet x={208} y={82} rotate={20} />
        </g>
      );
    case 'point':
      return (
        <g>
          <rect x="36" y="140" width="22" height="55" rx="11" fill={accent} />
          <Hand cx={47} cy={196} />
          <g transform="rotate(-20 184 150)">
            <rect x="178" y="98" width="22" height="72" rx="11" fill={accent} />
          </g>
          <Hand cx={213} cy={92} r={11} />
          <rect x="218" y="76" width="6" height="14" rx="3" fill="#FFCDA8" />
          <Bracelet x={213} y={104} rotate={-15} />
        </g>
      );
    case 'arm_chin':
      return (
        <g>
          <rect x="36" y="140" width="22" height="55" rx="11" fill={accent} />
          <Hand cx={47} cy={196} />
          <g transform="rotate(60 184 160)">
            <rect x="178" y="130" width="22" height="56" rx="11" fill={accent} />
          </g>
          <Hand cx={148} cy={140} r={9} />
          <Bracelet x={170} y={160} rotate={70} />
        </g>
      );
    default:
      return null;
  }
}

// ─── ACCESSORIES ─────────────────────────────────────────────
function Accessory({ type, pop, accent, ink, cream }: {
  type: string; pop: string; accent: string; ink: string; cream: string;
}) {
  switch (type) {
    case 'sweat':
      return (
        <g>
          <path d="M168 95 Q172 105 168 112 Q164 105 168 95 Z" fill="#7BC8FF" stroke={ink} strokeOpacity="0.2" strokeWidth="1" />
          <circle cx="166" cy="100" r="1.2" fill="#fff" opacity="0.7" />
        </g>
      );
    case 'tears':
      return (
        <g fill="#7BC8FF" stroke={ink} strokeOpacity="0.2" strokeWidth="1">
          <path d="M88 120 Q84 132 88 140 Q92 132 88 120 Z" />
          <path d="M152 120 Q148 132 152 140 Q156 132 152 120 Z" />
        </g>
      );
    case 'sparkles':
      return (
        <g fill={pop}>
          <path d="M40 70 L42 78 L50 80 L42 82 L40 90 L38 82 L30 80 L38 78 Z" />
          <path d="M200 70 L202 78 L210 80 L202 82 L200 90 L198 82 L190 80 L198 78 Z" />
          <path d="M30 180 L31 184 L35 185 L31 186 L30 190 L29 186 L25 185 L29 184 Z" opacity="0.7" />
          <path d="M210 180 L211 184 L215 185 L211 186 L210 190 L209 186 L205 185 L209 184 Z" opacity="0.7" />
        </g>
      );
    case 'zzz':
      return (
        <g fill={ink} fontFamily="'Sora', system-ui" fontWeight="700">
          <text x="180" y="50" fontSize="20" opacity="0.4">z</text>
          <text x="195" y="38" fontSize="26" opacity="0.6">z</text>
          <text x="215" y="22" fontSize="32" opacity="0.85">Z</text>
        </g>
      );
    default:
      return null;
  }
}

// ─── WALLET BRO ───────────────────────────────────────────────
export interface WalletBroProps {
  expression?: string;
  size?: number;
  accent?: string;
  accentDark?: string;
  pop?: string;
  cream?: string;
  ink?: string;
  cheek?: string;
  animated?: boolean;
}

export function WalletBro({
  expression = 'happy',
  size = 180,
  accent = '#A88BFF',
  accentDark = '#7B5BE0',
  pop = '#FF7A45',
  cream = '#FFF1DA',
  ink = '#1B1638',
  cheek = '#FF93B7',
  animated = true,
}: WalletBroProps) {
  const E = EXPRESSIONS[expression] || EXPRESSIONS.happy;

  const [delay, setDelay] = React.useState('0s');
  React.useEffect(() => {
    setDelay((Math.random() * -3).toFixed(2) + 's');
  }, []);

  return (
    <div style={{
      display: 'inline-block',
      animation: animated ? `bro-breathe 2.8s ease-in-out infinite` : 'none',
      animationDelay: delay,
      transformOrigin: '50% 100%',
    }}>
      <div style={{
        animation: animated ? `bro-bob 4.2s ease-in-out infinite` : 'none',
        animationDelay: delay,
        transformOrigin: '50% 90%',
      }}>
        <svg viewBox="0 0 240 280" width={size} height={size * (280 / 240)} style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id={`bodyG-${expression}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={accent} />
              <stop offset="1" stopColor={accentDark} />
            </linearGradient>
            <linearGradient id={`cardG-${expression}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FFB58A" />
              <stop offset="1" stopColor={pop} />
            </linearGradient>
          </defs>

          {/* shadow under bro */}
          <ellipse cx="120" cy="265" rx="60" ry="6" fill="rgba(0,0,0,0.12)" />

          {/* LEGS + SNEAKERS */}
          <g>
            <rect x="86" y="218" width="18" height="32" rx="8" fill={accentDark} />
            <rect x="136" y="218" width="18" height="32" rx="8" fill={accentDark} />
            <g>
              <rect x="74" y="244" width="38" height="20" rx="9" fill={cream} />
              <rect x="74" y="257" width="38" height="7" rx="3.5" fill={ink} />
              <circle cx="79" cy="251" r="2" fill={pop} />
              <path d="M82 250 L92 250" stroke={pop} strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <g>
              <rect x="128" y="244" width="38" height="20" rx="9" fill={cream} />
              <rect x="128" y="257" width="38" height="7" rx="3.5" fill={ink} />
              <circle cx="161" cy="251" r="2" fill={pop} />
              <path d="M148 250 L158 250" stroke={pop} strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>

          {/* ARMS - drawn behind body */}
          <Arms pose={E.arms} accent={accent} accentDark={accentDark} ink={ink} cream={cream} pop={pop} />

          {/* CARD peeking out top of wallet */}
          <g transform={`rotate(${E.cardTilt ?? -4} 120 70)`}>
            <rect x="80" y="50" width="80" height="34" rx="6" fill={`url(#cardG-${expression})`} />
            <rect x="80" y="50" width="80" height="34" rx="6" fill="none" stroke={ink} strokeOpacity="0.15" strokeWidth="1" />
            <rect x="88" y="58" width="18" height="12" rx="2" fill="#FFE6A8" />
            <rect x="91" y="61" width="12" height="6" rx="1" fill={pop} opacity="0.5" />
            <circle cx="148" cy="74" r="3" fill="#fff" opacity="0.6" />
            <circle cx="142" cy="74" r="3" fill="#fff" opacity="0.4" />
          </g>

          {/* WALLET BODY */}
          <g>
            <rect x="56" y="76" width="128" height="148" rx="28" fill={`url(#bodyG-${expression})`} />
            <path d="M62 90 Q120 78 178 90" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M64 152 L176 152" stroke={ink} strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="108" y="145" width="24" height="14" rx="3" fill={accentDark} />
            <rect x="112" y="148" width="16" height="8" rx="1.5" fill={cream} />
            <circle cx="120" cy="152" r="2.2" fill={ink} />

            {/* FACE PATCH */}
            <ellipse cx="120" cy="118" rx="48" ry="34" fill={cream} />

            {/* CHEEKS */}
            {E.cheeks !== false && (
              <>
                <ellipse cx="92" cy="126" rx="7" ry="4.5" fill={cheek} opacity="0.7" />
                <ellipse cx="148" cy="126" rx="7" ry="4.5" fill={cheek} opacity="0.7" />
              </>
            )}

            {/* EYES */}
            <Eyes type={E.eyes} ink={ink} pop={pop} />

            {/* MOUTH */}
            <Mouth type={E.mouth} ink={ink} pop={pop} />

            {/* EYEBROWS */}
            {E.brows && <Brows type={E.brows} ink={ink} />}
          </g>

          {/* ACCESSORIES */}
          {E.accessory && <Accessory type={E.accessory} pop={pop} accent={accent} ink={ink} cream={cream} />}
        </svg>
      </div>
    </div>
  );
}
