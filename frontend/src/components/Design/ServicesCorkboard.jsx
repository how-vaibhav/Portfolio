import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from './soundFX';
import {
  Doodle_NeonLightningBolt,
  Doodle_VectorPenNib,
  Doodle_FibonacciGoldenSpiral,
  Doodle_SwissReticleCropMark,
  Doodle_ModernistStarCluster,
} from './DesignArtisticDoodles';

/**
 * ELEVATED SERVICES CORKBOARD DATA
 * 5 Studio-Grade Capabilities with comprehensive deliverables, scopes, and turnarounds.
 */
const INITIAL_CARDS = [
  {
    id: 'card-1',
    number: '01',
    badge: 'ZERO-TO-ONE IDENTITY',
    title: 'Brand Identity & Art Direction',
    shortTitle: 'Brand Identity',
    turnaround: '1–2 Weeks',
    deliverablesCount: '6 Master Modules',
    idealFit: 'Founders, Startups & Global Rebrands',
    summary: 'Distill your core essence into an iconic visual system that commands instant authority and scales seamlessly across every modern medium.',
    deliverables: [
      'Infinite-resolution vector logomark suite (.SVG, .AI, .EPS, .PDF) in primary, stacked, and glyph formats',
      'Comprehensive 40+ page Brand Guidelines covering optical construction, clear zones, and misuse rules',
      'Curated typography hierarchy pairing bespoke display serifs with robust web-safe sans-serifs',
      'Precision HSL/HEX color architecture featuring primary, secondary, and WCAG AA-accessible tokens',
      'Physical stationery & merchandise dielines (business cards, letterhead, foil-stamped folders)',
      '100% full commercial intellectual property assignment and master Figma asset package',
    ],
    type: 'branding',
    accentColor: '#1E6BFF',
    rotation: -6.5,
    x: 185,
    y: 195,
    width: 260,
    height: 365,
  },
  {
    id: 'card-2',
    number: '02',
    badge: 'HIGH-VELOCITY EDITORIAL',
    title: 'Social & Editorial Systems',
    shortTitle: 'Editorial Systems',
    turnaround: '3–5 Days',
    deliverablesCount: '5 Template Suites',
    idealFit: 'Founders, Creators & High-Growth Tech',
    summary: 'High-contrast, retention-engineered carousel slides and editorial templates designed to maximize organic reach and establish thought leadership.',
    deliverables: [
      'Modular 10-slide high-retention carousel templates built with Figma Auto-Layout 5.0',
      'High-converting typographic headline frameworks and custom thumbnail cover designs',
      'Motion-ready story and reel cover layouts optimized for 9:16 and 4:5 mobile viewports',
      'Reusable visual asset toolkit (custom vector arrows, editorial markers, highlighters, stamps)',
      'Clean editable Figma design components with unified typography styles for rapid publishing',
    ],
    type: 'social',
    accentColor: '#FF6B00',
    rotation: 2.2,
    x: 540,
    y: 280,
    width: 265,
    height: 370,
  },
  {
    id: 'card-3',
    number: '03',
    badge: 'TACTILE CRAFT & MERCH',
    title: 'Packaging, Print & Merch',
    shortTitle: 'Packaging & Merch',
    turnaround: '1–2 Weeks',
    deliverablesCount: '5 Production Dielines',
    idealFit: 'DTC Brands, Luxury Goods & Physical Products',
    summary: 'Tangible, high-end packaging experiences that turn unboxing into brand devotion through tactile textures, blind deboss, and foil accents.',
    deliverables: [
      'Print-ready custom dieline files calibrated for commercial offset, flexo, and digital presses',
      'Luxury finishing specs: blind debossing, hot-stamped gold/silver foils, spot UV, and soft-touch laminates',
      'Custom apparel & lifestyle merch mockups (heavyweight tees, tote bags, embroidered caps)',
      'Pantone Matching System (PMS) color separation guides and calibrated CMYK color profiles',
      'Direct printer prepress coordination and sample proof sign-off support to eliminate press errors',
    ],
    type: 'packaging',
    accentColor: '#F59E0B',
    rotation: 6.5,
    x: 885,
    y: 235,
    width: 260,
    height: 365,
  },
  {
    id: 'card-4',
    number: '04',
    badge: 'PRODUCTION TOKENS',
    title: 'Design Systems & Tokens',
    shortTitle: 'Design Systems',
    turnaround: '1–3 Weeks',
    deliverablesCount: '4 Architecture Layers',
    idealFit: 'SaaS Platforms, Engineering Teams & Scaling Apps',
    summary: 'Production-ready design systems bridging Figma and modern frontend frameworks with 100% token parity and zero design drift.',
    deliverables: [
      'Figma Variables token architecture with full multi-mode support (Dark, Light, Brand Accents)',
      'Automated token export pipeline producing clean CSS Custom Properties, Tailwind tokens, and JSON',
      'Reusable accessible UI component library (buttons, inputs, dropdowns, cards, navigation)',
      'Complete interactive state documentation (Default, Hover, Active, Focus-Visible, Disabled)',
      'WCAG 2.2 AA accessibility audit verifying color contrast ratios and keyboard navigation targets',
    ],
    type: 'systems',
    accentColor: '#00E5C3',
    rotation: 3.8,
    x: 295,
    y: 580,
    width: 260,
    height: 365,
  },
  {
    id: 'card-5',
    number: '05',
    badge: 'HIGH-STAKES COLLATERAL',
    title: 'Pitch Decks & Investor Collateral',
    shortTitle: 'Pitch Decks',
    turnaround: '3–7 Days',
    deliverablesCount: '15–20 Master Slides',
    idealFit: 'Founders Raising Capital & Keynote Speakers',
    summary: 'Persuasive, high-converting investor decks that translate complex technical architectures into crisp, fundable narratives.',
    deliverables: [
      'Custom 15–20 slide master presentation deck designed natively in Figma or Apple Keynote',
      'Bespoke data visualizations, inflection traction curves, and system architecture schematics',
      'Executive one-pager teaser PDF calibrated for high-impact investor email introductions',
      'Lightweight web-optimized PDF distribution package (under 10MB) with embedded interactive links',
      'Editable component templates allowing founders to update metrics and projections on the fly',
    ],
    type: 'pitchdeck',
    accentColor: '#B59FFF',
    rotation: -3.5,
    x: 775,
    y: 590,
    width: 265,
    height: 370,
  },
];

