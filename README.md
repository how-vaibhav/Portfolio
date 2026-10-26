<div align="center">

```text
  ██╗  ██╗ ██████╗ ██╗    ██╗██╗   ██╗ █████╗ ██╗██████╗ ██╗  ██╗ █████╗ ██╗   ██╗
  ██║  ██║██╔═══██╗██║    ██║██║   ██║██╔══██╗██║██╔══██╗██║  ██║██╔══██╗██║   ██║
  ███████║██║   ██║██║ █╗ ██║██║   ██║███████║██║██████╔╝███████║███████║██║   ██║
  ██╔══██║██║   ██║██║███╗██║╚██╗ ██╔╝██╔══██║██║██╔══██╗██╔══██║██╔══██║╚██╗ ██╔╝
  ██║  ██║╚██████╔╝╚███╔███╔╝ ╚████╔╝ ██║  ██║██║██████╔╝██║  ██║██║  ██║ ╚████╔╝ 
  ╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝   ╚═══╝  ╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  
```

### ✦ TECH × GRAPHIC BRAND ATELIER ✦

<p align="center">
  <strong>An experimental, studio-grade portfolio exploring the intersection of systems engineering, optical typography, tactile interaction, and procedural Web Audio.</strong>
</p>

<p align="center">
  <a href="https://www.howvaibhav.in"><strong>Explore Live Deployment ↗</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Dual--Mode-Dev_%E2%9A%A1_%C3%97_Design_%F0%9F%8E%A8-1E6BFF?style=for-the-badge&logoColor=white" alt="Dual Mode" />
  <img src="https://img.shields.io/badge/Vite-6.2.0-CCFF00?style=for-the-badge&logo=vite&logoColor=black" alt="Vite 6" />
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Audio-Web_Audio_API-FF6B00?style=for-the-badge" alt="Web Audio API" />
  <img src="https://img.shields.io/badge/Build_Speed-4.2s-brightgreen?style=for-the-badge" alt="Build Speed" />
  <img src="https://img.shields.io/badge/License-MIT-white?style=for-the-badge" alt="License" />
</p>

</div>

---

##  The Dual-World Architecture

This portfolio operates as two completely distinct, interconnected experiential dimensions built on a shared reactive routing spine:

| Experience Dimension | Route | Aesthetic Persona | Core Technologies & Highlights |
| :--- | :--- | :--- | :--- |
| **Developer Mode** | `/` | Cyber-Industrial, Obsidian & Neon Lime (`#CCFF00`) | Pixel Image Grid Reveal, Dual-Direction Marquee, Fixed Bottom Reveal Footer, 30+ DevTools Stack, Spring Physics |
| **Design Mode** | `/design` | Warm Parchment (`#FAF8F5`) & Electric Cobalt (`#1E6BFF`) | The Anatomy of HowVaibhav, 3D Conveyor Deck, Filing Cabinet Desk, Interactive Capabilities Corkboard, Deliverables Lightbox |

Seamless, cinematic cross-mode navigation is orchestrated by `ModeTransitionContext` and the hardware-accelerated `ModeTransitionOverlay` with zero layout flicker.

---

##  Design Mode Deep Dive (`/design`)

### 1. The Anatomy of HowVaibhav (Interactive Typography Hero)
An homage to Swiss editorial specimen posters and anatomical typography guides:
- **7-Letter Acrostic Taxonomy:** Each letterform reveals an editorial craft principle whose title spelling organically starts with that exact letter:
  - **`H`** — *Hierarchy & Height*
  - **`O`** — *Optical Balance & Orbit*
  - **`W`** — *Weight & White Space*
  - **`V`** — *Vector Craft & Volume*
  - **`A`** — *Architecture & Apex*
  - **`I`** — *Identity & Ink Precision*
  - **`B`** — *Baseline & Bold Stems*
- **Precision Laser Coordinate Guides:** Vector connection lines anchor dynamically to letter stems and naturally flow into hovering capability cards without crossing paths.
- **60fps 3D Mouse Parallax Tilt:** Real-time gyro and mouse cursor tracking with hardware-accelerated `perspective(1000px) rotateX() rotateY()` and a dynamic holographic specular glare overlay.

