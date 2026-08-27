import React, { useEffect, useRef, useState, useCallback } from 'react';

const ORANGE = '#E84419';

const PROJECTS = [
  {
    id: 1,
    src: '/assets/photo-intro-portrait.jpg',
    title: 'Brand Identity',
    category: 'Strategy & Planning',
    number: '001',
    accentColor: '#E84419',
    initRotate: -22,
  },
  {
    id: 2,
    src: '/assets/photo-study-desk.jpg',
    title: 'Product Design',
    category: 'Design & Development',
    number: '002',
    accentColor: '#FF6B35',
    initRotate: -11,
  },
  {
    id: 3,
    src: '/assets/photo-intro-portrait.jpg',
    title: 'Creative Direction',
    category: 'Layout & Growth',
    number: '003',
    accentColor: '#C73B0C',
    initRotate: 0,
  },
  {
    id: 4,
    src: '/assets/photo-coding-lifestyle.jpg',
    title: 'Packaging Design',
    category: 'Brand Strategy',
    number: '004',
    accentColor: '#FF8C5A',
    initRotate: 11,
  },
  {
    id: 5,
    src: '/assets/photo-intro-portrait.jpg',
    title: 'Visual Systems',
    category: 'Ongoing Support',
    number: '005',
    accentColor: '#E84419',
    initRotate: 22,
  },
];

function lerp(a, b, t) { return a + (b - a) * t; }

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

