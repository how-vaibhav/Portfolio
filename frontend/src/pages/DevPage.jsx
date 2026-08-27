import React from 'react';
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
  return (
    <div className="dev-page-container">
      {/* Top Fixed Navbar */}
      <DevNavbar />

      {/* Hero Section */}
      <DevHero />

      {/* Featured Work Grid */}
      <DevFeaturedWork />

      {/* Tools & Stack Grid */}
      <DevToolsStack />

      {/* Experience Timeline */}
      <DevExperience />

      {/* Testimonials & Architectural Showcase */}
      <DevTestimonials />

      {/* Footer & Call To Action */}
      <DevContactCta />
    </div>
  );
}
