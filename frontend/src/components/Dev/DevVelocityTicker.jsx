import React from 'react';
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '../ui/scroll-based-velocity';

export default function DevVelocityTicker() {
  return (
    <section
      style={{
        padding: '28px 0',
        background: '#040404',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <ScrollVelocityContainer>
        {/* Row 1 — Left to Right */}
        <ScrollVelocityRow
          baseVelocity={15}
          direction={1}
          style={{
            fontFamily: "'Archivo Black', 'Inter', sans-serif",
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#ffffff',
            paddingBottom: '8px',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', paddingRight: '20px' }}>
            <span>FULL-STACK ARCHITECT</span>
            <span style={{ color: '#CCFF00' }}>✦</span>
            <span>NEXT.JS & REACT</span>
            <span style={{ color: '#CCFF00' }}>✦</span>
            <span style={{ color: '#CCFF00' }}>HIGH PERFORMANCE</span>
            <span style={{ color: '#CCFF00' }}>✦</span>
            <span>PYTHON & DJANGO</span>
            <span style={{ color: '#CCFF00' }}>✦</span>
            <span>GOVERNMENT COMPLIANT</span>
            <span style={{ color: '#CCFF00' }}>✦</span>
          </span>
        </ScrollVelocityRow>

        {/* Row 2 — Right to Left */}
        <ScrollVelocityRow
          baseVelocity={15}
          direction={-1}
          style={{
            fontFamily: "'Archivo Black', 'Inter', sans-serif",
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.7)',
            paddingTop: '4px',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', paddingRight: '20px' }}>
            <span style={{ color: '#2555FF' }}>CYBER SECURITY & FORENSICS</span>
            <span style={{ color: '#2555FF' }}>✦</span>
            <span>60FPS CANVAS ENGINE</span>
            <span style={{ color: '#2555FF' }}>✦</span>
            <span>SHANNON ENTROPY</span>
            <span style={{ color: '#2555FF' }}>✦</span>
            <span style={{ color: '#2555FF' }}>PIXEL PERFECT UI/UX</span>
            <span style={{ color: '#2555FF' }}>✦</span>
            <span>MODERN WEB APPS</span>
            <span style={{ color: '#2555FF' }}>✦</span>
          </span>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
}
