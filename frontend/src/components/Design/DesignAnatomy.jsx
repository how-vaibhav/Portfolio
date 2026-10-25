import React, { useRef, useState, useEffect, useCallback } from 'react';
import { soundFX } from './soundFX';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE ANATOMY OF HOWVAIBHAV — High-Fidelity Interactive Typographic Infographic
 * ─────────────────────────────────────────────────────────────────────────────
 * An editorial design system where every letterform in "HowVaibhav" embodies
 * a fundamental pillar of creative engineering and visual design.
 *
 * Direct evolution of the classic "Anatomy of Typography" specimen poster,
 * featuring interactive letter-to-card bidirectional highlighting,
 * typographic guideline overlays (Cap Line, Ascender, X-Height, Baseline, Descender),
 * precision dimension calipers, and zero-lag GPU anti-gravity motion.
 */

// ─── The 6 Typographic Anatomies of "HowVaibhav" ──────────────────────────────
const ANATOMY_NODES = [
  {
    id: 'cap-height',
    targetLetters: ['H'],
    letterIndex: [0], // 'H'
    letterSymbol: 'H',
    badge: '01 // CAP LINE',
    title: 'Cap Height & Hierarchy',
    principle: 'Maximum Vertical Amplitude',
    description:
      'The structural apex of the visual hierarchy. Reaching from baseline to top datum (720‰), it commands cognitive attention, ensuring the core brand truth cuts through noise before subtext is parsed.',
    metric: 'CAP_HT: 720‰',
    color: '#FF2D78',      // Electric Rose Pink
    textColor: '#FFFFFF',
    accentColor: '#FF80AB',
    rotation: '-3deg',
    floatDuration: '5.2s',
    floatDelay: '0s',
    floatY: '-14px',
    decorator: 'star',
    // SVG connecting path from card anchor to letter 'H'
    pathD: 'M 250,210 Q 320,330 388,435',
    anchorPoint: { x: 388, y: 435 },
  },
  {
    id: 'ascender',
    targetLetters: ['b', 'h'],
    letterIndex: [6, 7], // 'b', 'h'
    letterSymbol: 'b · h',
    badge: '02 // ASCENDER LINE',
    title: 'Ascender Dynamics',
    principle: 'Trajectory Beyond the Mean',
    description:
      'Tall vertical stems that break through the conservative ceiling of the mean line. Pushing interfaces beyond standard conventions to instill momentum, forward vision, and kinetic air.',
    metric: 'ASC: +240 EM',
    color: '#C2E03A',      // Vibrant Lime Green
    textColor: '#0B0F19',
    accentColor: '#8AAA00',
    rotation: '2.4deg',
    floatDuration: '6.4s',
    floatDelay: '-1.6s',
    floatY: '-12px',
    decorator: 'circle',
    pathD: 'M 540,110 Q 610,260 670,410',
    anchorPoint: { x: 670, y: 410 },
  },
  {
    id: 'point-size',
    targetLetters: ['V'],
    letterIndex: [3], // 'V'
    letterSymbol: 'V',
    badge: '03 // POINT SIZE',
    title: 'Point Size & Scale',
    principle: 'Macro Impact × Micro Detail',
    description:
      'The infinite zoom of design. Calibrating micro-interactions to sub-pixel tolerance while orchestrating massive architectural billboards that anchor entire digital ecosystems.',
    metric: 'SCALE: ∞ DYNAMIC',
    color: '#B59FFF',      // Soft Ethereal Lavender
    textColor: '#0B0F19',
    accentColor: '#5E35B1',
    rotation: '3.6deg',
    floatDuration: '7.1s',
    floatDelay: '-3.2s',
    floatY: '-16px',
    decorator: 'ring',
    pathD: 'M 880,190 Q 770,320 520,430',
    anchorPoint: { x: 520, y: 430 },
  },
  {
    id: 'descender',
    targetLetters: ['o', 'w'],
    letterIndex: [1, 2], // 'o', 'w'
    letterSymbol: 'o · w',
    badge: '04 // DESCENDER DEPTH',
    title: 'Descender Depth',
    principle: 'Subterranean Foundation',
    description:
      'The gravitational anchor pulling beneath the baseline. Harmonizing positive stroke weight with negative counter-space to ground aesthetic beauty in rock-solid code, security, and logic.',
    metric: 'DEPTH: -180 EM',
    color: '#D4A017',      // Warm Amber Gold
    textColor: '#0B0F19',
    accentColor: '#7B5800',
    rotation: '-2.5deg',
    floatDuration: '5.8s',
    floatDelay: '-4.4s',
    floatY: '-13px',
    decorator: 'swirl',
    pathD: 'M 220,680 Q 320,590 440,515',
    anchorPoint: { x: 440, y: 515 },
  },
  {
    id: 'baseline',
    targetLetters: ['i'],
    letterIndex: [5], // 'i' (with tittle)
    letterSymbol: 'i',
    badge: '05 // THE BASELINE',
    title: 'Baseline Alignment',
    principle: 'Mathematical Precision & Tittle Focus',
    description:
      'The immutable datum upon which every character balances. Guided by the solitary glowing dot ("tittle") of the "i", embodying obsessive micro-craft, semantic fidelity, and zero visual drift.',
    metric: 'DATUM: 0.00 Y-AXIS',
    color: '#00AAFF',      // Electric Azure Blue
    textColor: '#FFFFFF',
    accentColor: '#80D8FF',
    rotation: '1.8deg',
    floatDuration: '5.0s',
    floatDelay: '-2.1s',
    floatY: '-11px',
    decorator: 'dots',
    pathD: 'M 590,810 Q 610,650 618,525',
    anchorPoint: { x: 618, y: 525 },
  },
  {
    id: 'x-height',
    targetLetters: ['a', 'v'],
    letterIndex: [4, 8, 9], // 'a', 'a', 'v'
    letterSymbol: 'a · v',
    badge: '06 // X-HEIGHT RATIO',
    title: 'X-Height & Rhythm',
    principle: 'Human Legibility & Resonance',
    description:
      'The body height that dictates natural optical flow. Framed in the technical caliper bounding box, proving that design systems can stretch across breakpoints without losing human warmth.',
    metric: 'RATIO: 0.72 GOLDEN',
    color: '#00E5C3',      // Vibrant Mint Emerald
    textColor: '#0B0F19',
    accentColor: '#006050',
    rotation: '-3.8deg',
    floatDuration: '6.6s',
    floatDelay: '-3.8s',
    floatY: '-15px',
    decorator: 'cross',
    pathD: 'M 910,690 Q 820,600 780,510',
    anchorPoint: { x: 780, y: 510 },
  },
];