// Connection strings linking card pushpins (from -> to, natural curve sag)
const CONNECTIONS = [
  { from: 'card-1', to: 'card-2', sag: -26 }, // top-left to top-center
  { from: 'card-2', to: 'card-3', sag: -22 }, // top-center to top-right
  { from: 'card-1', to: 'card-4', sag: 22 },  // top-left to bottom-left
  { from: 'card-2', to: 'card-4', sag: 30 },  // top-center diagonal to bottom-left
  { from: 'card-2', to: 'card-5', sag: 26 },  // top-center diagonal to bottom-right
  { from: 'card-3', to: 'card-5', sag: 24 },  // top-right to bottom-right
  { from: 'card-4', to: 'card-5', sag: 34 },  // bottom-left to bottom-right baseline
];

/**
 * Realistic 3D Glossy Blue Pushpin with specular reflection and metallic pin point
 */
function Pushpin() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 35,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 6px 8px rgba(0, 0, 0, 0.35))',
      }}
    >
      {/* 3D Blue Resin Bulb with Specular Reflection */}
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #90BFFF 0%, #1E6BFF 45%, #0B3EAA 100%)',
          boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.65)',
          position: 'relative',
        }}
      >
        {/* Specular White Dot */}
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '6px',
            width: '6px',
            height: '4px',
            borderRadius: '50%',
            background: '#FFFFFF',
            opacity: 0.9,
            transform: 'rotate(-25deg)',
          }}
        />
      </div>

      {/* Tapered Collar */}
      <div
        style={{
          width: '12px',
          height: '5px',
          background: 'linear-gradient(90deg, #0B3EAA 0%, #1E6BFF 50%, #0B3EAA 100%)',
          borderRadius: '2px',
          marginTop: '-1px',
        }}
      />

      {/* Cast Shadow Below Pin */}
      <div
        style={{
          width: '18px',
          height: '6px',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, transparent 70%)',
          borderRadius: '50%',
          marginTop: '1px',
        }}
      />
    </div>
  );
}

/**
 * Studio-Grade High-Fidelity Artwork for Each Service
 */
