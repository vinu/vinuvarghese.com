import React from 'react';
import { contactLinks } from '../data/resume';
import SectionHeading from './SectionHeading';

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 py-16 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="04" title="Contact" />

        <p data-reveal className="font-sans text-graphite/70 dark:text-ash max-w-xl mb-12">
          Always open to discussing technology, architecture, and new
          opportunities. Reach out on any channel.
        </p>

        <div data-reveal className="notch border border-graphite/12 dark:border-void/12">
          {contactLinks.map((link, i) => {
            const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto');
            const Row = isExternal ? 'a' : 'div';
            return (
              <Row
                key={link.label}
                {...(isExternal
                  ? { href: link.href, target: link.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                  : {})}
                className={`group flex items-baseline gap-4 px-6 py-5 transition-colors ${
                  i > 0 ? 'border-t border-graphite/12 dark:border-void/12' : ''
                } ${isExternal ? 'cursor-pointer hover:bg-amber-deep/5 dark:hover:bg-amber-bright/5' : ''}`}
              >
                <span className="font-mono text-xs uppercase tracking-wider text-graphite/50 dark:text-ash w-32 shrink-0">
                  {link.label}
                </span>
                <span
                  className={`font-sans truncate ${
                    isExternal ? 'group-hover:text-amber-deep dark:group-hover:text-amber-bright transition-colors' : ''
                  }`}
                >
                  {link.displayText}
                </span>
                {isExternal && (
                  <span
                    className="ml-auto font-mono text-amber-deep dark:text-amber-bright opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  >
                    &rarr;
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