// ─── Letter Breakdown for "HowVaibhav" ──────────────────────────────────────────
const LETTERS = [
  { char: 'H', nodeId: 'cap-height',  accent: '#FF2D78' },
  { char: 'o', nodeId: 'descender',   accent: '#D4A017' },
  { char: 'w', nodeId: 'descender',   accent: '#EAB308' },
  { char: 'V', nodeId: 'point-size',  accent: '#B59FFF' },
  { char: 'a', nodeId: 'x-height',    accent: '#00E5C3' },
  { char: 'i', nodeId: 'baseline',    accent: '#00AAFF', hasTittle: true },
  { char: 'b', nodeId: 'ascender',    accent: '#C2E03A' },
  { char: 'h', nodeId: 'ascender',    accent: '#A3E635' },
  { char: 'a', nodeId: 'x-height',    accent: '#00E5C3', inBox: true },
  { char: 'v', nodeId: 'x-height',    accent: '#14B8A6', inBox: true },
];

// ─── Geometric Decorative Accents ──────────────────────────────────────────────
function NodeDecorator({ type, color, accent }) {
  if (type === 'star') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ position: 'absolute', top: '-13px', right: '-11px', pointerEvents: 'none' }}>
        <path d="M14 2l2.6 8.5H25l-6.8 5 2.6 8.5L14 18.8 7.2 24l2.6-8.5L3 10.5h8.4z" fill={color} stroke={accent} strokeWidth="1.2" />
      </svg>
    );
  }
  if (type === 'circle') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: '-12px', right: '-10px', pointerEvents: 'none' }}>
        <circle cx="12" cy="12" r="9.5" stroke={accent} strokeWidth="2.5" fill="none" />
        <circle cx="12" cy="12" r="3.5" fill={color} />
      </svg>
    );
  }
  if (type === 'ring') {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ position: 'absolute', top: '-13px', left: '-11px', pointerEvents: 'none' }}>
        <circle cx="13" cy="13" r="10.5" stroke={accent} strokeWidth="2" fill="none" strokeDasharray="3 3.5" />
      </svg>
    );
  }
  if (type === 'swirl') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ position: 'absolute', bottom: '-12px', left: '-10px', pointerEvents: 'none' }}>
        <path d="M14 4 C7 4 4 9 4 14 C4 20 9 23 14 23 C20 23 23 19 23 14" stroke={accent} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <circle cx="23" cy="14" r="2.5" fill={color} />
      </svg>
    );
  }
  if (type === 'dots') {
    return (
      <svg width="28" height="14" viewBox="0 0 28 14" fill="none" style={{ position: 'absolute', bottom: '-10px', right: '-8px', pointerEvents: 'none' }}>
        <circle cx="5" cy="7" r="3.5" fill={color} />
        <circle cx="14" cy="7" r="3" fill={color} opacity="0.75" />
        <circle cx="23" cy="7" r="2.5" fill={color} opacity="0.45" />
      </svg>
    );
  }
  if (type === 'cross') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ position: 'absolute', top: '-11px', right: '-9px', pointerEvents: 'none' }}>
        <line x1="11" y1="2" x2="11" y2="20" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="2" y1="11" x2="20" y2="11" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  return null;
}

