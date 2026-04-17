//ok it is at top of all
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthWrapper, Logo, Button, Input, SocialButtons, StatusMessage, BackButton } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', dob: '', password: '', confirm: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const update = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  async function handleSignup() {
    const { name, email, phone, password, confirm } = form;
    if (!name || !email || !phone || !password) { setStatus({ type: 'error', msg: 'Please fill in all fields.' }); return; }
    if (password !== confirm) { setStatus({ type: 'error', msg: 'Passwords do not match.' }); return; }
    if (password.length < 6) { setStatus({ type: 'error', msg: 'Password must be at least 6 characters.' }); return; }
    setLoading(true);
    setStatus({ type: 'loading', msg: 'Creating your account...' });
    try {
      const data = await api.register(name, email, phone, password);
      if (data && (data.status === 200 || data.user)) {
        login({ name, email, phone, dob: form.dob || 'Not provided', password });
        setStatus({ type: 'success', msg: 'Account created! Verifying OTP...' });
        setTimeout(() => navigate('/verify-otp'), 900);
      } else {
        setStatus({ type: 'error', msg: data?.message || 'Registration failed.' });
      }
    } catch {
      login({ name, email, phone, dob: form.dob || 'Not provided', password });
      setStatus({ type: 'success', msg: 'Account created! Verifying OTP...' });
      setTimeout(() => navigate('/verify-otp'), 900);
    }
    setLoading(false);
  }

  return (
    <AuthWrapper>
      <div style={{ padding: '48px 28px 40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <BackButton onClick={() => navigate('/login')} />
          <Logo />
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Signup 1 of 4</div>
        <h1 style={{ fontSize: 30, fontWeight: 900, color: 'var(--text)', marginBottom: 6 }}>Welcome!</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Login</span>
        </p>
        <SocialButtons label="signup with" />
        <div style={{ margin: '16px 0 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>or signup with email</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <StatusMessage type={status?.type}>{status?.msg}</StatusMessage>
        <Input icon="👤" placeholder="Full Name" value={form.name} onChange={update('name')} />
        <Input icon="✉️" type="email" placeholder="Email Address" value={form.email} onChange={update('email')} />
        <Input icon="📱" type="tel" placeholder="Phone Number" value={form.phone} onChange={update('phone')} />
        <Input icon="🎂" type="date" placeholder="Date of Birth" value={form.dob} onChange={update('dob')} />
        <Input icon="🔒" type="password" placeholder="Password" value={form.password} onChange={update('password')} />
        <Input icon="🔒" type="password" placeholder="Re-enter Password" value={form.confirm} onChange={update('confirm')} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font)' }}>Login</button>
          <Button onClick={handleSignup} loading={loading} style={{ width: 'auto', padding: '13px 32px' }}>Continue →</Button>
        </div>
      </div>
    </AuthWrapper>
  );
}
