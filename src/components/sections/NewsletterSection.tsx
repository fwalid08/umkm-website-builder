import React, { useState } from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass, getButtonStyle } from '../../lib/themes/themeUtils';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const primaryBtn = getButtonStyle(config, 'primary');
  const title = content.title || 'Dapatkan Promo & Informasi Terbaru';
  const description = content.description || 'Daftarkan nomor WhatsApp atau email Anda untuk mendapatkan penawaran spesial langsung.';
  const [inputVal, setInputVal] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className={`p-8 sm:p-12 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-md text-center ${cardRadius}`}>
        <div
          className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${config.branding.primaryColor}15`, color: config.branding.primaryColor }}
        >
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">
          {description}
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
            Terima kasih! Kami akan mengirimkan info promo ke {inputVal}.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="text"
              required
              placeholder="Masukkan no. WhatsApp / Email..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className={primaryBtn.className} style={primaryBtn.style}>
              Berlangganan
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
