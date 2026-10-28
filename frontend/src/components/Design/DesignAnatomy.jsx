import React, { useRef, useState, useEffect } from 'react';
import { soundFX } from './soundFX';
import {
  Doodle_NeonLightningBolt,
  Doodle_VectorPenNib,
  Doodle_FibonacciGoldenSpiral,
  Doodle_SwissReticleCropMark,
  Doodle_SacredYantraMandala,
  Doodle_PrismRefractionFan,
  Doodle_ModernistStarCluster,
  Doodle_ChromaticEyedropper,
  Doodle_HarmonicSineWave,
} from './DesignArtisticDoodles';

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
    originPoint: { x: 150, y: 202 },
    anchorPoint: { x: 305, y: 410 },
    pathD: 'M 150,202 C 150,305 305,305 305,410',
    flowSpeed: '4.2s',
  },
  {
    id: 'node-v',
    targetLetters: ['V', 'v'],
    letterIndex: [3, 9],
    letterSymbol: 'V',
    badge: '02 // V · VECTOR',
    title: 'Vector Craft & Volume',
    principle: 'Infinite Scalability & Rigor',
    metric: 'VERTEX: 42.4° APEX',
    image: '/assets/text_image/artwork-v.jpg',
    color: '#9E7BFF',      // Vibrant Deep Violet
    textColor: '#FFFFFF',
    accentColor: '#C9B5FF',
    rotation: '2.5deg',
    floatDuration: '6.4s',
    floatDelay: '-1.6s',
    floatY: '-10px',
    decorator: 'ring',
    originPoint: { x: 585, y: 198 },
    anchorPoint: { x: 520, y: 410 },
    pathD: 'M 585,198 C 585,305 520,305 520,410',
    flowSpeed: '4.8s',
  },
  {
    id: 'node-b',
    targetLetters: ['b'],
    letterIndex: [6],
    letterSymbol: 'B',
    badge: '03 // B · BASELINE',
    title: 'Baseline & Bold Stems',
    principle: 'Structural Stem Power',
    metric: 'ASC_HT: +240 EM',
    image: '/assets/text_image/artwork-b.jpg',
    color: '#C2E03A',      // Vibrant Lime Green
    textColor: '#0B0F19',
    accentColor: '#8AAA00',
    rotation: '2deg',
    floatDuration: '7.1s',
    floatDelay: '-3.2s',
    floatY: '-14px',
    decorator: 'circle',
    originPoint: { x: 1045, y: 202 },
    anchorPoint: { x: 695, y: 410 },
    pathD: 'M 1045,202 C 1045,305 695,305 695,410',
    flowSpeed: '5.1s',
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
    color: '#FF5500',      // Vivid Flame Tangerine Orange (Distinct from Yellow W)
    textColor: '#FFFFFF',
    accentColor: '#FFAA77',
    rotation: '-2.5deg',
    floatDuration: '5.8s',
    floatDelay: '-4.4s',
    floatY: '-11px',
    decorator: 'swirl',
    originPoint: { x: 140, y: 645 },
    anchorPoint: { x: 390, y: 485 },
    pathD: 'M 140,645 C 140,555 390,575 390,485',
    flowSpeed: '4.4s',
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
    color: '#FFDE00',      // Brilliant Cyber Canary Solar Gold (Distinct from Orange O)
    textColor: '#0B0F19',
    accentColor: '#B29B00',
    rotation: '2.5deg',
    floatDuration: '6.1s',
    floatDelay: '-2.5s',
    floatY: '-10px',
    decorator: 'cross',
    originPoint: { x: 350, y: 655 },
    anchorPoint: { x: 460, y: 485 },
    pathD: 'M 350,655 C 350,560 460,570 460,485',
    flowSpeed: '4.6s',
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
    originPoint: { x: 835, y: 655 },
    anchorPoint: { x: 640, y: 485 },
    pathD: 'M 835,655 C 835,560 640,570 640,485',
    flowSpeed: '4.9s',
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
    originPoint: { x: 1050, y: 645 },
    anchorPoint: { x: 805, y: 485 },
    pathD: 'M 1050,645 C 1050,555 805,575 805,485',
    flowSpeed: '5.3s',
  },
];

