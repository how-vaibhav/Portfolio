import React, { useState } from 'react';
import { soundFX } from './soundFX';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DESIGN ARTISTIC DOODLES & GRAPHIC ELEMENTS
 * ─────────────────────────────────────────────────────────────────────────────
 * Handcrafted geometric, typographic, and vector drafting motifs crafted for
 * the dark obsidian grid of HowVaibhav Graphic Archive.
 *
 * Includes:
 *  1. NeonLightningBolt (Exact homage to user's screenshot)
 *  2. VectorPenNib & Bezier Tangents
 *  3. Fibonacci Golden Spiral & Phi Matrix
 *  4. Swiss Reticle Crop Marks & Registration Targets
 *  5. Sacred Yantra Mandala Geometric Matrix
 *  6. Prism Chromatic Refraction Fan
 *  7. Modernist Star Cluster (✦)
 *  8. Chromatic Eyedropper & Ripple Waves
 *  9. Display Ampersand (&) Wireframe Specimen
 * 10. Harmonic Sine Wave Filament
 */

// ── 1. Neon Lightning Bolt (Exact Homage to User's Screenshot) ─────────────────
export function Doodle_NeonLightningBolt({
  color = '#1E6BFF',
  fillOpacity = 0.18,
  width = 90,
  height = 135,
  rotation = -6,
  style = {},
  className = '',
  interactive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artistic-doodle-item ${className}`}
      onMouseEnter={() => {
        if (!interactive) return;
        setIsHovered(true);
        try { soundFX.playTick(); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotation}deg) scale(${isHovered ? 1.15 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
        filter: isHovered
          ? `drop-shadow(0 0 16px ${color}) drop-shadow(0 0 30px ${color})`
          : `drop-shadow(0 0 8px ${color}60)`,
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        userSelect: 'none',
        ...style,
      }}
      title="Electric Velocity · Kinetic Bolt"
    >
      <svg viewBox="0 0 100 150" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Jagged Neon Bolt Body */}
        <path
          d="M58,6 L22,70 L52,70 L34,142 L82,66 L52,66 L74,6 Z"
          fill={color}
          fillOpacity={isHovered ? fillOpacity * 1.8 : fillOpacity}
          stroke={color}
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ transition: 'fill-opacity 0.25s ease' }}
        />
        {/* Kinetic Radiating Spark Lines */}
        <path
          d="M14,64 L4,60 M80,108 L92,116 M76,28 L86,20"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Central Energy Core Spark Dot */}
        <circle cx="52" cy="68" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

// ── 2. Vector Pen Nib with Bezier Control Tangents ─────────────────────────────
export function Doodle_VectorPenNib({
  color = '#00D2FF',
  accentColor = '#9E7BFF',
  width = 130,
  height = 110,
  rotation = 8,
  style = {},
  className = '',
  interactive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artistic-doodle-item ${className}`}
      onMouseEnter={() => {
        if (!interactive) return;
        setIsHovered(true);
        try { soundFX.playTick(); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotation}deg) scale(${isHovered ? 1.12 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
        filter: isHovered ? `drop-shadow(0 0 14px ${color})` : `drop-shadow(0 0 6px ${color}50)`,
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        userSelect: 'none',
        ...style,
      }}
      title="Vector Craft · Bezier Cubic Spline"
    >
      <svg viewBox="0 0 150 120" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Drawn Smooth Bezier Curve Path */}
        <path
          d="M 12,95 C 40,20 100,110 138,30"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tangent Guideline Handle Left */}
        <line x1="12" y1="95" x2="40" y2="20" stroke={accentColor} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.75" />
        <circle cx="40" cy="20" r="3.5" fill="none" stroke={accentColor} strokeWidth="1.5" />

        {/* Tangent Guideline Handle Right */}
        <line x1="100" y1="110" x2="138" y2="30" stroke={accentColor} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.75" />
        <circle cx="100" cy="110" r="3.5" fill="none" stroke={accentColor} strokeWidth="1.5" />

        {/* Sculptural Fountain Pen Nib Drawing at (138, 30) */}
        <g transform="translate(138, 30) rotate(-45)">
          <path
            d="M 0,0 L -12,24 L -6,28 L -6,44 L 6,44 L 6,28 L 12,24 Z"
            fill="rgba(10, 14, 24, 0.9)"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Nib Slit & Breather Hole */}
          <line x1="0" y1="0" x2="0" y2="18" stroke={color} strokeWidth="1.2" />
          <circle cx="0" cy="18" r="2.2" fill={color} />
          {/* Nib Golden Trim Band */}
          <line x1="-5" y1="36" x2="5" y2="36" stroke="#FFB800" strokeWidth="1.8" />
        </g>

        {/* Anchor Points */}
        <rect x="9.5" y="92.5" width="5" height="5" fill="#FFFFFF" stroke={color} strokeWidth="1" />
        <rect x="135.5" y="27.5" width="5" height="5" fill="#FFFFFF" stroke={color} strokeWidth="1" />

        {/* Technical Coordinate Micro-Tag */}
        <text
          x="12"
          y="112"
          fill={accentColor}
          fontSize="7.5"
          fontFamily="'Space Grotesk', monospace"
          fontWeight="700"
          letterSpacing="0.08em"
          opacity="0.85"
        >
          BEZIER // P0→P3
        </text>
      </svg>
    </div>
  );
}

