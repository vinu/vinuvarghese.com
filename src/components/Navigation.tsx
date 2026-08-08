import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUp, Sun, Moon, Monitor } from 'lucide-react';
import { navItems } from '../data/resume';

type ThemeMode = 'system' | 'light' | 'dark';

const themeOptions: { mode: ThemeMode; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { mode: 'system', label: 'AUTO', Icon: Monitor },
  { mode: 'light', label: 'PRINT', Icon: Sun },
  { mode: 'dark', label: 'BROADCAST', Icon: Moon },
];

const pages = [
  { num: '100', label: 'HOME', href: '#hero' },
  ...navItems.map((item, i) => ({ num: `${(i + 2) * 100}`, label: item.label.toUpperCase(), href: item.href })),
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

  const pageChipClass = (href: string) => {
    const active = activeSection === href.slice(1);
    return `font-mono text-lg leading-none px-3 py-1.5 border transition-colors ${
      active
        ? 'bg-cyan text-black border-cyan'
        : 'bg-blue text-white border-blue hover:border-cyan'
    }`;
  };

  const themeDropdown = (
    <div className="absolute right-0 top-full mt-1 w-40 tt-frame bg-paper dark:bg-black z-50">
      {themeOptions.map(({ mode, label, Icon }) => (
        <button
          key={mode}
          onClick={() => selectTheme(mode)}
          className={`w-full flex items-center gap-3 px-4 py-2 font-mono text-lg transition-colors ${
            theme === mode ? 'bg-cyan text-black' : 'hover:bg-blue hover:text-white'
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
        className={`fixed top-0 left-0 right-0 z-40 bg-paper dark:bg-black transition-[border-color] duration-150 ${
          scrolled ? 'tt-frame border-t-0 border-x-0' : 'border-b-2 border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <a
            href="#hero"
            onClick={(e) => handleClick(e, '#hero')}
            className="font-mono text-2xl leading-none shrink-0"
          >
            <span className="bg-cyan text-black px-1.5">P100</span>
          </a>

          <div className="hidden md:flex items-center gap-2 overflow-x-auto">
            {pages.map((page) => (
              <a key={page.href} href={page.href} onClick={(e) => handleClick(e, page.href)} className={pageChipClass(page.href)}>
                {page.num} {page.label}
              </a>
            ))}
            <div className="relative ml-2" ref={desktopThemeRef}>
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 border border-ink/30 dark:border-white/30 hover:border-cyan transition-colors"
                aria-label="Theme"
                title="Theme"
              >
                <ActiveIcon className="w-5 h-5" />
              </button>
              {themeMenuOpen && themeDropdown}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="relative" ref={mobileThemeRef}>
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 border border-ink/30 dark:border-white/30"
                aria-label="Theme"
                title="Theme"
              >
                <ActiveIcon className="w-5 h-5" />
              </button>
              {themeMenuOpen && themeDropdown}
            </div>
            <button
              className="p-2 border border-ink/30 dark:border-white/30"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu: full scrim + panel, teletext page index */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/85">
          <div className="absolute top-16 left-0 right-0 bg-paper dark:bg-black tt-frame border-t-0 border-x-0 px-6 py-4 flex flex-col gap-2">
            {pages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                onClick={(e) => handleClick(e, page.href)}
                className={`${pageChipClass(page.href)} w-full text-center`}
              >
                {page.num} {page.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Back to top: fixed bottom-right, stacked above Hero's terminal launcher.
          Positioned right (not left) so it never crosses a page header's left-aligned
          number+title, and tabIndex tracks visibility so keyboard focus never lands
          on an invisible control. */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        tabIndex={showBackToTop ? 0 : -1}
        className={`fixed bottom-28 right-8 z-30 border border-ink/30 dark:border-white/30 bg-paper dark:bg-black p-3 hover:border-cyan transition-[opacity,border-color] duration-200 ${
          showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Back to page 100"
        title="Back to page 100"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}
