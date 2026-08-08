import React from 'react';
import { professionalSummary, professionalSummary2, stats } from '../data/resume';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 py-16 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="01" title="About" />

        <div className="grid md:grid-cols-12 gap-10">
          <div data-reveal className="md:col-span-7">
            <p className="font-sans text-lg leading-relaxed mb-5">{professionalSummary}</p>
            <p className="font-sans text-graphite/70 dark:text-ash leading-relaxed">
              {professionalSummary2}
            </p>
          </div>

          <div data-reveal className="md:col-span-5 content-start border-t border-graphite/12 dark:border-void/12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 font-mono text-xs text-graphite/60 dark:text-ash border-b border-graphite/12 dark:border-void/12 py-4"
              >
                <span className="w-1.5 h-1.5 rounded-full border-[1.5px] border-current shrink-0" aria-hidden="true" />
                <span className="uppercase tracking-wide shrink-0">{stat.label}</span>
                <span className="flex-1 border-t border-current opacity-30 min-w-4" aria-hidden="true" />
                <span className="text-amber-deep dark:text-amber-bright text-sm shrink-0">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
