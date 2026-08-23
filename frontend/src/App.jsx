import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DevPage from './pages/DevPage';
import DesignPage from './pages/DesignPage';

/**
 * App — sets up client-side routing.
 *
 * Routes:
 *   /         → DevPage   (CS/developer portfolio — default root)
 *   /design   → DesignPage (personal brand / designer mode)
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DevPage />} />
        <Route path="/design" element={<DesignPage />} />
      </Routes>
    </BrowserRouter>
  );
}
