import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass } from '../../lib/themes/themeUtils';

export const PartnersSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const title = content.title || 'Dipercaya Oleh Berbagai Mitra';
  const partners = content.partners || [
    { name: 'Pertamina Lubricants' },
    { name: 'Castrol' },
    { name: 'Motul' },
    { name: 'BOSCH' },
    { name: 'Denso' },
    { name: 'Michelin' },
  ];

  return (
    <section className="py-12 border-y border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          {title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 hover:opacity-95 transition-opacity">
          {partners.map((p: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {p.logo ? (
                <img src={p.logo} alt={p.name} className="h-7 object-contain" />
              ) : (
                <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                  {p.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
