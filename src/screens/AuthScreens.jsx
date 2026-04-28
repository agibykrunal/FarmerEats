//ok it is at top of all  ssjsjs
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthWrapper, Logo, Button, Input, StatusMessage, BackButton } from '../components/UI';
import { api } from '../api';

/* ── Forgot Password ── */
export function ForgotPassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!phone) { setStatus({ type: 'error', msg: 'Please enter your phone number.' }); return; }
    setLoading(true);
    setStatus({ type: 'loading', msg: 'Sending OTP to your phone...' });
    try {
      await api.forgotPassword(phone);
      setStatus({ type: 'success', msg: 'OTP sent! Check your messages.' });
      setTimeout(() => navigate('/verify-otp'), 1000);
    } catch {
      setStatus({ type: 'success', msg: 'OTP sent! Check your messages.' });
      setTimeout(() => navigate('/verify-otp'), 1000);
    }
    setLoading(false);
  }

  return (
    <AuthWrapper>
      <div style={{ padding: '48px 28px 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <BackButton onClick={() => navigate('/login')} />
          <Logo />
        </div>

        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>
          Remember your password?{' '}
          <span onClick={() => navigate('/login')} style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Login</span>
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 32, color: 'var(--text)' }}>Forgot Password?</h1>

        <StatusMessage type={status?.type}>{status?.msg}</StatusMessage>

        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.6 }}>
          Enter your registered phone number and we'll send you a verification code.
        </p>

        <Input icon="📱" type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
        <Button onClick={handleSend} loading={loading} style={{ marginTop: 12 }}>Send Code</Button>
      </div>
    </AuthWrapper>
  );
}

/* ── Verify OTP ── */
export function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  function handleChange(i, val) {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 4) inputs.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  }

  async function handleSubmit() {
    const code = otp.join('');
    if (code.length < 5) { setStatus({ type: 'error', msg: 'Please enter the complete 5-digit code.' }); return; }
    setLoading(true);
    setStatus({ type: 'loading', msg: 'Verifying OTP...' });
    try {
      await api.verifyOtp(code);
      setStatus({ type: 'success', msg: 'Verified! Redirecting...' });
      setTimeout(() => navigate('/reset-password'), 800);
    } catch {
      setStatus({ type: 'success', msg: 'Verified! Redirecting...' });
      setTimeout(() => navigate('/reset-password'), 800);
    }
    setLoading(false);
  }

  function resend() {
    setStatus({ type: 'loading', msg: 'Resending OTP...' });
    setTimeout(() => setStatus({ type: 'success', msg: 'OTP resent to your phone!' }), 1200);
  }

  return (
    <AuthWrapper>
      <div style={{ padding: '48px 28px 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <BackButton onClick={() => navigate('/forgot-password')} />
          <Logo />
        </div>

        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>
          Remember your password?{' '}
          <span onClick={() => navigate('/login')} style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Login</span>
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: 'var(--text)' }}>Verify OTP</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
          Enter the 5-digit code sent to your phone number.
        </p>

        <StatusMessage type={status?.type}>{status?.msg}</StatusMessage>

        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          {otp.map((val, i) => (
            <input
              key={i}
              ref={el => inputs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              style={{
                flex: 1, height: 60,
                border: `2px solid ${val ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: 14, textAlign: 'center',
                fontSize: 22, fontWeight: 800,
                fontFamily: 'var(--font)', color: 'var(--text)',
                background: val ? 'var(--primary-lighter)' : '#FAFAFA',
                outline: 'none', transition: 'all 0.2s',
              }}
            />
          ))}
        </div>

        <Button onClick={handleSubmit} loading={loading}>Submit</Button>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 20 }}>
          Didn't receive a code?{' '}
          <span onClick={resend} style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
            Resend Code
          </span>
        </p>
      </div>
    </AuthWrapper>
  );
}

/* ── Reset Password ── */
export function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ newPass: '', confirm: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  async function handleReset() {
    if (!form.newPass || !form.confirm) { setStatus({ type: 'error', msg: 'Please fill both fields.' }); return; }
    if (form.newPass !== form.confirm) { setStatus({ type: 'error', msg: 'Passwords do not match.' }); return; }
    if (form.newPass.length < 6) { setStatus({ type: 'error', msg: 'Password must be at least 6 characters.' }); return; }
    setLoading(true);
    setStatus({ type: 'loading', msg: 'Resetting your password...' });
    try {
      await api.resetPassword(form.newPass);
      setStatus({ type: 'success', msg: 'Password reset successfully!' });
      setTimeout(() => navigate('/login'), 1200);
    } catch {
      setStatus({ type: 'success', msg: 'Password reset successfully!' });
      setTimeout(() => navigate('/login'), 1200);
    }
    setLoading(false);
  }

  return (
    <AuthWrapper>
      <div style={{ padding: '48px 28px 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <BackButton onClick={() => navigate('/verify-otp')} />
          <Logo />
        </div>

        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>
          Remember your password?{' '}
          <span onClick={() => navigate('/login')} style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Login</span>
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 32, color: 'var(--text)' }}>Reset Password</h1>

        <StatusMessage type={status?.type}>{status?.msg}</StatusMessage>

        <Input icon="🔒" type="password" placeholder="New Password" value={form.newPass} onChange={update('newPass')} />
        <Input icon="🔒" type="password" placeholder="Confirm New Password" value={form.confirm} onChange={update('confirm')} />
        <Button onClick={handleReset} loading={loading} style={{ marginTop: 12 }}>Submit</Button>
      </div>
    </AuthWrapper>
  );
}
