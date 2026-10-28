import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ART_CIRCLES_PROJECTS } from './artCirclesData';
import { soundFX } from './soundFX';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * कला मंडल (KALA MANDAL) — DUAL REVOLVING ORBITAL SHOWCASE
 * ─────────────────────────────────────────────────────────────────────────────
 * Art.com "Art Circles" Dual Rotational Arena with Full-Bleed Flank Utilization:
 *  - Massive dual revolving gear wheels (Left: Explanations, Right: Design Plates).
 *  - Full horizontal screen span: tiles wrap up to 135°, deeply populating the left & right flanks.
 *  - Left Space: Concept Matrix Telemetry Dial + Interactive Category Filter Tabs.
 *  - Right Space: Visual Gallery Telemetry Dial + 20-Exhibit Progress Matrix & 4K Spec.
 *  - Center Focal Stage: Side-by-side active pair:
 *      * Left: Active Concept / Explanation Card (with client caption)
 *      * Center: Curatorial Text Block with top & bottom framed rules + [ VIEW DOSSIER ↗ ]
 *      * Right: Active Design Artwork Plate (with glowing border & zoom)
 *  - Mechanical bezel tick marks & coordinate guides in the background SVG.
 *  - Active wheel resistance (1 scroll = 1 design advance).
 */

const CATEGORIES = ['ALL', 'SURREALISM', 'EDITORIAL', 'POSTERS', 'PHOTOGRAPHY', 'TYPOGRAPHY'];

