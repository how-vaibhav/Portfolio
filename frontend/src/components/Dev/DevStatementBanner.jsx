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
        padding: '90px 20px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Background Layer: Banner Image ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/footer-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          filter: 'contrast(1.05) brightness(0.9)',
          zIndex: 0,
        }}
      />

      {/* ── Creative Blur & Soft Ambient Vignette Overlay (Low Intensity) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(180deg, rgba(8, 8, 8, 0.6) 0%, rgba(8, 8, 8, 0.15) 30%, rgba(8, 8, 8, 0.15) 70%, rgba(8, 8, 8, 0.6) 100%),
            radial-gradient(ellipse at center, rgba(8, 8, 8, 0.1) 0%, rgba(8, 8, 8, 0.45) 100%)
          `,
          backdropFilter: 'blur(2.5px)',
          WebkitBackdropFilter: 'blur(2.5px)',
          zIndex: 1,
        }}
      />

      {/* Ripple effect */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        <Ripple
          mainCircleSize={180}
          mainCircleOpacity={0.2}
          numCircles={6}
          color="#CCFF00"
        />
      </div>

      {/* Content layer */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 3,
          padding: '24px 20px',
        }}
      >
        {/* Top small label */}
        <div
          style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: 900,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#CCFF00',
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '6px 16px',
            borderRadius: '4px',
            border: '1px solid rgba(204, 255, 0, 0.35)',
            marginBottom: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          ✦ SYSTEM CORE PRINCIPLE
        </div>

        {/* Subhead */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(20px, 3.2vw, 34px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: '0 0 14px 0',
            textTransform: 'uppercase',
            textShadow: '0 2px 18px rgba(0, 0, 0, 0.95), 0 0 24px rgba(0, 0, 0, 0.8)',
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
              textShadow: '0 4px 24px rgba(0, 0, 0, 1), 0 0 30px rgba(0, 0, 0, 0.9)',
            }}
          />
        </div>

        {/* Bottom descriptive caption */}
        <p
          style={{
            fontSize: '14.5px',
            fontWeight: 600,
            color: '#ffffff',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.6,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '10px 20px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          }}
        >
          Engineering high-throughput systems, government-grade encryption, and hardware-accelerated 60fps web experiences.
        </p>
      </div>
    </section>
  );
}