export default function CreativeProjectsSection() {
  const sectionRef = useRef(null);
  const [prog, setProg] = useState(0);   // 0 → 1 across the scroll zone
  const [hovIdx, setHovIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  /* ── Responsive ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Scroll driver ──
     progress = 0 when sticky panel first pins (section top hits viewport top)
     progress = 1 when bottom of section leaves viewport bottom
  */
  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const { top } = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    // -top = how many px we've scrolled into the section
    const raw = Math.max(0, Math.min(1, -top / scrollable));
    setProg(raw);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  /* ── Card dimensions ── */
  const CARD_W = isMobile ? 120 : 180;
  const CARD_H = isMobile ? 170 : 260;
  const SPREAD = isMobile ? 135 : 210;   // final px between card centres

  const n = PROJECTS.length;              // 5
  const center = (n - 1) / 2;            // 2

  /* ── Per-card animated style ── */
  function getCardTransform(idx) {
    const off = idx - center;                       // -2 … +2

    // Start: stacked fan — all pile on center, just rotated
    const sx = 0;
    const sy = Math.abs(off) * 6;
    const sr = PROJECTS[idx].initRotate;

    // End: spread flat in a row
    const ex = off * SPREAD;
    const ey = 0;
    const er = 0;

    const t = easeOutCubic(prog);

    const x = lerp(sx, ex, t);
    const y = lerp(sy, ey, t);
    const r = lerp(sr, er, t);

    const isHov = hovIdx === idx;
    const isDim = hovIdx !== null && hovIdx !== idx;

    const scale = isHov ? 1.07 : isDim ? 0.93 : 1;
    const liftY = isHov ? -16 : 0;

    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: CARD_W,
      height: CARD_H,
      marginLeft: -CARD_W / 2,
      marginTop: -CARD_H / 2,
      borderRadius: isMobile ? 14 : 20,
      overflow: 'hidden',
      cursor: 'pointer',
      willChange: 'transform',
      transform: `translate(${x}px, ${y + liftY}px) rotate(${r}deg) scale(${scale})`,
      transformOrigin: 'center bottom',
      transition: `transform 0.35s cubic-bezier(0.16,1,0.3,1), filter 0.3s ease, box-shadow 0.3s ease`,
      zIndex: isHov ? 30 : n - Math.abs(off),
      filter: isDim ? 'brightness(0.5) saturate(0.6)' : 'brightness(1) saturate(1)',
      boxShadow: isHov
        ? `0 28px 65px rgba(0,0,0,0.85), 0 0 35px ${PROJECTS[idx].accentColor}50`
        : `0 ${10 + Math.abs(off) * 5}px ${30 + Math.abs(off) * 8}px rgba(0,0,0,0.65)`,
    };
  }

  /* ── Heading: simply always visible; slides up as progress goes 0→0.3 ── */
  const headT = easeOutCubic(Math.min(1, prog / 0.35));

  return (
    <section
      ref={sectionRef}
      id="creative-projects"
      style={{
        height: isMobile ? '280vh' : '340vh',
        position: 'relative',
      }}
    >
      {/* ── Sticky viewport — transparent so canvas shows through ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          /* transparent — lets the canvas animation bleed through */
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ── Soft orange halo behind cards ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 70% 55% at 50% 68%, ${ORANGE}1a 0%, transparent 72%)`,
            pointerEvents: 'none',
          }}
        />

        {/* ── Heading ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            textAlign: 'center',
            marginBottom: isMobile ? 28 : 44,
            opacity: headT,
            transform: `translateY(${lerp(30, 0, headT)}px)`,
            padding: '0 24px',
          }}
        >
          <p
            style={{
              color: ORANGE,
              fontSize: isMobile ? '10px' : '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Behind the Designs
          </p>

          <h2
            style={{
              fontSize: isMobile ? 'clamp(26px,8vw,40px)' : 'clamp(36px,4.5vw,58px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.06,
              color: '#fff',
              margin: '0 0 14px',
              textShadow: '0 2px 30px rgba(0,0,0,0.5)',
            }}
          >
            Curious What Else I've
            <br />
            Created?
          </h2>

          <p
            style={{
              fontSize: isMobile ? '12px' : '14px',
              color: 'rgba(255,255,255,0.48)',
              margin: '0 auto',
              lineHeight: 1.65,
              maxWidth: 400,
            }}
          >
            Scroll to fan out every project — hover to inspect.
          </p>
        </div>

        {/* ── Card stage ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 6,
            width: '100%',
            height: CARD_H + 60,
            /* NO perspective — pure 2-D spread is cleaner */
          }}
        >
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              style={getCardTransform(idx)}
              onMouseEnter={() => setHovIdx(idx)}
              onMouseLeave={() => setHovIdx(null)}
            >
              {/* Photo */}
              <img
                src={proj.src}
                alt={proj.title}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />

              {/* Dark-to-transparent bottom gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Number badge — top-left */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  background: 'rgba(0,0,0,0.52)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 999,
                  padding: '3px 9px',
                  fontSize: 9,
                  fontWeight: 700,
                  color: ORANGE,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {proj.number}
              </div>

              {/* Title & category — bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: isMobile ? '10px 12px' : '14px 16px',
                }}
              >
                <p
                  style={{
                    margin: '0 0 3px',
                    fontSize: isMobile ? '11px' : '13px',
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {proj.title}
                </p>
                <span
                  style={{
                    fontSize: isMobile ? '9px' : '10px',
                    fontWeight: 600,
                    color: proj.accentColor,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                  }}
                >
                  {proj.category}
                </span>
              </div>

              {/* Accent border on hover */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'inherit',
                  border: `1.5px solid ${
                    hovIdx === idx
                      ? proj.accentColor + '99'
                      : 'rgba(255,255,255,0.08)'
                  }`,
                  pointerEvents: 'none',
                  transition: 'border-color 0.25s ease',
                }}
              />
            </div>
          ))}
        </div>

        {/* ── "See More Projects" CTA — appears when fully fanned ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 7,
            marginTop: isMobile ? 24 : 36,
            opacity: easeOutCubic(Math.max(0, (prog - 0.65) / 0.35)),
            transform: `translateY(${lerp(20, 0, easeOutCubic(Math.max(0, (prog - 0.65) / 0.35)))}px)`,
            pointerEvents: prog > 0.7 ? 'auto' : 'none',
          }}
        >
          <a
            href="#contact"
            style={{
              background: ORANGE,
              color: '#fff',
              borderRadius: 999,
              padding: isMobile ? '10px 22px' : '12px 28px',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.85';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            See More Projects
            <span
              style={{
                background: 'rgba(255,255,255,0.22)',
                borderRadius: '50%',
                width: 22,
                height: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
              }}
            >
              →
            </span>
          </a>
        </div>

        {/* ── Scroll progress bar ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: `${prog * 100}%`,
            background: `linear-gradient(to right, ${ORANGE}, #FF9260)`,
            transition: 'width 0.06s linear',
            zIndex: 20,
          }}
        />

        {/* ── Scroll hint (fades out early) ── */}
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? 20 : 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
            opacity: Math.max(0, 1 - prog * 12),
            transition: 'opacity 0.4s',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: 1,
              height: 36,
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))',
              animation: 'cpScrollHint 1.8s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            Scroll
          </span>
        </div>
      </div>

      <style>{`
        @keyframes cpScrollHint {
          0%   { opacity: 0; transform: scaleY(0.3) translateY(-4px); }
          50%  { opacity: 1; transform: scaleY(1)   translateY(0); }
          100% { opacity: 0; transform: scaleY(0.3) translateY(4px); }
        }
      `}</style>
    </section>
  );
}
