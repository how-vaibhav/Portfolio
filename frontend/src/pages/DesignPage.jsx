import React, { useState, useEffect } from 'react';
import CanvasScrollAnimation from '../components/CanvasScrollAnimation';
import VaibhavStudioSection from '../components/VaibhavStudioSection';
import CreativeProjectsSection from '../components/CreativeProjectsSection';
import WelcomeSection from '../components/WelcomeSection';
import IntroductionSection from '../components/IntroductionSection';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import ContactScaleSection from '../components/ContactScaleSection';
import { DesignNavbar } from '../components/Navbar/Navbar';

const ORANGE = '#E84419';

const SERVICES = [
  { num: '01', label: 'Brand Strategy' },
  { num: '02', label: 'Brand Identity Design' },
  { num: '03', label: 'Packaging Design' },
  { num: '04', label: 'Creative Design' },
];

function getResponsiveScrollVh() {
  if (typeof window === 'undefined') return 440;
  const w = window.innerWidth;
  if (w < 768) return 250;     // Mobile: 250vh (quick, natural swipes)
  if (w < 1024) return 330;    // Tablet: 330vh
  return 440;                  // Desktop: 440vh
}

/* ─── Responsive Hero ───────────────────────────────────────── */
function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="home"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isMobile
          ? '84px 20px 20px'
          : isTablet
          ? '96px 32px 28px'
          : '110px 48px 36px',
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Upper row: Headline + Tagline */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          gap: isMobile ? '16px' : '32px',
        }}
      >
        {/* Left: Headline */}
        <div>
          <p
            style={{
              fontSize: isMobile ? '13px' : '15px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
              marginBottom: isMobile ? '6px' : '10px',
              letterSpacing: '0.02em',
            }}
          >
            Hey, I'm
          </p>
          <h1
            style={{
              fontSize: isMobile
                ? 'clamp(48px, 13vw, 76px)'
                : isTablet
                ? 'clamp(64px, 9vw, 96px)'
                : 'clamp(76px, 8.5vw, 128px)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.045em',
              color: '#fff',
              textShadow: '0 2px 40px rgba(0,0,0,0.6)',
              margin: 0,
            }}
          >
            Vaibhav<br />Designer
          </h1>
        </div>

        {/* Right: Tagline */}
        <div
          style={{
            maxWidth: isMobile ? '100%' : '320px',
            textAlign: isMobile ? 'left' : 'right',
            paddingTop: isMobile ? '0' : '8px',
          }}
        >
          <p
            style={{
              fontSize: isMobile ? '16px' : '19px',
              fontWeight: 700,
              lineHeight: 1.35,
              color: '#fff',
              marginBottom: isMobile ? '6px' : '12px',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              margin: 0,
            }}
          >
            Great design should<br style={{ display: isMobile ? 'none' : 'inline' }} /> feel invisible.
          </p>
          <p
            style={{
              fontSize: isMobile ? '12px' : '13px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
              margin: isMobile ? '4px 0 0' : 0,
            }}
          >
            From logo to language, I build brands that connect and convert.
          </p>
        </div>
      </div>

      {/* Services bar — 2x2 grid on mobile, 4-column on desktop */}
      <div
        style={{
          display: isMobile ? 'grid' : 'flex',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : undefined,
          gap: isMobile ? '12px 16px' : '0',
          paddingTop: isMobile ? '16px' : '22px',
          borderTop: '1px solid rgba(255,255,255,0.14)',
          marginTop: isMobile ? '20px' : '0',
        }}
      >
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            style={{
              flex: isMobile ? undefined : 1,
              paddingRight: isMobile ? '0' : '20px',
              borderRight:
                !isMobile && i < SERVICES.length - 1
                  ? '1px solid rgba(255,255,255,0.1)'
                  : 'none',
              paddingLeft: !isMobile && i > 0 ? '20px' : '0',
            }}
          >
            <span
              style={{
                color: ORANGE,
                fontSize: isMobile ? '10px' : '11px',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              #{s.num}
            </span>
            <p
              style={{
                fontSize: isMobile ? '11px' : '12px',
                color: 'rgba(255,255,255,0.75)',
                marginTop: '3px',
                fontWeight: 500,
                margin: '3px 0 0',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Design Page ────────────────────────────────────────── */
export default function DesignPage() {
  const [scrollVh, setScrollVh] = useState(getResponsiveScrollVh);

  useEffect(() => {
    const handleResize = () => setScrollVh(getResponsiveScrollVh());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Fixed canvas: background scroll animation */}
      <CanvasScrollAnimation
        frameCount={199}
        framePrefix="/frames/ezgif-frame-"
        scrollRangeVh={scrollVh}
      />

      {/* Content layers rendered over canvas */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Animation scroll zone — sticky hero */}
        <div style={{ height: `${scrollVh}vh` }}>
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <DesignNavbar />
            <Hero />
          </div>
        </div>

        {/* Content sections */}
        <WelcomeSection />
        <VaibhavStudioSection />
        <CreativeProjectsSection />
        <IntroductionSection />
        <AboutSection />
        <EducationSection />
        <ContactScaleSection />
      </div>
    </>
  );
}
