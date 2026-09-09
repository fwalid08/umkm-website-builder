import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass, getButtonStyle, getWhatsAppLink } from '../../lib/themes/themeUtils';
import { DynamicIcon } from '../../lib/registries/IconRegistry';
import { MessageCircle, ArrowUpRight, CheckCircle2, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const style = section.style || 'services-grid';
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const title = content.title || 'Layanan Unggulan Kami';
  const subtitle = content.subtitle || 'Dikerjakan oleh tenaga ahli dengan standar mutu terjamin.';
  const items = content.items || [];
  const primaryColor = config.branding.primaryColor || '#2563eb';

  // 1. VARIANT: services-split
  if (style === 'services-split') {
    return (
      <section id="services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Katalog Jasa & Pelayanan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {subtitle}
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppLink(config, 'Halo, saya ingin konsultasi layanan')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Konsultasi WhatsApp Sekarang
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {items.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`p-6 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${cardRadius}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                  >
                    <DynamicIcon name={item.icon || 'Sparkles'} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{item.description}</p>
                    {item.price && (
                      <span className="inline-block mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {item.price}
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={item.ctaUrl || getWhatsAppLink(config, `Halo, saya tertarik dengan ${item.title}`)}
                  className="shrink-0 inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Pesan <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. VARIANT: services-list
  if (style === 'services-list') {
    return (
      <section id="services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 text-base text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-gray-400">0{idx + 1}</span>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {item.price && (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                    {item.price}
                  </span>
                )}
                <a
                  href={item.ctaUrl || getWhatsAppLink(config, `Halo, mau tanya ${item.title}`)}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-white transition-all"
                >
                  Pesan
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 3. VARIANT: services-numbered
  if (style === 'services-numbered') {
    return (
      <section id="services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 text-base text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`p-7 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm relative overflow-hidden flex flex-col justify-between ${cardRadius}`}
            >
              <div className="absolute top-3 right-4 text-5xl font-black text-gray-100 dark:text-gray-800/40 select-none">
                0{idx + 1}
              </div>
              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  <DynamicIcon name={item.icon || 'Sparkles'} className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{item.description}</p>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{item.price || 'Tarif Bersahabat'}</span>
                <a
                  href={item.ctaUrl || getWhatsAppLink(config, `Halo, saya ingin reservasi ${item.title}`)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Pesan →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 4. VARIANT: services-accent
  if (style === 'services-accent') {
    return (
      <section id="services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 text-base text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`p-6 bg-white dark:bg-gray-900 shadow-md border-t-4 transition-all hover:-translate-y-1 ${cardRadius}`}
              style={{ borderTopColor: primaryColor }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
              >
                <DynamicIcon name={item.icon || 'Sparkles'} className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{item.description}</p>
              {item.price && (
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-4">{item.price}</div>
              )}
              <a
                href={item.ctaUrl || getWhatsAppLink(config, `Halo, saya mau konsultasi ${item.title}`)}
                className="block text-center py-2 px-3 text-xs font-bold rounded-lg text-white shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                Pesan Layanan
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 5. VARIANT: services-bento
  if (style === 'services-bento') {
    return (
      <section id="services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 text-base text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item: any, idx: number) => {
            const isFeatured = idx === 0;
            return (
              <div
                key={idx}
                className={`${isFeatured ? 'md:col-span-2' : 'col-span-1'} p-7 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${cardRadius}`}
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                  >
                    <DynamicIcon name={item.icon || 'Sparkles'} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                  {item.price && (
                    <div className="mt-4 inline-block font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                      Mulai {item.price}
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <a
                    href={item.ctaUrl || getWhatsAppLink(config, `Halo, saya tertarik dengan layanan ${item.title}`)}
                    className="inline-flex items-center text-sm font-semibold hover:underline"
                    style={{ color: primaryColor }}
                  >
                    Tanya via WhatsApp
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // 6. VARIANT: services-cards
  if (style === 'services-cards') {
    return (
      <section id="services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 text-base text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`overflow-hidden bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all flex flex-col ${cardRadius}`}
            >
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}
                    >
                      <DynamicIcon name={item.icon || 'Sparkles'} className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
                <div className="mt-6 pt-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{item.price || 'Tarif Menyesuaikan'}</span>
                  <a
                    href={item.ctaUrl || getWhatsAppLink(config, `Halo, mau tanya layanan ${item.title}`)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-white"
                  >
                    Konsultasi
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 7. DEFAULT & other variants: services-grid
  return (
    <section id="services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className={`p-6 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${cardRadius}`}
          >
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
              >
                <DynamicIcon name={item.icon || 'Wrench'} className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{item.description}</p>
            </div>
            <div>
              {item.price && (
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                  Estimasi: {item.price}
                </div>
              )}
              <a
                href={item.ctaUrl || getWhatsAppLink(config, `Halo, saya ingin pesan layanan ${item.title}`)}
                className="inline-flex items-center text-xs font-semibold hover:underline"
                style={{ color: primaryColor }}
              >
                Pesan / Konsultasi
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
