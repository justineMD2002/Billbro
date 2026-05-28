'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/home');
      router.refresh();
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', padding: '0 24px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            style={inputStyle}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password" required value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
          />
        </div>
        {error && (
          <div style={{ color: '#FF5A6A', fontSize: 13, fontWeight: 500, padding: '10px 14px', background: '#FF5A6A18', borderRadius: 12 }}>
            {error}
          </div>
        )}
        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#8A82A8', margin: 0 }}>
          No account?{' '}
          <Link href="/signup" style={{ color: '#A88BFF', fontWeight: 600 }}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 13, fontWeight: 600, color: '#4A4368',
};
const inputStyle: React.CSSProperties = {
  padding: '14px 16px', borderRadius: 16, border: '1.5px solid #E8E0FF',
  fontSize: 16, color: '#1B1638', background: '#FFFFFF',
  outline: 'none', width: '100%',
};
const btnStyle: React.CSSProperties = {
  padding: '16px', borderRadius: 18, border: 'none',
  background: 'linear-gradient(135deg, #A88BFF, #7B5BE0)',
  color: '#fff', fontSize: 16, fontWeight: 700,
  boxShadow: '0 8px 24px rgba(123,91,224,0.35)',
  marginTop: 4,
};
