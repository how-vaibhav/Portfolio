import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModeTransition } from '../context/ModeTransitionContext';
import { soundFX } from '../components/Design/soundFX';

/**
 * DesignUnderWorkPage — State-of-the-Art Creative Studio Exhibition Preview.
 * Presented to visitors on the deployed site.
 *
 * Clean, majestic layout:
 * - Headline: "Something extraordinary is currently taking shape."
 * - Artistically elevated 16:9 museum exhibition plates with HD inspection lightbox.
 * - Zero navbar clutter (no time, no switch button in navbar).
 * - Responsive from mobile phones to ultra-wide displays.
 */
export default function DesignUnderWorkPage() {
  const { transitionTo } = useModeTransition();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredPlateId, setHoveredPlateId] = useState(null);
  const [lightboxPlate, setLightboxPlate] = useState(null);
  const [devBtnHovered, setDevBtnHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = 'HowVaibhav — Creative Studio [Crafting In Progress]';
    return () => {
      document.title = 'Vaibhav Verma — Software Developer & CS Portfolio';
    };
  }, []);

  // Curated exhibition master plates
  const EXHIBITION_PLATES = [
    {
      id: 'plate-1',
      plateNo: 'PLATE I',
      title: 'Typographic Anatomy',
      artwork: '/assets/text_image/artwork-h.jpg',
      color: '#FF2D78',
      specimen: 'SPECIMEN 01 // H · HIERARCHY',
      curatorialNote: 'Interactive letterform anatomy with precision optical stems and dynamic laser guides.',
    },
    {
      id: 'plate-2',
      plateNo: 'PLATE II',
      title: '3D Spatial Conveyor Deck',
      artwork: '/assets/text_image/artwork-o.jpg',
      color: '#FF5500',
      specimen: 'SYSTEM 02 // ISOMETRIC AXIS',
      curatorialNote: 'Volumetric continuous spatial projection gallery inspired by avant-garde European monographs.',
    },
    {
      id: 'plate-3',
      plateNo: 'PLATE III',
      title: 'Tactile Brand Dossiers',
      artwork: '/assets/text_image/artwork-b.jpg',
      color: '#C2E03A',
      specimen: 'ARCHIVE 03 // B · BASELINE',
      curatorialNote: 'Physical paper folder physics, debossed verification stamps, and bespoke case studies.',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#07080B',
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(204, 255, 0, 0.06) 0%, transparent 60%),
          radial-gradient(circle at 85% 85%, rgba(255, 45, 120, 0.04) 0%, transparent 55%),
          radial-gradient(circle at 15% 75%, rgba(255, 85, 0, 0.04) 0%, transparent 50%),
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 44px 44px, 44px 44px',
        color: '#FFFFFF',
        fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isMobile ? '0 0 40px' : '0 0 54px',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Top Header Navigation Bar (Clean & Uncluttered: No Time, No Toggle) ── */}
      <header
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: isMobile ? '18px 20px' : '26px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 20,
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Monogram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
          <span
            style={{
              fontFamily: "'Fraunces', 'Bodoni Moda', Georgia, serif",
              fontWeight: 900,
              fontSize: isMobile ? '19px' : '23px',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
            }}
          >
            HowVaibhav
          </span>
          <span
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '999px',
              padding: '2.5px 9px',
              fontSize: isMobile ? '8.5px' : '9.5px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            STUDIO LAB
          </span>
        </div>

        {/* Minimal Subtle Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: isMobile ? '9.5px' : '10.5px',
            fontFamily: "'Space Grotesk', monospace",
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.45)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#CCFF00',
              boxShadow: '0 0 8px #CCFF00',
            }}
          />
          <span>CRAFTING</span>
        </div>
      </header>

      {/* ── Main Hero Section ── */}
      <main
        style={{
          width: 'min(92%, 1160px)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          padding: isMobile ? '10px 0 20px' : '20px 0 30px',
        }}
      >
        {/* Main Headline — Only this heading is displayed */}
        <h1
          style={{
            fontFamily: "'Fraunces', 'Bodoni Moda', Georgia, serif",
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: 'clamp(30px, 5.8vw, 66px)',
            lineHeight: 1.12,
            letterSpacing: '-0.035em',
            textAlign: 'center',
            maxWidth: '960px',
            margin: isMobile ? '18px auto 34px' : '24px auto 48px',
            background: 'linear-gradient(180deg, #FFFFFF 25%, rgba(255,255,255,0.72) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            padding: '0 8px',
          }}
        >
          Something extraordinary is currently taking shape.
        </h1>

        {/* ── Artistically Elevated Exhibition Cards Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '18px' : '24px',
            marginTop: '10px',
          }}
        >
          {EXHIBITION_PLATES.map((plate) => {
            const isHovered = hoveredPlateId === plate.id;
            return (
              <article
                key={plate.id}
                onMouseEnter={() => {
                  try { soundFX.playHover(); } catch {}
                  setHoveredPlateId(plate.id);
                }}
                onMouseLeave={() => setHoveredPlateId(null)}
                onClick={() => {
                  try { soundFX.playSnap(); } catch {}
                  setLightboxPlate(plate);
                }}
                style={{
                  background: 'linear-gradient(170deg, rgba(17, 20, 29, 0.75) 0%, rgba(9, 11, 16, 0.9) 100%)',
                  border: isHovered
                    ? `1.5px solid ${plate.color}`
                    : '1.5px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '18px',
                  padding: isMobile ? '14px' : '18px',
                  boxShadow: isHovered
                    ? `0 24px 50px rgba(0, 0, 0, 0.8), 0 0 32px ${plate.color}30`
                    : '0 10px 30px rgba(0, 0, 0, 0.5)',
                  transform: !isMobile && isHovered ? 'translateY(-8px)' : 'none',
                  transition: 'all 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {/* Subtle Ambient Color Glow Backdrop */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-30%',
                    right: '-30%',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: plate.color,
                    opacity: isHovered ? 0.16 : 0.04,
                    filter: 'blur(50px)',
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                  }}
                />

                {/* 16:9 Uncropped Native Artwork Window */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: '#040507',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={plate.artwork}
                    alt={plate.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'block',
                    }}
                  />

                  {/* Corner Inspection Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(0, 0, 0, 0.72)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '6px',
                      padding: '3px 7px',
                      fontSize: '8.5px',
                      fontFamily: "'Space Grotesk', monospace",
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      color: isHovered ? plate.color : 'rgba(255, 255, 255, 0.75)',
                      backdropFilter: 'blur(6px)',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>⛶</span>
                    <span>HD</span>
                  </div>
                </div>

                {/* Specimen Plaque Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: plate.color,
                        boxShadow: `0 0 8px ${plate.color}`,
                        display: 'inline-block',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: '9px',
                        fontWeight: 900,
                        color: plate.color,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {plate.plateNo}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: '8px',
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.45)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    16:9 NATIVE
                  </span>
                </div>

                {/* Card Title */}
                <h2
                  style={{
                    fontFamily: "'Fraunces', 'Bodoni Moda', Georgia, serif",
                    fontWeight: 800,
                    fontSize: isMobile ? '16px' : '18.5px',
                    margin: '0 0 6px',
                    color: '#FFFFFF',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {plate.title}
                </h2>

                {/* Curatorial Note */}
                <p
                  style={{
                    fontSize: isMobile ? '11.5px' : '12.5px',
                    lineHeight: 1.55,
                    color: 'rgba(255, 255, 255, 0.62)',
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {plate.curatorialNote}
                </p>
              </article>
            );
          })}
        </div>
      </main>

      {/* ── Cinematic Full-Screen Lightbox Modal ── */}
      {lightboxPlate && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxPlate(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(4, 5, 8, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '20px 14px' : '36px',
            boxSizing: 'border-box',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '1100px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Top Modal Controls */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '11px',
                    fontWeight: 900,
                    color: lightboxPlate.color,
                    letterSpacing: '0.08em',
                  }}
                >
                  {lightboxPlate.plateNo}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>·</span>
                <span
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                  }}
                >
                  {lightboxPlate.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxPlate(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                aria-label="Close Preview"
              >
                ✕
              </button>
            </div>

            {/* High Resolution Artwork Frame */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '14px',
                overflow: 'hidden',
                background: '#020305',
                border: `1.5px solid ${lightboxPlate.color}40`,
                boxShadow: `0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px ${lightboxPlate.color}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={lightboxPlate.artwork}
                alt={lightboxPlate.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Floating Bottom-Right DEV Mode Return Button ── */}
      <aside
        style={{
          position: 'fixed',
          bottom: isMobile ? '16px' : '24px',
          right: isMobile ? '16px' : '24px',
          zIndex: 9999,
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        aria-label="Return to Software Developer Mode"
      >
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              right: 'calc(100% + 12px)',
              opacity: devBtnHovered ? 1 : 0,
              transform: devBtnHovered ? 'translateX(0)' : 'translateX(8px)',
              pointerEvents: 'none',
              background: 'rgba(9, 11, 15, 0.94)',
              color: '#CCFF00',
              border: '1px solid rgba(204, 255, 0, 0.45)',
              borderRadius: '8px',
              padding: '5px 11px',
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              transition: 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            DEV MODE
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            try { soundFX.playWarp(); } catch {}
            transitionTo('/');
          }}
          className="floating-dev-btn"
          title="Return to Software Developer Portfolio"
          aria-label="Return to Software Developer Mode"
          onMouseEnter={() => {
            try { soundFX.playHover(); } catch {}
            setDevBtnHovered(true);
          }}
          onMouseLeave={() => setDevBtnHovered(false)}
          style={{
            width: isMobile ? '46px' : '52px',
            height: isMobile ? '46px' : '52px',
            minWidth: isMobile ? '46px' : '52px',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #DDFF33 0%, #B8E600 100%)',
            color: '#07080A',
            border: '2px solid #07080A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            boxShadow: devBtnHovered
              ? '0 14px 34px rgba(204, 255, 0, 0.65), 4px 4px 0px #07080A, inset 0 1.5px 1px rgba(255, 255, 255, 0.9)'
              : '0 8px 24px rgba(204, 255, 0, 0.4), 3px 3px 0px #07080A, inset 0 1.5px 1px rgba(255, 255, 255, 0.8)',
            transform: devBtnHovered ? 'translateY(-3px) scale(1.08)' : 'none',
            transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            userSelect: 'none',
            outline: 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Space Grotesk', monospace",
              fontWeight: 900,
              fontSize: isMobile ? '13px' : '15px',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#07080A',
            }}
          >
            &lt;/&gt;
          </span>
        </button>
      </aside>
    </div>
  );
}
