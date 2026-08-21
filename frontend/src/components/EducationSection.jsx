import React from 'react';

const ORANGE = '#E84419';

export default function EducationSection() {
  return (
    <section
      id="education"
      style={{
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '96px 48px 100px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top Header Row: Stacked Title (Left) & Dual Photos (Right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px 64px',
            alignItems: 'center',
            marginBottom: '64px',
          }}
        >
          {/* Left Column: Heading & Context */}
          <div>
            <span
              style={{
                color: ORANGE,
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              Academic Background
            </span>
            <h2
              style={{
                fontSize: 'clamp(52px, 7vw, 92px)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.045em',
                color: '#fff',
                margin: 0,
                marginBottom: '20px',
              }}
            >
              My
              <br />
              Education
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.65)',
                margin: 0,
                maxWidth: '400px',
              }}
            >
              Grounding creative vision in structured research, design systems, and digital product strategy.
            </p>
          </div>

          {/* Right Column: 2 Photos Side-by-Side */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '18px',
            }}
          >
            {/* Photo 1: Workspace */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '240px',
                background: '#111',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.45)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <img
                src="/assets/education-work.jpg"
                alt="Workspace and laptop"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Photo 2: Lifestyle / Entrance */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '240px',
                background: '#111',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.45)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <img
                src="/assets/education-lifestyle.jpg"
                alt="Architectural entrance"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: 2 Balanced University Degree Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Card 1: Rimberio University */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '32px 36px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  margin: 0,
                }}
              >
                Rimberio University
              </h3>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: ORANGE,
                  background: 'rgba(232, 68, 25, 0.12)',
                  border: '1px solid rgba(232, 68, 25, 0.25)',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  letterSpacing: '0.02em',
                }}
              >
                2011 — 2015
              </span>
            </div>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.65)',
                margin: 0,
                fontWeight: 400,
              }}
            >
              Focused on visual identity systems, typography fundamentals, and cross-platform branding methodologies to build memorable corporate brand presence.
            </p>
          </div>

          {/* Card 2: Timmerman University */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '32px 36px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  margin: 0,
                }}
              >
                Timmerman University
              </h3>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: ORANGE,
                  background: 'rgba(232, 68, 25, 0.12)',
                  border: '1px solid rgba(232, 68, 25, 0.25)',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  letterSpacing: '0.02em',
                }}
              >
                2016 — 2018
              </span>
            </div>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.65)',
                margin: 0,
                fontWeight: 400,
              }}
            >
              Advanced studies in human-centered interaction design, interactive web architectures, and high-performance frontend visual experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
