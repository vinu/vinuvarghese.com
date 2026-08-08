import React, { useState, useEffect } from 'react';
import { Mail, TerminalIcon } from 'lucide-react';
import TerminalPortfolio from './TerminalPortfolio';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { stats } from '../data/resume';

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsTerminalOpen(false);
    };
    if (isTerminalOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isTerminalOpen]);

  return (
    <section id="hero" className="relative min-h-svh flex flex-col overflow-hidden pt-16">
      <div className="tt-scanlines absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 py-16 grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-red-chip text-white font-mono text-xl px-2 py-0.5">LIVE</span>
              <p className="font-mono text-lg text-ink/70 dark:text-white/70">
                vinu@vinuvarghese.com:~$ whoami<span className="animate-blink ml-1">▊</span>
              </p>
            </div>

            <h1 className="font-mono text-ink dark:text-yellow text-6xl sm:text-7xl md:text-8xl leading-[0.9] mb-6" style={{ transform: 'scaleY(1.15)', transformOrigin: 'bottom' }}>
              VINU
              <br />
              VARGHESE
            </h1>

            <p className="font-mono text-xl uppercase tracking-wide mb-4">
              Technical Architect <span className="text-ink dark:text-cyan">·</span> est. 2000
            </p>
            <p className="max-w-xl font-mono text-xl leading-relaxed mb-8">
              Twenty-plus years designing cloud, AI and full-stack systems that
              survive contact with production.
            </p>

            {/* stat ticker, teletext-style */}
            <div className="tt-frame flex flex-wrap divide-x-2 divide-ink/30 dark:divide-white/30 mb-8 w-fit">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="px-4 py-2">
                  <div className="font-mono text-2xl text-ink dark:text-green leading-none">{stat.value}</div>
                  <div className="font-mono text-sm uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="font-mono text-lg bg-transparent border-2 border-ink shadow-[inset_0_0_0_2px_var(--color-paper)] text-ink hover:bg-ink hover:text-paper hover:shadow-none dark:border-cyan dark:shadow-[inset_0_0_0_2px_black] dark:text-cyan dark:hover:bg-cyan dark:hover:text-black dark:hover:shadow-none px-5 py-2.5 transition-colors"
              >
                &gt; SELECT ./portfolio --interactive
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
                    className="text-ink/70 dark:text-white/70 hover:text-ink dark:hover:text-cyan transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex md:block justify-center">
            <div className="relative w-32 h-32 md:w-56 md:h-56">
              <div className="absolute -top-2 -right-2 w-full h-full border-2 border-ink dark:border-cyan" aria-hidden="true" />
              <img
                src={profileImage}
                alt="Vinu Varghese"
                className="relative w-full h-full object-cover grayscale contrast-125 border-2 border-ink/30 dark:border-white/30"
              />
            </div>
            <p className="hidden md:block font-mono text-sm mt-3">fig. 01 — the architect</p>
          </div>
        </div>
      </div>

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl">
            <div className="relative">
              <button
                onClick={() => setIsTerminalOpen(false)}
                className="absolute -top-9 right-0 font-mono text-lg text-white hover:text-cyan transition-colors"
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
        className="fixed bottom-8 right-8 z-30 bg-cyan text-black p-4 font-mono hover:bg-yellow transition-colors group"
        aria-label="Open terminal"
      >
        <TerminalIcon size={22} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 font-mono text-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          open terminal
        </span>
      </button>
    </section>
  );
}
