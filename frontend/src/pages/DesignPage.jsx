import React, { useState, useEffect } from 'react';
import { useModeTransition } from '../context/ModeTransitionContext';
import DesignAnatomy from '../components/Design/DesignAnatomy';
import HowVaibhavStory from '../components/Design/HowVaibhavStory';
import ArtCirclesOrbit from '../components/Design/ArtCirclesOrbit';
import MixedMediaAssembly from '../components/Design/MixedMediaAssembly';

import { soundFX } from '../components/Design/soundFX';
import '../components/Design/design.css';

/**
 * DesignPage — Dedicated Graphic Design Mode.
 * - Unified obsidian black grid theme.
 * - Interactive Brand Anatomy hero section with laser filaments and specimen cards.
 * - Tactile "What's Up" / HowVaibhav Story with Washi-Tape Polaroids & Ripped Paper chips.
 * - Art Circles Dual Rotational Orbit (35 Curated Exhibits: Explanation Orbit & Design Orbit).
 * - Handcrafted artistic doodles (electric bolts, vector bezier tools, golden ratio spirals, stars).
 * - Floating dock switch at bottom-right for instant one-click return to Dev & Resume.
 */
export default function DesignPage() {
  const { transitionTo } = useModeTransition();
  const [devBtnHovered, setDevBtnHovered] = useState(false);

  // Dynamic SEO metadata management for route transition
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'HowVaibhav — Graphic Design, Brand Architecture & Creative Studio';
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Dynamic Meta Tags for Route SEO
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore the graphic design, brand architecture, and tactile editorial systems of Vaibhav (howvaibhav) — featuring the 35-plate Kala Mandal exhibit and design anatomy.'
      );
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalLink?.getAttribute('href') || 'https://www.howvaibhav.in/';
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://www.howvaibhav.in/design');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const prevOgTitle = ogTitle?.getAttribute('content') || '';
    if (ogTitle) {
      ogTitle.setAttribute('content', 'HowVaibhav — Graphic Design & Brand Archive');
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    const prevOgUrl = ogUrl?.getAttribute('content') || '';
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://www.howvaibhav.in/design');
    }

    return () => {
      document.title = prevTitle || 'Vaibhav | Full-Stack Developer & Designer — howvaibhav';
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc);
      if (canonicalLink) canonicalLink.setAttribute('href', prevCanonical);
      if (ogTitle && prevOgTitle) ogTitle.setAttribute('content', prevOgTitle);
      if (ogUrl && prevOgUrl) ogUrl.setAttribute('content', prevOgUrl);
    };
  }, []);

  return (
    <div className="design-page-root">
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Semantic H1 for SEO crawlers and assistive accessibility */}
        <h1
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          HowVaibhav — Graphic Design, Brand Architecture & Creative Studio Portfolio
        </h1>

        {/* The Anatomy of HowVaibhav — Hero Section */}
        <DesignAnatomy />

        {/* The "What's Up" / Story of HowVaibhav — Washi-Tape Polaroids & Torn Paper Chips */}
        <HowVaibhavStory />

        {/* ART CIRCLES — Dual Orbit Rotational Showcase (35 Exhibits: Explanation & Design) */}
        <ArtCirclesOrbit />

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
