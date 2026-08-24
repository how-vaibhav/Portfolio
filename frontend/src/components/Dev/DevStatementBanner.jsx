import React from 'react';
import { MorphingText } from '../ui/morphing-text';

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
        padding: '70px 20px',
        background: '#0a0a0d',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(204, 255, 0, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Top small label */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#CCFF00',
            marginBottom: '16px',
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
            color: 'rgba(255, 255, 255, 0.6)',
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
            }}
          />
        </div>

        {/* Bottom descriptive caption */}
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '540px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Engineering high-throughput systems, government-grade encryption, and hardware-accelerated 60fps web experiences.
        </p>
      </div>
    </section>
  );
}
