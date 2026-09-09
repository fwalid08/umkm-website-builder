import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass } from '../../lib/themes/themeUtils';
import { Calendar, ArrowRight } from 'lucide-react';

export const BlogSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const title = content.title || 'Artikel & Tips Bermanfaat';
  const subtitle = content.subtitle || 'Wawasan terbaru seputar perawatan dan tips penting bagi Anda.';
  const articles = content.articles || [];

  return (
    <section id="blog" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((item: any, idx: number) => (
          <div
            key={idx}
            className={`bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between ${cardRadius}`}
          >
            {item.image && (
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {item.date && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                )}
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {item.summary || item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800">
                <span
                  className="inline-flex items-center text-xs font-semibold hover:underline cursor-pointer"
                  style={{ color: config.branding.primaryColor }}
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
