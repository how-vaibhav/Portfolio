import React, { useRef, useState, useEffect, useCallback } from 'react';
import { soundFX } from './soundFX';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * सृजन विन्यास // THE DADAIST KINETIC SYNTHESIS — MOVABLE MIXED-MEDIA POSTER
 * ─────────────────────────────────────────────────────────────────────────────
 * Theme: "Duality of Ancient Soul & Digital Brutalism"
 *  - 32 bespoke tactile artifacts fly in from the extreme screen edges on scroll:
 *      * 35mm Giclée film plates (artwork-a.jpg) with Kodak sprocket holes
 *      * Secondary deckle photo cutout (artwork-v.jpg) & brass telescope aperture (artwork-o.jpg)
 *      * Washi tape, industrial masking tape, chrome safety pin
 *      * Didone editorial typography ("CHAOS INTO SYSTEM"), newsprint banners
 *      * Pop-art halftone rosette screen, golden ratio arcs (φ = 1.618)
 *      * EAN-13 barcode, CMYK litho density bar, gold Devanagari seal ("सृजन")
 *      * Stencil graffiti ("PURE SOUL"), red marker script ("Form follows soul.")
 *      * 3D embossed crimson wax seal stamp & museum colophon
 *  - ONCE ASSEMBLED (>=85% or 100%): ALL 32 ELEMENTS ARE FREELY MOVABLE / DRAGGABLE!
 *    The user can click, drag, pick up, reposition, and remix the physical collage!
 *  - "RESET COLLAGE" button instantly docks elements back to their masterwork coordinates.
 *  - Light beam shimmer sweep & aperture haptics on 100% completion.
 */

// 6 Core Creation Phases
const PHASES = [
  { id: 1, range: [0, 0.16], name: 'ENTROPIC VOID', subtitle: 'Cosmic Field', desc: 'Gravitational convergence across 32 coordinates' },
  { id: 2, range: [0.16, 0.36], name: 'STRUCTURAL BLUEPRINT', subtitle: 'Modular Grid', desc: 'Precision 0.75px technical crop marks & golden ratios' },
  { id: 3, range: [0.36, 0.56], name: 'PHOTOGRAPHIC PLATES', subtitle: 'Giclée Emulsions', desc: '35mm Kodak negatives & pop-art halftone rosettes' },
  { id: 4, range: [0.56, 0.74], name: 'EDITORIAL TYPOGRAPHY', subtitle: 'Didone & Glyphs', desc: 'High-contrast Didone serifs & sacred Devanagari' },
  { id: 5, range: [0.74, 0.90], name: 'TACTILE ARTIFACTS', subtitle: 'Craft Ephemera', desc: 'Washi catalog tape, chrome safety pin & barcodes' },
  { id: 6, range: [0.90, 1.0], name: 'SYNTHESIS & SANDBOX', subtitle: 'Unified Assemblage', desc: 'Crimson wax seal stamped • Masterwork unified' },
];

