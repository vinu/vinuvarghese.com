import React from 'react';
import { contactLinks } from '../data/resume';
import SectionHeading from './SectionHeading';

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-16 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="04" title="Contact" />

        <p data-reveal className="text-stone-600 dark:text-stone-400 max-w-xl mb-12">
          Always open to discussing technology, architecture, and new
          opportunities. Reach out on any channel.
        </p>

        <div data-reveal className="border-t border-ink/10 dark:border-white/10">
          {contactLinks.map((link) => {
            const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto');
            const Row = isExternal ? 'a' : 'div';
            return (
              <Row
                key={link.label}
                {...(isExternal
                  ? { href: link.href, target: link.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                  : {})}
                className={`group flex items-baseline gap-4 border-b border-ink/10 dark:border-white/10 py-5 ${
                  isExternal ? 'cursor-pointer' : ''
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 w-32 shrink-0">
                  {link.label}
                </span>
                <span
                  className={`truncate ${
                    isExternal
                      ? 'group-hover:text-copper dark:group-hover:text-copper-bright transition-colors'
                      : ''
                  }`}
                >
                  {link.displayText}
                </span>
                {isExternal && (
                  <span
                    className="ml-auto font-mono text-copper dark:text-copper-bright opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                )}
              </Row>
            );
          })}
        </div>
      </div>
    </section>
  );
}
