import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams, useLocation } from 'react-router-dom';
import { ModeTransitionProvider } from './context/ModeTransitionContext';
import ModeTransitionOverlay from './components/Transitions/ModeTransitionOverlay';

// ── Route-Based Code Splitting: Lazy-load route pages on-demand ──
const DevPage = lazy(() => import('./pages/DevPage'));
const DesignPage = lazy(() => import('./pages/DesignPage'));
const DesignUnderWorkPage = lazy(() => import('./pages/DesignUnderWorkPage'));

/**
 * DesignRouteController:
 * - Completed graphic design studio mode is live at /design and /design/studio.
 * - Optional override: /design/wip or ?wip=true renders DesignUnderWorkPage.
 */
function DesignRouteController() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const forceWip = searchParams.get('wip') === 'true' || location.pathname === '/design/wip';

  if (forceWip) {
    return <DesignUnderWorkPage />;
  }

  // Design studio is complete and live
  return <DesignPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ModeTransitionProvider>
        <ModeTransitionOverlay />
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#080808' }} />}>
          <Routes>
            <Route path="/" element={<DevPage />} />
            <Route path="/design" element={<DesignRouteController />} />
            <Route path="/design/studio" element={<DesignPage />} />
            <Route path="/design/wip" element={<DesignUnderWorkPage />} />
          </Routes>
        </Suspense>
      </ModeTransitionProvider>
    </BrowserRouter>
  );
}
