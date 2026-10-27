import React, { useRef, useState, useEffect, useCallback } from 'react';
import { soundFX } from './soundFX';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * सृजन विन्यास // THE DADAIST KINETIC SYNTHESIS — MOVABLE MIXED-MEDIA POSTER
 * ─────────────────────────────────────────────────────────────────────────────
 * Theme: "Duality of Ancient Soul & Digital Brutalism"
 *  - 20 bespoke tactile artifacts fly in from the extreme screen edges on scroll:
 *      * 35mm Giclée film plates (artwork-a.jpg) with Kodak sprocket holes
 *      * Secondary deckle photo cutout (artwork-v.jpg) & brass telescope aperture (artwork-o.jpg)
 *      * Washi tape, industrial masking tape, chrome safety pin
 *      * Didone editorial typography ("CHAOS INTO SYSTEM"), newsprint banners
 *      * Pop-art halftone rosette screen, golden ratio arcs (φ = 1.618)
 *      * EAN-13 barcode, CMYK litho density bar, gold Devanagari seal ("सृजन")
 *      * Stencil graffiti ("PURE SOUL"), red marker script ("Form follows soul.")
 *      * 3D embossed crimson wax seal stamp & museum colophon
 *  - ONCE ASSEMBLED (>=85% or 100%): ALL 20 ELEMENTS ARE FREELY MOVABLE / DRAGGABLE!
 *    The user can click, drag, pick up, reposition, and remix the physical collage!
 *  - "RESET COLLAGE" button instantly docks elements back to their masterwork coordinates.
 *  - Light beam shimmer sweep & aperture haptics on 100% completion.
 */

// 6 Core Creation Phases
const PHASES = [
  { id: 1, range: [0, 0.14], name: 'ENTROPIC VOID', desc: 'Awaiting gravitational compression across 20 coordinates' },
  { id: 2, range: [0.14, 0.34], name: 'STRUCTURAL BLUEPRINT', desc: 'Precision 0.75px crop marks & golden ratio curvature' },
  { id: 3, range: [0.34, 0.54], name: 'PHOTOGRAPHIC PLATES', desc: '35mm Giclée film negatives & pop-art halftone screens' },
  { id: 4, range: [0.54, 0.72], name: 'EDITORIAL TYPOGRAPHY', desc: 'Didone serifs, newsprint banners & sacred Devanagari' },
  { id: 5, range: [0.72, 0.88], name: 'TACTILE MOUNTING', desc: 'Fluorescent washi tapes, chrome safety pin & barcodes' },
  { id: 6, range: [0.88, 1.0], name: 'SYNTHESIS & SANDBOX', desc: 'Wax seal stamped — ALL 20 ELEMENTS UNLOCKED TO DRAG & REMIX! ✦' },
];