// ─── Individual Floating Anatomical Card ───────────────────────────────────────
function AnatomyCard({ node, activeNodeId, onSelect, onHover, onLeave }) {
  const isTargeted = activeNodeId === node.id;
  const isDimmed   = activeNodeId !== null && !isTargeted;
  const animName   = `cFloat_${node.id}`;

  return (
    <>
      <style>{`
        @keyframes ${animName} {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(${node.rotation}); }
          50%       { transform: translate3d(0, ${node.floatY}, 0) rotate(${node.rotation}); }
        }
      `}</style>

      <div
        data-node-id={node.id}
        onMouseEnter={() => {
          try { soundFX.playTick(); } catch {}
          onHover(node.id);
        }}
        onMouseLeave={onLeave}
        onClick={() => {
          try { soundFX.playSnap(); } catch {}
          onSelect(node.id === activeNodeId ? null : node.id);
        }}
        style={{
          position: 'relative',
          background: node.color,
          color: node.textColor,
          borderRadius: '22px',
          padding: '18px 20px 20px',
          minWidth: '220px',
          maxWidth: '280px',
          boxShadow: isTargeted
            ? `0 30px 60px -12px ${node.color}99, 0 10px 24px rgba(0,0,0,0.6)`
            : `0 18px 40px -12px ${node.color}50, 0 6px 18px rgba(0,0,0,0.45)`,
          border: isTargeted ? `2px solid rgba(255,255,255,0.9)` : '1px solid rgba(255,255,255,0.2)',
          animation: isTargeted
            ? 'none'
            : `${animName} ${node.floatDuration} cubic-bezier(0.45,0,0.55,1) ${node.floatDelay} infinite`,
          willChange: 'transform',
          transform: isTargeted
            ? `rotate(${node.rotation}) scale(1.06) translateY(-8px)`
            : `rotate(${node.rotation})`,
          opacity: isDimmed ? 0.35 : 1,
          transition: 'opacity 0.25s ease, box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s ease',
          cursor: 'pointer',
          zIndex: isTargeted ? 40 : 20,
        }}
      >
        {/* Corner Decorator Badge */}
        <NodeDecorator type={node.decorator} color={node.color} accent={node.accentColor} />

        {/* Top Meta Line: Badge + Metric */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '8px' }}>
          <span
            style={{
              background: node.textColor === '#FFFFFF' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)',
              color: node.textColor,
              fontSize: '8.5px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 900,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '2.5px 7px',
              borderRadius: '4px',
            }}
          >
            {node.badge}
          </span>
          <span
            style={{
              fontSize: '8px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              opacity: 0.75,
              letterSpacing: '0.04em',
            }}
          >
            {node.metric}
          </span>
        </div>

        {/* Card Title (Serif Italic like classic specimen poster) */}
        <h3
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
            lineHeight: 1.15,
            margin: '0 0 3px',
            letterSpacing: '-0.02em',
          }}
        >
          {node.title}
        </h3>

        {/* Sub-Principle Callout */}
        <div
          style={{
            fontSize: '9.5px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            opacity: 0.9,
            marginBottom: '8px',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          ✦ {node.principle}
        </div>

        {/* Deep Meaning Description */}
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: '11.5px',
            fontWeight: 500,
            lineHeight: 1.5,
            margin: 0,
            opacity: 0.92,
          }}
        >
          {node.description}
        </p>

        {/* Styled Image / Proof Placeholder */}
        <div
          style={{
            marginTop: '12px',
            width: '100%',
            aspectRatio: '16 / 9',
            background: 'rgba(0,0,0,0.22)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px dashed ${node.textColor === '#FFFFFF' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)'}`,
          }}
        >
          <span
            style={{
              fontSize: '9.5px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: 0.65,
            }}
          >
            ↑ Inject Artwork [{node.letterSymbol}]
          </span>
        </div>
      </div>
    </>
  );
}

