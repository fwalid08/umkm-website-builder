import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass, getButtonStyle, getWhatsAppLink } from '../../lib/themes/themeUtils';
import { DynamicIcon } from '../../lib/registries/IconRegistry';
import { Check } from 'lucide-react';

export const AboutSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const style = section.style || 'about-split';
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const primaryBtn = getButtonStyle(config, 'primary');

  const title = content.title || 'Tentang Kami';
  const subtitle = content.subtitle || 'Berkomitmen Memberikan Pengalaman Terbaik';
  const description = content.description || config.business.description || 'Kami hadir untuk memberikan solusi prima dengan ketulusan dan profesionalisme tinggi.';
  const story = content.story || '';
  const imageUrl = content.imageUrl || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80';
  const highlights = content.highlights || [
    'Pengalaman lebih dari 5 tahun di bidangnya',
    'Tenaga profesional tersertifikasi & ramah',
    'Transparansi harga tanpa biaya tersembunyi',
    'Garansi kepuasan layanan'
  ];
  const stats = content.stats || [];

  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-80 sm:h-[420px] object-cover shadow-xl border border-gray-200/80 dark:border-gray-800 ${cardRadius}`}
          />
          {content.experienceYears && (
            <div
              className={`absolute -bottom-6 -right-6 p-6 shadow-xl border border-gray-200/80 dark:border-gray-700 bg-white dark:bg-gray-900 hidden sm:block ${cardRadius}`}
            >
              <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {content.experienceYears}
              </span>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
                Tahun Pengalaman
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block"
              style={{ backgroundColor: `${config.branding.primaryColor}15`, color: config.branding.primaryColor }}
            >
              {title}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {subtitle}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>

          {story && (
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic border-l-2 pl-4 border-gray-300 dark:border-gray-700">
              "{story}"
            </p>
          )}

          {highlights && highlights.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {stats && stats.length > 0 && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              {stats.map((s: any, idx: number) => (
                <div key={idx} className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2">
            <a
              href={content.ctaUrl || getWhatsAppLink(config, 'Halo, saya ingin mengenal lebih jauh tentang bisnis Anda.')}
              className={primaryBtn.className}
              style={primaryBtn.style}
            >
              {content.ctaText || 'Konsultasi Gratis'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
