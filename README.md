# Vaibhav — Personal Portfolio & Creative Studio

<div align="center">

  ![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

  <p align="center">
    A high-performance, dual-mode portfolio website engineered for both technical computer science recruiters and high-end creative design clients.
  </p>

</div>

---

## 🌟 Key Features

### 🔀 Dual-Mode Architecture
- **`</> Dev Mode` (`/`)**: A clean, distraction-free environment tailored for technical recruiters, software engineering showcases, and computer science projects.
- **`✦ Design Mode` (`/design`)**: An editorial-grade creative studio experience showcasing brand identity, design strategy, and interactive case studies.
- **Radial Clip-Path Transition**: A GPU-accelerated cinematic reveal transition that smoothly switches between modes without full page reloads.

### ⚡ Ultra-Optimized Canvas Scroll Engine
- **Hardware-Accelerated Scrubbing**: Frame-by-frame scroll animation rendered to HTML5 `<canvas>` via `createImageBitmap` and `requestAnimationFrame`.
- **Dynamic DPR & Mobile Scaling**: Automatically calibrates Device Pixel Ratio (`1.0` on mobile, `1.25` on tablet, `1.5` on desktop) to eliminate GPU texture thrashing and reduce mobile memory overhead by ~65%.
- **Adaptive Concurrency & Priority Queue**: Loads visible and nearby frames first using a localized radius queue with intelligent CDN caching headers.
- **Mobile Address Bar Shield**: Filters out viewport height fluctuations caused by collapsing mobile address bars to prevent canvas buffer re-allocations.

---

## 📁 Repository Structure

```text
Portfolio/
├── frontend/                     # Client-Side Application (Vite + React 18)
│   ├── public/
│   │   ├── assets/               # Static showcase assets & imagery
│   │   ├── frames/               # Sequenced animation frame assets
│   │   └── favicon.svg           # Custom geometric monogram brand icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   │   └── Navbar.jsx    # Responsive navigation headers
│   │   │   ├── AboutSection.jsx
│   │   │   ├── CanvasScrollAnimation.jsx  # High-performance canvas engine
│   │   │   ├── ContactScaleSection.jsx
│   │   │   ├── EducationSection.jsx
│   │   │   ├── IntroductionSection.jsx
│   │   │   ├── ModeToggle.jsx    # Dual-mode switcher with radial wipe
│   │   │   ├── VaibhavStudioSection.jsx
│   │   │   └── WelcomeSection.jsx
│   │   ├── pages/
│   │   │   ├── DevPage.jsx       # Root developer portfolio
│   │   │   └── DesignPage.jsx    # Creative studio portfolio
│   │   ├── App.jsx               # Client-side routing (react-router-dom)
│   │   ├── index.css             # Tailwind v4 & global typography
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vercel.json               # SPA rewrites & CDN cache headers
│   └── vite.config.js
├── backend/                      # Node.js + Express API Service
│   ├── src/
│   │   ├── routes/
│   │   │   └── index.js          # REST API endpoints & health checks
│   │   └── server.js             # Express server setup & middleware
│   ├── .env.example
│   └── package.json
├── .gitattributes                # Consistent LF line-ending normalization
├── .gitignore                    # Professional monorepo ignore rules
├── package.json                  # Monorepo workspaces runner
├── vercel.json                   # Root deployment & SPA routing configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or later
- **npm**: `v9.0.0` or later

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

* **Frontend**: [http://localhost:5173](http://localhost:5173) (or `/design`)
* **Backend API**: `http://localhost:5001`

To run individual workspaces:
```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

---

## 🛠️ Production Build & Deployment

### Local Production Build
```bash
npm run build
```
This builds the client bundle into `frontend/dist` with minification, CSS purging, and gzip optimization.

### Deploying to Vercel
1. Import this repository into **[Vercel](https://vercel.com)**.
2. The included [`vercel.json`](./vercel.json) automatically manages:
   - **SPA Routing**: Rewrites all direct routes (`/design`, etc.) to `/index.html`.
   - **Immutable Asset Caching**: Sets `Cache-Control: public, max-age=31536000, immutable` for static frames and assets on Vercel's global Edge CDN.
3. Every `git push` to `main` triggers an automatic zero-downtime production deployment.

---

## 🎨 Tech Stack & Tooling

| Layer | Technology |
|---|---|
| **Core Framework** | React 18, React DOM |
| **Build Tool** | Vite 6 |
| **Routing** | React Router v7 |
| **Styling** | Tailwind CSS v4, Vanilla CSS |
| **Typography** | Inter, Bebas Neue, Fira Code, Syne |
| **Animation Engine** | HTML5 Canvas 2D (`createImageBitmap`, `rAF`) |
| **Backend API** | Node.js, Express.js, CORS |
| **Deployment** | Vercel Edge Network |

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
