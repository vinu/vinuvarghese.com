import React, { useState, useEffect, useRef } from 'react';
import { skillCategories } from '../data/resume';
import PageHeader from './PageHeader';

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
    <section id="skills" className="scroll-mt-16 py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader pageNum="400" title="Skills" />

        <div data-reveal className="tt-frame">
          {/* subpage bar */}
          <div className="flex flex-wrap items-center gap-2 bg-blue px-4 py-3">
            <span className="font-mono text-white text-lg mr-2">P400</span>
            {skillCategories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => select(i)}
                aria-pressed={i === active}
                className={`font-mono text-lg px-2.5 py-0.5 border transition-colors ${
                  i === active ? 'bg-cyan text-black border-cyan' : 'bg-transparent text-white border-white/40 hover:border-white'
                }`}
              >
                {401 + i}
              </button>
            ))}
            <button
              onClick={() => setHeld((h) => !h)}
              className={`font-mono text-lg px-2.5 py-0.5 border ml-auto transition-colors ${
                held ? 'bg-yellow text-black border-yellow' : 'bg-transparent text-white border-white/40 hover:border-white'
              }`}
              aria-pressed={held}
            >
              {held ? 'HELD' : 'HOLD'}
            </button>
          </div>

          {/* active subpage content */}
          <div className="p-6 md:p-8 min-h-[20rem]">
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-mono text-2xl md:text-3xl">{current.title}</h3>
              <span className="font-mono text-lg text-ink/70 dark:text-white/70">
                {401 + active} / {400 + skillCategories.length}
              </span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {current.skills.map((skill) => (
                <li key={skill} className="font-mono text-lg flex gap-3">
                  <span className="text-ink dark:text-green shrink-0" aria-hidden="true">+</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p data-reveal className="font-mono text-base text-ink/70 dark:text-white/70 mt-4">
          {held ? 'subpage held — press a number to browse' : `auto-advancing every ${AUTO_ADVANCE_MS / 1000}s — press HOLD to stop`}
        </p>
      </div>
    </section>
  );
}
