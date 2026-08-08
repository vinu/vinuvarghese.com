import React, { useState, useEffect, useRef } from 'react';
import { skillCategories } from '../data/resume';
import SectionHeading from './SectionHeading';

const AUTO_ADVANCE_MS = 6000;

export default function Skills() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const reducedMotionRef = useRef(false);
  const current = skillCategories[active];

  useEffect(() => {
    reducedMotionRef.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (held || reducedMotionRef.current) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % skillCategories.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [held]);

  const select = (i: number) => {
    setActive(i);
    setHeld(true);
  };

  return (
    <section id="skills" className="scroll-mt-16 py-16 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="03" title="Skills" />

        <div data-reveal className="notch border border-graphite/12 dark:border-void/12 bg-graphite/[0.02] dark:bg-void/[0.03]">
          {/* node selector bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-graphite/12 dark:border-void/12 px-5 py-4">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => select(i)}
                aria-pressed={i === active}
                className={`notch-sm font-mono text-xs uppercase tracking-wide px-3 py-1.5 border transition-colors ${
                  i === active
                    ? 'border-amber-deep dark:border-amber-bright text-amber-deep dark:text-amber-bright bg-amber-deep/5 dark:bg-amber-bright/5'
                    : 'border-graphite/20 dark:border-void/20 text-graphite/55 dark:text-ash hover:border-amber-deep/40 dark:hover:border-amber-bright/40'
                }`}
              >
                Node {String(i + 1).padStart(2, '0')}
              </button>
            ))}
            <button
              onClick={() => setHeld((h) => !h)}
              className={`notch-sm font-mono text-xs uppercase tracking-wide px-3 py-1.5 border ml-auto transition-colors ${
                held
                  ? 'border-amber-deep dark:border-amber-bright bg-amber-deep dark:bg-amber-bright text-void dark:text-carbon'
                  : 'border-graphite/20 dark:border-void/20 text-graphite/55 dark:text-ash hover:border-amber-deep/40 dark:hover:border-amber-bright/40'
              }`}
              aria-pressed={held}
            >
              {held ? 'Held' : 'Hold'}
            </button>
          </div>

          {/* active node detail */}
          <div className="p-6 md:p-8 min-h-[19rem]">
            <div className="leader font-mono text-xs text-graphite/55 dark:text-ash mb-6">
              <span className="uppercase tracking-wide">
                Node {String(active + 1).padStart(2, '0')} / {String(skillCategories.length).padStart(2, '0')}
              </span>
            </div>
            <h3 className="font-display font-bold uppercase text-2xl md:text-3xl tracking-tight mb-6">{current.title}</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {current.skills.map((skill) => (
                <li key={skill} className="font-sans text-sm flex gap-3 text-graphite/80 dark:text-ash">
                  <span className="text-amber-deep dark:text-amber-bright shrink-0" aria-hidden="true">+</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p data-reveal className="font-mono text-xs text-graphite/50 dark:text-ash/70 mt-4 uppercase tracking-wide">
          {held ? 'Node held — select another to browse' : `Cycling every ${AUTO_ADVANCE_MS / 1000}s — Hold to stop`}
        </p>
      </div>
    </section>
  );
}