// ── 3. Fibonacci Golden Spiral & Phi Proportion Matrix ─────────────────────────
export function Doodle_FibonacciGoldenSpiral({
  color = '#F59E0B',
  subColor = 'rgba(255, 255, 255, 0.25)',
  size = 140,
  rotation = 0,
  style = {},
  className = '',
  interactive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artistic-doodle-item ${className}`}
      onMouseEnter={() => {
        if (!interactive) return;
        setIsHovered(true);
        try { soundFX.playTick(); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${size}px`,
        height: `${size * 0.62}px`,
        transform: `rotate(${rotation}deg) scale(${isHovered ? 1.12 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
        filter: isHovered ? `drop-shadow(0 0 16px ${color})` : `drop-shadow(0 0 6px ${color}45)`,
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        userSelect: 'none',
        ...style,
      }}
      title="Sacred Proportion · Golden Ratio (φ = 1.618)"
    >
      <svg viewBox="0 0 162 100" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Golden Ratio Rectangles */}
        <rect x="1" y="1" width="160" height="98" stroke={subColor} strokeWidth="0.8" strokeDasharray="2 2" />
        <rect x="1" y="1" width="98" height="98" stroke={subColor} strokeWidth="0.8" />
        <rect x="99" y="1" width="62" height="62" stroke={subColor} strokeWidth="0.8" />
        <rect x="123" y="63" width="38" height="36" stroke={subColor} strokeWidth="0.8" />
        <rect x="99" y="77" width="24" height="22" stroke={subColor} strokeWidth="0.8" />

        {/* The True Logarithmic Golden Spiral Arcs */}
        <path
          d="M 1,99 A 98,98 0 0,1 99,1 A 62,62 0 0,1 161,63 A 38,38 0 0,1 123,99 A 24,24 0 0,1 99,77"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          style={{
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
        />

        {/* Phi Symbol Stamp */}
        <g transform="translate(18, 48)">
          <ellipse cx="6" cy="6" rx="5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
          <line x1="6" y1="0" x2="6" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <text
            x="14"
            y="9"
            fill={color}
            fontSize="7"
            fontFamily="'Space Grotesk', monospace"
            fontWeight="800"
            letterSpacing="0.05em"
          >
            = 1.618
          </text>
        </g>
      </svg>
    </div>
  );
}

// ── 4. Swiss Modernist Reticle & Crop Target ────────────────────────────────────
export function Doodle_SwissReticleCropMark({
  color = '#CCFF00',
  size = 90,
  rotation = 0,
  style = {},
  className = '',
  interactive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artistic-doodle-item ${className}`}
      onMouseEnter={() => {
        if (!interactive) return;
        setIsHovered(true);
        try { soundFX.playTick(); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotation}deg) scale(${isHovered ? 1.15 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
        filter: isHovered ? `drop-shadow(0 0 16px ${color})` : `drop-shadow(0 0 6px ${color}45)`,
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        userSelect: 'none',
        ...style,
      }}
      title="Swiss Grid Standard · Registration Crosshair"
    >
      <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Outer Registration Ring */}
        <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.65" />
        {/* Inner Solid Precision Ring */}
        <circle cx="50" cy="50" r="26" stroke={color} strokeWidth="1.4" />
        {/* Center Target Dot */}
        <circle cx="50" cy="50" r="3.5" fill={color} />

        {/* Axial Crosshairs */}
        <line x1="10" y1="50" x2="90" y2="50" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="50" y1="10" x2="50" y2="90" stroke={color} strokeWidth="1.4" strokeLinecap="round" />

        {/* 4 Corner Crop Marks */}
        <path d="M 12,24 L 12,12 L 24,12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 88,24 L 88,12 L 76,12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 12,76 L 12,88 L 24,88" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 88,76 L 88,88 L 76,88" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Degree Ticks */}
        <circle cx="50" cy="14" r="1.2" fill={color} />
        <circle cx="86" cy="50" r="1.2" fill={color} />
        <circle cx="50" cy="86" r="1.2" fill={color} />
        <circle cx="14" cy="50" r="1.2" fill={color} />

        {/* CMYK Pill Swatches */}
        <g transform="translate(32, 94)">
          <rect x="0" y="0" width="7" height="3" fill="#00D2FF" rx="1.5" />
          <rect x="10" y="0" width="7" height="3" fill="#FF2D78" rx="1.5" />
          <rect x="20" y="0" width="7" height="3" fill="#FFDE00" rx="1.5" />
          <rect x="30" y="0" width="7" height="3" fill="#0A0B0E" stroke={color} strokeWidth="0.6" rx="1.5" />
        </g>
      </svg>
    </div>
  );
}

