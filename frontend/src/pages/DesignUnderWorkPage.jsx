import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModeTransition } from '../context/ModeTransitionContext';
import { soundFX } from '../components/Design/soundFX';
import ModeToggle from '../components/ModeToggle';

/**
 * DesignUnderWorkPage — State-of-the-Art "Studio Crafting in Progress" Experience.
 * Shown to visitors on the deployed site when toggling into Design Mode.
 *
 * Mobile-First Responsive Architecture:
 * - Fluid clamp typography and padding
 * - Integrated ModeToggle in the header
 * - Responsive 1-col to 3-col preview cards
 * - Tactile action buttons with mobile tap target sizing
 */
export default function DesignUnderWorkPage() {
  const { transitionTo } = useModeTransition();
  const navigate = useNavigate();
  const [devBtnHovered, setDevBtnHovered] = useState(false);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [timeString, setTimeString] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Live real-time studio clock
  useEffect(() => {
    document.title = 'HowVaibhav — Creative Studio [Crafting In Progress]';
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(interval);
      document.title = 'Vaibhav Verma — Software Developer & CS Portfolio';
    };
  }, []);

  const SNEAK_PEEK_PLATES = [
    {
      id: 'plate-1',
      title: 'Typographic Anatomy',
      tag: 'SPECIMEN 01 // H · HIERARCHY',
      image: '/assets/text_image/artwork-h.jpg',
      color: '#FF2D78',
      desc: 'Bespoke letterform dissection with interactive gyro lenses & laser connectors.',
    },
    {
      id: 'plate-2',
      title: '3D Conveyor Deck',
      tag: 'SYSTEM 02 // ISOMETRIC AXIS',
      image: '/assets/text_image/artwork-o.jpg',
      color: '#FF8A00',
      desc: 'Continuous spatial projection gallery inspired by contemporary European monographs.',
    },
    {
      id: 'plate-3',
      title: 'Tactile Brand Dossiers',
      tag: 'ARCHIVE 03 // B · BASELINE',
      image: '/assets/text_image/artwork-b.jpg',
      color: '#C2E03A',
      desc: 'Physical paper folder physics, debossed stamps, and executive case dossiers.',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#07080B',
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(204, 255, 0, 0.07) 0%, transparent 60%),
          radial-gradient(circle at 90% 80%, rgba(255, 45, 120, 0.05) 0%, transparent 50%),
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
        color: '#FFFFFF',
        fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isMobile ? '0 0 30px' : '0 0 44px',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Top Header Navigation Bar with Integrated ModeToggle ── */}
      <header
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: isMobile ? '16px 18px 12px' : '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          position: 'relative',
          zIndex: 20,
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Name & Studio Status Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 900,
              fontSize: isMobile ? '18px' : '22px',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
            }}
          >
            HowVaibhav
          </span>
          <span
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '999px',
              padding: '2.5px 8px',
              fontSize: isMobile ? '8px' : '9.5px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#CCFF00',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {isMobile ? 'WIP LAB' : 'STUDIO LAB // IN PROGRESS'}
          </span>
        </div>

        {/* Right Controls: ModeToggle Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!isMobile && (
            <div
              style={{
                fontSize: '11px',
                fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(255, 255, 255, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#CCFF00',
                  display: 'inline-block',
                  boxShadow: '0 0 8px #CCFF00',
                }}
              />
              {timeString}
            </div>
          )}

          {/* Integrated Mode Toggle Pill */}
          <ModeToggle />
        </div>
      </header>

      {/* ── Main Hero Content Section ── */}
      <main
        style={{
          width: 'min(92%, 1120px)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          padding: isMobile ? '10px 0 30px' : '20px 0 40px',
        }}
      >
        {/* Monograph Top Pip & Status */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '14px' : '18px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(204, 255, 0, 0.08)',
              border: '1px solid rgba(204, 255, 0, 0.35)',
              borderRadius: '999px',
              padding: isMobile ? '4px 12px' : '5px 16px',
              fontSize: isMobile ? '9.5px' : '10.5px',
              fontWeight: 800,
              color: '#CCFF00',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 0 20px rgba(204, 255, 0, 0.15)',
            }}
          >
            <span>✦</span>
            <span>Brand Laboratory · Edition 2026</span>
            <span>✦</span>
          </div>
        </div>

        {/* Majestic Typography Headline */}
        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 6.2vw, 64px)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            maxWidth: '920px',
            margin: '0 auto 16px',
            background: 'linear-gradient(180deg, #FFFFFF 30%, rgba(255,255,255,0.72) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            padding: '0 8px',
          }}
        >
          Something extraordinary is currently taking shape.
        </h1>

        {/* Editorial Sub-Copy */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 'clamp(13px, 2.5vw, 16.5px)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '680px',
            margin: isMobile ? '0 auto 28px' : '0 auto 36px',
            fontWeight: 400,
            padding: '0 12px',
          }}
        >
          The graphic design archive, bespoke typographic specimens, and 3D conveyor portfolios of{' '}
          <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>HowVaibhav</strong> are undergoing final
          monograph curation and spatial calibrations.
        </p>

        {/* ── Blueprint Calibration Bar ── */}
        <div
          style={{
            maxWidth: '640px',
            margin: isMobile ? '0 auto 36px' : '0 auto 48px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: isMobile ? '14px 14px' : '16px 20px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? '9.5px' : '11px',
              letterSpacing: '0.04em',
            }}
          >
            <span style={{ color: '#CCFF00', fontWeight: 800 }}>CALIBRATION // 88.4%</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>PROOFING STAGE</span>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '88.4%',
                height: '100%',
                background: 'linear-gradient(90deg, #00E5C3, #CCFF00)',
                borderRadius: '999px',
                boxShadow: '0 0 16px rgba(204, 255, 0, 0.6)',
                position: 'relative',
              }}
            />
          </div>

          {/* Micro Telemetry Milestones */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '8px',
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              fontSize: isMobile ? '9px' : '9.5px',
              fontFamily: "'Space Grotesk', monospace",
              color: 'rgba(255, 255, 255, 0.55)',
            }}
          >
            <div>✦ ANATOMY: <span style={{ color: '#00E5C3' }}>READY ✓</span></div>
            <div>✦ 3D ARCHIVE: <span style={{ color: '#CCFF00' }}>POLISHING ⚙</span></div>
            <div>✦ DOSSIERS: <span style={{ color: '#00E5C3' }}>INDEXED ✓</span></div>
            <div>✦ PINBOARD: <span style={{ color: '#00E5C3' }}>READY ✓</span></div>
          </div>
        </div>

        {/* ── Sneak Peek Showcase Cards (Interactive Slanted Plates) ── */}
        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <span
            style={{
              fontSize: isMobile ? '10px' : '11px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.4)',
            }}
          >
            ✦ IN THE KILN // PREVIEW PLATES ✦
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '14px' : '20px',
            marginBottom: isMobile ? '32px' : '44px',
          }}
        >
          {SNEAK_PEEK_PLATES.map((item, idx) => {
            const isHovered = activePreviewIndex === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  try { soundFX.playHover(); } catch {}
                  setActivePreviewIndex(idx);
                }}
                style={{
                  background: 'rgba(15, 17, 24, 0.85)',
                  border: isHovered ? `1.5px solid ${item.color}` : '1.5px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: isMobile ? '14px' : '16px',
                  boxShadow: isHovered
                    ? `0 20px 40px rgba(0, 0, 0, 0.7), 0 0 24px ${item.color}35`
                    : '0 8px 24px rgba(0, 0, 0, 0.4)',
                  transform: !isMobile && isHovered ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Widescreen Preview Plate - 16:9 Uncropped Original Aspect Ratio */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    background: '#07090E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                      transition: 'transform 0.4s ease',
                      display: 'block',
                    }}
                  />
                </div>

                {/* Specimen Tag Bar (Clean, zero image obscuration) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: '8px',
                      fontWeight: 800,
                      color: item.color,
                      background: `${item.color}18`,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: `1px solid ${item.color}50`,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: '7.5px',
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    16:9 ORIGINAL
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 800,
                    fontSize: isMobile ? '16px' : '18px',
                    margin: '0 0 4px',
                    color: '#FFFFFF',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? '11.5px' : '12px',
                    lineHeight: 1.5,
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Action Buttons Hub (Responsive: stacked on mobile, row on desktop) ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '10px' : '14px',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          {/* Primary Action: Return to Developer Portfolio */}
          <button
            type="button"
            onClick={() => {
              try { soundFX.playWarp(); } catch {}
              transitionTo('/');
            }}
            style={{
              background: '#CCFF00',
              color: '#07080A',
              border: '2px solid #07080A',
              borderRadius: '999px',
              padding: isMobile ? '13px 20px' : '12px 28px',
              fontSize: isMobile ? '12.5px' : '13px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 900,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 10px 28px rgba(204, 255, 0, 0.4), 3px 3px 0px #07080A',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              width: isMobile ? '100%' : 'auto',
              boxSizing: 'border-box',
            }}
            onMouseEnter={(e) => {
              try { soundFX.playHover(); } catch {}
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 14px 36px rgba(204, 255, 0, 0.6), 4px 4px 0px #07080A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(204, 255, 0, 0.4), 3px 3px 0px #07080A';
            }}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: '14px' }}>&lt;/&gt;</span>
            <span>Return to Software Developer Mode</span>
          </button>

          {/* Secondary Action: Explore Working Prototype (/design/studio) */}
          <button
            type="button"
            onClick={() => {
              try { soundFX.playSnap(); } catch {}
              navigate('/design/studio');
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#FFFFFF',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '999px',
              padding: isMobile ? '13px 20px' : '12px 24px',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
              width: isMobile ? '100%' : 'auto',
              boxSizing: 'border-box',
            }}
            onMouseEnter={(e) => {
              try { soundFX.playHover(); } catch {}
              e.currentTarget.style.borderColor = '#00E5C3';
              e.currentTarget.style.color = '#00E5C3';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <span>Explore Working Studio Prototype (Beta)</span>
            <span>→</span>
          </button>
        </div>
      </main>

      {/* ── Ultra-Minimal Footer Signoff ── */}
      <footer
        style={{
          textAlign: 'center',
          fontSize: isMobile ? '9.5px' : '11px',
          color: 'rgba(255, 255, 255, 0.35)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: '16px 16px 0',
          position: 'relative',
          zIndex: 10,
        }}
      >
        HOWVAIBHAV STUDIO // BRAND ARCHIVE // VAIBHAV VERMA
      </footer>

      {/* ── Floating Bottom-Right DEV Mode Switch Button ── */}
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
        aria-label="Switch to Developer Mode"
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
          title="Switch to Software Developer & CS Mode"
          aria-label="Switch to Developer Mode"
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
