import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Mail, ArrowDown, TerminalIcon } from 'lucide-react';
import TerminalPortfolio from './TerminalPortfolio';
import { GitHubIcon, LinkedInIcon } from './Icons';

// three.js lives in its own chunk, fetched after hydration
const HeroScene = lazy(() => import('./HeroScene'));

interface HeroProps {
  profileImage: string;
}

const socialLinks = [
  { label: 'github', href: 'https://github.com/vinu', Icon: GitHubIcon },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/vinuvarghese/', Icon: LinkedInIcon },
  { label: 'email', href: 'mailto:vinu@vinuvarghese.com', Icon: Mail },
];

export default function Hero({ profileImage }: HeroProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const probe = document.createElement('canvas');
    if (probe.getContext('webgl2') || probe.getContext('webgl')) setSceneReady(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsTerminalOpen(false);
    };
    if (isTerminalOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isTerminalOpen]);

  return (
    <section className="relative min-h-svh flex flex-col overflow-hidden">
      <div className="absolute inset-0 blueprint" aria-hidden="true" />
      {sceneReady && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      <div className="relative flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 pt-28 pb-20 grid md:grid-cols-[1fr_auto] gap-14 items-center">
          <div className="animate-fade-up">
            <p className="font-mono text-xs sm:text-sm text-copper dark:text-copper-bright mb-8">
              <span className="opacity-60">vinu@vinuvarghese.com:~$</span> whoami
              <span className="animate-blink ml-1">▊</span>
            </p>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.95] mb-8">
              Vinu
              <br />
              Varghese<span className="text-copper dark:text-copper-bright">.</span>
            </h1>

            <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400 mb-4">
              Technical Architect · est. 2000
            </p>
            <p className="max-w-xl text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed mb-10">
              Twenty-plus years designing cloud, AI and full-stack systems that
              survive contact with production.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                onClick={() => setIsTerminalOpen(true)}
                data-magnetic
                className="font-mono text-sm border border-ink/20 dark:border-white/20 px-5 py-3 hover:border-copper hover:text-copper dark:hover:border-copper-bright dark:hover:text-copper-bright transition-colors"
              >
                $ ./portfolio --interactive
              </button>
              <div className="flex items-center gap-6">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    title={label}
                    className="text-stone-500 dark:text-stone-400 hover:text-copper dark:hover:text-copper-bright transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block animate-fade-up [animation-delay:150ms]">
            <div className="relative">
              <div
                className="absolute -top-3 -right-3 w-full h-full border border-copper dark:border-copper-bright"
                aria-hidden="true"
              />
              <img
                src={profileImage}
                alt="Vinu Varghese"
                className="relative w-56 h-56 object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-ink/15 dark:border-white/15"
              />
            </div>
            <p className="font-mono text-xs text-stone-500 dark:text-stone-400 mt-4">
              fig. 01 — the architect
            </p>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="relative self-center mb-8 font-mono text-xs text-stone-500 dark:text-stone-400 hover:text-copper dark:hover:text-copper-bright transition-colors flex items-center gap-2"
      >
        scroll <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div className="fixed inset-0 bg-paper/80 dark:bg-night/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl">
            <div className="relative">
              <button
                onClick={() => setIsTerminalOpen(false)}
                className="absolute -top-8 right-0 font-mono text-xs text-stone-500 dark:text-stone-400 hover:text-copper dark:hover:text-copper-bright transition-colors"
              >
                [esc] to close
              </button>
              <TerminalPortfolio closeHandler={() => setIsTerminalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Floating Terminal Button */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-8 right-8 z-30 bg-night dark:bg-paper text-copper-bright dark:text-copper p-4 font-mono shadow-lg hover:-translate-y-0.5 transition-transform group"
        aria-label="Open terminal"
      >
        <TerminalIcon size={22} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-night dark:bg-paper text-copper-bright dark:text-copper px-3 py-1 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          open terminal
        </span>
      </button>
    </section>
  );
}
