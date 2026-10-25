import React, { useState, useRef } from 'react';
import { soundFX } from './soundFX';

/**
 * INITIAL PINBOARD CARD DATA
 * Static resting positions in a 1100 x 780 coordinate space matching the reference image:
 * - Card 1 (Brand Identity): Top Left, rotated -6.5deg
 * - Card 2 (SM Design): Center, rotated +2.2deg
 * - Card 3 (Marketing Creatives): Top Right, rotated +6.5deg
 * - Card 4 (Brand Systems): Bottom Left, rotated +3.8deg
 * - Card 5 (Content Strategy): Bottom Right, rotated -3.5deg
 */
const INITIAL_CARDS = [
  {
    id: 'card-1',
    title: 'Brand Identity',
    rotation: -6.5,
    x: 180,
    y: 190,
    width: 255,
    height: 355,
    type: 'branding',
  },
  {
    id: 'card-2',
    title: 'SM Design',
    rotation: 2.2,
    x: 540,
    y: 280,
    width: 260,
    height: 360,
    type: 'social',
  },
  {
    id: 'card-3',
    title: 'Marketing Creatives',
    rotation: 6.5,
    x: 885,
    y: 240,
    width: 260,
    height: 365,
    type: 'creatives',
  },
  {
    id: 'card-4',
    title: 'Brand Systems',
    rotation: 3.8,
    x: 295,
    y: 575,
    width: 255,
    height: 355,
    type: 'systems',
  },
  {
    id: 'card-5',
    title: 'Content Strategy',
    rotation: -3.5,
    x: 770,
    y: 590,
    width: 260,
    height: 360,
    type: 'content',
  },
];

// Connection strings linking card pushpins (from -> to, natural curve sag)
const CONNECTIONS = [
  { from: 'card-1', to: 'card-2', sag: -28 }, // arch upwards
  { from: 'card-2', to: 'card-3', sag: -24 }, // arch upwards
  { from: 'card-1', to: 'card-4', sag: 22 },  // natural droop
  { from: 'card-2', to: 'card-4', sag: 32 },  // diagonal cord
  { from: 'card-2', to: 'card-5', sag: 28 },  // diagonal cord
  { from: 'card-3', to: 'card-5', sag: 25 },  // downward cord
];

/**
 * Realistic 3D Glossy Blue Pushpin
 */
