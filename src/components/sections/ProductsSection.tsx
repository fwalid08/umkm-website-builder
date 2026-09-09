import React, { useState } from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass, getButtonStyle, getWhatsAppLink } from '../../lib/themes/themeUtils';
import { MessageCircle, ShoppingBag } from 'lucide-react';

export const ProductsSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const style = section.style || 'product-grid';
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const primaryBtn = getButtonStyle(config, 'primary');

  const title = content.title || 'Daftar Menu & Produk';
  const subtitle = content.subtitle || 'Pilihan terbaik yang disukai pelanggan setia kami.';
  const categories: string[] = content.categories || ['Semua'];
  const items = content.items || [];

  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const filteredItems = activeCategory === 'Semua'
    ? items
    : items.filter((item: any) => item.category === activeCategory);

  return (
    <section id="products" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        )}

        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat, idx) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                  style={isActive ? { backgroundColor: config.branding.primaryColor } : {}}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item: any, idx: number) => {
          const itemWaLink = getWhatsAppLink(config, `Halo, saya ingin memesan: ${item.name} (${item.price || ''})`);
          return (
            <div
              key={idx}
              className={`bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group ${cardRadius}`}
            >
              {item.image && (
                <div className="relative overflow-hidden h-48 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.badge && (
                    <span
                      className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-white shadow"
                      style={{ backgroundColor: config.branding.primaryColor }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug">
                      {item.name}
                    </h3>
                  </div>
                  {item.description && (
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                    {item.price || 'Hubungi Kami'}
                  </span>
                  <a
                    href={itemWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: config.branding.primaryColor }}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Pesan
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
