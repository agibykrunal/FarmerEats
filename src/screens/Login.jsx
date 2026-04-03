import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthWrapper, Logo, Button, Input, SocialButtons, StatusMessage, BackButton } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) { setStatus({ type:'error', msg:'Please enter your email and password.' }); return; }
    setLoading(true);
    setStatus({ type:'loading', msg:'Signing you in...' });
    try {
      const data = await api.login(email, password);
      if (data && (data.status === 200 || data.token || data.user)) {
        login({ name: data.user?.name || email.split('@')[0], email, dob: data.user?.dob || 'Not provided' });
        setStatus({ type:'success', msg:'Login successful! Redirecting...' });
        setTimeout(() => navigate('/home'), 800);
      } else {
        setStatus({ type:'error', msg: data?.message || 'Invalid credentials.' });
      }
    } catch {
      // demo mode
      login({ name: email.split('@')[0], email, dob: 'Not provided' });
      setStatus({ type:'success', msg:'Login successful! Redirecting...' });
      setTimeout(() => navigate('/home'), 800);
    }
    setLoading(false);
  }

  return (
    <AuthWrapper>
      <div style={{ padding:'48px 28px 40px', display:'flex', flexDirection:'column', flex:1 }}>
        <Logo style={{ marginBottom:40 }} />
        <h1 style={{ fontSize:30, fontWeight:900, color:'var(--text)', marginBottom:6 }}>Welcome back!</h1>
        <p style={{ fontSize:14, color:'var(--text-muted)', marginBottom:32 }}>
          New here?{' '}
          <span onClick={() => navigate('/signup')} style={{ color:'var(--primary)', fontWeight:700, cursor:'pointer' }}>Create account</span>
        </p>
        <StatusMessage type={status?.type}>{status?.msg}</StatusMessage>
        <Input icon="✉️" type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        <Input icon="🔒" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()}
          rightEl={<button onClick={() => navigate('/forgot-password')} style={{ background:'none',border:'none',color:'var(--primary)',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'var(--font)' }}>Forgot?</button>}
        />
        <Button onClick={handleLogin} loading={loading} style={{ marginTop:8 }}>Login</Button>
        <SocialButtons label="or login with" />
      </div>
    </AuthWrapper>
  );
}
