import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS_DATA, EDUCATION_DATA, LANGUAGES_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { GraduationCap, Code2, Globe2, Layers } from 'lucide-react';

export default function SkillsAndEducationSection() {
  const { triggerSound } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const categories = ['ALL', ...SKILLS_DATA.map((s) => s.category)];

  const filteredSkills = selectedCategory === 'ALL'
    ? SKILLS_DATA.flatMap((cat) => cat.skills.map((skill) => ({ ...skill, category: cat.category, color: cat.color })))
    : SKILLS_DATA.find((c) => c.category === selectedCategory)?.skills.map((skill) => ({
        ...skill,
        category: selectedCategory,
        color: SKILLS_DATA.find((c) => c.category === selectedCategory).color,
      })) || [];

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full py-16 sm:py-24 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-auto"
    >
      {/* Zone Header Banner with Blueprint Grid Accents */}
      <div className="mb-8 sm:mb-12 border-l-4 border-sky-400 pl-3.5 sm:pl-6 bg-sky-950/20 py-3.5 sm:py-4 rounded-r-xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-sky-400 uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
          <span>ZONE 04 // TECH CORES & ACADEMIC DOSSIER</span>
        </div>
        <h2 className="mt-1 font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
          SKILLS MATRIX <span className="text-sky-400 font-light">& EDUCATION</span>
        </h2>
        <p className="mt-1.5 sm:mt-2 text-slate-300 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed">
          Comprehensive repository of avionics firmware, mathematical kinematic models, embedded hardware protocols, CAD solid modeling, and academic background.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        
        {/* 1. INTERACTIVE SKILLS MATRIX (7 COLS) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 font-display font-bold text-base sm:text-lg text-white">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
                <span>TECHNICAL CAPABILITIES</span>
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30">
                {filteredSkills.length} ACTIVE
              </span>
            </div>

            {/* Category Filter Tabs (Horizontal Scrollable on Mobile) */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      triggerSound('click');
                    }}
                    onMouseEnter={() => triggerSound('hover')}
                    className={`px-2.5 sm:px-3 py-1.5 rounded font-mono text-[11px] sm:text-xs tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-sky-500 text-black font-bold shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Interactive Skills Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3"
            >
              <AnimatePresence>
                {filteredSkills.map((skill) => {
                  return (
                    <motion.div
                      layout
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => {
                        setHoveredSkill(skill);
                        triggerSound('hover');
                      }}
                      onClick={() => {
                        setHoveredSkill(skill);
                        triggerSound('click');
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="hud-card p-3 sm:p-3.5 rounded-lg border border-white/10 hover:border-sky-400/50 hover:bg-sky-950/20 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-display font-semibold text-xs sm:text-sm text-white group-hover:text-sky-300 transition-colors">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
                          {skill.tag}
                        </span>
                      </div>

                      <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-2 leading-tight">
                        {skill.desc}
                      </p>

                      <div className="mt-2 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Bottom Skill Inspector Banner */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-sky-950/40 border border-sky-500/30 font-mono text-[11px] sm:text-xs flex items-center justify-between gap-3"
            >
              <div>
                <span className="text-sky-400 font-bold uppercase tracking-wider">TELEMETRY: </span>
                <span className="text-white font-semibold">{hoveredSkill.name}</span>
                <p className="text-slate-300 text-[10px] sm:text-[11px] mt-0.5">{hoveredSkill.desc}</p>
              </div>
              <div className="text-right whitespace-nowrap">
                <span className="text-sky-400 font-display font-bold text-base sm:text-lg">{hoveredSkill.level}%</span>
                <span className="block text-[8px] sm:text-[9px] text-slate-400">PROFICIENCY</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* 2. EDUCATION TIMELINE & LANGUAGES (5 COLS) */}
        <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
          
          {/* Education Timeline */}
          <div className="hud-card p-4 sm:p-6 lg:p-7 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-4 sm:mb-6 font-display font-bold text-base sm:text-lg text-white">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
              <span>ACADEMIC DOSSIER</span>
            </div>

            <div className="space-y-5 sm:space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-[9px] sm:before:left-[11px] before:w-[2px] before:bg-sky-500/30">
              {EDUCATION_DATA.map((edu, index) => (
                <div key={`edu-${index}`} className="relative pl-6 sm:pl-7 group">
                  <div className="absolute left-0 top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#080a0f] border-2 border-sky-400 flex items-center justify-center text-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="font-display font-bold text-xs sm:text-sm md:text-base text-white group-hover:text-sky-300 transition-colors">
                      {edu.degree}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 font-semibold">
                      {edu.duration}
                    </span>
                  </div>

                  <div className="font-mono text-[11px] sm:text-xs text-sky-400 mt-0.5">
                    {edu.institution} <span className="text-slate-400">({edu.location})</span>
                  </div>

                  <div className="inline-block font-mono text-[9px] sm:text-[10px] text-slate-300 px-2 py-0.5 rounded bg-white/5 border border-white/10 mt-1.5">
                    {edu.status}
                  </div>

                  <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                    {edu.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Spoken */}
          <div className="hud-card p-4 sm:p-6 lg:p-7 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 font-display font-bold text-base sm:text-lg text-white">
              <Globe2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
              <span>NATURAL LANGUAGES</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {LANGUAGES_DATA.map((lang, index) => (
                <div
                  key={`lang-${index}`}
                  className="p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/10 text-center"
                >
                  <div className="font-display font-bold text-xs sm:text-base text-white truncate">
                    {lang.name}
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-sky-400 mt-0.5 truncate">
                    {lang.type}
                  </div>
                  <div className="mt-1.5 sm:mt-2 w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-400 h-full rounded-full"
                      style={{ width: `${lang.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
