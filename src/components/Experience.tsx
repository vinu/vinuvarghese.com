import React from 'react';
import { Briefcase } from 'lucide-react';
import { experiences } from '../data/resume';

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-12 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Experience
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-12" />

        {/* Desktop timeline */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px timeline-line -translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative mb-16 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30 z-10" />

              <div className={`flex items-start gap-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="flex-1" />
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:border-blue-500/20 transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                      <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-0.5 rounded-full text-xs font-medium">
                        {exp.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-3">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{exp.company}</span>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <span>{exp.period}</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 mt-1.5 shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden relative pl-6 border-l-2 border-blue-500/30 ml-2">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative mb-12 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30" />

              <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                  <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {exp.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-3">
                  <Briefcase className="w-3 h-3" />
                  <span>{exp.company}</span>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <span>{exp.period}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{exp.description}</p>
                <ul className="space-y-1.5">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="w-1 h-1 rounded-full bg-blue-500/60 mt-1.5 shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider max-w-4xl mx-auto mt-12 md:mt-24" />
    </section>
  );
}