function CardInnerArtwork({ type }) {
  if (type === 'branding') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '12px',
          background: 'radial-gradient(circle at 50% 20%, #FFFFFF 0%, #F5F7FA 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid Background Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)',
            backgroundSize: '12px 12px',
            pointerEvents: 'none',
          }}
        />

        {/* Top Header Tag */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '8.5px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0F172A',
            }}
          >
            OPTICAL GRID // 01
          </span>
          <span
            style={{
              fontSize: '8px',
              fontWeight: 800,
              background: '#EFF6FF',
              color: '#1E6BFF',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid #BFDBFE',
            }}
          >
            VECTOR MASTER
          </span>
        </div>

        {/* Centerpiece: Interlocking Monogram Emblem with Construction Geometry */}
        <div
          style={{
            margin: 'auto 0',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Construction Circle */}
          <div
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '1px dashed rgba(30, 107, 255, 0.35)',
              pointerEvents: 'none',
            }}
          />

          {/* Construction 45-deg Angle Guide */}
          <div
            style={{
              position: 'absolute',
              width: '115px',
              height: '1px',
              background: 'rgba(30, 107, 255, 0.25)',
              transform: 'rotate(45deg)',
              pointerEvents: 'none',
            }}
          />

          {/* Luxury Monogram Badge */}
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 20px -4px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(30, 107, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 3,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '28px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.06em',
                background: 'linear-gradient(180deg, #FFFFFF 30%, #CBD5E1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              HV
            </span>

            {/* Micro Gold Accent Dot */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#FFD700',
                boxShadow: '0 0 6px rgba(255, 215, 0, 0.8)',
              }}
            />
          </div>

          <div
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 800,
              color: '#0F172A',
              marginTop: '8px',
              letterSpacing: '-0.01em',
            }}
          >
            Elevera Global Identity
          </div>
        </div>

        {/* Bottom Swatches & Spec */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '6px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#0F172A' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#1E6BFF' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F8FAFC', border: '1px solid #CBD5E1' }} />
          </div>
          <span style={{ fontSize: '8px', fontFamily: 'monospace', fontWeight: 700, color: '#64748B' }}>
            CANELA + NEUE
          </span>
        </div>
      </div>
    );
  }

  if (type === 'social') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '12px',
          background: 'linear-gradient(180deg, #FAF8F5 0%, #FFF5ED 100%)',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            paddingBottom: '6px',
          }}
        >
          <span
            style={{
              fontSize: '8.5px',
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#1E293B',
              fontFamily: "'Space Grotesk', system-ui",
            }}
          >
            CAROUSEL SYSTEM
          </span>
          <span
            style={{
              fontSize: '7.5px',
              background: '#FFEDD5',
              color: '#C2410C',
              fontWeight: 800,
              padding: '2px 5px',
              borderRadius: '4px',
            }}
          >
            10-SLIDE DECK
          </span>
        </div>

        {/* Editorial Preview Card Stack */}
        <div
          style={{
            margin: 'auto 0',
            textAlign: 'center',
            background: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            padding: '12px 10px',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '13px',
              fontWeight: 900,
              color: '#0F172A',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            CRAFT OVER NOISE.
          </div>
          <p
            style={{
              fontSize: '8px',
              color: '#64748B',
              margin: '4px 0 0',
              lineHeight: 1.3,
            }}
          >
            Visual hooks that command attention in the first 0.6 seconds of scrolling.
          </p>

          {/* Swipe indicator dots */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3px',
              marginTop: '8px',
            }}
          >
            <span style={{ width: '12px', height: '3px', borderRadius: '2px', background: '#FF6B00' }} />
            <span style={{ width: '4px', height: '3px', borderRadius: '2px', background: '#CBD5E1' }} />
            <span style={{ width: '4px', height: '3px', borderRadius: '2px', background: '#CBD5E1' }} />
            <span style={{ width: '4px', height: '3px', borderRadius: '2px', background: '#CBD5E1' }} />
          </div>
        </div>

        {/* Metric Banner */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '8px',
            padding: '6px 8px',
            border: '1px solid #FED7AA',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '8px', fontWeight: 700, color: '#64748B' }}>Retention Uplift</span>
          <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#EA580C' }}>+340% ↗</span>
        </div>
      </div>
    );
  }

  if (type === 'packaging') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '12px',
          background: 'linear-gradient(180deg, #FDF8F0 0%, #F5EDE0 100%)',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px dashed #D6C7B2',
            paddingBottom: '5px',
          }}
        >
          <span
            style={{
              fontSize: '8.5px',
              fontWeight: 800,
              fontFamily: "'Space Grotesk', system-ui",
              color: '#78350F',
              letterSpacing: '0.05em',
            }}
          >
            DIELINE SPEC // 03
          </span>
          <span
            style={{
              fontSize: '7.5px',
              background: '#FEF3C7',
              color: '#B45309',
              fontWeight: 800,
              padding: '2px 5px',
              borderRadius: '4px',
            }}
          >
            OFFSET PRESS
          </span>
        </div>

        {/* Centerpiece: Luxury Packaging Box Graphic with Gold Foil Accent */}
        <div
          style={{
            margin: 'auto 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '88px',
              height: '84px',
              borderRadius: '12px',
              background: 'linear-gradient(145deg, #2A241F 0%, #15110E 100%)',
              border: '1.5px solid #E5C378',
              boxShadow: '0 8px 18px rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '8px',
            }}
          >
            {/* Gold Foil Crown Insignia */}
            <div
              style={{
                fontFamily: "'Space Grotesk', system-ui",
                fontSize: '8px',
                fontWeight: 900,
                color: '#FBBF24',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderBottom: '1px solid #78350F',
                paddingBottom: '2px',
              }}
            >
              HV ATELIER
            </div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#FFFFFF',
                marginTop: '4px',
                letterSpacing: '-0.02em',
              }}
            >
              24K FOIL
            </div>
            <span
              style={{
                fontSize: '7px',
                color: '#D4AF37',
                fontFamily: 'monospace',
                marginTop: '2px',
              }}
            >
              BLIND DEBOSS
            </span>

            {/* Corner Registration Marks */}
            <div style={{ position: 'absolute', top: '3px', left: '3px', width: '4px', height: '4px', borderTop: '1px solid #D4AF37', borderLeft: '1px solid #D4AF37' }} />
            <div style={{ position: 'absolute', bottom: '3px', right: '3px', width: '4px', height: '4px', borderBottom: '1px solid #D4AF37', borderRight: '1px solid #D4AF37' }} />
          </div>

          <div
            style={{
              fontSize: '10px',
              fontWeight: 800,
              color: '#451A03',
              marginTop: '6px',
            }}
          >
            Tactile Unboxing Suite
          </div>
        </div>

        {/* Bottom Swatch */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '6px',
            border: '1px solid #E5D5C0',
            padding: '5px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '7.5px', color: '#78350F', fontWeight: 700 }}>PANTONE 286 C</span>
          <span style={{ fontSize: '7.5px', fontFamily: 'monospace', fontWeight: 800, color: '#B45309' }}>871 METALLIC</span>
        </div>
      </div>
    );
  }

  if (type === 'systems') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '12px',
          background: '#F8FAFC',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            background: '#0F172A',
            color: '#FFF',
            padding: '6px 8px',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '8px',
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: "'Space Grotesk', monospace",
            }}
          >
            FIGMA TOKENS // 04
          </span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00E5C3', boxShadow: '0 0 6px #00E5C3' }} />
        </div>

        {/* Token Architecture Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', margin: '4px 0' }}>
          <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '6px', borderRadius: '6px' }}>
            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#0F172A' }}>COLOR TOKENS</div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#1E6BFF' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#00E5C3' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#0F172A' }} />
            </div>
            <div style={{ fontSize: '6.5px', fontFamily: 'monospace', color: '#64748B', marginTop: '3px' }}>
              $primary-500
            </div>
          </div>
          <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '6px', borderRadius: '6px' }}>
            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#0F172A' }}>TYPE SCALE</div>
            <div style={{ fontSize: '7px', fontWeight: 800, color: '#1E6BFF', marginTop: '2px' }}>
              1.25 Major 3rd
            </div>
            <div style={{ fontSize: '6.5px', fontFamily: 'monospace', color: '#64748B', marginTop: '2px' }}>
              12 / 16 / 24 / 40
            </div>
          </div>
        </div>

        {/* State Pill */}
        <div
          style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            padding: '5px 8px',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '8px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <span>✓</span>
          <span>Zero-Drift Figma Parity</span>
        </div>
      </div>
    );
  }

  // Pitch Decks & Investor Collateral
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px',
        background: 'linear-gradient(145deg, #0B0F19 0%, #151C2C 100%)',
        color: '#FFFFFF',
        position: 'relative',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '5px',
        }}
      >
        <span
          style={{
            fontSize: '8px',
            fontWeight: 900,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontFamily: "'Space Grotesk', system-ui",
            color: '#93C5FD',
          }}
        >
          INVESTOR DECK // 05
        </span>
        <span
          style={{
            fontSize: '7.5px',
            background: 'rgba(30, 107, 255, 0.25)',
            color: '#60A5FA',
            border: '1px solid rgba(96, 165, 250, 0.4)',
            fontWeight: 800,
            padding: '2px 5px',
            borderRadius: '4px',
          }}
        >
          SERIES A
        </span>
      </div>

      {/* Slide Visual Mockup */}
      <div
        style={{
          margin: 'auto 0',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '8px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            $4.2M Round
          </span>
          <span style={{ fontSize: '8px', color: '#10B981', fontWeight: 800 }}>+280% QoQ</span>
        </div>

        {/* Inflection Curve Graphic */}
        <svg viewBox="0 0 100 28" fill="none" style={{ width: '100%', height: '22px', margin: '4px 0' }}>
          <path d="M2,24 Q30,22 55,14 T98,2" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M2,24 Q30,22 55,14 T98,2 L98,28 L2,28 Z" fill="rgba(96, 165, 250, 0.15)" />
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7px', color: '#94A3B8' }}>
          <span>Seed Traction</span>
          <span style={{ color: '#E2E8F0', fontWeight: 700 }}>Series A Close</span>
        </div>
      </div>

      {/* Confidential Footer */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: '6px',
          padding: '4px 8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '7.5px',
        }}
      >
        <span style={{ color: '#94A3B8' }}>Collateral Spec</span>
        <span style={{ color: '#F8FAFC', fontWeight: 800 }}>Keynote + Figma</span>
      </div>
    </div>
  );
}