### 2. Dual-View Project Archive (3D Conveyor & Filing Desk)
- **3D Isometric Conveyor (`3D Mode`):** Draggable, momentum-scrolling deck featuring 3D layered dossier folders (`Folder3DConveyor.jsx`) rendered with elevation shadows and tactile mouse feedback.
- **Filing Cabinet Desk View (`Grid Mode`):** Tactile Manila folders with embossed stamps, color-coded sticker tags, and real-time category filtering (`Brand Identity`, `Editorial`, `Systems`, `Merch`).
- **Interactive Dossier Modal:** Clicking any folder opens an executive case study lightbox with full scope breakdowns, color swatches, typography ladders, and live preview links.

### 3. Anti-Gravity Services Corkboard (`What I Can Help with:`)
- **Physics-Inspired Draggable Cards:** 5 capability cards floating in a coordinated pinboard canvas with smooth continuous hover float keyframes (`translate3d`).
- **Dynamic Vector Cords:** Pure SVG connecting ropes dynamically recompute quadratic bezier curves (`Q midX midY`) in real-time as pins are dragged across the board.
- **Interactive Deliverables & Scope Inspector:** Clicking or tapping any card opens a studio-grade modal displaying:
  - Turnaround time badge (e.g. `1–2 Weeks`)
  - Volume scope spec (`6 Master Modules`)
  - Ideal client fit statement
  - Master deliverables checklist with custom verified checkmarks (`✓`)
  - Direct email inquiry action (`mailto:...`) pre-populated with project specifications.
- **Mobile Touch-Native Reel:** Smooth horizontal snap rail (`scroll-snap-type: x mandatory`) with active index pagination dots and tactile sound integration.

---

## Procedural Web Audio Engine (`soundFX.js`)

Unlike portfolios relying on bulky `.mp3` or `.wav` audio files that lag behind interactions, this project synthesizes sound **procedurally in real time** via the Web Audio API:
- **Zero Network Overhead:** 0 KB audio assets downloaded.
- **Zero Latency:** Instant mechanical feedback triggered on pointer down / hover / modal events.
- **Sound Palette:**
  - `playHover()`: Micro high-frequency tick for cursor sweeps.
  - `playSnap()`: Satisfying mechanical click for card drops and modal launches.
  - `playAperture()`: Shutter click for photo and dossier views.
  - `playPop()`: Soft bubble pop for closing lightboxes.
  - `playWarp()`: Resonant low-pass cyber sweep for switching between Dev and Design modes.

---

## Repository Structure

The monorepo has been thoroughly audited and stripped of dead weight, reducing production build times from **17.7s down to 4.2s**:

