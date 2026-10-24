import React, { useState } from 'react';
import { soundFX } from './soundFX';

export default function DesignPlayground() {
  const [activeAxiom, setActiveAxiom] = useState(0);

  const axioms = [
    {
      num: '01',
      title: 'Grid is Rhythm, Not a Cage',
      desc: 'We use the 12-column Swiss grid to establish harmonic balance, then deliberately break rhythm at high-velocity focal points to capture immediate curiosity.',
      tag: 'LAYOUT THEORY',
      accent: '#FF5500',
    },
    {
      num: '02',
      title: 'Tactility in the Digital Void',
      desc: 'Whether through foil stamp sheen, micro-haptics, or paper grain textures, every screen experience should trigger the physical memory of holding fine crafted paper.',
      tag: 'MATERIAL CRAFT',
      accent: '#00D2FF',
    },
    {
      num: '03',
      title: 'Typography carries 90% of Soul',
      desc: 'A typeface is not just a font file — it is the vocal tone of your brand. We pair bespoke display serifs with razor-sharp geometric monospace workhorses.',
      tag: 'TYPE SPECIMEN',
      accent: '#10B981',
    },
    {
      num: '04',
      title: 'Packaging as an Heirloom Ritual',
      desc: 'The unboxing journey begins the second fingers touch the matte cardboard seam. Every millimeter of die-line tolerance is tested for acoustic satisfaction.',
      tag: 'UNBOXING RITUAL',
      accent: '#FBBF24',
    },
  ];

  return (
    <section
      style={{
        width: 'min(94%, 1240px)',
        margin: '24px auto',
        padding: '0 0 20px',
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '2px solid #121316',
          borderRadius: '16px',
          padding: 'clamp(20px, 3.5vw, 36px)',
          boxShadow: '6px 6px 0px #121316',
          position: 'relative',
        }}
      >
        {/* Washi tape accents */}
        <div className="washi-tape washi-tape-top-left" />
        <div className="washi-tape washi-tape-top-right" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: '#FF5500', fontWeight: 800 }}>✦ CRAFT MANIFESTO</span>
          <span style={{ fontSize: '11px', color: '#888', fontFamily: 'Space Grotesk' }}>// 2024-2026 EDITION</span>
        </div>

        <h2
          style={{
            fontFamily: 'Fraunces',
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: '0 0 18px',
            color: '#121316',
          }}
        >
          Principles that guide our graphic design decisions.
        </h2>

        {/* 4 Interactive Axiom Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '18px',
          }}
        >
          {axioms.map((ax, idx) => {
            const isSelected = activeAxiom === idx;
            return (
              <div
                key={ax.num}
                onClick={() => {
                  soundFX.playSnap();
                  setActiveAxiom(idx);
                }}
                style={{
                  background: isSelected ? '#121316' : '#F9F8F5',
                  color: isSelected ? '#FFFFFF' : '#121316',
                  border: isSelected ? `2px solid ${ax.accent}` : '1.5px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? `4px 4px 0px ${ax.accent}` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '13px',
                        fontWeight: 900,
                        color: ax.accent,
                      }}
                    >
                      {ax.num}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        color: isSelected ? 'rgba(255,255,255,0.7)' : '#777',
                      }}
                    >
                      {ax.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      margin: '0 0 10px',
                      lineHeight: 1.25,
                    }}
                  >
                    {ax.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.5,
                      color: isSelected ? 'rgba(255,255,255,0.85)' : '#555',
                      margin: 0,
                    }}
                  >
                    {ax.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '10px',
                    borderTop: isSelected ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  <span style={{ color: ax.accent }}>● Certified Standard</span>
                  <span style={{ opacity: 0.6 }}>{isSelected ? 'ACTIVE' : 'SELECT'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