/**
 * Deliverables & Scope Inspector Modal
 * Pops up when clicking any service card, showing full scope, turnaround, and direct email inquiry.
 */
function DeliverablesModal({ service, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  const mailtoSubject = encodeURIComponent(`Project Inquiry: ${service.title} with HowVaibhav`);
  const mailtoBody = encodeURIComponent(
    `Hi Vaibhav,

I came across your portfolio and I'm interested in partnering with you on ${service.title}.

Project Overview:
- Timeline / Target Launch:
- Key Goals:

Looking forward to hearing from you!
`
  );
  const mailtoLink = `mailto:howvaibhav@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="deliverables-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(10, 15, 28, 0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: 'modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          try { soundFX.playPop(); } catch {}
          onClose();
        }
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '660px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'modalSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Top Header Ribbon */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            color: '#FFFFFF',
            padding: '24px 28px 22px',
            position: 'relative',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => {
              try { soundFX.playPop(); } catch {}
              onClose();
            }}
            aria-label="Close dialog"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>

          {/* Module Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(30, 107, 255, 0.25)',
              border: '1px solid rgba(30, 107, 255, 0.45)',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '11px',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              color: '#60A5FA',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}
          >
            <span>{service.number}</span>
            <span>//</span>
            <span>{service.badge}</span>
          </div>

          <h3
            id="deliverables-modal-title"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 'clamp(20px, 3.2vw, 26px)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}
          >
            {service.title}
          </h3>

          <p
            style={{
              fontSize: '14px',
              color: '#94A3B8',
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            {service.summary}
          </p>
        </div>

        {/* 3 Key Metric Specs Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            padding: '16px 28px',
            background: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Turnaround
            </div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#1E6BFF', marginTop: '2px', fontFamily: "'Space Grotesk', sans-serif" }}>
              {service.turnaround}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Scope Volume
            </div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#0F172A', marginTop: '2px', fontFamily: "'Space Grotesk', sans-serif" }}>
              {service.deliverablesCount}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Ideal Partner
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#334155', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {service.idealFit}
            </div>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div style={{ padding: '24px 28px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#0F172A',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ color: '#1E6BFF' }}>✦</span>
            <span>Included Master Deliverables</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  transition: 'background 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#1E6BFF',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  ✓
                </div>
                <div style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '18px 28px 24px',
            borderTop: '1px solid #E2E8F0',
            background: '#FFFFFF',
          }}
        >
          <button
            type="button"
            onClick={() => {
              try { soundFX.playPop(); } catch {}
              onClose();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748B',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '10px 16px',
              borderRadius: '999px',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#0F172A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
          >
            ← Back to Board
          </button>

          <a
            href={mailtoLink}
            onClick={() => {
              try { soundFX.playSnap(); } catch {}
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#1E6BFF',
              color: '#FFFFFF',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '14px',
              fontWeight: 800,
              padding: '12px 24px',
              borderRadius: '999px',
              textDecoration: 'none',
              boxShadow: '0 8px 24px -6px rgba(30, 107, 255, 0.45)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0B57E0';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1E6BFF';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Inquire About This Service</span>
            <span style={{ fontSize: '16px' }}>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * ServicesCorkboard Component - Clean, zero-lag anti-gravity pinboard
 * Clean solid background with NO grid lines, no clutter buttons.
 */
export default function ServicesCorkboard() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [draggedCardId, setDraggedCardId] = useState(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [selectedService, setSelectedService] = useState(null);

  const containerRef = useRef(null);
  const mobileRailRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, origX: 0, origY: 0, moved: false });

  // Mobile horizontal scroll tracking
  const handleMobileScroll = () => {
    if (!mobileRailRef.current) return;
    const scrollLeft = mobileRailRef.current.scrollLeft;
    const cardWidth = 270;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveMobileIdx(Math.max(0, Math.min(cards.length - 1, idx)));
  };

  const scrollToCard = (index) => {
    if (!mobileRailRef.current) return;
    const cardWidth = 286;
    mobileRailRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIdx(index);
    try { soundFX.playTick(); } catch {}
  };

  // Pointer Drag Handlers (Desktop Canvas)
  const handlePointerDown = (cardId, e) => {
    e.preventDefault();
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;

    setDraggedCardId(cardId);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      origX: card.x,
      origY: card.y,
      moved: false,
    };

    try { soundFX.playHover(); } catch {}
  };

  const handlePointerMove = (e) => {
    if (!draggedCardId) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      dragStartRef.current.moved = true;
    }

    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== draggedCardId) return c;
        return {
          ...c,
          x: dragStartRef.current.origX + deltaX,
          y: dragStartRef.current.origY + deltaY,
        };
      })
    );
  };

  const handlePointerUp = () => {
    if (draggedCardId) {
      if (!dragStartRef.current.moved) {
        // Was a tap/click without drag -> Open Inspection Modal!
        const clickedCard = cards.find((c) => c.id === draggedCardId);
        if (clickedCard) {
          try { soundFX.playSnap(); } catch {}
          setSelectedService(clickedCard);
        }
      } else {
        try { soundFX.playSnap(); } catch {}
      }
      setDraggedCardId(null);
    }
  };

  // Calculate dynamic tactile crimson thread bezier path connecting two card pin heads
  const getThreadPath = (fromId, toId, sagOffset) => {
    const c1 = cards.find((c) => c.id === fromId);
    const c2 = cards.find((c) => c.id === toId);
    if (!c1 || !c2) return '';

    // Pushpin penetration point is at top-center of card
    const p1x = c1.x;
    const p1y = c1.y - c1.height / 2 + 2;

    const p2x = c2.x;
    const p2y = c2.y - c2.height / 2 + 2;

    const midX = (p1x + p2x) / 2;
    const midY = (p1y + p2y) / 2 + sagOffset;

    return `M ${p1x} ${p1y} Q ${midX} ${midY} ${p2x} ${p2y}`;
  };

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        width: '100%',
        padding: '80px 0 70px',
        overflow: 'hidden',
        // Clean black grid aesthetic
        backgroundColor: '#0A0B0E',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#FFFFFF',
        zIndex: 5,
      }}
    >
      {/* ─── Embedded Hardware-Accelerated CSS Keyframes (Zero-Lag translate3d) ─── */}
      <style>{`
        @keyframes boardFloat1 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-6.5deg); }
          50% { transform: translate3d(0, -12px, 0) rotate(-5.5deg); }
        }
        @keyframes boardFloat2 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(2.2deg); }
          50% { transform: translate3d(0, 14px, 0) rotate(3.2deg); }
        }
        @keyframes boardFloat3 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(6.5deg); }
          50% { transform: translate3d(0, -14px, 0) rotate(5.4deg); }
        }
        @keyframes boardFloat4 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(3.8deg); }
          50% { transform: translate3d(0, -11px, 0) rotate(4.6deg); }
        }
        @keyframes boardFloat5 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-3.5deg); }
          50% { transform: translate3d(0, 13px, 0) rotate(-2.4deg); }
        }

        .card-anim-card-1 { animation: boardFloat1 5.4s cubic-bezier(0.45, 0, 0.55, 1) infinite; will-change: transform; }
        .card-anim-card-2 { animation: boardFloat2 6.8s cubic-bezier(0.45, 0, 0.55, 1) infinite 0.8s; will-change: transform; }
        .card-anim-card-3 { animation: boardFloat3 4.8s cubic-bezier(0.45, 0, 0.55, 1) infinite 1.4s; will-change: transform; }
        .card-anim-card-4 { animation: boardFloat4 5.9s cubic-bezier(0.45, 0, 0.55, 1) infinite 0.4s; will-change: transform; }
        .card-anim-card-5 { animation: boardFloat5 6.2s cubic-bezier(0.45, 0, 0.55, 1) infinite 1.1s; will-change: transform; }

        .corkboard-card:hover {
          z-index: 45 !important;
          box-shadow: 0 28px 60px -15px rgba(30, 107, 255, 0.5), 0 12px 24px -8px rgba(0,0,0,0.2) !important;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (min-width: 769px) {
          .corkboard-desktop-canvas { display: block !important; }
          .corkboard-mobile-reel    { display: none !important; }
        }
        @media (max-width: 768px) {
          .corkboard-desktop-canvas { display: none !important; }
          .corkboard-mobile-reel    { display: block !important; }
        }

        .corkboard-snap-rail::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* ─── Decorative SVG Doodles from Reference Image ─── */}
      {/* Top-Left Sketchy Music Notes */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: 'max(16px, 6%)',
          width: '74px',
          height: '74px',
          pointerEvents: 'none',
          opacity: 0.65,
          transform: 'rotate(-12deg)',
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 100 100" fill="rgba(255, 255, 255, 0.25)" style={{ width: '100%', height: '100%' }}>
          <path d="M28,68 C23,68 18,72 18,77 C18,82 23,86 28,86 C34,86 38,81 38,76 L38,34 L68,26 L68,66 C63,66 58,70 58,75 C58,80 63,84 68,84 C74,84 78,79 78,74 L78,16 C78,14 76,12 73,13 L33,23 C30,24 28,26 28,29 L28,68 Z" />
          <path d="M12,65 Q16,63 20,66" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Mid-Left Hand-Drawn Blue Lightning Bolt */}
      <div
        style={{
          position: 'absolute',
          top: '44%',
          left: 'max(12px, 4%)',
          width: '84px',
          height: '130px',
          pointerEvents: 'none',
          opacity: 0.75,
          transform: 'rotate(-6deg)',
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 100 150" fill="none" style={{ width: '100%', height: '100%' }}>
          <path
            d="M58,6 L22,70 L52,70 L34,142 L82,66 L52,66 L74,6 Z"
            fill="rgba(30, 107, 255, 0.18)"
            stroke="#1E6BFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path d="M14,64 L6,60 M78,110 L88,118" stroke="#1E6BFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ─── OUTER BORDER ARTISTIC ACCENTS (Framing Margins, Center Clean) ─── */}
      {/* Mid-Right Perimeter: Cyber Lime Lightning Bolt */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: 'max(14px, 2.5%)',
          width: '78px',
          height: '120px',
          pointerEvents: 'auto',
          zIndex: 2,
        }}
      >
        <Doodle_NeonLightningBolt
          color="#CCFF00"
          width={76}
          height={116}
          rotation={12}
        />
      </div>

      {/* Top-Right Far Border: Floating Vector Pen Nib */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: 'max(16px, 3.2%)',
          pointerEvents: 'auto',
          zIndex: 2,
        }}
      >
        <Doodle_VectorPenNib
          color="#00D2FF"
          accentColor="#9E7BFF"
          width={98}
          height={82}
          rotation={-10}
        />
      </div>

      {/* Top-Left Far Border: Floating Modernist Star */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: 'max(16px, 3.2%)',
          pointerEvents: 'auto',
          zIndex: 2,
        }}
      >
        <Doodle_ModernistStarCluster
          color="#FFDE00"
          size={48}
          rotation={8}
        />
      </div>

      {/* Bottom-Left Far Border: Fibonacci Golden Spiral */}
      <div
        style={{
          position: 'absolute',
          bottom: '18px',
          left: 'max(16px, 3.2%)',
          pointerEvents: 'auto',
          zIndex: 2,
        }}
      >
        <Doodle_FibonacciGoldenSpiral
          color="#F59E0B"
          size={110}
          rotation={-3}
        />
      </div>

      {/* Bottom-Right Far Border: Swiss Modernist Reticle */}
      <div
        style={{
          position: 'absolute',
          bottom: '18px',
          right: 'max(16px, 3.2%)',
          pointerEvents: 'auto',
          zIndex: 2,
        }}
      >
        <Doodle_SwissReticleCropMark
          color="#00E5C3"
          size={70}
          rotation={4}
        />
      </div>

      {/* Bottom-Left Lithograph Mountain Peak */}
      <div
        style={{
          position: 'absolute',
          bottom: '-12px',
          left: '-10px',
          width: '210px',
          height: '210px',
          pointerEvents: 'none',
          opacity: 0.22,
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" style={{ width: '100%', height: '100%', color: '#334155' }}>
          <path d="M10,190 L95,60 L130,115 L155,80 L200,190 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M10,190 L95,60 L130,115 L155,80 L200,190" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M95,60 Q85,110 50,190 M95,60 Q110,105 130,115 M155,80 Q165,130 180,190" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </div>

      {/* Bottom-Right Classical Statue Hand Pointing Upward */}
      <div
        style={{
          position: 'absolute',
          bottom: '-14px',
          right: 'max(20px, 8%)',
          width: '180px',
          height: '230px',
          pointerEvents: 'none',
          opacity: 0.75,
          transform: 'rotate(-10deg)',
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 200 260" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="corkMarbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <g filter="drop-shadow(0 6px 10px rgba(0,0,0,0.25))">
            <path d="M70,260 C75,220 70,185 85,160 C90,150 95,145 105,145 C115,145 125,160 130,180 C135,205 140,230 145,260 Z" fill="url(#corkMarbleGrad)" stroke="#1E293B" strokeWidth="2.5" />
            <path d="M100,145 L102,60 C102,48 116,48 118,60 L120,145 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />
            <path d="M103,80 C108,82 113,82 117,80 M102,108 C108,111 114,111 118,108" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M120,135 C132,130 140,140 135,155 C130,165 122,168 115,165" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* Top-Right Bold Ink Ribbon Stroke */}
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: '240px',
          height: '240px',
          pointerEvents: 'none',
          opacity: 0.15,
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 300 300" fill="none" style={{ width: '100%', height: '100%', color: '#1E293B' }}>
          <path d="M50,10 C140,-10 240,60 270,140 C300,220 220,290 130,280 C60,270 40,210 70,160 C90,130 140,120 180,140" stroke="currentColor" strokeWidth="32" strokeLinecap="round" />
        </svg>
      </div>

      {/* ─── Section Header (Exact Reference Typography) ─── */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 16px', marginBottom: '28px' }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          What I{' '}
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: 700,
              fontSize: '1.25em',
              color: '#00D2FF',
              display: 'inline-block',
              transform: 'rotate(-4deg)',
              margin: '0 6px',
            }}
          >
            Can
          </span>
          <br />
          <span>Help with:</span>
        </h2>

        {/* Playful curved underline */}
        <svg viewBox="0 0 240 14" fill="none" style={{ width: '180px', height: '12px', margin: '6px auto 0', color: 'rgba(0, 210, 255, 0.65)' }}>
          <path d="M4,10 Q120,2 236,8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        </svg>

        {/* Clean Contextual Subtitle */}
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            color: '#94A3B8',
            fontWeight: 500,
            maxWidth: '560px',
            margin: '12px auto 0',
            lineHeight: 1.5,
          }}
        >
          Click or drag any pinned capability card to inspect included deliverables, timelines, and production specs.
        </p>
      </div>

      {/* ─── Desktop Interactive Pinboard Canvas (Min-Width 769px) ─── */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="corkboard-desktop-canvas"
        style={{
          position: 'relative',
          maxWidth: '1120px',
          height: '790px',
          margin: '0 auto',
          touchAction: 'none',
        }}
      >
        {/* ─── Tactile Crimson Detective String Network (Vibrant & High-Contrast) ─── */}
        <svg
          viewBox="0 0 1120 790"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 16,
            overflow: 'visible',
          }}
          aria-hidden="true"
        >
          <defs>
            {/* Ambient Red Filament Glow Filter */}
            <filter id="corkThreadGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Soft Shadow Under Thread */}
            <filter id="corkThreadShadow" x="-15%" y="-15%" width="130%" height="140%">
              <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* Render All Dynamic Interconnecting Threads */}
          {CONNECTIONS.map((conn, idx) => {
            const pathData = getThreadPath(conn.from, conn.to, conn.sag);
            if (!pathData) return null;

            return (
              <g key={idx} className="corkboard-thread-strand">
                {/* 1. Deep Drop Shadow for tactile 3D elevation off the corkboard */}
                <path
                  d={pathData}
                  stroke="rgba(0, 0, 0, 0.72)"
                  strokeWidth="4.5"
                  fill="none"
                  strokeLinecap="round"
                  transform="translate(0, 3)"
                />

                {/* 2. Ambient Crimson Glow Aura */}
                <path
                  d={pathData}
                  stroke="#FF1744"
                  strokeWidth="5"
                  strokeOpacity="0.28"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#corkThreadGlow)"
                />

                {/* 3. Primary Vibrant Scarlet Red Twine Core */}
                <path
                  d={pathData}
                  stroke="#FF2453"
                  strokeWidth="2.8"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#corkThreadShadow)"
                />

                {/* 4. Core Specular Highlight for silky thread texture */}
                <path
                  d={pathData}
                  stroke="#FF6B8B"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* 5. Braided Fiber Weave Sheen Pattern */}
                <path
                  d={pathData}
                  stroke="#FFE4E8"
                  strokeWidth="0.85"
                  strokeDasharray="5 7"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </g>
            );
          })}

          {/* Pin Loop Eyelets at Card Pushpins */}
          {cards.map((c) => (
            <g key={`pin-eyelet-${c.id}`}>
              <circle
                cx={c.x}
                cy={c.y - c.height / 2 + 2}
                r="4.5"
                fill="#FF1744"
                stroke="#FFFFFF"
                strokeWidth="1.4"
                filter="url(#corkThreadGlow)"
              />
              <circle
                cx={c.x}
                cy={c.y - c.height / 2 + 2}
                r="1.8"
                fill="#1E293B"
              />
            </g>
          ))}
        </svg>

        {/* ─── The 5 Floating Blue Cards ─── */}
        {cards.map((card) => {
          const isBeingDragged = draggedCardId === card.id;

          return (
            <div
              key={card.id}
              onPointerDown={(e) => handlePointerDown(card.id, e)}
              className={`corkboard-card ${!isBeingDragged ? `card-anim-${card.id}` : ''}`}
              style={{
                position: 'absolute',
                left: `${card.x - card.width / 2}px`,
                top: `${card.y - card.height / 2}px`,
                width: `${card.width}px`,
                height: `${card.height}px`,
                transform: `rotate(${card.rotation}deg) scale(${isBeingDragged ? 1.05 : 1})`,
                zIndex: isBeingDragged ? 50 : 20,
                cursor: isBeingDragged ? 'grabbing' : 'grab',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                transition: isBeingDragged ? 'none' : 'box-shadow 0.2s ease, transform 0.15s ease-out',
              }}
            >
              {/* Blue Card Shell with Heavy Rounded Corners */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(145deg, #1E6BFF 0%, #1557D6 100%)',
                  borderRadius: '26px',
                  padding: '12px 12px 14px',
                  boxShadow: '0 20px 40px -15px rgba(30, 107, 255, 0.45), 0 10px 20px -8px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* 3D Blue Pushpin pinned at top-center */}
                <Pushpin />

                {/* Top Mini Pill Indicator */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                    padding: '0 2px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: '9px',
                      fontWeight: 800,
                      color: 'rgba(255, 255, 255, 0.85)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    CAPABILITY {card.number}
                  </span>
                  <span
                    style={{
                      fontSize: '8px',
                      fontFamily: "'Space Grotesk', monospace",
                      fontWeight: 800,
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                      padding: '2px 7px',
                      borderRadius: '999px',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    {card.turnaround}
                  </span>
                </div>

                {/* Inner Image Area Display */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 4.7',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0,0,0,0.06)',
                  }}
                >
                  <CardInnerArtwork type={card.type} />
                </div>

                {/* Bottom Card Footer with Title and Inspect Action */}
                <div style={{ marginTop: '8px', textAlign: 'center' }}>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontWeight: 800,
                      fontSize: '15.5px',
                      color: '#FFFFFF',
                      margin: '0 0 4px',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Tactile Click Pill */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '8.5px',
                      fontFamily: "'Space Grotesk', monospace",
                      fontWeight: 800,
                      color: 'rgba(255, 255, 255, 0.95)',
                      background: 'rgba(0, 0, 0, 0.18)',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    <span>Inspect Scope</span>
                    <span>↗</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Touch-Native Mobile Cork Reel (Max-Width 768px) ─── */}
      <div
        className="corkboard-mobile-reel"
        style={{
          display: 'none',
          position: 'relative',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Swipe Helper Banner */}
        <div style={{ textAlign: 'center', marginBottom: '16px', padding: '0 16px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(30, 107, 255, 0.08)',
              border: '1px solid rgba(30, 107, 255, 0.22)',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '11px',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 800,
              color: '#1E6BFF',
              letterSpacing: '0.04em',
            }}
          >
            <span>←</span>
            <span>SWIPE 5 CAPABILITIES • TAP TO INSPECT</span>
            <span>→</span>
          </div>
        </div>

        {/* Horizontal Snap Reel */}
        <div
          ref={mobileRailRef}
          onScroll={handleMobileScroll}
          className="corkboard-snap-rail"
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            padding: '24px 20px 24px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth',
          }}
        >
          {cards.map((card, idx) => {
            const tilts = [-2.2, 1.8, -1.6, 2, -1.8];
            const tilt = tilts[idx % tilts.length];
            return (
              <div
                key={card.id}
                style={{
                  scrollSnapAlign: 'center',
                  flex: '0 0 min(280px, 80vw)',
                  position: 'relative',
                  transform: `rotate(${tilt}deg)`,
                  transition: 'transform 0.25s ease',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  try { soundFX.playSnap(); } catch {}
                  setSelectedService(card);
                }}
              >
                {/* Blue Card Shell with Heavy Rounded Corners */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    background: 'linear-gradient(145deg, #1E6BFF 0%, #1557D6 100%)',
                    borderRadius: '24px',
                    padding: '12px 12px 14px',
                    boxShadow: '0 18px 36px -10px rgba(30, 107, 255, 0.45), 0 8px 18px rgba(0, 0, 0, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* 3D Blue Pushpin */}
                  <Pushpin />

                  {/* Top Mini Pill Indicator */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                      padding: '0 2px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: '9px',
                        fontWeight: 800,
                        color: 'rgba(255, 255, 255, 0.85)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      CAPABILITY {card.number}
                    </span>
                    <span
                      style={{
                        fontSize: '8px',
                        fontFamily: "'Space Grotesk', monospace",
                        fontWeight: 800,
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: '#FFFFFF',
                        padding: '2px 7px',
                        borderRadius: '999px',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                      }}
                    >
                      {card.turnaround}
                    </span>
                  </div>

                  {/* Inner Image Area Display */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4 / 4.7',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0,0,0,0.06)',
                    }}
                  >
                    <CardInnerArtwork type={card.type} />
                  </div>

                  {/* Bold White Title at Bottom */}
                  <div style={{ marginTop: '8px', textAlign: 'center' }}>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontWeight: 800,
                        fontSize: '15px',
                        color: '#FFFFFF',
                        margin: '0 0 4px',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                      }}
                    >
                      {card.title}
                    </h3>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '8px',
                        fontFamily: "'Space Grotesk', monospace",
                        fontWeight: 800,
                        color: 'rgba(255, 255, 255, 0.95)',
                        background: 'rgba(0, 0, 0, 0.18)',
                        padding: '2px 7px',
                        borderRadius: '999px',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                      }}
                    >
                      <span>Tap to Inspect Scope</span>
                      <span>↗</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reel Pagination Dots */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '12px',
          }}
        >
          {cards.map((card, i) => {
            const isActive = activeMobileIdx === i;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => scrollToCard(i)}
                aria-label={`View capability ${i + 1}`}
                style={{
                  width: isActive ? '22px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: isActive ? '#1E6BFF' : 'rgba(30, 107, 255, 0.22)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 0 8px rgba(30, 107, 255, 0.5)' : 'none',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ─── Deliverables & Scope Inspector Lightbox Modal ─── */}
      <DeliverablesModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
