import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Mail, TerminalIcon } from 'lucide-react';
import TerminalPortfolio from './TerminalPortfolio';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { stats } from '../data/resume';

// three.js lives in its own chunk, fetched after hydration
const TensegrityScene = lazy(() => import('./TensegrityScene'));

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
    <section id="hero" className="relative min-h-svh flex flex-col overflow-hidden pt-16">
      <div className="ambient-glow absolute inset-0 pointer-events-none opacity-0 dark:opacity-100" aria-hidden="true" />

      {/* subtle full-bleed background structure — ambient, not a foreground
          object; tilts toward the cursor so it reads as present, not static */}
      {sceneReady && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-[0.22] dark:opacity-40 pointer-events-none" aria-hidden="true">
            <TensegrityScene />
          </div>
        </Suspense>
      )}

      <div className="relative flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 py-16 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <h1 className="font-display font-extrabold uppercase text-6xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight mb-4">
              Vinu Varghese
            </h1>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite/55 dark:text-ash mb-6">
              Technical Architect &middot; Est. 2000
            </p>
            <p className="max-w-xl font-sans text-lg text-graphite/75 dark:text-ash leading-relaxed mb-10">
              Twenty-plus years designing cloud, AI and full-stack systems that
              survive contact with production.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-12">
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="notch bg-amber-deep dark:bg-amber-bright text-void dark:text-carbon font-mono text-sm uppercase tracking-wide px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Explore Systems <span aria-hidden="true">+</span>
              </button>
              <div className="flex items-center gap-5">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    title={label}
                    className="text-graphite/55 dark:text-ash hover:text-amber-deep dark:hover:text-amber-bright transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* annotation rail: real stats, leader-line style */}
            <div className="flex flex-wrap gap-x-10 gap-y-3 max-w-xl">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="leader font-mono text-xs text-graphite/60 dark:text-ash min-w-[150px]">
                  <span className="uppercase tracking-wide">
                    {stat.label} <span className="text-amber-deep dark:text-amber-bright">{stat.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto md:mx-0 w-full max-w-xs md:max-w-sm">
            <div className="notch absolute -top-3 -right-3 w-full h-full border-2 border-amber-deep dark:border-amber-bright" aria-hidden="true" />
            <img
              src={profileImage}
              alt="Vinu Varghese"
              className="notch relative w-full aspect-[4/5] object-cover grayscale contrast-125 hover:grayscale-0 transition-[filter] duration-500 border border-graphite/20 dark:border-void/20"
            />
            <p className="font-mono text-xs text-graphite/50 dark:text-ash/70 mt-3">fig. 01 — the architect</p>
          </div>
        </div>
      </div>

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div
          className="fixed inset-0 bg-carbon/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          style={{
            opacity: 0,
            animation: 'fade-in 200ms ease-out forwards',
          }}
        >
          <style>{`@keyframes fade-in { to { opacity: 1; } }`}</style>
          <div className="w-full max-w-4xl">
            <div className="relative">
              <button
                onClick={() => setIsTerminalOpen(false)}
                className="absolute -top-9 right-0 font-mono text-xs uppercase tracking-wide text-void hover:text-amber-bright transition-colors"
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
        className="notch fixed bottom-8 right-8 z-30 bg-amber-deep dark:bg-amber-bright text-void dark:text-carbon p-4 font-mono hover:opacity-90 transition-opacity group"
        aria-label="Open terminal"
      >
        <TerminalIcon size={22} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-carbon text-void px-3 py-1 font-mono text-xs uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          open terminal
        </span>
      </button>
    </section>
  );
}
