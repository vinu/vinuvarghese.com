import React from 'react';

export default function PageHeader({ pageNum, title }: { pageNum: string; title: string }) {
  return (
    <div data-reveal className="mb-10 md:mb-14">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-ink dark:text-yellow text-4xl md:text-5xl leading-none" style={{ transform: 'scaleY(1.15)', transformOrigin: 'bottom' }}>
          {pageNum}
        </span>
        <h2 className="font-mono text-ink dark:text-yellow text-4xl md:text-5xl leading-none" style={{ transform: 'scaleY(1.15)', transformOrigin: 'bottom' }}>
          {title.toUpperCase()}
        </h2>
      </div>
      <div className="tt-rule mt-4" />
    </div>
  );
}
