import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, Activity, Layers } from 'lucide-react';

export default function GroundOpsSection() {
  const { openProjectModal, triggerSound } = useTheme();

  const groundProjects = PROJECTS.filter((p) => p.zone === 'ground');

  return (
    <section
      id="ground"
      className="relative min-h-screen w-full py-16 sm:py-24 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-auto"
    >
      {/* Zone Header Banner with Industrial Hazard Accents */}
      <div className="mb-8 sm:mb-12 border-l-4 border-amber-500 pl-3.5 sm:pl-6 bg-amber-950/20 py-3.5 sm:py-4 rounded-r-xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          <span>ZONE 02 // GROUND OPERATIONS // ROBOTIC KINEMATICS</span>
        </div>
        <h2 className="mt-1 font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
          GROUND OPS <span className="text-amber-400 font-light">& KINEMATICS</span>
        </h2>
        <p className="mt-1.5 sm:mt-2 text-slate-300 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed">
          Autonomous mobile platforms with 360° LiDAR SLAM perception, 18-DOF biomimetic spider gait planning, and precision 6-axis articulated manipulators.
        </p>
      </div>

      {/* 3 Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {groundProjects.map((project, index) => {
          const isFlagship = project.id === 'autonomous-rover-lidar';

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`hud-card hud-hazard rounded-xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] ${
                isFlagship ? 'ring-1 ring-amber-500/40 bg-amber-950/30' : ''
              }`}
            >
              <div>
                {/* Top Badge & Code */}
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <span className="font-mono text-[9px] sm:text-[10px] text-amber-400/70 tracking-widest">
                    SYS.GND-0{index + 1}
                  </span>

                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[9px] sm:text-[10px] font-semibold truncate">
                    {project.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {project.title}
                </h3>
                <div className="font-mono text-[11px] sm:text-xs text-amber-400/90 mt-1 mb-2.5 sm:mb-3">
                  {project.subtitle}
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Bullet Highlights */}
                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 bg-black/40 p-3 sm:p-3.5 rounded-lg border border-amber-500/20">
                  <div className="text-[9px] sm:text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    <span>MECHANICAL & ALGORITHMIC HIGHLIGHTS:</span>
                  </div>
                  <ul className="space-y-1 sm:space-y-1.5">
                    {project.highlights.map((highlight, hIndex) => (
                      <li
                        key={`high-${project.id}-${hIndex}`}
                        className="text-[11px] sm:text-xs text-slate-300 flex items-start gap-1.5"
                      >
                        <span className="text-amber-400 font-bold">›</span>
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
                      className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 sm:pt-4 border-t border-amber-500/20 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-400 truncate">
                  {project.telemetry && (
                    <span>COMPUTE: <strong className="text-amber-400">{project.telemetry.compute || project.telemetry.axes || 'ACTIVE'}</strong></span>
                  )}
                </div>

                <button
                  onClick={() => openProjectModal(project)}
                  onMouseEnter={() => triggerSound('hover')}
                  className="px-2.5 sm:px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 text-[11px] sm:text-xs font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer shrink-0"
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
