import React from 'react';
import { BrowserRouter, Routes, Route, useSearchParams, useLocation } from 'react-router-dom';
import DevPage from './pages/DevPage';
import DesignPage from './pages/DesignPage';
import DesignUnderWorkPage from './pages/DesignUnderWorkPage';
import { ModeTransitionProvider } from './context/ModeTransitionContext';
import ModeTransitionOverlay from './components/Transitions/ModeTransitionOverlay';

/**
 * DesignRouteController:
 * - Localhost / Local Dev (npm run dev): Renders full DesignPage so you can build and test locally.
 * - Deployed Project (Production): Renders DesignUnderWorkPage to inform visitors the creative studio is crafting.
 * - Overrides:
 *     /design/studio or ?studio=true → always renders DesignPage
 *     /design/wip or ?wip=true → always renders DesignUnderWorkPage
 */
function DesignRouteController() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const isLocalhost = Boolean(
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
     window.location.hostname === '127.0.0.1' ||
     window.location.hostname === '[::1]' ||
     import.meta.env.DEV)
  );

  const forceWip = searchParams.get('wip') === 'true' || location.pathname === '/design/wip';
  const forceStudio = searchParams.get('studio') === 'true' || location.pathname === '/design/studio';

  if (forceWip) {
    return <DesignUnderWorkPage />;
  }

  if (isLocalhost || forceStudio) {
    return <DesignPage />;
  }

  // Deployed project visitors see the Under Work page
  return <DesignUnderWorkPage />;
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
