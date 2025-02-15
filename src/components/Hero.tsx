import React, { useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown, TerminalIcon } from 'lucide-react';
import TerminalPortfolio from './TerminalPortfolio';

export default function Hero() {
  const scrollToPassions = () => {
    const passionsSection = document.getElementById('passions');
    if (passionsSection) {
      passionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <img
          src="/profile.png"
          alt="Vinu Varghese"
          className="w-32 h-32 rounded-full border-2 border-blue-500 shadow-lg shadow-blue-500/20 mb-8 object-cover"
        />
        <h1 className="text-6xl font-bold mb-4 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Vinu Varghese
          </span>
        </h1>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-[1px] bg-blue-500/50" />
          <h2 className="text-xl text-gray-400 font-light tracking-wider">TECHNOLOGY ARCHITECT</h2>
          <div className="w-12 h-[1px] bg-blue-500/50" />
        </div>
        
        <div className="flex gap-6 mb-16">
          <a href="https://github.com/vinu" className="group" aria-label="GitHub" alt-text="GitHub" title='GitHub'>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
              <Github className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          <a href="https://www.linkedin.com/in/vinuvarghese/" className="group" aria-label="LinkedIn" alt-text="LinkedIn" title='LinkedIn'>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
              <Linkedin className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          <a href="mailto:vinu@vinuvarghese.com" className="group" aria-label="Email" alt-text="Email" title='Email'>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
              <Mail className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          <a href="https://stackoverflow.com/users/674067/jang00" className="group" aria-label="Stack Overflow" alt-text="Stack Overflow" title='Stack Overflow'>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 group-hover:text-blue-400 transition-colors"
                fill="currentColor"
              >
              <path d="M17.24 19.399v-4.804h1.6v6.375H4.96v-6.375h1.6v4.804z"/>
              <path d="M7.674 14.574l7.85 1.645.332-1.577-7.85-1.644-.332 1.576zm1.04-3.736l7.272 3.385.664-1.453-7.272-3.402-.664 1.47zm2.013-3.57l6.17 5.126 1.02-1.225-6.17-5.127-1.02 1.225zm3.982-3.8l-1.29.955 4.778 6.44 1.29-.956-4.778-6.439zM7.4 17.932h8.013v-1.6H7.4v1.6z" />
            </svg>
            </div>
          </a>
        </div>
        
        <button 
          onClick={scrollToPassions}
          className="absolute bottom-8 group cursor-pointer bg-transparent border-none focus:outline-none"
          aria-label="Scroll to passions section"
          title='Scroll to passions section'
        >
          <div className="p-3 rounded-full transition-all duration-300 hover:bg-white/5">
            <ChevronDown className="w-6 h-6 text-blue-500 animate-bounce group-hover:text-blue-400" />
          </div>
        </button>
      </div>
      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setIsTerminalOpen(false)}
                className="absolute top-0 right-10  hover:text-white"
              >
                Press ESC to close
              </button>
              <TerminalPortfolio closeHandler={() => setIsTerminalOpen(false)}/>
            </div>
          </div>
        </div>
      )}

      {/* Floating Terminal Button */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-black p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 group"
      >
        <TerminalIcon size={24} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-green-500 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
          Access Terminal
        </span>
      </button>

      {/* ESC Key Handler */}
      <div
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsTerminalOpen(false);
          }
        }}
        className="outline-none"
      />
    </div>
  );
}