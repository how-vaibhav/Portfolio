import React, { useState } from 'react';
import { soundFX } from './soundFX';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE STORY OF HOWVAIBHAV & CREATIVE SOFTWARE ARSENAL
 * ─────────────────────────────────────────────────────────────────────────────
 * Studio Desk / Editorial Broadsheet Layout:
 *  - High-end, legible, professional typography (Space Grotesk + Inter)
 *  - Soulful, sarcastic, and authentic origin story ("Why the name HowVaibhav?")
 *  - Flanked by tactile Polaroid specimens with real washi-tape mounts
 *  - Professional Creative Software Toolkit showcasing authentic vector logos:
 *      * Figma, Adobe Photoshop, Adobe Premiere Pro, KineMaster, PicsArt,
 *      * Adobe Illustrator, Adobe After Effects, Blender, Adobe Lightroom.
 *  - Interactive hover haptics with signature brand glow highlights.
 */

// Software Toolkit Definition with Authentic Official Vector SVG Logos
const SOFTWARE_TOOLS = [
  {
    id: 'figma',
    name: 'Figma',
    color: '#F24E1E',
    svg: (
      <svg viewBox="0 0 38 57" width="28" height="42" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    color: '#31A8FF',
    svg: (
      <svg viewBox="0 0 48 48" width="38" height="38">
        <rect width="48" height="48" rx="10" fill="#001E36" stroke="#31A8FF" strokeWidth="1.8"/>
        <text x="10" y="32" fill="#31A8FF" fontSize="21" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="900" letterSpacing="-0.04em">Ps</text>
      </svg>
    ),
  },
  {
    id: 'premiere',
    name: 'Adobe Premiere Pro',
    color: '#EA77FF',
    svg: (
      <svg viewBox="0 0 48 48" width="38" height="38">
        <rect width="48" height="48" rx="10" fill="#00005B" stroke="#EA77FF" strokeWidth="1.8"/>
        <text x="11" y="32" fill="#EA77FF" fontSize="21" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="900" letterSpacing="-0.04em">Pr</text>
      </svg>
    ),
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    color: '#E52446',
    svg: (
      <svg viewBox="0 0 26 26" width="38" height="38">
        <rect width="26" height="26" rx="6" fill="#0D1117" stroke="#E52446" strokeWidth="1.2"/>
        <path
          d="M17.621 0 5.977.004c-1.37 0-2.756.345-3.762 1.11a4.925 4.925 0 0 0-1.61 2.003C.233 3.93 0 5.02 0 5.951l.012 12.2c.002 1.604.479 3.057 1.461 4.112.984 1.056 2.462 1.683 4.331 1.691L16.856 24c1.26.005 3.095-.036 4.303-.714 1.075-.605 2.025-1.556 2.497-2.984.278-.84.345-2.084.344-3.147l-.021-11.13c-.002-.888-.15-2.023-.547-2.934-.425-.976-1.181-1.815-2.322-2.425C20.353.26 19.123 0 17.622 0zm0 .93c1.378 0 2.538.295 3.04.565.977.523 1.544 1.166 1.889 1.96.315.721.47 1.793.473 2.572l.018 11.13c.002 1.013-.097 2.257-.298 2.86-.396 1.202-1.146 1.946-2.063 2.462-.814.457-2.612.593-3.82.588l-11.05-.044c-1.657-.007-2.832-.534-3.626-1.386-.792-.851-1.212-2.06-1.212-3.485L.999 5.95c0-.829.196-1.827.474-2.437.345-.757.75-1.207 1.365-1.674C3.585 1.27 4.868.97 6.08.97zm-5.66 3.423c-1.976.089-3.204 1.658-3.214 3.29.019 1.443 1.635 3.481 2.884 4.53.12.099.154.109.33.18.062.025.198-.047.327-.135.36-.245.993-.947 1.648-1.738a7.67 7.67 0 0 0 1.031-1.683c.409-.89.261-1.599.235-1.888a3.983 3.983 0 0 0-.99-1.692 3.36 3.36 0 0 0-2.251-.864zm4.172 7.922a10.185 10.185 0 0 0-3.244.61c-.15.058-.26.1-.374.17-.057.036-.11.135-.105.292.017.433.29 1.278.624 2.27.384 1.135 1.066 2.27 1.844 2.74a3.23 3.23 0 0 0 2.53.342c.832-.243 1.595-.868 1.962-1.546.986-1.818.19-3.548-1.121-4.417-.447-.296-1.133-.445-1.89-.46-.074 0-.15-.002-.226-.001zm-8.432.038a6.201 6.201 0 0 0-.752.047c-.596.078-.932.273-1.29.51a3.177 3.177 0 0 0-1.365 1.979c-.075.552-.086 1.053.033 1.507.433 1.389 1.326 2.222 2.847 2.452.636.028 1.37-.063 1.99-.45 1.269-.782 2.08-3.17 2.412-4.742.053-.176.035-.357-.013-.42-.005-.067-.044-.113-.19-.183-.398-.192-1.32-.417-2.375-.6a7.68 7.68 0 0 0-1.297-.1z"
          transform="translate(1, 1)"
          fill="#E52446"
        />
      </svg>
    ),
  },
  {
    id: 'capcut',
    name: 'CapCut',
    color: '#FFFFFF',
    svg: (
      <svg viewBox="0 0 48 48" width="38" height="38">
        <rect width="48" height="48" rx="10" fill="#000000" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" />
        <path
          d="M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91V8.72L6.354 12 0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12 24.19 6.443zM9.982 13.873l7.797 4.083H2.157l7.825-4.083zm7.741-7.828l-7.742 4.057-7.825-4.057h15.567z"
          transform="translate(10, 10) scale(1.16)"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'kinemaster',
    name: 'KineMaster',
    color: '#FF4742',
    svg: (
      <svg viewBox="0 0 48 48" width="38" height="38">
        <circle cx="24" cy="24" r="23" fill="#FF4742" stroke="#FFFFFF" strokeWidth="1.5"/>
        <circle cx="24" cy="8.5" r="3.2" fill="#FFFFFF"/>
        <circle cx="38" cy="18.5" r="3.2" fill="#FFFFFF"/>
        <circle cx="33.5" cy="35" r="3.2" fill="#FFFFFF"/>
        <circle cx="14.5" cy="35" r="3.2" fill="#FFFFFF"/>
        <circle cx="10" cy="18.5" r="3.2" fill="#FFFFFF"/>
        <text x="18" y="31.5" fill="#FFFFFF" fontSize="21" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="900">K</text>
      </svg>
    ),
  },
  {
    id: 'picsart',
    name: 'PicsArt',
    color: '#C2185B',
    svg: (
      <svg viewBox="0 0 48 48" width="38" height="38">
        <defs>
          <linearGradient id="picsartOfficialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B1FA2" />
            <stop offset="45%" stopColor="#C2185B" />
            <stop offset="80%" stopColor="#E91E63" />
            <stop offset="100%" stopColor="#3F51B5" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="10" fill="url(#picsartOfficialGrad)" />
        <path
          d="M11.999 0h-.012c-2.21 0-4.3.863-5.888 2.432-.15.148-.428.458-.428.458-.096.11-.188.22-.276.334l-.036.047a8.683 8.683 0 0 0-1.836 5.016v15.41a.32.32 0 0 0 .05.17.304.304 0 0 0 .254.133h2.881a.303.303 0 0 0 .305-.304v-7.843c0-.054.037-.08.053-.087a.1.1 0 0 1 .104.008 8.293 8.293 0 0 0 4.815 1.525c1.32 0 2.547-.305 3.68-.86 2.847-1.392 4.812-4.356 4.812-7.793 0-4.78-3.796-8.645-8.478-8.645zm-.013 13.994c-2.841 0-5.152-2.396-5.152-5.34 0-2.946 2.31-5.342 5.152-5.342 2.841 0 5.152 2.396 5.152 5.341 0 2.945-2.31 5.341-5.152 5.341z"
          transform="translate(10, 10) scale(1.16)"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    color: '#00C4CC',
    svg: (
      <svg viewBox="0 0 48 48" width="38" height="38">
        <defs>
          <linearGradient id="canvaIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C4CC" />
            <stop offset="50%" stopColor="#2E6BF5" />
            <stop offset="100%" stopColor="#7D2AE8" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="11" fill="url(#canvaIconGrad)" />
        <path
          d="M26 12C18 12 13 17 13 24C13 31 18 36 26 36C29.5 36 32.5 34.5 34 32.2L31.5 29.8C30.2 31.5 28.2 32.5 26 32.5C20.5 32.5 17 28.8 17 24C17 19.2 20.5 15.5 26 15.5C28.2 15.5 30.2 16.5 31.5 18.2L34 15.8C32.5 13.5 29.5 12 26 12Z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: 'audacity',
    name: 'Audacity',
    color: '#0088FF',
    svg: (
      <svg viewBox="0 0 26 26" width="38" height="38">
        <rect width="26" height="26" rx="6" fill="#001830" stroke="#0088FF" strokeWidth="1.2" />
        <path
          d="M12 2.145c-2.487 0-4.755.776-6.428 2.08-1.673 1.303-2.76 3.169-2.76 5.244v.75C1.153 11.06 0 13.268 0 15.856c0 3.312 1.884 6 4.312 6V9.468c0-1.554.805-2.984 2.186-4.06C7.879 4.331 9.829 3.643 12 3.643c2.17 0 4.12.688 5.502 1.764 1.38 1.077 2.186 2.507 2.186 4.06v12.387c2.428 0 4.312-2.687 4.312-6 0-2.587-1.152-4.795-2.813-5.636v-.75c0-2.075-1.086-3.94-2.76-5.244-1.672-1.304-3.94-2.08-6.427-2.08zm0 6.153l-1.125 8.683L9.75 9.105l-.562 6.75-.376-.75-.375-4.5-.187 4.5-.563 1.313-.374-4.5-.376 3.562-.562-.937v2.625l-.563-2.11v-4.64a1.432 1.432 0 0 0-.937-.375v11.812c.375 0 .75-.187.937-.562v-3.375l.188.187.563 1.875.187-2.25.563 2.813v-3.562l.374.937.563 2.625v-3.562l.375.374.563 3.188.562-4.313 1.24 4.86.072-2.985.375-1.124.376 4.687 1.124-4.687.375 3.937.938-4.125.938 4.5.187-3.375.562-1.125.188 4.313.938-4.125.562 1.875.188-1.688.374.75v3.375c.188.375.563.562.938.562V10.043c-.375 0-.75.188-.938.375v4.813l-.374 1-.188-3.188-.375 2.437-.375-.75-.188-2.625-.937 3.563-.188-.75L15 9.293l-.562 4.875-.376 1.5-.75-5.062-.75 4.312-.375 1.125Z"
          transform="translate(1, 1)"
          fill="#FFA500"
        />
      </svg>
    ),
  },
  {
    id: 'lightroom',
    name: 'Adobe Lightroom',
    color: '#31A8FF',
    svg: (
      <svg viewBox="0 0 48 48" width="38" height="38">
        <rect width="48" height="48" rx="10" fill="#001E36" stroke="#31A8FF" strokeWidth="1.8"/>
        <text x="12" y="32" fill="#31A8FF" fontSize="21" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="900" letterSpacing="-0.04em">Lr</text>
      </svg>
    ),
  },
];

export default function HowVaibhavStory() {
  const [polaroidHovered, setPolaroidHovered] = useState(false);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Filter tools by category
  const filteredTools = SOFTWARE_TOOLS.filter((t) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'VIDEO') return ['premiere', 'davinci', 'capcut', 'kinemaster'].includes(t.id);
    if (activeFilter === 'DESIGN') return ['figma', 'photoshop', 'canva', 'picsart', 'lightroom'].includes(t.id);
    if (activeFilter === 'AUDIO') return t.id === 'audacity';
    return true;
  });

  return (
    <section
      className="howvaibhav-story-section"
      style={{
        width: '100%',
        padding: '60px 16px 80px',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
      aria-label="The Story & Creative Arsenal of HowVaibhav"
    >
      <style>{`
        .tools-dock-row {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .tools-dock-row::-webkit-scrollbar {
          display: none;
        }
        .story-polaroid {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, filter 0.28s ease;
          user-select: none;
          cursor: pointer;
        }
        .tool-cartridge {
          transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.26s ease, border-color 0.26s ease, background 0.26s ease;
          user-select: none;
          cursor: pointer;
          position: relative;
        }
        .tool-cartridge:hover {
          transform: translateY(-6px) scale(1.035);
        }
        @keyframes vuBarMotion {
          0% { height: 3px; }
          50% { height: 14px; }
          100% { height: 6px; }
        }
        @keyframes ledBlink {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; filter: drop-shadow(0 0 7px #CCFF00); }
        }
        .story-layout-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 56px;
        }
        @media (max-width: 1040px) {
          .story-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .story-polaroid-wrap {
            margin: 0 auto !important;
            max-width: 380px !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
        {/* ── 1. STUDIO DESK: THE HUMAN BEHIND PIXELS + EDITORIAL CREATIVE STORY ── */}
        <div className="story-layout-grid">
          {/* ── ELEVATED CREATOR ARTIFACT: The Mind Behind the Pixels (Obsidian Archival Chassis) ── */}
          <div
            className="story-polaroid story-polaroid-wrap"
            onMouseEnter={() => {
              setPolaroidHovered(true);
              try { soundFX.playAperture(); } catch {}
            }}
            onMouseLeave={() => setPolaroidHovered(false)}
            style={{
              position: 'relative',
              background: 'linear-gradient(165deg, rgba(16, 22, 34, 0.98) 0%, rgba(6, 9, 15, 0.99) 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '20px',
              padding: '16px 16px 18px 16px',
              boxShadow: polaroidHovered
                ? '0 32px 80px rgba(0, 0, 0, 0.92), 0 0 45px rgba(0, 210, 255, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                : '0 20px 50px rgba(0, 0, 0, 0.78), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transform: polaroidHovered ? 'rotate(0deg) translateY(-6px) scale(1.02)' : 'rotate(-1.5deg)',
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Top Mechanical Film Track Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2px 4px 6px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '9px',
                    fontWeight: 900,
                    letterSpacing: '0.14em',
                    color: 'rgba(255, 255, 255, 0.45)',
                    textTransform: 'uppercase',
                  }}
                >
                  EXP 04 // 500T
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '10px' }}>•</span>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '8.5px',
                    fontWeight: 700,
                    color: '#00D2FF',
                    letterSpacing: '0.08em',
                  }}
                >
                  35MM LENS
                </span>
              </div>

              {/* Pulsing Live Creator Status Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(204, 255, 0, 0.1)',
                  border: '1px solid rgba(204, 255, 0, 0.35)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#CCFF00',
                    boxShadow: '0 0 8px #CCFF00',
                    animation: 'ledBlink 2s infinite ease-in-out',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '8px',
                    fontWeight: 900,
                    color: '#CCFF00',
                    letterSpacing: '0.12em',
                  }}
                >
                  ACTIVE IN LAB
                </span>
              </div>
            </div>

            {/* Viewfinder Viewport with Corner Reticles and Focus Target */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#04060A',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Backlit Ambient Silhouette Halo */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: polaroidHovered
                    ? 'radial-gradient(ellipse at 50% 35%, rgba(0, 210, 255, 0.22) 0%, rgba(204, 255, 0, 0.12) 40%, transparent 75%)'
                    : 'radial-gradient(ellipse at 50% 35%, rgba(0, 210, 255, 0.1) 0%, transparent 65%)',
                  transition: 'background 0.5s ease',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Viewfinder Reticles — Top Left */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  width: '14px',
                  height: '14px',
                  borderTop: '2px solid #00D2FF',
                  borderLeft: '2px solid #00D2FF',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              />
              {/* Viewfinder Reticles — Top Right */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '14px',
                  height: '14px',
                  borderTop: '2px solid #00D2FF',
                  borderRight: '2px solid #00D2FF',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              />
              {/* Viewfinder Reticles — Bottom Left */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  width: '14px',
                  height: '14px',
                  borderBottom: '2px solid #00D2FF',
                  borderLeft: '2px solid #00D2FF',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              />
              {/* Viewfinder Reticles — Bottom Right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  width: '14px',
                  height: '14px',
                  borderBottom: '2px solid #00D2FF',
                  borderRight: '2px solid #00D2FF',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              />

              {/* Viewfinder Center Crosshair */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '28px',
                  height: '28px',
                  border: '1px dashed rgba(255, 255, 255, 0.25)',
                  borderRadius: '50%',
                  zIndex: 3,
                  pointerEvents: 'none',
                  opacity: polaroidHovered ? 0.85 : 0.35,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '4px',
                    height: '4px',
                    background: '#00D2FF',
                    borderRadius: '50%',
                  }}
                />
              </div>

              {/* Profile Image Itself */}
              <img
                src="/assets/vaibhav-profile-pic.png"
                alt="Vaibhav Tiwari — The Human Behind the Pixels"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 16%',
                  filter: polaroidHovered
                    ? 'contrast(1.08) brightness(1.02)'
                    : 'contrast(1.03) brightness(0.97)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
                  transform: polaroidHovered ? 'scale(1.06)' : 'scale(1)',
                  display: 'block',
                }}
              />

              {/* Bottom Lens Metadata Bar inside Viewfinder */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '0',
                  right: '0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    background: 'rgba(0, 0, 0, 0.72)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '8px',
                    fontWeight: 800,
                    color: 'rgba(255, 255, 255, 0.85)',
                    letterSpacing: '0.1em',
                  }}
                >
                  F/1.4 • 1/250s • ISO 400
                </span>
              </div>
            </div>

            {/* Bottom Titanium Engraved Plaque */}
            <div
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Unbounded', 'Syne', sans-serif",
                  fontSize: '13px',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                }}
              >
                VAIBHAV TIWARI
              </div>
              <div
                style={{
                  fontFamily: "'Instrument Serif', 'Italiana', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '16px',
                  color: '#00D2FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>the mind behind the pixels</span>
                <span style={{ fontStyle: 'normal', fontSize: '11px', color: '#CCFF00' }}>✦</span>
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '8px',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.35)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                CREATIVE ARCHITECT • BHARAT
              </div>
            </div>
          </div>

          {/* ── EDITORIAL CREATIVE STORY / MANIFESTO ── */}
          <div
            style={{
              background: 'radial-gradient(ellipse at 50% 20%, rgba(18, 24, 38, 0.94) 0%, rgba(10, 13, 20, 0.98) 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              padding: '38px 40px 36px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Atmospheric Corner Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '280px',
                height: '180px',
                background: 'radial-gradient(ellipse at 100% 0%, rgba(0, 210, 255, 0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Top Eyebrow Badge — Out of the box Creative Unbounded Emblem */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '8px', position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, rgba(204, 255, 0, 0.14) 0%, rgba(0, 210, 255, 0.08) 100%)',
                  border: '1.5px solid rgba(204, 255, 0, 0.45)',
                  boxShadow: '0 0 20px rgba(204, 255, 0, 0.15)',
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#CCFF00', boxShadow: '0 0 8px #CCFF00' }} />
                <span
                  style={{
                    fontFamily: "'Unbounded', 'Syne', sans-serif",
                    fontSize: '11px',
                    fontWeight: 900,
                    color: '#CCFF00',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  THE DESIGNER &amp; DEVELOPER
                </span>
                <span
                  style={{
                    fontFamily: "'Rozha One', 'Noto Serif Devanagari', serif",
                    fontSize: '12px',
                    color: '#00D2FF',
                    marginLeft: '2px',
                  }}
                >
                  // वास्तुकार
                </span>
              </div>

              <span
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '9.5px',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.4)',
                  letterSpacing: '0.12em',
                }}
              >
                HOWVAIBHAV ARCHIVE // MMXXVI
              </span>
            </div>

            {/* Lead Statement — Out of the Box Sculpture: Italiana + Unbounded + Instrument Serif Italic */}
            <h3
              style={{
                fontFamily: "'Italiana', 'Cinzel Decorative', serif",
                fontSize: 'clamp(23px, 2.7vw, 32px)',
                fontWeight: 400,
                letterSpacing: '0.03em',
                lineHeight: 1.32,
                margin: '0 0 26px',
                color: '#FFFFFF',
                position: 'relative',
                zIndex: 2,
              }}
            >
              Bridging the chasm between{' '}
              <span
                style={{
                  fontFamily: "'Unbounded', 'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: '0.88em',
                  letterSpacing: '0.02em',
                  background: 'linear-gradient(135deg, #00D2FF 0%, #38BDF8 60%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  filter: 'drop-shadow(0 2px 14px rgba(0, 210, 255, 0.35))',
                }}
              >
                RAW SOFTWARE ARCHITECTURE
              </span>{' '}
              and{' '}
              <span
                style={{
                  fontFamily: "'Instrument Serif', 'Bodoni Moda', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '1.24em',
                  fontWeight: 400,
                  background: 'linear-gradient(135deg, #CCFF00 0%, #F59E0B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  letterSpacing: '0.01em',
                }}
              >
                expressive visual alchemy.
              </span>
            </h3>

            {/* The "HowVaibhav" Authentic Origin Story — Elevated Editorial Dossier */}
            <div
              style={{
                background: 'linear-gradient(145deg, rgba(0, 210, 255, 0.08) 0%, rgba(14, 20, 32, 0.96) 100%)',
                border: '1.5px solid rgba(0, 210, 255, 0.35)',
                borderLeft: '4px solid #00D2FF',
                borderRadius: '16px',
                padding: '24px 26px',
                marginBottom: '24px',
                position: 'relative',
                boxShadow: '0 14px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                zIndex: 2,
              }}
            >
              {/* Badge */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D2FF', boxShadow: '0 0 10px #00D2FF' }} />
                  <span
                    style={{
                      fontFamily: "'Unbounded', 'Space Grotesk', sans-serif",
                      fontSize: '10px',
                      fontWeight: 900,
                      color: '#00D2FF',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                    }}
                  >
                    THE ORIGIN STORY // आत्मसंशय का अंत
                  </span>
                </div>
              </div>

              {/* The 3-Beat Doubt to Defiance Progression — Elevated with Darker Grotesque & Cinzel Decorative */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {[
                  {
                    num: '01',
                    context: 'When things fell apart and experiments failed, they asked with pity:',
                    quote: '“How, Vaibhav?”',
                    color: '#F43F5E',
                  },
                  {
                    num: '02',
                    context: 'When I claimed a blank canvas and started designing, they asked with disbelief:',
                    quote: '“How, Vaibhav?”',
                    color: '#38BDF8',
                  },
                  {
                    num: '03',
                    context: 'When I took my craft dead seriously to build my personal brand, they asked with resistance:',
                    quote: '“How, Vaibhav?”',
                    color: '#CCFF00',
                  },
                ].map((beat, bIdx) => (
                  <div
                    key={bIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '10px',
                      flexWrap: 'wrap',
                      padding: '4px 0',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Unbounded', sans-serif",
                        fontSize: '9.5px',
                        fontWeight: 900,
                        color: beat.color,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {beat.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Darker Grotesque', 'Bricolage Grotesque', sans-serif",
                        fontSize: '17px',
                        fontWeight: 700,
                        color: '#94A3B8',
                        letterSpacing: '0.01em',
                        lineHeight: 1.3,
                      }}
                    >
                      {beat.context}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cinzel Decorative', 'Bodoni Moda', serif",
                        fontWeight: 700,
                        fontSize: '17px',
                        color: beat.color,
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.03em',
                        textShadow: `0 0 12px ${beat.color}60`,
                      }}
                    >
                      {beat.quote}
                    </span>
                  </div>
                ))}
              </div>

              {/* The Sovereign Revelation Quote */}
              <div
                style={{
                  padding: '14px 18px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderLeft: '3px solid #CCFF00',
                  borderRadius: '6px 12px 12px 6px',
                  marginBottom: 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Darker Grotesque', 'Bricolage Grotesque', sans-serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#F8FAFC',
                    lineHeight: 1.5,
                    margin: 0,
                    letterSpacing: '0.015em',
                  }}
                >
                  The name{' '}
                  <strong
                    style={{
                      color: '#CCFF00',
                      fontWeight: 900,
                      fontFamily: "'Unbounded', 'Syne', sans-serif",
                      fontSize: '0.9em',
                      letterSpacing: '0.04em',
                      textShadow: '0 0 12px rgba(204, 255, 0, 0.4)',
                    }}
                  >
                    HowVaibhav
                  </strong>{' '}
                  is not just a creative handle. It is the definitive answer to every small-minded ego that doubted ambition, and the burial of all self-doubt. It began as their question of disbelief &mdash; it became my living declaration of proof.
                </p>
              </div>
            </div>

            {/* Philosophy Paragraph in Darker Grotesque + Instrument Serif */}
            <p
              style={{
                fontFamily: "'Darker Grotesque', 'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(17px, 1.5vw, 19px)',
                fontWeight: 700,
                color: '#CBD5E1',
                lineHeight: 1.55,
                letterSpacing: '0.015em',
                margin: 0,
                position: 'relative',
                zIndex: 2,
              }}
            >
              I care about the tiny details, the edge cases everyone else forgets, and shipping work that genuinely makes someone&apos;s day better.{' '}
              <span
                style={{
                  fontFamily: "'Instrument Serif', 'Bodoni Moda', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '1.2em',
                  color: '#FF7597',
                  fontWeight: 400,
                }}
              >
                (Yes, I will spend hours obsessing over acoustic button micro-haptics. No, my sanity hasn&apos;t returned, but your users&apos; subconscious will thank us.)
              </span>
            </p>
          </div>
        </div>

        {/* ── 2. THE CREATIVE ATELIER // 10 FLOATING INSTRUMENTS (OPEN & ARTISTIC) ── */}
        <div
          style={{
            position: 'relative',
            marginTop: '56px',
            paddingTop: '36px',
          }}
        >
          {/* Ambient Studio Lighting Aura */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(900px, 95vw)',
              height: '320px',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(204, 255, 0, 0.06) 0%, rgba(0, 210, 255, 0.04) 45%, transparent 75%)',
              filter: 'blur(45px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Section Editorial Header & Filter Controls */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '36px',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            {/* Left Header Lockup */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 14px',
                  borderRadius: '999px',
                  background: 'rgba(204, 255, 0, 0.08)',
                  border: '1px solid rgba(204, 255, 0, 0.3)',
                  marginBottom: '10px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#CCFF00', boxShadow: '0 0 8px #CCFF00' }} />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: '10px',
                    fontWeight: 900,
                    color: '#CCFF00',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  रचनात्मक साधन // CREATIVE INSTRUMENTS
                </span>
              </div>

              <h4
                style={{
                  fontFamily: "'Rozha One', 'Cinzel Decorative', serif",
                  fontSize: 'clamp(22px, 2.6vw, 32px)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  color: '#FFFFFF',
                  margin: '0 0 6px',
                  lineHeight: 1.25,
                }}
              >
                The Software Stack Behind the Craft
              </h4>

              <p
                style={{
                  fontFamily: "'Fraunces', 'Bodoni Moda', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '14.5px',
                  color: '#94A3B8',
                  margin: 0,
                  letterSpacing: '0.01em',
                }}
              >
                10 calibrated instruments for vector architecture, motion design &amp; acoustic synthesis.
              </p>
            </div>

            {/* Right: Minimalist Curatorial Category Pills */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '4px 6px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {[
                { id: 'ALL', label: 'ALL (10)' },
                { id: 'DESIGN', label: 'DESIGN (5)' },
                { id: 'VIDEO', label: 'VIDEO (4)' },
                { id: 'AUDIO', label: 'AUDIO (1)' },
              ].map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setActiveFilter(f.id);
                      try { soundFX.playTick(); } catch {}
                    }}
                    style={{
                      background: isActive ? '#CCFF00' : 'transparent',
                      color: isActive ? '#0A0F1D' : '#94A3B8',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '6px 14px',
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: '10px',
                      fontWeight: 900,
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isActive ? '0 0 16px rgba(204, 255, 0, 0.45)' : 'none',
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Floating Sculptural Instruments Dock (All 10 Tools Displayed in the Same Line) ── */}
          <div
            className="tools-dock-row"
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: filteredTools.length < 8 ? 'center' : 'space-between',
              alignItems: 'center',
              gap: 'clamp(6px, 1.1vw, 14px)',
              width: '100%',
              boxSizing: 'border-box',
              padding: '16px 4px 26px',
              overflowX: 'auto',
              overflowY: 'visible',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {filteredTools.map((tool) => {
              const isHov = hoveredTool === tool.id;

              return (
                <div
                  key={tool.id}
                  className="tool-cartridge"
                  onMouseEnter={() => {
                    setHoveredTool(tool.id);
                    try { soundFX.playHover(); } catch {}
                  }}
                  onMouseLeave={() => setHoveredTool(null)}
                  style={{
                    position: 'relative',
                    flex: '1 1 0px',
                    minWidth: 'clamp(72px, 7.8vw, 102px)',
                    maxWidth: '116px',
                    height: 'clamp(108px, 9.6vw, 126px)',
                    borderRadius: 'clamp(16px, 1.6vw, 22px)',
                    background: isHov
                      ? `radial-gradient(circle at 50% 35%, ${tool.color}25 0%, rgba(18, 24, 38, 0.95) 100%)`
                      : 'linear-gradient(155deg, rgba(255, 255, 255, 0.04) 0%, rgba(10, 14, 22, 0.65) 100%)',
                    border: isHov
                      ? `1.5px solid ${tool.color}`
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: isHov
                      ? `0 24px 45px -10px ${tool.color}50, 0 0 26px ${tool.color}35, inset 0 1px 1px rgba(255, 255, 255, 0.3)`
                      : '0 8px 24px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                    transform: isHov ? 'translateY(-10px) scale(1.06)' : 'translateY(0) scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'clamp(6px, 0.9vw, 10px)',
                    padding: 'clamp(10px, 1.2vw, 14px) 4px clamp(8px, 1vw, 12px)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                  }}
                >
                  {/* Diffuse Color Glow Behind Icon */}
                  <div
                    style={{
                      position: 'absolute',
                      width: 'clamp(36px, 3.8vw, 48px)',
                      height: 'clamp(36px, 3.8vw, 48px)',
                      top: '28%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      background: tool.color,
                      filter: 'blur(20px)',
                      opacity: isHov ? 0.45 : 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none',
                      zIndex: 0,
                    }}
                  />

                  {/* Centered Vector Logo */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      width: 'clamp(38px, 3.8vw, 48px)',
                      height: 'clamp(38px, 3.8vw, 48px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: isHov ? 'scale(1.12)' : 'scale(1)',
                      filter: isHov ? `drop-shadow(0 6px 14px ${tool.color}65)` : 'none',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
                    }}
                  >
                    {tool.svg}
                  </div>

                  {/* Clean Tool Name with Micro Jewel Indicator */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      width: '100%',
                      maxWidth: '100%',
                      padding: '0 4px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <span
                      style={{
                        width: '3.5px',
                        height: '3.5px',
                        borderRadius: '50%',
                        background: isHov ? tool.color : 'rgba(255, 255, 255, 0.25)',
                        boxShadow: isHov ? `0 0 6px ${tool.color}` : 'none',
                        transition: 'all 0.22s ease',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: 'clamp(9.5px, 0.82vw, 11px)',
                        fontWeight: 800,
                        color: isHov ? '#FFFFFF' : '#94A3B8',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        letterSpacing: '-0.02em',
                        textAlign: 'center',
                        transition: 'color 0.22s ease',
                      }}
                    >
                      {tool.name.replace('Adobe ', '')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Minimalist Live Studio Status Telemetry */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              marginTop: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '10px',
              color: '#64748B',
              letterSpacing: '0.08em',
              textAlign: 'center',
              flexWrap: 'wrap',
            }}
          >
            {hoveredTool ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#CCFF00', fontWeight: 800 }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#CCFF00', boxShadow: '0 0 8px #CCFF00' }} />
                <span>
                  ACTIVE SELECTION: {SOFTWARE_TOOLS.find((t) => t.id === hoveredTool)?.name.toUpperCase()} // READY IN PRODUCTION PIPELINE
                </span>
              </div>
            ) : (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00D2FF', boxShadow: '0 0 6px #00D2FF' }} />
                <span>10 PRODUCTION-READY INSTRUMENTS</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
                <span style={{ color: '#94A3B8' }}>VECTOR ARCHITECTURE &bull; MOTION CINEMA &bull; AUDIO SYNTHESIS</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
