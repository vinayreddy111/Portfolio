import React from 'react';
import { motion } from 'framer-motion';
import { WAYPOINTS } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { Crosshair, Compass, Navigation } from 'lucide-react';

export default function VerticalScrollHUD() {
  const { activeWaypointIndex, scrollProgress, jumpToWaypoint, triggerSound } = useTheme();

  // Calculated altitude & heading telemetry based on scroll progress
  const altitude = (12.4 + scrollProgress * 54.8).toFixed(1);
  const heading = Math.round((scrollProgress * 360) % 360).toString().padStart(3, '0');

  return (
    <aside className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-6 pointer-events-auto select-none">
      {/* Top Telemetry Heading */}
      <div className="flex flex-col items-center gap-1 font-mono text-[10px] text-slate-400 bg-[#080a0f]/80 backdrop-blur-md p-2 rounded border border-white/10">
        <div className="flex items-center gap-1 text-cyan-400 font-semibold">
          <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '10s' }} />
          <span>HDG {heading}°</span>
        </div>
        <div className="text-[9px] text-slate-400">
          ALT {altitude}M
        </div>
      </div>

      {/* Vertical Waypoint Track */}
      <div className="relative flex flex-col items-center gap-5 py-4">
        {/* Background Track Line */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />

        {/* Dynamic Progress Fill Line */}
        <motion.div
          className="absolute top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-lime-400 to-amber-400 rounded-full"
          style={{ height: `${Math.max(4, scrollProgress * 100)}%` }}
        />

        {/* Waypoint Stop Dots */}
        {WAYPOINTS.map((wp, i) => {
          const isActive = activeWaypointIndex === i;
          return (
            <div key={wp.id} className="relative group flex items-center">
              {/* Waypoint Dot Node */}
              <button
                onClick={() => jumpToWaypoint(i)}
                onMouseEnter={() => triggerSound('hover')}
                className={`relative z-10 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'w-6 h-6 bg-[#080a0f] border-2 border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.8)] scale-110'
                    : 'w-3.5 h-3.5 bg-[#0f172a] border border-white/30 text-transparent hover:border-cyan-400 hover:scale-125'
                }`}
                title={`Jump to ${wp.navLabel}`}
              >
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </button>

              {/* Hover / Active Tooltip Pill (Left Side) */}
              <div
                className={`absolute right-8 px-2.5 py-1 rounded bg-[#080a0f]/90 border text-[11px] font-mono whitespace-nowrap transition-all duration-200 pointer-events-none flex items-center gap-1.5 ${
                  isActive
                    ? 'opacity-100 translate-x-0 border-cyan-500/40 text-cyan-300'
                    : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 border-white/10 text-slate-400'
                }`}
              >
                <span className="text-[9px] opacity-60">{wp.code}</span>
                <span>{wp.navLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Mission Target Indicator */}
      <div className="font-mono text-[9px] text-slate-400 bg-[#080a0f]/80 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center gap-1">
        <Crosshair className="w-3 h-3 text-cyan-400" />
        <span>{Math.round(scrollProgress * 100)}%</span>
      </div>
    </aside>
  );
}
