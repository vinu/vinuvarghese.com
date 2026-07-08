import React from 'react';
import { experiences } from '../data/resume';
import SectionHeading from './SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-16 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="02" title="Experience" />

        <ol className="relative border-l border-ink/10 dark:border-white/10 ml-1">
          {experiences.map((exp) => (
            <li key={exp.id} className="relative pl-8 md:pl-12 pb-14 last:pb-0">
              <span
                className="absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 bg-copper dark:bg-copper-bright"
                aria-hidden="true"
              />
              <p className="font-mono text-xs text-copper dark:text-copper-bright mb-3">
                {exp.period} · {exp.duration}
              </p>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">{exp.role}</h3>
              <p className="font-mono text-sm text-stone-500 dark:text-stone-400 mt-1 mb-4">
                {exp.company} — {exp.location}
              </p>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed max-w-3xl mb-4">
                {exp.description}
              </p>
              <ul className="space-y-2 max-w-3xl">
                {exp.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    <span className="text-copper dark:text-copper-bright shrink-0" aria-hidden="true">
                      ▸
                    </span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
