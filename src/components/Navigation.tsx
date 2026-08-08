import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUp, Sun, Moon, Monitor } from 'lucide-react';
import { navItems } from '../data/resume';

type ThemeMode = 'system' | 'light' | 'dark';

const themeOptions: { mode: ThemeMode; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { mode: 'system', label: 'System', Icon: Monitor },
  { mode: 'light', label: 'Light', Icon: Sun },
  { mode: 'dark', label: 'Dark', Icon: Moon },
];

function getStoredTheme(): ThemeMode {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'system';
}

function applyTheme(mode: ThemeMode) {
  const dark =
    mode === 'dark' ||
    (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const desktopThemeRef = useRef<HTMLDivElement>(null);
  const mobileThemeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => {
    if (!themeMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktop = desktopThemeRef.current?.contains(target);
      const inMobile = mobileThemeRef.current?.contains(target);
      if (!inDesktop && !inMobile) setThemeMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [themeMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const selectTheme = (mode: ThemeMode) => {
    setTheme(mode);
    applyTheme(mode);
    setThemeMenuOpen(false);
    if (mode === 'system') localStorage.removeItem('theme');
    else localStorage.setItem('theme', mode);
  };

  const ActiveIcon = themeOptions.find((o) => o.mode === theme)!.Icon;

  const navLinkClass = (href: string) =>
    `font-mono text-xs uppercase tracking-wider transition-colors ${
      activeSection === href.slice(1)
        ? 'text-amber-deep dark:text-amber-bright'
        : 'text-graphite/60 dark:text-ash hover:text-graphite dark:hover:text-void'
    }`;

  const themeDropdown = (
    <div className="absolute right-0 top-full mt-2 w-36 notch-sm border border-graphite/15 dark:border-void/15 bg-concrete dark:bg-carbon shadow-lg py-1 z-50">
      {themeOptions.map(({ mode, label, Icon }) => (
        <button
          key={mode}
          onClick={() => selectTheme(mode)}
          className={`w-full flex items-center gap-3 px-4 py-2 font-mono text-xs transition-colors ${
            theme === mode
              ? 'text-amber-deep dark:text-amber-bright'
              : 'text-graphite/60 dark:text-ash hover:text-graphite dark:hover:text-void'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-concrete/90 dark:bg-carbon/90 backdrop-blur-md border-b border-graphite/10 dark:border-void/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleClick(e, '#hero')}
            className="flex items-center gap-2.5 font-display font-bold text-lg tracking-wide"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <polygon points="9,1 17,6 17,12 9,17 1,12 1,6" fill="none" stroke="currentColor" strokeWidth="1" className="text-graphite/40 dark:text-ash/40" />
              <line x1="9" y1="1" x2="9" y2="17" stroke="#8a4a05" strokeWidth="1" />
              <line x1="1" y1="6" x2="17" y2="12" stroke="#8a4a05" strokeWidth="1" />
            </svg>
            VINU VARGHESE
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <React.Fragment key={item.href}>
                <a href={item.href} onClick={(e) => handleClick(e, item.href)} className={navLinkClass(item.href)}>
                  {item.label}
                </a>
                <span className="text-graphite/20 dark:text-void/20 text-xs" aria-hidden="true">/</span>
              </React.Fragment>
            ))}
            <div className="relative" ref={desktopThemeRef}>
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 text-graphite/60 dark:text-ash hover:text-amber-deep dark:hover:text-amber-bright transition-colors"
                aria-label="Theme"
                title="Theme"
              >
                <ActiveIcon className="w-4 h-4" />
              </button>
              {themeMenuOpen && themeDropdown}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="relative" ref={mobileThemeRef}>
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 text-graphite/60 dark:text-ash"
                aria-label="Theme"
                title="Theme"
              >
                <ActiveIcon className="w-4 h-4" />
              </button>
              {themeMenuOpen && themeDropdown}
            </div>
            <button
              className="p-2 text-graphite/60 dark:text-ash"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu: full scrim so content never clips beneath it */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-carbon/90 backdrop-blur-sm">
          <div className="absolute top-16 left-0 right-0 bg-concrete dark:bg-carbon border-b border-graphite/10 dark:border-void/10 px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`${navLinkClass(item.href)} text-sm py-1`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Back to top: bottom-right, stacked above the terminal launcher,
          tabIndex tracks visibility so keyboard focus never lands on an
          invisible control */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        tabIndex={showBackToTop ? 0 : -1}
        className={`fixed bottom-28 right-8 z-30 notch-sm border border-graphite/20 dark:border-void/20 bg-concrete dark:bg-carbon p-3 hover:border-amber-deep dark:hover:border-amber-bright hover:text-amber-deep dark:hover:text-amber-bright transition-[opacity,border-color,color] duration-200 ${
          showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}
