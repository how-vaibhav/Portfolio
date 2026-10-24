import React from 'react';
import { CREATIVE_STICKERS } from './designData';
import { soundFX } from './soundFX';

/**
 * DesignHero — Creative, tactile headline matching Reference 2 (Robin) + Reference 1 (Lowe).
 * Features doodle badges, pixel typography, washi tape, and sticker pills with Google Fonts.
 */
export default function DesignHero() {
  return (
    <section
      style={{
        width: 'min(94%, 1240px)',
        margin: '0 auto',
        paddingTop: '74px',
        paddingBottom: '16px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Top Doodles & Pixel Title (Reference 2 style) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '12px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            background: '#D1FAE5',
            color: '#065F46',
            border: '1.5px solid #065F46',
            borderRadius: '999px',
            padding: '3px 12px',
            fontFamily: 'Space Grotesk',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            boxShadow: '2px 2px 0px #065F46',
          }}
        >
          MADE THINGS ✦
        </span>

        <span
          style={{
            fontFamily: 'Instrument Serif',
            fontSize: '17px',
            color: '#666',
            fontStyle: 'italic',
          }}
        >
          my name is
        </span>

        <span
          style={{
            background: '#FEF3C7',
            color: '#92400E',
            border: '1.5px solid #92400E',
            borderRadius: '999px',
            padding: '3px 12px',
            fontFamily: 'Space Grotesk',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            boxShadow: '2px 2px 0px #92400E',
          }}
        >
          SWEAT THE DETAILS ✦
        </span>
      </div>

      {/* Big Hand-Framed Title Box */}
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          padding: '8px 28px',
          border: '2.5px solid #121316',
          borderRadius: '12px',
          background: '#FFFFFF',
          boxShadow: '5px 5px 0px #121316',
          marginBottom: '12px',
        }}
      >
        {/* Washi tape pinning the frame */}
        <div className="washi-tape washi-tape-top-left" />
        <div className="washi-tape washi-tape-top-right" />

        <h1
          style={{
            fontFamily: 'Syne',
            fontSize: 'clamp(34px, 6.5vw, 72px)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            margin: 0,
            lineHeight: 1.05,
            color: '#121316',
            textTransform: 'uppercase',
          }}
        >
          HOWVAIBHAV
        </h1>
      </div>

      {/* Sub-tag row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '14px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            background: '#FDE047',
            color: '#000',
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'Space Grotesk',
            fontSize: '11px',
            fontWeight: 800,
            border: '1px solid #000',
          }}
        >
          Brand & Graphic Designer
        </span>
        <span style={{ fontSize: '12px', color: '#666', fontWeight: 600, fontFamily: 'Space Grotesk' }}>
          ● Open to Visual Commissions
        </span>
        <span
          style={{
            background: '#BFDBFE',
            color: '#1E3A8A',
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'Space Grotesk',
            fontSize: '11px',
            fontWeight: 800,
            border: '1px solid #1E3A8A',
          }}
        >
          New Delhi // Global
        </span>
      </div>

      {/* Main Philosophy Statement with Fraunces & Instrument Serif */}
      <p
        style={{
          fontFamily: 'Fraunces',
          fontSize: 'clamp(20px, 2.8vw, 30px)',
          fontWeight: 600,
          lineHeight: 1.3,
          color: '#1E2024',
          maxWidth: '820px',
          margin: '0 auto 14px',
          letterSpacing: '-0.02em',
        }}
      >
        I design <span style={{ fontStyle: 'italic', color: '#E84419' }}>brand identities</span>,{' '}
        <span style={{ fontStyle: 'italic', color: '#10B981' }}>tactile packaging</span>, and{' '}
        <span style={{ fontStyle: 'italic', color: '#3B82F6' }}>visual systems</span> that get out of your way
        and leave an unforgettable mark. 🌸
      </p>

      {/* Interactive Sticker Badges that bounce on click */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          maxWidth: '860px',
          margin: '0 auto 12px',
        }}
      >
        {CREATIVE_STICKERS.map((stk) => (
          <div
            key={stk.id}
            onClick={() => soundFX.playSnap()}
            className="creative-sticker"
            style={{
              background: stk.color,
              color: stk.color === '#CCFF00' || stk.color === '#00D2FF' || stk.color === '#FBBF24' ? '#000' : '#fff',
              transform: `rotate(${stk.rotate}deg)`,
              padding: '4px 12px',
              fontSize: '10.5px',
            }}
          >
            <span>{stk.icon}</span>
            <span>{stk.text}</span>
          </div>
        ))}
      </div>

      {/* Subtle Scroll Hint */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'Space Grotesk',
          fontSize: '11px',
          fontWeight: 700,
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginTop: '6px',
        }}
      >
        <span style={{ animation: 'bounce 1.5s infinite' }}>↓</span>
        <span>Interactive 3D Conveyor Deck Below (Scroll, Drag, or Click)</span>
        <span style={{ animation: 'bounce 1.5s infinite' }}>↓</span>
      </div>
    </section>
  );
}