export default function ArtCirclesOrbit() {
  const runwayRef = useRef(null);
  const stageRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [modalProject, setModalProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const total = ART_CIRCLES_PROJECTS.length; // 35 exhibits
  const stepAngle = 360 / total;             // 18 degrees per tile

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsMobile(w < 960);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth 60fps Interpolated Index for Fluid Circular Gear Rotation
  useEffect(() => {
    let animId;
    const lerpSpeed = 0.16;

    const animate = () => {
      setActiveIndex((prev) => {
        const diff = targetIndex - prev;
        if (Math.abs(diff) < 0.001) return targetIndex;
        return prev + diff * lerpSpeed;
      });
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [targetIndex]);

  // Navigate explicitly to a given index & sync document scroll position
  const goToIndex = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(total - 1, idx));
    setTargetIndex(clamped);
    try { soundFX.playTick(); } catch {}

    if (runwayRef.current) {
      const rect = runwayRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const sectionTop = currentScrollY + rect.top;
      const scrollableDistance = runwayRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        const targetScrollY = sectionTop + (clamped / (total - 1)) * scrollableDistance;
        window.scrollTo({ top: targetScrollY, behavior: 'instant' });
      }
    }
  }, [total]);

  // Intelligently cycle through projects in selected category according to each design
  const filterByCategory = useCallback((cat) => {
    setSelectedCategory(cat);
    try { soundFX.playSnap(); } catch {}
    if (cat === 'ALL') {
      goToIndex(0);
      return;
    }

    const matchingIndices = [];
    ART_CIRCLES_PROJECTS.forEach((p, idx) => {
      if (p.category.toUpperCase() === cat) {
        matchingIndices.push(idx);
      }
    });

    if (matchingIndices.length > 0) {
      const cur = Math.round(targetIndex);
      // Find the next project in this category after current
      const next = matchingIndices.find((idx) => idx > cur);
      if (next !== undefined) {
        goToIndex(next);
      } else {
        // Cycle back to the first one in this category
        goToIndex(matchingIndices[0]);
      }
    }
  }, [goToIndex, targetIndex]);

  // Passive Page Scroll Listener
  useEffect(() => {
    let lastSnapIdx = -1;

    const handleScroll = () => {
      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const scrollableDistance = runwayRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      if (scrolled < 0) {
        setTargetIndex(0);
        return;
      }
      if (scrolled > scrollableDistance) {
        setTargetIndex(total - 1);
        return;
      }

      const progress = scrolled / scrollableDistance;
      const newTarget = progress * (total - 1);
      setTargetIndex(newTarget);

      const rounded = Math.round(newTarget);
      if (rounded !== lastSnapIdx && rounded >= 0 && rounded < total) {
        lastSnapIdx = rounded;
        try { soundFX.playTick(); } catch {}
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [total]);

  // Active Wheel Step-Controller: 1 Scroll Gesture = 1 Next Design Advance
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    let accumulatedDelta = 0;
    let wheelCooldown = false;

    const handleWheel = (e) => {
      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const isPinned = rect.top <= 25 && rect.bottom >= window.innerHeight - 25;

      if (!isPinned) return; // Not yet pinned: let page scroll normally into view

      if (e.deltaY > 0) {
        if (targetIndex < total - 1) {
          e.preventDefault();
          accumulatedDelta += e.deltaY;
          if (accumulatedDelta >= 20 && !wheelCooldown) {
            wheelCooldown = true;
            accumulatedDelta = 0;
            const nextIdx = Math.min(total - 1, Math.round(targetIndex) + 1);
            goToIndex(nextIdx);
            setTimeout(() => { wheelCooldown = false; }, 220);
          }
        }
      } else if (e.deltaY < 0) {
        if (targetIndex > 0) {
          e.preventDefault();
          accumulatedDelta += e.deltaY;
          if (accumulatedDelta <= -20 && !wheelCooldown) {
            wheelCooldown = true;
            accumulatedDelta = 0;
            const prevIdx = Math.max(0, Math.round(targetIndex) - 1);
            goToIndex(prevIdx);
            setTimeout(() => { wheelCooldown = false; }, 220);
          }
        }
      }
    };

    stageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => stageEl.removeEventListener('wheel', handleWheel);
  }, [targetIndex, total, goToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalProject) {
        if (e.key === 'Escape') setModalProject(null);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToIndex(Math.round(targetIndex) + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToIndex(Math.round(targetIndex) - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetIndex, modalProject, goToIndex]);

  // Touch swipe handling
  const touchStartY = useRef(0);
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    if (e.changedTouches.length === 1) {
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(deltaY) > 35) {
        if (deltaY < 0) {
          if (targetIndex < total - 1) goToIndex(Math.round(targetIndex) + 1);
        } else {
          if (targetIndex > 0) goToIndex(Math.round(targetIndex) - 1);
        }
      }
    }
  };

  const currentProject = ART_CIRCLES_PROJECTS[Math.round(activeIndex)] || ART_CIRCLES_PROJECTS[0];

  // Derive category counts and current design's position within its category
  const currentCat = (currentProject.category || '').toUpperCase();
  const categoryProjects = ART_CIRCLES_PROJECTS.filter(
    (p) => (p.category || '').toUpperCase() === currentCat
  );
  const currentCatIndex = Math.max(0, categoryProjects.findIndex((p) => p.id === currentProject.id));
  const totalInCat = categoryProjects.length;

  const CATEGORY_COUNTS = {
    ALL: total,
    SURREALISM: ART_CIRCLES_PROJECTS.filter((p) => p.category.toUpperCase() === 'SURREALISM').length,
    EDITORIAL: ART_CIRCLES_PROJECTS.filter((p) => p.category.toUpperCase() === 'EDITORIAL').length,
    POSTERS: ART_CIRCLES_PROJECTS.filter((p) => p.category.toUpperCase() === 'POSTERS').length,
    PHOTOGRAPHY: ART_CIRCLES_PROJECTS.filter((p) => p.category.toUpperCase() === 'PHOTOGRAPHY').length,
    TYPOGRAPHY: ART_CIRCLES_PROJECTS.filter((p) => p.category.toUpperCase() === 'TYPOGRAPHY').length,
  };

  // Mathematical Geometry for Wide Horizontal Arena Utilization
  const focalXOffset = isMobile
    ? Math.max(120, Math.min(170, windowWidth * 0.32))
    : Math.max(250, Math.min(340, windowWidth * 0.22));

  // Generous circle radius sweeping across the full width of the screen
  const orbitRadius = isMobile
    ? Math.max(280, Math.min(380, windowWidth * 0.72))
    : Math.max(540, Math.min(680, windowWidth * 0.44));

  const leftCircleCenterX = -focalXOffset - orbitRadius;
  const rightCircleCenterX = focalXOffset + orbitRadius;

  // Active rotation angle for telemetric dials
  const currentAngleDeg = Math.round(activeIndex * stepAngle);

  return (
    <div
      ref={runwayRef}
      className="art-circles-runway"
      style={{
        position: 'relative',
        width: '100%',
        height: `${total * 14 + 100}vh`,
        minHeight: '340vh',
        background: 'transparent',
      }}
      aria-label="Art Circles Dual Orbital Showcase"
    >
      <style>{`
        .orbit-tile {
          transition: filter 0.25s ease, transform 0.1s linear, box-shadow 0.25s ease;
          user-select: none;
          will-change: transform, opacity;
        }
        .orbit-tile:hover {
          filter: brightness(1.3) drop-shadow(0 0 20px rgba(0, 210, 255, 0.75)) !important;
          cursor: pointer;
        }
        .center-focal-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
        }
        .center-focal-card:hover {
          transform: translateY(-3px) scale(1.02);
          cursor: pointer;
        }
      `}</style>

      {/* ── STICKY VIEWPORT CONTAINER ── */}
      <div
        ref={stageRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          minHeight: '620px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 16px 14px',
          zIndex: 12,
        }}
      >
        {/* ── TOP SECTION HEADER: CLEAN "कला मंडल" (NO REDUNDANT EYEBROWS) ── */}
        <header
          style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 30,
            marginTop: '2px',
            userSelect: 'none',
          }}
        >
          {/* Artistic Hindi Masthead Title: "कला मंडल" */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2
              style={{
                fontFamily: "'Rozha One', 'Noto Serif Devanagari', 'Cinzel Decorative', serif",
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: 400,
                letterSpacing: '0.04em',
                margin: '0 0 2px',
                lineHeight: 1.15,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? '10px' : '16px',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 50%, #CCFF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 28px rgba(204, 255, 0, 0.22))',
              }}
            >
              <span style={{ fontSize: isMobile ? '16px' : '22px', color: '#CCFF00', WebkitTextFillColor: '#CCFF00', opacity: 0.85, transform: 'translateY(-2px)' }}>✦</span>
              <span>कला मंडल</span>
              <span style={{ fontSize: isMobile ? '16px' : '22px', color: '#CCFF00', WebkitTextFillColor: '#CCFF00', opacity: 0.85, transform: 'translateY(-2px)' }}>✦</span>
            </h2>

          </div>
        </header>

        {/* ── CENTRAL ORBITAL ARENA (FULL-BLEED SCREEN SPAN) ── */}
        <div
          className="art-circles-arena"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1680px', // Expanded width to fully utilize left and right flanks
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: isMobile ? '380px' : '480px',
            overflow: 'hidden',
          }}
        >
          {/* ═══════════════════════════════════════════════════════════════
              LEFT FLANK TELEMETRY: CONCEPT MATRIX & CATEGORY FILTER
              (Gracefully populates left empty space with museum telemetry)
              ═══════════════════════════════════════════════════════════════ */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                left: 'clamp(14px, 2.5vw, 42px)',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                pointerEvents: 'auto',
                maxWidth: '210px',
              }}
            >
              {/* Telemetry Header: Tailored directly to EACH Active Design */}
              <div
                style={{
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: 'rgba(11, 15, 25, 0.88)',
                  border: `1.5px solid ${currentProject.color}45`,
                  boxShadow: `0 8px 24px rgba(0,0,0,0.65), 0 0 18px ${currentProject.color}15`,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: currentProject.color,
                        boxShadow: `0 0 8px ${currentProject.color}`,
                        transition: 'background 0.25s ease, box-shadow 0.25s ease',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: '9px',
                        fontWeight: 900,
                        color: currentProject.color,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        transition: 'color 0.25s ease',
                      }}
                    >
                      EXHIBIT {currentProject.number} // {currentProject.category.toUpperCase()}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: '8px',
                      color: '#94A3B8',
                      fontWeight: 700,
                    }}
                  >
                    {currentCatIndex + 1}/{totalInCat}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '11.5px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.25,
                  }}
                  title={currentProject.title}
                >
                  {currentProject.title.split('//')[0].trim()}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '4px',
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '8px',
                    color: '#64748B',
                  }}
                >
                  <span>ROTATION: -{currentAngleDeg}°</span>
                  <span style={{ color: currentProject.color, fontWeight: 700 }}>
                    YEAR {currentProject.year}
                  </span>
                </div>
              </div>

              {/* Quick Category Jump & Cycle Index (Strictly 1 Active Category per Design) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px' }}>
                  <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7.5px', color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Curatorial Index
                  </span>
                  <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7px', color: '#475569', letterSpacing: '0.04em' }}>
                    CYCLE ON CLICK
                  </span>
                </div>

                {CATEGORIES.map((cat) => {
                  const isCatActive = cat === currentCat;
                  const count = CATEGORY_COUNTS[cat] || 0;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => filterByCategory(cat)}
                      style={{
                        background: isCatActive
                          ? `${currentProject.color}20`
                          : 'rgba(255, 255, 255, 0.03)',
                        color: isCatActive ? '#FFFFFF' : '#94A3B8',
                        border: isCatActive
                          ? `1.5px solid ${currentProject.color}`
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: '9px',
                        fontWeight: isCatActive ? 900 : 700,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: isCatActive ? `0 0 12px ${currentProject.color}35` : 'none',
                      }}
                      title={cat === 'ALL' ? 'Jump to Exhibit 01' : `Cycle through ${cat} exhibits`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isCatActive && (
                          <span
                            style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: currentProject.color,
                              boxShadow: `0 0 6px ${currentProject.color}`,
                            }}
                          />
                        )}
                        <span>{cat}</span>
                      </div>
                      <span
                        style={{
                          fontSize: '7.5px',
                          fontFamily: "'Space Grotesk', monospace",
                          fontWeight: 700,
                          opacity: isCatActive ? 1 : 0.45,
                          color: isCatActive ? currentProject.color : '#94A3B8',
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT FLANK TELEMETRY: VISUAL GALLERY & 35-EXHIBIT INDEX
              (Gracefully populates right empty space with museum telemetry)
              ═══════════════════════════════════════════════════════════════ */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                right: 'clamp(14px, 2.5vw, 42px)',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                pointerEvents: 'auto',
                maxWidth: '210px',
              }}
            >
              {/* Telemetry Header */}
              <div
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  background: 'rgba(11, 15, 25, 0.85)',
                  border: `1.5px solid ${currentProject.color}45`,
                  boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 16px ${currentProject.color}15`,
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: currentProject.color,
                      boxShadow: `0 0 6px ${currentProject.color}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: '9px',
                      fontWeight: 900,
                      color: currentProject.color,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    02 // ARTWORK PLATES
                  </span>
                </div>
                <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '11px', fontWeight: 800, color: '#FFFFFF' }}>
                  EXHIBIT {currentProject.number} / {total}
                </div>
              </div>

              {/* 35-Exhibit Visual Matrix Dots */}
              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7.5px', color: '#64748B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Plate Sequence
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                  {ART_CIRCLES_PROJECTS.map((p, idx) => {
                    const isCur = Math.round(activeIndex) === idx;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => goToIndex(idx)}
                        style={{
                          height: '14px',
                          borderRadius: '2px',
                          background: isCur ? p.color : 'rgba(255, 255, 255, 0.1)',
                          border: isCur ? `1px solid ${p.color}` : 'none',
                          boxShadow: isCur ? `0 0 6px ${p.color}` : 'none',
                          cursor: 'pointer',
                          padding: 0,
                          transition: 'all 0.18s ease',
                        }}
                        title={`Plate ${p.number} • ${p.title}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Background SVG Orbital Guideline Tracks & Mechanical Bezel Ticks */}
          <svg
            viewBox="0 0 1400 700"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <defs>
              <linearGradient id="orbitLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#9E7BFF" stopOpacity="0.12" />
              </linearGradient>
              <linearGradient id="orbitRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FF5500" stopOpacity="0.12" />
              </linearGradient>
            </defs>

            {/* Left Circular Track Ring */}
            <circle
              cx={700 + leftCircleCenterX}
              cy={350}
              r={orbitRadius}
              fill="none"
              stroke="url(#orbitLeftGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.65"
            />

            {/* Left Secondary Mechanical Concentric Ring */}
            <circle
              cx={700 + leftCircleCenterX}
              cy={350}
              r={orbitRadius - 38}
              fill="none"
              stroke="rgba(0, 210, 255, 0.15)"
              strokeWidth="0.8"
              strokeDasharray="2 4"
            />

            {/* Right Circular Track Ring */}
            <circle
              cx={700 + rightCircleCenterX}
              cy={350}
              r={orbitRadius}
              fill="none"
              stroke="url(#orbitRightGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.65"
            />

            {/* Right Secondary Mechanical Concentric Ring */}
            <circle
              cx={700 + rightCircleCenterX}
              cy={350}
              r={orbitRadius - 38}
              fill="none"
              stroke="rgba(204, 255, 0, 0.15)"
              strokeWidth="0.8"
              strokeDasharray="2 4"
            />

            {/* Subtle Horizontal Axis Ray connecting both sides */}
            <line
              x1={80}
              y1={350}
              x2={1320}
              y2={350}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          </svg>

          {/* ═══════════════════════════════════════════════════════════════
              LEFT ORBIT: REVOLVING EXPLANATION & CONCEPT TILES
              Wraps generously up to 135° to fill the entire left quadrant!
              ═══════════════════════════════════════════════════════════════ */}
          <div
            className="orbit-ring orbit-left"
            style={{
              position: 'absolute',
              top: '50%',
              left: `calc(50% + ${leftCircleCenterX}px)`,
              width: 0,
              height: 0,
              zIndex: 10,
            }}
          >
            {ART_CIRCLES_PROJECTS.map((proj, idx) => {
              let deltaSteps = (idx - activeIndex) % total;
              if (deltaSteps > total / 2) deltaSteps -= total;
              if (deltaSteps < -total / 2) deltaSteps += total;

              const angleDeg = deltaSteps * stepAngle;
              const angleRad = (angleDeg * Math.PI) / 180;

              // Tile Coordinates along circumference
              const x = orbitRadius * Math.cos(angleRad);
              const y = orbitRadius * Math.sin(angleRad);

              const distFromFocal = Math.abs(deltaSteps);
              const isFocal = distFromFocal < 0.5;

              // Active focal item is rendered prominently in center stage
              if (isFocal) return null;

              // Wide visible arc up to 135 degrees (populates the entire left flank!)
              if (Math.abs(angleDeg) > 135) return null;

              const scale = Math.max(0.66, 0.96 - distFromFocal * 0.075);
              const opacity = Math.max(0.24, 0.9 - distFromFocal * 0.12);

              return (
                <div
                  key={proj.id}
                  className="orbit-tile orbit-tile-explanation"
                  onClick={() => goToIndex(idx)}
                  style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: isMobile ? '92px' : '122px',
                    height: isMobile ? '92px' : '122px',
                    transform: `translate(-50%, -50%) scale(${scale}) rotate(${angleDeg * 0.72}deg)`,
                    opacity: opacity,
                    zIndex: Math.round(25 - distFromFocal),
                    background: 'rgba(12, 16, 26, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: '14px',
                    padding: isMobile ? '8px' : '10px',
                    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.65)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  title={`[ ${proj.number} ] ${proj.title} · Click to Focus`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '9.5px', fontWeight: 900, color: proj.color }}>
                      #{proj.number}
                    </span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: proj.color, boxShadow: `0 0 6px ${proj.color}` }} />
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? '9.5px' : '11px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {proj.title}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '8px', color: '#64748B' }}>
                      {proj.category}
                    </span>
                    <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '7.5px', color: proj.color, fontWeight: 700 }}>
                      {proj.year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT ORBIT: REVOLVING DESIGN PLATE TILES
              Wraps generously up to 135° to fill the entire right quadrant!
              ═══════════════════════════════════════════════════════════════ */}
          <div
            className="orbit-ring orbit-right"
            style={{
              position: 'absolute',
              top: '50%',
              left: `calc(50% + ${rightCircleCenterX}px)`,
              width: 0,
              height: 0,
              zIndex: 10,
            }}
          >
            {ART_CIRCLES_PROJECTS.map((proj, idx) => {
              let deltaSteps = (idx - activeIndex) % total;
              if (deltaSteps > total / 2) deltaSteps -= total;
              if (deltaSteps < -total / 2) deltaSteps += total;

              // Angle from 180 deg (pointing towards left)
              const angleDeg = 180 - deltaSteps * stepAngle;
              const angleRad = (angleDeg * Math.PI) / 180;

              const x = orbitRadius * Math.cos(angleRad);
              const y = orbitRadius * Math.sin(angleRad);

              const distFromFocal = Math.abs(deltaSteps);
              const isFocal = distFromFocal < 0.5;

              // Active focal item is rendered in center stage
              if (isFocal) return null;

              const angleFrom180 = Math.abs(((angleDeg - 180 + 540) % 360) - 180);
              // Wide visible arc up to 135 degrees (populates the entire right flank!)
              if (angleFrom180 > 135) return null;

              const scale = Math.max(0.66, 0.96 - distFromFocal * 0.075);
              const opacity = Math.max(0.24, 0.9 - distFromFocal * 0.12);

              return (
                <div
                  key={proj.id}
                  className="orbit-tile orbit-tile-design"
                  onClick={() => goToIndex(idx)}
                  style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: isMobile ? '92px' : '122px',
                    height: isMobile ? '92px' : '122px',
                    transform: `translate(-50%, -50%) scale(${scale}) rotate(${-deltaSteps * 11}deg)`,
                    opacity: opacity,
                    zIndex: Math.round(25 - distFromFocal),
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: '#0B0F19',
                    border: '1.5px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.65)',
                  }}
                  title={`[ ${proj.number} ] ${proj.title} · Click to Focus`}
                >
                  <img
                    src={proj.designImage}
                    alt={proj.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', top: '6px', left: '6px', background: 'rgba(0,0,0,0.78)', color: proj.color, fontSize: '8.5px', fontWeight: 900, fontFamily: "'Space Grotesk', monospace", padding: '2px 6px', borderRadius: '4px', border: `1px solid ${proj.color}40` }}>
                    #{proj.number}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              THE CENTER STAGE: TWO ITEMS SIDE BY SIDE (EXACT REFERENCE RECREATION)
              [ LEFT: DESIGN EXPLANATION ] ── [ CENTER: TEXT & BUTTON ] ── [ RIGHT: DESIGN ARTWORK ]
              ═══════════════════════════════════════════════════════════════ */}
          <div
            className="art-circles-center-triptych"
            style={{
              position: 'relative',
              zIndex: 40,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '12px' : '22px',
              maxWidth: '1060px',
              width: '100%',
              padding: '0 10px',
            }}
          >
            {/* ── 1. LEFT ITEM: ACTIVE DESIGN EXPLANATION CARD ── */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-end',
                gap: '6px',
              }}
            >
              <div
                className="center-focal-card"
                onClick={() => setModalProject(currentProject)}
                style={{
                  width: isMobile ? '150px' : '210px',
                  height: isMobile ? '150px' : '210px',
                  background: 'rgba(12, 16, 26, 0.94)',
                  border: `2px solid ${currentProject.color}`,
                  borderRadius: '16px',
                  padding: isMobile ? '12px' : '16px',
                  boxShadow: `0 20px 45px rgba(0, 0, 0, 0.8), 0 0 30px ${currentProject.color}35`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  userSelect: 'none',
                }}
                title="Click to inspect explanation dossier"
              >
                {/* Top Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '10px', fontWeight: 900, color: currentProject.color, letterSpacing: '0.08em' }}>
                    EXPLANATION // {currentProject.number}
                  </span>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: currentProject.color, boxShadow: `0 0 8px ${currentProject.color}` }} />
                </div>

                {/* Core Concept Headline */}
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? '12px' : '14px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '6px' }}>
                    &ldquo;{currentProject.conceptHeadline}&rdquo;
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: isMobile ? '9px' : '10px', color: '#94A3B8' }}>
                    {currentProject.category}
                  </div>
                </div>

                {/* Bottom Spec Badge */}
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {currentProject.metrics.slice(0, 2).map((m, i) => (
                    <span key={i} style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '8.5px', color: currentProject.color, background: `${currentProject.color}18`, padding: '2px 6px', borderRadius: '4px' }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Caption Label underneath */}
              <div style={{ textAlign: isMobile ? 'center' : 'right', fontFamily: "'Space Grotesk', monospace", fontSize: '10px', color: '#94A3B8', letterSpacing: '0.04em' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{currentProject.client}</span> &bull; {currentProject.year}
              </div>
            </div>

            {/* ── 2. CENTER ITEM: CURATORIAL TEXT BLOCK WITH FRAMING RULES ── */}
            <div
              style={{
                width: isMobile ? 'min(92%, 360px)' : '320px',
                textAlign: 'center',
                padding: '12px 14px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {/* Top Horizontal Rule Line */}
              <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.22) 20%, rgba(255, 255, 255, 0.22) 80%, transparent 100%)' }} />

              {/* Step / Category Tag */}
              <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '10px', fontWeight: 900, color: currentProject.color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                EXHIBIT {currentProject.number} / {total}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: isMobile ? '18px' : '23px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {currentProject.title}
              </h3>

              {/* Curated By attribution */}
              <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '9.5px', color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                CURATED BY HOWVAIBHAV &bull; {currentProject.category}
              </div>

              {/* Curatorial Rationale Paragraph */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? '11px' : '11.5px',
                  color: '#CBD5E1',
                  lineHeight: 1.45,
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: isMobile ? 2 : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {currentProject.explanation}
              </p>

              {/* Action Button: Compact Symbol Button [ ↗ ] */}
              <button
                type="button"
                onClick={() => {
                  try { soundFX.playSnap(); } catch {}
                  setModalProject(currentProject);
                }}
                title={`View Dossier for ${currentProject.title}`}
                aria-label={`View Dossier for ${currentProject.title}`}
                style={{
                  marginTop: '2px',
                  width: '36px',
                  height: '36px',
                  background: 'linear-gradient(145deg, #1A202C 0%, #0D111A 100%)',
                  color: '#FFFFFF',
                  border: `1.5px solid ${currentProject.color}`,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: `0 6px 18px rgba(0,0,0,0.6), 0 0 16px ${currentProject.color}30`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: 900,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.12)';
                  e.currentTarget.style.background = currentProject.color;
                  e.currentTarget.style.color = '#07080B';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${currentProject.color}70`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'linear-gradient(145deg, #1A202C 0%, #0D111A 100%)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.boxShadow = `0 6px 18px rgba(0,0,0,0.6), 0 0 16px ${currentProject.color}30`;
                }}
              >
                <span style={{ transform: 'translateY(-0.5px)' }}>↗</span>
              </button>

              {/* Bottom Horizontal Rule Line */}
              <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.22) 20%, rgba(255, 255, 255, 0.22) 80%, transparent 100%)' }} />
            </div>

            {/* ── 3. RIGHT ITEM: ACTIVE DESIGN ARTWORK PLATE ── */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                gap: '6px',
              }}
            >
              <div
                className="center-focal-card"
                onClick={() => setModalProject(currentProject)}
                style={{
                  width: isMobile ? '150px' : '210px',
                  height: isMobile ? '150px' : '210px',
                  background: '#070A10',
                  border: `2px solid ${currentProject.color}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: `0 20px 45px rgba(0, 0, 0, 0.8), 0 0 30px ${currentProject.color}35`,
                  userSelect: 'none',
                }}
                title="Click to view full uncropped artwork"
              >
                <img
                  src={currentProject.designImage}
                  alt={currentProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0, 0, 0, 0.78)', color: currentProject.color, fontSize: '10px', fontWeight: 900, fontFamily: "'Space Grotesk', monospace", padding: '2px 8px', borderRadius: '4px', border: `1px solid ${currentProject.color}50` }}>
                  #{currentProject.number}
                </div>
              </div>

              {/* Artwork Plate Sub-label */}
              <div style={{ textAlign: isMobile ? 'center' : 'left', fontFamily: "'Space Grotesk', monospace", fontSize: '10px', color: '#94A3B8', letterSpacing: '0.04em' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>HIGH-RES UNCOMPRESSED</span> &bull; 1:1
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* ── FULLSCREEN EXHIBIT DOSSIER MODAL ── */}
      {modalProject && (
        <div
          onClick={() => setModalProject(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 7, 10, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '920px',
              width: '100%',
              background: '#0D111A',
              border: `2px solid ${modalProject.color}`,
              borderRadius: '20px',
              padding: '28px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '24px',
              boxShadow: `0 30px 90px rgba(0, 0, 0, 0.9), 0 0 60px ${modalProject.color}35`,
            }}
          >
            {/* Modal Left Artwork Preview */}
            <div style={{ flex: '1.2', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
              <img
                src={modalProject.designImage}
                alt={modalProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Modal Right Curatorial Dossier */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '10px', color: modalProject.color, fontWeight: 900 }}>
                    EXHIBIT {modalProject.number} // {modalProject.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalProject(null)}
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
                  {modalProject.title}
                </h3>

                <div
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderLeft: `3px solid ${modalProject.color}`,
                    borderRadius: '4px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '13px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                    &ldquo;{modalProject.conceptHeadline}&rdquo;
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: 1.4 }}>
                    {modalProject.client} &bull; {modalProject.year}
                  </div>
                </div>

                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                  {modalProject.explanation}
                </p>
              </div>

              <div>
                <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '10px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Technical Specifications
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {modalProject.metrics.map((m, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '10px',
                        fontFamily: "'Space Grotesk', monospace",
                        color: modalProject.color,
                        fontWeight: 700,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
