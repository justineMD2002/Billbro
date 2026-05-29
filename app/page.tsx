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

/* Reusable button base */
const btnBase = 'inline-flex items-center justify-center gap-2 font-display font-bold text-[15px] px-6 py-[14px] rounded-[14px] cursor-pointer border-none transition-[transform,box-shadow] duration-150 no-underline hover:-translate-y-0.5';

export default function LandingPage() {
  return (
    /* lp-root */
    <div className="font-body bg-lp-bg text-lp-dark antialiased">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-lp-bg/85 backdrop-blur-[14px] border-b border-lp-border [padding-top:env(safe-area-inset-top)]">
        <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <div className="flex items-center gap-[10px]">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-lp-accent to-lp-pop flex items-center justify-center overflow-hidden shadow-[0_6px_14px_rgba(22,197,168,0.4)]">
              <div style={{ transform: 'scale(0.5) translateY(2px)' }}>
                <WalletBro expression="happy" size={70} accent="#C7F8EF" accentDark="#A0F0E0" pop="#FF4F92" animated={false} />
              </div>
            </div>
            <span className="font-display font-bold text-[22px] tracking-[-0.02em] text-lp-dark">BillBro</span>
          </div>
          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex gap-[30px]">
            <a href="#features" className="text-[14.5px] font-semibold text-lp-ink2 hover:text-lp-accent transition-colors duration-150">Features</a>
            <a href="#moods" className="text-[14.5px] font-semibold text-lp-ink2 hover:text-lp-accent transition-colors duration-150">Meet Bro</a>
            <a href="#how" className="text-[14.5px] font-semibold text-lp-ink2 hover:text-lp-accent transition-colors duration-150">How it works</a>
          </div>
          <Link href="/signup" className={`${btnBase} bg-gradient-to-br from-lp-accent to-lp-deep text-white shadow-[0_12px_26px_rgba(22,197,168,0.45)] !py-[10px] !px-[18px] !text-[14px]`}>Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative overflow-hidden py-[60px] pb-[80px]">
        {/* Blobs */}
        <div className="absolute rounded-full blur-[40px] pointer-events-none z-0 w-[460px] h-[460px] -top-[160px] -right-[120px] [background:radial-gradient(circle,rgba(22,197,168,0.33),transparent_70%)]" />
        <div className="absolute rounded-full blur-[40px] pointer-events-none z-0 w-[380px] h-[380px] -bottom-[180px] -left-[120px] [background:radial-gradient(circle,rgba(255,79,146,0.27),transparent_70%)]" />

        <div className="relative z-[1] max-w-[1180px] mx-auto px-7 grid grid-cols-1 gap-5 items-center text-center min-[980px]:grid-cols-[1.05fr_0.95fr] min-[980px]:gap-[40px] min-[980px]:text-left">
          {/* Copy */}
          <div className="flex flex-col items-center min-[980px]:items-start">
            <h1 className="font-display font-semibold text-[clamp(40px,6.4vw,72px)] leading-none tracking-[-0.03em] text-lp-dark">
              Your <span className="text-lp-accent italic">brother</span> in budgeting.
            </h1>
            <p className="text-[clamp(16px,1.6vw,19px)] leading-[1.55] text-lp-ink2 mt-6 mb-8 max-w-[520px]">
              BillBro watches your salary, loans, and budgets like a real bro — and tells you straight up how much you can spend each day till payday. No spreadsheets. No guilt. Just gains. 💪
            </p>
            <div className="flex gap-[14px] flex-wrap justify-center min-[980px]:justify-start">
              <a href="#how" className={`${btnBase} bg-white text-lp-dark shadow-[inset_0_0_0_1.5px_#E5F8F2]`}>See how it works →</a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex items-center justify-center min-h-[560px] min-[980px]:min-h-[560px] order-2 min-[980px]:order-none">
            {/* Float card 1 */}
            <div className="absolute z-[3] rounded-[14px] px-[14px] py-[11px] bg-white shadow-[0_10px_30px_rgba(14,154,130,0.10),0_2px_6px_rgba(27,22,56,0.05)] animate-lp-float top-[60px] left-0">
              <div className="flex items-center gap-2">
                <div className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center text-[15px] bg-[rgba(255,90,106,0.13)] text-lp-pop">🍔</div>
                <div>
                  <div className="text-[11px] font-bold text-lp-dark">Food budget</div>
                  <div className="text-[9.5px] font-semibold text-lp-pop">₱420 over · chill bro</div>
                </div>
              </div>
            </div>
            {/* Float card 2 */}
            <div className="absolute z-[3] rounded-[14px] px-[14px] py-[11px] bg-white shadow-[0_10px_30px_rgba(14,154,130,0.10),0_2px_6px_rgba(27,22,56,0.05)] animate-lp-float-delayed bottom-[80px] right-0">
              <div className="flex items-center gap-2">
                <div className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center text-[15px] bg-[rgba(63,191,147,0.13)] text-lp-good">💪</div>
                <div>
                  <div className="text-[11px] font-bold text-lp-dark">Saved ₱8,045</div>
                  <div className="text-[9.5px] font-semibold text-lp-good">+49% vs last month</div>
                </div>
              </div>
            </div>
            <PhoneMock w={272} />
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section id="features" className="py-[80px]">
        <div className="max-w-[1180px] mx-auto px-7 min-[760px]:px-5">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <div className="inline-block text-[12.5px] font-bold tracking-[0.14em] uppercase text-lp-accent mb-[14px]">Why BillBro hits different</div>
            <h2 className="font-display font-semibold text-[clamp(30px,4.4vw,46px)] leading-[1.08] tracking-[-0.025em] text-lp-dark">Not another boring budget app.</h2>
            <p className="text-[clamp(15px,1.5vw,18px)] leading-[1.55] text-lp-ink2 mt-4">Bro thinks in <b>days till payday</b>, not abstract monthly totals. Here&apos;s what he&apos;s got your back on.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 min-[760px]:grid-cols-2">
            {/* Big gradient feature */}
            <div className="col-span-1 min-[760px]:col-span-2 rounded-[22px] overflow-hidden bg-gradient-to-br from-lp-accent via-lp-deep to-lp-pop">
              <div className="flex flex-col items-center gap-5 p-9 px-10 min-[980px]:flex-row">
                <div className="flex-1">
                  <div className="inline-block text-[11px] font-bold tracking-[0.08em] uppercase px-3 py-[5px] rounded-full mb-4 bg-white/20 text-white">Salary-aware</div>
                  <h3 className="font-display font-semibold text-[clamp(20px,2.4vw,26px)] leading-[1.15] tracking-[-0.015em] text-white mb-[10px]">Knows your payday.<br />Paces your spending.</h3>
                  <p className="text-[15px] leading-[1.5] text-white/90">Log your salary once and Bro turns it into a daily allowance — &ldquo;₱566/day till June 26.&rdquo; Spend within it and you&apos;ll never hit the end-of-month panic again.</p>
                </div>
                <div className="shrink-0">
                  <WalletBro expression="coaching" size={140} accent="#C7F8EF" accentDark="#A0F0E0" pop="#FF4F92" />
                </div>
              </div>
            </div>
            {/* Regular feature cards */}
            {[
              { icon: 'lock', colorClass: 'bg-[rgba(14,154,130,0.1)] text-lp-deep', title: 'Loans with finish lines', body: "Car loan, phone installment — Bro tracks month 23 of 60, the balance left, and exactly when you're free." },
              { icon: 'grid', colorClass: 'bg-[rgba(255,79,146,0.1)] text-lp-pop',  title: 'Envelopes that talk back', body: 'Set a budget per category. Go over and Bro calls it — then tells you how to claw it back before payday.' },
              { icon: 'split', colorClass: 'bg-[rgba(63,191,147,0.1)] text-lp-good', title: 'One-time or budgeted', body: 'A random restaurant? Log it once. Coffee you do daily? Bro counts it against your envelope automatically.' },
              { icon: 'brain', colorClass: 'bg-[rgba(22,197,168,0.1)] text-lp-accent', title: "Bro's got the plan", body: 'Real, specific advice: "Skip 1 Grab + 2 coffees this week to break even." Coaching, not shaming.' },
            ].map(f => (
              <div key={f.icon} className="bg-white rounded-[22px] p-[30px] shadow-[0_10px_30px_rgba(22,197,168,0.07)] border border-lp-border">
                <div className={`w-[54px] h-[54px] rounded-[16px] flex items-center justify-center mb-5 ${f.colorClass}`}><FeatIcon icon={f.icon} /></div>
                <h3 className="font-display font-semibold text-[clamp(20px,2.4vw,26px)] leading-[1.15] tracking-[-0.015em] text-lp-dark mb-[10px]">{f.title}</h3>
                <p className="text-[15px] leading-[1.5] text-lp-ink2">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOODS */}
      <section id="moods" className="py-[80px] min-[760px]:py-[56px] bg-lp-alt">
        <div className="max-w-[1180px] mx-auto px-7 min-[760px]:px-5">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <div className="inline-block text-[12.5px] font-bold tracking-[0.14em] uppercase text-lp-accent mb-[14px]">Meet WalletBro</div>
            <h2 className="font-display font-semibold text-[clamp(30px,4.4vw,46px)] leading-[1.08] tracking-[-0.025em] text-lp-dark">He reacts to every peso.</h2>
            <p className="text-[clamp(15px,1.5vw,18px)] leading-[1.55] text-lp-ink2 mt-4">A pocket-shaped buddy with a friendship bracelet who&apos;s hyped when you save and sus when you don&apos;t. He <i>feels</i> your spending so you actually pay attention.</p>
          </div>
          <div className="grid grid-cols-2 gap-[18px] min-[760px]:grid-cols-3 min-[980px]:grid-cols-4 max-[440px]:gap-3">
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
              <div key={m.exp} className="rounded-[22px] py-[22px] px-[14px] pb-4 flex flex-col items-center bg-white shadow-[0_10px_30px_rgba(14,154,130,0.10),0_2px_6px_rgba(27,22,56,0.05)]">
                <WalletBro expression={m.exp} size={120} accent="#16C5A8" accentDark="#0E9A82" pop="#FF4F92" />
                <div className="mt-[10px] px-[14px] py-[6px] rounded-full text-[12.5px] font-semibold italic bg-lp-border text-lp-ink2">&ldquo;{m.cap}&rdquo;</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-[80px] min-[760px]:py-[56px]">
        <div className="max-w-[1180px] mx-auto px-7 min-[760px]:px-5">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <div className="inline-block text-[12.5px] font-bold tracking-[0.14em] uppercase text-lp-accent mb-[14px]">How it works</div>
            <h2 className="font-display font-semibold text-[clamp(30px,4.4vw,46px)] leading-[1.08] tracking-[-0.025em] text-lp-dark">Three taps to financial bro-hood.</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 min-[760px]:grid-cols-3 min-[760px]:gap-6">
            {([
              { n: '01', title: 'Drop your salary', body: 'Tell Bro when you get paid and how much. He builds your cycle instantly.', exp: 'happy' },
              { n: '02', title: 'Log as you go', body: 'One-time, budgeted, or a loan with an end date — Bro sorts it and reacts.', exp: 'coaching' },
              { n: '03', title: 'Spend on a plan', body: 'Follow your daily allowance. Hit payday with money to spare. Repeat.', exp: 'hyped' },
            ] as const).map((s, i) => (
              <div key={s.n} className="relative text-center">
                <div className="font-display font-bold text-[18px] tracking-[0.1em] mb-[14px] text-lp-accent">{s.n}</div>
                <div className="rounded-[24px] p-[18px] flex items-center justify-center mb-[18px] bg-gradient-to-br from-[rgba(22,197,168,0.1)] to-[rgba(255,79,146,0.1)]">
                  <WalletBro expression={s.exp} size={104} accent="#16C5A8" accentDark="#0E9A82" pop="#FF4F92" />
                </div>
                <h3 className="font-display font-semibold text-[22px] tracking-[-0.015em] text-lp-dark mb-2">{s.title}</h3>
                <p className="text-[14.5px] leading-[1.5] text-lp-ink2 max-w-[280px] mx-auto">{s.body}</p>
                {i < 2 && <div className="hidden min-[760px]:block absolute top-[90px] -right-4 text-[28px] font-light text-lp-muted">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="py-[80px] min-[760px]:py-[56px]">
        <div className="max-w-[1180px] mx-auto px-7 min-[760px]:px-5">
          <div className="relative overflow-hidden rounded-[32px] bg-lp-dark">
            {/* Blob */}
            <div className="absolute w-[460px] h-[460px] -top-[180px] -right-[120px] rounded-full blur-[50px] [background:radial-gradient(circle,rgba(22,197,168,0.4),transparent_70%)]" />
            <div className="relative z-[1] flex flex-col items-center gap-[30px] p-10 px-7 text-center min-[760px]:flex-row min-[760px]:text-left min-[760px]:p-12 min-[760px]:px-14">
              <div className="shrink-0">
                <BroGymLifter size={150} accent="#16C5A8" accentDark="#0E9A82" pop="#FF4F92" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-[clamp(28px,4vw,44px)] leading-[1.05] tracking-[-0.025em] text-white">Your wallet&apos;s about to get swole.</h2>
                <p className="text-[clamp(15px,1.5vw,18px)] leading-[1.5] text-white/80 mt-4 mb-7 max-w-[440px]">Download BillBro and let your financial brother do the heavy lifting. Free forever to start.</p>
                <div className="flex gap-[14px] flex-wrap justify-center min-[760px]:justify-start items-center">
                  <Link href="/signup" className={`${btnBase} bg-white/[0.12] text-white border border-white/30 hover:bg-white/20`}>Sign up on web →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-[56px] pb-7 border-t border-lp-border">
        <div className="max-w-[1180px] mx-auto px-7 min-[760px]:px-5 flex justify-between gap-10 flex-wrap min-[760px]:flex-row flex-col gap-7">
          <div>
            <div className="flex items-center gap-[10px]">
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-lp-accent to-lp-pop flex items-center justify-center overflow-hidden shadow-[0_6px_14px_rgba(22,197,168,0.4)]">
                <div style={{ transform: 'scale(0.5) translateY(2px)' }}>
                  <WalletBro expression="happy" size={70} accent="#C7F8EF" accentDark="#A0F0E0" pop="#FF4F92" animated={false} />
                </div>
              </div>
              <span className="font-display font-bold text-[22px] tracking-[-0.02em] text-lp-dark">BillBro</span>
            </div>
            <p className="text-[14px] text-lp-muted mt-[14px] max-w-[240px] leading-[1.5]">Your brother in budgeting.</p>
          </div>
          <div className="flex gap-14 flex-wrap">
            {[
              { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'Meet Bro', href: '#moods' }] },
              { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Careers', href: '#' }] },
              { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Security', href: '#' }] },
            ].map(col => (
              <div key={col.title} className="flex flex-col gap-[10px]">
                <h4 className="text-[12px] font-bold tracking-[0.1em] uppercase text-lp-muted mb-1">{col.title}</h4>
                {col.links.map(l => (
                  <a key={l.label} href={l.href} className="text-[14.5px] font-semibold text-lp-ink2 hover:text-lp-accent">{l.label}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1180px] mx-auto px-7 min-[760px]:px-5 flex justify-between mt-10 pt-6 border-t border-lp-border text-[13px] text-lp-muted flex-wrap gap-[10px] min-[760px]:flex-row flex-col text-center">
          <span>© 2026 KeanuMD. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
