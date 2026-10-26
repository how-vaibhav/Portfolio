import React, { useRef, useState, useEffect } from 'react';
import { soundFX } from './soundFX';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE ANATOMY OF HOWVAIBHAV — Interactive Typographic Brand Taxonomy
 * ─────────────────────────────────────────────────────────────────────────────
 * An acrostic typographic taxonomy where every letter in "HowVaibhav" reveals
 * a core brand craft principle whose heading spelling matches the letter:
 *
 *  H -> Hierarchy & Height
 *  O -> Optical Balance & Orbit
 *  W -> Weight & White Space
 *  V -> Vector Craft & Volume
 *  A -> Architecture & Apex
 *  I -> Identity & Ink Precision
 *  B -> Baseline & Bold Stems
 */

// ─── The 7 Typographic Anatomies of "HowVaibhav" ──────────────────────────────
const ANATOMY_NODES = [
  {
    id: 'node-h',
    targetLetters: ['H', 'h'],
    letterIndex: [0, 7],
    letterSymbol: 'H',
    badge: '01 // H · HIERARCHY',
    title: 'Hierarchy & Height',
    principle: 'Maximum Vertical Amplitude',
    metric: 'CAP_HT: 720‰',
    image: '/assets/text_image/artwork-h.jpg',
    color: '#FF2D78',      // Electric Rose Pink
    textColor: '#FFFFFF',
    accentColor: '#FF80AB',
    rotation: '-3deg',
    floatDuration: '5.2s',
    floatDelay: '0s',
    floatY: '-12px',
    decorator: 'star',
    // SVG connecting path from Card 1 anchor to top of 'H'
    pathD: 'M 240,190 Q 280,310 350,410',
    anchorPoint: { x: 350, y: 410 },
  },
  {
    id: 'node-b',
    targetLetters: ['b'],
    letterIndex: [6],
    letterSymbol: 'B',
    badge: '02 // B · BASELINE',
    title: 'Baseline & Bold Stems',
    principle: 'Structural Stem Power',
    metric: 'ASC_HT: +240 EM',
    image: '/assets/text_image/artwork-b.jpg',
    color: '#C2E03A',      // Vibrant Lime Green
    textColor: '#0B0F19',
    accentColor: '#8AAA00',
    rotation: '2deg',
    floatDuration: '6.4s',
    floatDelay: '-1.6s',
    floatY: '-10px',
    decorator: 'circle',
    pathD: 'M 600,175 Q 630,300 675,410',
    anchorPoint: { x: 675, y: 410 },
  },
  {
    id: 'node-v',
    targetLetters: ['V', 'v'],
    letterIndex: [3, 9],
    letterSymbol: 'V',
    badge: '03 // V · VECTOR',
    title: 'Vector Craft & Volume',
    principle: 'Infinite Scalability & Rigor',
    metric: 'VERTEX: 42.4° APEX',
    image: '/assets/text_image/artwork-v.jpg',
    color: '#B59FFF',      // Soft Ethereal Lavender
    textColor: '#0B0F19',
    accentColor: '#5E35B1',
    rotation: '3deg',
    floatDuration: '7.1s',
    floatDelay: '-3.2s',
    floatY: '-14px',
    decorator: 'ring',
    pathD: 'M 960,190 Q 770,280 545,410',
    anchorPoint: { x: 545, y: 410 },
  },
  {
    id: 'node-o',
    targetLetters: ['o'],
    letterIndex: [1],
    letterSymbol: 'O',
    badge: '04 // O · OPTICAL',
    title: 'Optical Balance & Orbit',
    principle: 'Pure Circular Resonance',
    metric: 'OVERSHOOT: +18‰',
    image: '/assets/text_image/artwork-o.jpg',
    color: '#FF8A00',      // Solar Amber Orange
    textColor: '#0B0F19',
    accentColor: '#7B4200',
    rotation: '-2.5deg',
    floatDuration: '5.8s',
    floatDelay: '-4.4s',
    floatY: '-11px',
    decorator: 'swirl',
    pathD: 'M 220,710 Q 300,580 410,485',
    anchorPoint: { x: 410, y: 485 },
  },
  {
    id: 'node-w',
    targetLetters: ['w'],
    letterIndex: [2],
    letterSymbol: 'W',
    badge: '05 // W · WEIGHT',
    title: 'Weight & White Space',
    principle: 'Harmonic Stroke Tension',
    metric: 'STEM_WT: 114 EM',
    image: '/assets/text_image/artwork-w.jpg',
    color: '#F59E0B',      // Marigold Gold Yellow
    textColor: '#0B0F19',
    accentColor: '#78350F',
    rotation: '2.5deg',
    floatDuration: '6.1s',
    floatDelay: '-2.5s',
    floatY: '-10px',
    decorator: 'cross',
    pathD: 'M 370,720 Q 420,600 470,485',
    anchorPoint: { x: 470, y: 485 },
  },
  {
    id: 'node-i',
    targetLetters: ['i'],
    letterIndex: [5],
    letterSymbol: 'I',
    badge: '06 // I · IDENTITY',
    title: 'Identity & Ink Precision',
    principle: 'Tittle Focal Point Datum',
    metric: 'DATUM: 0.00 Y-AXIS',
    image: '/assets/text_image/artwork-i.jpg',
    color: '#00AAFF',      // Electric Azure Blue
    textColor: '#FFFFFF',
    accentColor: '#80D8FF',
    rotation: '-1.8deg',
    floatDuration: '5.0s',
    floatDelay: '-1.8s',
    floatY: '-11px',
    decorator: 'dots',
    pathD: 'M 830,720 Q 730,600 635,485',
    anchorPoint: { x: 635, y: 485 },
  },
  {
    id: 'node-a',
    targetLetters: ['a'],
    letterIndex: [4, 8],
    letterSymbol: 'A',
    badge: '07 // A · ARCHITECTURE',
    title: 'Architecture & Apex',
    principle: 'Humanist Geometric Form',
    metric: 'RATIO: 0.72 GOLDEN',
    image: '/assets/text_image/artwork-a.jpg',
    color: '#00E5C3',      // Vibrant Mint Emerald
    textColor: '#0B0F19',
    accentColor: '#006050',
    rotation: '3deg',
    floatDuration: '6.6s',
    floatDelay: '-3.8s',
    floatY: '-13px',
    decorator: 'ring',
    pathD: 'M 980,710 Q 890,590 795,485',
    anchorPoint: { x: 795, y: 485 },
  },
];

