import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI';

const slides = [
  {
    bg: '#FFF5EE',
    accent: '#D97B5A',
    title: 'Direct-to-Home',
    desc: 'Eliminate the middleman. We bypass corporate retail and high-markup distributors, ensuring every penny supports the farmers who grow your food.',
    illustration: (
      <svg width="260" height="220" viewBox="0 0 260 220" fill="none">
        {/* Farm scene */}
        <rect x="20" y="140" width="220" height="60" rx="10" fill="#E8D5C4" opacity="0.6"/>
        <rect x="70" y="70" width="120" height="120" rx="6" fill="#D97B5A"/>
        <rect x="90" y="100" width="80" height="90" rx="4" fill="#C06A48"/>
        <polygon points="130,20 55,80 205,80" fill="#8B4513"/>
        <polygon points="130,32 68,80 192,80" fill="#A05A2A"/>
        <rect x="108" y="150" width="44" height="40" rx="3" fill="#704214"/>
        <circle cx="28" cy="120" r="26" fill="#4A7A2A"/>
        <circle cx="18" cy="105" r="20" fill="#5A9A35"/>
        <rect x="25" y="128" width="8" height="30" fill="#704214"/>
        <circle cx="230" cy="118" r="22" fill="#4A7A2A"/>
        <circle cx="240" cy="104" r="18" fill="#5A9A35"/>
        <rect x="228" y="124" width="8" height="30" fill="#704214"/>
        {/* Badge */}
        <rect x="170" y="40" width="80" height="36" rx="18" fill="#D97B5A"/>
        <text x="210" y="63" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Nunito">100% Fresh</text>
        {/* Stars */}
        {[0,1,2,3,4].map(i => (
          <text key={i} x={75 + i*22} y="195" fontSize="16" fill="#F5A623">★</text>
        ))}
      </svg>
    ),
  },
  {
    bg: '#F0F8FF',
    accent: '#5B8FD9',
    title: 'Local Logistics',
    desc: 'Our decentralized delivery network bypasses traditional supply chain bottlenecks. Fresh food moves from the soil to your table in record time.',
    illustration: (
      <svg width="260" height="220" viewBox="0 0 260 220" fill="none">
        {/* Delivery truck */}
        <rect x="20" y="120" width="160" height="60" rx="8" fill="#5B8FD9"/>
        <rect x="170" y="130" width="70" height="50" rx="8" fill="#4A7FC8"/>
        <rect x="178" y="138" width="55" height="35" rx="4" fill="#A8C8F0"/>
        {/* Wheels */}
        <circle cx="60" cy="185" r="18" fill="#333"/>
        <circle cx="60" cy="185" r="10" fill="#666"/>
        <circle cx="160" cy="185" r="18" fill="#333"/>
        <circle cx="160" cy="185" r="10" fill="#666"/>
        <circle cx="215" cy="185" r="18" fill="#333"/>
        <circle cx="215" cy="185" r="10" fill="#666"/>
        {/* Cargo */}
        <rect x="30" y="90" width="140" height="35" rx="4" fill="#C8E6C9"/>
        <text x="100" y="113" textAnchor="middle" fontSize="18" fill="#2E7D32">🌽 🍅 🥬</text>
        {/* Route dots */}
        <circle cx="30" cy="70" r="6" fill="#D97B5A"/>
        <line x1="36" y1="70" x2="80" y2="70" stroke="#D97B5A" strokeWidth="2" strokeDasharray="4 3"/>
        <circle cx="86" cy="70" r="6" fill="#D97B5A"/>
        <line x1="92" y1="70" x2="136" y2="70" stroke="#D97B5A" strokeWidth="2" strokeDasharray="4 3"/>
        <circle cx="142" cy="70" r="6" fill="#D97B5A"/>
        <line x1="148" y1="70" x2="192" y2="70" stroke="#D97B5A" strokeWidth="2" strokeDasharray="4 3"/>
        <circle cx="198" cy="70" r="6" fill="#5B8FD9"/>
        <text x="198" y="55" textAnchor="middle" fontSize="10" fill="#5B8FD9">You!</text>
      </svg>
    ),
  },
  {
    bg: '#F5FFF0',
    accent: '#4CAF50',
    title: 'Radical Transparency',
    desc: 'No more mystery labels. Every order is verified for origin, freshness, and quality. This is the future of honest food security.',
    illustration: (
      <svg width="260" height="220" viewBox="0 0 260 220" fill="none">
        {/* Earth */}
        <circle cx="130" cy="110" r="85" fill="#81C784" opacity="0.2"/>
        <circle cx="130" cy="110" r="70" fill="#4CAF50" opacity="0.3"/>
        <circle cx="130" cy="110" r="55" fill="#388E3C"/>
        {/* Land masses */}
        <ellipse cx="110" cy="95" rx="30" ry="20" fill="#66BB6A"/>
        <ellipse cx="155" cy="125" rx="25" ry="15" fill="#66BB6A"/>
        <ellipse cx="100" cy="135" rx="20" ry="12" fill="#66BB6A"/>
        {/* Location pins */}
        <circle cx="105" cy="90" r="8" fill="#D97B5A"/>
        <circle cx="155" cy="115" r="8" fill="#D97B5A"/>
        <circle cx="130" cy="140" r="8" fill="#D97B5A"/>
        {/* Connections */}
        <line x1="105" y1="90" x2="155" y2="115" stroke="#D97B5A" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7"/>
        <line x1="155" y1="115" x2="130" y2="140" stroke="#D97B5A" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7"/>
        <line x1="105" y1="90" x2="130" y2="140" stroke="#D97B5A" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7"/>
        {/* Leaves decoration */}
        <text x="30" y="60" fontSize="28">🌿</text>
        <text x="200" y="55" fontSize="24">🍃</text>
        <text x="20" y="170" fontSize="22">🌱</text>
        <text x="205" y="175" fontSize="26">🌿</text>
      </svg>
    ),
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const containerRef = useRef(null);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && current < slides.length - 1) setCurrent(c => c + 1);
      if (diff < 0 && current > 0) setCurrent(c => c - 1);
    }
    touchStartX.current = null;
  }

  const slide = slides[current];

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        minHeight: '100vh',
        background: slide.bg,
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.4s ease',
        userSelect: 'none',
      }}
    >
      {/* Illustration area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 20,
      }}>
        <div style={{ animation: 'fadeIn 0.5s ease' }} key={current}>
          {slide.illustration}
        </div>
      </div>

      {/* Content card */}
      <div style={{
        background: '#fff',
        borderRadius: '32px 32px 0 0',
        padding: '36px 32px 48px',
        boxShadow: '0 -4px 40px rgba(0,0,0,0.08)',
      }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                height: 8,
                width: i === current ? 28 : 8,
                borderRadius: 4,
                background: i === current ? slide.accent : '#E5E5EA',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <h1 style={{ fontSize: 30, fontWeight: 900, color: 'var(--text)', marginBottom: 12 }}>
          {slide.title}
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
          {slide.desc}
        </p>

        <Button
          onClick={() => current < slides.length - 1 ? setCurrent(c => c + 1) : navigate('/login')}
          style={{ background: slide.accent, marginBottom: 12 }}
        >
          {current < slides.length - 1 ? 'Next →' : 'Join the movement!'}
        </Button>

        <button
          onClick={() => navigate('/login')}
          style={{
            background: 'none', border: 'none', width: '100%',
            textAlign: 'center', fontSize: 14, color: 'var(--text-muted)',
            cursor: 'pointer', fontFamily: 'var(--font)', padding: '8px 0',
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
