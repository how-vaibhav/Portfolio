import React from 'react';
import { BrowserRouter, Routes, Route, useSearchParams, useLocation } from 'react-router-dom';
import DevPage from './pages/DevPage';
import DesignPage from './pages/DesignPage';
import DesignUnderWorkPage from './pages/DesignUnderWorkPage';
import { ModeTransitionProvider } from './context/ModeTransitionContext';
import ModeTransitionOverlay from './components/Transitions/ModeTransitionOverlay';

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
        <Routes>
          <Route path="/" element={<DevPage />} />
          <Route path="/design" element={<DesignRouteController />} />
          <Route path="/design/studio" element={<DesignPage />} />
          <Route path="/design/wip" element={<DesignUnderWorkPage />} />
        </Routes>
      </ModeTransitionProvider>
    </BrowserRouter>
  );
}
