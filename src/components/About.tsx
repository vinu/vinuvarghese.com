import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">
      <div className="relative">
        <div className="absolute inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30" />
        <div className="relative bg-black/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          <p className="text-gray-300 leading-relaxed">
            As a Technology Architect, I thrive at the intersection of innovation and practical solutions. 
            With a deep understanding of modern technologies and architectural patterns, I help organizations 
            navigate their digital transformation journey. My expertise spans across cloud computing, 
            artificial intelligence, and software development, allowing me to create holistic solutions 
            that drive business value while maintaining technical excellence.
          </p>
        </div>
      </div>
    </div>
  );
}