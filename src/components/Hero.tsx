import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown, TerminalIcon } from 'lucide-react';
import TerminalPortfolio from './TerminalPortfolio';

interface HeroProps {
  profileImage: string;
}

export default function Hero({ profileImage }: HeroProps) {
  const sparkleContainerRef = useRef<HTMLDivElement>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const container = sparkleContainerRef.current;
    if (!container) return;

    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';

      const x = Math.floor(Math.random() * (container.offsetWidth / 40)) * 40;
      const y = Math.floor(Math.random() * (container.offsetHeight / 40)) * 40;

      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.animationDelay = `${Math.random() * 2}s`;

      container.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 2000);
    };

    for (let i = 0; i < 12; i++) {
      createSparkle();
    }

    const interval = setInterval(() => {
      createSparkle();
    }, 500);

    return () => {
      clearInterval(interval);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTerminalOpen(false);
      }
    };
    if (isTerminalOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isTerminalOpen]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(243,244,246,1),rgba(255,255,255,1))] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10 dark:opacity-20" />
        <div ref={sparkleContainerRef} className="absolute inset-0 overflow-hidden" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <img
          src={profileImage}
          alt="Vinu Varghese"
          className="w-36 h-36 md:w-40 md:h-40 rounded-full border-2 border-blue-500 shadow-lg shadow-blue-500/20 mb-8 object-cover"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          <span className="animate-aurora">
            Vinu Varghese
          </span>
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-[1px] bg-blue-500/50" />
          <h2 className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light tracking-wider">TECHNICAL ARCHITECT</h2>
          <div className="w-12 h-[1px] bg-blue-500/50" />
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-sm md:text-base mb-10 max-w-lg text-center leading-relaxed">
          Crafting enterprise-scale solutions across cloud, AI, and full-stack for 20+ years
        </p>

        <div className="flex gap-6 mb-16">
          <a href="https://github.com/vinu" className="group" aria-label="GitHub" title="GitHub">
            <div className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-blue-500/50">
              <Github className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          <a href="https://www.linkedin.com/in/vinuvarghese/" className="group" aria-label="LinkedIn" title="LinkedIn">
            <div className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-blue-500/50">
              <Linkedin className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          <a href="mailto:vinu@vinuvarghese.com" className="group" aria-label="Email" title="Email">
            <div className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-blue-500/50">
              <Mail className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
        </div>

        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 group cursor-pointer bg-transparent border-none focus:outline-none"
          aria-label="Scroll to about section"
          title="Scroll down"
        >
          <div className="p-3 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/5">
            <ChevronDown className="w-6 h-6 text-blue-500 animate-bounce group-hover:text-blue-400" />
          </div>
        </button>
      </div>

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div className="fixed inset-0 bg-white/75 dark:bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl">
            <div className="relative">
              <button
                onClick={() => setIsTerminalOpen(false)}
                className="absolute -top-8 right-0 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
              >
                Press ESC to close
              </button>
              <TerminalPortfolio closeHandler={() => setIsTerminalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Floating Terminal Button */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-black p-4 rounded-full shadow-lg shadow-green-500/20 transition-transform transform hover:scale-110 group z-30"
      >
        <TerminalIcon size={24} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black text-green-600 dark:text-green-500 px-3 py-1 rounded shadow-lg dark:shadow-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
          Access Terminal
        </span>
      </button>
    </div>
  );
}
