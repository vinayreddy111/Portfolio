import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, Shield, Radio, Award, Terminal, ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  const { jumpToWaypoint, triggerSound } = useTheme();

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-auto"
    >
      {/* Top Status & Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Callsign Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-wider">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>CALLSIGN: {PERSONAL_INFO.callsign} // {PERSONAL_INFO.status}</span>
        </div>

        {/* Geolocation & Grid Status */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-slate-400 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>LOC: {PERSONAL_INFO.coords} ({PERSONAL_INFO.location})</span>
        </div>
      </div>

      {/* Main Title & Hero Messaging */}
      <div className="my-auto py-12 max-w-4xl">
        {/* Specialization Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-slate-300 font-mono text-xs"
        >
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>AUTONOMOUS SYSTEMS // UAV AVIONICS // ROBOTICS</span>
        </motion.div>

        {/* Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95]"
        >
          <span className="block">{PERSONAL_INFO.name.split(' ')[0]} {PERSONAL_INFO.name.split(' ')[1]}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
            {PERSONAL_INFO.name.split(' ').slice(2).join(' ')}
          </span>
        </motion.h1>

        {/* Subtitle / Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 font-display font-semibold text-lg sm:text-2xl text-cyan-300 tracking-wide"
        >
          {PERSONAL_INFO.title} — <span className="text-slate-300 font-normal">{PERSONAL_INFO.subtitle}</span>
        </motion.div>

        {/* Tagline Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed"
        >
          {PERSONAL_INFO.summary}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => jumpToWaypoint(1)}
            onMouseEnter={() => triggerSound('hover')}
            className="group relative px-6 py-3 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-display font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] flex items-center gap-2"
          >
            <span>DEPLOY MISSION // AERIAL OPS</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => jumpToWaypoint(5)}
            onMouseEnter={() => triggerSound('hover')}
            className="px-6 py-3 rounded bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-sm tracking-wider uppercase transition-all flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>TRANSMIT COMMS</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Telemetry Quick Stats & Scroll Prompt */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/10 bg-[#080a0f]/40 backdrop-blur-md rounded-xl p-4">
        {PERSONAL_INFO.stats.map((stat, i) => (
          <div key={`hero-stat-${i}`} className="p-3 rounded bg-white/[0.03] border border-white/5">
            <div className="font-display font-black text-xl sm:text-2xl text-cyan-400">
              {stat.value}
            </div>
            <div className="font-mono text-[11px] text-slate-300 font-semibold uppercase mt-0.5">
              {stat.label}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Deploy Indicator */}
      <div className="mt-8 flex flex-col items-center justify-center text-center">
        <button
          onClick={() => jumpToWaypoint(1)}
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">SCROLL TO DEPLOY 3D JOURNEY</span>
          <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
