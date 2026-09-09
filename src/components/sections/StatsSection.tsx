import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass } from '../../lib/themes/themeUtils';
import { DynamicIcon } from '../../lib/registries/IconRegistry';
import { TrendingUp, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const StatsSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const style = section.style || 'stats-minimal';
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const primaryColor = config.branding.primaryColor || '#2563eb';
  const accentColor = config.branding.accentColor || '#f59e0b';

  const title = content.title || '';
  const subtitle = content.subtitle || '';
  const badgeText = content.badgeText || '';

  const items = content.items || [
    { value: '5.000+', label: 'Pelanggan Puas', description: 'Di seluruh penjuru kota', icon: 'Users' },
    { value: '99.8%', label: 'Tingkat Kepuasan', description: 'Berdasarkan ulasan asli', icon: 'ThumbsUp' },
    { value: '7+ Thn', label: 'Pengalaman Nyata', description: 'Melayani dengan dedikasi', icon: 'Award' },
    { value: '24/7', label: 'Layanan Tanggap', description: 'Konsultasi selalu siap', icon: 'Clock' },
  ];

  // Common Header for styles that have title / subtitle
  const renderHeader = () => {
    if (!title && !subtitle && !badgeText) return null;
    return (
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        {badgeText && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{badgeText}</span>
          </div>
        )}
        {title && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>
    );
  };

  // 1. VARIANT: stats-cards
  if (style === 'stats-cards') {
    return (
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderHeader()}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`p-6 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-all text-center group ${cardRadius}`}
            >
              {item.icon && (
                <div
                  className="w-12 h-12 mx-auto mb-3.5 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  <DynamicIcon name={item.icon} className="w-6 h-6" />
                </div>
              )}
              <p
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ color: primaryColor }}
              >
                {item.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-900 dark:text-white mt-1.5 font-bold">
                {item.label}
              </p>
              {item.description && (
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 2. VARIANT: stats-circles
  if (style === 'stats-circles') {
    return (
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderHeader()}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center space-y-3">
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 flex flex-col items-center justify-center shadow-inner transition-transform hover:scale-105"
                style={{
                  borderColor: `${primaryColor}30`,
                  backgroundColor: `${primaryColor}08`,
                }}
              >
                {item.icon && (
                  <DynamicIcon
                    name={item.icon}
                    className="w-4 h-4 mb-0.5"
                    style={{ color: primaryColor }}
                  />
                )}
                <span
                  className="text-xl sm:text-2xl font-black tracking-tight leading-none"
                  style={{ color: primaryColor }}
                >
                  {item.value}
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 3. VARIANT: stats-gradient
  if (style === 'stats-gradient') {
    return (
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderHeader()}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl relative overflow-hidden shadow-md text-white ${cardRadius}`}
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, #1e1b4b 100%)`,
              }}
            >
              <div className="relative z-10 space-y-2">
                {item.icon && (
                  <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    <DynamicIcon name={item.icon} className="w-5 h-5" />
                  </div>
                )}
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-white/90">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-[11px] text-white/70">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 4. VARIANT: stats-grid
  if (style === 'stats-grid') {
    return (
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderHeader()}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`p-5 bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 ${cardRadius} space-y-2`}
            >
              <div className="flex items-center justify-between">
                {item.icon ? (
                  <div
                    className="p-2 rounded-xl"
                    style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                  >
                    <DynamicIcon name={item.icon} className="w-4 h-4" />
                  </div>
                ) : (
                  <TrendingUp className="w-4 h-4" style={{ color: primaryColor }} />
                )}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  Terverifikasi
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white pt-1">
                {item.value}
              </p>
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {item.label}
              </p>
              {item.description && (
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 5. VARIANT: stats-inline
  if (style === 'stats-inline') {
    return (
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderHeader()}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`p-4 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 flex items-center gap-4 ${cardRadius}`}
            >
              <span
                className="text-3xl sm:text-4xl font-black tracking-tight shrink-0"
                style={{ color: primaryColor }}
              >
                {item.value}
              </span>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 6. VARIANT: stats-bold
  if (style === 'stats-bold') {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {renderHeader()}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="space-y-2">
              <p
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter"
                style={{ color: primaryColor }}
              >
                {item.value}
              </p>
              <div
                className="w-10 h-1 mx-auto rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                {item.label}
              </p>
              {item.description && (
                <p className="text-[11px] text-gray-500 dark:text-gray-400 max-w-[180px] mx-auto">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 7. VARIANT: stats-split
  if (style === 'stats-split') {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{badgeText || 'Pencapaian Nyata Kami'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              {title || 'Dedikasi Terbaik untuk Setiap Klien Kami'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {subtitle || 'Kami terus bertumbuh dan memberikan layanan prima yang dapat diandalkan oleh berbagai kalangan konsumen dan mitra bisnis.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Data pencapaian terverifikasi dan terus diperbarui</span>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {items.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`p-6 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm ${cardRadius} space-y-1.5`}
              >
                {item.icon && (
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                    style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                  >
                    <DynamicIcon name={item.icon} className="w-4 h-4" />
                  </div>
                )}
                <p
                  className="text-2xl sm:text-3xl font-black tracking-tight"
                  style={{ color: primaryColor }}
                >
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 8. VARIANT: stats-pill
  if (style === 'stats-pill') {
    return (
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderHeader()}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 px-6 py-4 rounded-full bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              {item.icon && (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  <DynamicIcon name={item.icon} className="w-5 h-5" />
                </div>
              )}
              <div className="text-left">
                <span
                  className="text-xl sm:text-2xl font-black tracking-tight block leading-tight"
                  style={{ color: primaryColor }}
                >
                  {item.value}
                </span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 9. VARIANT: stats-dark-accent
  if (style === 'stats-dark-accent' || style === 'stats-divider') {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {(title || subtitle || badgeText) && (
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              {badgeText && (
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-amber-400 border border-white/15">
                  {badgeText}
                </span>
              )}
              {title && (
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-2"
              >
                {item.icon && (
                  <div
                    className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2"
                    style={{ backgroundColor: `${primaryColor}25`, color: '#60a5fa' }}
                  >
                    <DynamicIcon name={item.icon} className="w-5 h-5" />
                  </div>
                )}
                <p
                  className="text-3xl sm:text-4xl font-black tracking-tight text-white"
                >
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-300">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-[11px] text-gray-500">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 10. VARIANT: stats-minimal (Default)
  return (
    <section className="py-12 border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200/60 dark:divide-gray-800">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="space-y-1 py-3 sm:py-0 px-2">
              <p
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ color: primaryColor }}
              >
                {item.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-bold">
                {item.label}
              </p>
              {item.description && (
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
