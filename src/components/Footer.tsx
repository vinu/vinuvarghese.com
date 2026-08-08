import React from 'react';
import { navItems } from '../data/resume';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-graphite/12 dark:border-void/12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <nav className="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-wide">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-graphite/55 dark:text-ash hover:text-amber-deep dark:hover:text-amber-bright transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-xs text-graphite/50 dark:text-ash/70">
          &copy; {new Date().getFullYear()} Vinu Varghese &middot; built with Astro
        </p>
      </div>
    </footer>
  );
}
