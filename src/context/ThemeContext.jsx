import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WAYPOINTS } from '../data/portfolio';
import { playSound } from '../utils/audio';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [activeWaypointIndex, setActiveWaypointIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Default muted to respect browser autoplay policies
  const [reducedMotion, setReducedMotion] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Active theme based on current waypoint
  const currentWaypoint = WAYPOINTS[activeWaypointIndex] || WAYPOINTS[0];
  const activeZone = currentWaypoint.id;
  const currentTheme = currentWaypoint.theme;

  // Update CSS custom properties when theme changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary', currentTheme.primary);
      root.style.setProperty('--theme-secondary', currentTheme.secondary);
      root.style.setProperty('--theme-accent', currentTheme.accent);
      root.style.setProperty('--theme-glow', currentTheme.glow);
      root.style.setProperty('--theme-bg', currentTheme.bg);
      root.style.setProperty('--theme-grid', currentTheme.gridColor);
    }
  }, [currentTheme]);

  // Jump to specific waypoint
  const jumpToWaypoint = useCallback((index) => {
    if (index < 0 || index >= WAYPOINTS.length) return;
    setActiveWaypointIndex(index);
    const calculatedProgress = index / (WAYPOINTS.length - 1);
    setTargetProgress(calculatedProgress);
    playSound('transition', isMuted);

    // Also scroll the window / document smoothly to the target zone
    const targetElement = document.getElementById(WAYPOINTS[index].id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isMuted]);

  const openProjectModal = useCallback((project) => {
    setSelectedProject(project);
    playSound('modal', isMuted);
  }, [isMuted]);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
    playSound('click', isMuted);
  }, [isMuted]);

  const triggerSound = useCallback((type) => {
    playSound(type, isMuted);
  }, [isMuted]);

  return (
    <ThemeContext.Provider
      value={{
        activeWaypointIndex,
        setActiveWaypointIndex,
        activeZone,
        currentWaypoint,
        currentTheme,
        scrollProgress,
        setScrollProgress,
        targetProgress,
        setTargetProgress,
        jumpToWaypoint,
        isMuted,
        setIsMuted,
        reducedMotion,
        setReducedMotion,
        selectedProject,
        openProjectModal,
        closeProjectModal,
        triggerSound,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