// ── 5. Sacred Yantra Mandala Geometric Matrix ──────────────────────────────────
export function Doodle_SacredYantraMandala({
  color = '#FFB800',
  size = 110,
  rotation = 0,
  style = {},
  className = '',
  interactive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artistic-doodle-item ${className}`}
      onMouseEnter={() => {
        if (!interactive) return;
        setIsHovered(true);
        try { soundFX.playTick(); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotation}deg) scale(${isHovered ? 1.14 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
        filter: isHovered ? `drop-shadow(0 0 16px ${color})` : `drop-shadow(0 0 6px ${color}45)`,
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        userSelect: 'none',
        ...style,
      }}
      title="Sacred Sacred Geometry · Yantra Matrix"
    >
      <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Outer Cosmic Halo */}
        <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="1" />

        {/* Upward Equilateral Triangle (Purusha / Ascending Spirit) */}
        <polygon
          points="50,14 80,68 20,68"
          stroke={color}
          strokeWidth="1.4"
          fill={color}
          fillOpacity={isHovered ? 0.16 : 0.06}
          style={{ transition: 'fill-opacity 0.25s ease' }}
        />

        {/* Downward Equilateral Triangle (Prakriti / Material Grace) */}
        <polygon
          points="50,86 20,32 80,32"
          stroke={color}
          strokeWidth="1.4"
          fill={color}
          fillOpacity={isHovered ? 0.16 : 0.06}
          style={{ transition: 'fill-opacity 0.25s ease' }}
        />

        {/* Inner Octagram Diamond */}
        <polygon points="50,26 74,50 50,74 26,50" stroke={color} strokeWidth="0.9" strokeDasharray="2 2" />

        {/* Sacred Bindu Point of Inception */}
        <circle cx="50" cy="50" r="5" stroke={color} strokeWidth="1.2" fill="rgba(10, 14, 24, 0.8)" />
        <circle cx="50" cy="50" r="2.2" fill="#FFFFFF" />

        {/* Cardinal Axis Tick Rays */}
        <line x1="50" y1="4" x2="50" y2="12" stroke={color} strokeWidth="1.2" />
        <line x1="50" y1="88" x2="50" y2="96" stroke={color} strokeWidth="1.2" />
        <line x1="4" y1="50" x2="12" y2="50" stroke={color} strokeWidth="1.2" />
        <line x1="88" y1="50" x2="96" y2="50" stroke={color} strokeWidth="1.2" />
      </svg>
    </div>
  );
}

// ── 6. Optical Prism & Chromatic Refraction Fan ────────────────────────────────
export function Doodle_PrismRefractionFan({
  width = 150,
  height = 95,
  rotation = 0,
  style = {},
  className = '',
  interactive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artistic-doodle-item ${className}`}
      onMouseEnter={() => {
        if (!interactive) return;
        setIsHovered(true);
        try { soundFX.playTick(); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotation}deg) scale(${isHovered ? 1.12 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
        filter: isHovered ? 'drop-shadow(0 0 16px rgba(0, 210, 255, 0.8))' : 'drop-shadow(0 0 6px rgba(0, 210, 255, 0.3))',
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        userSelect: 'none',
        ...style,
      }}
      title="Optical Physics · Chromatic Dispersion"
    >
      <svg viewBox="0 0 160 100" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Incoming Laser Beam */}
        <line x1="4" y1="65" x2="54" y2="52" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="54" cy="52" r="3" fill="#FFFFFF" />

        {/* Triangular Quartz Prism */}
        <polygon
          points="62,15 96,82 28,82"
          stroke="rgba(255, 255, 255, 0.7)"
          strokeWidth="1.8"
          fill="rgba(255, 255, 255, 0.06)"
          style={{ backdropFilter: 'blur(4px)' }}
        />

        {/* Refracted Chromatic Spectrum Fan */}
        <path d="M 68,48 L 155,22" stroke="#FF2D78" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <path d="M 70,52 L 155,34" stroke="#9E7BFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <path d="M 72,56 L 155,46" stroke="#00D2FF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <path d="M 74,60 L 155,58" stroke="#CCFF00" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <path d="M 76,64 L 155,70" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" opacity="0.9" />

        {/* Spectrum Fill Waves */}
        <polygon points="68,48 155,22 155,70 76,64" fill="url(#prismGrad)" opacity="0.18" />

        <defs>
          <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#FF2D78" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00D2FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ── 7. Modernist Geometric Star Clusters (✦) ──────────────────────────────────
export function Doodle_ModernistStarCluster({
  color = '#CCFF00',
  size = 60,
  rotation = 0,
  style = {},
  className = '',
  interactive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artistic-doodle-item ${className}`}
      onMouseEnter={() => {
        if (!interactive) return;
        setIsHovered(true);
        try { soundFX.playTick(); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotation}deg) scale(${isHovered ? 1.25 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
        filter: isHovered ? `drop-shadow(0 0 16px ${color})` : `drop-shadow(0 0 6px ${color}55)`,
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        userSelect: 'none',
        ...style,
      }}
      title="Typographic Soul · Luminary Star"
    >
      <svg viewBox="0 0 80 80" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Four-Point Geometric Display Star */}
        <path
          d="M 40,4 C 40,24 44,36 64,40 C 44,44 40,56 40,76 C 40,56 36,44 16,40 C 36,36 40,24 40,4 Z"
          fill={color}
          fillOpacity={isHovered ? 0.95 : 0.75}
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />

        {/* Small Companion Sparkle Star */}
        <path
          d="M 64,12 C 64,18 66,20 72,22 C 66,24 64,26 64,32 C 64,26 62,24 56,22 C 62,20 64,18 64,12 Z"
          fill="#FFFFFF"
          opacity="0.85"
        />

        {/* Radiant Cardinal Ray Ticks */}
        <circle cx="40" cy="40" r="1.8" fill="#FFFFFF" />
        <line x1="40" y1="0" x2="40" y2="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="40" y1="77" x2="40" y2="80" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0" y1="40" x2="3" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="77" y1="40" x2="80" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ── 8. Chromatic Eyedropper & Ripple Wave ─────────────────────────────────────
export function Doodle_ChromaticEyedropper({
  color = '#FF2D78',
  rippleColor = 'rgba(255, 45, 120, 0.35)',
  width = 95,
  height = 95,
  rotation = -12,
  style = {},
  className = '',
  interactive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artistic-doodle-item ${className}`}
      onMouseEnter={() => {
        if (!interactive) return;
        setIsHovered(true);
        try { soundFX.playTick(); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotation}deg) scale(${isHovered ? 1.15 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
        filter: isHovered ? `drop-shadow(0 0 16px ${color})` : `drop-shadow(0 0 6px ${color}45)`,
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        userSelect: 'none',
        ...style,
      }}
      title="Chromatic Palette · Color Extraction Tool"
    >
      <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Concentric Color Ripple Rings */}
        <circle cx="28" cy="74" r="14" stroke={rippleColor} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
        <circle cx="28" cy="74" r="22" stroke={rippleColor} strokeWidth="0.8" opacity="0.4" />

        {/* Pigment Droplet */}
        <path
          d="M 28,68 C 24,72 24,78 28,81 C 32,78 32,72 28,68 Z"
          fill={color}
          stroke="#FFFFFF"
          strokeWidth="1"
        />

        {/* 45-degree Angled Eyedropper Tube */}
        <g transform="translate(10, 10) rotate(-45 50 50)">
          {/* Squeeze Bulb */}
          <path d="M 45,10 C 45,4 55,4 55,10 L 55,20 L 45,20 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.4" />
          {/* Glass Barrel */}
          <rect x="46" y="20" width="8" height="34" fill="rgba(255, 255, 255, 0.15)" stroke="#FFFFFF" strokeWidth="1.4" />
          {/* Ink Level Inside Barrel */}
          <rect x="47" y="32" width="6" height="21" fill={color} fillOpacity="0.7" />
          {/* Tapered Tip */}
          <polygon points="46,54 54,54 51,68 49,68" fill="rgba(255, 255, 255, 0.25)" stroke="#FFFFFF" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

// ── 9. Display Ampersand (&) Wireframe Specimen ────────────────────────────────
export function Doodle_DisplayAmpersandSpecimen({
  color = '#9E7BFF',
  size = 100,
  rotation = 6,
  style = {},
  className = '',
  interactive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artistic-doodle-item ${className}`}
      onMouseEnter={() => {
        if (!interactive) return;
        setIsHovered(true);
        try { soundFX.playTick(); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${size}px`,
        height: `${size * 1.15}px`,
        transform: `rotate(${rotation}deg) scale(${isHovered ? 1.14 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
        filter: isHovered ? `drop-shadow(0 0 16px ${color})` : `drop-shadow(0 0 6px ${color}45)`,
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        userSelect: 'none',
        ...style,
      }}
      title="Bespoke Typographic Specimen · Ampersand"
    >
      <svg viewBox="0 0 100 115" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Baseline & Ascender Drafting Lines */}
        <line x1="0" y1="22" x2="100" y2="22" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="0" y1="92" x2="100" y2="92" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="0.8" />

        {/* Sculptural Bodoni Wireframe Ampersand Glyph */}
        <text
          x="46"
          y="92"
          textAnchor="middle"
          fill="none"
          stroke={color}
          strokeWidth={isHovered ? '2' : '1.5'}
          fontFamily="'Bodoni Moda', 'Playfair Display', Georgia, serif"
          fontSize="92"
          fontStyle="italic"
          fontWeight="900"
          style={{ transition: 'stroke-width 0.2s ease' }}
        >
          &amp;
        </text>

        {/* Construction Node Dots */}
        <circle cx="50" cy="22" r="2.5" fill="#FFFFFF" stroke={color} strokeWidth="1" />
        <circle cx="34" cy="58" r="2.5" fill="#FFFFFF" stroke={color} strokeWidth="1" />
        <circle cx="82" cy="88" r="2.5" fill="#FFFFFF" stroke={color} strokeWidth="1" />
      </svg>
    </div>
  );
}

// ── 10. Harmonic Sinusoidal Wave Ribbon ─────────────────────────────────────────
export function Doodle_HarmonicSineWave({
  color = '#00E5C3',
  width = 160,
  height = 50,
  rotation = 0,
  style = {},
  className = '',
  interactive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artistic-doodle-item ${className}`}
      onMouseEnter={() => {
        if (!interactive) return;
        setIsHovered(true);
        try { soundFX.playTick(); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotation}deg) scale(${isHovered ? 1.12 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
        filter: isHovered ? `drop-shadow(0 0 14px ${color})` : `drop-shadow(0 0 5px ${color}45)`,
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        userSelect: 'none',
        ...style,
      }}
      title="Harmonic Frequency · Visual Rhythm"
    >
      <svg viewBox="0 0 180 50" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Center Neutral Axis */}
        <line x1="0" y1="25" x2="180" y2="25" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="2 3" />

        {/* Flowing Sine Waves */}
        <path
          d="M 0,25 Q 22,2 45,25 T 90,25 T 135,25 T 180,25"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 0,25 Q 22,10 45,25 T 90,25 T 135,25 T 180,25"
          stroke={color}
          strokeWidth="1.2"
          strokeDasharray="2 2"
          opacity="0.5"
          fill="none"
        />

        {/* Amplitude Nodes */}
        <circle cx="22.5" cy="13.5" r="3" fill="#FFFFFF" stroke={color} strokeWidth="1" />
        <circle cx="67.5" cy="36.5" r="3" fill="#FFFFFF" stroke={color} strokeWidth="1" />
        <circle cx="112.5" cy="13.5" r="3" fill="#FFFFFF" stroke={color} strokeWidth="1" />
        <circle cx="157.5" cy="36.5" r="3" fill="#FFFFFF" stroke={color} strokeWidth="1" />
      </svg>
    </div>
  );
}
