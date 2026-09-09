import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass } from '../../lib/themes/themeUtils';
import { DynamicIcon } from '../../lib/registries/IconRegistry';

export const FeaturesSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const title = content.title || 'Mengapa Memilih Kami?';
  const subtitle = content.subtitle || 'Standar layanan terbaik yang dirancang untuk kenyamanan dan ketenangan Anda.';
  const items = content.items || [];

  return (
    <section id="features" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className={`p-7 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow ${cardRadius}`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ backgroundColor: `${config.branding.primaryColor}15`, color: config.branding.primaryColor }}
            >
              <DynamicIcon name={item.icon || 'ShieldCheck'} className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
