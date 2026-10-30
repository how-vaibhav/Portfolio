import { motion } from 'motion/react';

/**
 * 10 Traditional Ancient Indian Artistic Micro-Elements:
 * Crafted as precision, resolution-independent vector motifs with luxury obsidian & gold aesthetics.
 *
 * 1.  Motif1_Dharmachakra   - 16-Spoke Cosmic Rotating Chakra Wheel
 * 2.  Motif2_SuryaAureole    - 16-Ray Radiating Solar Corona Aureole
 * 3.  Motif3_KolamKnot       - Brahma Mudi Sacred Kolam / Rangoli Infinity Ribbon
 * 4.  Motif4_ToranaBracket   - Classical Temple Archway Scalloped Corner Brackets
 * 5.  Motif5_YantraWatermark - Interlocking Triangles Mandalic Sacred Yantra
 * 6.  Motif6_PadmaCorner     - 4-Petal Sacred Lotus (Padma) Miniature Manuscript Accents
 * 7.  Motif7_KalashFinial    - Temple Shikhara / Kalash Architectural Finial Arch
 * 8.  Motif8_BinduCore       - Primordial Cosmic Origin (Bindu) Glowing Concentric Core
 * 9.  Motif9_DevanagariStamp - Royal Terracotta & Gold Mudrika Seal (सृजन, कला, रूप)
 * 10. Motif10_MayuraFlourish - Stylized Peacock Plume (Mayura Panka) Quill Flourish
 */

// ── 1. Dharmachakra (16-Spoke Cosmic Wheel) ──
export function Motif1_Dharmachakra({ size = 20, color = '#FFB800' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
      style={{ display: 'inline-block', flexShrink: 0 }}
      aria-label="Ancient Dharmachakra Motif"
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1" strokeOpacity="0.8" />
      <circle cx="12" cy="12" r="7.5" stroke={color} strokeWidth="0.6" strokeDasharray="1.5 1" strokeOpacity="0.6" />
      <circle cx="12" cy="12" r="2.5" fill={color} fillOpacity="0.9" />
      <circle cx="12" cy="12" r="1" fill="#07080B" />
      {/* 8 Primary Spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="4.5"
          x2="12"
          y2="9.5"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.85"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
      {/* 8 Secondary Sub-Spokes */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
        <circle
          key={deg}
          cx="12"
          cy="3"
          r="0.5"
          fill={color}
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </motion.svg>
  );
}

// ── 2. Surya Aureole (16-Ray Radiating Solar Corona) ──
export function Motif2_SuryaAureole({ isMobile = false }) {
  const size = isMobile ? 320 : 540;
  return (
    <motion.div
      animate={{
        scale: [1, 1.04, 1],
        opacity: [0.12, 0.2, 0.12],
      }}
      transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="140" stroke="#FFB800" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.35" />
        <circle cx="200" cy="200" r="100" stroke="#FF5500" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.4" />
        <circle cx="200" cy="200" r="60" stroke="#FFB800" strokeWidth="0.5" opacity="0.5" />
        {/* Radiating Solar Rays */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <line
              key={i}
              x1="200"
              y1="40"
              x2="200"
              y2="130"
              stroke="url(#suryaGrad)"
              strokeWidth="0.8"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}
        <defs>
          <linearGradient id="suryaGrad" x1="200" y1="40" x2="200" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFDE00" stopOpacity="0.7" />
            <stop offset="1" stopColor="#FF5500" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// ── 3. Kolam / Rangoli Infinity Knotwork Ribbon ──
export function Motif3_KolamKnot({ color = '#FFB800' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        margin: '0 auto',
        width: 'min(90%, 360px)',
      }}
      aria-label="Ancient Kolam Infinity Knotwork"
    >
      {/* Left Tapering Accent Line */}
      <span
        style={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${color}60)`,
        }}
      />

      {/* Symmetrical Brahma Mudi Loop Vector */}
      <svg width="68" height="20" viewBox="0 0 68 20" fill="none">
        {/* Center Bindu Diamond */}
        <polygon points="34,6 38,10 34,14 30,10" fill={color} fillOpacity="0.9" />
        <circle cx="34" cy="10" r="1.2" fill="#07080B" />

        {/* Left Infinite Loop */}
        <path
          d="M 30,10 C 22,4 16,16 10,10 C 4,4 12,16 20,10"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
        <circle cx="15" cy="10" r="1" fill={color} fillOpacity="0.8" />

        {/* Right Infinite Loop */}
        <path
          d="M 38,10 C 46,4 52,16 58,10 C 64,4 56,16 48,10"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
        <circle cx="53" cy="10" r="1" fill={color} fillOpacity="0.8" />
      </svg>

      {/* Right Tapering Accent Line */}
      <span
        style={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(90deg, ${color}60, transparent)`,
        }}
      />
    </div>
  );
}

