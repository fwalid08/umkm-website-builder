import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass, getButtonStyle, getWhatsAppLink } from '../../lib/themes/themeUtils';
import { Check, Star } from 'lucide-react';

export const PricingSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const style = section.style || 'pricing-cards';
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const title = content.title || 'Paket & Biaya Transparan';
  const subtitle = content.subtitle || 'Pilih paket yang paling sesuai dengan kebutuhan Anda.';
  const plans = content.plans || [];

  return (
    <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan: any, idx: number) => {
          const isFeatured = plan.isFeatured || false;
          const planWaLink = getWhatsAppLink(config, `Halo, saya ingin ambil paket: ${plan.name} (${plan.price})`);

          return (
            <div
              key={idx}
              className={`p-8 bg-white dark:bg-gray-900 border flex flex-col justify-between relative transition-all duration-200 ${
                isFeatured
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-xl'
                  : 'border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md'
              } ${cardRadius}`}
            >
              {isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow"
                    style={{ backgroundColor: config.branding.primaryColor }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Paling Favorit
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 min-h-[32px]">{plan.description}</p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1.5">/{plan.period}</span>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Termasuk:</p>
                  {(plan.features || []).map((feat: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-gray-100 dark:border-gray-800">
                <a
                  href={plan.ctaUrl || planWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center block py-2.5 px-4 text-sm font-semibold transition-all ${
                    isFeatured
                      ? 'text-white shadow-sm hover:opacity-90'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  } ${config.branding.borderRadius === 'full' ? 'rounded-full' : 'rounded-lg'}`}
                  style={isFeatured ? { backgroundColor: config.branding.primaryColor } : {}}
                >
                  {plan.ctaText || 'Pilih Paket Ini'}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
