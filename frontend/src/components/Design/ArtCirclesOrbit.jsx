import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ART_CIRCLES_PROJECTS } from './artCirclesData';
import { soundFX } from './soundFX';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ART CIRCLES — DUAL ROTATIONAL SHOWCASE ORBIT
 * ─────────────────────────────────────────────────────────────────────────────
 * Inspired by the legendary Art.com "Art Circles" interface, customized for HowVaibhav:
 *  - Two synchronized revolving orbits:
 *      * Left Orbit: Explanation, Concept, Typography & Architectural Metrics
 *      * Right Orbit: Design Plates, Visual Posters, Brand Exhibits
 *  - Scroll-Driven Progression: As the user scrolls down through the pinned runway,
 *    the two circular gears revolve in synchronized harmony through all 20 exhibits.
 *  - Interactive: Click any orbital tile, use keyboard arrows, swipe, or click next/prev.
 *  - Deep Obsidian Black Grid Theme (#07080B with 40px grid matrix).
 *  - Includes Fullscreen Inspection Modal for deep-dive case study review.
 */
export default function ArtCirclesOrbit() {
  const runwayRef = useRef(null);
  const stageRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const total = ART_CIRCLES_PROJECTS.length; // 20 exhibits
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

  // Smooth Interpolated Index for Fluid Circular Rotation
  useEffect(() => {
    let animId;
    const lerpSpeed = 0.14;

    const animate = () => {
      setActiveIndex((prev) => {
        const diff = targetIndex - prev;
        if (Math.abs(diff) < 0.002) return targetIndex;
        return prev + diff * lerpSpeed;
      });
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [targetIndex]);

  // Pinned Scroll Controller
  useEffect(() => {
    let lastSnapIdx = -1;

    const handleScroll = () => {
      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const scrollableDistance = runwayRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      const newTarget = progress * (total - 1);

      setTargetIndex(newTarget);

      // Play soft sound on step crossing
      const rounded = Math.round(newTarget);
      if (rounded !== lastSnapIdx && rounded >= 0 && rounded < total) {
        lastSnapIdx = rounded;
        try { soundFX.playTick(); } catch {}
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [total]);

  // Navigate explicitly
  const goToIndex = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(total - 1, idx));
    setTargetIndex(clamped);
    try { soundFX.playSnap(); } catch {}

    // Optionally synchronize page scroll position
    if (runwayRef.current) {
      const rect = runwayRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const sectionTop = currentScrollY + rect.top;
      const scrollableDistance = runwayRef.current.offsetHeight - window.innerHeight;
      const targetScrollY = sectionTop + (clamped / (total - 1)) * scrollableDistance;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }, [total]);

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

  // Mobile Touch Swipe Handling
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) goToIndex(Math.round(targetIndex) + 1);
        else goToIndex(Math.round(targetIndex) - 1);
      }
    }
  };

  const currentProject = ART_CIRCLES_PROJECTS[Math.round(activeIndex)] || ART_CIRCLES_PROJECTS[0];

  // Mathematical Circle Parameters
  // Dynamic radius based on viewport width
  const circleRadius = isMobile
    ? Math.max(160, Math.min(220, windowWidth * 0.42))
    : Math.max(280, Math.min(380, windowWidth * 0.26));

  const centerSeparation = isMobile
    ? circleRadius * 0.8
    : circleRadius * 0.95;

  return (
    <div
      ref={runwayRef}
      className="art-circles-runway"
      style={{
        position: 'relative',
        width: '100%',
        height: `${(total + 1) * 28}vh`, // Pinned runway duration: smoothly scroll through all 20 exhibits
        minHeight: '480vh',
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
          filter: brightness(1.2) drop-shadow(0 0 16px rgba(0, 210, 255, 0.6)) !important;
          cursor: pointer;
        }
        .center-bridge-card {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        @keyframes pulseOrbitReticle {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50%      { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
        }
      `}</style>

      {/* ── STICKY VIEWPORT CONTAINER (Locked in screen during scroll) ── */}
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
          padding: '24px 16px 20px',
          zIndex: 12,
        }}
      >
        {/* ── TOP SECTION HEADER: "ART CIRCLES" ── */}
        <header
          style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 30,
            marginTop: '10px',
            userSelect: 'none',
          }}
        >
          {/* Subtle Category Eyebrow Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 14px',
              borderRadius: '999px',
              background: 'rgba(0, 210, 255, 0.08)',
              border: '1px solid rgba(0, 210, 255, 0.3)',
              marginBottom: '6px',
            }}
          >
            <span style={{ color: '#00D2FF', fontSize: '11px' }}>◈</span>
            <span
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: '10.5px',
                fontWeight: 800,
                color: '#00D2FF',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              ARCHIVE ORBIT // EXHIBIT 02
            </span>
            <span style={{ color: '#00D2FF', fontSize: '11px' }}>◈</span>
          </div>

          {/* Master Title (Modeled with Art Circles Typographic Poise) */}
          <h2
            style={{
              fontFamily: "'Space Grotesk', 'Unbounded', system-ui, sans-serif",
              fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 auto 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span>art</span>
            <span
              style={{
                background: 'linear-gradient(135deg, #00D2FF 0%, #CCFF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              circles
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: '0.38em',
                verticalAlign: 'super',
                color: '#64748B',
                fontWeight: 800,
              }}
            >
              ™
            </span>
          </h2>

          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(11px, 1.2vw, 13px)',
              color: '#94A3B8',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Dual synchronized orbits: Curatorial Explanation (Left) &bull; Visual Plates (Right)
          </p>
        </header>

        {/* ── THE ORBITAL CANVAS AREA (Contains Left Wheel, Right Wheel & Center Stage) ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1440px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
          }}
        >
          {/* Background SVG Orbital Guideline Tracks */}
          <svg
            viewBox="0 0 1200 600"
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
                <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#9E7BFF" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="orbitRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF5500" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Left Orbital Track (Explanation Wheel Ring) */}
            <circle
              cx={600 - centerSeparation * 0.95}
              cy={300}
              r={circleRadius * 0.92}
              fill="none"
              stroke="url(#orbitLeftGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.65"
            />

            {/* Right Orbital Track (Design Plate Wheel Ring) */}
            <circle
              cx={600 + centerSeparation * 0.95}
              cy={300}
              r={circleRadius * 0.92}
              fill="none"
              stroke="url(#orbitRightGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.65"
            />

            {/* Central Focal Convergence Halo */}
            <circle
              cx={600}
              cy={300}
              r={24}
              fill="none"
              stroke="#CCFF00"
              strokeWidth="1"
              strokeDasharray="2 3"
              opacity="0.45"
            />
          </svg>

          {/* ═══════════════════════════════════════════════════════════════
              LEFT ORBIT: EXPLANATION & ARCHITECTURAL ANATOMY CARDS
              Rotates so active tile converges to focal point at rightmost edge (0 deg)
              ═══════════════════════════════════════════════════════════════ */}
          <div
            className="orbit-ring orbit-left"
            style={{
              position: 'absolute',
              top: '50%',
              left: `calc(50% - ${centerSeparation}px)`,
              width: 0,
              height: 0,
              zIndex: 10,
            }}
          >
            {ART_CIRCLES_PROJECTS.map((proj, idx) => {
              // Normalized angular displacement from active focus
              // Center focal point is at angle 0 deg (pointing straight right toward center bridge)
              let deltaSteps = (idx - activeIndex) % total;
              if (deltaSteps > total / 2) deltaSteps -= total;
              if (deltaSteps < -total / 2) deltaSteps += total;

              const angleDeg = deltaSteps * stepAngle;
              const angleRad = (angleDeg * Math.PI) / 180;

              // Tile Coordinates along circle circumference
              const x = circleRadius * Math.cos(angleRad);
              const y = circleRadius * Math.sin(angleRad);

              // Angular distance to focal point
              const distFromFocal = Math.abs(deltaSteps);
              const isFocal = distFromFocal < 0.6;

              // Scale & Opacity falloff around the circle
              const scale = isFocal
                ? 1.18 - distFromFocal * 0.25
                : Math.max(0.62, 1.0 - distFromFocal * 0.08);

              const opacity = isFocal
                ? 1.0
                : Math.max(0.18, 0.92 - distFromFocal * 0.16);

              // Only render tiles on the visible front arc to maintain optimal 60fps performance
              if (Math.abs(angleDeg) > 130) return null;

              return (
                <div
                  key={proj.id}
                  className="orbit-tile orbit-tile-explanation"
                  onClick={() => goToIndex(idx)}
                  style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: isMobile ? '120px' : '155px',
                    height: isMobile ? '85px' : '105px',
                    transform: `translate(-50%, -50%) scale(${scale}) rotate(${angleDeg * 0.45}deg)`,
                    opacity: opacity,
                    zIndex: isFocal ? 35 : Math.round(30 - distFromFocal),
                    background: isFocal ? 'rgba(15, 20, 32, 0.94)' : 'rgba(11, 14, 22, 0.85)',
                    border: isFocal
                      ? `2px solid ${proj.color}`
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '12px',
                    padding: '8px 10px',
                    boxShadow: isFocal
                      ? `0 14px 34px rgba(0, 0, 0, 0.7), 0 0 20px ${proj.color}45`
                      : '0 6px 16px rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  title={`[ ${proj.number} ] ${proj.title} · Click to Focus`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: '9px',
                        fontWeight: 900,
                        color: proj.color,
                        letterSpacing: '0.08em',
                      }}
                    >
                      EXPLANATION // {proj.number}
                    </span>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: proj.color,
                        boxShadow: `0 0 6px ${proj.color}`,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: isMobile ? '10px' : '11.5px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      lineHeight: 1.25,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {proj.conceptHeadline}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '8px',
                      fontFamily: "'Space Grotesk', monospace",
                      color: 'rgba(255, 255, 255, 0.5)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{proj.category}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT ORBIT: VISUAL DESIGN & ARTWORK PLATES
              Rotates so active tile converges to focal point at leftmost edge (180 deg)
              ═══════════════════════════════════════════════════════════════ */}
          <div
            className="orbit-ring orbit-right"
            style={{
              position: 'absolute',
              top: '50%',
              left: `calc(50% + ${centerSeparation}px)`,
              width: 0,
              height: 0,
              zIndex: 10,
            }}
          >
            {ART_CIRCLES_PROJECTS.map((proj, idx) => {
              // Normalized angular displacement
              // Focal point is at angle 180 deg (pointing straight left toward center bridge)
              let deltaSteps = (idx - activeIndex) % total;
              if (deltaSteps > total / 2) deltaSteps -= total;
              if (deltaSteps < -total / 2) deltaSteps += total;

              const angleDeg = 180 - deltaSteps * stepAngle;
              const angleRad = (angleDeg * Math.PI) / 180;

              // Tile Coordinates along circle circumference
              const x = circleRadius * Math.cos(angleRad);
              const y = circleRadius * Math.sin(angleRad);

              const distFromFocal = Math.abs(deltaSteps);
              const isFocal = distFromFocal < 0.6;

              const scale = isFocal
                ? 1.18 - distFromFocal * 0.25
                : Math.max(0.62, 1.0 - distFromFocal * 0.08);

              const opacity = isFocal
                ? 1.0
                : Math.max(0.18, 0.92 - distFromFocal * 0.16);

              // Clip items on the far rear hemisphere to save GPU memory
              const angleFrom180 = Math.abs(((angleDeg - 180 + 540) % 360) - 180);
              if (angleFrom180 > 130) return null;

              return (
                <div
                  key={proj.id}
                  className="orbit-tile orbit-tile-design"
                  onClick={() => goToIndex(idx)}
                  style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: isMobile ? '100px' : '135px',
                    height: isMobile ? '100px' : '135px',
                    transform: `translate(-50%, -50%) scale(${scale}) rotate(${-deltaSteps * 7}deg)`,
                    opacity: opacity,
                    zIndex: isFocal ? 35 : Math.round(30 - distFromFocal),
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: '#0B0F19',
                    border: isFocal
                      ? `2.5px solid ${proj.color}`
                      : '1.5px solid rgba(255, 255, 255, 0.16)',
                    boxShadow: isFocal
                      ? `0 16px 36px rgba(0, 0, 0, 0.8), 0 0 24px ${proj.color}55`
                      : '0 8px 20px rgba(0, 0, 0, 0.5)',
                  }}
                  title={`[ ${proj.number} ] ${proj.title} · Click to Focus`}
                >
                  <img
                    src={proj.designImage}
                    alt={proj.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: isFocal ? 'contrast(1.08)' : 'contrast(0.95)',
                    }}
                  />
                  {/* Subtle Plate Number Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      backdropFilter: 'blur(4px)',
                      color: proj.color,
                      fontSize: '9px',
                      fontWeight: 900,
                      fontFamily: "'Space Grotesk', monospace",
                      padding: '2px 6px',
                      borderRadius: '4px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    #{proj.number}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              CENTRAL BRIDGE SHOWCASE: The Converged Focal Dossier
              Directly links the active Explanation and the active Design plate
              ═══════════════════════════════════════════════════════════════ */}
          <div
            className="center-bridge-card"
            style={{
              position: 'relative',
              zIndex: 45,
              width: 'min(92%, 460px)',
              background: 'rgba(12, 15, 24, 0.92)',
              border: `1.5px solid ${currentProject.color}70`,
              borderRadius: '18px',
              padding: isMobile ? '16px 18px' : '22px 24px',
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px ${currentProject.color}30`,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              userSelect: 'none',
            }}
          >
            {/* Top Row: Index Badge & Category */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                borderBottom: '1px dashed rgba(255, 255, 255, 0.12)',
                paddingBottom: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '11px',
                  fontWeight: 900,
                  color: currentProject.color,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                EXHIBIT {currentProject.number} / {total}
              </span>

              <span
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '10px',
                  color: '#94A3B8',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {currentProject.category}
              </span>
            </div>

            {/* Active Project Title */}
            <h3
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: isMobile ? '20px' : '25px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              {currentProject.title}
            </h3>

            {/* Client / Curation Attribution */}
            <div
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: '10.5px',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.65)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              CURATED BY {currentProject.client} &bull; {currentProject.year}
            </div>

            {/* Curatorial Deep-Dive Explanation */}
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: isMobile ? '12px' : '13px',
                color: '#CBD5E1',
                lineHeight: 1.45,
                margin: '2px 0 6px',
                display: '-webkit-box',
                WebkitLineClamp: isMobile ? 3 : 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {currentProject.explanation}
            </p>

            {/* Technical Metric Spec Pills */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                flexWrap: 'wrap',
                margin: '2px 0 6px',
              }}
            >
              {currentProject.metrics.map((m, i) => (
                <span
                  key={i}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '9.5px',
                    fontFamily: "'Space Grotesk', monospace",
                    fontWeight: 700,
                    color: '#94A3B8',
                    letterSpacing: '0.04em',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Primary Action Button: Open Dossier Modal */}
            <button
              type="button"
              onClick={() => {
                try { soundFX.playSnap(); } catch {}
                setModalProject(currentProject);
              }}
              style={{
                background: currentProject.color,
                color: '#07080B',
                border: 'none',
                borderRadius: '999px',
                padding: '9px 24px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: `0 6px 20px ${currentProject.color}50`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = `0 10px 28px ${currentProject.color}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `0 6px 20px ${currentProject.color}50`;
              }}
            >
              <span>Inspect Full Dossier</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* ── BOTTOM DOCK CONTROLLER: Step Indicator, Navigation Arrows, & Timeline Scrubber ── */}
        <footer
          style={{
            position: 'relative',
            zIndex: 30,
            width: 'min(94%, 640px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            background: 'rgba(13, 16, 24, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '999px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
            userSelect: 'none',
            gap: '14px',
          }}
        >
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => goToIndex(Math.round(targetIndex) - 1)}
            disabled={Math.round(targetIndex) <= 0}
            style={{
              background: 'transparent',
              border: 'none',
              color: Math.round(targetIndex) <= 0 ? 'rgba(255, 255, 255, 0.25)' : '#FFFFFF',
              fontSize: '18px',
              fontWeight: 900,
              cursor: Math.round(targetIndex) <= 0 ? 'default' : 'pointer',
              padding: '4px 10px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease',
            }}
            title="Previous Exhibit (or scroll up)"
          >
            ‹
          </button>

          {/* Interactive Timeline Track with Scrubber Bar */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '10px',
                  fontWeight: 800,
                  color: currentProject.color,
                  letterSpacing: '0.06em',
                }}
              >
                ORBIT STEP {Math.round(activeIndex) + 1} OF {total}
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '9px',
                  color: '#64748B',
                  letterSpacing: '0.04em',
                }}
              >
                SCROLL TO ADVANCE
              </span>
            </div>

            {/* Progress Bar Track */}
            <div
              style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.12)',
                borderRadius: '999px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: `${((activeIndex + 1) / total) * 100}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, #00D2FF 0%, ${currentProject.color} 100%)`,
                  borderRadius: '999px',
                  transition: 'width 0.12s linear',
                }}
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => goToIndex(Math.round(targetIndex) + 1)}
            disabled={Math.round(targetIndex) >= total - 1}
            style={{
              background: 'transparent',
              border: 'none',
              color: Math.round(targetIndex) >= total - 1 ? 'rgba(255, 255, 255, 0.25)' : '#FFFFFF',
              fontSize: '18px',
              fontWeight: 900,
              cursor: Math.round(targetIndex) >= total - 1 ? 'default' : 'pointer',
              padding: '4px 10px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease',
            }}
            title="Next Exhibit (or scroll down)"
          >
            ›
          </button>
        </footer>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FULLSCREEN DOSSIER MODAL LIGHTBOX
          ═══════════════════════════════════════════════════════════════ */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalProject(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(7, 8, 11, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeInModal 0.25s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '920px',
              maxHeight: '90vh',
              background: '#0D1019',
              border: `2px solid ${modalProject.color}80`,
              borderRadius: '20px',
              boxShadow: `0 24px 70px rgba(0, 0, 0, 0.9), 0 0 40px ${modalProject.color}35`,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setModalProject(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
              }}
              title="Close (ESC)"
            >
              ✕
            </button>

            {/* Left: Full Artwork Plate */}
            <div
              style={{
                flex: 1.1,
                minHeight: isMobile ? '280px' : '480px',
                background: '#06070A',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <img
                src={modalProject.designImage}
                alt={modalProject.title}
                style={{
                  width: '100%',
                  maxHeight: '440px',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.8)',
                }}
              />
            </div>

            {/* Right: Curatorial Breakdown */}
            <div
              style={{
                flex: 1,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '11px',
                    fontWeight: 900,
                    color: modalProject.color,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  EXHIBIT // {modalProject.number} &bull; {modalProject.category}
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    margin: '0 0 10px',
                  }}
                >
                  {modalProject.title}
                </h3>

                <div
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '11px',
                    color: '#94A3B8',
                    textTransform: 'uppercase',
                    marginBottom: '18px',
                  }}
                >
                  CLIENT: {modalProject.client} &bull; YEAR: {modalProject.year}
                </div>

                <div
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderLeft: `3px solid ${modalProject.color}`,
                    borderRadius: '4px',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: '4px',
                    }}
                  >
                    {modalProject.conceptHeadline}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#94A3B8',
                      lineHeight: 1.4,
                    }}
                  >
                    Architectural & Conceptual Rationale
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '13.5px',
                    color: '#CBD5E1',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {modalProject.explanation}
                </p>
              </div>

              {/* Bottom Tags & Metrics */}
              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '10px',
                    fontWeight: 800,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
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
