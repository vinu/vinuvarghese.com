import React from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToPassions = () => {
    const passionsSection = document.getElementById('passions');
    if (passionsSection) {
      passionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <a href="https://github.com/vinu" className="group">
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
              <Github className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          <a href="https://www.linkedin.com/in/vinuvarghese/" className="group">
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
              <Linkedin className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          <a href="mailto:vinu@vinuvarghese.com" className="group">
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
              <Mail className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          <a href="https://stackoverflow.com/users/674067/jang00" className="group">
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500/50">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 group-hover:text-blue-400 transition-colors"
                fill="currentColor"
              >
                <path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993 0.346 1.62 9.335 1.994-0.346zm-5.964 4.665h-9.036v2h9.036v-2zm-9.036 4h7.036v-2h-7.036v2zm12.189-14.414l-7.189 4.414h2.429l7.189-4.414h-2.429zm4.811 10.414h-2.429l-7.189 4.414h2.429l7.189-4.414zm-16-2c0.99 0 1.8-0.81 1.8-1.8s-0.81-1.8-1.8-1.8-1.8 0.81-1.8 1.8 0.81 1.8 1.8 1.8z"/>
              </svg>
            </div>
          </a>
        </div>
        
        <button 
          onClick={scrollToPassions}
          className="absolute bottom-8 group cursor-pointer bg-transparent border-none focus:outline-none"
          aria-label="Scroll to passions section"
        >
          <div className="p-3 rounded-full transition-all duration-300 hover:bg-white/5">
            <ChevronDown className="w-6 h-6 text-blue-500 animate-bounce group-hover:text-blue-400" />
          </div>
        </button>
      </div>
    </div>
  );
}