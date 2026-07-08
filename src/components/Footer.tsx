import React from 'react';
import { navItems } from '../data/resume';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-ink/10 dark:border-white/10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <nav className="flex flex-wrap justify-center gap-6 font-mono text-xs">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-stone-500 dark:text-stone-400 hover:text-copper dark:hover:text-copper-bright transition-colors"
            >
              {item.label.toLowerCase()}
            </a>
          ))}
        </nav>
        <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
          © {new Date().getFullYear()} Vinu Varghese · built with Astro
        </p>
      </div>
    </footer>
  );
}