// 32 Distinct Mixed-Media Artifacts Definition (Museum-Grade Kinetic Assemblage)
const SHARDS = [
  {
    id: 1,
    name: 'Hero Photographic Film Plate',
    material: 'Neoclassical Dadaist Film // Holographic Kintsugi',
    category: 'Core Artwork',
    color: '#00D2FF',
    w: 290,
    h: 180,
    zIndex: 12,
    startP: 0.16,
    endP: 0.46,
    target: { x: 0, y: -65, rotate: -1.2, scale: 1 },
    relOffset: { x: -0.05, y: -1.3, rot: -40 },
  },
  {
    id: 2,
    name: 'Vintage Newsprint Header Banner',
    material: 'Aged Newsprint // Swiss Grotesque',
    category: 'Typography',
    color: '#CCFF00',
    w: 410,
    h: 32,
    zIndex: 25,
    startP: 0.42,
    endP: 0.65,
    target: { x: 0, y: -270, rotate: 0, scale: 1 },
    relOffset: { x: -1.2, y: -1.1, rot: -55 },
  },
  {
    id: 3,
    name: '24-Point Gold Foil Craft Seal',
    material: 'Cold-Stamped Metallic Foil',
    category: 'Embossing',
    color: '#FFD700',
    w: 76,
    h: 76,
    zIndex: 30,
    startP: 0.78,
    endP: 0.95,
    target: { x: 150, y: -195, rotate: 14, scale: 1 },
    relOffset: { x: 1.25, y: -1.1, rot: 180 },
  },
  {
    id: 4,
    name: 'Archival Japanese Washi Tape (Top-Left)',
    material: 'Fibrous Japanese Washi Paper // Deckled Edge',
    category: 'Mounting',
    color: '#CCFF00',
    w: 110,
    h: 28,
    zIndex: 35,
    startP: 0.66,
    endP: 0.84,
    target: { x: -145, y: -215, rotate: -22, scale: 1 },
    relOffset: { x: -1.35, y: -0.2, rot: 85 },
  },
  {
    id: 5,
    name: 'Hazard-Striped Masking Tape (Mid-Right)',
    material: 'Cyan Industrial Tape // Crinkled',
    category: 'Mounting',
    color: '#00D2FF',
    w: 95,
    h: 24,
    zIndex: 35,
    startP: 0.7,
    endP: 0.86,
    target: { x: 145, y: 12, rotate: 32, scale: 1 },
    relOffset: { x: 1.3, y: 0.9, rot: -75 },
  },
  {
    id: 6,
    name: 'Editorial Didone Headline Card',
    material: 'High-Contrast Didone Serif',
    category: 'Typography',
    color: '#FFFFFF',
    w: 240,
    h: 50,
    zIndex: 20,
    startP: 0.48,
    endP: 0.72,
    target: { x: -85, y: 45, rotate: -2.5, scale: 1 },
    relOffset: { x: -1.4, y: 0.3, rot: -65 },
  },
  {
    id: 7,
    name: 'CMYK Halftone Pop-Art Dot Matrix',
    material: 'Screenprint Halftone Rosette',
    category: 'Texture',
    color: '#FF5500',
    w: 155,
    h: 110,
    zIndex: 9,
    startP: 0.18,
    endP: 0.38,
    target: { x: 100, y: 25, rotate: 4, scale: 1 },
    relOffset: { x: 1.3, y: -0.4, rot: 55 },
  },
  {
    id: 8,
    name: 'Cybernetic Chronos Artwork Cutout',
    material: 'Torn Cotton Rag Paper // Kala Mandal opt_21',
    category: 'Visual Collage',
    color: '#00D2FF',
    w: 145,
    h: 105,
    zIndex: 22,
    startP: 0.28,
    endP: 0.52,
    target: { x: 105, y: 80, rotate: 5, scale: 1 },
    relOffset: { x: 1.4, y: 0.1, rot: 70 },
  },
  {
    id: 9,
    name: 'Chronometer Iris Lens Aperture',
    material: 'Brass Astrolabe Iris // Golden Ratio Spiral',
    category: 'Optical Geometry',
    color: '#00D2FF',
    w: 86,
    h: 86,
    zIndex: 26,
    startP: 0.34,
    endP: 0.56,
    target: { x: -120, y: 125, rotate: -8, scale: 1 },
    relOffset: { x: -1.25, y: 1.0, rot: -120 },
  },
  {
    id: 10,
    name: 'EAN-13 Barcode & Approval Stamp',
    material: 'Thermal Adhesive Label',
    category: 'Spec Sheet',
    color: '#FFFFFF',
    w: 130,
    h: 44,
    zIndex: 24,
    startP: 0.68,
    endP: 0.85,
    target: { x: -125, y: 230, rotate: 0, scale: 1 },
    relOffset: { x: -1.15, y: 1.25, rot: -40 },
  },
  {
    id: 11,
    name: 'CMYK 6-Tone Density Calibration Bar',
    material: 'Lithographic Test Swatch',
    category: 'Print Tech',
    color: '#CCFF00',
    w: 150,
    h: 20,
    zIndex: 25,
    startP: 0.72,
    endP: 0.88,
    target: { x: 45, y: 232, rotate: 0, scale: 1 },
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
    zIndex: 28,
    startP: 0.52,
    endP: 0.74,
    target: { x: -165, y: 10, rotate: -8, scale: 1 },
    relOffset: { x: -1.45, y: -0.4, rot: -90 },
  },
  {
    id: 13,
    name: 'Precision Crop Marks & Wireframe',
    material: '0.75px Drafting Hairline Film',
    category: 'Grid Architecture',
    color: '#94A3B8',
    w: 420,
    h: 570,
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
    w: 58,
    h: 22,
    zIndex: 38,
    startP: 0.74,
    endP: 0.9,
    target: { x: 52, y: 34, rotate: -36, scale: 1 },
    relOffset: { x: 1.25, y: 0.6, rot: 140 },
  },
  {
    id: 15,
    name: 'Neon Spray-Paint Stencil ("PURE SOUL")',
    material: 'Aerosol Stencil Pigment',
    category: 'Street Art',
    color: '#CCFF00',
    w: 180,
    h: 36,
    zIndex: 27,
    startP: 0.82,
    endP: 0.95,
    target: { x: -15, y: 175, rotate: -4, scale: 1 },
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
    zIndex: 18,
    startP: 0.5,
    endP: 0.72,
    target: { x: -135, y: -145, rotate: -5, scale: 1 },
    relOffset: { x: -1.3, y: -0.8, rot: -80 },
  },
  {
    id: 17,
    name: 'Red Marker Editorial Annotation',
    material: 'Scarlet Ink Script & Pointer Loop',
    category: 'Artist Annotation',
    color: '#FF2453',
    w: 165,
    h: 38,
    zIndex: 32,
    startP: 0.85,
    endP: 0.97,
    target: { x: 20, y: 125, rotate: 2, scale: 1 },
    relOffset: { x: -1.0, y: 1.15, rot: 60 },
  },
  {
    id: 18,
    name: 'Embossed Crimson Wax Seal Stamp',
    material: 'Melted Burgundy Sealing Wax',
    category: 'Artist Seal',
    color: '#D91438',
    w: 54,
    h: 54,
    zIndex: 36,
    startP: 0.88,
    endP: 0.99,
    target: { x: 160, y: 215, rotate: -12, scale: 1 },
    relOffset: { x: 1.35, y: 1.25, rot: -180 },
  },
  {
    id: 19,
    name: 'Golden Ratio Radial Protractor Arc',
    material: 'Drafting Film Blueprint',
    category: 'Geometry',
    color: '#00D2FF',
    w: 140,
    h: 140,
    zIndex: 7,
    startP: 0.1,
    endP: 0.32,
    target: { x: 115, y: -60, rotate: 16, scale: 1 },
    relOffset: { x: 1.2, y: -1.2, rot: 120 },
  },
  {
    id: 20,
    name: 'Gallery Colophon & Signature Strip',
    material: 'Archival Museum Placard',
    category: 'Colophon',
    color: '#FFFFFF',
    w: 390,
    h: 28,
    zIndex: 28,
    startP: 0.9,
    endP: 1.0,
    target: { x: 0, y: 275, rotate: 0, scale: 1 },
    relOffset: { x: 0, y: 1.45, rot: 0 },
  },
  {
    id: 21,
    name: 'Kala Mandal Poster Fragment A',
    material: 'Authentic Swiss Typographic Poster // opt_05',
    category: 'Visual Collage',
    color: '#FF4500',
    w: 135,
    h: 100,
    zIndex: 14,
    startP: 0.22,
    endP: 0.46,
    target: { x: -125, y: -65, rotate: -6, scale: 1 },
    relOffset: { x: -1.4, y: -0.9, rot: 65 },
  },
  {
    id: 22,
    name: 'Kala Mandal Poster Fragment B',
    material: 'Deconstructivist Art Print // opt_12',
    category: 'Visual Collage',
    color: '#FF70A6',
    w: 135,
    h: 105,
    zIndex: 16,
    startP: 0.26,
    endP: 0.50,
    target: { x: 125, y: -130, rotate: 8, scale: 1 },
    relOffset: { x: 1.3, y: -1.3, rot: -75 },
  },
  {
    id: 23,
    name: 'Kala Mandal Poster Fragment C',
    material: 'Constructivist Poster Print // opt_01',
    category: 'Visual Collage',
    color: '#CCFF00',
    w: 125,
    h: 92,
    zIndex: 19,
    startP: 0.32,
    endP: 0.54,
    target: { x: -45, y: 105, rotate: -4, scale: 1 },
    relOffset: { x: -0.8, y: 1.2, rot: -45 },
  },
  {
    id: 24,
    name: 'Artist Persona Pop-Art Cutout',
    material: 'Vaibhav Tiwari Halftone Silhouette Cutout',
    category: 'Artist Identity',
    color: '#CCFF00',
    w: 110,
    h: 140,
    zIndex: 23,
    startP: 0.38,
    endP: 0.60,
    target: { x: -55, y: -20, rotate: 2, scale: 1 },
    relOffset: { x: -1.1, y: 0.5, rot: 50 },
  },
  {
    id: 25,
    name: 'Photographic Filmstrip Negative',
    material: 'Horizontal 35mm Frame Negative // artwork-w',
    category: 'Photography',
    color: '#00D2FF',
    w: 140,
    h: 55,
    zIndex: 21,
    startP: 0.42,
    endP: 0.66,
    target: { x: 110, y: 165, rotate: 6, scale: 1 },
    relOffset: { x: 1.2, y: 1.1, rot: -60 },
  },
  {
    id: 26,
    name: 'Yellow Acid Drafting Tape',
    material: 'Industrial Drafting Masking Tab',
    category: 'Mounting',
    color: '#FFE600',
    w: 80,
    h: 22,
    zIndex: 34,
    startP: 0.65,
    endP: 0.82,
    target: { x: 45, y: -148, rotate: 14, scale: 1 },
    relOffset: { x: 0.6, y: -1.2, rot: -80 },
  },
  {
    id: 27,
    name: 'Translucent Vellum Catalog Label',
    material: 'Drafting Vellum Archive Strip',
    category: 'Spec Sheet',
    color: '#FFFFFF',
    w: 110,
    h: 30,
    zIndex: 26,
    startP: 0.55,
    endP: 0.76,
    target: { x: 145, y: -50, rotate: -3, scale: 1 },
    relOffset: { x: 1.4, y: -0.2, rot: 40 },
  },
  {
    id: 28,
    name: 'Metallic Red Thumbtack / Pin',
    material: 'Lacquered Steel Drawing Pin',
    category: 'Tactile Fastener',
    color: '#FF2453',
    w: 24,
    h: 24,
    zIndex: 40,
    startP: 0.76,
    endP: 0.92,
    target: { x: 160, y: -170, rotate: 0, scale: 1 },
    relOffset: { x: 1.5, y: -1.4, rot: 180 },
  },
  {
    id: 29,
    name: 'Japanese Red Hanko Seal ("वैभव")',
    material: 'Carved Vermilion Cinnabar Chop',
    category: 'Artist Seal',
    color: '#FF2453',
    w: 38,
    h: 38,
    zIndex: 35,
    startP: 0.86,
    endP: 0.98,
    target: { x: -30, y: 222, rotate: 4, scale: 1 },
    relOffset: { x: -0.6, y: 1.3, rot: -90 },
  },
  {
    id: 30,
    name: 'Kala Mandal Poster Fragment D',
    material: 'Typography Artwork Print // opt_28',
    category: 'Visual Collage',
    color: '#FFB800',
    w: 115,
    h: 82,
    zIndex: 15,
    startP: 0.24,
    endP: 0.48,
    target: { x: 65, y: -205, rotate: -7, scale: 1 },
    relOffset: { x: 0.8, y: -1.4, rot: 75 },
  },
  {
    id: 31,
    name: 'Masking Tape Deckled Strip',
    material: 'Kraft Paper Packaging Tape',
    category: 'Mounting',
    color: '#D4B996',
    w: 85,
    h: 22,
    zIndex: 33,
    startP: 0.75,
    endP: 0.90,
    target: { x: -145, y: 252, rotate: -10, scale: 1 },
    relOffset: { x: -1.3, y: 1.4, rot: 45 },
  },
  {
    id: 32,
    name: 'Chromatic Registration Target Crosshair',
    material: 'Lithographic 4-Color Target Film',
    category: 'Grid Architecture',
    color: '#00D2FF',
    w: 44,
    h: 44,
    zIndex: 11,
    startP: 0.12,
    endP: 0.32,
    target: { x: -170, y: -225, rotate: 45, scale: 1 },
    relOffset: { x: -1.5, y: -1.2, rot: -120 },
  },
];

