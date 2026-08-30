import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { Trophy, Zap, Compass, Plane, ShieldCheck, ArrowRight, Activity, Crosshair } from 'lucide-react';

export default function AerialOpsSection() {
  const { openProjectModal, triggerSound } = useTheme();

  const aerialProjects = PROJECTS.filter((p) => p.zone === 'aerial');

  return (
    <section
      id="aerial"
      className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-auto"
    >
      {/* Zone Header Banner */}
      <div className="mb-12 border-l-4 border-lime-500 pl-4 sm:pl-6 bg-lime-950/20 py-4 rounded-r-xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-lime-400 uppercase tracking-widest">
          <Crosshair className="w-4 h-4 animate-spin text-lime-400" style={{ animationDuration: '8s' }} />
          <span>ZONE 01 // AERIAL OPERATIONS // FLIGHT AVIONICS</span>
        </div>
        <h2 className="mt-1 font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          AERIAL OPS <span className="text-lime-400 font-light">& AVIONICS</span>
        </h2>
        <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-3xl">
          High-G FPV racing quadcopters, dual-mode VTOL hybrid transition logic, and aerodynamic fixed-wing flight controllers engineered for maximum agility and mission reliability.
        </p>
      </div>

      {/* 3 Project Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {aerialProjects.map((project, index) => {
          const isFlagship = project.id === 'fpv-drone-development';

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`hud-card hud-military rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-lime-400/50 hover:shadow-[0_0_25px_rgba(132,204,22,0.2)] ${
                isFlagship ? 'ring-1 ring-lime-500/40 bg-lime-950/30' : ''
              }`}
            >
              <div>
                {/* Top Badge & Code */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] text-lime-400/70 tracking-widest">
                    SYS.AER-0{index + 1}
                  </span>

                  {isFlagship ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 font-mono text-[10px] font-bold tracking-wider animate-pulse">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>{project.badge}</span>
                    </div>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-lime-500/10 border border-lime-500/30 text-lime-300 font-mono text-[10px]">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-lime-300 transition-colors">
                  {project.title}
                </h3>
                <div className="font-mono text-xs text-lime-400/90 mt-1 mb-3">
                  {project.subtitle}
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Key Bullet Highlights */}
                <div className="space-y-2 mb-6 bg-black/40 p-3.5 rounded-lg border border-lime-500/20">
                  <div className="text-[10px] font-mono text-lime-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Activity className="w-3 h-3" />
                    <span>OPERATIONAL HIGHLIGHTS:</span>
                  </div>
                  <ul className="space-y-1.5">
                    {project.highlights.map((highlight, hIndex) => (
                      <li
                        key={`high-${project.id}-${hIndex}`}
                        className="text-[11px] sm:text-xs text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-lime-400 font-bold">›</span>
                        <span className={highlight.includes('9 National') ? 'text-amber-300 font-semibold' : ''}>
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech, tIndex) => (
                    <span
                      key={`tech-${project.id}-${tIndex}`}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-500/10 text-lime-300 border border-lime-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Quick Telemetry & Action Trigger */}
              <div className="pt-4 border-t border-lime-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  {project.telemetry && (
                    <>
                      <span>LATENCY: <strong className="text-lime-400">{project.telemetry.latency || 'NOMINAL'}</strong></span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => openProjectModal(project)}
                  onMouseEnter={() => triggerSound('hover')}
                  className="px-3 py-1.5 rounded bg-lime-500/20 hover:bg-lime-500 text-lime-300 hover:text-black border border-lime-500/40 text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>INSPECT HUD</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
