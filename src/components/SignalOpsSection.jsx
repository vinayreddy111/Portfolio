import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { Terminal, Activity, ArrowRight, Signal } from 'lucide-react';

export default function SignalOpsSection() {
  const { openProjectModal, triggerSound } = useTheme();

  const signalProjects = PROJECTS.filter((p) => p.zone === 'signal');

  return (
    <section
      id="signal"
      className="relative min-h-screen w-full py-16 sm:py-24 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-auto"
    >
      {/* Zone Header Banner with Terminal Style */}
      <div className="mb-8 sm:mb-12 border-l-4 border-emerald-500 pl-3.5 sm:pl-6 bg-emerald-950/20 py-3.5 sm:py-4 rounded-r-xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-emerald-400 uppercase tracking-widest">
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
          <span>ZONE 03 // SIGNAL OPERATIONS // RF TELEMETRY & NLP</span>
        </div>
        <h2 className="mt-1 font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
          SIGNAL OPS <span className="text-emerald-400 font-light">& EMBEDDED COMMS</span>
        </h2>
        <p className="mt-1.5 sm:mt-2 text-slate-300 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed">
          Multi-band RF interference analysis across 915MHz/2.4GHz/5.8GHz channels, embedded edge voice intent recognition, and optoisolated IoT actuation meshes.
        </p>
      </div>

      {/* 2 Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        {signalProjects.map((project, index) => {
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="hud-card hud-terminal rounded-xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(0,255,102,0.2)] glitch-hover"
            >
              <div>
                {/* Top Terminal Bar */}
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-emerald-500/20 font-mono text-[10px] sm:text-[11px]">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 truncate">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="truncate">root@kvr-node:~# ./{project.id}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[9px] sm:text-[10px] shrink-0">
                    {project.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {project.title}
                </h3>
                <div className="font-mono text-[11px] sm:text-xs text-emerald-400/90 mt-1 mb-2.5 sm:mb-3 flex items-center gap-1.5">
                  <Signal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{project.subtitle}</span>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-mono">
                  {project.description}
                </p>

                {/* Key Bullet Highlights */}
                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 bg-black/60 p-3 sm:p-3.5 rounded-lg border border-emerald-500/25 font-mono">
                  <div className="text-[9px] sm:text-[10px] text-emerald-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    <span>STDOUT DIAGNOSTIC TRACE:</span>
                  </div>
                  <ul className="space-y-1 sm:space-y-1.5">
                    {project.highlights.map((highlight, hIndex) => (
                      <li
                        key={`high-${project.id}-${hIndex}`}
                        className="text-[11px] sm:text-xs text-slate-300 flex items-start gap-1.5"
                      >
                        <span className="text-emerald-400 font-bold">$</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4 sm:mb-6">
                  {project.techStack.map((tech, tIndex) => (
                    <span
                      key={`tech-${project.id}-${tIndex}`}
                      className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 sm:pt-4 border-t border-emerald-500/20 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-400 truncate">
                  {project.telemetry && (
                    <span>LINK: <strong className="text-emerald-400">{project.telemetry.statusCheck || project.telemetry.analyzedBands || 'ONLINE'}</strong></span>
                  )}
                </div>

                <button
                  onClick={() => openProjectModal(project)}
                  onMouseEnter={() => triggerSound('hover')}
                  className="px-2.5 sm:px-3 py-1.5 rounded bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black border border-emerald-500/40 text-[11px] sm:text-xs font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>INSPECT HUD</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
