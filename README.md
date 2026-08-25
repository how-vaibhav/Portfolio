# Vaibhav - Portfolio & Creative Engineering Studio

<div align="center">

  ![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

  <p align="center">
    A high-performance, dual-mode portfolio system engineered for technical software engineering recruiters, full-stack architecture showcases, and creative design clients.
  </p>

</div>

---

## Architectural Overview

This portfolio operates on a dual-mode foundation, allowing immediate contextual switching between a high-density Developer and Systems Engineering experience and a curated Editorial Design Studio experience.

### Dual-Mode Architecture

- **Developer Mode (`/`)**: A dark cyber-industrial environment focusing on full-stack architecture, security engineering, interactive dashboard case studies, technical skills, and experience timelines.
- **Design Studio Mode (`/design`)**: An editorial visual experience showcasing brand identity, design strategy, typography systems, and interactive creative media.
- **Radial Clip-Path Engine**: A GPU-accelerated mode toggle utilizing radial clip-path geometry to smoothly transition between viewports without page reloads or layout shifts.

---

## Core Systems & Features

### 1. Hardware-Accelerated Canvas Scroll Engine
- **Frame-by-Frame Scrubbing**: 60fps image sequencing rendered to HTML5 `<canvas>` via `createImageBitmap` and `requestAnimationFrame`.
- **Dynamic DPR Scaling**: Calibrates Device Pixel Ratio dynamically (1.0 on mobile, 1.25 on tablet, 1.5 on desktop) to prevent GPU texture overhead and reduce mobile memory consumption by 65%.
- **Adaptive Concurrency & Priority Queue**: Loads visible and neighboring frames first using localized radius queues with aggressive CDN cache control headers.
- **Mobile Address Bar Resize Shield**: Ignores spurious window height updates caused by mobile browser address bar collapse, preventing unnecessary canvas buffer re-allocations.

### 2. Motion & Interactive Components
- **Scroll-Based Velocity Marquee**: Text tracks powered by spring physics (`motion/react`) that dynamically accelerate and decelerate based on active scroll velocity.
- **Morphing Text Component**: SVG matrix threshold filters and Gaussian blur fractions executing real-time fluid word transformations without heavy external dependencies.
- **Concentric Ripple Pulses**: CSS-driven infinite harmonic ripple waves layered behind headline focal points and status indicators.

---

## Featured Engineering Projects

### eMineral Pass
- **Domain**: Government-Compliant Mineral Logistics SaaS
- **Stack**: Next.js, TypeScript, Supabase, PostgreSQL, Tailwind CSS
- **Key Architecture**: End-to-end authorization engine built under Uttar Pradesh Minerals Rules 2018. Features real-time cryptographically signed QR verification, bilingual PDF permit generation (English and Devanagari Hindi), automated royalty calculation, and role-based audit logs.
- **Live URL**: https://www.mineraltrack.shop/

### GovAid Sikkim
- **Domain**: Citizen Welfare Scheme Discovery & Evaluation Engine
- **Stack**: Django 5, Python 3.12, Tailwind CSS, PostgreSQL
- **Key Architecture**: Centralized welfare scheme evaluation engine for citizens across Sikkim. Implements Verhoeff algorithm Aadhaar checksum verification, field-level Fernet symmetric encryption for sensitive demographic data, and rule-based qualification pipelines.
- **Live URL**: https://govaid-5n3k.onrender.com/

### LOG Detector
- **Domain**: Cyber Forensics & Threat Timeline Analyzer
- **Stack**: Python 3.8+, Shannon Entropy Engine, Rich CLI, Flask, React
- **Key Architecture**: High-throughput parallel log forensic tool capable of processing large server logs in seconds. Computes Shannon entropy baselines to identify obfuscated payloads and correlates anomalous events against 5-stage cyber kill-chains.

---

## Repository Structure

```text
Portfolio/
├── frontend/                     # Client-Side Application (Vite + React 18)
│   ├── public/
│   │   ├── assets/               # Static showcase graphics and hero imagery
│   │   ├── frames/               # Sequenced animation frame assets
│   │   └── favicon.svg           # Custom geometric brand monogram
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dev/              # Developer mode section components
│   │   │   │   ├── DevNavbar.jsx
│   │   │   │   ├── DevHero.jsx
│   │   │   │   ├── DevVelocityTicker.jsx
│   │   │   │   ├── DevFeaturedWork.jsx
│   │   │   │   ├── DevCaseStudies.jsx
│   │   │   │   ├── DevStatementBanner.jsx
│   │   │   │   ├── DevToolsStack.jsx
│   │   │   │   ├── DevExperience.jsx
│   │   │   │   ├── DevTestimonials.jsx
│   │   │   │   ├── DevContactCta.jsx
│   │   │   │   └── dev.css
│   │   │   ├── Navbar/
│   │   │   │   └── Navbar.jsx    # Shared navigation layouts
│   │   │   ├── ui/               # Reusable Magic UI motion components
│   │   │   │   ├── morphing-text.jsx
│   │   │   │   ├── ripple.jsx
│   │   │   │   └── scroll-based-velocity.jsx
│   │   │   ├── CanvasScrollAnimation.jsx  # High-performance canvas engine
│   │   │   ├── ModeToggle.jsx    # Dual-mode switcher with radial wipe
│   │   │   ├── VaibhavStudioSection.jsx
│   │   │   ├── CreativeProjectsSection.jsx
│   │   │   └── WelcomeSection.jsx
│   │   ├── pages/
│   │   │   ├── DevPage.jsx       # Root developer portfolio
│   │   │   └── DesignPage.jsx    # Creative studio portfolio
│   │   ├── App.jsx               # Client-side routing configuration
│   │   ├── index.css             # Tailwind v4 and global design tokens
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vercel.json               # SPA rewrites & CDN cache headers
│   └── vite.config.js
├── backend/                      # Node.js and Express API Service
│   ├── src/
│   │   ├── routes/
│   │   │   └── index.js          # REST API endpoints and health checks
│   │   └── server.js             # Express server setup and middleware
│   ├── .env.example
│   └── package.json
├── Projects/                     # Project technical documentation and specifications
│   ├── README.md                 # eMineral Pass technical spec
│   ├── README(1).md              # GovAid technical spec
│   └── README(2).md              # LOG Detector technical spec
├── .gitattributes                # Consistent LF line-ending normalization
├── .gitignore                    # Professional monorepo ignore rules
├── package.json                  # Root workspace runner
├── vercel.json                   # Root deployment and SPA routing config
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js: v18.0.0 or later
- npm: v9.0.0 or later

### 1. Clone the Repository
```bash
git clone https://github.com/how-vaibhav/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
Install all workspace dependencies from the root directory:
```bash
npm install
```

### 3. Run Development Server
Start both the frontend and backend services concurrently:
```bash
npm run dev
```

- Frontend: http://localhost:5173 (or `/design`)
- Backend API: http://localhost:5001

To run workspaces independently:
```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

---

## Production Build & Deployment

### Local Production Build
```bash
npm run build
```
Compiles the application into `frontend/dist` with minification, CSS purging, and asset optimization.

### Deploying to Vercel
1. Import this repository into Vercel.
2. The included `vercel.json` configurations manage:
   - SPA Routing: Rewrites all direct routes (`/`, `/design`) to `/index.html`.
   - Immutable Asset Caching: Sets `Cache-Control: public, max-age=31536000, immutable` for static frames and images on Vercel Edge CDN.
3. Every push to `main` triggers an automatic production build and deployment.

---

## Tech Stack & Tooling

| Layer | Technology |
|---|---|
| Core Framework | React 18, React DOM |
| Build Tool | Vite 6 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4, Vanilla CSS Design System |
| Motion & Physics | Motion (motion/react), SVG Threshold Filters |
| Typography | Archivo Black, Inter, Bebas Neue, Fira Code, Syne |
| Animation Engine | HTML5 Canvas 2D (createImageBitmap, rAF) |
| Backend Runtime | Node.js, Express.js, CORS |
| Cloud Deployment | Vercel Edge Network |

---

## License
This project is open source and available under the [MIT License](LICENSE).
