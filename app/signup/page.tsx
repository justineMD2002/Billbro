import Link from 'next/link';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div style={{
      minHeight: '100dvh', background: '#FFF7EC',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 0',
      fontFamily: 'var(--font-sora), system-ui',
    }}>
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 32, fontWeight: 700, color: '#1B1638' }}>
          BillBro
        </Link>
        <p style={{ fontSize: 15, color: '#8A82A8', marginTop: 6 }}>Let&apos;s get you set up 💪</p>
      </div>
      <SignupForm />
    </div>
  );
}
