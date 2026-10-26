import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DevPage from './pages/DevPage';
import DesignPage from './pages/DesignPage';
import DesignUnderWorkPage from './pages/DesignUnderWorkPage';
import { ModeTransitionProvider } from './context/ModeTransitionContext';
import ModeTransitionOverlay from './components/Transitions/ModeTransitionOverlay';

/**
 * App — sets up client-side routing with high-quality cinematic mode transitions.
 *
 * Routes:
 *   /              → DevPage (CS/developer portfolio — default root)
 *   /design        → DesignUnderWorkPage (creative brand laboratory crafting in progress)
 *   /design/studio → DesignPage (live active graphic design monograph workspace & archive)
 */
export default function App() {
  return (
    <BrowserRouter>
      <ModeTransitionProvider>
        <ModeTransitionOverlay />
        <Routes>
          <Route path="/" element={<DevPage />} />
          <Route path="/design" element={<DesignUnderWorkPage />} />
          <Route path="/design/studio" element={<DesignPage />} />
        </Routes>
      </ModeTransitionProvider>
    </BrowserRouter>
  );
}
