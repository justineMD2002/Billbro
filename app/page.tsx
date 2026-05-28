import Link from 'next/link';
import { LandingMascot } from '@/components/landing/LandingMascot';
import { Logo } from '@/components/ui/Logo';

const FEATURES = [
  { icon: '📊', title: 'Salary cycle', desc: 'See exactly how much you can spend per day until your next paycheck.' },
  { icon: '💸', title: 'Budget envelopes', desc: "Set monthly budgets per category. Bro tells you when you're pushing it." },
  { icon: '🔒', title: 'Loan tracker', desc: 'Track loans with end dates, remaining balance, and monthly obligations.' },
  { icon: '🧠', title: "Bro's tips", desc: 'Smart, no-BS advice on how to stretch what you have until payday.' },
];

export default function LandingPage() {
  return (
    <main style={{ minHeight: '100dvh', background: '#FFF7EC', fontFamily: 'var(--font-sora), system-ui' }}>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(255,247,236,0.85)', backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        <div className="landing-nav-inner">
          <Logo size={32} textColor="#1B1638" textSize={20} />
          <Link href="/login" style={{
            padding: '10px 20px', borderRadius: 14, border: '1.5px solid #A88BFF',
            color: '#A88BFF', fontSize: 14, fontWeight: 600,
          }}>
            Log in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-mascot">
          <LandingMascot />
        </div>

        <div className="landing-hero-text">
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: 99,
            background: '#A88BFF1A', color: '#7B5BE0', fontSize: 13, fontWeight: 600,
            letterSpacing: '0.04em', marginBottom: 20,
          }}>
            Your brother in budgeting 💪
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '0 0 12px' }}>
            <Logo size={64} showText={false} />
            <h1 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: 'clamp(52px, 10vw, 80px)',
              fontWeight: 700, color: '#1B1638', letterSpacing: '-0.04em', lineHeight: 0.95,
              margin: 0,
            }}>
              BillBro
            </h1>
          </div>
          <p style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(16px, 3vw, 22px)', color: '#4A4368', opacity: 0.75, margin: '0 0 16px' }}>
            your money, your rules.
          </p>

          <p style={{ fontSize: 17, color: '#4A4368', lineHeight: 1.6, maxWidth: 400, margin: '0 auto 36px' }}>
            Track expenses, crush savings goals, and get real-time budget advice — all with a little bro energy.
          </p>

          <div className="landing-hero-buttons">
            <Link href="/signup" className="landing-hero-cta" style={{
              display: 'block',
              padding: '18px 24px', borderRadius: 20,
              background: 'linear-gradient(135deg, #A88BFF 0%, #7B5BE0 60%, #FF7A45 130%)',
              color: '#fff', fontSize: 17, fontWeight: 700, textAlign: 'center',
              boxShadow: '0 12px 32px rgba(123,91,224,0.35)',
            }}>
              Get started — it&apos;s free
            </Link>
            <Link href="/login" style={{ color: '#8A82A8', fontSize: 14, fontWeight: 500 }}>
              Already a bro? Log in →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <div className="landing-features-grid">
          {FEATURES.map(f => (
            <div key={f.title} style={{
              background: '#fff', borderRadius: 22, padding: '20px 18px',
              boxShadow: '0 6px 24px rgba(123,91,224,0.08)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 17, fontWeight: 600, color: '#1B1638', marginBottom: 6 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 13, color: '#8A82A8', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="landing-cta-section">
        <div style={{
          borderRadius: 28, padding: '36px 28px',
          background: 'linear-gradient(135deg, #A88BFF 0%, #7B5BE0 60%, #FF7A45 130%)',
          color: '#fff', textAlign: 'center',
          boxShadow: '0 20px 50px rgba(123,91,224,0.3)',
        }}>
          <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 12, lineHeight: 1.2 }}>
            Ready to get your finances together?
          </div>
          <Link href="/signup" style={{
            display: 'inline-block', marginTop: 8,
            padding: '16px 32px', borderRadius: 16,
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
            color: '#fff', fontSize: 16, fontWeight: 700,
            border: '1.5px solid rgba(255,255,255,0.4)',
          }}>
            Let&apos;s go 💪
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '20px 28px 40px', textAlign: 'center', color: '#8A82A8', fontSize: 13 }}>
        BillBro · your brother in budgeting · ₱ PHP
      </footer>
    </main>
  );
}
