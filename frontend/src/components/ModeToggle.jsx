import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * ModeToggle — pill-shaped toggle between Dev mode (/) and Design mode (/design).
 * Fires a radial-reveal overlay transition on switch.
 */
export default function ModeToggle() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDesign = pathname === '/design';
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    if (animating) return;
    setAnimating(true);

    // Create the overlay element that expands from the toggle position
    const overlay = document.createElement('div');
    overlay.id = '__mode-transition-overlay__';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      background: ${isDesign ? '#050A0F' : '#0a0006'};
      clip-path: circle(0% at 50% 0%);
      transition: clip-path 0.65s cubic-bezier(0.76, 0, 0.24, 1);
    `;
    document.body.appendChild(overlay);

    // Trigger the expand animation on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.clipPath = 'circle(150% at 50% 0%)';
      });
    });

    // After halfway, navigate and fade overlay out
    setTimeout(() => {
      navigate(isDesign ? '/' : '/design');
      // Scroll to top on switch
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 380);

    setTimeout(() => {
      overlay.style.transition = 'opacity 0.35s ease';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        setAnimating(false);
      }, 360);
    }, 680);
  };

  return (
    <button
      onClick={handleToggle}
      title={isDesign ? 'Switch to Dev mode' : 'Switch to Design mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '999px',
        padding: '4px',
        cursor: animating ? 'wait' : 'pointer',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        position: 'relative',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
        e.currentTarget.style.boxShadow = '0 0 18px rgba(255,255,255,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Dev pill */}
      <span style={{
        padding: '7px 16px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.01em',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'background 0.3s, color 0.3s',
        background: !isDesign ? 'rgba(255,255,255,0.14)' : 'transparent',
        color: !isDesign ? '#fff' : 'rgba(255,255,255,0.4)',
        whiteSpace: 'nowrap',
      }}>
        <span style={{ fontSize: '11px', fontFamily: 'monospace', letterSpacing: '-0.03em' }}>&lt;/&gt;</span>
        Dev
      </span>

      {/* Design pill */}
      <span style={{
        padding: '7px 16px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.01em',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'background 0.3s, color 0.3s',
        background: isDesign ? 'rgba(232,68,25,0.85)' : 'transparent',
        color: isDesign ? '#fff' : 'rgba(255,255,255,0.4)',
        whiteSpace: 'nowrap',
        boxShadow: isDesign ? '0 2px 12px rgba(232,68,25,0.4)' : 'none',
      }}>
        <span style={{ fontSize: '13px' }}>✦</span>
        Design
      </span>
    </button>
  );
}
