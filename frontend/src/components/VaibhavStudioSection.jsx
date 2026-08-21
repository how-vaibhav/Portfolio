import React from 'react';

export default function VaibhavStudioSection() {
  return (
    <section
      id="studio"
      style={{
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '90px 48px 100px',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Top Header Row with Meta Info */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '28px',
          }}
        >
          <div style={{ maxWidth: '280px', textAlign: 'right' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#fff',
                display: 'block',
                marginBottom: '6px',
                textTransform: 'uppercase',
              }}
            >
              SINCE 2020
            </span>
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.65)',
                margin: 0,
                fontWeight: 400,
              }}
            >
              Vaibhav is a Creative Director building scalable digital experiences and high-impact products for modern brands.
            </p>
          </div>
        </div>

        {/* Horizontal 3-Element Layout: HOW (Left, shifted up) - Card (Center) - VAIBHAV (Right, shifted down with reduced opacity) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            width: '100%',
            flexWrap: 'nowrap',
          }}
        >
          {/* Left: HOW (Moved little up) */}
          <div
            style={{
              flex: 1,
              textAlign: 'left',
              userSelect: 'none',
              transform: 'translateY(-28px)',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(56px, 10.5vw, 155px)',
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-0.05em',
                color: '#fff',
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 4px 40px rgba(0,0,0,0.5)',
              }}
            >
              HOW
            </h2>
          </div>

          {/* Center: Featured ezgif-frame-001 Card */}
          <div
            style={{
              width: 'clamp(190px, 21vw, 290px)',
              height: 'clamp(260px, 29vw, 390px)',
              borderRadius: '22px',
              padding: '6px',
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.5) 100%)',
              boxShadow:
                '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(232, 68, 25, 0.18)',
              zIndex: 15,
              flexShrink: 0,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
              e.currentTarget.style.boxShadow =
                '0 32px 70px rgba(0, 0, 0, 0.95), 0 0 50px rgba(232, 68, 25, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow =
                '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(232, 68, 25, 0.18)';
            }}
          >
            {/* Inner Image Container */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                background: '#0a0a0a',
              }}
            >
              <img
                src="/assets/me.png"
                alt="Vaibhav portrait"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Subtle glass reflection highlight */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 45%, rgba(0,0,0,0.4) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Right: VAIBHAV (Moved little down & reduced opacity) */}
          <div
            style={{
              flex: 1.4,
              textAlign: 'right',
              userSelect: 'none',
              transform: 'translateY(28px)',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(52px, 9.5vw, 140px)',
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-0.05em',
                color: 'rgba(255, 255, 255, 0.38)',
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 4px 40px rgba(0,0,0,0.3)',
              }}
            >
              VAIBHAV
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
