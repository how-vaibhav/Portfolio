import React, { useRef, useEffect, useState } from 'react';
import DevNavbar from '../components/Dev/DevNavbar';
import DevHero from '../components/Dev/DevHero';
import DevFeaturedWork from '../components/Dev/DevFeaturedWork';
import DevToolsStack from '../components/Dev/DevToolsStack';
import DevExperience from '../components/Dev/DevExperience';
import DevTestimonials from '../components/Dev/DevTestimonials';
import DevContactCta from '../components/Dev/DevContactCta';
import '../components/Dev/dev.css';

/**
 * DevPage — Developer & CS Showcase Page.
 * Styled and structured to match the Dev/Pixel creative developer design.
 */
export default function DevPage() {
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="dev-page-container" style={{ position: 'relative' }}>
      {/* Top Fixed Navbar */}
      <DevNavbar />

      {/* Main Content — slides over the footer */}
      <main style={{ position: 'relative', zIndex: 10, background: '#080808' }}>
        <DevHero />
        <DevFeaturedWork />
        <DevToolsStack />
        <DevExperience />
        <DevTestimonials />
      </main>

      {/* Spacer for Fixed Footer Reveal - Also acts as the intersection trigger for the Navbar */}
      <div id="contact" style={{ height: `${footerHeight}px`, width: '100%', pointerEvents: 'none' }} />

      {/* Fixed Footer Reveal */}
      <div 
        ref={footerRef}
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          width: '100%', 
          zIndex: 0 
        }}
      >
        <DevContactCta />
      </div>
    </div>
  );
}
