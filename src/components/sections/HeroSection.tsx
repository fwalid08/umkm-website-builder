import React, { useState } from 'react';
import { SectionProps } from '../../types/section';
import { getButtonStyle, getCardRadiusClass, getWhatsAppLink } from '../../lib/themes/themeUtils';
import { DynamicIcon } from '../../lib/registries/IconRegistry';
import { MessageCircle, ArrowRight, CheckCircle2, Star, Sparkles, ShieldCheck, Play } from 'lucide-react';

export const HeroSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const style = section.style || 'hero-split';
  const primaryBtn = getButtonStyle(config, 'primary');
  const secondaryBtn = getButtonStyle(config, 'outline');
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);

  const heading = content.heading || config.business.name || 'Selamat Datang';
  const subheading = content.subheading || config.business.tagline || 'Solusi Terpercaya untuk Kebutuhan Anda';
  const description = content.description || config.business.description || '';
  const badgeText = content.badgeText || '';
  const badgeIcon = content.badgeIcon || 'Sparkles';
  const ctaPrimaryText = content.ctaPrimaryText || 'Chat WhatsApp Sekarang';
  const ctaPrimaryUrl = content.ctaPrimaryUrl || getWhatsAppLink(config);
  const ctaSecondaryText = content.ctaSecondaryText || 'Pelajari Layanan';
  const ctaSecondaryUrl = content.ctaSecondaryUrl || '#services';
  const imageUrl = content.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80';
  const bulletPoints = content.bulletPoints || ['Pengerjaan Cepat & Rapi', 'Konsultasi Gratis Tanpa Biaya', 'Garansi Kepuasan Pelanggan', 'Teknisi Berpengalaman'];

  // Interactive gallery thumbnail state for hero-showcase
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);
  const showcaseImages = content.galleryImages || [
    imageUrl,
    'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
  ];

  // Background configurations
  const bgType = content.bgType || (style === 'hero-overlay-bold' || style === 'hero-video-bg' ? 'image' : 'none');
  const bgImage = content.bgImage || (bgType === 'image' ? imageUrl : '');
  const bgColor = content.bgColor;
  const bgGradient = content.bgGradient;
  const bgOverlay = content.bgOverlay !== undefined ? content.bgOverlay : (bgType === 'image');
  const bgOverlayColor = content.bgOverlayColor || '#000000';
  const bgOverlayOpacity = content.bgOverlayOpacity !== undefined ? Number(content.bgOverlayOpacity) : 0.65;
  const hasDarkBg = bgType === 'image' || bgType === 'gradient' || (bgType === 'color' && bgColor && bgColor !== '#ffffff');

  // Compute container background styling
  const sectionBgStyle: React.CSSProperties = {};
  if (bgType === 'color' && bgColor) {
    sectionBgStyle.backgroundColor = bgColor;
  } else if (bgType === 'gradient' && bgGradient) {
    sectionBgStyle.backgroundImage = bgGradient;
  } else if (bgType === 'image' && bgImage) {
    sectionBgStyle.backgroundImage = `url("${bgImage}")`;
    sectionBgStyle.backgroundSize = 'cover';
    sectionBgStyle.backgroundPosition = 'center';
  }

  // Common Background Layer Wrapper
  const renderBackgroundLayer = () => {
    if (bgType === 'image' && bgOverlay) {
      return (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity"
          style={{
            backgroundColor: bgOverlayColor,
            opacity: bgOverlayOpacity,
          }}
        />
      );
    }
    return null;
  };

  // Text color classes based on background
  const textTitleClass = hasDarkBg ? 'text-white' : 'text-gray-900 dark:text-white';
  const textSubClass = hasDarkBg ? 'text-gray-200' : 'text-gray-600 dark:text-gray-300';
  const badgeWrapperClass = hasDarkBg
    ? 'bg-white/15 text-white backdrop-blur border border-white/20'
    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-700';

  // 1. VARIANT: hero-centered
  if (style === 'hero-centered') {
    return (
      <section id="hero" style={sectionBgStyle} className="relative py-20 md:py-28 px-4 text-center overflow-hidden">
        {renderBackgroundLayer()}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {badgeText && (
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold ${badgeWrapperClass}`}>
              <DynamicIcon name={badgeIcon} className="w-4 h-4 text-amber-400" />
              <span>{badgeText}</span>
            </div>
          )}
          <h1 className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${textTitleClass} leading-tight`}>
            {heading}
          </h1>
          <p className={`text-base sm:text-xl ${textSubClass} max-w-2xl mx-auto leading-relaxed`}>
            {description || subheading}
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={ctaPrimaryUrl}
              target={ctaPrimaryUrl.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={primaryBtn.className}
              style={primaryBtn.style}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {ctaPrimaryText}
            </a>
            {ctaSecondaryText && (
              <a href={ctaSecondaryUrl} className={secondaryBtn.className} style={secondaryBtn.style}>
                {ctaSecondaryText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>
          {(content.subNotice || content.trustNote) && (
            <p className={`text-xs ${textSubClass} opacity-80 pt-1`}>
              {content.subNotice || content.trustNote}
            </p>
          )}
          {imageUrl && (
            <div className="pt-10">
              <img
                src={imageUrl}
                alt={heading}
                className={`w-full max-h-[460px] object-cover shadow-2xl border border-gray-200/40 dark:border-gray-800 ${cardRadius}`}
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  // 2. VARIANT: hero-card
  if (style === 'hero-card') {
    return (
      <section id="hero" style={sectionBgStyle} className="relative py-16 px-4">
        {renderBackgroundLayer()}
        <div
          className={`relative z-10 max-w-6xl mx-auto p-6 sm:p-10 md:p-14 border border-gray-200/80 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-xl ${cardRadius}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              {badgeText && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300">
                  <DynamicIcon name={badgeIcon} className="w-3.5 h-3.5" />
                  {badgeText}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {heading}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {description || subheading}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={ctaPrimaryUrl}
                  target={ctaPrimaryUrl.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={primaryBtn.className}
                  style={primaryBtn.style}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {ctaPrimaryText}
                </a>
                {ctaSecondaryText && (
                  <a href={ctaSecondaryUrl} className={secondaryBtn.className} style={secondaryBtn.style}>
                    {ctaSecondaryText}
                  </a>
                )}
              </div>
            </div>
            <div className="relative">
              <img
                src={imageUrl}
                alt={heading}
                className={`w-full h-72 sm:h-96 object-cover shadow-lg ${cardRadius}`}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 3. VARIANT: hero-minimal
  if (style === 'hero-minimal') {
    return (
      <section id="hero" style={sectionBgStyle} className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {renderBackgroundLayer()}
        <div className="relative z-10 space-y-8">
          {badgeText && (
            <div className="inline-block">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md ${badgeWrapperClass}`}>
                {badgeText}
              </span>
            </div>
          )}
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight ${textTitleClass} leading-[1.08]`}>
            {heading}
          </h1>
          <div className="w-20 h-1 rounded-full" style={{ backgroundColor: config.branding.primaryColor || '#2563eb' }} />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
            <p className={`md:col-span-8 text-lg sm:text-xl ${textSubClass} leading-relaxed font-normal`}>
              {description || subheading}
            </p>
            <div className="md:col-span-4 flex md:justify-end">
              <a
                href={ctaPrimaryUrl}
                target={ctaPrimaryUrl.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={primaryBtn.className}
                style={primaryBtn.style}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {ctaPrimaryText}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. VARIANT: hero-overlay-bold
  if (style === 'hero-overlay-bold') {
    return (
      <section
        id="hero"
        style={{
          backgroundImage: `url("${bgImage || imageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative py-24 sm:py-36 md:py-44 px-4 text-center overflow-hidden flex items-center justify-center min-h-[520px]"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: bgOverlayColor || '#000000',
            opacity: bgOverlayOpacity || 0.72,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-white px-2">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white">
              <DynamicIcon name={badgeIcon} className="w-4 h-4 text-amber-300" />
              <span>{badgeText}</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
            {heading}
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow">
            {description || subheading}
          </p>
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={ctaPrimaryUrl}
              target={ctaPrimaryUrl.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {ctaPrimaryText}
            </a>
            {ctaSecondaryText && (
              <a
                href={ctaSecondaryUrl}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm bg-white/20 hover:bg-white/30 text-white backdrop-blur border border-white/30 transition-all"
              >
                {ctaSecondaryText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 5. VARIANT: hero-video-bg
  if (style === 'hero-video-bg') {
    return (
      <section
        id="hero"
        style={{
          backgroundImage: `url("${bgImage || imageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative py-20 md:py-32 px-4 flex items-center justify-center overflow-hidden min-h-[500px]"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: bgOverlayColor || '#030712', opacity: bgOverlayOpacity || 0.65 }}
        />
        <div
          className={`relative z-10 max-w-3xl mx-auto p-8 sm:p-12 bg-black/60 backdrop-blur-xl border border-white/15 text-white text-center shadow-2xl ${cardRadius}`}
        >
          {badgeText && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20 mb-4">
              <DynamicIcon name={badgeIcon} className="w-3.5 h-3.5 text-amber-400" />
              {badgeText}
            </span>
          )}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {heading}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto">
            {description || subheading}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={ctaPrimaryUrl}
              target={ctaPrimaryUrl.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={primaryBtn.className}
              style={primaryBtn.style}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {ctaPrimaryText}
            </a>
            <a
              href={ctaSecondaryUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Lihat Detail
            </a>
          </div>
        </div>
      </section>
    );
  }

  // 6. VARIANT: hero-badge-gradient
  if (style === 'hero-badge-gradient') {
    return (
      <section id="hero" style={sectionBgStyle} className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {renderBackgroundLayer()}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              <Sparkles className="w-4 h-4" />
              <span>{badgeText || 'Solusi Digital Bisnis Masa Depan'}</span>
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight ${textTitleClass} leading-[1.12]`}>
              {heading}
            </h1>
            <p className={`text-lg ${textSubClass} leading-relaxed max-w-xl`}>
              {description || subheading}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={ctaPrimaryUrl}
                target={ctaPrimaryUrl.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={primaryBtn.className}
                style={primaryBtn.style}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {ctaPrimaryText}
              </a>
              {ctaSecondaryText && (
                <a href={ctaSecondaryUrl} className={secondaryBtn.className} style={secondaryBtn.style}>
                  {ctaSecondaryText}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative p-3 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm">
              <img
                src={imageUrl}
                alt={heading}
                className={`w-full h-80 sm:h-[420px] object-cover shadow-2xl ${cardRadius}`}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 7. VARIANT: hero-asymmetric
  if (style === 'hero-asymmetric') {
    return (
      <section id="hero" style={sectionBgStyle} className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {renderBackgroundLayer()}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            {badgeText && (
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${badgeWrapperClass}`}>
                <DynamicIcon name={badgeIcon} className="w-4 h-4 text-amber-500" />
                <span>{badgeText}</span>
              </div>
            )}
            <h1 className={`text-3xl sm:text-5xl font-extrabold ${textTitleClass} tracking-tight leading-tight`}>
              {heading}
            </h1>
            <p className={`text-base sm:text-lg ${textSubClass} leading-relaxed`}>
              {description || subheading}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={ctaPrimaryUrl}
                target={ctaPrimaryUrl.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={primaryBtn.className}
                style={primaryBtn.style}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {ctaPrimaryText}
              </a>
              {ctaSecondaryText && (
                <a href={ctaSecondaryUrl} className={secondaryBtn.className} style={secondaryBtn.style}>
                  {ctaSecondaryText}
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src={imageUrl}
              alt={heading}
              className={`w-full h-64 sm:h-80 object-cover shadow-lg ${cardRadius} translate-y-4`}
            />
            <div className="space-y-4">
              <img
                src={content.secondImageUrl || showcaseImages[1] || imageUrl}
                alt="Highlight"
                className={`w-full h-44 sm:h-52 object-cover shadow-lg ${cardRadius}`}
              />
              <div className={`p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md ${cardRadius}`}>
                <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold mb-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{content.asymmetricRatingTitle || '4.9/5 Rating UMKM'}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {content.asymmetricRatingDesc || 'Dipercaya oleh ribuan pelanggan setia setiap hari.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 8. VARIANT: hero-modern-slant
  if (style === 'hero-modern-slant') {
    return (
      <section id="hero" style={sectionBgStyle} className="relative py-20 md:py-28 px-4 overflow-hidden">
        {renderBackgroundLayer()}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            {badgeText && (
              <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${badgeWrapperClass}`}>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {badgeText}
              </span>
            )}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold ${textTitleClass} tracking-tight leading-tight`}>
              {heading}
            </h1>
            <p className={`text-base sm:text-xl ${textSubClass} leading-relaxed`}>
              {description || subheading}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={ctaPrimaryUrl}
                target={ctaPrimaryUrl.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={primaryBtn.className}
                style={primaryBtn.style}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {ctaPrimaryText}
              </a>
              {ctaSecondaryText && (
                <a href={ctaSecondaryUrl} className={secondaryBtn.className} style={secondaryBtn.style}>
                  {ctaSecondaryText}
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              <img
                src={imageUrl}
                alt={heading}
                className={`w-full h-80 sm:h-[400px] object-cover shadow-2xl border-4 border-white dark:border-gray-800 ${cardRadius}`}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 9. VARIANT: hero-showcase
  if (style === 'hero-showcase') {
    const effectiveShowcaseImages =
      content.galleryImages && content.galleryImages.length > 0
        ? content.galleryImages
        : showcaseImages;
    const currentImg = effectiveShowcaseImages[activeShowcaseIdx] || imageUrl;
    return (
      <section id="hero" style={sectionBgStyle} className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderBackgroundLayer()}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            {badgeText && (
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${badgeWrapperClass}`}>
                <DynamicIcon name={badgeIcon} className="w-4 h-4 text-amber-500" />
                <span>{badgeText}</span>
              </div>
            )}
            <h1 className={`text-3xl sm:text-5xl font-extrabold ${textTitleClass} tracking-tight leading-tight`}>
              {heading}
            </h1>
            <p className={`text-base sm:text-lg ${textSubClass} leading-relaxed`}>
              {description || subheading}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={ctaPrimaryUrl}
                target={ctaPrimaryUrl.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={primaryBtn.className}
                style={primaryBtn.style}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {ctaPrimaryText}
              </a>
              {ctaSecondaryText && (
                <a href={ctaSecondaryUrl} className={secondaryBtn.className} style={secondaryBtn.style}>
                  {ctaSecondaryText}
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-6 space-y-3">
            <img
              src={currentImg}
              alt={heading}
              className={`w-full h-72 sm:h-96 object-cover shadow-xl border border-gray-200 dark:border-gray-800 transition-all ${cardRadius}`}
            />
            {/* Gallery Thumbnail Pills */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {effectiveShowcaseImages.map((img: string, i: number) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveShowcaseIdx(i)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeShowcaseIdx === i ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 10. VARIANT: hero-split (Default Standard)
  return (
    <section id="hero" style={sectionBgStyle} className="relative py-14 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {renderBackgroundLayer()}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          {badgeText && (
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${badgeWrapperClass}`}>
              <DynamicIcon name={badgeIcon} className="w-4 h-4 text-amber-500" />
              <span>{badgeText}</span>
            </div>
          )}
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold ${textTitleClass} tracking-tight leading-[1.15]`}>
            {heading}
          </h1>
          <p className={`text-base sm:text-lg ${textSubClass} max-w-xl leading-relaxed`}>
            {description || subheading}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={ctaPrimaryUrl}
              target={ctaPrimaryUrl.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={primaryBtn.className}
              style={primaryBtn.style}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {ctaPrimaryText}
            </a>
            {ctaSecondaryText && (
              <a href={ctaSecondaryUrl} className={secondaryBtn.className} style={secondaryBtn.style}>
                {ctaSecondaryText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>
          {/* Trust Points / Checklist */}
          {bulletPoints && bulletPoints.length > 0 && (
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {bulletPoints.map((bp: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className={textSubClass}>{bp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <img
              src={imageUrl}
              alt={heading}
              className={`w-full h-72 sm:h-80 md:h-[440px] object-cover shadow-2xl border border-gray-200/70 dark:border-gray-800 ${cardRadius}`}
            />
            {(content.showHighlightCard !== false && content.showFloatingHighlight !== false) && (
              <div
                className={`absolute -bottom-5 -left-5 bg-white dark:bg-gray-900 p-4 shadow-xl border border-gray-200 dark:border-gray-800 hidden sm:flex items-center gap-3 ${cardRadius}`}
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-bold text-base shadow-xs">
                  ★
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {content.highlightTitle || content.floatingHighlightTitle || content.floatingHighlight?.title || 'Rating Pelanggan'}
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {content.highlightSubtitle || content.floatingHighlightSubtitle || content.floatingHighlight?.subtitle || '4.9/5 Kepuasan Nyata'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
