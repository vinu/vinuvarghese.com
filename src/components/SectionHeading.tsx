import React from 'react';

export default function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div data-reveal className="flex items-center gap-4 mb-12 md:mb-16">
      <span className="font-mono text-sm text-copper dark:text-copper-bright">/{index}</span>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-ink/10 dark:bg-white/10" aria-hidden="true" />
    </div>
  );
}
