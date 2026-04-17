//ok it is at top of all
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding'), 2500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(150deg, #FDF6F2 0%, #F2E2D4 60%, #E8CAAF 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
    }}>
      {/* Farm illustration */}
      <div style={{ animation: 'fadeIn 0.8s ease' }}>
        <svg width="220" height="200" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sky & ground */}
          <rect x="0" y="120" width="220" height="80" rx="12" fill="#E8D5C4" opacity="0.5"/>
          {/* Barn */}
          <rect x="65" y="70" width="90" height="110" rx="6" fill="#D97B5A"/>
          <rect x="85" y="100" width="50" height="80" rx="4" fill="#C06A48"/>
          {/* Roof */}
          <polygon points="110,20 52,78 168,78" fill="#8B4513"/>
          <polygon points="110,32 62,78 158,78" fill="#A0522D"/>
          {/* Door */}
          <rect x="95" y="140" width="30" height="30" rx="3" fill="#704214"/>
          {/* Left tree */}
          <rect x="28" y="100" width="10" height="40" fill="#8B5E3C"/>
          <circle cx="33" cy="92" r="22" fill="#4A7A2A"/>
          <circle cx="24" cy="82" r="16" fill="#5A9A35"/>
          <circle cx="44" cy="78" r="18" fill="#4A7A2A"/>
          {/* Right tree */}
          <rect x="182" y="105" width="10" height="35" fill="#8B5E3C"/>
          <circle cx="187" cy="96" r="20" fill="#4A7A2A"/>
          <circle cx="178" cy="86" r="15" fill="#5A9A35"/>
          <circle cx="196" cy="84" r="17" fill="#4A7A2A"/>
          {/* Windows */}
          <rect x="72" y="108" width="24" height="20" rx="4" fill="#fff" opacity="0.7"/>
          <rect x="124" y="108" width="24" height="20" rx="4" fill="#fff" opacity="0.7"/>
          <line x1="84" y1="108" x2="84" y2="128" stroke="#E8D5C4" strokeWidth="1.5"/>
          <line x1="72" y1="118" x2="96" y2="118" stroke="#E8D5C4" strokeWidth="1.5"/>
          <line x1="136" y1="108" x2="136" y2="128" stroke="#E8D5C4" strokeWidth="1.5"/>
          <line x1="124" y1="118" x2="148" y2="118" stroke="#E8D5C4" strokeWidth="1.5"/>
          {/* Fence */}
          {[14,30,46,160,176,192].map(x => (
            <rect key={x} x={x} y="148" width="6" height="22" rx="1" fill="#C49A6C"/>
          ))}
          <rect x="14" y="152" width="38" height="4" rx="1" fill="#C49A6C"/>
          <rect x="14" y="161" width="38" height="4" rx="1" fill="#C49A6C"/>
          <rect x="160" y="152" width="38" height="4" rx="1" fill="#C49A6C"/>
          <rect x="160" y="161" width="38" height="4" rx="1" fill="#C49A6C"/>
          {/* Sun */}
          <circle cx="185" cy="35" r="18" fill="#FAC75B" opacity="0.9"/>
          <circle cx="185" cy="35" r="13" fill="#F5A623"/>
        </svg>
      </div>

      <div style={{ textAlign: 'center', animation: 'fadeIn 1s ease 0.3s both' }}>
        <div style={{ fontSize: 38, fontWeight: 900, color: '#8B4513', letterSpacing: '-1px' }}>
          Farmer<span style={{ color: '#D97B5A' }}>Eats</span>
        </div>
        <div style={{ fontSize: 15, color: '#A0785A', marginTop: 8, fontWeight: 600 }}>
          Fresh from the farm, straight to your table
        </div>
      </div>

      {/* Loading dots */}
      <div style={{ display: 'flex', gap: 8, animation: 'fadeIn 1s ease 0.6s both' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: 4, background: '#D97B5A',
            animation: `pulse 1.2s ease ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}
