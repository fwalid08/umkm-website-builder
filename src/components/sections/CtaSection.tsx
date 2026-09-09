import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass, getButtonStyle, getWhatsAppLink } from '../../lib/themes/themeUtils';
import { MessageCircle, PhoneCall, ArrowRight } from 'lucide-react';

export const CtaSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const style = section.style || 'cta-gradient';
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const title = content.title || 'Siap Mendapatkan Layanan Terbaik?';
  const description = content.description || 'Hubungi kami sekarang untuk konsultasi gratis atau informasi ketersediaan jadwal.';
  const ctaText = content.ctaText || 'Chat WhatsApp Sekarang';
  const ctaUrl = content.ctaUrl || getWhatsAppLink(config);
  const secondaryText = content.secondaryText || '';
  const secondaryUrl = content.secondaryUrl || `tel:${config.business.phone || ''}`;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div
        className={`p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl ${cardRadius}`}
        style={{
          backgroundColor: config.branding.primaryColor || '#2563eb',
          backgroundImage: 'radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 70%)',
        }}
      >
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold bg-white text-gray-900 shadow-lg hover:bg-gray-50 active:scale-95 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
              {ctaText}
            </a>
            {secondaryText && (
              <a
                href={secondaryUrl}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-base font-semibold text-white border border-white/40 hover:bg-white/10 active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                {secondaryText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
