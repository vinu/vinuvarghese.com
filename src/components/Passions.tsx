import React from 'react';
import { Code2, Cloud, Brain } from 'lucide-react';

export default function Passions() {
  return (
    <div id="passions" className="max-w-6xl mx-auto px-4 py-24 scroll-mt-8">
      <h2 className="text-3xl font-bold text-center mb-16">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          My Passions
        </span>
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="group relative">
          <div className="absolute inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
          <div className="relative bg-black p-8 rounded-2xl h-full border border-white/10">
            <Code2 className="w-12 h-12 text-blue-400 mb-6" />
            <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Coding</h3>
            <p className="text-gray-400 leading-relaxed">
              Crafting elegant solutions through clean, efficient code. Passionate about building scalable and maintainable software architectures.
            </p>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
          <div className="relative bg-black p-8 rounded-2xl h-full border border-white/10">
            <Cloud className="w-12 h-12 text-purple-400 mb-6" />
            <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition-colors">Cloud</h3>
            <p className="text-gray-400 leading-relaxed">
              Designing and implementing robust cloud architectures. Expert in distributed systems and cloud-native solutions.
            </p>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute inset-0.5 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
          <div className="relative bg-black p-8 rounded-2xl h-full border border-white/10">
            <Brain className="w-12 h-12 text-pink-400 mb-6" />
            <h3 className="text-xl font-bold mb-4 group-hover:text-pink-400 transition-colors">AI</h3>
            <p className="text-gray-400 leading-relaxed">
              Exploring the frontiers of artificial intelligence and machine learning. Building intelligent systems that solve real-world problems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}