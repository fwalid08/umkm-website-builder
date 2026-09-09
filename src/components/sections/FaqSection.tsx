import React, { useState } from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass } from '../../lib/themes/themeUtils';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const title = content.title || 'Pertanyaan yang Sering Diajukan';
  const subtitle = content.subtitle || 'Temukan jawaban cepat untuk pertanyaan umum seputar layanan kami.';
  const items = content.items || [];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {items.map((item: any, idx: number) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-colors ${cardRadius}`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-4 px-6 text-left font-semibold text-base text-gray-900 dark:text-white flex items-center justify-between gap-4"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800/60 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
