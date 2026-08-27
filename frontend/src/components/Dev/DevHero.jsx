import React, { useState, useEffect } from 'react';
import './dev.css';

export default function DevHero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1080);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        paddingTop: isMobile ? '88px' : '110px',
        paddingBottom: '0px',
        paddingLeft: isMobile ? '20px' : isTablet ? '36px' : '64px',
        paddingRight: isMobile ? '20px' : isTablet ? '36px' : '64px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: '#080808',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 75% 35%, rgba(37, 85, 255, 0.15) 0%, transparent 55%),
            radial-gradient(circle at 20% 70%, rgba(204, 255, 0, 0.05) 0%, transparent 45%)
          `,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1.15fr 0.85fr',
          gap: isMobile ? '32px' : '36px',
          alignItems: 'flex-end',
        }}
      >
        {/* ========================================================= */}
        {/* LEFT COLUMN: 4-Dot Matrix + Bold Headline + Subtitle + CTAs */}
        {/* ========================================================= */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            zIndex: 10,
            paddingBottom: isMobile ? '20px' : '60px',
          }}
        >
          {/* Top 4-pixel square matrix icon (2x2) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 6px)',
              gap: '6px',
              marginBottom: isMobile ? '18px' : '24px',
            }}
          >
            <span style={{ width: '6px', height: '6px', background: '#ffffff', display: 'block' }} />
            <span style={{ width: '6px', height: '6px', background: '#ffffff', display: 'block' }} />
            <span style={{ width: '6px', height: '6px', background: '#ffffff', display: 'block' }} />
            <span style={{ width: '6px', height: '6px', background: '#ffffff', display: 'block' }} />
          </div>

          {/* Massive Multi-line Industrial Headline */}
          <h1
            style={{
              fontFamily: "'Archivo Black', 'Inter', -apple-system, sans-serif",
              fontSize: isMobile
                ? 'clamp(46px, 13.2vw, 68px)'
                : isTablet
                ? 'clamp(54px, 7.2vw, 80px)'
                : 'clamp(68px, 6.8vw, 110px)',
              fontWeight: 900,
              lineHeight: 0.89,
              letterSpacing: '-0.045em',
              textTransform: 'uppercase',
              margin: 0,
              marginBottom: '26px',
            }}
          >
            <span style={{ display: 'block', color: '#ffffff' }}>I DESIGN.</span>
            <span style={{ display: 'block', color: '#ffffff' }}>I CODE.</span>
            <span
              style={{
                display: 'block',
                color: '#2555FF',
                textShadow: '0 0 50px rgba(37, 85, 255, 0.6)',
              }}
            >
              I ELEVATE
            </span>
            <span style={{ display: 'block', color: '#ffffff' }}>BRANDS.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: isMobile ? '14px' : '15.5px',
              color: 'rgba(255, 255, 255, 0.72)',
              maxWidth: '460px',
              lineHeight: 1.55,
              margin: '0 0 32px 0',
              fontWeight: 400,
            }}
          >
            Creative Developer crafting bold digital experiences that are fast, functional and unforgettable.
          </p>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Layered Dynamic Chevron + Lime Brush "X" + Person Cutout */}
        {/* ========================================================= */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            minHeight: isMobile ? '460px' : isTablet ? '560px' : '650px',
            width: '100%',
          }}
        >
          {/* 1. LAYER: Solid Electric Cobalt Blue Geometric Chevron (#2555FF) */}
          <div
            style={{
              position: 'absolute',
              top: isMobile ? '5%' : '8%',
              left: isMobile ? '2%' : '8%',
              right: isMobile ? '2%' : '0%',
              bottom: '0%',
              background: '#2555FF',
              clipPath: 'polygon(32% 0%, 100% 0%, 75% 100%, 0% 100%)',
              zIndex: 1,
              opacity: 0.98,
              boxShadow: '0 0 100px rgba(37, 85, 255, 0.55)',
            }}
          />

          {/* 2. LAYER: Neon Lime Textured Cyber Brush "X" Cross Graphic */}
          <div
            style={{
              position: 'absolute',
              top: isMobile ? '10%' : '12%',
              right: isMobile ? '-10px' : '-20px',
              width: isMobile ? '240px' : isTablet ? '320px' : '400px',
              height: isMobile ? '260px' : isTablet ? '340px' : '420px',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <svg viewBox="0 0 300 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="14" flood-color="#CCFF00" flood-opacity="0.85" />
                </filter>
              </defs>

              {/* Arm 1: Top-Left to Bottom-Right */}
              <line
                x1="35"
                y1="35"
                x2="265"
                y2="265"
                stroke="#CCFF00"
                strokeWidth="58"
                strokeLinecap="square"
                filter="url(#neonGlow)"
              />

              {/* Arm 2: Top-Right to Bottom-Left */}
              <line
                x1="265"
                y1="35"
                x2="35"
                y2="265"
                stroke="#CCFF00"
                strokeWidth="58"
                strokeLinecap="square"
                filter="url(#neonGlow)"
              />

              {/* Subtle architectural notch cuts */}
              <line x1="24" y1="24" x2="60" y2="60" stroke="#080808" strokeWidth="10" />
              <line x1="240" y1="240" x2="276" y2="276" stroke="#080808" strokeWidth="10" />
              <line x1="245" y1="25" x2="275" y2="55" stroke="#080808" strokeWidth="10" />
            </svg>
          </div>

          {/* 3. LAYER: Transparent Person Portrait (a.png) Positioned in Foreground */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              width: isMobile ? '320px' : isTablet ? '400px' : '480px',
              maxWidth: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <img
              src="/assets/vaibhav-hero.png"
              alt="Vaibhav — Creative Developer"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: isMobile ? '430px' : isTablet ? '530px' : '620px',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                display: 'block',
                filter: 'contrast(1.1) brightness(1.02) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.8))',
              }}
            />
          </div>

          {/* 4. LAYER: Badges, Reticle Target, Slashes, and Globe Decals */}
          {/* Top-Right: Target Reticle + Stacked Uppercase Labels */}
          <div
            style={{
              position: 'absolute',
              top: '0px',
              right: isMobile ? '0px' : '-16px',
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              textAlign: 'right',
              gap: '6px',
            }}
          >
            {/* Target Reticle SVG */}
            <div
              style={{
                width: '26px',
                height: '26px',
                marginBottom: '4px',
                color: '#ffffff',
              }}
            >
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="8" strokeOpacity="0.8" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>

            {/* 3-Line Technical Badges */}
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? '9px' : '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                lineHeight: 1.35,
                color: 'rgba(255, 255, 255, 0.92)',
                textTransform: 'uppercase',
              }}
            >
              <div>UI/UX FOCUSED</div>
              <div>PERFORMANCE DRIVEN</div>
              <div>PIXEL PERFECT</div>
            </div>
          </div>

          {/* Middle-Right: Slashes Hatch Graphic */}
          <div
            style={{
              position: 'absolute',
              top: '40%',
              right: isMobile ? '-8px' : '-32px',
              zIndex: 5,
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 900,
              letterSpacing: '0.15em',
              color: 'rgba(255, 255, 255, 0.45)',
              transform: 'rotate(-4deg)',
              userSelect: 'none',
            }}
          >
            ///////
          </div>

          {/* Bottom-Right: Wireframe Globe SVG */}
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              right: isMobile ? '0px' : '-24px',
              zIndex: 5,
              width: '28px',
              height: '28px',
              color: 'rgba(255, 255, 255, 0.75)',
            }}
          >
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