```text
Portfolio/
├── frontend/                          # Client-Side Application (Vite 6 + React 18)
│   ├── public/
│   │   ├── assets/
│   │   │   ├── vaibhav-hero-cutout.png         # Developer hero cutout subject
│   │   │   ├── footer-banner.png               # Dev footer ambient texture
│   │   │   ├── project-govaid-screenshot.png   # Case study asset: GovAid Portal
│   │   │   ├── project-loaniq-screenshot.png   # Case study asset: LoanIQ Platform
│   │   │   ├── project-emineral-screenshot.png # Case study asset: eMineral Pass
│   │   │   └── project-logdetector-screenshot.png
│   │   ├── favicon.svg                         # Monogram brand favicon
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── Design/                         # Design Mode Studio Showcase
│   │   │   │   ├── DesignAnatomy.jsx           # 7-Letter acrostic anatomy hero & 3D tilt
│   │   │   │   ├── Folder3DConveyor.jsx        # 3D isometric folder carousel deck
│   │   │   │   ├── FolderDeskGrid.jsx          # Manila filing cabinet desk grid
│   │   │   │   ├── FolderModal.jsx             # Case study inspection dossier
│   │   │   │   ├── DesignPlayground.jsx        # Typography & color experiment lab
│   │   │   │   ├── ServicesCorkboard.jsx       # Capabilities corkboard & scope modal
│   │   │   │   ├── designData.js               # Project metadata & asset manifests
│   │   │   │   ├── soundFX.js                  # Web Audio API procedural synthesizer
│   │   │   │   └── design.css                  # Design tokens, washi tape & keyframes
│   │   │   ├── Dev/                            # Developer Mode Showcase
│   │   │   │   ├── DevHero.jsx                 # Pixel reveal hero & status badge
│   │   │   │   ├── DevNavbar.jsx               # Floating glass header with active pill
│   │   │   │   ├── DevFeaturedWork.jsx         # Full-stack case studies with tags
│   │   │   │   ├── DevToolsStack.jsx           # Dual-direction infinite marquee
│   │   │   │   ├── DevExperience.jsx           # Engineering career timeline
│   │   │   │   ├── DevTestimonials.jsx         # Verified recommendations
│   │   │   │   ├── DevContactCta.jsx           # Fixed footer reveal contact section
│   │   │   │   ├── useResponsive.js            # Breakpoint tracking hook
│   │   │   │   └── dev.css                     # Dark cyber tokens & layout rules
│   │   │   ├── Navbar/
│   │   │   │   └── Navbar.jsx                  # Mode-agnostic navigation shell
│   │   │   ├── Transitions/
│   │   │   │   └── ModeTransitionOverlay.jsx   # Radial wipe transition overlay
│   │   │   ├── ui/                             # Core UI Primitives
│   │   │   │   ├── MorphingText.jsx            # SVG filter text morph
│   │   │   │   ├── marquee.jsx                 # GPU-accelerated infinite marquee
│   │   │   │   └── pixel-image.jsx             # Canvas pixel grid reveal
│   │   │   └── ModeToggle.jsx                  # Cyber mode switcher trigger
│   │   ├── context/
│   │   │   └── ModeTransitionContext.jsx       # Shared mode state & sound triggers
│   │   ├── lib/
│   │   │   └── utils.js                        # Tailwind merge & clsx utility
│   │   ├── pages/
│   │   │   ├── DevPage.jsx                     # Route: / (Software Engineering)
│   │   │   └── DesignPage.jsx                  # Route: /design (Brand Atelier)
│   │   ├── App.jsx                             # Client routing configuration
│   │   ├── index.css                           # Core font definitions & reset
│   │   └── main.jsx
│   ├── index.html                              # Preconnect links, meta tags, fonts
│   ├── package.json
│   └── vite.config.js
├── backend/                           # Node.js / Express API Service
│   ├── src/
│   │   ├── routes/index.js                     # REST endpoints & health check
│   │   └── server.js                           # Express middleware setup
│   └── package.json
├── package.json                               # Workspace scripts runner
├── vercel.json                                # Edge headers, caching & rewrites
└── README.md
```

---

##  Quick Start

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

### Installation
```bash
git clone https://github.com/how-vaibhav/Portfolio.git
cd Portfolio
npm install
```

### Running Locally
To launch both frontend and backend concurrently:
```bash
npm run dev
```

| Service | Local Endpoint | Description |
| :--- | :--- | :--- |
| **Developer Mode** | `http://localhost:5173/` | CS & Software Engineering Portfolio |
| **Design Mode** | `http://localhost:5173/design` | Brand Identity & Typography Atelier |
| **Backend API** | `http://localhost:5001/` | Express REST Service |

To launch services independently:
```bash
npm run dev:frontend   # Frontend only (Vite)
npm run dev:backend    # Backend only (Node/Express)
```

### Production Build
```bash
npm run build
```
Generates a minified production build in `frontend/dist/` in **~4.2 seconds**.

---

##  Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, React DOM |
| **Build & Bundler** | Vite 6 |
| **Routing** | React Router v7 |
| **Styling & Tokens** | Custom CSS Custom Properties, Tailwind CSS v4 |
| **Motion & Physics** | Hardware-accelerated CSS Keyframes, Motion (`motion/react`) |
| **Sound Engine** | Web Audio API (Zero external MP3 dependencies) |
| **Typography** | Space Grotesk, Plus Jakarta Sans, Caveat, Inter, JetBrains Mono, Syne |
| **Backend** | Node.js, Express.js |
| **Hosting & CDN** | Vercel Edge Network |

---

## License

Crafted with dedication by **Vaibhav Tiwari** ([@how-vaibhav](https://github.com/how-vaibhav)).  
Released under the [MIT License](LICENSE).
