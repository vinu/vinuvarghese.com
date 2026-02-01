import React from 'react';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Linkedin,
  Github,
  MapPin,
};

const StackOverflowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.24 19.399v-4.804h1.6v6.375H4.96v-6.375h1.6v4.804z" />
    <path d="M7.674 14.574l7.85 1.645.332-1.577-7.85-1.644-.332 1.576zm1.04-3.736l7.272 3.385.664-1.453-7.272-3.402-.664 1.47zm2.013-3.57l6.17 5.126 1.02-1.225-6.17-5.127-1.02 1.225zm3.982-3.8l-1.29.955 4.778 6.44 1.29-.956-4.778-6.439zM7.4 17.932h8.013v-1.6H7.4v1.6z" />
  </svg>
);

const contactItems = [
  {
    label: 'Email',
    href: 'mailto:vinu@vinuvarghese.com',
    icon: 'Mail',
    displayText: 'vinu@vinuvarghese.com',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vinuvarghese/',
    icon: 'Linkedin',
    displayText: 'linkedin.com/in/vinuvarghese',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/vinu',
    icon: 'Github',
    displayText: 'github.com/vinu',
  },
  {
    label: 'Location',
    href: '#contact',
    icon: 'MapPin',
    displayText: 'Thiruvananthapuram, Kerala, India',
  },
  {
    label: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/674067/jang00',
    icon: 'StackOverflow',
    displayText: 'stackoverflow.com/users/674067',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-12 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Get In Touch
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 mx-auto" />
        <p className="text-gray-500 dark:text-gray-400 text-center mb-12 max-w-lg mx-auto">
          I'm always open to discussing technology, architecture, and new opportunities. Feel free to reach out.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {contactItems.map((item) => {
            const Icon = item.icon === 'StackOverflow' ? StackOverflowIcon : iconMap[item.icon];
            const isExternal = item.href.startsWith('http') || item.href.startsWith('mailto');

            return (
              <a
                key={item.label}
                href={item.href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-500/20 transition-colors shrink-0">
                  {Icon && <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />}
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-gray-400 dark:text-gray-500">{item.label}</div>
                  <div className="text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors truncate">
                    {item.displayText}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
