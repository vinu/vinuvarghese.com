import React from 'react';

export default function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div data-reveal className="flex items-baseline gap-4 mb-12 md:mb-16">
      <h2 className="font-display font-bold uppercase text-3xl md:text-5xl tracking-tight">{title}</h2>
      <span className="font-mono text-xs text-graphite/40 dark:text-ash/50">/{index}</span>
      <div className="flex-1 h-px bg-graphite/15 dark:bg-void/15" aria-hidden="true" />
    </div>
  );
}
