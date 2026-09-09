import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass } from '../../lib/themes/themeUtils';

export const GallerySection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const title = content.title || 'Galeri Foto & Dokumentasi';
  const subtitle = content.subtitle || 'Dokumentasi aktivitas, produk, dan pengerjaan kami sehari-hari.';
  const images = content.images || [];

  return (
    <section id="gallery" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img: any, idx: number) => {
          const src = typeof img === 'string' ? img : img.src;
          const alt = typeof img === 'string' ? `Foto ${idx + 1}` : img.alt || `Foto ${idx + 1}`;
          const caption = typeof img === 'object' ? img.caption : null;

          return (
            <div
              key={idx}
              className={`group relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square shadow-sm ${cardRadius}`}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-xs font-semibold">{caption}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
