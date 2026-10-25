import React, { useState, useEffect } from 'react';
import { useModeTransition } from '../context/ModeTransitionContext';
import DesignModeSwitch from '../components/Design/DesignModeSwitch';
import DesignHero from '../components/Design/DesignHero';
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
      {/* Top Floating Control Bar — NO NAVBAR, just the return switch */}
      <DesignModeSwitch
        activeView={activeView}
        onViewChange={(v) => setActiveView(v)}
      />

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Creative Editorial Intro */}
        <DesignHero />

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

        {/* The Anatomy of HowVaibhav — Scattered infographic with floating capability cards */}
        <DesignAnatomy />

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
    </div>
  );
}
