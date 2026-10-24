import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundFX } from './soundFX';

/**
 * Folder3DConveyor — High-fidelity 3D Isometric Folder Deck.
 * Recreates the iconic Lowe reference animation with zero empty space:
 * - Fluid direct trackpad/mouse-wheel scrolling with boundary pass-through (never traps the user).
 * - Tactile touch swiping on mobile & tablet, and mouse drag on desktop.
 * - Active folder extracts / elevates in 3D (Z-lift + tilt) with luminous cyan/accent highlight.
 * - Staggered tab indexing, interactive steppers, timeline scrubber, and category filtering.
 */
export default function Folder3DConveyor({ projects, onSelectProject }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All Exhibits');
  const [virtualIndex, setVirtualIndex] = useState(0);
  const targetIndexRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(0);
  const hasDragged = useRef(false);
  const [isMouseDragging, setIsMouseDragging] = useState(false);

  // Filtered projects list
  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'All Exhibits') return true;
    return p.category === selectedCategory;
  });

  const total = filteredProjects.length;
  const activeIntIndex = Math.min(Math.max(0, Math.round(virtualIndex)), total - 1);
  const activeProject = filteredProjects[activeIntIndex] || filteredProjects[0];

  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsSmallMobile(w < 480);
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When category changes, reset index smoothly
  useEffect(() => {
    targetIndexRef.current = 0;
    setVirtualIndex(0);
  }, [selectedCategory]);

  // Butter-smooth 60/120fps physics lerp loop
  useEffect(() => {
    let animId;
    let lastVal = -1;

    const renderLoop = () => {
      // Clamp target index
      targetIndexRef.current = Math.max(0, Math.min(total - 1, targetIndexRef.current));

      setVirtualIndex((prev) => {
        const diff = targetIndexRef.current - prev;
        if (Math.abs(diff) < 0.001) return targetIndexRef.current;
        const next = prev + diff * 0.14;

        const rounded = Math.round(next);
        if (rounded !== lastVal && rounded >= 0 && rounded < total) {
          lastVal = rounded;
          soundFX.playTick();
        }

        return next;
      });

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [total]);

  // Direct Wheel / Trackpad Scroll Handling (Non-passive so preventDefault works smoothly)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let snapTimeout = null;

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 2) return;

      const current = targetIndexRef.current;
      const atStart = current <= 0.03 && delta < 0;
      const atEnd = current >= total - 1 - 0.03 && delta > 0;

      // When reaching edges and continuing in that direction, pass through to normal page scroll
      if (atStart || atEnd) {
        return;
      }

      // Intercept and glide through 3D folders smoothly
      e.preventDefault();

      const step = delta * 0.0022;
      targetIndexRef.current = Math.max(0, Math.min(total - 1, current + step));

      // Debounce snapping to nearest project after scroll momentum settles
      if (snapTimeout) clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        targetIndexRef.current = Math.round(targetIndexRef.current);
      }, 150);
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', onWheel);
      if (snapTimeout) clearTimeout(snapTimeout);
    };
  }, [total]);

  // Touch Swipe Handling on Phone / Tablet
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartIndex = useRef(0);
  const isTouchMoving = useRef(false);

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartIndex.current = targetIndexRef.current;
    isTouchMoving.current = false;
  };

  const handleTouchMove = (e) => {
    if (e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = touchStartX.current - currentX;
    const diffY = touchStartY.current - currentY;

    // Horizontal swipe on mobile
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
      isTouchMoving.current = true;
      if (e.cancelable) e.preventDefault();
      const sensitivity = isSmallMobile ? 0.0055 : 0.0045;
      targetIndexRef.current = Math.max(0, Math.min(total - 1, touchStartIndex.current + diffX * sensitivity));
    }
  };

  const handleTouchEnd = () => {
    if (isTouchMoving.current) {
      isTouchMoving.current = false;
      targetIndexRef.current = Math.round(targetIndexRef.current);
      soundFX.playSnap();
    }
  };

  // Mouse Drag on Desktop
  const handleMouseDown = (e) => {
    if (e.button !== 0 || e.target.closest('button')) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartIndex.current = targetIndexRef.current;
    setIsMouseDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const diffX = dragStartX.current - e.clientX;
    if (Math.abs(diffX) > 5) {
      hasDragged.current = true;
    }
    const sensitivity = 0.0035;
    targetIndexRef.current = Math.max(0, Math.min(total - 1, dragStartIndex.current + diffX * sensitivity));
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setIsMouseDragging(false);
      if (hasDragged.current) {
        targetIndexRef.current = Math.round(targetIndexRef.current);
        soundFX.playSnap();
      }
    }
  };

  // Stepper functions
  const goToProject = useCallback(
    (idx) => {
      soundFX.playSnap();
      targetIndexRef.current = Math.max(0, Math.min(total - 1, idx));
    },
    [total]
  );

  const nextProject = useCallback(() => {
    const currentInt = Math.round(targetIndexRef.current);
    goToProject(Math.min(total - 1, currentInt + 1));
  }, [goToProject, total]);

  const prevProject = useCallback(() => {
    const currentInt = Math.round(targetIndexRef.current);
    goToProject(Math.max(0, currentInt - 1));
  }, [goToProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextProject();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

  // Isometric step spacing calibrated for mobile & desktop
  const stepX = isSmallMobile ? 48 : isMobile ? 65 : isTablet ? 85 : 110;
  const stepY = isSmallMobile ? -28 : isMobile ? -36 : isTablet ? -48 : -62;

  return (
    <section ref={containerRef} className="conveyor-stage-container" aria-label="3D Isometric Folder Conveyor">
      <div className="conveyor-stage-card">
        {/* Washi tape accents on stage card */}
        <div className="washi-tape washi-tape-top-left" />
        <div className="washi-tape washi-tape-top-right" />

        {/* ── Top Bar: Lowe Headline & Category Filters ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between',
            gap: isMobile ? '10px' : '16px',
            zIndex: 30,
            position: 'relative',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  fontFamily: 'Space Grotesk',
                  fontSize: '11px',
                  color: '#FF5500',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                }}
              >
                [ ARCHIVE EXHIBIT 01 ]
              </span>
              <span style={{ fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>
                3D ISOMETRIC CONVEYOR DECK
              </span>
            </div>

            {/* Editorial Headline using Google Fonts (Fraunces & Instrument Serif) */}
            <h2
              className="lowe-editorial-title"
              style={{
                fontSize: isSmallMobile ? '19px' : isMobile ? '23px' : '28px',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              HowVaibhav<span style={{ fontSize: '0.6em', verticalAlign: 'super' }}>©</span> organizes{' '}
              <span className="lowe-cyan-box">the details</span> so your brand keeps moving.
            </h2>
          </div>

          {/* Category Filter Pills (Phone Horizontal Swipe Ready) */}
          <div
            style={{
              display: 'flex',
              flexWrap: isMobile ? 'nowrap' : 'wrap',
              gap: '6px',
              alignItems: 'center',
              overflowX: isMobile ? 'auto' : 'visible',
              width: isMobile ? '100%' : 'auto',
              paddingBottom: isMobile ? '4px' : '0',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {['All Exhibits', 'Brand Identity', 'Packaging & Print', 'Editorial & Posters', '3D & Digital'].map(
              (cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      soundFX.playSnap();
                      setSelectedCategory(cat);
                    }}
                    style={{
                      padding: isSmallMobile ? '4px 10px' : '5px 12px',
                      borderRadius: '999px',
                      fontFamily: 'Space Grotesk',
                      fontSize: isSmallMobile ? '10px' : '11px',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      border: isSelected ? '1.5px solid #111' : '1px solid rgba(0,0,0,0.12)',
                      background: isSelected ? '#111113' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#555555',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '2px 2px 0px #000' : 'none',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {cat}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* ── 3D Isometric Viewport ── */}
        <div
          ref={canvasRef}
          className={`isometric-canvas-area ${isMouseDragging ? 'is-dragging' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          title="Scroll with mouse wheel, swipe, or drag horizontally to browse"
        >
          <div
            className="isometric-diagonal-track"
            style={{
              transform: isSmallMobile
                ? 'rotateX(36deg) rotateY(-6deg) rotateZ(18deg)'
                : isMobile
                ? 'rotateX(40deg) rotateY(-8deg) rotateZ(24deg)'
                : 'rotateX(46deg) rotateY(-14deg) rotateZ(32deg)',
            }}
          >
            {filteredProjects.map((project, index) => {
              const diff = index - virtualIndex;
              const dist = Math.abs(diff);
              const isFocal = dist < 0.65;

              // Compute continuous 3D translation along the diagonal
              const posX = diff * stepX;
              const posY = diff * stepY;

              // Smooth 3D elevation curve: peaks when diff = 0
              let posZ = 0;
              let scale = 1.0;
              let rotateXAngle = 0;

              if (dist < 1.0) {
                const bell = Math.cos(dist * Math.PI * 0.5); // 1.0 at center, 0 at edge
                posZ = bell * 95;
                scale = 1.0 + bell * 0.12;
                rotateXAngle = -bell * 10; // Cover tilts slightly open forward
              } else {
                posZ = -dist * 35;
                scale = Math.max(0.65, 1.0 - dist * 0.08);
                rotateXAngle = 0;
              }

              const opacity = Math.max(0.2, 1 - dist * 0.18);
              const zIndex = Math.round(70 - dist * 10);

              // Staggered tab positions so tabs don't overlap in the deck
              const tabPositions = [14, 42, 70, 28, 56];
              const tabLeft = `${tabPositions[index % tabPositions.length]}px`;

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (hasDragged.current) return;
                    if (isFocal) {
                      soundFX.playSnap();
                      onSelectProject(project);
                    } else {
                      goToProject(index);
                    }
                  }}
                  className={`iso-folder-unit ${isFocal ? 'is-focal' : ''}`}
                  style={{
                    transform: `translate3d(${posX}px, ${posY}px, ${posZ}px) rotateX(${rotateXAngle}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    '--accent-col': project.folderColor || '#00D2FF',
                  }}
                >
                  {/* Physical Folder Shell */}
                  <div
                    className="iso-folder-shell"
                    style={{
                      borderColor: isFocal ? project.folderColor : 'rgba(0,0,0,0.12)',
                    }}
                  >
                    {/* Stepped Top Folder Tab with Tag & Number */}
                    <div
                      className="iso-folder-tab-notch"
                      style={{
                        left: tabLeft,
                        background: isFocal ? project.folderColor : '#FFFFFF',
                        color: isFocal ? '#000000' : '#333333',
                      }}
                    >
                      <span>{project.number}</span>
                      <span style={{ opacity: 0.4 }}>/</span>
                      <span style={{ fontSize: '10px' }}>{project.title.toUpperCase()}</span>
                    </div>

                    {/* Preview Artwork Window */}
                    <div className="iso-folder-preview-box">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="iso-folder-preview-img"
                        loading="lazy"
                        draggable={false}
                      />
                      {isFocal && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            background: 'rgba(0,0,0,0.75)',
                            color: '#FFFFFF',
                            borderRadius: '999px',
                            padding: '3px 9px',
                            fontFamily: 'Space Grotesk',
                            fontSize: '9.5px',
                            fontWeight: 800,
                            backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <span style={{ color: project.folderColor }}>●</span>
                          <span>ACTIVE FOCAL</span>
                        </div>
                      )}
                    </div>

                    {/* Folder Metadata */}
                    <div className="iso-folder-card-meta">
                      <div>
                        <span
                          style={{
                            fontFamily: 'Space Grotesk',
                            fontSize: '9.5px',
                            fontWeight: 700,
                            color: isFocal ? project.folderColor : '#666',
                            textTransform: 'uppercase',
                          }}
                        >
                          {project.client} // {project.year}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'Syne',
                            margin: '3px 0 4px',
                            fontSize: '16px',
                            fontWeight: 800,
                            lineHeight: 1.2,
                            color: '#111',
                          }}
                        >
                          {project.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '11px',
                            color: '#555',
                            margin: 0,
                            lineHeight: 1.35,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {project.subtitle}
                        </p>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '8px',
                          borderTop: '1px solid rgba(0,0,0,0.06)',
                          marginTop: '6px',
                        }}
                      >
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {project.palette?.slice(0, 3).map((col) => (
                            <span
                              key={col.hex}
                              style={{
                                width: '11px',
                                height: '11px',
                                borderRadius: '50%',
                                background: col.hex,
                                border: '1px solid rgba(0,0,0,0.1)',
                                display: 'inline-block',
                              }}
                              title={col.name}
                            />
                          ))}
                        </div>

                        <span
                          style={{
                            fontFamily: 'Space Grotesk',
                            fontSize: '10.5px',
                            fontWeight: 800,
                            color: isFocal ? '#000' : '#888',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          {isFocal ? 'Inspect ↗' : 'Focus'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Spotlight & Control Bar (Compact & Sleek) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
            gap: isMobile ? '12px' : '16px',
            alignItems: 'center',
            zIndex: 30,
            position: 'relative',
            borderTop: '1px dashed rgba(0,0,0,0.12)',
            paddingTop: '12px',
          }}
        >
          {/* Active Folder Spotlight Strip */}
          {activeProject && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <span
                    style={{
                      background: activeProject.folderColor,
                      color: '#000000',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontFamily: 'Space Grotesk',
                      fontSize: '10px',
                      fontWeight: 800,
                    }}
                  >
                    {activeProject.tabLabel}
                  </span>
                  <span style={{ fontSize: '11px', color: '#666', fontWeight: 600 }}>
                    {activeProject.category}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'Syne',
                    fontSize: isMobile ? '17px' : '20px',
                    fontWeight: 900,
                    margin: 0,
                    color: '#111',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {activeProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundFX.playSnap();
                  onSelectProject(activeProject);
                }}
                style={{
                  background: '#121316',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '7px 16px',
                  fontFamily: 'Space Grotesk',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = activeProject.folderColor;
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#121316';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <span>Open Dossier</span>
                <span>↗</span>
              </button>
            </div>
          )}

          {/* Right: Tactile Scrubber Controls & Homage Laurel Review */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Laurel Quote (Desktop Only) */}
            {!isMobile && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: '#666',
                  fontFamily: 'Instrument Serif',
                  fontStyle: 'italic',
                  justifyContent: 'flex-end',
                }}
              >
                <span>🌿</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '340px' }}>
                  "{activeProject?.quote || 'Automation made our brand unforgettable.'}"
                </span>
                <span>🌿</span>
              </div>
            )}

            {/* Scrubber Timeline Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                background: '#F7F6F2',
                padding: '6px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(0,0,0,0.1)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              {/* Prev */}
              <button
                type="button"
                onClick={prevProject}
                disabled={activeIntIndex === 0}
                title="Previous exhibit (Left Arrow)"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.15)',
                  background: activeIntIndex === 0 ? '#EAEAE6' : '#FFFFFF',
                  color: activeIntIndex === 0 ? '#AAA' : '#000',
                  fontSize: '14px',
                  cursor: activeIntIndex === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  transition: 'all 0.15s ease',
                }}
              >
                ‹
              </button>

              {/* Scrubber dots */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                {filteredProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => goToProject(idx)}
                    title={`${p.title} (${idx + 1}/${total})`}
                    style={{
                      width: idx === activeIntIndex ? '24px' : '6px',
                      height: '6px',
                      borderRadius: '999px',
                      border: 'none',
                      background: idx === activeIntIndex ? '#121316' : 'rgba(0,0,0,0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              {/* Progress counter */}
              <span
                style={{
                  fontFamily: 'Space Grotesk',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#444',
                  minWidth: '42px',
                  textAlign: 'center',
                }}
              >
                {String(activeIntIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>

              {/* Next */}
              <button
                type="button"
                onClick={nextProject}
                disabled={activeIntIndex === total - 1}
                title="Next exhibit (Right Arrow)"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.15)',
                  background: activeIntIndex === total - 1 ? '#EAEAE6' : '#FFFFFF',
                  color: activeIntIndex === total - 1 ? '#AAA' : '#000',
                  fontSize: '14px',
                  cursor: activeIntIndex === total - 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  transition: 'all 0.15s ease',
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
