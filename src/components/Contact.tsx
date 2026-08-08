import React from 'react';
import { contactLinks } from '../data/resume';
import PageHeader from './PageHeader';

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader pageNum="500" title="Contact" />

        <p data-reveal className="font-mono text-xl max-w-xl mb-8">
          Always open to discussing technology, architecture, and new
          opportunities. Reach out on any channel.
        </p>

        <div data-reveal className="tt-frame">
          {contactLinks.map((link, i) => {
            const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto');
            const Row = isExternal ? 'a' : 'div';
            return (
              <Row
                key={link.label}
                {...(isExternal
                  ? { href: link.href, target: link.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                  : {})}
                className={`group flex items-baseline gap-4 px-5 py-4 ${
                  i > 0 ? 'tt-rule' : ''
                } ${isExternal ? 'cursor-pointer hover:bg-blue hover:text-white' : ''} transition-colors`}
              >
                <span className="font-mono text-lg uppercase tracking-wide text-ink/70 dark:text-white/70 group-hover:text-white w-32 shrink-0">
                  {link.label}
                </span>
                <span className="font-mono text-lg truncate">{link.displayText}</span>
                {isExternal && (
                  <span
                    className="ml-auto font-mono text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  >
                    &gt;&gt;
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
