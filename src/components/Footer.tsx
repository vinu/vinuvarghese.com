import React from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="text-gray-400 dark:text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Vinu Varghese. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
