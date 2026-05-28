'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { display_name: name },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>📬</div>
        <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 28, fontWeight: 600, color: '#1B1638', marginBottom: 8 }}>
          Check your email
        </h2>
        <p style={{ fontSize: 15, color: '#8A82A8', lineHeight: 1.5 }}>
          We sent a confirmation link to <b style={{ color: '#1B1638' }}>{email}</b>.<br />
          Click it to activate your account, then come back and log in.
        </p>
        <Link href="/login" style={{ display: 'block', marginTop: 24, color: '#A88BFF', fontWeight: 600 }}>
          Back to login →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', padding: '0 24px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={labelStyle}>Your name</label>
          <input
            type="text" required value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Jamie"
            style={inputStyle}
          />
        </div>
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
            type="password" required minLength={6} value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            style={inputStyle}
          />
        </div>
        {error && (
          <div style={{ color: '#FF5A6A', fontSize: 13, fontWeight: 500, padding: '10px 14px', background: '#FF5A6A18', borderRadius: 12 }}>
            {error}
          </div>
        )}
        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? 'Creating account…' : 'Create account 💪'}
        </button>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#8A82A8', margin: 0 }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#A88BFF', fontWeight: 600 }}>Log in</Link>
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
