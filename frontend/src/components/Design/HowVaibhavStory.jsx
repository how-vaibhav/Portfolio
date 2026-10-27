import React, { useState } from 'react';
import { soundFX } from './soundFX';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HOWVAIBHAV STORY — "What's Up" / The Personal Brand Behind the Craft
 * ─────────────────────────────────────────────────────────────────────────────
 * Modeled with high precision after the user's reference journal layout:
 *  - Deep obsidian black grid theme (#07080B with 40px grid matrix).
 *  - Expressive handwritten narrative in Google Font 'Caveat'.
 *  - Sketched hand-drawn "what's up" boxed badge.
 *  - Flanking Polaroids with authentic washi tape and handwritten captions.
 *  - Ripped/torn paper skill chips with tactile hover effects.
 *  - Soulful, witty, and slightly sarcastic story answering "Why HowVaibhav?".
 */
export default function HowVaibhavStory() {
  const [leftPolaroidHovered, setLeftPolaroidHovered] = useState(false);
  const [rightPolaroidHovered, setRightPolaroidHovered] = useState(false);
  const [activeChip, setActiveChip] = useState(null);

  // Serrated ripped paper clip paths for authentic tactile chips
  const tornClipA = 'polygon(0% 8%, 2% 2%, 6% 6%, 10% 1%, 92% 3%, 96% 0%, 98% 7%, 100% 4%, 99% 93%, 97% 98%, 94% 94%, 90% 98%, 8% 96%, 4% 100%, 2% 94%, 0% 97%)';
  const tornClipB = 'polygon(0% 4%, 3% 0%, 7% 5%, 12% 2%, 88% 1%, 93% 6%, 97% 1%, 100% 6%, 98% 95%, 96% 100%, 92% 94%, 87% 98%, 11% 97%, 6% 93%, 3% 98%, 0% 92%)';

  return (
    <section
      className="howvaibhav-story-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '620px',
        padding: '60px 20px 80px',
        overflow: 'hidden',
        background: 'transparent',
        userSelect: 'none',
      }}
      aria-label="About the craft and the story of HowVaibhav"
    >
      <style>{`
        @keyframes washiWiggle {
          0%, 100% { transform: translateY(0px) rotate(var(--washi-r, 0deg)); }
          50% { transform: translateY(-4px) rotate(calc(var(--washi-r, 0deg) + 1.5deg)); }
        }

        .polaroid-card {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
          cursor: pointer;
        }

        .torn-paper-chip {
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.22s ease, box-shadow 0.22s ease;
          cursor: pointer;
        }

        .torn-paper-chip:hover {
          transform: translateY(-4px) scale(1.05) !important;
          filter: brightness(1.08);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6);
        }

        @media (max-width: 960px) {
          .story-desktop-layout {
            flex-direction: column !important;
            align-items: center !important;
            gap: 40px !important;
          }
          .story-polaroid-side {
            position: relative !important;
            top: auto !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            margin: 10px 0 !important;
          }
          .story-polaroids-mobile-row {
            display: flex !important;
            justify-content: center !important;
            gap: 20px !important;
            flex-wrap: wrap !important;
          }
        }
      `}</style>

      {/* Main Centered Content Container */}
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ── Top-Left Handwritten Label: "about me!" ── */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            left: 'max(16px, 8%)',
            fontFamily: "'Caveat', cursive",
            fontSize: '26px',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.7)',
            transform: 'rotate(-8deg)',
            pointerEvents: 'none',
            letterSpacing: '0.02em',
          }}
        >
          about me!
        </div>

        {/* ── Top-Center Hand-Drawn Sketched Box: "what's up" ── */}
        <div
          style={{
            marginBottom: '26px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.85)',
            borderRadius: '6px',
            padding: '6px 24px 8px',
            background: 'rgba(13, 16, 24, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '3px 3px 0px rgba(255, 255, 255, 0.25)',
            transform: 'rotate(-1deg)',
            transition: 'transform 0.2s ease, border-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
            e.currentTarget.style.borderColor = '#00D2FF';
            try { soundFX.playTick(); } catch {}
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotate(-1deg)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.85)';
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '18px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
            }}
          >
            what&apos;s up
          </span>
        </div>

        {/* ── LEFT POLAROID (The Human Behind the Pixels) ── */}
        <div
          className="polaroid-card story-polaroid-side"
          onMouseEnter={() => {
            setLeftPolaroidHovered(true);
            try { soundFX.playSnap(); } catch {}
          }}
          onMouseLeave={() => setLeftPolaroidHovered(false)}
          style={{
            position: 'absolute',
            top: '50px',
            left: 'max(16px, 3%)',
            zIndex: 15,
            transform: leftPolaroidHovered
              ? 'translateY(-8px) rotate(-1deg) scale(1.04)'
              : 'rotate(-4deg)',
            width: '210px',
            background: '#FFFFFF',
            borderRadius: '4px',
            padding: '12px 12px 22px 12px',
            boxShadow: leftPolaroidHovered
              ? '0 24px 50px rgba(0, 0, 0, 0.75), 0 0 20px rgba(0, 210, 255, 0.25)'
              : '0 14px 34px rgba(0, 0, 0, 0.65)',
          }}
          title="The Creator · Vaibhav Tiwari"
        >
          {/* Top-Left Blue Washi Tape */}
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '-14px',
              width: '74px',
              height: '22px',
              background: 'rgba(147, 197, 253, 0.85)',
              border: '1px dashed rgba(59, 130, 246, 0.45)',
              transform: 'rotate(-16deg)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
          {/* Top-Right Yellow Washi Tape */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-12px',
              width: '68px',
              height: '20px',
              background: 'rgba(254, 240, 138, 0.88)',
              border: '1px dashed rgba(234, 179, 8, 0.45)',
              transform: 'rotate(14deg)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Photo Frame */}
          <div
            style={{
              width: '100%',
              height: '210px',
              background: '#0B0F19',
              overflow: 'hidden',
              borderRadius: '2px',
              position: 'relative',
            }}
          >
            <img
              src="/assets/vaibhav-hero-cutout.png"
              alt="Vaibhav Tiwari"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
                display: 'block',
                filter: 'contrast(1.05)',
                transition: 'transform 0.4s ease',
                transform: leftPolaroidHovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />
          </div>

          {/* Handwritten Polaroid Caption */}
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '17px',
              fontWeight: 700,
              color: '#1E293B',
              textAlign: 'center',
              marginTop: '10px',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
            }}
          >
            the human behind the pixels ✦
          </div>
        </div>

        {/* ── CENTER NARRATIVE TEXT: Soulful, Witty & Sarcastic Story ── */}
        <div
          style={{
            maxWidth: '640px',
            textAlign: 'center',
            padding: '0 16px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)',
              lineHeight: 1.48,
              color: '#F1F5F9',
              margin: '0 auto 16px',
              letterSpacing: '0.02em',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            I&apos;m a full-stack engineer and graphic designer who gets a little too excited about making complicated things feel simple.&nbsp;
            <span style={{ color: '#FFDE00', display: 'inline-block' }}>✨</span>
          </p>

          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
              lineHeight: 1.48,
              color: '#E2E8F0',
              margin: '0 auto 16px',
              letterSpacing: '0.02em',
            }}
          >
            People often ask:{' '}
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.92em',
                fontWeight: 800,
                color: '#00D2FF',
                background: 'rgba(0, 210, 255, 0.1)',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px dashed rgba(0, 210, 255, 0.4)',
                margin: '0 4px',
                display: 'inline-block',
                transform: 'rotate(-1deg)',
              }}
            >
              &ldquo;Why the name HowVaibhav?&rdquo;
            </span>
            <br />
            Because whether it was deploying distributed cloud backends at 3 AM or fine-tuning a display serif&apos;s bezier tangent by 0.2 millimeters, the reaction has always been:{' '}
            <em style={{ color: '#CCFF00', fontStyle: 'italic', fontWeight: 700 }}>
              &ldquo;Wait, how did you pull that off?&rdquo;
            </em>
            <br />
            <span style={{ color: '#FFB800', fontWeight: 700 }}>...Well. How? Vaibhav. ✦</span>
          </p>

          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 'clamp(1.3rem, 2.1vw, 1.68rem)',
              lineHeight: 1.46,
              color: 'rgba(255, 255, 255, 0.88)',
              margin: '0 auto 28px',
              letterSpacing: '0.015em',
            }}
          >
            I care about the tiny details, the edge cases everyone else forgets, and shipping work that genuinely makes someone&apos;s day better.{' '}
            <span style={{ color: '#FF2D78', fontStyle: 'italic' }}>
              (Yes, I will spend hours obsessing over acoustic button snaps. No, my sanity hasn&apos;t returned, but your users&apos; subconscious will thank us.)
            </span>&nbsp;
            <span style={{ display: 'inline-block' }}>🎨</span>
          </p>

          {/* ── TACTILE TORN PAPER SKILL CHIPS ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              marginTop: '10px',
            }}
          >
            {/* Row 1 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
              }}
            >
              {/* Chip 1: Interaction Design (Warm Golden Yellow) */}
              <div
                className="torn-paper-chip"
                onClick={() => {
                  try { soundFX.playTick(); } catch {}
                  setActiveChip('interaction');
                }}
                style={{
                  background: '#FBBF24',
                  color: '#0F172A',
                  padding: '9px 20px',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '13px',
                  fontWeight: 900,
                  letterSpacing: '0.02em',
                  clipPath: tornClipA,
                  transform: 'rotate(-1.5deg)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                Interaction Design
              </div>

              {/* Accent Mini Swatch Yellow */}
              <div
                className="torn-paper-chip"
                style={{
                  background: '#F59E0B',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  clipPath: tornClipB,
                  color: '#0F172A',
                  fontSize: '14px',
                  fontWeight: 900,
                  transform: 'rotate(4deg)',
                }}
              >
                ✦
              </div>

              {/* Chip 2: Prototyping / Systems (Vibrant Emerald Green) */}
              <div
                className="torn-paper-chip"
                onClick={() => {
                  try { soundFX.playTick(); } catch {}
                  setActiveChip('prototyping');
                }}
                style={{
                  background: '#10B981',
                  color: '#FFFFFF',
                  padding: '9px 22px',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '13px',
                  fontWeight: 900,
                  letterSpacing: '0.02em',
                  clipPath: tornClipB,
                  transform: 'rotate(1deg)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                Prototyping & Systems
              </div>

              {/* Accent Mini Swatch Green with Palette */}
              <div
                className="torn-paper-chip"
                style={{
                  background: '#059669',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  clipPath: tornClipA,
                  fontSize: '15px',
                  transform: 'rotate(-3deg)',
                }}
              >
                🎨
              </div>
            </div>

            {/* Row 2 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
              }}
            >
              {/* Chip 3: User Research & Psychology (Electric Rose Pink) */}
              <div
                className="torn-paper-chip"
                onClick={() => {
                  try { soundFX.playTick(); } catch {}
                  setActiveChip('research');
                }}
                style={{
                  background: '#F43F5E',
                  color: '#FFFFFF',
                  padding: '9px 20px',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '13px',
                  fontWeight: 900,
                  letterSpacing: '0.02em',
                  clipPath: tornClipB,
                  transform: 'rotate(1.5deg)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                User Research & Edge Cases
              </div>

              {/* Accent Mini Swatch Pink with Puzzle */}
              <div
                className="torn-paper-chip"
                style={{
                  background: '#E11D48',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  clipPath: tornClipA,
                  fontSize: '14px',
                  transform: 'rotate(-5deg)',
                }}
              >
                🧩
              </div>

              {/* Chip 4: Motion Design (Cobalt Electric Blue) */}
              <div
                className="torn-paper-chip"
                onClick={() => {
                  try { soundFX.playTick(); } catch {}
                  setActiveChip('motion');
                }}
                style={{
                  background: '#2563EB',
                  color: '#FFFFFF',
                  padding: '9px 22px',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '13px',
                  fontWeight: 900,
                  letterSpacing: '0.02em',
                  clipPath: tornClipA,
                  transform: 'rotate(-1deg)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                Motion & Micro-Haptics
              </div>

              {/* Accent Mini Swatch Blue with Eyes */}
              <div
                className="torn-paper-chip"
                style={{
                  background: '#1D4ED8',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  clipPath: tornClipB,
                  fontSize: '14px',
                  transform: 'rotate(6deg)',
                }}
              >
                👀
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT POLAROID (Studio & Workspace Lab) ── */}
        <div
          className="polaroid-card story-polaroid-side"
          onMouseEnter={() => {
            setRightPolaroidHovered(true);
            try { soundFX.playSnap(); } catch {}
          }}
          onMouseLeave={() => setRightPolaroidHovered(false)}
          style={{
            position: 'absolute',
            top: '50px',
            right: 'max(16px, 3%)',
            zIndex: 15,
            transform: rightPolaroidHovered
              ? 'translateY(-8px) rotate(1deg) scale(1.04)'
              : 'rotate(5deg)',
            width: '210px',
            background: '#FFFFFF',
            borderRadius: '4px',
            padding: '12px 12px 22px 12px',
            boxShadow: rightPolaroidHovered
              ? '0 24px 50px rgba(0, 0, 0, 0.75), 0 0 20px rgba(204, 255, 0, 0.25)'
              : '0 14px 34px rgba(0, 0, 0, 0.65)',
          }}
          title="Studio Workspace · Late Night Lab"
        >
          {/* Top-Left Sage Washi Tape */}
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '-14px',
              width: '74px',
              height: '22px',
              background: 'rgba(167, 243, 208, 0.88)',
              border: '1px dashed rgba(16, 185, 129, 0.45)',
              transform: 'rotate(-12deg)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
          {/* Top-Right Soft Coral Washi Tape */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-12px',
              width: '68px',
              height: '20px',
              background: 'rgba(254, 205, 211, 0.88)',
              border: '1px dashed rgba(244, 63, 94, 0.45)',
              transform: 'rotate(16deg)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Photo Frame */}
          <div
            style={{
              width: '100%',
              height: '210px',
              background: '#0B0F19',
              overflow: 'hidden',
              borderRadius: '2px',
              position: 'relative',
            }}
          >
            <img
              src="/assets/footer-banner.png"
              alt="Workspace and studio setup"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
                transform: rightPolaroidHovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />
          </div>

          {/* Handwritten Polaroid Caption */}
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '17px',
              fontWeight: 700,
              color: '#1E293B',
              textAlign: 'center',
              marginTop: '10px',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
            }}
          >
            my workspace lab ☕
          </div>
        </div>
      </div>
    </section>
  );
}
