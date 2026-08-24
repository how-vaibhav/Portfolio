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
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '../components/ui/scroll-based-velocity';

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
        boxSizing: 'border-box',
      }}
    >
      {/* Top Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: ORANGE,
          }}
        />
        <span
          style={{
            fontSize: isMobile ? '10px' : '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 600,
          }}
        >
          Creative Developer & Designer
        </span>
      </div>

      {/* Center Giant Display Headline */}
      <div style={{ my: 'auto', padding: isMobile ? '16px 0' : '24px 0' }}>
        <h1
          style={{
            fontFamily: "'Bebas Neue', 'Syne', sans-serif",
            fontSize: isMobile
              ? 'clamp(46px, 14vw, 76px)'
              : isTablet
              ? 'clamp(70px, 11vw, 110px)'
              : 'clamp(90px, 10.5vw, 148px)',
            lineHeight: 0.88,
            letterSpacing: '0.02em',
            color: '#ffffff',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          VAIBHAV
          <br />
          <span
            style={{
              WebkitTextStroke: '1.5px rgba(255,255,255,0.45)',
              color: 'transparent',
            }}
          >
            STUDIO
          </span>
        </h1>
      </div>

      {/* Bottom Service Badges Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(2, 1fr)'
            : isTablet
            ? 'repeat(4, 1fr)'
            : 'repeat(4, 1fr)',
          gap: isMobile ? '8px' : '14px',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          paddingTop: isMobile ? '12px' : '18px',
        }}
      >
        {SERVICES.map((s) => (
          <div key={s.num} style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                color: ORANGE,
                fontWeight: 700,
                marginBottom: '2px',
              }}
            >
              {s.num}
            </span>
            <span
              style={{
                fontSize: isMobile ? '11px' : '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.2,
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Creative Velocity Marquee ───────────────────────────────── */
function DesignVelocityTicker() {
  return (
    <div
      style={{
        padding: '36px 0',
        background: '#050A0F',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <ScrollVelocityContainer>
        <ScrollVelocityRow
          baseVelocity={12}
          direction={1}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(38px, 6vw, 68px)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#ffffff',
            paddingBottom: '8px',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '28px', paddingRight: '28px' }}>
            <span>BRAND IDENTITY</span>
            <span style={{ color: ORANGE }}>✦</span>
            <span>PACKAGING DESIGN</span>
            <span style={{ color: ORANGE }}>✦</span>
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)', color: 'transparent' }}>
              CREATIVE DIRECTION
            </span>
            <span style={{ color: ORANGE }}>✦</span>
            <span>DIGITAL EXPERIENCES</span>
            <span style={{ color: ORANGE }}>✦</span>
          </span>
        </ScrollVelocityRow>

        <ScrollVelocityRow
          baseVelocity={12}
          direction={-1}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(38px, 6vw, 68px)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '28px', paddingRight: '28px' }}>
            <span style={{ color: ORANGE }}>3D VISUALIZATION</span>
            <span style={{ color: ORANGE }}>✦</span>
            <span>STRATEGY & ARCHITECTURE</span>
            <span style={{ color: ORANGE }}>✦</span>
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)', color: 'transparent' }}>
              BESPOKE TYPOGRAPHY
            </span>
            <span style={{ color: ORANGE }}>✦</span>
            <span>GLOBAL CLIENTS</span>
            <span style={{ color: ORANGE }}>✦</span>
          </span>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}

/* ─── Main Design Page Export ────────────────────────────────── */
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
        
        {/* Scroll-Based Velocity Marquee */}
        <DesignVelocityTicker />

        <CreativeProjectsSection />
        <IntroductionSection />
        <AboutSection />
        <EducationSection />
        <ContactScaleSection />
      </div>
    </>
  );
}