function Pushpin() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 35,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 6px 8px rgba(0, 0, 0, 0.35))',
      }}
    >
      {/* 3D Blue Resin Bulb with Specular Reflection */}
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #60A5FA 0%, #1E6BFF 50%, #0F4BC2 100%)',
          border: '1px solid rgba(255, 255, 255, 0.65)',
          position: 'relative',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.4)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: '5px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            filter: 'blur(0.5px)',
          }}
        />
      </div>
      {/* Metallic Tapered Needle Base */}
      <div
        style={{
          width: '5px',
          height: '9px',
          background: 'linear-gradient(to right, #94A3B8, #F1F5F9, #64748B)',
          borderRadius: '0 0 2px 2px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );
}

/**
 * Inner Artwork for each Card (Exact visual replica of the reference image)
 */
function CardInnerArtwork({ type }) {
  if (type === 'branding') {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ background: '#FF6B00', borderRadius: '10px', padding: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: '#FFF' }}>
            <div style={{ width: '12px', height: '12px', background: '#FFF', borderRadius: '2px', transform: 'rotate(45deg)' }} />
            <span style={{ fontSize: '11px', fontWeight: 800 }}>Elevera</span>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: '#1E293B' }}>
            <div style={{ width: '12px', height: '12px', background: '#FF6B00', borderRadius: '2px', transform: 'rotate(45deg)' }} />
            <span style={{ fontSize: '11px', fontWeight: 800 }}>Elevera</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', margin: '8px 0' }}>
          <div style={{ background: '#000', color: '#FFF', borderRadius: '8px', padding: '8px', textAlign: 'center', aspectRatio: '1' }}>
            <div style={{ fontSize: '12px', fontWeight: 900 }}>≡≡</div>
            <div style={{ fontSize: '7px', opacity: 0.8, marginTop: '2px' }}>Elevera</div>
          </div>
          <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px', textAlign: 'center', aspectRatio: '1' }}>
            <div style={{ width: '12px', height: '12px', background: '#FF6B00', borderRadius: '2px', margin: '0 auto' }} />
            <div style={{ fontSize: '7px', color: '#64748B', marginTop: '2px' }}>Elevera</div>
          </div>
          <div style={{ background: '#FF6B00', color: '#FFF', borderRadius: '8px', padding: '8px', textAlign: 'center', aspectRatio: '1' }}>
            <div style={{ fontSize: '12px', fontWeight: 900 }}>✦</div>
            <div style={{ fontSize: '7px', marginTop: '2px' }}>Elevera</div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(90deg, #FFF7ED, #FFFFFF, #FFEDD5)', border: '1px solid #FDBA74', borderRadius: '10px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', background: '#FF6B00', color: '#FFF', borderRadius: '3px', fontSize: '9px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>E</div>
          <span style={{ fontSize: '11px', fontWeight: 900, color: '#1E293B' }}>Elevera</span>
        </div>
      </div>
    );
  }

  if (type === 'social') {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px', background: 'linear-gradient(180deg, #FAF8F5 0%, #FFF5ED 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '6px' }}>
          <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#1E293B' }}>Your Brand Deserves Better</span>
          <span style={{ fontSize: '8px', background: '#FFEDD5', color: '#C2410C', fontWeight: 800, padding: '2px 5px', borderRadius: '4px' }}>POST</span>
        </div>

        <div style={{ margin: 'auto 0', textAlign: 'center', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '10px 8px', position: 'relative', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
          <span style={{ fontSize: '28px', display: 'block' }}>🏛️</span>
          <div style={{ fontSize: '9px', fontWeight: 800, color: '#1E293B', marginTop: '4px' }}>Strategic Visual Hooks</div>
          <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: '#1E293B', color: '#FB923C', fontSize: '7px', fontFamily: 'monospace', padding: '2px 5px', borderRadius: '3px' }}>
            💻 elevera.co
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '8px', padding: '6px 8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '8px', fontWeight: 700, color: '#64748B' }}>Viral Retention</span>
          <span style={{ fontSize: '11px', fontWeight: 900, color: '#EA580C' }}>+340% ↗</span>
        </div>
      </div>
    );
  }

  if (type === 'creatives') {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px', background: 'linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%)' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 900, color: '#0F172A', lineHeight: 1.15 }}>We Build Brands</div>
          <div style={{ fontSize: '10px', fontWeight: 900, color: '#EA580C', textDecoration: 'underline' }}>That Mean Business.</div>
        </div>

        <div style={{ margin: 'auto 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '80px', height: '95px', borderRadius: '999px', background: 'linear-gradient(135deg, #CBD5E1, #94A3B8)', border: '2px solid #FB923C', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(0,0,0,0.15)', position: 'relative' }}>
            <span style={{ fontSize: '38px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🗿</span>
            <div style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', borderRadius: '50%', background: '#F97316', boxShadow: '0 0 8px #F97316' }} />
          </div>
        </div>

        <div style={{ fontSize: '8px', color: '#64748B', textAlign: 'center', fontWeight: 600 }}>
          Performance Billboard &amp; Viral Ads
        </div>
      </div>
    );
  }

  if (type === 'systems') {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC' }}>
        <div style={{ background: '#0F172A', color: '#FFF', padding: '6px 8px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Brand Guidelines</span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F97316' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', margin: '6px 0' }}>
          <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '6px', borderRadius: '6px' }}>
            <div style={{ fontSize: '8px', fontWeight: 800, color: '#0F172A' }}>Color System</div>
            <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1E6BFF' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF6B00' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0F172A' }} />
            </div>
          </div>
          <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '6px', borderRadius: '6px' }}>
            <div style={{ fontSize: '8px', fontWeight: 800, color: '#0F172A' }}>Typography</div>
            <div style={{ fontSize: '7px', color: '#64748B', fontFamily: 'monospace', marginTop: '3px' }}>Aa H1, H2, Body</div>
          </div>
        </div>

        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '5px 8px', borderRadius: '6px', textAlign: 'center', fontSize: '8px', fontWeight: 800 }}>
          ✓ Verified Production Tokens
        </div>
      </div>
    );
  }

  // content
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '4px' }}>
        <span style={{ fontSize: '9px', fontWeight: 900, color: '#0F172A' }}>Content Strategy Hub</span>
        <span style={{ fontSize: '8px', background: '#DBEAFE', color: '#1E40AF', fontWeight: 800, padding: '2px 5px', borderRadius: '999px' }}>Q3 Ready</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '6px 0' }}>
        <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '4px 6px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '8px' }}>
          <span style={{ color: '#334155', fontWeight: 600 }}>Brand Reveal Teaser</span>
          <b style={{ color: '#059669' }}>Approved</b>
        </div>
        <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '4px 6px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '8px' }}>
          <span style={{ color: '#334155', fontWeight: 600 }}>Viral Framework Carousel</span>
          <b style={{ color: '#D97706' }}>In Review</b>
        </div>
        <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '4px 6px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '8px' }}>
          <span style={{ color: '#334155', fontWeight: 600 }}>Founder Letter Issue #14</span>
          <b style={{ color: '#2563EB' }}>Drafting</b>
        </div>
      </div>

      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '4px 8px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '8px', color: '#64748B' }}>Projected Reach</span>
        <span style={{ fontSize: '10px', fontWeight: 900, color: '#1D4ED8' }}>+128K 🚀</span>
      </div>
    </div>
  );
}

