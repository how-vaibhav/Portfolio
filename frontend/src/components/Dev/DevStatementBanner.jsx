import React from 'react';
import { MorphingText } from '../ui/morphing-text';
import { Ripple } from '../ui/ripple';

export default function DevStatementBanner() {
  const MORPH_TEXTS = [
    'WE ARCHITECT.',
    'WE SECURE.',
    'WE ELEVATE.',
    'WE SCALE.',
    'WE DELIVER.',
  ];

  return (
    <section
      style={{
        padding: '80px 20px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        minHeight: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Background: Footer Banner Image ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/footer-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.25) contrast(1.1) saturate(0.4)',
          zIndex: 0,
        }}
      />

      {/* Dark overlay gradient for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.35) 50%, rgba(8,8,8,0.65) 100%)',
          zIndex: 1,
        }}
      />

      {/* Ripple emanating from center behind morphing text */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <Ripple
          mainCircleSize={160}
          mainCircleOpacity={0.18}
          numCircles={6}
          color="#CCFF00"
        />
      </div>

      {/* Content layer above everything */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 3 }}>
        {/* Top small label */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#CCFF00',
            marginBottom: '16px',
            textShadow: '0 0 20px rgba(204, 255, 0, 0.6)',
          }}
        >
          ✦ SYSTEM CORE PRINCIPLE
        </div>

        {/* Subhead */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(20px, 3vw, 32px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
          }}
        >
          WE DON'T JUST WRITE CODE.
        </h3>

        {/* Liquid Morphing Text from Magic UI */}
        <div style={{ height: 'clamp(56px, 8vw, 90px)', margin: '10px 0 24px 0' }}>
          <MorphingText
            texts={MORPH_TEXTS}
            style={{
              fontFamily: "'Archivo Black', 'Inter', sans-serif",
              fontSize: 'clamp(36px, 6.5vw, 76px)',
              letterSpacing: '-0.04em',
              color: '#ffffff',
              height: '100%',
              textShadow: '0 2px 30px rgba(0,0,0,0.8)',
            }}
          />
        </div>

        {/* Bottom descriptive caption */}
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.75)',
            maxWidth: '540px',
            margin: '0 auto',
            lineHeight: 1.6,
            textShadow: '0 1px 12px rgba(0,0,0,0.9)',
          }}
        >
          Engineering high-throughput systems, government-grade encryption, and hardware-accelerated 60fps web experiences.
        </p>
      </div>
    </section>
  );
}
