import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { Logo } from '@/components/ui/Logo';

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100dvh', background: '#FFF7EC',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 0',
      fontFamily: 'var(--font-sora), system-ui',
    }}>
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <Link href="/" style={{ display: 'inline-flex', justifyContent: 'center' }}>
          <Logo size={44} textColor="#1B1638" textSize={28} />
        </Link>
        <p style={{ fontSize: 15, color: '#8A82A8', marginTop: 10 }}>Welcome back, bro 👋</p>
      </div>
      <LoginForm />
    </div>
  );
}
