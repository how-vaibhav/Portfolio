import React from 'react';
import CanvasScrollAnimation from '../components/CanvasScrollAnimation';
import VaibhavStudioSection from '../components/VaibhavStudioSection';
import IntroductionSection from '../components/IntroductionSection';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import ContactScaleSection from '../components/ContactScaleSection';
import { DesignNavbar } from '../components/Navbar/Navbar';

const ORANGE = '#E84419';
const ANIMATION_VH = 550;

/* ─── Hero ──────────────────────────────────────────────── */
const SERVICES = [
  { num: '01', label: 'Brand Strategy' },
  { num: '02', label: 'Brand Identity Design' },
  { num: '03', label: 'Packaging Design' },
  { num: '04', label: 'Creative Direction' },
];

function Hero() {
  return (
    <section id="home" style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '110px 48px 40px',
    }}>
      {/* Upper row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Left: headline */}
        <div>
          <p style={{
            fontSize: '15px', fontWeight: 400,
            color: 'rgba(255,255,255,0.65)', marginBottom: '10px',
            letterSpacing: '0.01em',
          }}>
            Hey, I'm
          </p>
          <h1 style={{
            fontSize: 'clamp(68px, 9vw, 128px)',
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: '-0.045em',
            color: '#fff',
            textShadow: '0 2px 40px rgba(0,0,0,0.6)',
          }}>
            Vaibhav<br />Director
          </h1>
        </div>

        {/* Right: tagline */}
        <div style={{ maxWidth: '300px', textAlign: 'right', paddingTop: '8px' }}>
          <p style={{
            fontSize: '20px', fontWeight: 700, lineHeight: 1.35,
            color: '#fff', marginBottom: '14px',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            Great design should<br />feel invisible.
          </p>
          <p style={{
            fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
          }}>
            From logo to language, I build brands that<br />connect and convert.
          </p>
        </div>
      </div>

      {/* Services bar */}
      <div style={{
        display: 'flex', gap: '0',
        paddingTop: '22px',
        borderTop: '1px solid rgba(255,255,255,0.14)',
      }}>
        {SERVICES.map((s, i) => (
          <div key={s.num} style={{
            flex: 1,
            paddingRight: '20px',
            borderRight: i < SERVICES.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            paddingLeft: i > 0 ? '20px' : '0',
          }}>
            <span style={{
              color: ORANGE, fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.04em',
            }}>
              #{s.num}
            </span>
            <p style={{
              fontSize: '12px', color: 'rgba(255,255,255,0.7)',
              marginTop: '5px', fontWeight: 500,
            }}>
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
  return (
    <>
      {/* Fixed canvas: the background scroll animation */}
      <CanvasScrollAnimation
        frameCount={250}
        framePrefix="/frames/ezgif-frame-"
        scrollRangeVh={ANIMATION_VH}
      />

      {/* Content layers rendered over canvas */}
      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* Animation scroll zone — hero sticks here for the full animation */}
        <div style={{ height: `${ANIMATION_VH}vh` }}>
          <div style={{
            position: 'sticky', top: 0,
            height: '100vh',
            display: 'flex', flexDirection: 'column',
          }}>
            <DesignNavbar />
            <Hero />
          </div>
        </div>

        {/* Content sections */}
        <VaibhavStudioSection />
        <IntroductionSection />
        <AboutSection />
        <EducationSection />
        <ContactScaleSection />
      </div>
    </>
  );
}
