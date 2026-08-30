import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Eye, EyeOff, Menu, X, Activity, Radio, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PERSONAL_INFO, WAYPOINTS } from '../data/portfolio';

export default function HeaderNav() {
  const {
    activeWaypointIndex,
    scrollProgress,
    jumpToWaypoint,
    isMuted,
    setIsMuted,
    reducedMotion,
    setReducedMotion,
    triggerSound,
  } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (!nextState) {
      triggerSound('click');
    }
  };

  const toggleMotion = () => {
    setReducedMotion(!reducedMotion);
    triggerSound('click');
  };

  const handleNavClick = (index) => {
    jumpToWaypoint(index);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080a0f]/85 backdrop-blur-md border-b border-white/10 transition-colors duration-500">
      {/* Dynamic Scroll Progress Bar Line (Top Edge) */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-lime-400 to-amber-400 transition-all duration-150 z-50"
        style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Callsign & Identity */}
        <button
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none cursor-pointer"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all">
            <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-display font-bold text-xs sm:text-sm tracking-wider text-white group-hover:text-cyan-400 transition-colors truncate max-w-[140px] sm:max-w-none">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.5 rounded bg-white/5 text-cyan-400 border border-cyan-500/20">
                {PERSONAL_INFO.callsign}
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>ONLINE</span>
              <span className="text-slate-600">//</span>
              <span className="text-slate-400 truncate max-w-[90px] sm:max-w-none">{WAYPOINTS[activeWaypointIndex].navLabel}</span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {WAYPOINTS.map((wp, i) => {
            const isActive = activeWaypointIndex === i;
            return (
              <button
                key={wp.id}
                onClick={() => handleNavClick(i)}
                onMouseEnter={() => triggerSound('hover')}
                className={`relative px-3 py-1.5 rounded font-mono text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/20 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] opacity-50">{wp.code.split('-')[1]}</span>
                  <span>{wp.navLabel}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* System Toggles & Mobile Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Enable Tactical Audio' : 'Mute Tactical Audio'}
            className={`p-1.5 sm:p-2 rounded border transition-all text-xs font-mono flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
              !isMuted
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400'
                : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span className="hidden md:inline text-[10px]">{!isMuted ? 'AUDIO: ON' : 'AUDIO: MUTED'}</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={toggleMotion}
            title={reducedMotion ? 'Enable 3D Camera Gliding' : 'Enable Reduced Motion / Performance Mode'}
            className={`p-1.5 sm:p-2 rounded border transition-all text-xs font-mono flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
              reducedMotion
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {reducedMotion ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span className="hidden md:inline text-[10px]">{reducedMotion ? 'MOTION: REDUCED' : '3D: FULL'}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-1.5 sm:p-2 rounded border border-white/15 bg-white/5 text-slate-200 hover:text-white cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-[#080a0f]/98 backdrop-blur-2xl px-4 py-4 max-h-[calc(100vh-60px)] overflow-y-auto"
          >
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-2 mb-2">
              NAVIGATION WAYPOINTS
            </div>
            <div className="flex flex-col gap-2">
              {WAYPOINTS.map((wp, i) => {
                const isActive = activeWaypointIndex === i;
                return (
                  <button
                    key={wp.id}
                    onClick={() => handleNavClick(i)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg font-mono text-xs sm:text-sm border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400 font-semibold'
                        : 'border-white/5 text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] opacity-60 font-mono px-1.5 py-0.5 rounded bg-white/5">{wp.code}</span>
                      <span>{wp.navLabel}</span>
                    </div>
                    {isActive ? (
                      <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
