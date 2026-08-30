import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import SceneCanvas from './three/SceneCanvas';
import HeaderNav from './components/HeaderNav';
import VerticalScrollHUD from './components/VerticalScrollHUD';
import HeroSection from './components/HeroSection';
import AerialOpsSection from './components/AerialOpsSection';
import GroundOpsSection from './components/GroundOpsSection';
import SignalOpsSection from './components/SignalOpsSection';
import SkillsAndEducationSection from './components/SkillsAndEducationSection';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';
import { WAYPOINTS } from './data/portfolio';

function PortfolioApp() {
  const {
    scrollProgress,
    setScrollProgress,
    activeWaypointIndex,
    setActiveWaypointIndex,
    reducedMotion,
  } = useTheme();

  // Scroll listener that measures page scroll progress (0 to 1) and active zone
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
      setScrollProgress(progress);

      // Determine active waypoint index based on element positions or scroll progress
      const waypointElements = WAYPOINTS.map((wp) => document.getElementById(wp.id));
      const viewportCenter = window.scrollY + window.innerHeight * 0.4;

      let currentIndex = 0;
      for (let i = 0; i < waypointElements.length; i++) {
        const el = waypointElements[i];
        if (el) {
          const top = el.offsetTop;
          if (viewportCenter >= top) {
            currentIndex = i;
          }
        }
      }

      setActiveWaypointIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress, setActiveWaypointIndex]);

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#080a0f] selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans">
      
      {/* 1. Persistent 3D Three.js Full-Viewport Background Canvas */}
      <SceneCanvas
        scrollProgress={scrollProgress}
        activeWaypointIndex={activeWaypointIndex}
        reducedMotion={reducedMotion}
      />

      {/* 2. Top Tactical Sticky Navigation HUD */}
      <HeaderNav />

      {/* 3. Right Vertical Scroll & Waypoint Telemetry Rail */}
      <VerticalScrollHUD />

      {/* 4. DOM Content Sections (One per Waypoint) */}
      <main className="relative z-10 flex flex-col gap-12 sm:gap-24">
        <HeroSection />
        <AerialOpsSection />
        <GroundOpsSection />
        <SignalOpsSection />
        <SkillsAndEducationSection />
        <ContactSection />
      </main>

      {/* 5. Project Deep-Dive Modal Overlay */}
      <ProjectModal />

      {/* 6. Subtle CRT Scanline / Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 crt-overlay opacity-30" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
