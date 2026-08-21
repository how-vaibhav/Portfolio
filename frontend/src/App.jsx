import CanvasScrollAnimation from './components/CanvasScrollAnimation';
import VaibhavStudioSection from './components/VaibhavStudioSection';
import IntroductionSection from './components/IntroductionSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ContactScaleSection from './components/ContactScaleSection';

/* ── Design tokens ─────────────────────────────────────────── */
const ORANGE = '#E84419';
const ANIMATION_VH = 550; // must match scrollRangeVh

/* ── Helpers ───────────────────────────────────────────────── */
const glass = (opacity = 0.55) => ({
  background: `rgba(0,0,0,${opacity})`,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
});

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
function Navbar() {
  return (
    <header style={{
      position: 'absolute',
      top: 0, left: 0, right: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '24px 48px',
      zIndex: 30,
    }}>
      {/* Logo */}
      <span style={{
        fontWeight: 800, fontSize: '17px', letterSpacing: '-0.03em',
        color: '#fff',
      }}>
        Vaibhav
      </span>

      {/* Nav links */}
      <nav style={{ display: 'flex', gap: '28px' }}>
        {[
          { name: 'Home', href: '#home' },
          { name: 'Studio', href: '#studio' },
          { name: 'Introduction', href: '#introduction' },
          { name: 'About', href: '#about' },
          { name: 'Education', href: '#education' },
          { name: 'Projects', href: '#projects' },
          { name: 'Contact', href: '#contact' },
        ].map(item => (
          <a key={item.name} href={item.href} style={{
            fontSize: '14px', fontWeight: 500,
            color: 'rgba(255,255,255,0.75)',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a href="#contact" style={{
        background: ORANGE, color: '#fff', border: 'none',
        borderRadius: '999px', padding: '11px 24px',
        fontSize: '13px', fontWeight: 700, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '8px',
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.15s',
      }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.03)'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
      >
        Get in touch
        <span style={{
          background: 'rgba(255,255,255,0.25)', borderRadius: '50%',
          width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px',
        }}>→</span>
      </a>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO (sticky overlay on top of the scroll animation)
═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      ...glass(0.75),
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '28px 48px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.03em' }}>
        Vaibhav
      </span>
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
        © 2026 Vaibhav. All rights reserved.
      </p>
      <div style={{ display: 'flex', gap: '24px' }}>
        {['Twitter', 'Dribbble', 'LinkedIn'].map(s => (
          <a key={s} href="#" style={{
            fontSize: '12px', color: 'rgba(255,255,255,0.4)',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      {/* ── Fixed canvas: the background scroll animation ── */}
      <CanvasScrollAnimation
        frameCount={250}
        framePrefix="/frames/ezgif-frame-"
        scrollRangeVh={ANIMATION_VH}
      />

      {/* ── Content layers rendered over canvas ── */}
      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* Animation scroll zone — hero sticks here for the full animation */}
        <div style={{ height: `${ANIMATION_VH}vh` }}>
          <div style={{
            position: 'sticky', top: 0,
            height: '100vh',
            display: 'flex', flexDirection: 'column',
          }}>
            <Navbar />
            <Hero />
          </div>
        </div>

        {/* Content sections layered smoothly with glassmorphism */}
        <VaibhavStudioSection />
        <IntroductionSection />
        <AboutSection />
        <EducationSection />
        <ContactScaleSection />
        <Footer />
      </div>
    </>
  );
}
