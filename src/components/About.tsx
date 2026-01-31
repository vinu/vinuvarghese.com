import React from 'react';
import { professionalSummary, professionalSummary2, stats } from '../data/resume';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            About Me
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-12" />

        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-3">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {professionalSummary}
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              {professionalSummary2}
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-5 text-center hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {stat.value}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider max-w-4xl mx-auto mt-24" />
    </section>
  );
}