// ─── Main DesignAnatomy Section ───────────────────────────────────────────────
export default function DesignAnatomy() {
  const sectionRef    = useRef(null);
  const [isVisible, setIsVisible]       = useState(false);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [mouseCoord, setMouseCoord]     = useState({ x: 50, y: 50 });

  // IntersectionObserver: trigger lines drawing on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Magnetic cursor angle calculation for central title gradient
  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setMouseCoord({ x, y });
  }, []);

  const gradientAngle = Math.round(
    (Math.atan2(mouseCoord.y - 50, mouseCoord.x - 50) * 180) / Math.PI + 180
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        // Pure Obsidian Technical Canvas
        backgroundColor: '#0A0B0E',
        // Clean engineering grid background (CSS only, zero overhead)
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        padding: '90px 0 110px',
        color: '#FFFFFF',
      }}
    >
      {/* ─── Ambient Glow Pulses (GPU composite) ─── */}
      <div style={{ position: 'absolute', top: '20%', left: '15%', width: '450px', height: '350px', background: 'radial-gradient(circle, rgba(255,45,120,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '12%', width: '450px', height: '350px', background: 'radial-gradient(circle, rgba(0,170,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '450px', background: 'radial-gradient(circle, rgba(181,159,255,0.08) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />

      {/* ─── Top Studio Metadata (Exact Reference Style: "Aa The Anatomy of Typography") ─── */}
      <div style={{ position: 'absolute', top: '34px', left: 'max(24px, 4%)', zIndex: 25, display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 900, fontSize: '36px', color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.03em' }}>
          Hv
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 900, color: '#FFFFFF', fontFamily: "'Space Grotesk', monospace", letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            The Anatomy of HowVaibhav
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', fontFamily: "'Space Grotesk', monospace", letterSpacing: '0.04em' }}>
            A Visual Guide to Letterform Philosophy &amp; Creative Engineering
          </div>
        </div>
      </div>

      {/* ─── Bottom Studio Metadata (Reference: "Created by Vasil Enev | August 2024") ─── */}
      <div style={{ position: 'absolute', bottom: '30px', left: 'max(24px, 4%)', zIndex: 25, display: 'flex', gap: '28px', fontSize: '11px', fontFamily: "'Space Grotesk', monospace" }}>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.35)', display: 'block', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Created by</span>
          <span style={{ fontWeight: 800, color: 'rgba(255,255,255,0.75)' }}>Vaibhav Verma</span>
        </div>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.35)', display: 'block', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Edition</span>
          <span style={{ fontWeight: 800, color: 'rgba(255,255,255,0.75)' }}>2026 Archive</span>
        </div>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.35)', display: 'block', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Datum Matrix</span>
          <span style={{ fontWeight: 800, color: '#00E5C3' }}>CALIPER ACTIVE ⌖</span>
        </div>
      </div>

      {/* ─── SVG CONNECTOR LAYER & TYPOGRAPHIC GUIDELINE RULES ─── */}
      <svg
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="neonPathGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Architectural Guideline Rules (Cap Line, Ascender, X-Line, Baseline, Descender) ── */}
        {isVisible && (
          <g opacity="0.38">
            {/* 1. Cap Line (y = 415) */}
            <line x1="120" y1="415" x2="1080" y2="415" stroke="#FF2D78" strokeWidth="1" strokeDasharray="4 4" />

            {/* 2. Mean / X-Height Line (y = 475) */}
            <line x1="120" y1="475" x2="1080" y2="475" stroke="#00E5C3" strokeWidth="1" strokeDasharray="3 5" />

            {/* 3. The Baseline (y = 538) — Continuous crisp reference line */}
            <line x1="120" y1="538" x2="1080" y2="538" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.8" />

            {/* 4. Descender Line (y = 575) */}
            <line x1="120" y1="575" x2="1080" y2="575" stroke="#D4A017" strokeWidth="1" strokeDasharray="4 4" />

            {/* Vertical Caliper Arrow on Right Margin (like reference image) */}
            <line x1="1120" y1="415" x2="1120" y2="575" stroke="#FFFFFF" strokeWidth="1.5" />
            <polygon points="1115,422 1125,422 1120,410" fill="#FFFFFF" />
            <polygon points="1115,568 1125,568 1120,580" fill="#FFFFFF" />
            <text x="1132" y="500" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="'Space Grotesk', monospace" fontWeight="800" transform="rotate(90, 1132, 500)">
              1000‰ POINT SIZE
            </text>
          </g>
        )}

        {/* ── Dynamic Connecting Paths from Cards to Specific Letter Nodes ── */}
        {ANATOMY_NODES.map((node) => {
          const isTargeted = activeNodeId === node.id;
          const strokeWidth = isTargeted ? 3.5 : 1.8;
          const strokeOpacity = isTargeted ? 1 : activeNodeId ? 0.2 : 0.65;

          return (
            <g key={node.id}>
              {/* Main curved path */}
              <path
                d={node.pathD}
                stroke={node.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                opacity={strokeOpacity}
                filter="url(#neonPathGlow)"
                style={{
                  strokeDasharray: 900,
                  strokeDashoffset: isVisible ? 0 : 900,
                  transition: 'stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.5, 1), stroke-width 0.2s ease, opacity 0.2s ease',
                }}
              />
              {/* Target terminal node circle on the exact letterform */}
              {isVisible && (
                <circle
                  cx={node.anchorPoint.x}
                  cy={node.anchorPoint.y}
                  r={isTargeted ? 6 : 4}
                  fill={node.color}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  filter="url(#neonPathGlow)"
                  style={{ transition: 'r 0.2s ease' }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* ─── DESKTOP SCATTERED LAYOUT (Min-Width 960px) ─── */}
      <div
        className="anatomy-desktop-stage"
        style={{
          position: 'relative',
          maxWidth: '1240px',
          minHeight: '840px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <style>{`
          @media (min-width: 960px) {
            .anatomy-desktop-stage { display: block !important; }
            .anatomy-mobile-grid   { display: none !important; }
          }
          @media (max-width: 959px) {
            .anatomy-desktop-stage { display: none !important; }
            .anatomy-mobile-grid   { display: flex !important; }
          }
        `}</style>

        {/* ─── CARD 1: Top Left (Cap Height) ─── */}
        <div style={{ position: 'absolute', top: '30px', left: '0px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[0]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 2: Top Center (Ascender Dynamics) ─── */}
        <div style={{ position: 'absolute', top: '-10px', left: '46%', transform: 'translateX(-50%)' }}>
          <AnatomyCard
            node={ANATOMY_NODES[1]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 3: Top Right (Point Size & Scale) ─── */}
        <div style={{ position: 'absolute', top: '30px', right: '0px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[2]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CENTRAL HERO TYPOGRAPHY: "HowVaibhav" with Interactive Letter Mapping ─── */}
        <div
          style={{
            position: 'absolute',
            top: '49%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 18,
            userSelect: 'none',
          }}
        >
          {/* Subtle guideline indicator tabs (matching "CAP LINE" and "X LINE" tabs in image) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '820px', margin: '0 auto 12px', padding: '0 10px' }}>
            <span
              style={{
                background: '#FF2D78',
                color: '#FFF',
                fontSize: '9px',
                fontFamily: "'Space Grotesk', monospace",
                fontWeight: 900,
                padding: '3px 9px',
                borderRadius: '4px',
                letterSpacing: '0.1em',
              }}
            >
              CAP LINE [H]
            </span>
            <span
              style={{
                background: '#00E5C3',
                color: '#0B0F19',
                fontSize: '9px',
                fontFamily: "'Space Grotesk', monospace",
                fontWeight: 900,
                padding: '3px 9px',
                borderRadius: '4px',
                letterSpacing: '0.1em',
              }}
            >
              X LINE [a · v]
            </span>
          </div>

          {/* Letterform Cluster */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              fontFamily: "'Fraunces', 'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(4rem, 8.5vw, 7.8rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              position: 'relative',
            }}
          >
            {LETTERS.map((item, idx) => {
              const isNodeActive = activeNodeId === item.nodeId;
              const hasActiveOther = activeNodeId !== null && !isNodeActive;

              return (
                <span
                  key={idx}
                  onMouseEnter={() => {
                    try { soundFX.playTick(); } catch {}
                    setActiveNodeId(item.nodeId);
                  }}
                  onMouseLeave={() => setActiveNodeId(null)}
                  style={{
                    display: 'inline-block',
                    position: 'relative',
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.25s ease, opacity 0.2s ease',
                    transform: isNodeActive ? 'scale(1.22) translateY(-8px)' : 'scale(1)',
                    opacity: hasActiveOther ? 0.35 : 1,
                    zIndex: isNodeActive ? 30 : 20,
                    // Letter-specific signature color / gradient
                    filter: isNodeActive ? `drop-shadow(0 0 20px ${item.accent})` : 'none',
                  }}
                >
                  {/* Glowing Animated Tittle (Dot on the 'i') */}
                  {item.hasTittle && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12%',
                        left: '42%',
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: '#00AAFF',
                        boxShadow: '0 0 12px #00AAFF, 0 0 24px #00AAFF',
                        transform: 'translate(-50%, -50%)',
                        animation: 'pulse 1.8s infinite ease-in-out',
                      }}
                    />
                  )}

                  {/* Translucent Caliper Bounding Box around the final 'a' and 'v' (Like the green 'x' box in the image) */}
                  {item.inBox && idx === 8 && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-10px -8px -6px -8px',
                        background: 'rgba(0, 229, 195, 0.16)',
                        border: '1.5px dashed #00E5C3',
                        borderRadius: '6px',
                        pointerEvents: 'none',
                        zIndex: -1,
                      }}
                    >
                      <span style={{ position: 'absolute', top: '-14px', right: '4px', fontSize: '8px', color: '#00E5C3', fontFamily: "'Space Grotesk', monospace", fontWeight: 800 }}>
                        X-HEIGHT
                      </span>
                    </div>
                  )}

                  <span
                    style={{
                      background: isNodeActive
                        ? item.accent
                        : `linear-gradient(${gradientAngle}deg, #FFFFFF 40%, ${item.accent} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {item.char}
                  </span>
                </span>
              );
            })}
          </div>

          {/* Sub-label Under Central Specimen */}
          <div
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '16px',
            }}
          >
            Typographic Taxonomy // Click Any Card or Letterform
          </div>
        </div>

        {/* ─── CARD 4: Bottom Left (Descender Depth) ─── */}
        <div style={{ position: 'absolute', bottom: '20px', left: '0px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[3]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 5: Bottom Center (Baseline Alignment) ─── */}
        <div style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)' }}>
          <AnatomyCard
            node={ANATOMY_NODES[4]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 6: Bottom Right (X-Height & Rhythm) ─── */}
        <div style={{ position: 'absolute', bottom: '20px', right: '0px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[5]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>
      </div>

      {/* ─── MOBILE RESPONSIVE FALLBACK (Stacked Clean Grid) ─── */}
      <div
        className="anatomy-mobile-grid"
        style={{
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          padding: '0 20px',
          maxWidth: '560px',
          margin: '0 auto',
        }}
      >
        {/* Mobile Header Word */}
        <div style={{ textAlign: 'center', padding: '20px 0 10px' }}>
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '3.6rem', fontWeight: 900, color: '#FFF' }}>
            HowVaibhav
          </div>
          <div style={{ fontSize: '10px', fontFamily: "'Space Grotesk', monospace", color: '#00E5C3', fontWeight: 800, letterSpacing: '0.15em', marginTop: '6px' }}>
            THE ANATOMY OF DESIGN
          </div>
        </div>

        {ANATOMY_NODES.map((node) => (
          <div key={node.id} style={{ width: '100%', maxWidth: '340px' }}>
            <AnatomyCard
              node={{ ...node, rotation: '0deg', floatDuration: '0s' }}
              activeNodeId={activeNodeId}
              onSelect={setActiveNodeId}
              onHover={setActiveNodeId}
              onLeave={() => setActiveNodeId(null)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
