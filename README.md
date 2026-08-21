# Smooth Scroll Animation Project

A modern full-stack application featuring a silky-smooth scroll-driven canvas frame animation powered by React 18, Tailwind CSS v4, Vite, and an Express.js backend.

## Project Structure

```
Images/
├── frontend/                     # React + Vite + Tailwind CSS v4
│   ├── public/
│   │   └── frames/               # 300 animation frame image assets
│   ├── src/
│   │   ├── components/
│   │   │   └── CanvasScrollAnimation.jsx # Smooth canvas scroll component
│   │   ├── App.jsx               # Main React entry component
│   │   ├── main.jsx              # React DOM mounting
│   │   └── index.css             # Tailwind v4 import & scrollbar styling
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/                      # Node.js + Express REST API
│   ├── src/
│   │   ├── routes/
│   │   │   └── index.js          # API route definitions
│   │   └── server.js             # Express server & middleware
│   ├── .env.example
│   └── package.json
├── package.json                  # Root runner script
└── README.md
```

## Quick Start

### 1. Install Dependencies

Install all dependencies in root, frontend, and backend:

```bash
npm run install:all
```

Or install individually:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Run the Application

To run both Frontend and Backend concurrently:

```bash
npm run dev
```

Or run separately:

```bash
# Start Frontend only (http://localhost:5173)
npm run dev:frontend

# Start Backend only (http://localhost:5000)
npm run dev:backend
```
