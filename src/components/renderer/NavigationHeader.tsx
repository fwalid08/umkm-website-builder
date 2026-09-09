import React, { useState, useRef, useEffect } from 'react';
import { WebsiteConfig, SectionConfig } from '../../types/project';
import { getWhatsAppLink } from '../../lib/themes/themeUtils';
import { filterActiveNavItems } from '../../lib/utils/navigationUtils';
import { Menu, X, MessageCircle, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';

interface NavigationHeaderProps {
  config: WebsiteConfig;
  activePageSlug?: string;
  onPageChange?: (slug: string) => void;
  sections?: SectionConfig[];
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  config,
  activePageSlug = '',
  onPageChange,
  sections,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const nav = config.navigation;
  const business = config.business;
  const primaryColor = config.branding.primaryColor || '#2563eb';

  // Determine current active sections
  const activePage =
    (config.pages || []).find((p) => (p.slug || '') === activePageSlug) ||
    config.pages?.[0];
  const currentSections = sections || activePage?.sections || [];

  // Close overflow dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent, url: string) => {
    if (url.startsWith('#')) {
      // Single-page anchor
      const targetId = url.replace('#', '');
      const el =
        document.getElementById(targetId) ||
        document.querySelector(`[data-section-type="${targetId}"]`) ||
        document.querySelector(`[data-section-id="${targetId}"]`) ||
        document.querySelector(`[id*="${targetId}"]`);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        setDropdownOpen(false);
      }
    } else if (url.startsWith('/') && onPageChange) {
      // Multi-page slug
      e.preventDefault();
      const slug = url.replace('/', '');
      onPageChange(slug);
      setMobileMenuOpen(false);
      setDropdownOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const ctaUrl = nav.ctaUrl || getWhatsAppLink(config);

  // Filter navigation items: if section is missing/hidden, omit from navigation!
  const rawItems = nav.items || [];
  const allItems = filterActiveNavItems(rawItems, currentSections, config.pages);
  const maxVisible = 4;
  const visibleItems = allItems.slice(0, maxVisible);
  const overflowItems = allItems.slice(maxVisible);

  // Logo config
  const logoUrl = business.logoUrl || business.logo || nav.logoImage;
  const logoHeight = business.logoHeight || 38;
  const showLogoWithText = business.showLogoWithText !== false;
  const logoText = business.logoText || nav.logoText || business.name;

  return (
    <header
      className={`w-full z-40 transition-all ${
        nav.sticky
          ? 'sticky top-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-xs'
          : 'bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onPageChange) onPageChange('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={business.name || 'Logo Bisnis'}
              style={{ height: `${logoHeight}px` }}
              className="w-auto object-contain max-w-[180px] group-hover:opacity-95 transition-opacity"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-md group-hover:scale-105 transition-transform"
              style={{ backgroundColor: primaryColor }}
            >
              {business.name ? business.name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}

          {/* Business Name & Tagline if enabled */}
          {(showLogoWithText || !logoUrl) && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {logoText}
              </span>
              {business.tagline && (
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-normal leading-tight line-clamp-1 max-w-[200px] sm:max-w-xs">
                  {business.tagline}
                </span>
              )}
            </div>
          )}
        </a>

        {/* Desktop Navigation with Overflow Dropdown */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Main visible items */}
          <div className="flex items-center gap-6">
            {visibleItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => handleNavClick(e, item.url)}
                className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Overflow Menu Dropdown when items > 4 */}
          {overflowItems.length > 0 && (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  dropdownOpen
                    ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-400 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-50 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                <span>Menu Lainnya</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50 animate-fade-in">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Navigasi Tambahan
                  </div>
                  {overflowItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      onClick={(e) => handleNavClick(e, item.url)}
                      className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CTA WhatsApp Button */}
          {nav.showCtaButton && (
            <a
              href={ctaUrl}
              target={ctaUrl.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-95 active:scale-95 transition-all cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {nav.ctaText || 'Chat WhatsApp'}
            </a>
          )}
        </nav>

        {/* Mobile Actions: WhatsApp quick icon + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {nav.showCtaButton && (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-white shadow-sm flex items-center justify-center cursor-pointer active:scale-95"
              style={{ backgroundColor: primaryColor }}
              aria-label="Chat WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Native-style Mobile Slide Drawer with Backdrop */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white/98 dark:bg-gray-950/98 backdrop-blur-xl px-5 pt-3 pb-8 space-y-3 animate-fade-in shadow-2xl">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Menu Halaman
          </div>
          <div className="space-y-1">
            {allItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => handleNavClick(e, item.url)}
                className="flex items-center justify-between py-3 px-3 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>

          {nav.showCtaButton && (
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white shadow-md active:scale-98 transition-all"
                style={{ backgroundColor: primaryColor }}
              >
                <MessageCircle className="w-4 h-4" />
                {nav.ctaText || 'Hubungi Kami via WhatsApp'}
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