// ─── Direct Letter Mapping for "HowVaibhav" ──────────────────────────────────
const LETTERS = [
  { char: 'H', nodeId: 'node-h', accent: '#FF2D78' },
  { char: 'o', nodeId: 'node-o', accent: '#FF5500' },
  { char: 'w', nodeId: 'node-w', accent: '#FFDE00' },
  { char: 'V', nodeId: 'node-v', accent: '#9E7BFF' },
  { char: 'a', nodeId: 'node-a', accent: '#00E5C3' },
  { char: 'i', nodeId: 'node-i', accent: '#00AAFF', hasTittle: true },
  { char: 'b', nodeId: 'node-b', accent: '#C2E03A' },
  { char: 'h', nodeId: 'node-h', accent: '#FF2D78' },
  { char: 'a', nodeId: 'node-a', accent: '#00E5C3' },
  { char: 'v', nodeId: 'node-v', accent: '#9E7BFF' },
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
function AnatomyCard({ node, activeNodeId, onSelect, onHover, onLeave, onOpenLightbox }) {
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

        {/* Card Main Heading */}
        <h3
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: '17px',
            lineHeight: 1.25,
            margin: '0 0 10px',
            letterSpacing: '-0.02em',
            paddingRight: '16px',
          }}
        >
          {node.title}
        </h3>

        {/* Visual Artwork Showcase Plate - 16:9 Uncropped Original Aspect Ratio */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenLightbox) onOpenLightbox(node);
          }}
          title="Click to inspect full uncropped artwork"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '11px',
            overflow: 'hidden',
            background: '#07090E',
            boxShadow: isHovered
              ? '0 12px 28px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.35)'
              : '0 8px 20px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
            border: `1.5px solid ${node.textColor === '#FFFFFF' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.25)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-in',
            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          }}
        >
          <img
            src={node.image}
            alt={node.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              transform: isHovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>
    </>
  );
}

// ─── Main DesignAnatomy Section ───────────────────────────────────────────────
// ─── Editorial Didone Typography for "HowVaibhav" ──────────────────────────────
const HERO_FONT = {
  family: "'Bodoni Moda', Georgia, serif",
  weight: 900,
  style: 'italic',
  tracking: '-0.03em',
};

export default function DesignAnatomy() {
  const sectionRef    = useRef(null);
  const [isVisible, setIsVisible]       = useState(false);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [mobileIndex, setMobileIndex]   = useState(0);
  const [lightboxNode, setLightboxNode] = useState(null); // Fullscreen uncropped HD modal

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
    try { soundFX.playSnap(); } catch {}
  };

  // Escape key listener to dismiss lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxNode) {
        setLightboxNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxNode]);

  // Proactively unlock Web Audio context on mount
  useEffect(() => {
    try {
      soundFX.init();
      soundFX.unlock();
    } catch {}
  }, []);

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
      onPointerDown={() => {
        try { soundFX.unlock(); } catch {}
      }}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '880px',
        overflow: 'hidden',
        background: 'transparent',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        padding: '50px 0 70px',
        color: '#FFFFFF',
      }}
    >
      {/* ─── Ambient Glow Pulses (GPU composite) ─── */}
      <div style={{ position: 'absolute', top: '22%', left: '15%', width: '450px', height: '350px', background: 'radial-gradient(circle, rgba(255,45,120,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '12%', width: '450px', height: '350px', background: 'radial-gradient(circle, rgba(0,170,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '450px', background: 'radial-gradient(circle, rgba(181,159,255,0.08) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />

      {/* ─── SVG CONNECTOR LAYER (Curved Architectural Laser Pathways — Zero Overlap) ─── */}
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
          <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Dynamic Connecting Curved Laser Paths from Cards to Specific Letter Nodes ── */}
        {ANATOMY_NODES.map((node) => {
          const isTargeted = activeNodeId === node.id;
          const strokeWidth = isTargeted ? 3.2 : 1.7;
          const strokeOpacity = isTargeted ? 1 : activeNodeId ? 0.2 : 0.72;

          return (
            <g key={node.id}>
              {/* Outer Ambient Glow Halo */}
              <path
                d={node.pathD}
                stroke={node.color}
                strokeWidth={isTargeted ? 8 : 4.5}
                fill="none"
                strokeLinecap="round"
                opacity={isTargeted ? 0.45 : strokeOpacity * 0.28}
                filter="url(#neonPathGlow)"
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: isVisible ? 0 : 1000,
                  transition: 'stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.5, 1), stroke-width 0.25s ease, opacity 0.25s ease',
                }}
              />

              {/* Core Crisp Laser Filament */}
              <path
                d={node.pathD}
                stroke={node.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                opacity={strokeOpacity}
                filter="url(#neonPathGlow)"
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: isVisible ? 0 : 1000,
                  transition: 'stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.5, 1), stroke-width 0.25s ease, opacity 0.25s ease',
                }}
              />

              {/* Animated Glowing Light Photon Packet Travelling Along the Curve */}
              {isVisible && (
                <circle r={isTargeted ? 3.5 : 2.5} fill="#FFFFFF" filter="url(#pulseGlow)" opacity={isTargeted ? 1 : 0.85}>
                  <animateMotion
                    path={node.pathD}
                    dur={node.flowSpeed || '4.5s'}
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Origin Connection Pin Dot at Card Anchor */}
              {isVisible && node.originPoint && (
                <circle
                  cx={node.originPoint.x}
                  cy={node.originPoint.y}
                  r={isTargeted ? 4.5 : 3}
                  fill={node.color}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  opacity={strokeOpacity}
                />
              )}

              {/* Target Terminal Halo & Bullseye Anchor on the Letter */}
              {isVisible && (
                <g>
                  {/* Expanding Breathing Pulse Ring */}
                  <circle
                    cx={node.anchorPoint.x}
                    cy={node.anchorPoint.y}
                    r={isTargeted ? 8 : 5}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    opacity={isTargeted ? 0.9 : 0.5}
                  >
                    <animate
                      attributeName="r"
                      values={isTargeted ? '6;14;6' : '4;9;4'}
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values={isTargeted ? '0.9;0.1;0.9' : '0.6;0;0.6'}
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Core Target Center Dot */}
                  <circle
                    cx={node.anchorPoint.x}
                    cy={node.anchorPoint.y}
                    r={isTargeted ? 5.5 : 3.5}
                    fill={node.color}
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    filter="url(#neonPathGlow)"
                    style={{ transition: 'r 0.2s ease' }}
                  />
                </g>
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
          zIndex: 20,
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

          @keyframes doodleFloatSlow {
            0%, 100% { transform: translateY(0px) rotate(var(--doodle-rot, 0deg)); }
            50%      { transform: translateY(-7px) rotate(calc(var(--doodle-rot, 0deg) + 2deg)); }
          }
          @keyframes doodlePulseSoft {
            0%, 100% { opacity: 0.78; }
            50%      { opacity: 1; }
          }

          .artistic-ambient-doodle {
            animation: doodleFloatSlow 6s ease-in-out infinite, doodlePulseSoft 4s ease-in-out infinite;
            will-change: transform, opacity;
          }
          @media (max-width: 1200px) {
            .hero-perimeter-flank {
              display: none !important;
            }
          }
          @media (max-width: 959px) {
            .hero-perimeter-framing {
              display: none !important;
            }
          }
        `}</style>

        {/* ─── CARD 1: Top Left (H - Hierarchy & Height) ─── */}
        <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 25 }}>
          <AnatomyCard
            node={ANATOMY_NODES[0]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
            onOpenLightbox={setLightboxNode}
          />
        </div>

        {/* ─── CARD 2: Top Center (V - Vector Craft & Volume) ─── */}
        <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 25 }}>
          <AnatomyCard
            node={ANATOMY_NODES[1]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
            onOpenLightbox={setLightboxNode}
          />
        </div>

        {/* ─── CARD 3: Top Right (B - Baseline & Bold Stems) ─── */}
        <div style={{ position: 'absolute', top: '40px', right: '40px', zIndex: 25 }}>
          <AnatomyCard
            node={ANATOMY_NODES[2]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
            onOpenLightbox={setLightboxNode}
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


          {/* Letterform Cluster — Sculptural Editorial Didone Letterforms with Glowing Hover Accents */}
          <h1
            aria-label="HowVaibhav — Graphic Design, Brand Architecture & Creative Archive"
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              fontFamily: HERO_FONT.family,
              fontSize: 'clamp(4.6rem, 8.6vw, 8.2rem)',
              fontWeight: HERO_FONT.weight,
              fontStyle: HERO_FONT.style,
              lineHeight: 0.9,
              letterSpacing: HERO_FONT.tracking,
              position: 'relative',
              transition: 'all 0.25s ease',
              margin: 0,
              padding: 0,
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
                  onPointerDown={() => {
                    try { soundFX.playSnap(); } catch {}
                    setActiveNodeId(item.nodeId);
                  }}
                  onClick={() => {
                    try { soundFX.playSnap(); } catch {}
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
          </h1>
        </div>

        {/* ─── CARD 4: Bottom Left (O - Optical Balance & Orbit) ─── */}
        <div style={{ position: 'absolute', bottom: '40px', left: '20px', zIndex: 25 }}>
          <AnatomyCard
            node={ANATOMY_NODES[3]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
            onOpenLightbox={setLightboxNode}
          />
        </div>

        {/* ─── CARD 5: Bottom Mid-Left (W - Weight & White Space) ─── */}
        <div style={{ position: 'absolute', bottom: '25px', left: '29%', transform: 'translateX(-50%)', zIndex: 25 }}>
          <AnatomyCard
            node={ANATOMY_NODES[4]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
            onOpenLightbox={setLightboxNode}
          />
        </div>

        {/* ─── CARD 6: Bottom Mid-Right (I - Identity & Ink Precision) ─── */}
        <div style={{ position: 'absolute', bottom: '25px', left: '71%', transform: 'translateX(-50%)', zIndex: 25 }}>
          <AnatomyCard
            node={ANATOMY_NODES[5]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
            onOpenLightbox={setLightboxNode}
          />
        </div>

        {/* ─── CARD 7: Bottom Right (A - Architecture & Apex) ─── */}
        <div style={{ position: 'absolute', bottom: '40px', right: '20px', zIndex: 25 }}>
          <AnatomyCard
            node={ANATOMY_NODES[6]}
            activeNodeId={activeNodeId}
            onSelect={setActiveNodeId}
            onHover={setActiveNodeId}
            onLeave={() => setActiveNodeId(null)}
            onOpenLightbox={setLightboxNode}
          />
        </div>

      </div>

      {/* ─── OUTER PERIMETER ARTISTIC FRAMING (Clean Hero Borders, Zero Center Clutter) ─── */}
      <div
        className="hero-perimeter-framing"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 14,
        }}
      >
        {/* 1. Neon Electric Lightning Bolt (Top-Left Outer Margin) */}
        <div
          className="artistic-ambient-doodle"
          style={{
            position: 'absolute',
            top: '28px',
            left: 'clamp(20px, 3.2vw, 55px)',
            pointerEvents: 'auto',
            '--doodle-rot': '-8deg',
            animationDelay: '0s',
          }}
          title="Vector High-Velocity Voltage"
        >
          <Doodle_NeonLightningBolt
            color="#1E6BFF"
            width={76}
            height={115}
            rotation={-8}
          />
        </div>

        {/* 2. Modernist Star Cluster (Top-Right Outer Margin) */}
        <div
          className="artistic-ambient-doodle"
          style={{
            position: 'absolute',
            top: '28px',
            right: 'clamp(20px, 3.2vw, 55px)',
            pointerEvents: 'auto',
            '--doodle-rot': '12deg',
            animationDelay: '-2.8s',
          }}
          title="Harmonic Star Constellation"
        >
          <Doodle_ModernistStarCluster
            color="#CCFF00"
            size={56}
            rotation={12}
          />
        </div>

        {/* 3. Swiss Modernist Reticle & Crop Mark (Upper Ruler Border Accent) */}
        <div
          className="artistic-ambient-doodle hero-perimeter-flank"
          style={{
            position: 'absolute',
            top: '20px',
            left: 'clamp(140px, 16vw, 280px)',
            pointerEvents: 'auto',
            '--doodle-rot': '0deg',
            animationDelay: '-0.8s',
          }}
          title="Precision Swiss Reticle Calibration"
        >
          <Doodle_SwissReticleCropMark
            color="#00E5C3"
            size={64}
            rotation={0}
          />
        </div>

        {/* 4. Fibonacci Golden Spiral Arc (Screen Left Flank — Mid-Height Outer Border) */}
        <div
          className="artistic-ambient-doodle hero-perimeter-flank"
          style={{
            position: 'absolute',
            top: '50%',
            left: 'clamp(14px, 2.4vw, 42px)',
            transform: 'translateY(-50%)',
            pointerEvents: 'auto',
            '--doodle-rot': '-5deg',
            animationDelay: '-3.2s',
          }}
          title="Fibonacci 1.618 Golden Ratio Spiral"
        >
          <Doodle_FibonacciGoldenSpiral
            color="#F59E0B"
            size={125}
            rotation={-5}
          />
        </div>

        {/* 5. Optical Prism & Chromatic Refraction Fan (Screen Right Flank — Mid-Height Outer Border) */}
        <div
          className="artistic-ambient-doodle hero-perimeter-flank"
          style={{
            position: 'absolute',
            top: '50%',
            right: 'clamp(14px, 2.4vw, 42px)',
            transform: 'translateY(-50%)',
            pointerEvents: 'auto',
            '--doodle-rot': '6deg',
            animationDelay: '-4.2s',
          }}
          title="Chromatic Spectral Refraction Fan"
        >
          <Doodle_PrismRefractionFan
            width={130}
            height={85}
            rotation={6}
          />
        </div>

        {/* 6. Vector Pen Nib with Bezier Spline (Bottom-Left Outer Margin) */}
        <div
          className="artistic-ambient-doodle"
          style={{
            position: 'absolute',
            bottom: '26px',
            left: 'clamp(20px, 3.2vw, 55px)',
            pointerEvents: 'auto',
            '--doodle-rot': '-12deg',
            animationDelay: '-1.5s',
          }}
          title="Mathematical Bezier Vector Pen"
        >
          <Doodle_VectorPenNib
            color="#00D2FF"
            accentColor="#9E7BFF"
            width={106}
            height={88}
            rotation={-12}
          />
        </div>

        {/* 7. Sacred Yantra Mandala Geometric Matrix (Bottom-Right Outer Margin) */}
        <div
          className="artistic-ambient-doodle"
          style={{
            position: 'absolute',
            bottom: '26px',
            right: 'clamp(20px, 3.2vw, 55px)',
            pointerEvents: 'auto',
            '--doodle-rot': '0deg',
            animationDelay: '-3.7s',
          }}
          title="Sacred Sacred Matrix & Harmony Yantra"
        >
          <Doodle_SacredYantraMandala
            color="#FFB800"
            size={88}
            rotation={0}
          />
        </div>

        {/* 8. Chromatic Eyedropper & Color Well (Lower Ruler Border Accent) */}
        <div
          className="artistic-ambient-doodle hero-perimeter-flank"
          style={{
            position: 'absolute',
            bottom: '20px',
            right: 'clamp(140px, 16vw, 280px)',
            pointerEvents: 'auto',
            '--doodle-rot': '-14deg',
            animationDelay: '-2.1s',
          }}
          title="Ink & Gamut Color Pigment Eyedropper"
        >
          <Doodle_ChromaticEyedropper
            color="#FF2D78"
            width={74}
            height={74}
            rotation={-14}
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
        {/* Mobile Header Badge with Flanking Neon Doodles */}
        <div style={{ textAlign: 'center', paddingTop: '6px', position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Subtle Mobile Top-Left Mini Lightning Bolt */}
          <div style={{ position: 'absolute', left: '8px', top: '2px', opacity: 0.85 }}>
            <Doodle_NeonLightningBolt color="#1E6BFF" width={32} height={48} rotation={-10} interactive={false} />
          </div>
          {/* Subtle Mobile Top-Right Mini Star */}
          <div style={{ position: 'absolute', right: '8px', top: '6px', opacity: 0.85 }}>
            <Doodle_ModernistStarCluster color="#CCFF00" size={32} rotation={15} interactive={false} />
          </div>
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
                    fontFamily: HERO_FONT.family,
                    fontSize: '22px',
                    fontWeight: HERO_FONT.weight,
                    fontStyle: HERO_FONT.style,
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

              {/* Mobile Letter Symbol & Main Heading Grid (Only Main Heading) */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: `${activeNode.color}20`,
                      border: `1.5px solid ${activeNode.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: '24px',
                      fontWeight: 900,
                      color: activeNode.color,
                      boxShadow: `0 4px 16px ${activeNode.color}35`,
                      flexShrink: 0,
                    }}
                  >
                    {activeNode.letterSymbol}
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: '20px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {activeNode.title}
                  </h3>
                </div>

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

              {/* Mobile Active Artwork Plate - 16:9 Uncropped Original Aspect Ratio */}
              <div
                onClick={() => setLightboxNode(activeNode)}
                title="Tap to view full uncropped artwork"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  margin: '4px 0 10px',
                  border: `1.5px solid ${activeNode.color}75`,
                  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px ${activeNode.color}25`,
                  background: '#07090E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'zoom-in',
                }}
              >
                <img
                  src={activeNode.image}
                  alt={activeNode.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>

              {/* Clean Navigation Prompt */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    color: activeNode.color,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    letterSpacing: '0.08em',
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

      {/* ── High-Fidelity 16:9 Uncropped Artwork Lightbox Modal ── */}
      {lightboxNode && (
        <div
          onClick={() => setLightboxNode(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(5, 7, 11, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1040px',
              backgroundColor: '#090C13',
              borderRadius: '20px',
              border: `2px solid ${lightboxNode.color}`,
              boxShadow: `0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px ${lightboxNode.color}35`,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 22px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '12px',
                    fontWeight: 900,
                    color: lightboxNode.color,
                    background: `${lightboxNode.color}20`,
                    border: `1.5px solid ${lightboxNode.color}60`,
                    padding: '4px 12px',
                    borderRadius: '6px',
                    letterSpacing: '0.08em',
                  }}
                >
                  LETTER [{lightboxNode.letterSymbol}]
                </span>
                <h4
                  style={{
                    margin: 0,
                    fontFamily: "'Fraunces', serif",
                    fontStyle: 'italic',
                    fontSize: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  {lightboxNode.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setLightboxNode(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
              >
                <span>CLOSE</span>
                <span style={{ fontSize: '13px' }}>✕</span>
              </button>
            </div>

            {/* Pristine 16:9 Uncropped Artwork Display */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                background: '#040609',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={lightboxNode.image}
                alt={lightboxNode.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Modal Footer Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 22px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(0, 0, 0, 0.35)',
                fontSize: '11px',
                fontFamily: "'Space Grotesk', monospace",
                color: 'rgba(255, 255, 255, 0.65)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: lightboxNode.color }}>●</span>
                <span>ORIGINAL ASPECT RATIO · 16:9 NATIVE WIDESCREEN · 0% CROPPING</span>
              </div>
              <div style={{ opacity: 0.75, fontSize: '10px' }}>PRESS ESC OR CLICK OUTSIDE TO CLOSE</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
