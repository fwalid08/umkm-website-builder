import React from 'react';
import { SectionProps } from '../../types/section';
import { getWhatsAppLink } from '../../lib/themes/themeUtils';
import { filterActiveNavItems } from '../../lib/utils/navigationUtils';
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const FooterSection: React.FC<SectionProps> = ({ section, config }) => {
  const footer = config.footer || {
    showBusinessInfo: true,
    showSocials: true,
    showQuickLinks: true,
    showOpeningHours: true,
    showContact: true,
    showWhatsAppButton: true,
    columnsCount: 4,
  };
  const business = config.business;
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'whatsapp': return <MessageCircle className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  const enabledSocials = (config.social || []).filter((s) => s.enabled && s.url);

  // Filter navigation links to only show existing, active sections
  const activePage = config.pages?.[0];
  const activeSections = activePage?.sections || [];
  const quickLinks = filterActiveNavItems(config.navigation.items || [], activeSections, config.pages);

  // Column counts configuration
  const cols = footer.columnsCount || 4;
  const gridClass =
    cols === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : cols === 3
      ? 'grid-cols-1 md:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

  const themeStyle = footer.themeStyle || 'dark';
  const isLight = themeStyle === 'light';

  const bgClasses = isLight
    ? 'bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800'
    : themeStyle === 'brand'
    ? 'bg-gradient-to-b from-gray-900 to-black text-gray-300 border-t border-gray-800'
    : 'bg-gray-950 text-gray-300 border-t border-gray-800';

  const headingClasses = isLight
    ? 'font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4'
    : 'font-bold text-sm text-white uppercase tracking-wider mb-4';

  const copyrightText = (footer.copyrightText || 'Hak Cipta Dilindungi.')
    .replace('{year}', currentYear.toString());

  const showBusiness = footer.showBusinessInfo !== false;
  const showQuickLinks = footer.showQuickLinks !== false;
  const showHours = footer.showOpeningHours !== false;
  const showContact = footer.showContact !== false;
  const showSocials = footer.showSocials !== false && enabledSocials.length > 0;
  const showWhatsApp = footer.showWhatsAppButton !== false;

  return (
    <footer className={`${bgClasses} pt-16 pb-12 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid ${gridClass} gap-10 pb-12 border-b ${isLight ? 'border-gray-200 dark:border-gray-800' : 'border-gray-800/80'}`}>
          {/* Col 1: Business Identity */}
          {showBusiness && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                {business.logoUrl || business.logo ? (
                  <img
                    src={business.logoUrl || business.logo}
                    alt={business.name}
                    className="h-8 sm:h-9 object-contain"
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-base shadow-sm"
                    style={{ backgroundColor: config.branding.primaryColor || '#2563eb' }}
                  >
                    {business.name.charAt(0) || 'U'}
                  </div>
                )}
                <span className={`font-black text-lg tracking-tight ${isLight ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                  {business.name}
                </span>
              </div>

              {footer.badgeText && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{footer.badgeText}</span>
                </div>
              )}

              <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400'}`}>
                {footer.customDescription || business.description || business.tagline}
              </p>

              {showSocials && (
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  {enabledSocials.map((soc) => (
                    <a
                      key={soc.id}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isLight
                          ? 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 shadow-xs'
                          : 'bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white'
                      }`}
                      title={soc.platform}
                    >
                      {getSocialIcon(soc.platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Col 2: Navigation Links */}
          {showQuickLinks && quickLinks.length > 0 && (
            <div>
              <h4 className={headingClasses}>
                {footer.quickLinksTitle || 'Navigasi Cepat'}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {quickLinks.map((nav) => (
                  <li key={nav.id}>
                    <a
                      href={nav.url}
                      className={`block py-0.5 transition-colors ${
                        isLight
                          ? 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {nav.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Col 3: Business Hours */}
          {showHours && (
            <div>
              <h4 className={headingClasses}>
                {footer.openingHoursTitle || 'Jam Operasional'}
              </h4>
              <div className={`space-y-2.5 text-xs ${isLight ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400'}`}>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5 opacity-70" />
                  <p>{business.openingHours || 'Senin - Sabtu: 08.00 - 17.00 WIB'}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-semibold pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Buka & Siap Melayani Konsultasi</span>
                </div>
              </div>
            </div>
          )}

          {/* Col 4: Contact & WhatsApp */}
          {showContact && (
            <div>
              <h4 className={headingClasses}>
                {footer.contactTitle || 'Hubungi Kami'}
              </h4>
              <div className={`space-y-2.5 text-xs ${isLight ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400'}`}>
                {business.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 opacity-70" />
                    <p>{business.address}{business.city ? `, ${business.city}` : ''}</p>
                  </div>
                )}
                {business.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 shrink-0 opacity-70" />
                    <a
                      href={`tel:${business.phone}`}
                      className="hover:underline"
                    >
                      {business.phone}
                    </a>
                  </div>
                )}
                {business.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 shrink-0 opacity-70" />
                    <a
                      href={`mailto:${business.email}`}
                      className="hover:underline"
                    >
                      {business.email}
                    </a>
                  </div>
                )}
                {showWhatsApp && (
                  <div className="pt-2">
                    <a
                      href={getWhatsAppLink(config)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2.5 rounded-xl text-white shadow-md hover:opacity-95 transition-transform hover:scale-[1.02] active:scale-95"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{footer.whatsAppButtonText || 'Chat WhatsApp'}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
          <div className="space-y-1 text-center sm:text-left">
            <p>
              © {currentYear} <span className="font-semibold">{business.name}</span>. {copyrightText}
            </p>
            {footer.bottomNote && (
              <p className="text-[11px] opacity-80">
                {footer.bottomNote}
              </p>
            )}
          </div>
          {footer.showAttribution !== false && (
            <p className="text-[11px] opacity-70 text-center sm:text-right">
              {footer.attributionText || 'Dibuat dengan SitusUMKM Template Engine'}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};