// ─── Direct Letter Mapping for "HowVaibhav" ──────────────────────────────────
const LETTERS = [
  { char: 'H', nodeId: 'node-h', accent: '#FF2D78' },
  { char: 'o', nodeId: 'node-o', accent: '#FF8A00' },
  { char: 'w', nodeId: 'node-w', accent: '#F59E0B' },
  { char: 'V', nodeId: 'node-v', accent: '#B59FFF' },
  { char: 'a', nodeId: 'node-a', accent: '#00E5C3' },
  { char: 'i', nodeId: 'node-i', accent: '#00AAFF', hasTittle: true },
  { char: 'b', nodeId: 'node-b', accent: '#C2E03A' },
  { char: 'h', nodeId: 'node-h', accent: '#FF2D78' },
  { char: 'a', nodeId: 'node-a', accent: '#00E5C3' },
  { char: 'v', nodeId: 'node-v', accent: '#B59FFF' },
];

// ─── Geometric Decorative Accents ──────────────────────────────────────────────
function NodeDecorator({ type, color, accent }) {
  if (type === 'star') {
    return (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" style={{ position: 'absolute', top: '-11px', right: '-9px', pointerEvents: 'none' }}>
        <path d="M14 2l2.6 8.5H25l-6.8 5 2.6 8.5L14 18.8 7.2 24l2.6-8.5L3 10.5h8.4z" fill={color} stroke={accent} strokeWidth="1.2" />
      </svg>
    );
  }
  if (type === 'circle') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: '-10px', right: '-8px', pointerEvents: 'none' }}>
        <circle cx="12" cy="12" r="9.5" stroke={accent} strokeWidth="2.5" fill="none" />
        <circle cx="12" cy="12" r="3.5" fill={color} />
      </svg>
    );
  }
  if (type === 'ring') {
    return (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" style={{ position: 'absolute', top: '-11px', left: '-9px', pointerEvents: 'none' }}>
        <circle cx="13" cy="13" r="10.5" stroke={accent} strokeWidth="2" fill="none" strokeDasharray="3 3.5" />
      </svg>
    );
  }
  if (type === 'swirl') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: '-10px', right: '-8px', pointerEvents: 'none' }}>
        <path d="M12 4a8 8 0 108 8 5 5 0 00-5-5 3 3 0 00-3 3" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'dots') {
    return (
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ position: 'absolute', top: '-8px', right: '-6px', pointerEvents: 'none' }}>
        <circle cx="4" cy="6" r="3" fill={accent} />
        <circle cx="12" cy="6" r="3" fill={color} />
        <circle cx="20" cy="6" r="3" fill={accent} />
      </svg>
    );
  }
  if (type === 'cross') {
    return (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" style={{ position: 'absolute', top: '-10px', right: '-8px', pointerEvents: 'none' }}>
        <line x1="11" y1="2" x2="11" y2="20" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="2" y1="11" x2="20" y2="11" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  return null;
}

// ─── Individual Floating Anatomical Card (Ultra-Smooth 3D Parallax & Gyro Tilt) ─
function AnatomyCard({ node, activeNodeId, onSelect, onHover, onLeave }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const isTargeted = activeNodeId === node.id;
  const isDimmed   = activeNodeId !== null && !isTargeted;
  const animName   = `cFloat_${node.id}`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2; // -1 to 1

    setTilt({
      x: -normY * 13,
      y: normX * 15,
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.32,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    try { soundFX.playHover(); } catch {}
    onHover(node.id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
    onLeave();
  };

  return (
    <>
      <style>{`
        @keyframes ${animName} {
          0%, 100% { transform: perspective(1000px) translate3d(0, 0, 0) rotate(${node.rotation}); }
          50%       { transform: perspective(1000px) translate3d(0, ${node.floatY}, 0) rotate(${node.rotation}); }
        }
      `}</style>

      <div
        ref={cardRef}
        data-node-id={node.id}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          try { soundFX.playSnap(); } catch {}
          onSelect(node.id === activeNodeId ? null : node.id);
        }}
        style={{
          position: 'relative',
          background: node.color,
          color: node.textColor,
          borderRadius: '20px',
          padding: '14px 16px 16px',
          width: '215px',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered || isTargeted
            ? `0 32px 65px -10px ${node.color}95, 0 12px 28px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.7)`
            : `0 14px 34px -10px ${node.color}50, 0 4px 14px rgba(0,0,0,0.45)`,
          border: isTargeted
            ? `2px solid rgba(255,255,255,0.95)`
            : isHovered
            ? `2px solid rgba(255,255,255,0.85)`
            : '1px solid rgba(255,255,255,0.2)',
          animation: isHovered || isTargeted
            ? 'none'
            : `${animName} ${node.floatDuration} cubic-bezier(0.45,0,0.55,1) ${node.floatDelay} infinite`,
          willChange: 'transform',
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(0, -14px, 35px) scale(1.08)`
            : isTargeted
            ? `perspective(1000px) rotate(${node.rotation}) translate3d(0, -8px, 20px) scale(1.05)`
            : `perspective(1000px) rotate(${node.rotation})`,
          opacity: isDimmed ? 0.28 : 1,
          transition: isHovered
            ? 'transform 0.08s ease-out, box-shadow 0.25s ease, border-color 0.2s ease, opacity 0.25s ease'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.2s ease, opacity 0.25s ease',
          cursor: 'pointer',
          zIndex: isHovered || isTargeted ? 50 : 20,
        }}
      >
        {/* Dynamic Specular Holographic Glare Sheen */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '20px',
            pointerEvents: 'none',
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
            mixBlendMode: 'overlay',
            transition: isHovered ? 'opacity 0.15s ease' : 'opacity 0.4s ease',
            opacity: glare.opacity,
            zIndex: 10,
          }}
        />
        {/* Corner Decorator Badge */}
        <NodeDecorator type={node.decorator} color={node.color} accent={node.accentColor} />

        {/* Top Meta Line: Badge + Metric */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px', marginBottom: '8px' }}>
          <span
            style={{
              background: node.textColor === '#FFFFFF' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)',
              color: node.textColor,
              fontSize: '8px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 900,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {node.badge}
          </span>
          <span
            style={{
              fontSize: '7.5px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              opacity: 0.75,
              letterSpacing: '0.04em',
            }}
          >
            {node.metric}
          </span>
        </div>

        {/* Card Title (Serif Italic) */}
        <h3
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: '17px',
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
            fontSize: '8.5px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            opacity: 0.88,
            marginBottom: '8px',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          ✦ {node.principle}
        </div>

        {/* Visual Artwork Showcase Plate */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '96px',
            borderRadius: '11px',
            overflow: 'hidden',
            background: 'rgba(0, 0, 0, 0.35)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
            border: `1px solid ${node.textColor === '#FFFFFF' ? 'rgba(255, 255, 255, 0.32)' : 'rgba(0, 0, 0, 0.22)'}`,
          }}
        >
          <img
            src={node.image}
            alt={node.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          {/* Subtle bottom gradient overlay for legibility */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.48) 0%, transparent 55%)',
              pointerEvents: 'none',
            }}
          />
          {/* Studio Monograph Plate Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(10, 12, 18, 0.82)',
              backdropFilter: 'blur(6px)',
              padding: '2px 7px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: '7.5px',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              PLATE // {node.letterSymbol}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main DesignAnatomy Section ───────────────────────────────────────────────
// ─── Curated Artistic Typography Species for "HowVaibhav" ─────────────────────
const ARTISTIC_FONTS = [
  { id: 'cinzel', name: 'Haute Monograph', family: "'Cinzel Decorative', serif", weight: 900, style: 'normal', tracking: '-0.015em' },
  { id: 'syne', name: 'Avant-Garde Studio', family: "'Syne', sans-serif", weight: 900, style: 'normal', tracking: '-0.035em' },
  { id: 'bodoni', name: 'Editorial Didone', family: "'Bodoni Moda', serif", weight: 900, style: 'italic', tracking: '-0.03em' },
  { id: 'unbounded', name: 'Brutalist Cyber', family: "'Unbounded', sans-serif", weight: 900, style: 'normal', tracking: '-0.04em' },
];

export default function DesignAnatomy() {
  const sectionRef    = useRef(null);
  const [isVisible, setIsVisible]       = useState(false);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [mobileIndex, setMobileIndex]   = useState(0);
  const [selectedFont, setSelectedFont] = useState(ARTISTIC_FONTS[0]); // Default: Haute Monograph (Cinzel Decorative)

  // Touch gesture tracking for mobile swipe specimen carousel
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchDeltaX.current = 0;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 35) {
      if (touchDeltaX.current < 0) {
        const nextIdx = (mobileIndex + 1) % ANATOMY_NODES.length;
        setMobileIndex(nextIdx);
        setActiveNodeId(ANATOMY_NODES[nextIdx].id);
        try { soundFX.playSnap(); } catch {}
      } else {
        const prevIdx = (mobileIndex - 1 + ANATOMY_NODES.length) % ANATOMY_NODES.length;
        setMobileIndex(prevIdx);
        setActiveNodeId(ANATOMY_NODES[prevIdx].id);
        try { soundFX.playSnap(); } catch {}
      }
    }
    touchStartX.current = 0;
    touchDeltaX.current = 0;
  };

  const selectNodeByIndex = (idx) => {
    setMobileIndex(idx);
    setActiveNodeId(ANATOMY_NODES[idx].id);
    try { soundFX.playTick(); } catch {}
  };

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
        minHeight: '880px',
        overflow: 'hidden',
        backgroundColor: '#0A0B0E',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        padding: '50px 0 70px',
        color: '#FFFFFF',
      }}
    >
      {/* ─── Ambient Glow Pulses (GPU composite) ─── */}
      <div style={{ position: 'absolute', top: '22%', left: '15%', width: '450px', height: '350px', background: 'radial-gradient(circle, rgba(255,45,120,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '12%', width: '450px', height: '350px', background: 'radial-gradient(circle, rgba(0,170,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '450px', background: 'radial-gradient(circle, rgba(181,159,255,0.08) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />

      {/* ─── SVG CONNECTOR LAYER (Clean Laser Lines Only — NO Dotted Guideline Overlays) ─── */}
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

        {/* ── Dynamic Connecting Laser Paths from Cards to Specific Letter Nodes ── */}
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

      {/* ─── DESKTOP SCATTERED STAGE (Min-Width 960px) ─── */}
      <div
        className="anatomy-desktop-stage"
        style={{
          position: 'relative',
          maxWidth: '1240px',
          minHeight: '860px',
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

        {/* ─── CARD 1: Top Left (H - Hierarchy & Height) ─── */}
        <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[0]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 2: Top Center (B - Baseline & Bold Stems) ─── */}
        <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)' }}>
          <AnatomyCard
            node={ANATOMY_NODES[1]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 3: Top Right (V - Vector Craft & Volume) ─── */}
        <div style={{ position: 'absolute', top: '40px', right: '40px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[2]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CENTRAL HERO TYPOGRAPHY: "HowVaibhav" (Artistic Display Typeface) ─── */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 18,
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Artistic Type Species Switcher Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '999px',
              padding: '3px 4px',
              marginBottom: '14px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <span
              style={{
                fontSize: '8.5px',
                fontFamily: "'Space Grotesk', monospace",
                fontWeight: 800,
                color: '#CCFF00',
                padding: '0 8px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              ✦ TYPE SPECIES:
            </span>
            {ARTISTIC_FONTS.map((f) => {
              const isSelected = selectedFont.id === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    try { soundFX.playSnap(); } catch {}
                    setSelectedFont(f);
                  }}
                  style={{
                    background: isSelected ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                    border: isSelected ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
                    borderRadius: '999px',
                    padding: '3px 10px',
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '9.5px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                  }}
                >
                  {f.name}
                </button>
              );
            })}
          </div>

          {/* Letterform Cluster — Sculptural Artistic Letterforms with Glowing Hover Accents */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              fontFamily: selectedFont.family,
              fontSize: 'clamp(4.4rem, 8.4vw, 7.8rem)',
              fontWeight: selectedFont.weight,
              fontStyle: selectedFont.style,
              lineHeight: 0.9,
              letterSpacing: selectedFont.tracking,
              position: 'relative',
              transition: 'all 0.25s ease',
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

                  {/* Letter Glyph */}
                  <span
                    style={{
                      display: 'inline-block',
                      color: isNodeActive ? item.accent : '#FFFFFF',
                      textShadow: isNodeActive
                        ? `0 0 25px ${item.accent}, 0 0 50px ${item.accent}80`
                        : `0 2px 16px rgba(0,0,0,0.8), 0 0 8px ${item.accent}30`,
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

        {/* ─── CARD 4: Bottom Left (O - Optical Balance & Orbit) ─── */}
        <div style={{ position: 'absolute', bottom: '40px', left: '20px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[3]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 5: Bottom Mid-Left (W - Weight & White Space) ─── */}
        <div style={{ position: 'absolute', bottom: '25px', left: '29%', transform: 'translateX(-50%)' }}>
          <AnatomyCard
            node={ANATOMY_NODES[4]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 6: Bottom Mid-Right (I - Identity & Ink Precision) ─── */}
        <div style={{ position: 'absolute', bottom: '25px', left: '71%', transform: 'translateX(-50%)' }}>
          <AnatomyCard
            node={ANATOMY_NODES[5]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>

        {/* ─── CARD 7: Bottom Right (A - Architecture & Apex) ─── */}
        <div style={{ position: 'absolute', bottom: '40px', right: '20px' }}>
          <AnatomyCard
            node={ANATOMY_NODES[6]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
          />
        </div>
      </div>

      {/* ─── MOBILE RESPONSIVE INTERACTIVE SPECIMEN DECK ─── */}
      <div
        className="anatomy-mobile-grid"
        style={{
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          padding: '0 16px',
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >
        {/* Mobile Header Badge */}
        <div style={{ textAlign: 'center', paddingTop: '6px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(0, 229, 195, 0.12)',
              border: '1px solid rgba(0, 229, 195, 0.4)',
              borderRadius: '999px',
              padding: '4px 14px',
              fontSize: '10px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              color: '#00E5C3',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <span>✦</span>
            <span>Typographic Anatomy</span>
            <span>✦</span>
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.55)',
              fontFamily: "'Space Grotesk', sans-serif",
              marginTop: '5px',
              letterSpacing: '0.02em',
            }}
          >
            Tap any letter or swipe to inspect principles
          </div>
        </div>

        {/* ── Interactive Wordmark Letter Ribbon ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '10px 10px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
            width: '100%',
            maxWidth: '380px',
          }}
        >
          {LETTERS.map((item, idx) => {
            const nodeIndex = ANATOMY_NODES.findIndex((n) => n.id === item.nodeId);
            const isSelected = activeNodeId ? activeNodeId === item.nodeId : mobileIndex === nodeIndex;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => selectNodeByIndex(nodeIndex)}
                style={{
                  background: isSelected ? `${item.accent}25` : 'transparent',
                  border: isSelected ? `1.5px solid ${item.accent}` : '1.5px solid transparent',
                  borderRadius: '8px',
                  padding: '4px 2px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  minWidth: '24px',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isSelected ? 'scale(1.15) translateY(-2px)' : 'none',
                  boxShadow: isSelected ? `0 4px 12px ${item.accent}40` : 'none',
                  position: 'relative',
                }}
              >
                {/* Dot on 'i' pulsing */}
                {item.hasTittle && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: item.accent,
                      boxShadow: `0 0 6px ${item.accent}`,
                      animation: 'pulse 1.8s infinite',
                    }}
                  />
                )}

                <span
                  style={{
                    fontFamily: selectedFont.family,
                    fontSize: '21px',
                    fontWeight: selectedFont.weight,
                    fontStyle: selectedFont.style,
                    lineHeight: 1,
                    color: isSelected ? item.accent : '#FFFFFF',
                    textShadow: isSelected ? `0 0 12px ${item.accent}` : 'none',
                  }}
                >
                  {item.char}
                </span>

                {/* Mini arrow indicator */}
                <span
                  style={{
                    fontSize: '6px',
                    lineHeight: 1,
                    marginTop: '2px',
                    color: item.accent,
                    opacity: isSelected ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  ▲
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Active Specimen Card (Interactive Swipeable Lens — Clean & Text-Free) ── */}
        {(() => {
          const activeNode = ANATOMY_NODES[mobileIndex];
          return (
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                width: '100%',
                maxWidth: '380px',
                background: '#12141A',
                border: `2px solid ${activeNode.color}`,
                borderRadius: '18px',
                padding: '16px 16px 14px',
                boxShadow: `0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px ${activeNode.color}30`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Top ambient color glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: activeNode.color,
                  opacity: 0.15,
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Card Header Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '10px',
                    fontWeight: 900,
                    letterSpacing: '0.12em',
                    color: activeNode.color,
                    background: `${activeNode.color}18`,
                    border: `1px solid ${activeNode.color}45`,
                    borderRadius: '999px',
                    padding: '3px 10px',
                    textTransform: 'uppercase',
                  }}
                >
                  {activeNode.badge}
                </span>

                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '11px',
                    fontWeight: 800,
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  0{mobileIndex + 1} / 07
                </span>
              </div>

              {/* Letter Symbol & Title Grid */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: `${activeNode.color}20`,
                    border: `1.5px solid ${activeNode.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: '26px',
                    fontWeight: 900,
                    color: activeNode.color,
                    boxShadow: `0 4px 16px ${activeNode.color}35`,
                    flexShrink: 0,
                  }}
                >
                  {activeNode.letterSymbol}
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      margin: '0 0 2px',
                      lineHeight: 1.2,
                    }}
                  >
                    {activeNode.title}
                  </h3>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      color: activeNode.color,
                      textTransform: 'uppercase',
                    }}
                  >
                    ✦ {activeNode.principle}
                  </div>
                </div>
              </div>

              {/* Mobile Active Artwork Plate */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  margin: '6px 0 10px',
                  border: `1.5px solid ${activeNode.color}60`,
                  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px ${activeNode.color}25`,
                  background: '#0B0F19',
                }}
              >
                <img
                  src={activeNode.image}
                  alt={activeNode.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 55%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '8px',
                    background: 'rgba(10, 12, 18, 0.85)',
                    backdropFilter: 'blur(6px)',
                    padding: '3px 8px',
                    borderRadius: '5px',
                    border: `1px solid ${activeNode.color}70`,
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '8.5px',
                    fontWeight: 800,
                    color: activeNode.color,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  PLATE 0{mobileIndex + 1} // {activeNode.letterSymbol}
                </div>
              </div>

              {/* Metric Tag & Arrow Prompt */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '10px',
                    fontWeight: 800,
                    color: 'rgba(255, 255, 255, 0.65)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {activeNode.metric}
                </span>

                <span
                  style={{
                    fontSize: '10px',
                    color: activeNode.color,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                  }}
                >
                  SWIPE OR TAP ⇄
                </span>
              </div>
            </div>
          );
        })()}

        {/* ── Carousel Step Indicator Dots & Arrows ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            maxWidth: '380px',
            padding: '2px 0 10px',
          }}
        >
          <button
            type="button"
            onClick={() => {
              const prevIdx = (mobileIndex - 1 + ANATOMY_NODES.length) % ANATOMY_NODES.length;
              selectNodeByIndex(prevIdx);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '11px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>‹</span>
            <span>PREV</span>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {ANATOMY_NODES.map((node, i) => {
              const isActive = mobileIndex === i;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => selectNodeByIndex(i)}
                  aria-label={`Go to specimen ${i + 1}`}
                  style={{
                    width: isActive ? '18px' : '6px',
                    height: '6px',
                    borderRadius: '999px',
                    background: isActive ? node.color : 'rgba(255, 255, 255, 0.25)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isActive ? `0 0 8px ${node.color}` : 'none',
                  }}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              const nextIdx = (mobileIndex + 1) % ANATOMY_NODES.length;
              selectNodeByIndex(nextIdx);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '11px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>NEXT</span>
            <span>›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
