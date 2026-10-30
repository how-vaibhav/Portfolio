import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useModeTransition } from '../context/ModeTransitionContext';
import { soundFX } from '../components/Design/soundFX';
import {
  Motif1_Dharmachakra,
  Motif2_SuryaAureole,
  Motif3_KolamKnot,
  Motif4_ToranaBracket,
  Motif5_YantraWatermark,
  Motif6_PadmaCorner,
  Motif7_KalashFinial,
  Motif8_BinduCore,
  Motif9_DevanagariStamp,
  Motif10_MayuraFlourish,
} from '../components/Design/IndianMotifs';

/**
 * DesignUnderWorkPage — State-of-the-Art Creative Studio Exhibition Preview.
 *
 * Infused with:
 * - Professional Framer Motion physics, entrance choreography & micro-interactions.
 * - 10 Curated Ancient Indian Artistic Micro-Motifs (Chakra, Surya, Kolam, Torana, Yantra, Padma, Kalash, Bindu, Devanagari Mudrika, Mayura).
 * - Only the hero headline: "Something extraordinary is currently taking shape."
 * - Flawlessly responsive across mobile phones (360px-430px) and wide screens.
 * - Zero navbar clutter (no time, no switch button in header).
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
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = 'HowVaibhav — Creative Studio [Crafting In Progress]';
    return () => {
      document.title = 'Vaibhav Tiwari — Software Developer & CS Portfolio';
    };
  }, []);

  // Curated exhibition master plates with individual Indian Mudrika Seal stamps
  const EXHIBITION_PLATES = [
    {
      id: 'plate-1',
      plateNo: 'PLATE I',
      title: 'Typographic Anatomy',
      artwork: '/assets/text_image/artwork-h.jpg',
      color: '#FF2D78',
      stampGlyph: 'सृजन',
      stampSub: 'SRIJAN // CREATION',
      curatorialNote: 'Bespoke letterform dissection with precision optical stems and laser harmonic guides.',
    },
    {
      id: 'plate-2',
      plateNo: 'PLATE II',
      title: '3D Spatial Conveyor Deck',
      artwork: '/assets/text_image/artwork-o.jpg',
      color: '#FF5500',
      stampGlyph: 'कला',
      stampSub: 'KALĀ // AESTHETICS',
      curatorialNote: 'Volumetric continuous spatial projection gallery inspired by avant-garde European monographs.',
    },
    {
      id: 'plate-3',
      plateNo: 'PLATE III',
      title: 'Tactile Brand Dossiers',
      artwork: '/assets/text_image/artwork-b.jpg',
      color: '#C2E03A',
      stampGlyph: 'रूप',
      stampSub: 'ROOP // STRUCTURE',
      curatorialNote: 'Physical paper folder physics, debossed verification stamps, and bespoke executive monographs.',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#07080B',
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(255, 184, 0, 0.05) 0%, transparent 60%),
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
        padding: isMobile ? '0 0 36px' : '0 0 54px',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Top Header Navigation Bar (Clean & Uncluttered: No Time, No Toggle) ── */}
      <header
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: isMobile ? '16px 18px' : '26px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 20,
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Monogram + [Element 1: Dharmachakra Rotating Cosmic Wheel] */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
          {/* Element 1: Dharmachakra Micro Cosmic Wheel */}
          <Motif1_Dharmachakra size={isMobile ? 18 : 22} color="#FFB800" />

          <span
            style={{
              fontFamily: "'Fraunces', 'Bodoni Moda', Georgia, serif",
              fontWeight: 900,
              fontSize: isMobile ? '18px' : '23px',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
            }}
          >
            HowVaibhav
          </span>

          <span
            style={{
              background: 'rgba(255, 184, 0, 0.08)',
              border: '1px solid rgba(255, 184, 0, 0.22)',
              borderRadius: '999px',
              padding: '2.5px 9px',
              fontSize: isMobile ? '8px' : '9.5px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#FFB800',
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
            fontSize: isMobile ? '9px' : '10.5px',
            fontFamily: "'Space Grotesk', monospace",
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.45)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {/* Element 8: Bindu Core Status Indicator */}
          <Motif8_BinduCore color="#CCFF00" size={8} />
          <span>CRAFTING</span>
        </div>
      </header>

      {/* ── Main Hero Section ── */}
      <main
        style={{
          width: 'min(92%, 1180px)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          padding: isMobile ? '12px 0 24px' : '24px 0 36px',
        }}
      >
        {/* [Element 2: Surya Aureole Radiating Solar Corona Glow behind Headline] */}
        <Motif2_SuryaAureole isMobile={isMobile} />

        {/* Master Headline with Smooth Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
        >
          <h1
            style={{
              fontFamily: "'Fraunces', 'Bodoni Moda', Georgia, serif",
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 5.8vw, 66px)',
              lineHeight: 1.12,
              letterSpacing: '-0.035em',
              textAlign: 'center',
              maxWidth: '960px',
              margin: isMobile ? '12px auto 18px' : '20px auto 24px',
              background: 'linear-gradient(180deg, #FFFFFF 25%, rgba(255, 255, 255, 0.72) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              padding: '0 8px',
            }}
          >
            Something extraordinary is currently taking shape.
          </h1>

          {/* [Element 3: Kolam / Rangoli Infinity Knotwork Divider Ribbon] */}
          <div style={{ margin: isMobile ? '14px 0 28px' : '20px 0 42px' }}>
            <Motif3_KolamKnot color="#FFB800" />
          </div>
        </motion.div>

        {/* ── Artistically Elevated Exhibition Cards Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '20px' : '26px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {EXHIBITION_PLATES.map((plate, idx) => {
            const isHovered = hoveredPlateId === plate.id;
            return (
              <motion.article
                key={plate.id}
                initial={{ opacity: 0, y: 36, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.65,
                  delay: 0.15 + idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={
                  !isMobile
                    ? {
                        y: -8,
                        scale: 1.015,
                        transition: { duration: 0.28, ease: 'easeOut' },
                      }
                    : undefined
                }
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
                  background: 'linear-gradient(170deg, rgba(16, 19, 28, 0.82) 0%, rgba(9, 11, 16, 0.94) 100%)',
                  border: isHovered
                    ? `1.5px solid ${plate.color}`
                    : '1.5px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: isMobile ? '16px 14px' : '20px 18px',
                  boxShadow: isHovered
                    ? `0 24px 50px rgba(0, 0, 0, 0.85), 0 0 35px ${plate.color}35`
                    : '0 10px 30px rgba(0, 0, 0, 0.55)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  transition: 'border 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* [Element 4: Torana Temple Archway Scalloped Corner Brackets on 4 Corners] */}
                <Motif4_ToranaBracket position="top-left" color="#FFB800" />
                <Motif4_ToranaBracket position="top-right" color="#FFB800" />
                <Motif4_ToranaBracket position="bottom-left" color="#FFB800" />
                <Motif4_ToranaBracket position="bottom-right" color="#FFB800" />

                {/* [Element 5: Yantra Sacred Interlocking Triangles Watermark in background] */}
                <Motif5_YantraWatermark color={plate.color} />

                {/* Ambient Color Glow Sphere behind Card */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-25%',
                    right: '-25%',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: plate.color,
                    opacity: isHovered ? 0.22 : 0.06,
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
                  {/* [Element 6: Padma Sacred 4-Petal Lotus Accents on Vitrine Corners] */}
                  <Motif6_PadmaCorner position="top-left" color="#FFB800" />
                  <Motif6_PadmaCorner position="top-right" color="#FFB800" />
                  <Motif6_PadmaCorner position="bottom-left" color="#FFB800" />
                  <Motif6_PadmaCorner position="bottom-right" color="#FFB800" />

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
                      background: 'rgba(0, 0, 0, 0.75)',
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
                      zIndex: 6,
                    }}
                  >
                    <span>⛶</span>
                    <span>HD</span>
                  </div>
                </div>

                {/* Specimen Tag Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    {/* [Element 7: Kalash Finial Arch Crest] */}
                    <Motif7_KalashFinial color={plate.color} />

                    {/* [Element 8: Bindu Core Center Focal Pip] */}
                    <Motif8_BinduCore color={plate.color} size={8} />

                    <span
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: '9.5px',
                        fontWeight: 900,
                        color: plate.color,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {plate.plateNo}
                    </span>
                  </div>

                  {/* [Element 9: Devanagari Mudrika Royal Craft Seal Stamp] */}
                  <Motif9_DevanagariStamp
                    glyph={plate.stampGlyph}
                    sub={plate.stampSub.split(' // ')[0]}
                    color="#FFB800"
                  />
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
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {plate.title}
                </h2>

                {/* Curatorial Note + [Element 10: Mayura Feather Flourish] */}
                <p
                  style={{
                    fontSize: isMobile ? '11.5px' : '12.5px',
                    lineHeight: 1.55,
                    color: 'rgba(255, 255, 255, 0.62)',
                    margin: 0,
                    fontWeight: 400,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {plate.curatorialNote}
                  {/* Element 10: Mayura Feather Flourish */}
                  <Motif10_MayuraFlourish color="#00E5C3" />
                </p>
              </motion.article>
            );
          })}
        </div>
      </main>

      {/* ── Cinematic Full-Screen Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxPlate && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxPlate(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(4, 5, 8, 0.94)',
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '20px 14px' : '36px',
              boxSizing: 'border-box',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                  <Motif8_BinduCore color={lightboxPlate.color} size={9} />
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
                    width: '38px',
                    height: '38px',
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

              {/* High Resolution Artwork Frame with Torana Corners */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: '#020305',
                  border: `1.5px solid ${lightboxPlate.color}45`,
                  boxShadow: `0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px ${lightboxPlate.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Motif4_ToranaBracket position="top-left" color="#FFB800" />
                <Motif4_ToranaBracket position="top-right" color="#FFB800" />
                <Motif4_ToranaBracket position="bottom-left" color="#FFB800" />
                <Motif4_ToranaBracket position="bottom-right" color="#FFB800" />

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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
