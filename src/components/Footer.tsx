import React from 'react';
import { navItems } from '../data/resume';

export default function Footer() {
  return (
    <footer className="tt-frame border-x-0 border-b-0 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <nav className="flex flex-wrap justify-center gap-3 font-mono text-lg">
          <a href="#hero" className="px-2.5 py-0.5 border border-ink/30 dark:border-white/30 hover:border-cyan transition-colors">
            100
          </a>
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2.5 py-0.5 border border-ink/30 dark:border-white/30 hover:border-cyan transition-colors"
            >
              {(i + 2) * 100}
            </a>
          ))}
        </nav>
        <p className="font-mono text-lg text-ink/70 dark:text-white/70">
          &copy; {new Date().getFullYear()} Vinu Varghese &middot; built with Astro
        </p>
      </div>
    </footer>
  );
}
