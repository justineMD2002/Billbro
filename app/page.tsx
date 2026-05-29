import Link from 'next/link';
import { WalletBro } from '@/components/mascot/WalletBro';
import { BroGymLifter } from '@/components/mascot/GymBro';
import { PhoneMock } from '@/components/landing/PhoneMock';

function FeatIcon({ icon }: { icon: string }) {
  const c = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none' as const, stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (icon) {
    case 'lock': return <svg {...c}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>;
    case 'grid': return <svg {...c}><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>;
    case 'split': return <svg {...c}><path d="M12 3v18M5 8l-2 2 2 2M19 8l2 2-2 2M3 10h6M15 10h6"/></svg>;
    case 'brain': return <svg {...c}><path d="M9 3a3 3 0 00-3 3 3 3 0 00-1 5.8A3 3 0 007 17a3 3 0 005 1 3 3 0 005-1 3 3 0 002-5.2A3 3 0 0018 6a3 3 0 00-3-3 3 3 0 00-3 1.5A3 3 0 009 3z"/></svg>;
    default: return null;
  }
}

export default function LandingPage() {
  return (
    <div className="lp-root">

      {/* NAV */}
      <nav className="lp-nav">
        <div className="lp-container lp-nav-inner">
          <div className="lp-logo">
            <div className="lp-logo-mark">
              <div style={{ transform: 'scale(0.5) translateY(2px)' }}>
                <WalletBro expression="happy" size={70} accent="#C7F8EF" accentDark="#A0F0E0" pop="#FF4F92" animated={false} />
              </div>
            </div>
            <span className="lp-logo-text">BillBro</span>
          </div>
          <div className="lp-nav-links">
            <a href="#features">Features</a>
            <a href="#moods">Meet Bro</a>
            <a href="#how">How it works</a>
            {/* <a href="#pricing">Pricing</a> */}
          </div>
          <Link href="/signup" className="lp-btn lp-btn-primary lp-btn-sm">Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="lp-hero">
        <div className="lp-blob lp-blob-1" />
        <div className="lp-blob lp-blob-2" />
        <div className="lp-container lp-hero-grid">
          <div className="lp-hero-copy">
            {/* <div className="lp-pill">
              <span className="lp-pill-dot" />
              Built for the ₱ payday cycle
            </div> */}
            <h1 className="lp-h1">
              Your <span className="lp-h1-accent">brother</span> in budgeting.
            </h1>
            <p className="lp-sub">
              BillBro watches your salary, loans, and budgets like a real bro — and tells you straight up how much you can spend each day till payday. No spreadsheets. No guilt. Just gains. 💪
            </p>
            <div className="lp-hero-actions">
              {/* <Link href="/signup" className="lp-btn lp-btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17 1H7a3 3 0 00-3 3v16a3 3 0 003 3h10a3 3 0 003-3V4a3 3 0 00-3-3zm-5 21a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zM18 18H6V4h12z"/></svg>
                Download free
              </Link> */}
              <a href="#how" className="lp-btn lp-btn-ghost">See how it works →</a>
            </div>
            {/* <div className="lp-hero-trust">
              <span className="lp-stars">★★★★★</span>
              <span>Loved by <b>12,000+</b> kabayan savers</span>
            </div> */}
          </div>
          <div className="lp-hero-visual">
            <div className="lp-float lp-float-1">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="lp-float-icon lp-float-icon-bad">🍔</div>
                <div>
                  <div className="lp-float-label">Food budget</div>
                  <div className="lp-float-sub lp-float-sub-bad">₱420 over · chill bro</div>
                </div>
              </div>
            </div>
            <div className="lp-float lp-float-2">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="lp-float-icon lp-float-icon-good">💪</div>
                <div>
                  <div className="lp-float-label">Saved ₱8,045</div>
                  <div className="lp-float-sub lp-float-sub-good">+49% vs last month</div>
                </div>
              </div>
            </div>
            <PhoneMock w={272} />
          </div>
        </div>
      </header>

      {/* TRUST STRIP */}
      {/* <section className="lp-trust">
        <div className="lp-container lp-trust-grid">
          {([
            { v: '₱2.4M', k: 'tracked monthly' },
            { v: '12K+', k: 'active bros' },
            { v: '4.9★', k: 'app rating' },
            { v: '₱8K', k: 'avg. saved / mo' },
          ] as const).map(s => (
            <div key={s.k} className="lp-trust-item">
              <div className="lp-trust-v">{s.v}</div>
              <div className="lp-trust-k">{s.k}</div>
            </div>
          ))}
        </div>
      </section> */}

      {/* FEATURES */}
      <section id="features" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-head">
            <div className="lp-eyebrow">Why BillBro hits different</div>
            <h2 className="lp-h2">Not another boring budget app.</h2>
            <p className="lp-section-sub">Bro thinks in <b>days till payday</b>, not abstract monthly totals. Here&apos;s what he&apos;s got your back on.</p>
          </div>
          <div className="lp-features-grid">
            <div className="lp-feature lp-feature-big lp-feature-gradient">
              <div className="lp-feature-big-inner">
                <div style={{ flex: 1 }}>
                  <div className="lp-feature-tag lp-feature-tag-light">Salary-aware</div>
                  <h3 className="lp-feature-title lp-feature-title-light">Knows your payday.<br />Paces your spending.</h3>
                  <p className="lp-feature-body lp-feature-body-light">Log your salary once and Bro turns it into a daily allowance — &ldquo;₱566/day till June 26.&rdquo; Spend within it and you&apos;ll never hit the end-of-month panic again.</p>
                </div>
                <div className="lp-feature-big-art">
                  <WalletBro expression="coaching" size={140} accent="#C7F8EF" accentDark="#A0F0E0" pop="#FF4F92" />
                </div>
              </div>
            </div>
            <div className="lp-feature">
              <div className="lp-feature-icon lp-feature-icon-deep"><FeatIcon icon="lock" /></div>
              <h3 className="lp-feature-title">Loans with finish lines</h3>
              <p className="lp-feature-body">Car loan, phone installment — Bro tracks month 23 of 60, the balance left, and exactly when you&apos;re free.</p>
            </div>
            <div className="lp-feature">
              <div className="lp-feature-icon lp-feature-icon-pop"><FeatIcon icon="grid" /></div>
              <h3 className="lp-feature-title">Envelopes that talk back</h3>
              <p className="lp-feature-body">Set a budget per category. Go over and Bro calls it — then tells you how to claw it back before payday.</p>
            </div>
            <div className="lp-feature">
              <div className="lp-feature-icon lp-feature-icon-good"><FeatIcon icon="split" /></div>
              <h3 className="lp-feature-title">One-time or budgeted</h3>
              <p className="lp-feature-body">A random restaurant? Log it once. Coffee you do daily? Bro counts it against your envelope automatically.</p>
            </div>
            <div className="lp-feature">
              <div className="lp-feature-icon lp-feature-icon-accent"><FeatIcon icon="brain" /></div>
              <h3 className="lp-feature-title">Bro&apos;s got the plan</h3>
              <p className="lp-feature-body">Real, specific advice: &ldquo;Skip 1 Grab + 2 coffees this week to break even.&rdquo; Coaching, not shaming.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MOODS */}
      <section id="moods" className="lp-section lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-head">
            <div className="lp-eyebrow">Meet WalletBro</div>
            <h2 className="lp-h2">He reacts to every peso.</h2>
            <p className="lp-section-sub">A pocket-shaped buddy with a friendship bracelet who&apos;s hyped when you save and sus when you don&apos;t. He <i>feels</i> your spending so you actually pay attention.</p>
          </div>
          <div className="lp-moods-grid">
            {([
              { exp: 'hyped', cap: 'GOAL HIT 💪' },
              { exp: 'sus', cap: 'u sure about that?' },
              { exp: 'coaching', cap: 'tip: 50/30/20' },
              { exp: 'celebrate', cap: 'BRO LFG 🎉' },
              { exp: 'worried', cap: 'check ur food spend' },
              { exp: 'laughing', cap: 'lmao the Grab bill' },
              { exp: 'sleepy', cap: 'chill week, nice' },
              { exp: 'happy', cap: "we're on track 👊" },
            ] as const).map(m => (
              <div key={m.exp} className="lp-mood-card">
                <WalletBro expression={m.exp} size={120} accent="#16C5A8" accentDark="#0E9A82" pop="#FF4F92" />
                <div className="lp-mood-cap">&ldquo;{m.cap}&rdquo;</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-head">
            <div className="lp-eyebrow">How it works</div>
            <h2 className="lp-h2">Three taps to financial bro-hood.</h2>
          </div>
          <div className="lp-steps-grid">
            {([
              { n: '01', title: 'Drop your salary', body: 'Tell Bro when you get paid and how much. He builds your cycle instantly.', exp: 'happy' },
              { n: '02', title: 'Log as you go', body: 'One-time, budgeted, or a loan with an end date — Bro sorts it and reacts.', exp: 'coaching' },
              { n: '03', title: 'Spend on a plan', body: 'Follow your daily allowance. Hit payday with money to spare. Repeat.', exp: 'hyped' },
            ] as const).map((s, i) => (
              <div key={s.n} className="lp-step">
                <div className="lp-step-num">{s.n}</div>
                <div className="lp-step-art">
                  <WalletBro expression={s.exp} size={104} accent="#16C5A8" accentDark="#0E9A82" pop="#FF4F92" />
                </div>
                <h3 className="lp-step-title">{s.title}</h3>
                <p className="lp-step-body">{s.body}</p>
                {i < 2 && <div className="lp-step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      {/* <section id="pricing" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-head">
            <div className="lp-eyebrow">Pricing</div>
            <h2 className="lp-h2">Free to start. Bro doesn&apos;t gatekeep.</h2>
          </div>
          <div className="lp-pricing-grid">
            <div className="lp-price-card lp-price-card-free">
              <div className="lp-price-name">Lil&apos; Bro</div>
              <div className="lp-price-amt">₱0<span>/forever</span></div>
              <ul className="lp-price-feats">
                <li>Salary cycle + daily allowance</li>
                <li>Unlimited transactions</li>
                <li>3 budget envelopes</li>
                <li>WalletBro reactions</li>
              </ul>
              <Link href="/signup" className="lp-btn lp-btn-ghost lp-btn-block">Start free</Link>
            </div>
            <div className="lp-price-card lp-price-card-feat">
              <div className="lp-price-badge">Most gains</div>
              <div className="lp-price-name lp-price-name-light">Big Bro</div>
              <div className="lp-price-amt lp-price-amt-light">₱149<span className="lp-price-period-light">/month</span></div>
              <ul className="lp-price-feats lp-price-feats-light">
                <li>Everything in Lil&apos; Bro</li>
                <li>Unlimited loans + bills tracking</li>
                <li>Unlimited envelopes</li>
                <li>AI coaching + savings goals</li>
                <li>Multi-currency (OFW mode)</li>
              </ul>
              <Link href="/signup" className="lp-btn lp-btn-block lp-btn-white">Go Big Bro</Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section id="download" className="lp-section">
        <div className="lp-container">
          <div className="lp-cta">
            <div className="lp-cta-blob" />
            <div className="lp-cta-inner">
              <div className="lp-cta-art">
                <BroGymLifter size={150} accent="#16C5A8" accentDark="#0E9A82" pop="#FF4F92" />
              </div>
              <div className="lp-cta-copy">
                <h2 className="lp-cta-title">Your wallet&apos;s about to get swole.</h2>
                <p className="lp-cta-sub">Download BillBro and let your financial brother do the heavy lifting. Free forever to start.</p>
                <div className="lp-cta-actions">
                  {/* <a href="#" className="lp-store-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17 1H7a3 3 0 00-3 3v16a3 3 0 003 3h10a3 3 0 003-3V4a3 3 0 00-3-3zm-5 21a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zM18 18H6V4h12z"/></svg>
                    <span><small>Download on the</small>App Store</span>
                  </a>
                  <a href="#" className="lp-store-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3l16 9-16 9V3z"/></svg>
                    <span><small>Get it on</small>Google Play</span>
                  </a> */}
                  <Link href="/signup" className="lp-btn lp-btn-ghost-light">Sign up on web →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-inner">
          <div className="lp-footer-brand">
            <div className="lp-logo">
              <div className="lp-logo-mark">
                <div style={{ transform: 'scale(0.5) translateY(2px)' }}>
                  <WalletBro expression="happy" size={70} accent="#C7F8EF" accentDark="#A0F0E0" pop="#FF4F92" animated={false} />
                </div>
              </div>
              <span className="lp-logo-text">BillBro</span>
            </div>
            <p className="lp-footer-tag">Your brother in budgeting.</p>
          </div>
          <div className="lp-footer-cols">
            <div className="lp-footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#moods">Meet Bro</a>
            </div>
            <div className="lp-footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
            </div>
            <div className="lp-footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
        <div className="lp-container lp-footer-bottom">
          <span>© 2026 KeanuMD. All rights reserved.</span>
          {/* <span>₱ Built for Filipinos</span> */}
        </div>
      </footer>
    </div>
  );
}
