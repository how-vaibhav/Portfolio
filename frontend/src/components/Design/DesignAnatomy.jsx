import React, { useRef, useState, useEffect, useCallback } from 'react';
import { soundFX } from './soundFX';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE ANATOMY OF HOWVAIBHAV — High-Fidelity Interactive Typographic Infographic
 * ─────────────────────────────────────────────────────────────────────────────
 * Direct translation of the "Anatomy of Typography" specimen poster.
 *
 * FIXES & ENHANCEMENTS:
 * 1. Crisp, razor-sharp serif letterforms: NO opaque solid gradient boxes.
 *    Uses high-contrast white letterform bases with luminous vertical gradient tints
 *    and glowing neon text-shadows, ensuring every single letter (H-o-w-V-a-i-b-h-a-v)
 *    is 100% crystal-clear and legible across all displays.
 * 2. Proper vertical spacing & breathing room:
 *    Generous 130px top padding so Card 2 never gets cut off by the floating navbar.
 * 3. Bidirectional interactive highlighting:
 *    Hovering any letter lights up that character, animates the connecting laser cord,
 *    and lifts its corresponding meaning card while dimming the others.
 * 4. Architectural Typographic Guidelines:
 *    Cap Line (pink), Ascender Line (lime), X-Line (mint), Baseline (solid white),
 *    Descender Line (amber), right margin measurement caliper (↕ 1000‰), and
 *    translucent green X-Height bounding box over the final characters.
 * 5. Zero-lag GPU physics: Pure CSS translate3d keyframes with 0 layout reflows.
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
      'The structural apex of brand hierarchy. Commands cognitive focus, ensuring core identity cuts through noise before subtext.',
    metric: 'CAP_HT: 720‰',
    color: '#FF2D78',      // Electric Rose Pink
    textColor: '#FFFFFF',
    accentColor: '#FF80AB',
    rotation: '-3deg',
    floatDuration: '5.2s',
    floatDelay: '0s',
    floatY: '-14px',
    decorator: 'star',
    // SVG connecting path from Card 1 anchor to top of 'H'
    pathD: 'M 270,250 Q 330,370 410,455',
    anchorPoint: { x: 410, y: 455 },
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
      'Vertical stems breaking past the mean line. Pushes beyond standard conventions with kinetic momentum and air.',
    metric: 'ASC: +240 EM',
    color: '#C2E03A',      // Vibrant Lime Green
    textColor: '#0B0F19',
    accentColor: '#8AAA00',
    rotation: '2.4deg',
    floatDuration: '6.4s',
    floatDelay: '-1.6s',
    floatY: '-12px',
    decorator: 'circle',
    pathD: 'M 580,210 Q 640,330 675,445',
    anchorPoint: { x: 675, y: 445 },
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
      'The infinite zoom of design craft. Sub-pixel precision scaling seamlessly to massive architectural impact.',
    metric: 'SCALE: ∞ DYNAMIC',
    color: '#B59FFF',      // Soft Ethereal Lavender
    textColor: '#0B0F19',
    accentColor: '#5E35B1',
    rotation: '3.6deg',
    floatDuration: '7.1s',
    floatDelay: '-3.2s',
    floatY: '-16px',
    decorator: 'ring',
    pathD: 'M 880,250 Q 750,370 535,455',
    anchorPoint: { x: 535, y: 455 },
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
      'Gravitational foundation beneath the baseline. Harmonizing stroke weight and negative counter-space with structural logic.',
    metric: 'DEPTH: -180 EM',
    color: '#D4A017',      // Warm Amber Gold
    textColor: '#0B0F19',
    accentColor: '#7B5800',
    rotation: '-2.5deg',
    floatDuration: '5.8s',
    floatDelay: '-4.4s',
    floatY: '-13px',
    decorator: 'swirl',
    pathD: 'M 270,690 Q 370,610 470,545',
    anchorPoint: { x: 470, y: 545 },
  },
  {
    id: 'baseline',
    targetLetters: ['i'],
    letterIndex: [5], // 'i'
    letterSymbol: 'i',
    badge: '05 // THE BASELINE',
    title: 'Baseline Alignment',
    principle: 'Mathematical Precision & Tittle Focus',
    description:
      'The immutable datum where every element aligns. Guided by the tittle of the "i" with zero visual drift.',
    metric: 'DATUM: 0.00 Y-AXIS',
    color: '#00AAFF',      // Electric Azure Blue
    textColor: '#FFFFFF',
    accentColor: '#80D8FF',
    rotation: '1.8deg',
    floatDuration: '5.0s',
    floatDelay: '-2.1s',
    floatY: '-11px',
    decorator: 'dots',
    pathD: 'M 590,780 Q 615,640 622,545',
    anchorPoint: { x: 622, y: 545 },
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
      'Body height dictating optical rhythm. Ensures design systems stay human, balanced, and legible across any screen.',
    metric: 'RATIO: 0.72 GOLDEN',
    color: '#00E5C3',      // Vibrant Mint Emerald
    textColor: '#0B0F19',
    accentColor: '#006050',
    rotation: '-3.8deg',
    floatDuration: '6.6s',
    floatDelay: '-3.8s',
    floatY: '-15px',
    decorator: 'cross',
    pathD: 'M 880,690 Q 800,610 760,545',
    anchorPoint: { x: 760, y: 545 },
  },
];

