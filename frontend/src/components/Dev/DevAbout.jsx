import React from 'react';
import './dev.css';
import { useReveal } from './useReveal';

export default function DevAbout() {
  const ref = useReveal();

  return (
    <section
      id="dev-about"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
          <span className="dev-section-accent dev-reveal" style={{ fontSize: 'clamp(48px,8vw,90px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>
            01
          </span>
          <div className="dev-divider-line" style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>
        <h2 className="dev-reveal dev-d1" style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
          ABOUT ME
        </h2>
      </div>

      {/* Content grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
      }}>
        {/* Photo */}
        <div className="dev-reveal-left dev-img-wrap" style={{
          borderRadius: '16px',
          overflow: 'hidden',
          aspectRatio: '3/4',
          background: '#0D1117',
          border: '1px solid rgba(255,255,255,0.08)',
          maxWidth: '380px',
          position: 'relative',
        }}>
          <img
            src="/assets/intro-portrait.jpg"
            alt="Vaibhav Tiwari"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
          />
          {/* Gradient overlay at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '35%',
            background: 'linear-gradient(to top, rgba(5,10,15,0.8) 0%, transparent 100%)',
          }} />
          {/* Name tag */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'rgba(5,10,15,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '10px 16px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Vaibhav Tiwari</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Lucknow, India</div>
          </div>
        </div>

        {/* Text content */}
        <div>
          <p className="dev-reveal dev-d2" style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '28px',
          }}>
            I'm a <strong style={{ color: '#fff' }}>Full-Stack Developer</strong> and{' '}
            <strong style={{ color: '#fff' }}>CS student</strong> from Lucknow, India.
            I build complete web systems — from database schemas and REST APIs to polished frontend interfaces.
          </p>
          <p className="dev-reveal dev-d3" style={{
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '40px',
          }}>
            I've shipped production systems used by real users — a government-grade mineral transport
            authorization platform, a citizen welfare portal, and a forensic security analysis tool.
            I care about clean architecture, performance, and design that actually solves problems.
          </p>

          {/* Key facts */}
          <div className="dev-reveal dev-d4" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '40px',
          }}>
            {[
              { label: 'Degree',       value: 'B.Tech Computer Science' },
              { label: 'Focus',        value: 'Full-Stack & Systems' },
              { label: 'Experience',   value: 'Freelance + Team Projects' },
              { label: 'Looking for',  value: 'Internship / Work' },
            ].map((f) => (
              <div key={f.label} style={{
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px',
              }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                  {f.label}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{f.value}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="dev-reveal dev-d5" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="mailto:vaibhav10505@gmail.com"
              className="dev-btn-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#E84419', color: '#fff',
                borderRadius: '999px', padding: '12px 24px',
                fontSize: '13px', fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Email Me →
            </a>
            <a
              href="https://github.com/how-vaibhav"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-btn-secondary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)',
                borderRadius: '999px', padding: '12px 24px',
                fontSize: '13px', fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
