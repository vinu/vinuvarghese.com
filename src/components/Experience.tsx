import React from 'react';
import { experiences } from '../data/resume';
import PageHeader from './PageHeader';

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader pageNum="300" title="Work" />

        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              data-reveal
              style={{ '--reveal-delay': `${(i % 2) * 90}ms` } as React.CSSProperties}
              className="tt-frame"
            >
              <div className="flex items-baseline justify-between bg-blue px-5 py-2">
                <span className="font-mono text-white text-lg">ITEM {301 + i}</span>
                <span className="font-mono text-white text-lg">{exp.period}</span>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-mono text-2xl md:text-3xl leading-tight">{exp.role}</h3>
                <p className="font-mono text-lg text-ink/75 dark:text-white/75 mt-1 mb-4">
                  {exp.company} — {exp.location} · {exp.duration}
                </p>
                <p className="font-mono text-lg leading-relaxed mb-4 max-w-3xl">{exp.description}</p>
                <ul className="space-y-1.5 max-w-3xl">
                  {exp.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 font-mono text-base leading-relaxed">
                      <span className="text-ink dark:text-cyan shrink-0" aria-hidden="true">
                        &gt;
                      </span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
