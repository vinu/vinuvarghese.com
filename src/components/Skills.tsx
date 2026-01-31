import React from 'react';
import { Code2, Layers, Cloud, Network, Database, Brain } from 'lucide-react';
import { skillCategories } from '../data/resume';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Layers,
  Cloud,
  Network,
  Database,
  Brain,
};

const colorMap: Record<string, { text: string; bg: string; border: string; icon: string }> = {
  blue:    { text: 'text-blue-600 dark:text-blue-300',       bg: 'bg-blue-100 dark:bg-blue-500/10',       border: 'border-blue-200 dark:border-blue-500/20',       icon: 'text-blue-500 dark:text-blue-400' },
  purple:  { text: 'text-purple-600 dark:text-purple-300',   bg: 'bg-purple-100 dark:bg-purple-500/10',   border: 'border-purple-200 dark:border-purple-500/20',   icon: 'text-purple-500 dark:text-purple-400' },
  cyan:    { text: 'text-cyan-600 dark:text-cyan-300',       bg: 'bg-cyan-100 dark:bg-cyan-500/10',       border: 'border-cyan-200 dark:border-cyan-500/20',       icon: 'text-cyan-500 dark:text-cyan-400' },
  pink:    { text: 'text-pink-600 dark:text-pink-300',       bg: 'bg-pink-100 dark:bg-pink-500/10',       border: 'border-pink-200 dark:border-pink-500/20',       icon: 'text-pink-500 dark:text-pink-400' },
  amber:   { text: 'text-amber-600 dark:text-amber-300',     bg: 'bg-amber-100 dark:bg-amber-500/10',     border: 'border-amber-200 dark:border-amber-500/20',     icon: 'text-amber-500 dark:text-amber-400' },
  emerald: { text: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20', icon: 'text-emerald-500 dark:text-emerald-400' },
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Technical Skills
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-12" />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];
            const colors = colorMap[category.color] || colorMap.blue;

            return (
              <div
                key={category.id}
                className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:border-blue-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  {Icon && <Icon className={`w-6 h-6 ${colors.icon}`} />}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 text-sm rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-divider max-w-4xl mx-auto mt-24" />
    </section>
  );
}
