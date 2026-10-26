import React, { useState, useEffect } from 'react';
import { useModeTransition } from '../context/ModeTransitionContext';
import Folder3DConveyor from '../components/Design/Folder3DConveyor';
import FolderDeskGrid from '../components/Design/FolderDeskGrid';
import FolderModal from '../components/Design/FolderModal';
import DesignPlayground from '../components/Design/DesignPlayground';
import ServicesCorkboard from '../components/Design/ServicesCorkboard';
import DesignAnatomy from '../components/Design/DesignAnatomy';
import { DESIGN_PROJECTS } from '../components/Design/designData';
import { soundFX } from '../components/Design/soundFX';
import '../components/Design/design.css';

/**
 * DesignPage — Dedicated Graphic Design Mode.
 * - NO regular navbar! Just the top floating control bar with instant return switch.
 * - NO footer! Entire footer removed as requested.
 * - Features the continuous scroll-driven 3D Isometric Folder Deck (Reference 1 Lowe)
 *   and the tactile Robin-style desk archive (Reference 2).
 * - Floating dock switch at bottom-right for instant one-click return to Dev & Resume.
 */
export default function DesignPage() {
  const { transitionTo } = useModeTransition();
  const [activeView, setActiveView] = useState('3d'); // '3d' or 'grid'
  const [selectedProject, setSelectedProject] = useState(null);
  const [devBtnHovered, setDevBtnHovered] = useState(false);

  // Set document title
  useEffect(() => {
    document.title = 'HowVaibhav — Graphic Design & Brand Archive 2026';
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.title = 'Vaibhav Verma — Software Developer & CS Portfolio';
    };
  }, []);

  return (
    <div className="design-page-root">
      

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* The Anatomy of HowVaibhav — Hero Section */}
        <DesignAnatomy />

        {/* Dynamic Display: 3D Isometric Conveyor (Lowe) or Folder Desk Grid (Robin) */}
        {activeView === '3d' ? (
          <div style={{ position: 'relative' }}>
            {/* The Continuous Scroll-Driven 3D Isometric Runway */}
            <Folder3DConveyor
              projects={DESIGN_PROJECTS}
              onSelectProject={(proj) => setSelectedProject(proj)}
            />

            {/* View Mode Quick Switch Button */}
            <div
              style={{
                textAlign: 'center',
                margin: '14px 0 20px',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  soundFX.playSnap();
                  setActiveView('grid');
                }}
                style={{
                  background: '#FFFFFF',
                  color: '#121316',
                  border: '2px solid #121316',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontFamily: 'Space Grotesk',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0px #121316',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translate(-2px, -2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              >
                <span>⊞</span>
                <span>Switch to Filing Cabinet Desk View</span>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <FolderDeskGrid
              projects={DESIGN_PROJECTS}
              onSelectProject={(proj) => setSelectedProject(proj)}
            />
            <div
              style={{
                textAlign: 'center',
                margin: '14px 0 20px',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  soundFX.playSnap();
                  setActiveView('3d');
                }}
                style={{
                  background: '#121316',
                  color: '#FFFFFF',
                  border: '2px solid #121316',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontFamily: 'Space Grotesk',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0px #00D2FF',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translate(-2px, -2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              >
                <span>◈</span>
                <span>Switch to 3D Isometric Conveyor</span>
              </button>
            </div>
          </div>
        )}

        {/* Creative Laboratory & Craft Manifesto */}
        <DesignPlayground />


        {/* Services & Capabilities Anti-Gravity Pinboard ("What I Can Help with:") */}
        <ServicesCorkboard />

        {/* Ultra-minimal bottom signoff line — NO HEAVY FOOTER */}
        <div
          style={{
            padding: '20px 16px 36px',
            textAlign: 'center',
            fontSize: '11px',
            fontFamily: 'Space Grotesk',
            color: '#888888',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            borderTop: '1px dashed rgba(0,0,0,0.1)',
            width: 'min(94%, 1240px)',
            margin: '0 auto',
          }}
        >
          HOWVAIBHAV // GRAPHIC ARCHIVE 2026 // CRAFTED WITH PASSION & REASON
        </div>
      </main>

      

      {/* Fullscreen Case Study Lightbox Dossier */}
      {selectedProject && (
        <FolderModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

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
