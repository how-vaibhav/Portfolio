import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { soundFX } from './soundFX';

export default function DesignFooter() {
  const navigate = useNavigate();

  const handleReturn = (e) => {
    e.preventDefault();
    soundFX.playSnap();
    navigate('/');
  };

  return (
    <footer
      style={{
        background: '#121316',
        color: '#FFFFFF',
        padding: '80px 24px 60px',
        borderTop: '3px solid #000000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 'min(94%, 1240px)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '32px',
        }}
      >
        {/* Brand Stamp */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1.5px solid rgba(255,255,255,0.2)',
            borderRadius: '999px',
            padding: '6px 18px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#CCFF00',
            fontFamily: 'monospace',
          }}
        >
          <span>✦</span>
          <span>HOWVAIBHAV STUDIO ARCHIVE // 2024–2026</span>
          <span>✦</span>
        </div>

        {/* Big Headline */}
        <h2
          style={{
            fontFamily: "'Syne', 'Inter', sans-serif",
            fontSize: 'clamp(32px, 5.5vw, 68px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            margin: 0,
            maxWidth: '920px',
            lineHeight: 1.1,
          }}
        >
          Bridging Graphic Craft with Full-Stack Computational Engineering.
        </h2>

        <p
          style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Looking for software engineering, frontend architecture, and technical projects?
          Head over to the Developer Portfolio.
        </p>

        {/* PROMINENT SWITCH BUTTON TO DEV & RESUME */}
        <Link
          to="/"
          onClick={handleReturn}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 36px',
            background: '#CCFF00',
            color: '#080808',
            borderRadius: '999px',
            fontSize: '15px',
            fontWeight: 900,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(204, 255, 0, 0.35)',
            border: '2px solid #CCFF00',
            transition: 'all 0.25s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(204, 255, 0, 0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(204, 255, 0, 0.35)';
          }}
        >
          <span style={{ fontSize: '18px' }}>←</span>
          <span>Return to Developer Portfolio & Resume</span>
          <span
            style={{
              background: '#080808',
              color: '#CCFF00',
              fontFamily: 'monospace',
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: '6px',
            }}
          >
            &lt;/&gt;
          </span>
        </Link>

        {/* Quick Contact & Socials */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '16px',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          <a
            href="https://github.com/how-vaibhav"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#CCFF00')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#CCFF00')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:vaibhavverma@example.com"
            style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#CCFF00')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >
            Email ↗
          </a>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            width: '100%',
            paddingTop: '24px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace',
          }}
        >
          © {new Date().getFullYear()} HOWVAIBHAV. ALL RIGHTS RESERVED. MADE WITH PRECISION & PASSION.
        </div>
      </div>
    </footer>
  );
}
