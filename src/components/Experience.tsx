import React from 'react';
import { experiences } from '../data/resume';
import SectionHeading from './SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 py-16 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="02" title="Experience" />

        <ol className="relative border-l border-graphite/15 dark:border-void/15 ml-1">
          {experiences.map((exp, i) => (
            <li
              key={exp.id}
              data-reveal
              style={{ '--reveal-delay': `${(i % 2) * 90}ms` } as React.CSSProperties}
              className="relative pl-8 md:pl-12 pb-14 last:pb-0"
            >
              <span
                className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-[1.5px] border-amber-deep dark:border-amber-bright bg-concrete dark:bg-carbon"
                aria-hidden="true"
              />
              <div className="leader font-mono text-xs text-graphite/55 dark:text-ash mb-3">
                <span className="uppercase tracking-wide">{exp.period} &middot; {exp.duration}</span>
              </div>
              <div className="notch border border-graphite/12 dark:border-void/12 bg-graphite/[0.02] dark:bg-void/[0.03] p-6 md:p-8 hover:border-amber-deep/40 dark:hover:border-amber-bright/40 transition-colors duration-300">
                <h3 className="font-display font-bold uppercase text-xl md:text-2xl tracking-tight">{exp.role}</h3>
                <p className="font-mono text-xs uppercase tracking-wide text-graphite/55 dark:text-ash mt-1 mb-4">
                  {exp.company} — {exp.location}
                </p>
                <p className="font-sans text-graphite/75 dark:text-ash leading-relaxed max-w-3xl mb-4">
                  {exp.description}
                </p>
                <ul className="space-y-2 max-w-3xl">
                  {exp.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 text-sm font-sans leading-relaxed text-graphite/75 dark:text-ash">
                      <span className="text-amber-deep dark:text-amber-bright shrink-0" aria-hidden="true">
                        &rsaquo;
                      </span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