/**
 * ServicesCorkboard Component - Clean, zero-lag anti-gravity pinboard
 * Clean solid background with NO grid lines, no clutter buttons.
 */
export default function ServicesCorkboard() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [draggedCardId, setDraggedCardId] = useState(null);

  const containerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, origX: 0, origY: 0 });

  // Update position during drag only (0 background CPU usage)
  const handlePointerDown = (cardId, e) => {
    e.stopPropagation();
    try {
      soundFX.playSnap();
    } catch {}

    setDraggedCardId(cardId);
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      origX: card.x,
      origY: card.y,
    };

    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!draggedCardId) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== draggedCardId) return c;
        return {
          ...c,
          x: dragStartRef.current.origX + deltaX,
          y: dragStartRef.current.origY + deltaY,
        };
      })
    );
  };

  const handlePointerUp = () => {
    if (!draggedCardId) return;
    setDraggedCardId(null);
  };

  // Compute curved SVG thread paths (Quadratic Bezier with natural gravity catenary sag)
  const getThreadPath = (fromId, toId, sagOffset) => {
    const c1 = cards.find((c) => c.id === fromId);
    const c2 = cards.find((c) => c.id === toId);
    if (!c1 || !c2) return '';

    // Pushpin is at top-center of each card
    const p1x = c1.x;
    const p1y = c1.y - c1.height / 2;

    const p2x = c2.x;
    const p2y = c2.y - c2.height / 2;

    const midX = (p1x + p2x) / 2;
    const midY = (p1y + p2y) / 2 + sagOffset;

    return `M ${p1x.toFixed(1)},${p1y.toFixed(1)} Q ${midX.toFixed(1)},${midY.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}`;
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        padding: '80px 0 70px',
        overflow: 'hidden',
        // Clean solid warm parchment background — explicitly NO grid lines
        backgroundColor: '#F8F6F0',
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.045) 1px, transparent 1px)
        `,
        backgroundSize: '36px 36px',
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        borderTop: '1px dashed rgba(0, 0, 0, 0.12)',
        zIndex: 5,
      }}
    >
      {/* ─── Embedded Hardware-Accelerated CSS Keyframes (Zero-Lag translate3d) ─── */}
      <style>{`
        @keyframes boardFloat1 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-6.5deg); }
          50% { transform: translate3d(0, -12px, 0) rotate(-5.5deg); }
        }
        @keyframes boardFloat2 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(2.2deg); }
          50% { transform: translate3d(0, 14px, 0) rotate(3.2deg); }
        }
        @keyframes boardFloat3 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(6.5deg); }
          50% { transform: translate3d(0, -14px, 0) rotate(5.4deg); }
        }
        @keyframes boardFloat4 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(3.8deg); }
          50% { transform: translate3d(0, -11px, 0) rotate(4.6deg); }
        }
        @keyframes boardFloat5 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-3.5deg); }
          50% { transform: translate3d(0, 13px, 0) rotate(-2.4deg); }
        }

        .card-anim-card-1 { animation: boardFloat1 5.4s cubic-bezier(0.45, 0, 0.55, 1) infinite; will-change: transform; }
        .card-anim-card-2 { animation: boardFloat2 6.8s cubic-bezier(0.45, 0, 0.55, 1) infinite 0.8s; will-change: transform; }
        .card-anim-card-3 { animation: boardFloat3 4.8s cubic-bezier(0.45, 0, 0.55, 1) infinite 1.4s; will-change: transform; }
        .card-anim-card-4 { animation: boardFloat4 5.9s cubic-bezier(0.45, 0, 0.55, 1) infinite 0.4s; will-change: transform; }
        .card-anim-card-5 { animation: boardFloat5 6.2s cubic-bezier(0.45, 0, 0.55, 1) infinite 1.1s; will-change: transform; }

        .corkboard-card:hover {
          z-index: 45 !important;
          box-shadow: 0 28px 60px -15px rgba(30, 107, 255, 0.5), 0 12px 24px -8px rgba(0,0,0,0.2) !important;
        }
      `}</style>

      {/* ─── Decorative SVG Doodles from Reference Image ─── */}
      {/* Top-Left Sketchy Music Notes */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: 'max(16px, 6%)',
          width: '74px',
          height: '74px',
          pointerEvents: 'none',
          opacity: 0.65,
          transform: 'rotate(-12deg)',
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 100 100" fill="#1E293B" style={{ width: '100%', height: '100%' }}>
          <path d="M28,68 C23,68 18,72 18,77 C18,82 23,86 28,86 C34,86 38,81 38,76 L38,34 L68,26 L68,66 C63,66 58,70 58,75 C58,80 63,84 68,84 C74,84 78,79 78,74 L78,16 C78,14 76,12 73,13 L33,23 C30,24 28,26 28,29 L28,68 Z" />
          <path d="M12,65 Q16,63 20,66" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Mid-Left Hand-Drawn Blue Lightning Bolt */}
      <div
        style={{
          position: 'absolute',
          top: '44%',
          left: 'max(12px, 4%)',
          width: '84px',
          height: '130px',
          pointerEvents: 'none',
          opacity: 0.75,
          transform: 'rotate(-6deg)',
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 100 150" fill="none" style={{ width: '100%', height: '100%' }}>
          <path
            d="M58,6 L22,70 L52,70 L34,142 L82,66 L52,66 L74,6 Z"
            fill="rgba(30, 107, 255, 0.18)"
            stroke="#1E6BFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path d="M14,64 L6,60 M78,110 L88,118" stroke="#1E6BFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bottom-Left Lithograph Mountain Peak */}
      <div
        style={{
          position: 'absolute',
          bottom: '-12px',
          left: '-10px',
          width: '210px',
          height: '210px',
          pointerEvents: 'none',
          opacity: 0.22,
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" style={{ width: '100%', height: '100%', color: '#1E293B' }}>
          <path d="M10,190 L95,60 L130,115 L155,80 L200,190 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M10,190 L95,60 L130,115 L155,80 L200,190" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M95,60 Q85,110 50,190 M95,60 Q110,105 130,115 M155,80 Q165,130 180,190" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </div>

      {/* Bottom-Right Classical Statue Hand Pointing Upward */}
      <div
        style={{
          position: 'absolute',
          bottom: '-14px',
          right: 'max(20px, 8%)',
          width: '180px',
          height: '230px',
          pointerEvents: 'none',
          opacity: 0.75,
          transform: 'rotate(-10deg)',
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 200 260" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="corkMarbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <g filter="drop-shadow(0 6px 10px rgba(0,0,0,0.25))">
            <path d="M70,260 C75,220 70,185 85,160 C90,150 95,145 105,145 C115,145 125,160 130,180 C135,205 140,230 145,260 Z" fill="url(#corkMarbleGrad)" stroke="#1E293B" strokeWidth="2.5" />
            <path d="M100,145 L102,60 C102,48 116,48 118,60 L120,145 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />
            <path d="M103,80 C108,82 113,82 117,80 M102,108 C108,111 114,111 118,108" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M120,135 C132,130 140,140 135,155 C130,165 122,168 115,165" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* Top-Right Bold Ink Ribbon Stroke */}
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: '240px',
          height: '240px',
          pointerEvents: 'none',
          opacity: 0.15,
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 300 300" fill="none" style={{ width: '100%', height: '100%', color: '#0F172A' }}>
          <path d="M50,10 C140,-10 240,60 270,140 C300,220 220,290 130,280 C60,270 40,210 70,160 C90,130 140,120 180,140" stroke="currentColor" strokeWidth="32" strokeLinecap="round" />
        </svg>
      </div>

      {/* ─── Section Header (Exact Reference Typography) ─── */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 16px', marginBottom: '28px' }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 900,
            color: '#121316',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          What I{' '}
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: 700,
              fontSize: '1.25em',
              color: '#1E6BFF',
              display: 'inline-block',
              transform: 'rotate(-4deg)',
              margin: '0 6px',
            }}
          >
            Can
          </span>
          <br />
          <span>Help with:</span>
        </h2>

        {/* Playful curved underline */}
        <svg viewBox="0 0 240 14" fill="none" style={{ width: '180px', height: '12px', margin: '6px auto 0', color: 'rgba(30, 107, 255, 0.45)' }}>
          <path d="M4,10 Q120,2 236,8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* ─── Main Pinboard Canvas (1100 x 780 Virtual Coordinate Space) ─── */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          position: 'relative',
          maxWidth: '1120px',
          height: '790px',
          margin: '0 auto',
          touchAction: 'none',
        }}
      >
        {/* ─── Pure Vector SVG Connecting Strings Layer (GPU Rendered, 0% CPU Overhead) ─── */}
        <svg
          viewBox="0 0 1100 780"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 15,
            overflow: 'visible',
          }}
          aria-hidden="true"
        >
          <defs>
            <filter id="corkThreadShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.25" />
            </filter>
          </defs>

          {CONNECTIONS.map((conn, idx) => (
            <path
              key={idx}
              d={getThreadPath(conn.from, conn.to, conn.sag)}
              stroke="#1A1D20"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              filter="url(#corkThreadShadow)"
            />
          ))}
        </svg>

        {/* ─── The 5 Floating Blue Cards ─── */}
        {cards.map((card) => {
          const isBeingDragged = draggedCardId === card.id;

          return (
            <div
              key={card.id}
              onPointerDown={(e) => handlePointerDown(card.id, e)}
              className={`corkboard-card ${!isBeingDragged ? `card-anim-${card.id}` : ''}`}
              style={{
                position: 'absolute',
                left: `${card.x - card.width / 2}px`,
                top: `${card.y - card.height / 2}px`,
                width: `${card.width}px`,
                height: `${card.height}px`,
                transform: `rotate(${card.rotation}deg) scale(${isBeingDragged ? 1.05 : 1})`,
                zIndex: isBeingDragged ? 50 : 20,
                cursor: isBeingDragged ? 'grabbing' : 'grab',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                transition: isBeingDragged ? 'none' : 'box-shadow 0.2s ease, transform 0.15s ease-out',
              }}
            >
              {/* Blue Card Shell with Heavy Rounded Corners */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  background: '#1E6BFF',
                  borderRadius: '26px',
                  padding: '12px 12px 14px',
                  boxShadow: '0 20px 40px -15px rgba(30, 107, 255, 0.45), 0 10px 20px -8px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* 3D Blue Pushpin pinned at top-center */}
                <Pushpin />

                {/* Inner Image Area Display */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 5',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <CardInnerArtwork type={card.type} />
                </div>

                {/* Bold White Title at Bottom */}
                <h3
                  style={{
                    textAlign: 'center',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: '17px',
                    color: '#FFFFFF',
                    margin: '6px 0 0',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {card.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
