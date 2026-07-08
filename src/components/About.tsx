import React from 'react';
import { professionalSummary, professionalSummary2, stats } from '../data/resume';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-16 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="01" title="About" />

        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="text-lg leading-relaxed mb-5">{professionalSummary}</p>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              {professionalSummary2}
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-x-8 gap-y-10 content-start">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t-2 border-copper dark:border-copper-bright pt-4">
                <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
                <div className="font-mono text-xs text-stone-500 dark:text-stone-400 mt-2 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
