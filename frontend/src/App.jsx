import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DevPage from './pages/DevPage';
import DesignPage from './pages/DesignPage';
import { ModeTransitionProvider } from './context/ModeTransitionContext';
import ModeTransitionOverlay from './components/Transitions/ModeTransitionOverlay';

/**
 * App — sets up client-side routing with high-quality cinematic mode transitions.
 *
 * Routes:
 *   /         → DevPage   (CS/developer portfolio — default root)
 *   /design   → DesignPage (graphic design / designer mode)
 */
export default function App() {
  return (
    <BrowserRouter>
      <ModeTransitionProvider>
        <ModeTransitionOverlay />
        <Routes>
          <Route path="/" element={<DevPage />} />
          <Route path="/design" element={<DesignPage />} />
        </Routes>
      </ModeTransitionProvider>
    </BrowserRouter>
  );
}
