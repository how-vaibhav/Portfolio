import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { soundFX } from '../components/Design/soundFX';

const ModeTransitionContext = createContext({
  isTransitioning: false,
  targetMode: null, // 'design' | 'dev'
  phase: 'idle', // 'idle' | 'covering' | 'revealing'
  transitionTo: () => {},
});

export function ModeTransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetMode, setTargetMode] = useState(null);
  const [phase, setPhase] = useState('idle');

  const transitionTo = useCallback((targetPath) => {
    // Prevent double invocation
    if (isTransitioning) return;

    const isEnteringDesign = targetPath === '/design';
    const currentIsDesign = location.pathname === '/design';

    // If already on the requested page, simply scroll to top
    if ((isEnteringDesign && currentIsDesign) || (!isEnteringDesign && !currentIsDesign)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const mode = isEnteringDesign ? 'design' : 'dev';
    setTargetMode(mode);
    setIsTransitioning(true);
    setPhase('covering');

    // Trigger audio haptics
    if (isEnteringDesign) {
      soundFX.playAperture();
    } else {
      soundFX.playWarp();
    }

    // Step 1: Let the cinematic shutter/curtain close completely over the viewport (~380ms)
    setTimeout(() => {
      // Step 2: Route change under cover
      navigate(targetPath);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setPhase('revealing');

      // Step 3: Let the shutter part open smoothly (~460ms)
      setTimeout(() => {
        setIsTransitioning(false);
        setPhase('idle');
        setTargetMode(null);
      }, 480);
    }, 420);
  }, [isTransitioning, location.pathname, navigate]);

  return (
    <ModeTransitionContext.Provider
      value={{
        isTransitioning,
        targetMode,
        phase,
        transitionTo,
      }}
    >
      {children}
    </ModeTransitionContext.Provider>
  );
}

export function useModeTransition() {
  const context = useContext(ModeTransitionContext);
  if (!context) {
    throw new Error('useModeTransition must be used within a ModeTransitionProvider');
  }
  return context;
}