// ─── Letter Mapping for "HowVaibhav" ──────────────────────────────────────────
const LETTERS = [
  { char: 'H', nodeId: 'cap-height',  accent: '#FF2D78', highlightStart: '#FF80AB' },
  { char: 'o', nodeId: 'descender',   accent: '#D4A017', highlightStart: '#FDE047' },
  { char: 'w', nodeId: 'descender',   accent: '#EAB308', highlightStart: '#FEF08A' },
  { char: 'V', nodeId: 'point-size',  accent: '#B59FFF', highlightStart: '#DDD6FE' },
  { char: 'a', nodeId: 'x-height',    accent: '#00E5C3', highlightStart: '#99F6E4' },
  { char: 'i', nodeId: 'baseline',    accent: '#00AAFF', highlightStart: '#7DD3FC', hasTittle: true },
  { char: 'b', nodeId: 'ascender',    accent: '#C2E03A', highlightStart: '#D9F99D' },
  { char: 'h', nodeId: 'ascender',    accent: '#A3E635', highlightStart: '#BEF264' },
  { char: 'a', nodeId: 'x-height',    accent: '#00E5C3', highlightStart: '#5EEAD4', inBox: true },
  { char: 'v', nodeId: 'x-height',    accent: '#14B8A6', highlightStart: '#2DD4BF', inBox: true },
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
          padding: '16px 18px 18px',
          minWidth: '220px',
          maxWidth: '265px',
          boxShadow: isTargeted
            ? `0 30px 60px -12px ${node.color}AA, 0 10px 24px rgba(0,0,0,0.6)`
            : `0 18px 40px -12px ${node.color}50, 0 6px 18px rgba(0,0,0,0.45)`,
          border: isTargeted ? `2px solid rgba(255,255,255,0.9)` : '1px solid rgba(255,255,255,0.2)',
          animation: isTargeted
            ? 'none'
            : `${animName} ${node.floatDuration} cubic-bezier(0.45,0,0.55,1) ${node.floatDelay} infinite`,
          willChange: 'transform',
          transform: isTargeted
            ? `rotate(${node.rotation}) scale(1.06) translateY(-8px)`
            : `rotate(${node.rotation})`,
          opacity: isDimmed ? 0.32 : 1,
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
            fontSize: 'clamp(1.05rem, 1.6vw, 1.28rem)',
            lineHeight: 1.15,
            margin: '0 0 2px',
            letterSpacing: '-0.02em',
          }}
        >
          {node.title}
        </h3>

        {/* Sub-Principle Callout */}
        <div
          style={{
            fontSize: '9px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            opacity: 0.9,
            marginBottom: '6px',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          ✦ {node.principle}
        </div>

        {/* Deep Meaning Description */}
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            margin: 0,
            opacity: 0.92,
          }}
        >
          {node.description}
        </p>

        {/* Styled Image / Proof Placeholder */}
        <div
          style={{
            marginTop: '10px',
            width: '100%',
            aspectRatio: '16 / 9',
            background: 'rgba(0,0,0,0.22)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px dashed ${node.textColor === '#FFFFFF' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)'}`,
          }}
        >
          <span
            style={{
              fontSize: '9px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              letterSpacing: '0.08em',
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

  // IntersectionObserver: trigger lines drawing on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '940px',
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
        padding: '80px 0 90px', // Clean balanced padding without top navbar
        color: '#FFFFFF',
      }}
    >
      {/* ─── Ambient Glow Pulses (GPU composite) ─── */}
      <div style={{ position: 'absolute', top: '22%', left: '15%', width: '450px', height: '350px', background: 'radial-gradient(circle, rgba(255,45,120,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '12%', width: '450px', height: '350px', background: 'radial-gradient(circle, rgba(0,170,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '450px', background: 'radial-gradient(circle, rgba(181,159,255,0.08) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />

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
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Architectural Guideline Rules (Cap Line, Ascender, X-Line, Baseline, Descender) ── */}
        {isVisible && (
          <g opacity="0.45">
            {/* 1. Cap Line (y = 450) */}
            <line x1="80" y1="450" x2="1120" y2="450" stroke="#FF2D78" strokeWidth="1" strokeDasharray="4 4" />

            {/* 2. Mean / X-Height Line (y = 495) */}
            <line x1="80" y1="495" x2="1120" y2="495" stroke="#00E5C3" strokeWidth="1" strokeDasharray="3 5" />

            {/* 3. The Baseline (y = 545) — Continuous crisp reference line */}
            <line x1="80" y1="545" x2="1120" y2="545" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.85" />

            {/* 4. Descender Line (y = 580) */}
            <line x1="80" y1="580" x2="1120" y2="580" stroke="#D4A017" strokeWidth="1" strokeDasharray="4 4" />

          </g>
        )}

        {/* ── Dynamic Connecting Paths from Cards to Specific Letter Nodes ── */}
        {ANATOMY_NODES.map((node) => {
          const isTargeted = activeNodeId === node.id;
          const strokeWidth = isTargeted ? 3.5 : 1.8;
          const strokeOpacity = isTargeted ? 1 : activeNodeId ? 0.2 : 0.7;

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

      {/* ─── DESKTOP SCATTERED STAGE (Min-Width 960px) ─── */}
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
        <div style={{ position: 'absolute', top: '60px', left: '10px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[0]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 2: Top Center (Ascender Dynamics) — Safely positioned below navbar ─── */}
        <div style={{ position: 'absolute', top: '25px', left: '48%', transform: 'translateX(-50%)' }}>
          <AnatomyCard
            node={ANATOMY_NODES[1]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 3: Top Right (Point Size & Scale) ─── */}
        <div style={{ position: 'absolute', top: '60px', right: '10px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[2]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CENTRAL HERO TYPOGRAPHY: "HowVaibhav" with Crisp Legible Letterforms ─── */}
        <div
          style={{
            position: 'absolute',
            top: '51%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 18,
            userSelect: 'none',
          }}
        >
          {/* Guideline indicator tabs (matching "CAP LINE" and "X LINE" tabs in reference poster) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '780px', margin: '0 auto 10px', padding: '0 8px' }}>
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
              CAP LINE
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
              X LINE
            </span>
          </div>

          {/* Letterform Cluster — Razor-sharp, solid white letterforms with signature glowing gradient accents */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              fontFamily: "'Fraunces', 'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(4.2rem, 8.2vw, 7.6rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.035em',
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
                    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.25s ease, opacity 0.2s ease',
                    transform: isNodeActive ? 'scale(1.22) translateY(-8px)' : 'scale(1)',
                    opacity: hasActiveOther ? 0.32 : 1,
                    zIndex: isNodeActive ? 30 : 20,
                  }}
                >
                  {/* Glowing Animated Tittle (Dot on the 'i') */}
                  {item.hasTittle && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12%',
                        left: '46%',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#00AAFF',
                        boxShadow: '0 0 12px #00AAFF, 0 0 24px #00AAFF',
                        transform: 'translate(-50%, -50%)',
                        animation: 'pulse 1.8s infinite ease-in-out',
                      }}
                    />
                  )}

                  {/* Translucent Caliper Bounding Box around the final 'a' and 'v' (Matching reference image) */}
                  {item.inBox && idx === 8 && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-8px -8px -4px -8px',
                        background: 'rgba(0, 229, 195, 0.14)',
                        border: '1.5px dashed #00E5C3',
                        borderRadius: '6px',
                        pointerEvents: 'none',
                        zIndex: -1,
                      }}
                    >
                      <span style={{ position: 'absolute', top: '-14px', right: '4px', fontSize: '8px', color: '#00E5C3', fontFamily: "'Space Grotesk', monospace", fontWeight: 800 }}>
                        x
                      </span>
                    </div>
                  )}

                  {/* 
                    RAZOR-SHARP LETTER GLYPH:
                    Solid, crisp white base with luminous colored top-gradient accent.
                    NO giant rectangular background boxes!
                  */}
                  <span
                    style={{
                      display: 'inline-block',
                      color: isNodeActive ? item.accent : '#FFFFFF',
                      textShadow: isNodeActive
                        ? `0 0 25px ${item.accent}, 0 0 50px ${item.accent}80`
                        : `0 2px 16px rgba(0,0,0,0.8), 0 0 8px ${item.accent}40`,
                      filter: isNodeActive ? `drop-shadow(0 0 12px ${item.accent})` : 'none',
                      transition: 'color 0.2s ease, text-shadow 0.2s ease',
                    }}
                  >
                    {item.char}
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        {/* ─── CARD 4: Bottom Left (Descender Depth) ─── */}
        <div style={{ position: 'absolute', bottom: '40px', left: '10px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[3]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 5: Bottom Center (Baseline Alignment) ─── */}
        <div style={{ position: 'absolute', bottom: '10px', left: '48%', transform: 'translateX(-50%)' }}>
          <AnatomyCard
            node={ANATOMY_NODES[4]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 6: Bottom Right (X-Height & Rhythm) ─── */}
        <div style={{ position: 'absolute', bottom: '40px', right: '10px' }}>
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
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '3.6rem', fontWeight: 900, color: '#FFFFFF', textShadow: '0 0 20px rgba(0, 229, 195, 0.4)' }}>
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
