import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModeTransition } from '../context/ModeTransitionContext';
import { soundFX } from '../components/Design/soundFX';

/**
 * DesignUnderWorkPage — State-of-the-Art "Studio Crafting in Progress" Experience.
 * Displayed when visitors on the deployed site toggle into Design Mode.
 *
 * Features:
 * - High-end Drafting Blueprint & Void Aesthetic
 * - Real-time animated calibration telemetry & progress bar
 * - Interactive Sneak-Peek Studio Plates with 3D tilt & holographic sheen
 * - Seamless return to Dev Portfolio and option to preview the Live Working Prototype (/design/studio)
 */
export default function DesignUnderWorkPage() {
  const { transitionTo } = useModeTransition();
  const navigate = useNavigate();
  const [devBtnHovered, setDevBtnHovered] = useState(false);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [timeString, setTimeString] = useState('');

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
          radial-gradient(circle at 50% 0%, rgba(204, 255, 0, 0.06) 0%, transparent 60%),
          radial-gradient(circle at 90% 80%, rgba(255, 45, 120, 0.05) 0%, transparent 50%),
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 44px 44px, 44px 44px',
        color: '#FFFFFF',
        fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0 0 40px',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Top Ambient Navigation Bar ── */}
      <header
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 900,
              fontSize: '20px',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
            }}
          >
            HowVaibhav
          </span>
          <span
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '9.5px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#CCFF00',
              textTransform: 'uppercase',
            }}
          >
            STUDIO LAB // IN PROGRESS
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              fontSize: '11px',
              fontFamily: "'JetBrains Mono', monospace",
              color: 'rgba(255, 255, 255, 0.45)',
              display: 'none',
              alignItems: 'center',
              gap: '6px',
            }}
            className="under-work-time"
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#CCFF00', display: 'inline-block', boxShadow: '0 0 8px #CCFF00' }} />
            {timeString}
          </div>

          <button
            type="button"
            onClick={() => {
              try { soundFX.playWarp(); } catch {}
              transitionTo('/');
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '999px',
              padding: '7px 16px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              try { soundFX.playHover(); } catch {}
              e.currentTarget.style.borderColor = '#CCFF00';
              e.currentTarget.style.color = '#CCFF00';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 900 }}>&lt;/&gt;</span>
            <span>Return to Dev</span>
          </button>
        </div>
      </header>

      {/* ── Main Hero Content Section ── */}
      <main
        style={{
          width: 'min(92%, 1120px)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          padding: '20px 0 40px',
        }}
      >
        {/* Monograph Top Pip & Status */}
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(204, 255, 0, 0.08)',
              border: '1px solid rgba(204, 255, 0, 0.35)',
              borderRadius: '999px',
              padding: '5px 16px',
              fontSize: '10.5px',
              fontWeight: 800,
              color: '#CCFF00',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              boxShadow: '0 0 20px rgba(204, 255, 0, 0.15)',
            }}
          >
            <span style={{ animation: 'spin 8s linear infinite', display: 'inline-block' }}>✦</span>
            <span>Creative Brand Laboratory · Edition 2026</span>
            <span>✦</span>
          </div>
        </div>

        {/* Majestic Typography Headline */}
        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: 'clamp(36px, 5.8vw, 68px)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            maxWidth: '920px',
            margin: '0 auto 18px',
            background: 'linear-gradient(180deg, #FFFFFF 30%, rgba(255,255,255,0.72) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Something extraordinary is currently taking shape.
        </h1>

        {/* Editorial Sub-Copy */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '680px',
            margin: '0 auto 36px',
            fontWeight: 400,
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
            margin: '0 auto 48px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.04em',
            }}
          >
            <span style={{ color: '#CCFF00', fontWeight: 800 }}>CALIBRATION STATUS // 88.4%</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>PHASE: PROOFING STAGE</span>
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '8px',
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              fontSize: '9.5px',
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
              fontSize: '11px',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '44px',
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
                  borderRadius: '18px',
                  padding: '16px',
                  boxShadow: isHovered
                    ? `0 20px 40px rgba(0, 0, 0, 0.7), 0 0 24px ${item.color}35`
                    : '0 8px 24px rgba(0, 0, 0, 0.4)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Widescreen Preview Plate */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '8px',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(4px)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: '8px',
                      fontWeight: 800,
                      color: item.color,
                      border: `1px solid ${item.color}60`,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 800,
                    fontSize: '18px',
                    margin: '0 0 6px',
                    color: '#FFFFFF',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '12px',
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

        {/* ── Action Buttons Hub ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
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
              padding: '12px 28px',
              fontSize: '13px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 900,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 28px rgba(204, 255, 0, 0.4), 3px 3px 0px #07080A',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
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
            <span>Return to Software Developer Portfolio</span>
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
              padding: '12px 24px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
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
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.35)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: '16px 20px 0',
          position: 'relative',
          zIndex: 10,
        }}
      >
        HOWVAIBHAV STUDIO // BRAND & ARTIFACT ARCHIVE // CURATED BY VAIBHAV VERMA
      </footer>

      {/* ── Floating Bottom-Right DEV Mode Switch Button ── */}
      <aside
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        aria-label="Switch to Developer Mode"
      >
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
            width: '52px',
            height: '52px',
            minWidth: '52px',
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
              fontSize: '15px',
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
