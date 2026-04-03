import React, { useState } from 'react';

export function Button({ children, onClick, variant = 'primary', loading, style, ...rest }) {
  const base = {
    width: '100%', padding: '15px 20px', borderRadius: 50, border: 'none',
    fontSize: 16, fontWeight: 700, fontFamily: 'var(--font)',
    cursor: loading ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transition: 'background 0.2s, transform 0.1s, opacity 0.2s',
    opacity: loading ? 0.8 : 1, ...style,
  };
  const variants = {
    primary: { background: 'var(--primary)', color: '#fff' },
    outline: { background: 'transparent', color: 'var(--primary)', border: '2px solid var(--primary)' },
    ghost: { background: 'transparent', color: 'var(--text-muted)', width: 'auto' },
  };
  return (
    <button onClick={!loading ? onClick : undefined} style={{ ...base, ...variants[variant] }} {...rest}>
      {loading && <span style={{ width:16,height:16,border:'2px solid rgba(255,255,255,0.4)',borderTop:'2px solid white',borderRadius:'50%',animation:'spin 0.7s linear infinite',display:'inline-block' }} />}
      {children}
    </button>
  );
}

export function Input({ icon, rightEl, type = 'text', ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: 'relative', marginBottom: 12 }}>
      {icon && <span style={{ position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:16,color:focused?'var(--primary)':'var(--text-muted)',pointerEvents:'none',transition:'color 0.2s',zIndex:1 }}>{icon}</span>}
      <input type={type} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width:'100%', padding:icon?'14px 14px 14px 44px':'14px', paddingRight:rightEl?80:14,
          border:`1.5px solid ${focused?'var(--primary)':'var(--border)'}`, borderRadius:'var(--radius)',
          fontSize:15, fontFamily:'var(--font)', color:'var(--text)', background:focused?'var(--white)':'#FAFAFA',
          outline:'none', transition:'border-color 0.2s, background 0.2s' }} {...props} />
      {rightEl && <div style={{ position:'absolute',right:14,top:'50%',transform:'translateY(-50%)' }}>{rightEl}</div>}
    </div>
  );
}

export function StatusMessage({ type, children }) {
  if (!children) return null;
  const s = { error:{bg:'#FFF2F2',color:'#C0392B'}, success:{bg:'#F0FDF4',color:'#16A34A'}, loading:{bg:'#F0F9FF',color:'#0369A1'} }[type] || {bg:'#F0F9FF',color:'#0369A1'};
  return <div style={{ background:s.bg,color:s.color,fontSize:13,borderRadius:10,padding:'10px 14px',marginBottom:14,animation:'fadeIn 0.2s ease' }}>{children}</div>;
}

export function Logo({ size = 'md' }) {
  const sizes = { sm:14, md:16, lg:28 };
  return <div style={{ fontSize:sizes[size],fontWeight:900,color:'var(--text)',letterSpacing:'-0.5px' }}>Farmer<span style={{ color:'var(--primary)' }}>Eats</span></div>;
}

export function SocialButtons({ label = 'or login with' }) {
  return (
    <>
      <div style={{ display:'flex',alignItems:'center',gap:12,margin:'20px 0 16px' }}>
        <div style={{ flex:1,height:1,background:'var(--border)' }} />
        <span style={{ fontSize:12,color:'var(--text-muted)' }}>{label}</span>
        <div style={{ flex:1,height:1,background:'var(--border)' }} />
      </div>
      <div style={{ display:'flex',justifyContent:'center',gap:14 }}>
        {[
          { label:'Google', el:<svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
          { label:'Apple', el:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
          { label:'Facebook', el:<svg width="20" height="20" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg> },
        ].map((s) => (
          <button key={s.label} title={s.label} style={{ width:54,height:54,borderRadius:14,border:'1.5px solid var(--border)',background:'var(--white)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>{s.el}</button>
        ))}
      </div>
    </>
  );
}

export function BackButton({ onClick }) {
  return <button onClick={onClick} style={{ background:'none',border:'none',cursor:'pointer',fontSize:22,color:'var(--text)',padding:0,lineHeight:1,display:'flex',alignItems:'center' }}>←</button>;
}

export function AuthWrapper({ children }) {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'flex-start', justifyContent:'center' }}>
      <div style={{ width:'100%', maxWidth:460, minHeight:'100vh', background:'var(--white)', display:'flex', flexDirection:'column', boxShadow:'0 0 60px rgba(0,0,0,0.1)' }}>
        {children}
      </div>
    </div>
  );
}