// ── 4. Torana Brackets (Temple Archway Scalloped Corner Brackets) ──
export function Motif4_ToranaBracket({ position = 'top-left', color = '#FFB800' }) {
  const isTop = position.includes('top');
  const isLeft = position.includes('left');

  return (
    <div
      style={{
        position: 'absolute',
        top: isTop ? '6px' : 'auto',
        bottom: !isTop ? '6px' : 'auto',
        left: isLeft ? '6px' : 'auto',
        right: !isLeft ? '6px' : 'auto',
        width: '18px',
        height: '18px',
        pointerEvents: 'none',
        transform: `rotate(${isTop ? (isLeft ? 0 : 90) : (isLeft ? 270 : 180)}deg)`,
        opacity: 0.65,
      }}
      aria-hidden="true"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M 1,17 L 1,6 C 1,3 3,1 6,1 L 17,1"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="1" cy="17" r="1" fill={color} />
        <circle cx="17" cy="1" r="1" fill={color} />
        {/* Scalloped Arch Accent */}
        <path
          d="M 4,12 C 4,8 8,4 12,4"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  );
}

// ── 5. Yantra Watermark (Interlocking Triangles Sacred Yantra) ──
export function Motif5_YantraWatermark({ color = '#FFB800' }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '-16px',
        right: '-16px',
        width: '120px',
        height: '120px',
        pointerEvents: 'none',
        opacity: 0.1,
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="36" stroke={color} strokeWidth="0.7" />
        {/* Upward Triangle (Shiva) */}
        <polygon points="50,16 78,66 22,66" stroke={color} strokeWidth="0.9" fill="none" />
        {/* Downward Triangle (Shakti) */}
        <polygon points="50,84 22,34 78,34" stroke={color} strokeWidth="0.9" fill="none" />
        {/* Inner Octagram */}
        <circle cx="50" cy="50" r="18" stroke={color} strokeWidth="0.6" strokeDasharray="1.5 1.5" />
        <polygon points="50,34 62,58 38,58" stroke={color} strokeWidth="0.6" />
        <polygon points="50,66 38,42 62,42" stroke={color} strokeWidth="0.6" />
        <circle cx="50" cy="50" r="2" fill={color} />
      </svg>
    </div>
  );
}

// ── 6. Padma Corners (4-Petal Sacred Lotus Accents) ──
export function Motif6_PadmaCorner({ position = 'top-left', color = '#FFB800' }) {
  const isTop = position.includes('top');
  const isLeft = position.includes('left');

  return (
    <div
      style={{
        position: 'absolute',
        top: isTop ? '6px' : 'auto',
        bottom: !isTop ? '6px' : 'auto',
        left: isLeft ? '6px' : 'auto',
        right: !isLeft ? '6px' : 'auto',
        width: '14px',
        height: '14px',
        pointerEvents: 'none',
        zIndex: 5,
        opacity: 0.7,
        transform: `rotate(${isTop ? (isLeft ? 0 : 90) : (isLeft ? 270 : 180)}deg)`,
      }}
      aria-hidden="true"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {/* Lotus Petal Curve */}
        <path
          d="M 1,13 C 2,6 6,2 13,1 C 7,3 3,7 1,13 Z"
          fill={color}
          fillOpacity="0.4"
          stroke={color}
          strokeWidth="0.75"
        />
        <circle cx="3" cy="3" r="1" fill={color} />
      </svg>
    </div>
  );
}