export default function MixedMediaAssembly() {
  const runwayRef = useRef(null);
  const stageRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [hoveredShard, setHoveredShard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // ── DRAGGABLE REMIX STATE ──
  // Allows user to freely drag any of the 32 shards once assembled!
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

      const step = Math.floor(p * 32);
      if (step !== lastReportedStep) {
        lastReportedStep = step;
        if (step === 32) {
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
            const nextStep = Math.min(1, Math.round(targetProgress * 32 + 1) / 32);
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
            const prevStep = Math.max(0, Math.round(targetProgress * 32 - 1) / 32);
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

  const isFullAssembly = assembledCount === 32;
  const isDraggableUnlocked = scrollProgress >= 0.88 || isFullAssembly;

  // Active Creation Phase
  const currentPhase = PHASES.find(
    (ph) => scrollProgress >= ph.range[0] && scrollProgress <= ph.range[1]
  ) || PHASES[PHASES.length - 1];

  // Dynamic Curatorial Phase HUD Logic
  const getPhaseDetails = () => {
    // 1. When actively dragging an artifact
    if (activeDragId !== null) {
      const draggedShard = SHARDS.find((s) => s.id === activeDragId);
      return {
        badge: 'INTERACTIVE REMIX',
        title: `REPOSITIONING SHARD 0${activeDragId}`,
        desc: `Moving "${draggedShard?.name || 'Artifact'}" • Release anywhere on board`,
        glow: true,
      };
    }

    // 2. When in Phase 6 / Masterwork Unified
    if (scrollProgress >= 0.90 || isFullAssembly) {
      const displacedCount = Object.keys(dragOffsets).length;
      if (displacedCount > 0) {
        return {
          badge: 'CUSTOM COLLAGE',
          title: 'SANDBOX REMIX ACTIVE',
          desc: `${displacedCount} artifact${displacedCount > 1 ? 's' : ''} rearranged • Drag freely or click Reset`,
          glow: true,
        };
      }
      return {
        badge: 'PHASE 6/6: COMPLETE',
        title: 'SYNTHESIS UNIFIED',
        desc: 'All 32 artifacts anchored in masterwork harmony • Drag & remix unlocked',
        glow: true,
      };
    }

    // 3. Intermediate convergence phases (1 to 5) with live count
    return {
      badge: `PHASE ${currentPhase.id}/6: ${currentPhase.subtitle.toUpperCase()}`,
      title: currentPhase.name,
      desc: `${currentPhase.desc} (${assembledCount}/32 docked)`,
      glow: false,
    };
  };

  const phaseDetails = getPhaseDetails();

  // Responsive scale factor for mobile screens (fits both width and height)
  const posterScale = isMobile
    ? Math.min(0.76, (windowDimensions.w - 24) / 460, (windowDimensions.h - 130) / 620)
    : 1;

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
        background: 'transparent',
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
          background: 'radial-gradient(circle at 50% 50%, rgba(204, 255, 0, 0.08) 0%, rgba(0, 210, 255, 0.04) 45%, transparent 70%)',
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

          {/* Center Dynamic Curatorial Phase HUD */}
          <div
            style={{
              display: isMobile ? 'none' : 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '6px 20px',
              borderRadius: '999px',
              background: phaseDetails.glow ? 'rgba(10, 16, 12, 0.94)' : 'rgba(13, 17, 26, 0.88)',
              border: phaseDetails.glow ? '1.5px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: phaseDetails.glow ? '0 0 24px rgba(204, 255, 0, 0.28), 0 8px 24px rgba(0,0,0,0.6)' : '0 8px 24px rgba(0,0,0,0.45)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '9px', fontWeight: 900, color: '#CCFF00', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {phaseDetails.badge}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>•</span>
              <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '11px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                {phaseDetails.title}
              </span>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '9.5px', color: phaseDetails.glow ? '#E2E8F0' : '#94A3B8', marginTop: '1px' }}>
              {phaseDetails.desc}
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
                {assembledCount}/32 {isFullAssembly ? 'UNIFIED ✦' : 'CONVERGING'}
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
                THE 32 KINETIC MIXED-MEDIA COMPONENTS (DRAGGABLE & MOVABLE!)
                ═══════════════════════════════════════════════════════════════ */}
            {SHARDS.map((shard) => {
              const rawT = (scrollProgress - shard.startP) / (shard.endP - shard.startP);
              const t = Math.max(0, Math.min(1, rawT));
              const ease = 1 - Math.pow(1 - t, 3);

              // Extreme Viewport Origins with mobile containment
              const spreadFactor = isMobile ? 0.42 : 1;
              const originX = shard.relOffset.x * (halfW * spreadFactor + 36);
              const originY = shard.relOffset.y * (halfH * spreadFactor + 36);
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
                    touchAction: isDraggableUnlocked && !isMobile ? 'none' : 'auto', // Never block page scroll on mobile touch
                    willChange: 'transform, opacity',
                    filter: isBeingDragged ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.9))' : 'none',
                    transition: isBeingDragged ? 'none' : 'box-shadow 0.2s ease, filter 0.2s ease',
                  }}
                  title={isDraggableUnlocked ? `[ ${shard.id}/32 ] ${shard.name} • Click & Drag to Move!` : `[ ${shard.id}/32 ] ${shard.name}`}
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
                      SHARD CONTENT RENDERING (32 BESPOKE ARTIFACTS)
                      ───────────────────────────────────────────────────────── */}
                  {/* SHARD 1: Hero Photographic Film Plate */}
                  {shard.id === 1 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#040609',
                        border: '2px solid rgba(255, 255, 255, 0.35)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 22px 50px rgba(0, 0, 0, 0.85), 0 0 25px rgba(204, 255, 0, 0.18)',
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
                          src="/assets/text_image/dadaist-hero.jpg"
                          alt="Museum-grade Dadaist Masterwork by Vaibhav"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 65%, rgba(4, 6, 9, 0.75) 100%)' }} />
                        <div style={{ position: 'absolute', bottom: '6px', left: '8px', fontFamily: "'Space Grotesk', monospace", fontSize: '9px', fontWeight: 800, color: '#FFFFFF', textShadow: '0 2px 4px #000', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>HOWVAIBHAV ARCHIVE // FRAME 24A</span>
                          <span style={{ color: '#CCFF00', fontSize: '7px' }}>• EMULSION 5219</span>
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
                        background: 'radial-gradient(circle at 35% 30%, #FFFDE0 0%, #FFD700 35%, #C99700 70%, #7A5500 100%)',
                        border: '2px solid #FFF8CC',
                        boxShadow: '0 12px 28px rgba(255, 184, 0, 0.5), inset 0 2px 5px rgba(255,255,255,0.9), inset 0 -3px 6px rgba(0,0,0,0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#382200',
                        position: 'relative',
                      }}
                    >
                      <div style={{ position: 'absolute', inset: '4px', borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.7)' }} />
                      <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '18px', fontWeight: 900, lineHeight: 1, textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}>HV</span>
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '5.5px', fontWeight: 900, letterSpacing: '0.14em', marginTop: '2px', opacity: 0.9 }}>
                        ★ ATELIER ★
                      </span>
                    </div>
                  )}

                  {/* SHARD 4: Archival Japanese Washi Tape */}
                  {shard.id === 4 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(204, 255, 0, 0.85) 0%, rgba(220, 255, 77, 0.9) 50%, rgba(204, 255, 0, 0.85) 100%)',
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 6px)',
                        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.45)',
                        clipPath: 'polygon(0% 4%, 3% 0%, 97% 2%, 100% 94%, 97% 98%, 2% 96%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 10px',
                        borderTop: '1px dashed rgba(0, 0, 0, 0.25)',
                        borderBottom: '1px dashed rgba(0, 0, 0, 0.25)',
                        position: 'relative',
                      }}
                    >
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7.5px', fontWeight: 900, color: '#07080B', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
                        KALA MANDAL // ARCHIVE № 09 ✦
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
                        background: 'rgba(8, 11, 18, 0.96)',
                        borderLeft: '4px solid #CCFF00',
                        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '0 6px 6px 0',
                        padding: '6px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxShadow: '0 10px 28px rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <div style={{ fontFamily: "'Italiana', 'Cinzel Decorative', 'Cinzel', serif", fontSize: '16px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em', lineHeight: 1.15 }}>
                        CHAOS INTO SYSTEM
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7.5px', color: '#94A3B8', marginTop: '3px', letterSpacing: '0.08em' }}>
                        THE DUALITY OF INTUITION &amp; CODE
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
                        border: '2.5px solid #FFFFFF',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        boxShadow: '0 14px 32px rgba(0,0,0,0.75), 0 0 16px rgba(0, 210, 255, 0.25)',
                        position: 'relative',
                      }}
                    >
                      <img
                        src="/assets/Kala%20Mandal/optimized/opt_21.jpg"
                        alt="Cybernetic Chronos Mixed Media Fragment by Vaibhav"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                      />
                      <div style={{ position: 'absolute', top: '5px', left: '5px', background: 'rgba(0,0,0,0.82)', color: '#00D2FF', fontFamily: "'Space Grotesk', monospace", fontSize: '7px', fontWeight: 900, padding: '2px 5px', borderRadius: '2px', border: '1px solid rgba(0, 210, 255, 0.4)' }}>
                        SHARD 08 // CHRONOS &amp; CODE
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
                        boxShadow: '0 10px 28px rgba(0, 210, 255, 0.5), inset 0 0 12px rgba(0,0,0,0.85)',
                      }}
                    >
                      <img
                        src="/assets/text_image/dadaist-lens.jpg"
                        alt="Chronometer Iris Lens Aperture by Vaibhav"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                      />
                      <div style={{ position: 'absolute', inset: '3px', border: '1px dashed rgba(0, 210, 255, 0.65)', borderRadius: '50%' }} />
                      <span style={{ position: 'absolute', top: '3px', left: '50%', transform: 'translateX(-50%)', fontFamily: "'Space Grotesk', monospace", fontSize: '6.5px', color: '#00D2FF', fontWeight: 900, textShadow: '0 1px 3px #000' }}>
                        φ 1.618
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
                        background: 'radial-gradient(circle at 40% 35%, #FFEBA0 0%, #E6A100 50%, #8A5200 100%)',
                        border: '2px solid #FFF8D6',
                        boxShadow: '0 10px 26px rgba(230, 161, 0, 0.5), inset 0 2px 5px rgba(255,255,255,0.8), inset 0 -3px 6px rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2E1A00',
                      }}
                    >
                      <span style={{ fontFamily: "'Rozha One', 'Noto Serif Devanagari', serif", fontSize: '22px', fontWeight: 400, transform: 'translateY(-2px)', textShadow: '0 1px 2px rgba(255,255,255,0.7)' }}>
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
                      <div
                        style={{
                          background: 'rgba(4, 6, 9, 0.92)',
                          padding: '4px 14px',
                          border: '1.5px solid #CCFF00',
                          borderRadius: '2px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.75), 0 0 16px rgba(204, 255, 0, 0.35)',
                          transform: 'skewX(-8deg)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', system-ui, sans-serif",
                            fontSize: '15px',
                            fontWeight: 900,
                            color: '#CCFF00',
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            textShadow: '0 0 10px #CCFF00, 0 0 24px rgba(204, 255, 0, 0.65)',
                            display: 'block',
                          }}
                        >
                          PURE SOUL
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SHARD 16: Swiss Modernist Typography Spec Card */}
                  {shard.id === 16 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#FAF9F6',
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
                        backgroundSize: '10px 10px',
                        color: '#07080A',
                        borderRadius: '4px',
                        padding: '6px 9px',
                        boxShadow: '0 10px 24px rgba(0,0,0,0.6)',
                        border: '1px solid rgba(0,0,0,0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7.5px', fontWeight: 900, color: '#0F172A' }}>
                          SWISS MATRIX SPEC
                        </span>
                        <span style={{ color: '#FF2453', fontSize: '6px', fontWeight: 900, border: '1px solid #FF2453', padding: '0 3px', borderRadius: '1px' }}>
                          PASS ✦
                        </span>
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '7.5px', lineHeight: 1.25, color: '#334155' }}>
                        Grid: 12-Col Modular Matrix<br />
                        Type: Helvetica &amp; Rozha<br />
                        Paper: 350gsm Heavy Rag
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '6.5px', color: '#64748B' }}>
                        ISO 216 // A2 ARCHIVE № 24
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
                        HOWVAIBHAV STUDIO ARCHIVE // SYNTHESIS N° 32
                      </span>
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '8.5px', color: '#CCFF00', fontWeight: 800 }}>
                        © 2026 VAIBHAV TIWARI
                      </span>
                    </div>
                  )}
                  {/* SHARD 21: Kala Mandal Poster Fragment A (opt_05) */}
                  {shard.id === 21 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#0B0F17',
                        border: '1.5px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        boxShadow: '0 16px 36px rgba(0,0,0,0.85), 0 0 12px rgba(255, 69, 0, 0.25)',
                        position: 'relative',
                      }}
                    >
                      <img
                        src="/assets/Kala%20Mandal/optimized/opt_05.jpg"
                        alt="Kala Mandal Swiss Typographic Poster #05 by Vaibhav"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '4px',
                          left: '4px',
                          background: 'rgba(0, 0, 0, 0.85)',
                          color: '#FF6B4A',
                          fontFamily: "'Space Grotesk', monospace",
                          fontSize: '6.5px',
                          fontWeight: 900,
                          padding: '1px 4px',
                          borderRadius: '2px',
                          letterSpacing: '0.08em',
                          border: '0.75px solid rgba(255, 107, 74, 0.4)',
                        }}
                      >
                        KALA MANDAL // #05
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 70%)',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>
                  )}

                  {/* SHARD 22: Kala Mandal Poster Fragment B (opt_12) */}
                  {shard.id === 22 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#0A0E18',
                        border: '2px solid #FFFFFF',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        boxShadow: '0 16px 38px rgba(0,0,0,0.85), 0 0 16px rgba(255, 112, 166, 0.3)',
                        position: 'relative',
                      }}
                    >
                      <img
                        src="/assets/Kala%20Mandal/optimized/opt_12.jpg"
                        alt="Kala Mandal Brutalist Deconstruction Poster #12 by Vaibhav"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          right: '4px',
                          background: 'rgba(10, 14, 24, 0.9)',
                          color: '#FF70A6',
                          fontFamily: "'Space Grotesk', monospace",
                          fontSize: '6.5px',
                          fontWeight: 800,
                          padding: '2px 5px',
                          borderRadius: '2px',
                          border: '0.75px solid rgba(255, 112, 166, 0.5)',
                        }}
                      >
                        EXHIBIT // #12
                      </div>
                    </div>
                  )}

                  {/* SHARD 23: Kala Mandal Poster Fragment C (opt_01) */}
                  {shard.id === 23 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#0D1117',
                        border: '1.5px solid rgba(204, 255, 0, 0.65)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        boxShadow: '0 14px 34px rgba(0,0,0,0.85), 0 0 15px rgba(204, 255, 0, 0.22)',
                        position: 'relative',
                      }}
                    >
                      <img
                        src="/assets/Kala%20Mandal/optimized/opt_01.jpg"
                        alt="Kala Mandal Constructivist Graphic #01 by Vaibhav"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: '#CCFF00',
                          color: '#000000',
                          fontFamily: "'Space Grotesk', monospace",
                          fontSize: '6.5px',
                          fontWeight: 900,
                          padding: '1px 5px',
                          borderRadius: '2px',
                          letterSpacing: '0.05em',
                        }}
                      >
                        SWISS № 01
                      </div>
                    </div>
                  )}

                  {/* SHARD 24: Artist Persona Pop-Art Cutout (Vaibhav Tiwari) */}
                  {shard.id === 24 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 16px rgba(204, 255, 0, 0.45))',
                      }}
                    >
                      <img
                        src="/assets/vaibhav-hero-cutout.webp"
                        loading="lazy"
                        decoding="async"
                        alt="Vaibhav Tiwari Artist Cutout"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                          pointerEvents: 'none',
                          filter: 'contrast(1.15) brightness(1.05)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'rgba(0, 0, 0, 0.88)',
                          border: '1px solid #CCFF00',
                          borderRadius: '3px',
                          padding: '1px 6px',
                          color: '#CCFF00',
                          fontFamily: "'Space Grotesk', monospace",
                          fontSize: '7px',
                          fontWeight: 900,
                          letterSpacing: '0.12em',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 0 8px rgba(204, 255, 0, 0.5)',
                        }}
                      >
                        VAIBHAV // ARCHITECT
                      </div>
                    </div>
                  )}

                  {/* SHARD 25: Photographic Filmstrip Negative (artwork-w) */}
                  {shard.id === 25 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#040608',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.85), 0 0 14px rgba(0, 210, 255, 0.25)',
                        position: 'relative',
                      }}
                    >
                      {/* 35mm Top Perforation Bar */}
                      <div
                        style={{
                          width: '100%',
                          height: '9px',
                          background: '#0A0D12',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          padding: '0 4px',
                          borderBottom: '0.5px solid rgba(255,255,255,0.15)',
                        }}
                      >
                        {[...Array(8)].map((_, i) => (
                          <div key={i} style={{ width: '4.5px', height: '4px', background: '#FFFFFF', borderRadius: '0.5px', opacity: 0.85 }} />
                        ))}
                      </div>
                      {/* Image Exposure */}
                      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                        <img
                          src="/assets/text_image/artwork-w.jpg"
                          alt="35mm Film Exposure Artwork-W by Vaibhav"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '2px',
                            left: '4px',
                            color: '#00D2FF',
                            fontFamily: "'Space Grotesk', monospace",
                            fontSize: '6px',
                            fontWeight: 800,
                            background: 'rgba(0,0,0,0.7)',
                            padding: '0 3px',
                          }}
                        >
                          SAFETY FILM ▶ 28A
                        </div>
                      </div>
                      {/* 35mm Bottom Perforation Bar */}
                      <div
                        style={{
                          width: '100%',
                          height: '9px',
                          background: '#0A0D12',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          padding: '0 4px',
                          borderTop: '0.5px solid rgba(255,255,255,0.15)',
                        }}
                      >
                        {[...Array(8)].map((_, i) => (
                          <div key={i} style={{ width: '4.5px', height: '4px', background: '#FFFFFF', borderRadius: '0.5px', opacity: 0.85 }} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SHARD 26: Yellow Acid Drafting Tape */}
                  {shard.id === 26 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #FFE600 0%, #FFCC00 100%)',
                        opacity: 0.9,
                        clipPath: 'polygon(0% 4%, 4% 0%, 96% 2%, 100% 92%, 97% 100%, 3% 98%, 0% 88%)',
                        boxShadow: '0 6px 14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderLeft: '1px dashed rgba(0,0,0,0.25)',
                        borderRight: '1px dashed rgba(0,0,0,0.25)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', monospace",
                          fontSize: '7.5px',
                          color: '#382A00',
                          fontWeight: 800,
                          letterSpacing: '0.12em',
                        }}
                      >
                        // ARCHIVAL_TAPE //
                      </span>
                    </div>
                  )}

                  {/* SHARD 27: Translucent Vellum Catalog Label */}
                  {shard.id === 27 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.14)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        borderRadius: '2px',
                        padding: '3px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 8px 18px rgba(0,0,0,0.6)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00D2FF', boxShadow: '0 0 6px #00D2FF' }} />
                        <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7px', color: '#E2E8F0', fontWeight: 700, letterSpacing: '0.06em' }}>
                          CATALOG // 032
                        </span>
                      </div>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '8px', color: '#FFFFFF', fontStyle: 'italic' }}>
                        Vaibhav Studio
                      </span>
                    </div>
                  )}

                  {/* SHARD 28: Metallic Red Thumbtack / Pin */}
                  {shard.id === 28 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 35%, #FF859A 0%, #FF2453 45%, #9E0024 85%, #4A0010 100%)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.9), 0 0 8px rgba(255, 36, 83, 0.6), inset 0 1px 2px rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.85)',
                          boxShadow: '0 0 4px #FFFFFF',
                          transform: 'translate(-2px, -2px)',
                        }}
                      />
                    </div>
                  )}

                  {/* SHARD 29: Japanese Red Hanko Seal ("वैभव") */}
                  {shard.id === 29 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        border: '2px solid #FF2453',
                        borderRadius: '3px',
                        background: 'rgba(255, 36, 83, 0.08)',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.7), inset 0 0 10px rgba(255, 36, 83, 0.25)',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          border: '1px dashed rgba(255, 36, 83, 0.55)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Rozha One', 'Yatra One', serif",
                            fontSize: '12px',
                            color: '#FF2453',
                            fontWeight: 900,
                            lineHeight: 1,
                            letterSpacing: '0.04em',
                            filter: 'drop-shadow(0 0 4px rgba(255, 36, 83, 0.5))',
                          }}
                        >
                          वैभव
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SHARD 30: Kala Mandal Poster Fragment D (opt_28) */}
                  {shard.id === 30 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#0B0D13',
                        border: '1.5px solid rgba(255, 184, 0, 0.65)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        boxShadow: '0 14px 32px rgba(0,0,0,0.85), 0 0 14px rgba(255, 184, 0, 0.25)',
                        position: 'relative',
                      }}
                    >
                      <img
                        src="/assets/Kala%20Mandal/optimized/opt_28.jpg"
                        alt="Kala Mandal Typographic Print #28 by Vaibhav"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '3px',
                          left: '3px',
                          background: 'rgba(0,0,0,0.85)',
                          color: '#FFB800',
                          fontFamily: "'Space Grotesk', monospace",
                          fontSize: '6.5px',
                          fontWeight: 800,
                          padding: '1px 4px',
                          borderRadius: '2px',
                          border: '0.5px solid rgba(255, 184, 0, 0.5)',
                        }}
                      >
                        KM-28 // ARCHIVE
                      </div>
                    </div>
                  )}

                  {/* SHARD 31: Kraft Packaging Tape Strip */}
                  {shard.id === 31 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #D4B996 0%, #C4A57E 50%, #D4B996 100%)',
                        opacity: 0.88,
                        clipPath: 'polygon(0% 0%, 100% 2%, 97% 98%, 2% 100%)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.06) 4px, rgba(0,0,0,0.06) 5px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', monospace",
                            fontSize: '7px',
                            color: '#5C3E1B',
                            fontWeight: 800,
                            letterSpacing: '0.14em',
                          }}
                        >
                          // ARCHIVE FRAGILE //
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SHARD 32: Chromatic Registration Target Crosshair */}
                  {shard.id === 32 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        filter: 'drop-shadow(0 0 8px rgba(0, 210, 255, 0.4))',
                      }}
                    >
                      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                        <circle cx="22" cy="22" r="19" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 2" />
                        <circle cx="22" cy="22" r="11" stroke="#CCFF00" strokeWidth="1" />
                        <circle cx="22" cy="22" r="3" fill="#FF2453" />
                        <line x1="22" y1="0" x2="22" y2="44" stroke="#FFFFFF" strokeWidth="1" />
                        <line x1="0" y1="22" x2="44" y2="22" stroke="#FFFFFF" strokeWidth="1" />
                        <text x="24" y="11" fill="#00D2FF" fontSize="5" fontFamily="'Space Grotesk', monospace">REG.4C</text>
                      </svg>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