// 20 Distinct Mixed-Media Artifacts Definition
const SHARDS = [
  {
    id: 1,
    name: 'Hero Photographic Film Plate',
    material: 'Giclée Film Negative // 35mm Kodak Portra',
    category: 'Core Artwork',
    color: '#00D2FF',
    w: 320,
    h: 195,
    zIndex: 10,
    startP: 0.16,
    endP: 0.48,
    target: { x: 0, y: -80, rotate: -1.2, scale: 1 },
    relOffset: { x: -0.05, y: -1.3, rot: -40 },
  },
  {
    id: 2,
    name: 'Vintage Newsprint Header Banner',
    material: 'Aged Newsprint // Swiss Grotesque',
    category: 'Typography',
    color: '#CCFF00',
    w: 380,
    h: 36,
    zIndex: 16,
    startP: 0.44,
    endP: 0.68,
    target: { x: 0, y: -238, rotate: 0, scale: 1 },
    relOffset: { x: -1.2, y: -1.1, rot: -55 },
  },
  {
    id: 3,
    name: '24-Point Gold Foil Craft Seal',
    material: 'Cold-Stamped Metallic Foil',
    category: 'Embossing',
    color: '#FFD700',
    w: 78,
    h: 78,
    zIndex: 26,
    startP: 0.78,
    endP: 0.96,
    target: { x: 140, y: -160, rotate: 14, scale: 1 },
    relOffset: { x: 1.25, y: -1.1, rot: 180 },
  },
  {
    id: 4,
    name: 'Acid-Lime Washi Tape (Top-Left)',
    material: 'Fluorescent Washi Paper // Torn Edge',
    category: 'Mounting',
    color: '#CCFF00',
    w: 105,
    h: 28,
    zIndex: 32,
    startP: 0.66,
    endP: 0.84,
    target: { x: -142, y: -168, rotate: -26, scale: 1 },
    relOffset: { x: -1.35, y: -0.2, rot: 85 },
  },
  {
    id: 5,
    name: 'Hazard-Striped Masking Tape (Bottom-Right)',
    material: 'Cyan Industrial Tape // Crinkled',
    category: 'Mounting',
    color: '#00D2FF',
    w: 100,
    h: 26,
    zIndex: 32,
    startP: 0.7,
    endP: 0.86,
    target: { x: 142, y: 15, rotate: 30, scale: 1 },
    relOffset: { x: 1.3, y: 0.9, rot: -75 },
  },
  {
    id: 6,
    name: 'Editorial Didone Headline Shard',
    material: 'High-Contrast Didone Serif',
    category: 'Typography',
    color: '#FFFFFF',
    w: 250,
    h: 52,
    zIndex: 15,
    startP: 0.48,
    endP: 0.72,
    target: { x: -75, y: 55, rotate: -3, scale: 1 },
    relOffset: { x: -1.4, y: 0.3, rot: -65 },
  },
  {
    id: 7,
    name: 'CMYK Halftone Pop-Art Dot Matrix',
    material: 'Screenprint Halftone Rosette',
    category: 'Texture',
    color: '#FF5500',
    w: 160,
    h: 120,
    zIndex: 8,
    startP: 0.18,
    endP: 0.38,
    target: { x: 105, y: 50, rotate: 4, scale: 1 },
    relOffset: { x: 1.3, y: -0.4, rot: 55 },
  },
  {
    id: 8,
    name: 'Secondary Artwork Shard Cutout',
    material: 'Torn Cotton Rag Paper 300gsm',
    category: 'Visual Collage',
    color: '#FFB800',
    w: 150,
    h: 110,
    zIndex: 18,
    startP: 0.28,
    endP: 0.52,
    target: { x: 100, y: 95, rotate: 5, scale: 1 },
    relOffset: { x: 1.4, y: 0.1, rot: 70 },
  },
  {
    id: 9,
    name: 'Circular Viewfinder Lens Aperture',
    material: 'Brass Optical Loupe // Circular Crop',
    category: 'Microscope',
    color: '#00D2FF',
    w: 86,
    h: 86,
    zIndex: 22,
    startP: 0.34,
    endP: 0.56,
    target: { x: -110, y: 135, rotate: -8, scale: 1 },
    relOffset: { x: -1.25, y: 1.0, rot: -120 },
  },
  {
    id: 10,
    name: 'EAN-13 Barcode & Approval Stamp',
    material: 'Thermal Adhesive Label',
    category: 'Spec Sheet',
    color: '#FFFFFF',
    w: 135,
    h: 48,
    zIndex: 20,
    startP: 0.68,
    endP: 0.85,
    target: { x: -120, y: 225, rotate: 0, scale: 1 },
    relOffset: { x: -1.15, y: 1.25, rot: -40 },
  },
  {
    id: 11,
    name: 'CMYK 6-Tone Density Calibration Bar',
    material: 'Lithographic Test Swatch',
    category: 'Print Tech',
    color: '#CCFF00',
    w: 155,
    h: 20,
    zIndex: 21,
    startP: 0.72,
    endP: 0.88,
    target: { x: 60, y: 236, rotate: 0, scale: 1 },
    relOffset: { x: 0.3, y: 1.35, rot: 45 },
  },
  {
    id: 12,
    name: 'Sacred Devanagari Gold Medallion ("सृजन")',
    material: 'Cast Bronze & Gold Inlay',
    category: 'Sacred Glyph',
    color: '#FFB800',
    w: 64,
    h: 64,
    zIndex: 24,
    startP: 0.52,
    endP: 0.74,
    target: { x: -155, y: -20, rotate: -10, scale: 1 },
    relOffset: { x: -1.45, y: -0.4, rot: -90 },
  },
  {
    id: 13,
    name: 'Precision Crop Marks & Wireframe',
    material: '0.75px Drafting Hairline Film',
    category: 'Grid Architecture',
    color: '#94A3B8',
    w: 420,
    h: 560,
    zIndex: 5,
    startP: 0.08,
    endP: 0.28,
    target: { x: 0, y: 0, rotate: 0, scale: 1 },
    relOffset: { x: 0, y: 0, rot: 25 },
  },
  {
    id: 14,
    name: 'Polished Chrome Safety Pin',
    material: 'Forged Steel Wire & Clasp',
    category: 'Tactile Fastener',
    color: '#E2E8F0',
    w: 62,
    h: 22,
    zIndex: 36,
    startP: 0.74,
    endP: 0.9,
    target: { x: 55, y: 46, rotate: -36, scale: 1 },
    relOffset: { x: 1.25, y: 0.6, rot: 140 },
  },
  {
    id: 15,
    name: 'Neon Spray-Paint Stencil ("PURE SOUL")',
    material: 'Aerosol Stencil Pigment',
    category: 'Street Art',
    color: '#CCFF00',
    w: 190,
    h: 36,
    zIndex: 23,
    startP: 0.82,
    endP: 0.95,
    target: { x: -10, y: 172, rotate: -5, scale: 1 },
    relOffset: { x: -0.3, y: 1.3, rot: -45 },
  },
  {
    id: 16,
    name: 'Swiss Modernist Typography Spec Card',
    material: 'Matte Grid Index Card',
    category: 'Design Manifesto',
    color: '#FFFFFF',
    w: 125,
    h: 68,
    zIndex: 14,
    startP: 0.5,
    endP: 0.72,
    target: { x: -130, y: -90, rotate: -4, scale: 1 },
    relOffset: { x: -1.3, y: -0.8, rot: -80 },
  },
  {
    id: 17,
    name: 'Red Marker Editorial Annotation',
    material: 'Scarlet Ink Script & Pointer Loop',
    category: 'Artist Annotation',
    color: '#FF2453',
    w: 165,
    h: 40,
    zIndex: 28,
    startP: 0.85,
    endP: 0.97,
    target: { x: 25, y: 122, rotate: 2, scale: 1 },
    relOffset: { x: -1.0, y: 1.15, rot: 60 },
  },
  {
    id: 18,
    name: 'Embossed Crimson Wax Seal Stamp',
    material: 'Melted Burgundy Sealing Wax',
    category: 'Artist Seal',
    color: '#D91438',
    w: 52,
    h: 52,
    zIndex: 34,
    startP: 0.88,
    endP: 0.99,
    target: { x: 165, y: 215, rotate: -14, scale: 1 },
    relOffset: { x: 1.35, y: 1.25, rot: -180 },
  },
  {
    id: 19,
    name: 'Golden Ratio Radial Protractor Arc',
    material: 'Drafting Film Blueprint',
    category: 'Geometry',
    color: '#00D2FF',
    w: 145,
    h: 145,
    zIndex: 7,
    startP: 0.1,
    endP: 0.32,
    target: { x: 115, y: -45, rotate: 16, scale: 1 },
    relOffset: { x: 1.2, y: -1.2, rot: 120 },
  },
  {
    id: 20,
    name: 'Gallery Colophon & Signature Strip',
    material: 'Archival Museum Placard',
    category: 'Colophon',
    color: '#FFFFFF',
    w: 360,
    h: 28,
    zIndex: 25,
    startP: 0.9,
    endP: 1.0,
    target: { x: 0, y: 275, rotate: 0, scale: 1 },
    relOffset: { x: 0, y: 1.45, rot: 0 },
  },
];