// ── 7. Kalash Finial (Temple Shikhara Arch Crest) ──
export function Motif7_KalashFinial({ color = '#FFB800' }) {
  return (
    <svg width="10" height="9" viewBox="0 0 10 9" fill="none" style={{ display: 'inline-block' }}>
      {/* Crown Finial Tip */}
      <circle cx="5" cy="1.5" r="0.8" fill={color} />
      {/* Stepped Kalash Neck */}
      <path d="M 3.5,4 L 6.5,4 L 5.5,2.5 L 4.5,2.5 Z" fill={color} />
      {/* Rounded Sacred Pot Base */}
      <path d="M 2.5,8 C 2.5,5 7.5,5 7.5,8 Z" fill={color} fillOpacity="0.85" />
    </svg>
  );
}

// ── 8. Bindu Core (Cosmic Center Point of Inception) ──
export function Motif8_BinduCore({ color = '#FFB800', size = 9 }) {
  return (
    <span
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      aria-label="Ancient Bindu Point"
    >
      {/* Outer Golden Aura Ring */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `1px solid ${color}80`,
          boxShadow: `0 0 8px ${color}60`,
        }}
      />
      {/* Radiant Glowing Core */}
      <span
        style={{
          width: `${size - 4}px`,
          height: `${size - 4}px`,
          borderRadius: '50%',
          background: color,
        }}
      />
    </span>
  );
}

// ── 9. Devanagari Mudrika (Debossed Royal Wax Seal Stamp) ──
export function Motif9_DevanagariStamp({ glyph = 'सृजन', sub = 'SRIJAN', color = '#FFB800' }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 8px',
        borderRadius: '999px',
        background: 'rgba(255, 184, 0, 0.06)',
        border: `1px solid ${color}35`,
        boxShadow: `0 2px 10px rgba(0, 0, 0, 0.4), inset 0 0 8px ${color}15`,
      }}
      title={`Ancient Indian Craft Seal: ${sub}`}
    >
      {/* Circular Debossed Seal Mark */}
      <div
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`,
          border: `1px dashed ${color}70`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '9.5px',
          fontFamily: "'Noto Serif Devanagari', 'Rozha One', 'Yatra One', serif",
          fontWeight: 900,
          color: color,
          lineHeight: 1,
        }}
      >
        {glyph}
      </div>

      <span
        style={{
          fontFamily: "'Space Grotesk', monospace",
          fontSize: '8px',
          fontWeight: 800,
          letterSpacing: '0.1em',
          color: color,
          textTransform: 'uppercase',
        }}
      >
        {sub}
      </span>
    </div>
  );
}

// ── 10. Mayura Flourish (Stylized Peacock Feather Quill) ──
export function Motif10_MayuraFlourish({ color = '#00E5C3' }) {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '5px' }}
      aria-label="Mayura Feather Flourish"
    >
      {/* Feather Spine */}
      <path
        d="M 1,12 C 4,11 8,7 15,2"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
      {/* Feather Eye (Chandraka) */}
      <ellipse cx="12" cy="4" rx="3" ry="2" stroke={color} strokeWidth="0.8" strokeOpacity="0.9" fill="none" />
      <circle cx="12" cy="4" r="1.2" fill={color} fillOpacity="0.85" />
      {/* Barb Accents */}
      <path d="M 6,10 C 7,8 9,8 10,6" stroke={color} strokeWidth="0.6" strokeOpacity="0.5" />
    </svg>
  );
}
