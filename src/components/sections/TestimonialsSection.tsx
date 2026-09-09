import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass } from '../../lib/themes/themeUtils';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const title = content.title || 'Kata Pelanggan Kami';
  const subtitle = content.subtitle || 'Kepuasan nyata dari para pelanggan setia yang mempercayai kami.';
  const items = content.items || [];

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className={`p-7 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${cardRadius}`}
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
              {item.avatar ? (
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                  style={{ backgroundColor: config.branding.primaryColor }}
                >
                  {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.role || 'Pelanggan Terverifikasi'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
