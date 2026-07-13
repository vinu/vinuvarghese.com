import React, { useState } from 'react';
import { skillCategories } from '../data/resume';
import SectionHeading from './SectionHeading';

// six category nodes on an ellipse around a central detail panel
const nodePos = skillCategories.map((_, i) => {
  const angle = (-90 + i * (360 / skillCategories.length)) * (Math.PI / 180);
  return { x: 50 + 42 * Math.cos(angle), y: 50 + 40 * Math.sin(angle) };
});

export default function Skills() {
  const [active, setActive] = useState(0);
  const current = skillCategories[active];

  return (
    <section id="skills" className="scroll-mt-20 py-16 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="03" title="Skills" />

        {/* constellation — desktop */}
        <div data-reveal className="hidden md:block relative h-[540px]" role="tablist" aria-label="Skill categories">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            {nodePos.map((pos, i) => (
              <line
                key={skillCategories[i].id}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                vectorEffect="non-scaling-stroke"
                className={
                  i === active
                    ? 'stroke-copper dark:stroke-copper-bright'
                    : 'stroke-ink/15 dark:stroke-white/15'
                }
                strokeWidth="1"
                strokeDasharray={i === active ? 'none' : '4 4'}
              />
            ))}
          </svg>

          {skillCategories.map((category, i) => (
            <div
              key={category.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${nodePos[i].x}%`, top: `${nodePos[i].y}%` }}
            >
              <button
                role="tab"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ animation: `float-y ${5 + (i % 3)}s ease-in-out ${i * 0.7}s infinite` }}
                className={`motion-reduce:animate-none font-mono text-xs px-4 py-2.5 border transition-colors whitespace-nowrap ${
                  i === active
                    ? 'border-copper text-copper dark:border-copper-bright dark:text-copper-bright bg-paper dark:bg-night'
                    : 'border-ink/20 dark:border-white/20 bg-paper dark:bg-night text-stone-600 dark:text-stone-400 hover:border-copper/50 dark:hover:border-copper-bright/50'
                }`}
              >
                <span className="text-copper dark:text-copper-bright mr-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {category.title}
              </button>
            </div>
          ))}

          {/* center detail panel */}
          <div
            role="tabpanel"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 glass border border-ink/15 dark:border-white/15 p-6"
          >
            <p className="font-mono text-xs text-copper dark:text-copper-bright mb-4">
              {String(active + 1).padStart(2, '0')} / {String(skillCategories.length).padStart(2, '0')}
            </p>
            <h3 className="font-bold tracking-tight mb-4">{current.title}</h3>
            <ul className="space-y-2">
              {current.skills.map((skill) => (
                <li key={skill} className="font-mono text-sm text-stone-600 dark:text-stone-400">
                  <span className="text-copper dark:text-copper-bright mr-2" aria-hidden="true">
                    +
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <p className="absolute bottom-0 left-0 font-mono text-xs text-stone-500 dark:text-stone-400">
            fig. 03 — technology constellation
          </p>
        </div>

        {/* hairline grid — mobile & fallback */}
        <div className="md:hidden grid sm:grid-cols-2 gap-px bg-ink/10 dark:bg-white/10 border border-ink/10 dark:border-white/10">
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
