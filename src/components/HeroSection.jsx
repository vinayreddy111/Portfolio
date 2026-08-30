import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, Shield, Radio, Terminal, ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  const { jumpToWaypoint, triggerSound } = useTheme();

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-12 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-auto"
    >
      {/* Top Status & Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
        {/* Callsign Chip */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] sm:text-xs tracking-wider">
          <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
          <span>CALLSIGN: {PERSONAL_INFO.callsign} // {PERSONAL_INFO.status}</span>
        </div>

        {/* Geolocation & Grid Status */}
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-slate-400 bg-black/40 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded border border-white/10">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="truncate max-w-[200px] sm:max-w-none">LOC: {PERSONAL_INFO.location}</span>
        </div>
      </div>

      {/* Main Title & Hero Messaging */}
      <div className="my-auto py-8 sm:py-12 max-w-4xl">
        {/* Specialization Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/15 text-slate-300 font-mono text-[10px] sm:text-xs"
        >
          <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
          <span className="truncate">AUTONOMOUS SYSTEMS // UAV // ROBOTICS</span>
        </motion.div>

        {/* Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[1.0] sm:leading-[0.95]"
        >
          <span className="block">{PERSONAL_INFO.name.split(' ')[0]} {PERSONAL_INFO.name.split(' ')[1]}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
            {PERSONAL_INFO.name.split(' ').slice(2).join(' ')}
          </span>
        </motion.h1>

        {/* Subtitle / Role */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 sm:mt-6 font-display font-semibold text-base sm:text-xl md:text-2xl text-cyan-300 tracking-wide"
        >
          {PERSONAL_INFO.title} — <span className="text-slate-300 font-normal">{PERSONAL_INFO.subtitle}</span>
        </motion.div>

        {/* Tagline Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed"
        >
          {PERSONAL_INFO.summary}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <button
            onClick={() => jumpToWaypoint(1)}
            onMouseEnter={() => triggerSound('hover')}
            className="group relative px-5 sm:px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>DEPLOY MISSION // AERIAL OPS</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => jumpToWaypoint(5)}
            onMouseEnter={() => triggerSound('hover')}
            className="px-5 sm:px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>TRANSMIT COMMS</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Telemetry Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 bg-[#080a0f]/40 backdrop-blur-md rounded-xl p-3 sm:p-4">
        {PERSONAL_INFO.stats.map((stat, i) => (
          <div key={`hero-stat-${i}`} className="p-2.5 sm:p-3 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="font-display font-black text-lg sm:text-2xl text-cyan-400">
              {stat.value}
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] text-slate-300 font-semibold uppercase mt-0.5 truncate">
              {stat.label}
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 truncate">
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Deploy Indicator */}
      <div className="mt-4 sm:mt-8 flex flex-col items-center justify-center text-center">
        <button
          onClick={() => jumpToWaypoint(1)}
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase">SCROLL TO DEPLOY 3D JOURNEY</span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
