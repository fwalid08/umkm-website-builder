import React, { Component, useState } from 'react';
import { WebsiteConfig, SectionConfig, ViewportMode } from '../../types/project';
import { SectionRegistry } from '../../lib/registries/SectionRegistry';
import { NavigationHeader } from './NavigationHeader';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { GoToTop } from './GoToTop';
import { AlertCircle } from 'lucide-react';

interface WebsiteRendererProps {
  config: WebsiteConfig;
  isBuilder?: boolean;
  selectedSectionId?: string | null;
  onSelectSection?: (sectionId: string) => void;
  onSectionSelect?: (section: SectionConfig) => void;
  activePageSlug?: string;
  currentPageId?: string;
  viewport?: ViewportMode;
  onPageChange?: (slug: string) => void;
}

interface ErrorBoundaryProps {
  sectionType: string;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo?: string;
}

class SectionErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, errorInfo: String(error) };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Section render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 my-4 mx-auto max-w-xl text-center border-2 border-dashed border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 rounded-2xl">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">
            Bagian "{this.props.sectionType}" Tidak Dapat Ditampilkan
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            Konfigurasi bagian ini sedang diperbaiki atau belum lengkap.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export const WebsiteRenderer: React.FC<WebsiteRendererProps> = ({
  config,
  isBuilder = false,
  selectedSectionId,
  onSelectSection,
  onSectionSelect,
  activePageSlug: externalActiveSlug,
  currentPageId,
  viewport = 'desktop',
  onPageChange: externalPageChange,
}) => {
  const [internalPageSlug, setInternalPageSlug] = useState('');
  const activeSlug = externalActiveSlug !== undefined ? externalActiveSlug : internalPageSlug;
  const handlePageChange = externalPageChange || setInternalPageSlug;

  if (!config) return null;

  // Find active page by id or slug
  const pages = config.pages || [];
  let currentPage = currentPageId
    ? pages.find((p) => p.id === currentPageId)
    : pages.find((p) => (p.slug || '') === activeSlug);
  if (!currentPage && pages.length > 0) {
    currentPage = pages[0];
  }

  const sections: SectionConfig[] = currentPage ? currentPage.sections : [];

  // Theme style calculations
  const themeMode = config.theme?.mode === 'dark' ? 'dark' : 'light';
  const headingFont = config.branding?.fontHeading || 'Plus Jakarta Sans';
  const bodyFont = config.branding?.fontBody || 'Inter';
  const isSmoothScroll = config.smoothScroll !== false;
  const isAnimationEnabled = config.animations?.enabled !== false;

  return (
    <div
      id="website-preview-root"
      data-theme={themeMode}
      className={`min-h-screen text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-950 transition-colors ${
        themeMode === 'dark' ? 'dark' : ''
      } ${isSmoothScroll ? 'scroll-smooth' : ''} ${
        viewport === 'mobile' ? 'mobile-viewport antialiased text-[15px]' : ''
      }`}
      style={{
        fontFamily: `"${bodyFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
        scrollBehavior: isSmoothScroll ? 'smooth' : 'auto',
        ['--primary-color' as any]: config.branding?.primaryColor || '#2563eb',
        ['--secondary-color' as any]: config.branding?.secondaryColor || '#1e293b',
        ['--accent-color' as any]: config.branding?.accentColor || '#f59e0b',
      }}
    >
      {/* Scoped Custom CSS if provided */}
      {config.customCss && (
        <style
          dangerouslySetInnerHTML={{
            __html: `\n/* User Custom CSS */\n${config.customCss}\n`,
          }}
        />
      )}

      {/* Global Navigation Header */}
      <NavigationHeader
        config={config}
        activePageSlug={activeSlug}
        onPageChange={handlePageChange}
        sections={sections}
      />

      {/* Main Page Sections */}
      <main className={`w-full ${isAnimationEnabled ? 'transition-opacity duration-300' : ''}`}>
        {sections.length === 0 ? (
          <div className="py-24 text-center px-4">
            <div className="max-w-md mx-auto p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl bg-gray-50/60 dark:bg-gray-900/60">
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                Halaman Ini Belum Memiliki Bagian
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Tambahkan bagian pertama dari panel kiri untuk mulai menyusun website bisnis Anda.
              </p>
            </div>
          </div>
        ) : (
          sections.map((section) => {
            if (section.hidden) return null;
            const Component = SectionRegistry.getComponent(section.type);
            const isSelected = isBuilder && selectedSectionId === section.id;

            return (
              <div
                key={section.id}
                id={section.id}
                data-section-type={section.type}
                data-section-id={section.id}
                onClick={
                  isBuilder
                    ? () => {
                        onSelectSection?.(section.id);
                        onSectionSelect?.(section);
                      }
                    : undefined
                }
                className={`relative transition-all ${
                  isAnimationEnabled ? 'animate-fade-in' : ''
                } ${
                  isBuilder
                    ? `cursor-pointer hover:ring-2 hover:ring-blue-400/60 ${
                        isSelected
                          ? 'ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-950 shadow-md'
                          : ''
                      }`
                    : ''
                }`}
              >
                {/* Builder badge label */}
                {isBuilder && (
                  <div
                    className={`absolute top-2 left-4 z-30 text-[10px] font-bold px-2 py-0.5 rounded shadow transition-opacity ${
                      isSelected
                        ? 'bg-blue-600 text-white opacity-100'
                        : 'bg-gray-900/80 text-white opacity-0 hover:opacity-100'
                    }`}
                  >
                    {SectionRegistry.get(section.type)?.name || section.type} ({section.style})
                  </div>
                )}

                {/* Anchor alias target */}
                <span id={section.type} className="absolute -top-24 pointer-events-none invisible" />

                <SectionErrorBoundary sectionType={section.type}>
                  <Component
                    section={section}
                    config={config}
                    isBuilder={isBuilder}
                    isSelected={isSelected}
                  />
                </SectionErrorBoundary>
              </div>
            );
          })
        )}
      </main>

      {/* Floating Elements */}
      <FloatingWhatsApp config={config} />
      <GoToTop config={config} />
    </div>
  );
};
