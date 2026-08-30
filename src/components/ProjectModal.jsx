import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { X, Shield, Activity, Cpu, CheckCircle, Trophy } from 'lucide-react';

export default function ProjectModal() {
  const { selectedProject, closeProjectModal, triggerSound } = useTheme();

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeProjectModal();
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, closeProjectModal]);

  if (!selectedProject) return null;

  const getZoneThemeBorder = () => {
    switch (selectedProject.zone) {
      case 'aerial': return 'border-lime-500/50 shadow-[0_0_30px_rgba(132,204,22,0.3)]';
      case 'ground': return 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)]';
      case 'signal': return 'border-emerald-500/50 shadow-[0_0_30px_rgba(0,255,102,0.3)]';
      default: return 'border-cyan-500/50 shadow-[0_0_30px_rgba(0,240,255,0.3)]';
    }
  };

  const getZoneBadgeColor = () => {
    switch (selectedProject.zone) {
      case 'aerial': return 'bg-lime-500/10 text-lime-400 border-lime-500/30';
      case 'ground': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'signal': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default: return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl">
        {/* Backdrop click dismiss */}
        <div
          className="absolute inset-0"
          onClick={closeProjectModal}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className={`relative z-10 w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto bg-[#0b0f17] border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 ${getZoneThemeBorder()} hud-card`}
        >
          {/* Top Bar Header */}
          <div className="flex items-start justify-between gap-3 pb-4 sm:pb-6 border-b border-white/10">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
                <span className={`font-mono text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded border uppercase tracking-wider ${getZoneBadgeColor()}`}>
                  {selectedProject.zoneTitle}
                </span>
                {selectedProject.badge && (
                  <span className="font-mono text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-white font-bold flex items-center gap-1">
                    {selectedProject.badge.includes('WINNER') && <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />}
                    <span className="truncate">{selectedProject.badge}</span>
                  </span>
                )}
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white leading-tight">
                {selectedProject.title}
              </h2>
              <div className="font-mono text-[11px] sm:text-xs md:text-sm text-slate-300 mt-0.5 sm:mt-1">
                {selectedProject.subtitle}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              onMouseEnter={() => triggerSound('hover')}
              aria-label="Close modal"
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Main Body Content */}
          <div className="py-4 sm:py-6 space-y-4 sm:space-y-6">
            
            {/* Overview Section */}
            <div>
              <h4 className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2 flex items-center gap-1.5 font-semibold">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                <span>SYSTEM ARCHITECTURE & OVERVIEW:</span>
              </h4>
              <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Operational Telemetry Metrics */}
            {selectedProject.telemetry && (
              <div className="bg-black/50 p-3 sm:p-4 rounded-xl border border-white/10">
                <h4 className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-1.5 font-semibold">
                  <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                  <span>MEASURED OPERATIONAL TELEMETRY:</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {Object.entries(selectedProject.telemetry).map(([key, value]) => (
                    <div key={key} className="p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/5 font-mono">
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider truncate">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="text-xs sm:text-sm text-white font-bold mt-0.5 truncate">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Engineering Highlights */}
            <div>
              <h4 className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-1.5 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>TECHNICAL HIGHLIGHTS & DELIVERABLES:</span>
              </h4>
              <div className="space-y-1.5 sm:space-y-2">
                {selectedProject.highlights.map((highlight, i) => (
                  <div
                    key={`modal-high-${i}`}
                    className="p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/5 text-xs sm:text-sm text-slate-200 flex items-start gap-2"
                  >
                    <span className="text-cyan-400 font-bold font-mono shrink-0">[{i + 1}]</span>
                    <span className={highlight.includes('9 National') ? 'text-amber-300 font-semibold' : ''}>
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Modules */}
            <div>
              <h4 className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-1.5 font-semibold">
                <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                <span>INTEGRATED PROTOCOLS & HARDWARE STACK:</span>
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedProject.techStack.map((tech, i) => (
                  <span
                    key={`modal-tech-${i}`}
                    className="font-mono text-[10px] sm:text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Controls */}
          <div className="pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] sm:text-xs text-slate-400 truncate">
              SYS ID: {selectedProject.id} // VERIFIED
            </span>

            <button
              onClick={closeProjectModal}
              onMouseEnter={() => triggerSound('hover')}
              className="px-4 sm:px-5 py-2 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-all cursor-pointer shrink-0"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
