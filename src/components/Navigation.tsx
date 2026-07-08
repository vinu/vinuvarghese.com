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
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const desktopThemeRef = useRef<HTMLDivElement>(null);
  const mobileThemeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  // Listen for OS preference changes when in system mode
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!themeMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktop = desktopThemeRef.current?.contains(target);
      const inMobile = mobileThemeRef.current?.contains(target);
      if (!inDesktop && !inMobile) {
        setThemeMenuOpen(false);
      }
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
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const selectTheme = (mode: ThemeMode) => {
    setTheme(mode);
    applyTheme(mode);
    setThemeMenuOpen(false);
    if (mode === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', mode);
    }
  };

  const ActiveIcon = themeOptions.find((o) => o.mode === theme)!.Icon;

  const navLinkClass = (href: string) =>
    `font-mono text-sm transition-colors ${
      activeSection === href.slice(1)
        ? 'text-copper dark:text-copper-bright'
        : 'text-stone-500 dark:text-stone-400 hover:text-ink dark:hover:text-white'
    }`;

  const themeDropdown = (
    <div className="absolute right-0 top-full mt-2 w-36 border border-ink/15 dark:border-white/15 bg-paper dark:bg-night shadow-lg py-1 z-50">
      {themeOptions.map(({ mode, label, Icon }) => (
        <button
          key={mode}
          onClick={() => selectTheme(mode)}
          className={`w-full flex items-center gap-3 px-4 py-2 font-mono text-xs transition-colors ${
            theme === mode
              ? 'text-copper dark:text-copper-bright'
              : 'text-stone-500 dark:text-stone-400 hover:text-ink dark:hover:text-white'
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
            ? 'bg-paper/85 dark:bg-night/85 backdrop-blur-xl border-b border-ink/10 dark:border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-sm font-medium hover:text-copper dark:hover:text-copper-bright transition-colors"
          >
            ~/vinu<span className="text-copper dark:text-copper-bright">_</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={navLinkClass(item.href)}
              >
                <span className="text-copper dark:text-copper-bright">0{i + 1}.</span>
                {item.label.toLowerCase()}
              </a>
            ))}
            <div className="relative" ref={desktopThemeRef}>
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 text-stone-500 dark:text-stone-400 hover:text-copper dark:hover:text-copper-bright transition-colors"
                aria-label="Theme"
                title="Theme"
              >
                <ActiveIcon className="w-5 h-5" />
              </button>
              {themeMenuOpen && themeDropdown}
            </div>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <div className="relative" ref={mobileThemeRef}>
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 text-stone-500 dark:text-stone-400 hover:text-copper dark:hover:text-copper-bright transition-colors"
                aria-label="Theme"
                title="Theme"
              >
                <ActiveIcon className="w-5 h-5" />
              </button>
              {themeMenuOpen && themeDropdown}
            </div>
            <button
              className="p-2 text-stone-500 dark:text-stone-400 hover:text-ink dark:hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="md:hidden bg-paper/95 dark:bg-night/95 backdrop-blur-xl border-b border-ink/10 dark:border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
              {navItems.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`py-2 ${navLinkClass(item.href)}`}
                >
                  <span className="text-copper dark:text-copper-bright">0{i + 1}.</span>
                  {item.label.toLowerCase()}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 left-8 z-30 border border-ink/15 dark:border-white/15 bg-paper/80 dark:bg-night/80 backdrop-blur-sm p-3 hover:text-copper dark:hover:text-copper-bright transition-all duration-300 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
        title="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}
