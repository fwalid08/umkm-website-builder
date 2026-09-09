import React from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass } from '../../lib/themes/themeUtils';
import { DynamicIcon } from '../../lib/registries/IconRegistry';

export const ProcessSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const title = content.title || 'Cara Pemesanan & Alur Kerja';
  const subtitle = content.subtitle || 'Langkah praktis dan mudah dari awal hingga selesai.';
  const steps = content.steps || [
    { step: '01', title: 'Hubungi Kami', description: 'Konsultasikan kebutuhan atau pilih paket layanan yang diinginkan via WhatsApp.', icon: 'Phone' },
    { step: '02', title: 'Konfirmasi & Estimasi', description: 'Tim kami memberikan rincian biaya jelas tanpa ada biaya tersembunyi.', icon: 'CheckCircle2' },
    { step: '03', title: 'Pengerjaan Cepat', description: 'Dikerjakan langsung oleh teknisi berpengalaman dengan kontrol kualitas.', icon: 'Wrench' },
    { step: '04', title: 'Selesai & Garansi', description: 'Pemeriksaan akhir bersama pelanggan disertai jaminan kepuasan.', icon: 'ShieldCheck' }
  ];

  return (
    <section id="process" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item: any, idx: number) => (
          <div
            key={idx}
            className={`p-6 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm relative flex flex-col justify-between ${cardRadius}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded"
                  style={{ backgroundColor: `${config.branding.primaryColor}15`, color: config.branding.primaryColor }}
                >
                  Langkah {item.step || `0${idx + 1}`}
                </span>
                {item.icon && (
                  <div className="text-gray-400">
                    <DynamicIcon name={item.icon} className="w-5 h-5" />
                  </div>
                )}
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
