import React, { useState } from 'react';
import { SectionProps } from '../../types/section';
import { getCardRadiusClass, getButtonStyle, getWhatsAppLink } from '../../lib/themes/themeUtils';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC<SectionProps> = ({ section, config }) => {
  const content = section.content || {};
  const cardRadius = getCardRadiusClass(config.branding.borderRadius);
  const primaryBtn = getButtonStyle(config, 'primary');

  const title = content.title || 'Hubungi Kami';
  const subtitle = content.subtitle || 'Kami siap melayani dan menjawab segala pertanyaan Anda.';
  const mapEmbedUrl = content.mapEmbedUrl || '';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo ${config.business.name}, nama saya ${formData.name} (${formData.phone}). Pesan: ${formData.message}`;
    const url = getWhatsAppLink(config, text);
    setFormSubmitted(true);
    setTimeout(() => {
      window.open(url, '_blank');
    }, 400);
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-8 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6 ${cardRadius}`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Informasi Usaha
            </h3>

            {config.business.address && (
              <div className="flex items-start gap-3.5 text-sm text-gray-600 dark:text-gray-300">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${config.branding.primaryColor}15`, color: config.branding.primaryColor }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Alamat</p>
                  <p className="mt-0.5 leading-relaxed">{config.business.address}, {config.business.city}</p>
                </div>
              </div>
            )}

            {config.business.phone && (
              <div className="flex items-start gap-3.5 text-sm text-gray-600 dark:text-gray-300">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${config.branding.primaryColor}15`, color: config.branding.primaryColor }}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Telepon / WhatsApp</p>
                  <a
                    href={`tel:${config.business.phone}`}
                    className="mt-0.5 block hover:underline text-gray-900 dark:text-white font-medium"
                  >
                    {config.business.phone}
                  </a>
                </div>
              </div>
            )}

            {config.business.email && (
              <div className="flex items-start gap-3.5 text-sm text-gray-600 dark:text-gray-300">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${config.branding.primaryColor}15`, color: config.branding.primaryColor }}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                  <a
                    href={`mailto:${config.business.email}`}
                    className="mt-0.5 block hover:underline text-gray-900 dark:text-white font-medium"
                  >
                    {config.business.email}
                  </a>
                </div>
              </div>
            )}

            {config.business.openingHours && (
              <div className="flex items-start gap-3.5 text-sm text-gray-600 dark:text-gray-300">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${config.branding.primaryColor}15`, color: config.branding.primaryColor }}
                >
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Jam Operasional</p>
                  <p className="mt-0.5 leading-relaxed">{config.business.openingHours}</p>
                </div>
              </div>
            )}

            <div className="pt-2">
              <a
                href={getWhatsAppLink(config)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white shadow transition-all hover:opacity-95"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat WhatsApp Langsung
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className={`p-8 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm ${cardRadius}`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Kirim Pesan Cepat
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Isi data di bawah ini, pesan akan langsung terhubung ke WhatsApp customer service kami.
            </p>

            {formSubmitted ? (
              <div className="p-6 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="font-bold text-emerald-900 dark:text-emerald-200">
                  Pesan Anda siap dikirim ke WhatsApp!
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Jika tab WhatsApp belum terbuka otomatis, silakan klik tombol WhatsApp langsung di samping.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs font-semibold underline text-emerald-800 dark:text-emerald-200"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      No. WhatsApp / HP
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Pertanyaan / Kebutuhan
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ceritakan apa yang bisa kami bantu..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className={primaryBtn.className + ' w-full py-3 text-base flex items-center justify-center gap-2'}
                  style={primaryBtn.style}
                >
                  <Send className="w-4 h-4" />
                  Kirim Pesan ke WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
