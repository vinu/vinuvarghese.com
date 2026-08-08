import React from 'react';
import { professionalSummary, professionalSummary2, stats } from '../data/resume';
import PageHeader from './PageHeader';

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader pageNum="200" title="About" />

        <div className="grid md:grid-cols-12 gap-8">
          <div data-reveal className="md:col-span-7 tt-frame p-6 md:p-8">
            <p className="font-mono text-xl leading-relaxed mb-4">{professionalSummary}</p>
            <p className="font-mono text-lg leading-relaxed text-ink/75 dark:text-white/75">
              {professionalSummary2}
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 divide-x-2 divide-y-2 divide-ink/20 dark:divide-white/20 tt-frame">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
                className="bg-paper dark:bg-black p-5"
              >
                <div className="font-mono text-3xl text-ink dark:text-green leading-none">{stat.value}</div>
                <div className="font-mono text-sm uppercase tracking-wide mt-2 text-ink/70 dark:text-white/70">
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