export default function MixedMediaAssembly() {
  const runwayRef = useRef(null);
  const stageRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [hoveredShard, setHoveredShard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // ── DRAGGABLE REMIX STATE ──
  // Allows user to freely drag any of the 20 shards once assembled!
  const [dragOffsets, setDragOffsets] = useState({});
  const [activeDragId, setActiveDragId] = useState(null);
  const dragStartRef = useRef({ pointerId: null, startX: 0, startY: 0, initX: 0, initY: 0 });

  // Track Window Resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowDimensions({ w, h });
      setIsMobile(w < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth 60fps Interpolation
  useEffect(() => {
    let animId;
    const lerpSpeed = 0.16;

    const animate = () => {
      setScrollProgress((prev) => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.0005) return targetProgress;
        return prev + diff * lerpSpeed;
      });
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [targetProgress]);

  // Navigate explicitly to a target creation progress & sync scroll
  const goToProgress = useCallback((val) => {
    const clamped = Math.max(0, Math.min(1, val));
    setTargetProgress(clamped);
    try { soundFX.playTick(); } catch {}

    if (runwayRef.current) {
      const rect = runwayRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const sectionTop = currentScrollY + rect.top;
      const scrollableDistance = runwayRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        const targetScrollY = sectionTop + clamped * scrollableDistance;
        window.scrollTo({ top: targetScrollY, behavior: 'instant' });
      }
    }
  }, []);

  // Passive Page Scroll Listener
  useEffect(() => {
    let lastReportedStep = -1;

    const handleScroll = () => {
      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const scrollableDistance = runwayRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      if (scrolled < 0) {
        setTargetProgress(0);
        return;
      }
      if (scrolled > scrollableDistance) {
        setTargetProgress(1);
        return;
      }

      const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setTargetProgress(p);

      const step = Math.floor(p * 20);
      if (step !== lastReportedStep) {
        lastReportedStep = step;
        if (step === 20) {
          try { soundFX.playAperture(); } catch {}
        } else if (step > 0) {
          try { soundFX.playTick(); } catch {}
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active Wheel Resistance Controller
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    let accumulatedDelta = 0;
    let wheelCooldown = false;

    const handleWheel = (e) => {
      // Do not capture wheel if user is actively dragging an element
      if (activeDragId !== null) return;

      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const isPinned = rect.top <= 20 && rect.bottom >= window.innerHeight - 20;

      if (!isPinned) return; // Allow page to scroll normally until pinned

      if (e.deltaY > 0) {
        if (targetProgress < 1) {
          e.preventDefault();
          accumulatedDelta += e.deltaY;
          if (accumulatedDelta >= 35 && !wheelCooldown) {
            wheelCooldown = true;
            accumulatedDelta = 0;
            const nextStep = Math.min(1, Math.round(targetProgress * 20 + 1) / 20);
            goToProgress(nextStep);
            setTimeout(() => { wheelCooldown = false; }, 140);
          }
        }
      } else if (e.deltaY < 0) {
        if (targetProgress > 0) {
          e.preventDefault();
          accumulatedDelta += e.deltaY;
          if (accumulatedDelta <= -35 && !wheelCooldown) {
            wheelCooldown = true;
            accumulatedDelta = 0;
            const prevStep = Math.max(0, Math.round(targetProgress * 20 - 1) / 20);
            goToProgress(prevStep);
            setTimeout(() => { wheelCooldown = false; }, 140);
          }
        }
      }
    };

    stageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => stageEl.removeEventListener('wheel', handleWheel);
  }, [targetProgress, activeDragId, goToProgress]);

  // Compute how many shards are docked (>92% complete)
  const assembledCount = SHARDS.filter((s) => {
    const t = Math.max(0, Math.min(1, (scrollProgress - s.startP) / (s.endP - s.startP)));
    return t >= 0.92;
  }).length;

  const isFullAssembly = assembledCount === 20;
  const isDraggableUnlocked = scrollProgress >= 0.82;

  // Active Creation Phase
  const currentPhase = PHASES.find(
    (ph) => scrollProgress >= ph.range[0] && scrollProgress <= ph.range[1]
  ) || PHASES[PHASES.length - 1];

  // Responsive scale factor for mobile screens
  const posterScale = isMobile ? Math.min(0.82, (windowDimensions.w - 32) / 460) : 1;

  // Viewport half-extents
  const halfW = windowDimensions.w * 0.5;
  const halfH = windowDimensions.h * 0.5;

  // ── DRAG HANDLERS ──
  const handleShardPointerDown = (shardId, e) => {
    if (!isDraggableUnlocked) return;
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    setActiveDragId(shardId);
    dragStartRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initX: dragOffsets[shardId]?.x || 0,
      initY: dragOffsets[shardId]?.y || 0,
    };
    try { soundFX.playSnap(); } catch {}
  };

  const handleShardPointerMove = (e) => {
    if (activeDragId === null) return;
    e.stopPropagation();
    const dx = (e.clientX - dragStartRef.current.startX) / posterScale;
    const dy = (e.clientY - dragStartRef.current.startY) / posterScale;

    setDragOffsets((prev) => ({
      ...prev,
      [activeDragId]: {
        x: dragStartRef.current.initX + dx,
        y: dragStartRef.current.initY + dy,
      },
    }));
  };

  const handleShardPointerUp = (e) => {
    if (activeDragId !== null) {
      e.stopPropagation();
      try {
        if (e.currentTarget.hasPointerCapture(dragStartRef.current.pointerId)) {
          e.currentTarget.releasePointerCapture(dragStartRef.current.pointerId);
        }
      } catch {}
      setActiveDragId(null);
      try { soundFX.playTick(); } catch {}
    }
  };

  // Reset dragged offsets back to masterwork grid
  const resetCollageLayout = () => {
    setDragOffsets({});
    try { soundFX.playAperture(); } catch {}
  };

  const hasCustomDrags = Object.values(dragOffsets).some((pt) => pt && (pt.x !== 0 || pt.y !== 0));

  return (
    <section
      ref={runwayRef}
      className="mixed-media-runway"
      style={{
        position: 'relative',
        width: '100%',
        height: '380vh',
        background: '#07090E',
        color: '#FFFFFF',
      }}
    >
      {/* ── STICKY VIEWPORT CONTAINER ── */}
      <div
        ref={stageRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '10px 10px 14px' : '16px 24px 18px',
          overflow: 'hidden',
          boxSizing: 'border-box',
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(204, 255, 0, 0.08) 0%, rgba(0, 210, 255, 0.04) 45%, transparent 70%),
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      >
        {/* ── 1. TOP HEADER & HUD BAR ── */}
        <header
          style={{
            width: '100%',
            maxWidth: '1280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 40,
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left Title Lockup */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <h2
              style={{
                fontFamily: "'Rozha One', 'Noto Serif Devanagari', 'Cinzel Decorative', serif",
                fontSize: isMobile ? '22px' : '32px',
                fontWeight: 400,
                letterSpacing: '0.04em',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 50%, #CCFF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <span>सृजन विन्यास</span>
              <span style={{ fontSize: isMobile ? '11px' : '14px', color: '#94A3B8', fontFamily: "'Space Grotesk', monospace", WebkitTextFillColor: '#94A3B8', fontWeight: 700 }}>
                // CHAOS INTO FORM
              </span>
            </h2>
          </div>

          {/* Center Dynamic Phase Narrative Pill */}
          <div
            style={{
              display: isMobile ? 'none' : 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(13, 17, 26, 0.85)',
              border: isDraggableUnlocked ? '1px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: isDraggableUnlocked ? '0 0 20px rgba(204, 255, 0, 0.25)' : '0 8px 24px rgba(0,0,0,0.45)',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '9px', fontWeight: 900, color: '#CCFF00', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                PHASE {currentPhase.id}/6:
              </span>
              <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '11px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                {currentPhase.name}
              </span>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#94A3B8' }}>
              {currentPhase.desc}
            </div>
          </div>

          {/* Right Status Badge & Interactive Control Deck */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Docked Counter Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: isFullAssembly ? 'rgba(204, 255, 0, 0.16)' : 'rgba(255, 255, 255, 0.06)',
                border: isFullAssembly ? '1.5px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: isFullAssembly ? '0 0 20px rgba(204, 255, 0, 0.35)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: isFullAssembly ? '#CCFF00' : '#00D2FF',
                  boxShadow: `0 0 8px ${isFullAssembly ? '#CCFF00' : '#00D2FF'}`,
                  animation: 'pulse 1.8s infinite',
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '11px',
                  fontWeight: 800,
                  color: isFullAssembly ? '#CCFF00' : '#E2E8F0',
                  letterSpacing: '0.08em',
                }}
              >
                {assembledCount}/20 {isFullAssembly ? 'UNIFIED ✦' : 'CONVERGING'}
              </span>
            </div>

            {/* Reset Dragged Collage Button (shows when user moved pieces) */}
            {hasCustomDrags && (
              <button
                type="button"
                onClick={resetCollageLayout}
                style={{
                  background: 'rgba(0, 210, 255, 0.15)',
                  color: '#00D2FF',
                  border: '1.5px solid #00D2FF',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '10.5px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease',
                }}
                title="Reset all dragged components back to original masterwork coordinates"
              >
                <span>⟲ RESET COLLAGE</span>
              </button>
            )}

            {/* Assemble / Explode Toggle Button */}
            <button
              type="button"
              onClick={() => {
                if (targetProgress > 0.5) {
                  goToProgress(0);
                  try { soundFX.playWarp(); } catch {}
                } else {
                  goToProgress(1);
                  try { soundFX.playAperture(); } catch {}
                }
              }}
              style={{
                background: targetProgress > 0.5 ? 'rgba(255, 36, 83, 0.12)' : 'rgba(204, 255, 0, 0.12)',
                color: targetProgress > 0.5 ? '#FF2453' : '#CCFF00',
                border: `1.5px solid ${targetProgress > 0.5 ? '#FF2453' : '#CCFF00'}`,
                borderRadius: '999px',
                padding: '6px 14px',
                fontFamily: "'Space Grotesk', monospace",
                fontSize: '10.5px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
              title="Click to manually toggle explosion / reassembly"
            >
              <span>{targetProgress > 0.5 ? '✦ EXPLODE' : '✦ ASSEMBLE'}</span>
            </button>
          </div>
        </header>

        {/* ── 2. CENTER DRAFTING BOARD & POSTER CANVAS ── */}
        <div
          className="mixed-media-drafting-arena"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1280px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: isMobile ? '380px' : '480px',
          }}
        >
          {/* Subtle Outer Watermarks */}
          <div
            style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%) rotate(-90deg)',
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '10px',
              fontWeight: 900,
              letterSpacing: '0.3em',
              color: 'rgba(255, 255, 255, 0.12)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            DADAIST KINETIC MATRIX // MMXXVI
          </div>

          <div
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%) rotate(90deg)',
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '10px',
              fontWeight: 900,
              letterSpacing: '0.3em',
              color: 'rgba(255, 255, 255, 0.12)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            20-COMPONENT MOVABLE COLLAGE // VAIBHAV
          </div>

          {/* ── SVG LASER TRAJECTORY BEACON GUIDES ── */}
          <svg
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 3,
              opacity: scrollProgress > 0.05 && scrollProgress < 0.95 ? 0.45 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <defs>
              <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {SHARDS.map((s) => {
              const rawT = (scrollProgress - s.startP) / (s.endP - s.startP);
              const t = Math.max(0, Math.min(1, rawT));
              if (t <= 0.02 || t >= 0.96) return null;

              const originX = 500 + s.relOffset.x * 420;
              const originY = 350 + s.relOffset.y * 320;
              const targetX = 500 + s.target.x;
              const targetY = 350 + s.target.y;

              return (
                <line
                  key={`line-${s.id}`}
                  x1={originX}
                  y1={originY}
                  x2={targetX}
                  y2={targetY}
                  stroke="url(#laserGrad)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
              );
            })}
          </svg>

          {/* ── THE POSTER BOARD (Target Canvas: 460px x 620px) ── */}
          <div
            className="mixed-media-poster-canvas"
            style={{
              position: 'relative',
              width: '460px',
              height: '620px',
              transform: `scale(${posterScale})`,
              transformOrigin: 'center center',
              background: 'radial-gradient(ellipse at 50% 40%, #111624 0%, #0B0E17 100%)',
              border: isFullAssembly ? '2px solid rgba(204, 255, 0, 0.75)' : '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '16px',
              boxShadow: isFullAssembly
                ? '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 60px rgba(204, 255, 0, 0.28)'
                : '0 25px 65px rgba(0, 0, 0, 0.85)',
              overflow: 'visible',
              transition: 'border 0.4s ease, box-shadow 0.4s ease',
            }}
          >
            {/* Grand Illumination Light Beam Sweep at 100% */}
            {isFullAssembly && (
              <div
                style={{
                  position: 'absolute',
                  inset: '-2px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, transparent 40%, rgba(204, 255, 0, 0.22) 50%, transparent 60%)',
                  pointerEvents: 'none',
                  zIndex: 80,
                  animation: 'shimmerSweep 3s infinite',
                }}
              />
            )}

            {/* Poster Blueprint Drafting Background Lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '15px',
                pointerEvents: 'none',
                overflow: 'hidden',
                zIndex: 1,
              }}
            >
              {/* Corner Calibration Marks */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: "'Space Grotesk', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.22)' }}>
                ⊕ TOP_L // 00.00
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px', fontFamily: "'Space Grotesk', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.22)' }}>
                ISO_216 // A2 ⊕
              </div>
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', fontFamily: "'Space Grotesk', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.22)' }}>
                ⊕ SWISS_GRID: 12COL
              </div>
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', fontFamily: "'Space Grotesk', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.22)' }}>
                HV_2026 ⊕
              </div>

              {/* Diagonal Drafting Guidelines */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
                <line x1="0" y1="0" x2="460" y2="620" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="3 4" />
                <line x1="460" y1="0" x2="0" y2="620" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="3 4" />
                <circle cx="230" cy="310" r="160" fill="none" stroke="#CCFF00" strokeWidth="0.75" strokeDasharray="4 6" />
              </svg>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                THE 20 KINETIC MIXED-MEDIA COMPONENTS (DRAGGABLE & MOVABLE!)
                ═══════════════════════════════════════════════════════════════ */}
            {SHARDS.map((shard) => {
              const rawT = (scrollProgress - shard.startP) / (shard.endP - shard.startP);
              const t = Math.max(0, Math.min(1, rawT));
              const ease = 1 - Math.pow(1 - t, 3);

              // Extreme Viewport Origins
              const originX = shard.relOffset.x * (halfW + 160);
              const originY = shard.relOffset.y * (halfH + 160);
              const originRotate = shard.relOffset.rot;

              // Interpolated trajectory
              const curX = originX + (shard.target.x - originX) * ease;
              const curY = originY + (shard.target.y - originY) * ease;
              const curRotate = originRotate + (shard.target.rotate - originRotate) * ease;
              const curScale = 0.5 + (shard.target.scale - 0.5) * ease;
              const curOpacity = Math.max(0.08, Math.min(1, t * 1.8));

              // User's custom dragged offset (if moved)
              const dragX = dragOffsets[shard.id]?.x || 0;
              const dragY = dragOffsets[shard.id]?.y || 0;

              const isBeingDragged = activeDragId === shard.id;
              const isHovered = hoveredShard === shard.id;
              const isDocked = t >= 0.95;

              // Combined Final Position
              const finalX = curX + dragX;
              const finalY = curY + dragY;

              const zIndex = isBeingDragged ? 999 : (isHovered ? 120 : shard.zIndex);

              return (
                <div
                  key={shard.id}
                  className={`mixed-media-shard shard-${shard.id}`}
                  onPointerDown={(e) => handleShardPointerDown(shard.id, e)}
                  onPointerMove={handleShardPointerMove}
                  onPointerUp={handleShardPointerUp}
                  onPointerCancel={handleShardPointerUp}
                  onClick={() => {
                    // Only open modal if not actively dragging
                    if (isFullAssembly && !isBeingDragged && Math.abs(dragX) < 3 && Math.abs(dragY) < 3) {
                      setModalOpen(true);
                    }
                  }}
                  onMouseEnter={() => {
                    if (activeDragId === null) {
                      try { soundFX.playHover(); } catch {}
                      setHoveredShard(shard.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (activeDragId === null) setHoveredShard(null);
                  }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: `${shard.w}px`,
                    height: `${shard.h}px`,
                    transform: `translate(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px)) rotate(${curRotate}deg) scale(${curScale * (isBeingDragged ? 1.08 : (isHovered ? 1.04 : 1))})`,
                    opacity: curOpacity,
                    zIndex: zIndex,
                    cursor: isDraggableUnlocked
                      ? (isBeingDragged ? 'grabbing' : 'grab')
                      : 'default',
                    userSelect: 'none',
                    touchAction: 'none', // Critical for smooth pointer dragging on touch & mouse
                    willChange: 'transform, opacity',
                    filter: isBeingDragged ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.9))' : 'none',
                    transition: isBeingDragged ? 'none' : 'box-shadow 0.2s ease, filter 0.2s ease',
                  }}
                  title={isDraggableUnlocked ? `[ ${shard.id}/20 ] ${shard.name} • Click & Drag to Move!` : `[ ${shard.id}/20 ] ${shard.name}`}
                >
                  {/* Contextual Micro Tooltip on Hover */}
                  {isHovered && !isBeingDragged && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 8px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(9, 12, 18, 0.96)',
                        border: `1.5px solid ${shard.color}`,
                        borderRadius: '6px',
                        padding: '5px 10px',
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: '9.5px',
                        color: '#FFFFFF',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.85)',
                        pointerEvents: 'none',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span style={{ color: shard.color, fontWeight: 900 }}>#{shard.id < 10 ? `0${shard.id}` : shard.id}</span>
                      <span>{shard.name}</span>
                      {isDraggableUnlocked && (
                        <span style={{ color: '#CCFF00', fontWeight: 900, background: 'rgba(204,255,0,0.15)', padding: '1px 5px', borderRadius: '3px' }}>
                          ✋ DRAGGABLE
                        </span>
                      )}
                    </div>
                  )}

                  {/* ─────────────────────────────────────────────────────────
                      SHARD CONTENT RENDERING (20 BESPOKE ARTIFACTS)
                      ───────────────────────────────────────────────────────── */}
                  {/* SHARD 1: Hero Photographic Film Plate */}
                  {shard.id === 1 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#040609',
                        border: '2px solid rgba(255, 255, 255, 0.25)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 18px 40px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      <div style={{ height: '14px', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
                        <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7px', color: '#CCFF00', fontWeight: 800 }}>
                          KODAK VISION3 500T // 35MM EXP 24
                        </span>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {[1, 2, 3, 4, 5].map((sp) => (
                            <span key={sp} style={{ width: '6px', height: '8px', background: 'rgba(255,255,255,0.25)', borderRadius: '1.5px' }} />
                          ))}
                        </div>
                      </div>

                      <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 28px)', overflow: 'hidden' }}>
                        <img
                          src="/assets/text_image/artwork-a.jpg"
                          alt="Hero Mixed Media Artwork"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 65%, rgba(4, 6, 9, 0.7) 100%)' }} />
                        <div style={{ position: 'absolute', bottom: '6px', left: '8px', fontFamily: "'Space Grotesk', monospace", fontSize: '9px', fontWeight: 800, color: '#FFFFFF', textShadow: '0 2px 4px #000' }}>
                          HOWVAIBHAV ARCHIVE // FRAME 24A
                        </div>
                      </div>

                      <div style={{ height: '14px', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {[1, 2, 3, 4, 5].map((sp) => (
                            <span key={sp} style={{ width: '6px', height: '8px', background: 'rgba(255,255,255,0.25)', borderRadius: '1.5px' }} />
                          ))}
                        </div>
                        <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7px', color: '#94A3B8' }}>
                          EXP 24+ // 08-04-2026
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SHARD 2: Vintage Newsprint Header Banner */}
                  {shard.id === 2 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#0B0D13',
                        border: '1.5px solid #FFFFFF',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 12px',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.6)',
                      }}
                    >
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '10px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.12em' }}>
                        HOWVAIBHAV ARCHIVE
                      </span>
                      <span style={{ color: '#CCFF00', fontSize: '10px' }}>✦</span>
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '9.5px', fontWeight: 700, color: '#CBD5E1', letterSpacing: '0.08em' }}>
                        DADAIST SYNTHESIS // 2026
                      </span>
                    </div>
                  )}

                  {/* SHARD 3: 24-Point Gold Foil Craft Seal */}
                  {shard.id === 3 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 35%, #FFF099 0%, #FFB800 50%, #C78200 100%)',
                        border: '2px solid #FFF8CC',
                        boxShadow: '0 10px 24px rgba(255, 184, 0, 0.45), inset 0 2px 4px rgba(255,255,255,0.8)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#422800',
                        position: 'relative',
                      }}
                    >
                      <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '19px', fontWeight: 900, lineHeight: 1 }}>HV</span>
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '6px', fontWeight: 900, letterSpacing: '0.08em', marginTop: '1px' }}>
                        AUTHENTIC
                      </span>
                    </div>
                  )}

                  {/* SHARD 4: Acid-Lime Washi Tape (Top-Left) */}
                  {shard.id === 4 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'rgba(204, 255, 0, 0.88)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                        clipPath: 'polygon(4% 0%, 96% 2%, 100% 98%, 2% 95%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderLeft: '2px dashed rgba(0, 0, 0, 0.35)',
                        borderRight: '2px dashed rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '8px', fontWeight: 900, color: '#07080B', letterSpacing: '0.12em' }}>
                        [ TACTILE WASHI TAPE ]
                      </span>
                    </div>
                  )}

                  {/* SHARD 5: Hazard-Striped Masking Tape (Bottom-Right) */}
                  {shard.id === 5 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'repeating-linear-gradient(45deg, #00D2FF, #00D2FF 8px, #070A10 8px, #070A10 16px)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.45)',
                        clipPath: 'polygon(2% 0%, 98% 3%, 97% 96%, 0% 98%)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                      }}
                    />
                  )}

                  {/* SHARD 6: Editorial Didone Headline Shard */}
                  {shard.id === 6 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'rgba(9, 12, 18, 0.94)',
                        borderLeft: '4px solid #CCFF00',
                        borderRadius: '0 6px 6px 0',
                        padding: '6px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.65)',
                      }}
                    >
                      <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '15px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        CHAOS INTO SYSTEM
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '8px', color: '#94A3B8', marginTop: '2px' }}>
                        Duality of Intuition &amp; Code
                      </div>
                    </div>
                  )}

                  {/* SHARD 7: CMYK Halftone Pop-Art Dot Matrix */}
                  {shard.id === 7 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        backgroundImage: 'radial-gradient(#FF5500 2.5px, transparent 2.5px)',
                        backgroundSize: '11px 11px',
                        opacity: 0.85,
                        border: '1px dashed rgba(255, 85, 0, 0.4)',
                        position: 'relative',
                      }}
                    >
                      <span style={{ position: 'absolute', bottom: '4px', right: '6px', fontFamily: "'Space Grotesk', monospace", fontSize: '7.5px', color: '#FF5500', fontWeight: 800 }}>
                        HALFTONE: 85LPI
                      </span>
                    </div>
                  )}

                  {/* SHARD 8: Secondary Artwork Shard Cutout */}
                  {shard.id === 8 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#070A10',
                        border: '2px solid #FFFFFF',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        boxShadow: '0 12px 28px rgba(0,0,0,0.7)',
                        position: 'relative',
                      }}
                    >
                      <img
                        src="/assets/text_image/artwork-v.jpg"
                        alt="Secondary Artwork Fragment"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                      />
                      <div style={{ position: 'absolute', top: '4px', left: '4px', background: 'rgba(0,0,0,0.75)', color: '#FFB800', fontFamily: "'Space Grotesk', monospace", fontSize: '7px', fontWeight: 900, padding: '1px 4px', borderRadius: '2px' }}>
                        SHARD 08 // ABSTRACT
                      </div>
                    </div>
                  )}

                  {/* SHARD 9: Circular Viewfinder Lens Aperture */}
                  {shard.id === 9 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '2.5px solid #00D2FF',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 8px 24px rgba(0, 210, 255, 0.45)',
                      }}
                    >
                      <img
                        src="/assets/text_image/artwork-o.jpg"
                        alt="Aperture Shard"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, border: '1px dashed rgba(255,255,255,0.6)', borderRadius: '50%' }} />
                      <span style={{ position: 'absolute', top: '2px', left: '50%', transform: 'translateX(-50%)', fontFamily: "'Space Grotesk', monospace", fontSize: '6px', color: '#00D2FF', fontWeight: 900 }}>
                        0° N
                      </span>
                    </div>
                  )}

                  {/* SHARD 10: EAN-13 Barcode & Approval Stamp */}
                  {shard.id === 10 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#FFFFFF',
                        color: '#000000',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7px', fontWeight: 900 }}>
                          HV-2026-DADA
                        </span>
                        <span style={{ background: '#FF2453', color: '#FFF', fontSize: '6px', fontWeight: 900, padding: '1px 4px', borderRadius: '2px' }}>
                          OK // PASS
                        </span>
                      </div>
                      <div style={{ height: '18px', background: 'repeating-linear-gradient(90deg, #000, #000 2px, transparent 2px, transparent 4px, #000 4px, #000 7px, transparent 7px, transparent 9px)' }} />
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7px', textAlign: 'center', fontWeight: 700 }}>
                        8 901234 567890
                      </span>
                    </div>
                  )}

                  {/* SHARD 11: CMYK 6-Tone Density Calibration Bar */}
                  {shard.id === 11 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'rgba(10, 14, 22, 0.94)',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: '2px 4px',
                      }}
                    >
                      {['#00D2FF', '#FF2D78', '#FFDE00', '#FFFFFF', '#CCFF00', '#FF5500'].map((c, i) => (
                        <span key={i} style={{ width: '12px', height: '12px', background: c, borderRadius: '2px', boxShadow: `0 0 4px ${c}55` }} />
                      ))}
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7px', color: '#94A3B8', fontWeight: 800 }}>
                        DENS: 100%
                      </span>
                    </div>
                  )}

                  {/* SHARD 12: Sacred Devanagari Gold Medallion ("सृजन") */}
                  {shard.id === 12 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #FFE57F 0%, #FFB800 60%, #996B00 100%)',
                        border: '2px solid #FFF',
                        boxShadow: '0 8px 24px rgba(255, 184, 0, 0.45)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#382200',
                      }}
                    >
                      <span style={{ fontFamily: "'Rozha One', 'Noto Serif Devanagari', serif", fontSize: '22px', fontWeight: 400, transform: 'translateY(-2px)' }}>
                        सृजन
                      </span>
                    </div>
                  )}

                  {/* SHARD 13: Precision Crop Marks & Wireframe */}
                  {shard.id === 13 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        border: '1px solid rgba(204, 255, 0, 0.32)',
                        borderRadius: '14px',
                        position: 'relative',
                        pointerEvents: 'none',
                      }}
                    >
                      <span style={{ position: 'absolute', top: '-6px', left: '-6px', color: '#CCFF00', fontSize: '10px' }}>⊕</span>
                      <span style={{ position: 'absolute', top: '-6px', right: '-6px', color: '#CCFF00', fontSize: '10px' }}>⊕</span>
                      <span style={{ position: 'absolute', bottom: '-6px', left: '-6px', color: '#CCFF00', fontSize: '10px' }}>⊕</span>
                      <span style={{ position: 'absolute', bottom: '-6px', right: '-6px', color: '#CCFF00', fontSize: '10px' }}>⊕</span>
                    </div>
                  )}

                  {/* SHARD 14: Polished Chrome Safety Pin */}
                  {shard.id === 14 && (
                    <svg viewBox="0 0 65 24" width="100%" height="100%" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.85))' }}>
                      <path d="M 6 12 C 6 6, 14 6, 18 12 L 56 12 C 59 12, 61 14, 61 17 C 61 20, 59 22, 56 22 L 18 22 C 14 22, 6 20, 6 12 Z" fill="none" stroke="#E2E8F0" strokeWidth="2.5" />
                      <circle cx="10" cy="12" r="5" fill="#94A3B8" stroke="#FFFFFF" strokeWidth="1.5" />
                      <rect x="48" y="9" width="13" height="14" rx="3" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
                    </svg>
                  )}

                  {/* SHARD 15: Neon Spray-Paint Stencil ("PURE SOUL") */}
                  {shard.id === 15 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          fontSize: '18px',
                          fontWeight: 900,
                          color: '#CCFF00',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          textShadow: '0 0 14px #CCFF00, 0 0 28px rgba(204, 255, 0, 0.65)',
                          border: '2px solid #CCFF00',
                          padding: '2px 14px',
                          transform: 'skewX(-8deg)',
                        }}
                      >
                        PURE SOUL
                      </span>
                    </div>
                  )}

                  {/* SHARD 16: Swiss Modernist Typography Spec Card */}
                  {shard.id === 16 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: '#07080A',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7.5px', fontWeight: 900 }}>
                        SWISS MATRIX SPEC
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '8px', lineHeight: 1.2, color: '#334155' }}>
                        Grid: 12-Col Modular<br />
                        Type: Helvetica &amp; Rozha<br />
                        Paper: 350gsm Heavy
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '6.5px', color: '#64748B' }}>
                        ISO 216 // A2 ARCHIVE
                      </div>
                    </div>
                  )}

                  {/* SHARD 17: Red Marker Editorial Annotation */}
                  {shard.id === 17 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#FF2453',
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>✦</span>
                      <span
                        style={{
                          fontFamily: "'Caveat', 'Playfair Display', cursive, serif",
                          fontSize: '15px',
                          fontWeight: 700,
                          lineHeight: 1.1,
                          textShadow: '0 2px 8px rgba(255, 36, 83, 0.45)',
                          borderBottom: '2px wavy #FF2453',
                        }}
                      >
                        Form follows soul.
                      </span>
                    </div>
                  )}

                  {/* SHARD 18: Embossed Crimson Wax Seal Stamp */}
                  {shard.id === 18 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 35%, #FF3355 0%, #B80024 60%, #6E0014 100%)',
                        boxShadow: '0 8px 22px rgba(184, 0, 36, 0.55), inset 0 2px 4px rgba(255,255,255,0.4)',
                        border: '2px solid #FF5577',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                      }}
                    >
                      <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '15px', fontWeight: 900 }}>
                        HV
                      </span>
                    </div>
                  )}

                  {/* SHARD 19: Golden Ratio Radial Protractor Arc */}
                  {shard.id === 19 && (
                    <svg viewBox="0 0 145 145" width="100%" height="100%" style={{ opacity: 0.75 }}>
                      <circle cx="72" cy="72" r="65" fill="none" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="72" cy="72" r="42" fill="none" stroke="#00D2FF" strokeWidth="0.75" />
                      <path d="M 72 72 L 137 72 A 65 65 0 0 0 72 7 Z" fill="rgba(0, 210, 255, 0.08)" stroke="#00D2FF" strokeWidth="1" />
                      <text x="76" y="66" fill="#00D2FF" fontSize="8" fontFamily="'Space Grotesk', monospace" fontWeight="900">
                        φ = 1.618
                      </text>
                    </svg>
                  )}

                  {/* SHARD 20: Gallery Colophon & Signature Strip */}
                  {shard.id === 20 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'rgba(9, 12, 18, 0.94)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 12px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
                      }}
                    >
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '8px', color: '#94A3B8', letterSpacing: '0.06em' }}>
                        HOWVAIBHAV STUDIO ARCHIVE // SYNTHESIS N° 20
                      </span>
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '8.5px', color: '#CCFF00', fontWeight: 800 }}>
                        © 2026 VAIBHAV TIWARI
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. BOTTOM SCRUBBER & INTERACTIVE PHASE NAVIGATION DECK ── */}
        <footer
          style={{
            width: '100%',
            maxWidth: '920px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 40,
          }}
        >
          {/* Draggable Active Sandbox Notice */}
          {isDraggableUnlocked ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 16px',
                borderRadius: '999px',
                background: 'rgba(204, 255, 0, 0.12)',
                border: '1px solid #CCFF00',
                color: '#CCFF00',
                fontFamily: "'Space Grotesk', monospace",
                fontSize: '10px',
                fontWeight: 900,
                letterSpacing: '0.06em',
                animation: 'pulse 2s infinite',
              }}
            >
              <span>✋ DRAGGABLE SANDBOX UNLOCKED</span>
              <span>&bull;</span>
              <span>CLICK &amp; DRAG ANY ELEMENT TO REMIX YOUR COLLAGE</span>
            </div>
          ) : (
            /* Phase Quick-Jump Navigation Pills */
            <div
              style={{
                display: 'flex',
                gap: isMobile ? '4px' : '6px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {PHASES.map((ph) => {
                const isActive = currentPhase.id === ph.id;
                return (
                  <button
                    key={ph.id}
                    type="button"
                    onClick={() => goToProgress((ph.range[0] + ph.range[1]) / 2)}
                    style={{
                      background: isActive ? '#CCFF00' : 'rgba(255, 255, 255, 0.05)',
                      color: isActive ? '#07080A' : '#94A3B8',
                      border: isActive ? '1px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '999px',
                      padding: isMobile ? '3px 8px' : '4px 12px',
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: isMobile ? '8.5px' : '9.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    title={`Jump to ${ph.name}`}
                  >
                    0{ph.id} {isMobile ? '' : ph.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          )}

          {/* Scrubber Track */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: '9.5px',
                color: '#94A3B8',
                fontWeight: 800,
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}
            >
              ENTROPY 0%
            </span>

            {/* Interactive Progress Bar */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                goToProgress(ratio);
              }}
              style={{
                flex: 1,
                height: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '999px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              title="Click anywhere along the bar to scrub creation progress"
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${scrollProgress * 100}%`,
                  background: isFullAssembly
                    ? 'linear-gradient(90deg, #00D2FF 0%, #CCFF00 100%)'
                    : 'linear-gradient(90deg, #FF5500 0%, #CCFF00 100%)',
                  borderRadius: '999px',
                  boxShadow: '0 0 12px rgba(204, 255, 0, 0.65)',
                }}
              />
            </div>

            <span
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: '9.5px',
                color: isFullAssembly ? '#CCFF00' : '#94A3B8',
                fontWeight: 800,
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}
            >
              {Math.round(scrollProgress * 100)}% UNIFIED
            </span>
          </div>
        </footer>
      </div>

      {/* ── 4. FULLSCREEN MASTERWORK MODAL INSPECTION ── */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 7, 10, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '900px',
              width: '100%',
              background: '#0B0F17',
              border: '2px solid #CCFF00',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '24px',
              boxShadow: '0 30px 90px rgba(0,0,0,0.9), 0 0 60px rgba(204,255,0,0.35)',
            }}
          >
            {/* Modal Left Artwork Preview */}
            <div style={{ flex: '1.2', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
              <img
                src="/assets/text_image/artwork-a.jpg"
                alt="Full Masterwork"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Modal Right Curatorial Dossier */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '10px', color: '#CCFF00', fontWeight: 900 }}>
                    EXHIBIT 02 // DADAIST SYNTHESIS
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94A3B8',
                      fontSize: '18px',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    ✕
                  </button>
                </div>

                <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '24px', fontWeight: 900, color: '#FFF', margin: '0 0 8px' }}>
                  सृजन विन्यास — Chaos Into Form
                </h3>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6 }}>
                  An authentic mixed-media exploration combining 35mm film negatives, torn washi tapes,
                  CMYK rosette halftone screens, Swiss modernist type hierarchies, and physical crimson wax seals.
                  Conceived and sculpted by Vaibhav Tiwari as a physical metaphor for breaking and restoring digital order.
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Archive Verification
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['35MM GICLÉE', 'PANTONE 802C', 'ISO 216 // A2', 'AUTHENTICATED'].map((tag, i) => (
                    <span key={i} style={{ background: 'rgba(204,255,0,0.12)', border: '1px solid #CCFF00', color: '#CCFF00', fontSize: '9px', padding: '3px 8px', borderRadius: '4px', fontFamily: "'Space Grotesk', monospace", fontWeight: 700 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
