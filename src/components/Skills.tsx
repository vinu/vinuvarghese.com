import React from 'react';
import { skillCategories } from '../data/resume';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-16 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="03" title="Skills" />

        {/* hairline-divided grid: 1px gaps over a border-colored background */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 dark:bg-white/10 border border-ink/10 dark:border-white/10">
          {skillCategories.map((category, i) => (
            <div key={category.id} className="bg-paper dark:bg-night p-6 md:p-8">
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="font-bold tracking-tight">{category.title}</h3>
                <span className="font-mono text-xs text-copper dark:text-copper-bright">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="font-mono text-sm text-stone-600 dark:text-stone-400">
                    <span className="text-copper dark:text-copper-bright mr-2" aria-hidden="true">
                      +
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
