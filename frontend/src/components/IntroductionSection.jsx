import React from 'react';

export default function IntroductionSection() {
  return (
    <section
      id="introduction"
      style={{
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '96px 48px 90px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Huge Main Header */}
        <h2
          style={{
            fontSize: 'clamp(52px, 8.5vw, 106px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.045em',
            color: '#fff',
            marginBottom: '48px',
          }}
        >
          Introduction
        </h2>

        {/* 2-Column Content Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px 64px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Portrait Photo */}
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              maxHeight: '440px',
            }}
          >
            <img
              src="/assets/photo-intro-portrait.jpg"
              alt="Lars Peeters portrait"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '440px',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>

          {/* Right Column: Bio & Text */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#fff',
                marginBottom: '28px',
              }}
            >
              Vaibhav
            </h3>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'rgba(255, 255, 255, 0.72)',
                marginBottom: '20px',
                fontWeight: 400,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'rgba(255, 255, 255, 0.72)',
                fontWeight: 400,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
