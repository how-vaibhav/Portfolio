import React, { useState, useEffect } from 'react';
import { useModeTransition } from '../context/ModeTransitionContext';
import DesignAnatomy from '../components/Design/DesignAnatomy';
import HowVaibhavStory from '../components/Design/HowVaibhavStory';
import ArtCirclesOrbit from '../components/Design/ArtCirclesOrbit';
import ServicesCorkboard from '../components/Design/ServicesCorkboard';
import MixedMediaAssembly from '../components/Design/MixedMediaAssembly';

import { soundFX } from '../components/Design/soundFX';
import '../components/Design/design.css';

/**
 * DesignPage — Dedicated Graphic Design Mode.
 * - Unified obsidian black grid theme.
 * - Interactive Brand Anatomy hero section with laser filaments and specimen cards.
 * - Tactile "What's Up" / HowVaibhav Story with Washi-Tape Polaroids & Ripped Paper chips.
 * - Art Circles Dual Rotational Orbit (20 Curated Exhibits: Explanation Orbit & Design Orbit).
 * - Tactile Services & Capabilities pinboard ("What I Can Help with:").
 * - Handcrafted artistic doodles (electric bolts, vector bezier tools, golden ratio spirals, stars).
 * - Floating dock switch at bottom-right for instant one-click return to Dev & Resume.
 */
export default function DesignPage() {
  const { transitionTo } = useModeTransition();
  const [devBtnHovered, setDevBtnHovered] = useState(false);

  // Set document title
  useEffect(() => {
    document.title = 'HowVaibhav — Graphic Design & Brand Archive 2026';
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.title = 'Vaibhav Tiwari — Software Developer & CS Portfolio';
    };
  }, []);

  return (
    <div className="design-page-root">
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* The Anatomy of HowVaibhav — Hero Section */}
        <DesignAnatomy />

        {/* The "What's Up" / Story of HowVaibhav — Washi-Tape Polaroids & Torn Paper Chips */}
        <HowVaibhavStory />

        {/* ART CIRCLES — Dual Orbit Rotational Showcase (20 Exhibits: Explanation & Design) */}
        <ArtCirclesOrbit />

                {/* Services & Capabilities Anti-Gravity Pinboard ("What I Can Help with:") */}
        <ServicesCorkboard />

        {/* ─── KINETIC MIXED-MEDIA ART ASSEMBLY (20 TACTILE PIECES CONVERGE ON SCROLL) ─── */}
        <MixedMediaAssembly />

        {/* Bottom Spacing */}
        <div style={{ height: "40px" }} />
      </main>

      {/* Floating Bottom-Right DEV Mode Switch Button — Precision Cyber Green Emblem */}
      <aside
        className="floating-dev-switch-wrap"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        aria-label="Switch to Developer Mode"
      >
        {/* Sleek Contextual Hover Tooltip Pill */}
        <div
          style={{
            position: 'absolute',
            right: 'calc(100% + 12px)',
            opacity: devBtnHovered ? 1 : 0,
            transform: devBtnHovered ? 'translateX(0)' : 'translateX(8px)',
            pointerEvents: 'none',
            background: 'rgba(9, 11, 15, 0.94)',
            color: '#CCFF00',
            border: '1px solid rgba(204, 255, 0, 0.45)',
            borderRadius: '8px',
            padding: '5px 11px',
            fontFamily: "'Space Grotesk', monospace",
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transition: 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          DEV MODE
        </div>

        <button
          type="button"
          onClick={() => {
            try { soundFX.playWarp(); } catch {}
            transitionTo('/');
          }}
          className="design-return-btn floating-dev-btn"
          title="Switch to Software Developer & CS Mode"
          aria-label="Switch to Developer Mode"
          onMouseEnter={() => {
            try { soundFX.playHover(); } catch {}
            setDevBtnHovered(true);
          }}
          onMouseLeave={() => setDevBtnHovered(false)}
          style={{
            width: '52px',
            height: '52px',
            minWidth: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #DDFF33 0%, #B8E600 100%)',
            color: '#07080A',
            border: '2px solid #07080A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            boxShadow: devBtnHovered
              ? '0 14px 34px rgba(204, 255, 0, 0.65), 4px 4px 0px #07080A, inset 0 1.5px 1px rgba(255, 255, 255, 0.9), inset 0 -2px 2px rgba(0, 0, 0, 0.15)'
              : '0 8px 24px rgba(204, 255, 0, 0.4), 3px 3px 0px #07080A, inset 0 1.5px 1px rgba(255, 255, 255, 0.8), inset 0 -1.5px 1px rgba(0, 0, 0, 0.12)',
            transform: devBtnHovered ? 'translateY(-3px) scale(1.08)' : 'none',
            transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            userSelect: 'none',
            outline: 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Space Grotesk', monospace",
              fontWeight: 900,
              fontSize: '15px',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#07080A',
            }}
          >
            &lt;/&gt;
          </span>
        </button>
      </aside>
    </div>
  );
}
