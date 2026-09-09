import React, { useState } from 'react';
import { WebsiteConfig, SectionConfig, SectionType } from '../../types/project';
import {
  Layers,
  Building2,
  Palette,
  Compass,
  Search,
  Sliders,
  Code,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Copy,
  Plus,
  MessageSquare,
  Sparkles,
  Sun,
  Moon,
  Image as ImageIcon,
  Check,
  Globe,
  ExternalLink,
  Share2,
  HelpCircle,
} from 'lucide-react';

interface BuilderSidebarProps {
  config: WebsiteConfig;
  onUpdateConfig: (newConfig: WebsiteConfig) => void;
  onOpenAddSection: () => void;
  onEditSection: (section: SectionConfig) => void;
  currentPageIndex: number;
  isBuilderDark?: boolean;
  onToggleBuilderTheme?: () => void;
}

const COLOR_PRESETS = [
  { name: 'Nusantara Spice', primary: '#c2410c', secondary: '#1c1917' },
  { name: 'Coffee Amber', primary: '#78350f', secondary: '#292524' },
  { name: 'Trust Blue', primary: '#0284c7', secondary: '#0f172a' },
  { name: 'Vintage Barber', primary: '#b45309', secondary: '#09090b' },
  { name: 'Rose Beauty', primary: '#db2777', secondary: '#374151' },
  { name: 'Clean Emerald', primary: '#059669', secondary: '#0f172a' },
  { name: 'Industrial Orange', primary: '#ea580c', secondary: '#0f172a' },
  { name: 'Corporate Navy', primary: '#1e40af', secondary: '#0f172a' },
  { name: 'Forest Green', primary: '#15803d', secondary: '#1e293b' },
  { name: 'Modern Indigo', primary: '#6366f1', secondary: '#0f172a' },
];

const LOGO_PRESETS = [
  { name: 'Emblem Klasik', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80' },
  { name: 'Kafe & Resto', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=160&q=80' },
  { name: 'Bengkel & Teknik', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=160&q=80' },
  { name: 'Studio & Fashion', url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=160&q=80' },
];

const FONTS_HEADING = [
  'Plus Jakarta Sans',
  'Playfair Display',
  'Poppins',
  'Inter',
  'Montserrat',
  'DM Sans',
];

const FONTS_BODY = ['Plus Jakarta Sans', 'Inter', 'DM Sans'];

export const BuilderSidebar: React.FC<BuilderSidebarProps> = ({
  config,
  onUpdateConfig,
  onOpenAddSection,
  onEditSection,
  currentPageIndex,
  isBuilderDark = false,
  onToggleBuilderTheme,
}) => {
  const [activeTab, setActiveTab] = useState<
    'sections' | 'business' | 'branding' | 'navigation' | 'seo' | 'footer' | 'code'
  >('sections');

  const currentPage = config.pages[currentPageIndex] || config.pages[0];
  const sections = currentPage ? currentPage.sections : [];

  // Helper to reorder sections
  const moveSection = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(idx, 1);
    newSections.splice(targetIdx, 0, moved);

    const updatedPages = [...config.pages];
    updatedPages[currentPageIndex] = {
      ...currentPage,
      sections: newSections,
    };

    onUpdateConfig({ ...config, pages: updatedPages });
  };

  // Helper to toggle visibility
  const toggleVisibility = (idx: number) => {
    const newSections = [...sections];
    newSections[idx] = {
      ...newSections[idx],
      hidden: !newSections[idx].hidden,
    };

    const updatedPages = [...config.pages];
    updatedPages[currentPageIndex] = {
      ...currentPage,
      sections: newSections,
    };

    onUpdateConfig({ ...config, pages: updatedPages });
  };

  // Helper to duplicate section
  const duplicateSection = (idx: number) => {
    const sectionToDup = sections[idx];
    const duplicated: SectionConfig = {
      ...sectionToDup,
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };

    const newSections = [...sections];
    newSections.splice(idx + 1, 0, duplicated);

    const updatedPages = [...config.pages];
    updatedPages[currentPageIndex] = {
      ...currentPage,
      sections: newSections,
    };

    onUpdateConfig({ ...config, pages: updatedPages });
  };

  // Helper to delete section
  const deleteSection = (idx: number) => {
    if (sections.length <= 1) {
      alert('Halaman setidaknya harus memiliki satu bagian.');
      return;
    }
    const newSections = sections.filter((_, i) => i !== idx);
    const updatedPages = [...config.pages];
    updatedPages[currentPageIndex] = {
      ...currentPage,
      sections: newSections,
    };

    onUpdateConfig({ ...config, pages: updatedPages });
  };

  return (
    <aside className="w-80 sm:w-96 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col shrink-0 select-none z-20">
      {/* Tab Navigation */}
      <div className="flex items-center border-b border-gray-200 dark:border-gray-800 overflow-x-auto p-1.5 gap-1 bg-gray-50/50 dark:bg-gray-950/40">
        {[
          { id: 'sections', label: 'Bagian', icon: Layers },
          { id: 'business', label: 'Bisnis & Logo', icon: Building2 },
          { id: 'branding', label: 'Tema & Desain', icon: Palette },
          { id: 'navigation', label: 'Navigasi', icon: Compass },
          { id: 'seo', label: 'SEO Lengkap', icon: Search },
          { id: 'footer', label: 'Footer', icon: Sliders },
          { id: 'code', label: 'CSS/JS', icon: Code },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* 1. SECTIONS TAB */}
        {activeTab === 'sections' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Susunan Bagian Halaman
                </h3>
                <p className="text-[11px] text-gray-500">
                  {sections.length} bagian di halaman ini
                </p>
              </div>
              <button
                onClick={onOpenAddSection}
                className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah
              </button>
            </div>

            <div className="space-y-2">
              {sections.map((section, idx) => (
                <div
                  key={section.id}
                  className={`p-3 rounded-2xl border transition-all ${
                    section.hidden
                      ? 'bg-gray-50 dark:bg-gray-900/40 border-dashed border-gray-300 dark:border-gray-800 opacity-60'
                      : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 shadow-xs hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-gray-900 dark:text-white capitalize block">
                          {section.type}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {section.style || 'standar'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveSection(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-20 cursor-pointer"
                        title="Geser ke Atas"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveSection(idx, 'down')}
                        disabled={idx === sections.length - 1}
                        className="p-1 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-20 cursor-pointer"
                        title="Geser ke Bawah"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleVisibility(idx)}
                        className={`p-1 rounded cursor-pointer ${
                          section.hidden ? 'text-amber-500' : 'text-gray-400 hover:text-gray-700'
                        }`}
                        title={section.hidden ? 'Tampilkan' : 'Sembunyikan'}
                      >
                        {section.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-700/60">
                    <button
                      onClick={() => onEditSection(section)}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit Konten
                    </button>
                    <button
                      onClick={() => duplicateSection(idx)}
                      className="p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      title="Duplikat Bagian"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteSection(idx)}
                      className="p-1.5 rounded-xl border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer"
                      title="Hapus Bagian"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenAddSection}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-800 text-xs font-bold text-gray-500 hover:text-blue-600 hover:border-blue-400 dark:hover:border-blue-500 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Tambah Bagian Baru
            </button>
          </div>
        )}

        {/* 2. BUSINESS TAB (WITH LOGO SUPPORT) */}
        {activeTab === 'business' && (
          <div className="space-y-4">
            {/* Logo Brand Section */}
            <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl border border-blue-200/80 dark:border-blue-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                  Logo Bisnis / Brand
                </span>
                {config.business.logoUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateConfig({
                        ...config,
                        business: { ...config.business, logoUrl: '', logo: '' },
                      })
                    }
                    className="text-[11px] text-red-500 hover:underline cursor-pointer"
                  >
                    Hapus Logo
                  </button>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Preset Logo Cepat
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {LOGO_PRESETS.map((lp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        onUpdateConfig({
                          ...config,
                          business: { ...config.business, logoUrl: lp.url, logo: lp.url },
                        })
                      }
                      className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center gap-2 text-left cursor-pointer"
                    >
                      <img src={lp.url} alt={lp.name} className="w-6 h-6 rounded object-cover" />
                      <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 truncate">
                        {lp.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  URL Gambar Logo (Link Gambar Sendiri)
                </label>
                <input
                  type="text"
                  value={config.business.logoUrl || config.business.logo || ''}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      business: { ...config.business, logoUrl: e.target.value, logo: e.target.value },
                    })
                  }
                  placeholder="https://domain.com/logo.png"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                />
              </div>

              {/* Logo Height Slider */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  <span>Tinggi Ukuran Logo</span>
                  <span className="font-mono font-bold">{config.business.logoHeight || 38}px</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="64"
                  step="2"
                  value={config.business.logoHeight || 38}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      business: { ...config.business, logoHeight: parseInt(e.target.value, 10) },
                    })
                  }
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Show text with logo toggle */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  Tampilkan Nama Bisnis di Samping Logo
                </span>
                <input
                  type="checkbox"
                  checked={config.business.showLogoWithText !== false}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      business: { ...config.business, showLogoWithText: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Nama Usaha / Brand
              </label>
              <input
                type="text"
                value={config.business.name}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    business: { ...config.business, name: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Slogan / Tagline
              </label>
              <input
                type="text"
                value={config.business.tagline}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    business: { ...config.business, tagline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Deskripsi Singkat Usaha
              </label>
              <textarea
                rows={3}
                value={config.business.description}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    business: { ...config.business, description: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  value={config.business.phone}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      business: { ...config.business, phone: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Email Usaha
                </label>
                <input
                  type="email"
                  value={config.business.email}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      business: { ...config.business, email: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Alamat Lengkap & Kota
              </label>
              <input
                type="text"
                value={config.business.address}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    business: { ...config.business, address: e.target.value },
                  })
                }
                placeholder="Jl. Raya Utama No. 12"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-2"
              />
              <input
                type="text"
                value={config.business.city}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    business: { ...config.business, city: e.target.value },
                  })
                }
                placeholder="Kota (mis. Bandung)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Jam Operasional
              </label>
              <input
                type="text"
                value={config.business.openingHours}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    business: { ...config.business, openingHours: e.target.value },
                  })
                }
                placeholder="Senin - Minggu: 08.00 - 21.00 WIB"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* WhatsApp Integration Block */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <MessageSquare className="w-4 h-4" />
                  Pengaturan WhatsApp
                </div>
                <input
                  type="checkbox"
                  checked={config.whatsapp.enabled}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      whatsapp: { ...config.whatsapp, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Nomor WhatsApp (Contoh: 6281234567890)
                </label>
                <input
                  type="text"
                  value={config.whatsapp.number}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      whatsapp: { ...config.whatsapp, number: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Pesan Pembuka Otomatis (Default Message)
                </label>
                <textarea
                  rows={2}
                  value={config.whatsapp.defaultMessage}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      whatsapp: { ...config.whatsapp, defaultMessage: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. BRANDING & THEME TAB (INDEPENDENT WEBSITE THEME MODE, ANIMATION, SMOOTH SCROLL, GO TO TOP) */}
        {activeTab === 'branding' && (
          <div className="space-y-5">
            {/* OPSI TEMA WEBSITE PUBLIK (GENERATED WEBSITE THEME) */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-900 dark:text-white block">
                    1. Mode Tema Website Publik (Hasil Generated Web)
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Atur tema yang dilihat pengunjung saat membuka website ini
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    onUpdateConfig({
                      ...config,
                      theme: { ...config.theme, mode: 'light' },
                    })
                  }
                  className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    config.theme.mode === 'light'
                      ? 'bg-white text-blue-600 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" /> Mode Terang (Light)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateConfig({
                      ...config,
                      theme: { ...config.theme, mode: 'dark' },
                    })
                  }
                  className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    config.theme.mode === 'dark'
                      ? 'bg-gray-900 text-white border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-blue-400" /> Mode Gelap (Dark)
                </button>
              </div>
            </div>

            {/* OPSI TEMA RUANG KERJA BUILDER (SEPARATED BUILDER THEME) */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-900 dark:text-white block">
                    2. Tema Antarmuka Editor Builder
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Khusus tampilan sidebar & panel builder, terpisah dari website publik
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (isBuilderDark && onToggleBuilderTheme) onToggleBuilderTheme();
                  }}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    !isBuilderDark
                      ? 'bg-white text-blue-600 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" /> Builder Terang
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!isBuilderDark && onToggleBuilderTheme) onToggleBuilderTheme();
                  }}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isBuilderDark
                      ? 'bg-gray-900 text-white border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-blue-400" /> Builder Gelap
                </button>
              </div>
            </div>

            {/* ANIMASI PADA GENERATED WEBSITE */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-900 dark:text-white block">
                    Animasi Website Publik
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Transisi visual halus saat pengunjung membuka seksi website
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={config.animations.enabled}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      animations: { ...config.animations, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>
              {config.animations.enabled && (
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {(['smooth', 'subtle', 'energetic', 'fade'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() =>
                        onUpdateConfig({
                          ...config,
                          animations: { ...config.animations, preset: p },
                        })
                      }
                      className={`py-1 text-[11px] font-bold rounded-lg border capitalize transition-all cursor-pointer ${
                        config.animations.preset === p
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SMOOTH SCROLLING */}
            <div className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div>
                <span className="text-xs font-bold text-gray-900 dark:text-white block">
                  Smooth Scrolling (Gulir Mulus)
                </span>
                <span className="text-[11px] text-gray-500">
                  Navigasi ke anchor seksi dengan gerakan gulir halus
                </span>
              </div>
              <input
                type="checkbox"
                checked={config.smoothScroll !== false}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    smoothScroll: e.target.checked,
                  })
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </div>

            {/* TOMBOL GO TO TOP */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-900 dark:text-white block">
                    Tombol Go To Top (Ke Atas)
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Tombol melayang untuk kembali ke atas halaman saat digulir
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={config.goToTop.enabled}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      goToTop: { ...config.goToTop, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>
              {config.goToTop.enabled && (
                <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                    Posisi Tombol:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateConfig({
                          ...config,
                          goToTop: { ...config.goToTop, position: 'bottom-left' },
                        })
                      }
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border cursor-pointer ${
                        config.goToTop.position === 'bottom-left'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      Kiri Bawah
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateConfig({
                          ...config,
                          goToTop: { ...config.goToTop, position: 'bottom-right' },
                        })
                      }
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border cursor-pointer ${
                        config.goToTop.position !== 'bottom-left'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      Kanan Bawah
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-2">
                Palet Warna Cepat UMKM
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() =>
                      onUpdateConfig({
                        ...config,
                        branding: {
                          ...config.branding,
                          primaryColor: p.primary,
                          secondaryColor: p.secondary,
                        },
                      })
                    }
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      config.branding.primaryColor === p.primary
                        ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/30'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: p.primary }}
                    />
                    <span className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Warna Primer
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.branding.primaryColor}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        branding: { ...config.branding, primaryColor: e.target.value },
                      })
                    }
                    className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={config.branding.primaryColor}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        branding: { ...config.branding, primaryColor: e.target.value },
                      })
                    }
                    className="flex-1 px-2 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Warna Aksen
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.branding.accentColor || '#f59e0b'}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        branding: { ...config.branding, accentColor: e.target.value },
                      })
                    }
                    className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={config.branding.accentColor || '#f59e0b'}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        branding: { ...config.branding, accentColor: e.target.value },
                      })
                    }
                    className="flex-1 px-2 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Font Judul (Heading)
              </label>
              <select
                value={config.branding.fontHeading}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    branding: { ...config.branding, fontHeading: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
              >
                {FONTS_HEADING.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Font Isi (Body Text)
              </label>
              <select
                value={config.branding.fontBody}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    branding: { ...config.branding, fontBody: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
              >
                {FONTS_BODY.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Kelengkungan Sudut (Border Radius)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['none', 'sm', 'md', 'lg'] as const).map((rad) => (
                  <button
                    key={rad}
                    onClick={() =>
                      onUpdateConfig({
                        ...config,
                        branding: { ...config.branding, borderRadius: rad },
                      })
                    }
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg border capitalize cursor-pointer ${
                      config.branding.borderRadius === rad
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {rad}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. NAVIGATION TAB */}
        {activeTab === 'navigation' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div>
                <span className="text-xs font-bold text-gray-900 dark:text-white block">
                  Header Menempel (Sticky)
                </span>
                <span className="text-[11px] text-gray-500">
                  Header tetap berada di atas saat halaman digulir
                </span>
              </div>
              <input
                type="checkbox"
                checked={config.navigation.sticky}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    navigation: { ...config.navigation, sticky: e.target.checked },
                  })
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  Tombol Aksi di Header
                </span>
                <input
                  type="checkbox"
                  checked={config.navigation.showCtaButton}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      navigation: { ...config.navigation, showCtaButton: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>

              {config.navigation.showCtaButton && (
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                    Teks Tombol Aksi
                  </label>
                  <input
                    type="text"
                    value={config.navigation.ctaText || ''}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        navigation: { ...config.navigation, ctaText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Daftar Tautan Menu Navigasi
                </label>
                <span className="text-[10px] text-gray-500">
                  Menu ke-5 dst otomatis masuk dropdown
                </span>
              </div>
              <div className="space-y-2">
                {config.navigation.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-[10px] font-mono font-bold text-gray-400 pl-1">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => {
                        const newItems = [...config.navigation.items];
                        newItems[idx].label = e.target.value;
                        onUpdateConfig({
                          ...config,
                          navigation: { ...config.navigation, items: newItems },
                        });
                      }}
                      className="flex-1 px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-transparent"
                    />
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => {
                        const newItems = [...config.navigation.items];
                        newItems[idx].url = e.target.value;
                        onUpdateConfig({
                          ...config,
                          navigation: { ...config.navigation, items: newItems },
                        });
                      }}
                      className="w-24 px-2 py-1 text-xs font-mono rounded border border-gray-200 dark:border-gray-700 bg-transparent"
                    />
                    <button
                      onClick={() => {
                        const newItems = config.navigation.items.filter((_, i) => i !== idx);
                        onUpdateConfig({
                          ...config,
                          navigation: { ...config.navigation, items: newItems },
                        });
                      }}
                      className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const newItem = {
                    id: `nav-${Date.now()}`,
                    label: 'Menu Baru',
                    url: '#services',
                  };
                  onUpdateConfig({
                    ...config,
                    navigation: {
                      ...config.navigation,
                      items: [...config.navigation.items, newItem],
                    },
                  });
                }}
                className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Tautan Menu
              </button>
            </div>
          </div>
        )}

        {/* 5. SEO TAB (COMPREHENSIVE SEO: TITLE, KEYWORDS, DESCRIPTION, SOCIAL SHARE, SERP PREVIEW) */}
        {activeTab === 'seo' && (
          <div className="space-y-4">
            {/* Google SERP Live Search Preview */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                Pratinjau Hasil Pencarian Google (SERP)
              </div>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 truncate font-mono">
                  <Globe className="w-3 h-3" />
                  <span>https://{config.seo.canonicalUrl || 'nama-usaha.com'}</span>
                </div>
                <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 line-clamp-1 hover:underline cursor-pointer">
                  {config.seo.title || `${config.business.name} - ${config.business.tagline}`}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {config.seo.description || config.business.description || 'Deskripsi singkat website Anda.'}
                </p>
              </div>
            </div>

            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Judul Google (Meta Title)
                </label>
                <span className={`text-[10px] font-mono ${
                  (config.seo.title?.length || 0) > 60 ? 'text-amber-500' : 'text-gray-400'
                }`}>
                  {config.seo.title?.length || 0}/60 Karakter
                </span>
              </div>
              <input
                type="text"
                value={config.seo.title || ''}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    seo: { ...config.seo, title: e.target.value },
                  })
                }
                placeholder="Contoh: Bengkel Mobil Terpercaya Bandung - Bergaransi Resmi"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Deskripsi Cuplikan (Meta Description)
                </label>
                <span className={`text-[10px] font-mono ${
                  (config.seo.description?.length || 0) > 160 ? 'text-amber-500' : 'text-gray-400'
                }`}>
                  {config.seo.description?.length || 0}/160 Karakter
                </span>
              </div>
              <textarea
                rows={3}
                value={config.seo.description || ''}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    seo: { ...config.seo, description: e.target.value },
                  })
                }
                placeholder="Ringkasan jelas mengenai produk, jasa, lokasi usaha, dan nomor kontak yang mudah ditemukan di Google."
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Kata Kunci Pencarian (Keywords - Pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={
                  Array.isArray(config.seo.keywords)
                    ? config.seo.keywords.join(', ')
                    : config.seo.keywords || ''
                }
                onChange={(e) => {
                  const parts = e.target.value.split(',').map((k) => k.trim());
                  onUpdateConfig({
                    ...config,
                    seo: { ...config.seo, keywords: parts },
                  });
                }}
                placeholder="bengkel mobil, service ac mobil, ganti oli, bandung"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {(Array.isArray(config.seo.keywords) ? config.seo.keywords : []).filter(Boolean).map((kw, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Canonical URL & Domain */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Domain / Canonical URL
              </label>
              <input
                type="text"
                value={config.seo.canonicalUrl || ''}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    seo: { ...config.seo, canonicalUrl: e.target.value },
                  })
                }
                placeholder="https://usahaanda.com"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
              />
            </div>

            {/* Social Media Open Graph */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-gray-200">
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                Sosial Media Sharing (Open Graph & WhatsApp Preview)
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                  URL Foto Preview Share (OG Image)
                </label>
                <input
                  type="text"
                  value={config.seo.ogImage || ''}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      seo: { ...config.seo, ogImage: e.target.value },
                    })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                  Judul Khusus Share Sosial (OG Title)
                </label>
                <input
                  type="text"
                  value={config.seo.ogTitle || ''}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      seo: { ...config.seo, ogTitle: e.target.value },
                    })
                  }
                  placeholder="Gunakan judul yang sama atau khusus promo"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                  Tipe Twitter Card
                </label>
                <select
                  value={config.seo.twitterCard || 'summary_large_image'}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      seo: { ...config.seo, twitterCard: e.target.value as any },
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
                >
                  <option value="summary_large_image">Kartu Foto Lebar (Large Image)</option>
                  <option value="summary">Kartu Kotak Kecil (Summary)</option>
                </select>
              </div>
            </div>

            {/* Schema.org Business Type */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Tipe Skema Bisnis (Schema.org Structured Data)
              </label>
              <select
                value={config.seo.schemaType || 'LocalBusiness'}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    seo: { ...config.seo, schemaType: e.target.value as any },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="LocalBusiness">LocalBusiness (Usaha Lokal Umum)</option>
                <option value="Restaurant">Restaurant (Restoran / Kafe / F&B)</option>
                <option value="Store">Store (Toko Online / Retail)</option>
                <option value="ProfessionalService">ProfessionalService (Konsultan / Jasa)</option>
                <option value="Organization">Organization (Organisasi / Perusahaan)</option>
              </select>
            </div>

            {/* Robots & Language */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Robot Pengindeksan
                </label>
                <select
                  value={config.seo.robots || 'index, follow'}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      seo: { ...config.seo, robots: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
                >
                  <option value="index, follow">Index, Follow (Bisa dicari)</option>
                  <option value="noindex, nofollow">Noindex, Nofollow (Privat)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Bahasa Website
                </label>
                <select
                  value={config.seo.language || 'id'}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      seo: { ...config.seo, language: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
                >
                  <option value="id">Bahasa Indonesia (id)</option>
                  <option value="en">English (en)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 6. FOOTER TAB */}
        {activeTab === 'footer' && (
          <div className="space-y-4">
            {/* Theme & Layout Style */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
                Tata Letak & Warna Footer
              </span>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'dark', label: 'Dark Charcoal' },
                  { id: 'light', label: 'Clean Light' },
                  { id: 'brand', label: 'Brand Tint' },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() =>
                      onUpdateConfig({
                        ...config,
                        footer: { ...config.footer, themeStyle: th.id as any },
                      })
                    }
                    className={`py-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                      (config.footer.themeStyle || 'dark') === th.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                  Jumlah Kolom Footer
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 3, 4].map((cols) => (
                    <button
                      key={cols}
                      type="button"
                      onClick={() =>
                        onUpdateConfig({
                          ...config,
                          footer: { ...config.footer, columnsCount: cols as any },
                        })
                      }
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        (config.footer.columnsCount || 4) === cols
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {cols} Kolom
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Business Identity */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Profil & Deskripsi Usaha
                </span>
                <input
                  type="checkbox"
                  checked={config.footer.showBusinessInfo !== false}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      footer: { ...config.footer, showBusinessInfo: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>

              {config.footer.showBusinessInfo !== false && (
                <div className="space-y-2.5 pt-1 border-t border-gray-200/60 dark:border-gray-700">
                  <div>
                    <label className="text-[11px] font-medium text-gray-600 dark:text-gray-400 block mb-1">
                      Lencana Status Footer
                    </label>
                    <input
                      type="text"
                      value={config.footer.badgeText || ''}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          footer: { ...config.footer, badgeText: e.target.value },
                        })
                      }
                      placeholder="Contoh: ● Melayani Seluruh Indonesia"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-gray-600 dark:text-gray-400 block mb-1">
                      Deskripsi Khusus Footer (Opsional)
                    </label>
                    <textarea
                      rows={2}
                      value={config.footer.customDescription || ''}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          footer: { ...config.footer, customDescription: e.target.value },
                        })
                      }
                      placeholder="Gunakan jika ingin teks bio footer berbeda dari profil bisnis..."
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
                      Tampilkan Ikon Media Sosial
                    </span>
                    <input
                      type="checkbox"
                      checked={config.footer.showSocials !== false}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          footer: { ...config.footer, showSocials: e.target.checked },
                        })
                      }
                      className="w-3.5 h-3.5 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links & Navigation */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Kolom Navigasi Cepat
                </span>
                <input
                  type="checkbox"
                  checked={config.footer.showQuickLinks !== false}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      footer: { ...config.footer, showQuickLinks: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>

              {config.footer.showQuickLinks !== false && (
                <div className="space-y-2 pt-1 border-t border-gray-200/60 dark:border-gray-700">
                  <div>
                    <label className="text-[11px] font-medium text-gray-600 dark:text-gray-400 block mb-1">
                      Judul Kolom Navigasi
                    </label>
                    <input
                      type="text"
                      value={config.footer.quickLinksTitle || ''}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          footer: { ...config.footer, quickLinksTitle: e.target.value },
                        })
                      }
                      placeholder="Navigasi Cepat"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 italic">
                    * Otomatis sinkron hanya menampilkan tautan seksi yang aktif di halaman.
                  </p>
                </div>
              )}
            </div>

            {/* Opening Hours */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Kolom Jam Operasional
                </span>
                <input
                  type="checkbox"
                  checked={config.footer.showOpeningHours !== false}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      footer: { ...config.footer, showOpeningHours: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>

              {config.footer.showOpeningHours !== false && (
                <div className="pt-1 border-t border-gray-200/60 dark:border-gray-700">
                  <label className="text-[11px] font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    Judul Kolom Jam Buka
                  </label>
                  <input
                    type="text"
                    value={config.footer.openingHoursTitle || ''}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        footer: { ...config.footer, openingHoursTitle: e.target.value },
                      })
                    }
                    placeholder="Jam Operasional"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              )}
            </div>

            {/* Contact & WhatsApp */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Kolom Kontak & WhatsApp
                </span>
                <input
                  type="checkbox"
                  checked={config.footer.showContact !== false}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      footer: { ...config.footer, showContact: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>

              {config.footer.showContact !== false && (
                <div className="space-y-2.5 pt-1 border-t border-gray-200/60 dark:border-gray-700">
                  <div>
                    <label className="text-[11px] font-medium text-gray-600 dark:text-gray-400 block mb-1">
                      Judul Kolom Kontak
                    </label>
                    <input
                      type="text"
                      value={config.footer.contactTitle || ''}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          footer: { ...config.footer, contactTitle: e.target.value },
                        })
                      }
                      placeholder="Hubungi Kami"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
                      Tampilkan Tombol WhatsApp
                    </span>
                    <input
                      type="checkbox"
                      checked={config.footer.showWhatsAppButton !== false}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          footer: { ...config.footer, showWhatsAppButton: e.target.checked },
                        })
                      }
                      className="w-3.5 h-3.5 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  {config.footer.showWhatsAppButton !== false && (
                    <div>
                      <label className="text-[11px] font-medium text-gray-600 dark:text-gray-400 block mb-1">
                        Teks Tombol WhatsApp
                      </label>
                      <input
                        type="text"
                        value={config.footer.whatsAppButtonText || ''}
                        onChange={(e) =>
                          onUpdateConfig({
                            ...config,
                            footer: { ...config.footer, whatsAppButtonText: e.target.value },
                          })
                        }
                        placeholder="Chat WhatsApp"
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Copyright & Legal */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
                Hak Cipta & Catatan Bawah
              </span>

              <div>
                <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Teks Hak Cipta (Copyright)
                </label>
                <input
                  type="text"
                  value={config.footer.copyrightText || ''}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      footer: { ...config.footer, copyrightText: e.target.value },
                    })
                  }
                  placeholder="Hak Cipta Dilindungi. Gunakan {year} untuk tahun otomatis"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Catatan Kaki Tambahan / Legal (Opsional)
                </label>
                <input
                  type="text"
                  value={config.footer.bottomNote || ''}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      footer: { ...config.footer, bottomNote: e.target.value },
                    })
                  }
                  placeholder="Contoh: Terdaftar & Berizin Resmi UMKM | Kebijakan Privasi"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
                  Tampilkan Atribusi Pembuat
                </span>
                <input
                  type="checkbox"
                  checked={config.footer.showAttribution !== false}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      footer: { ...config.footer, showAttribution: e.target.checked },
                    })
                  }
                  className="w-3.5 h-3.5 text-blue-600 rounded cursor-pointer"
                />
              </div>

              {config.footer.showAttribution !== false && (
                <div>
                  <label className="text-[11px] font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    Teks Atribusi
                  </label>
                  <input
                    type="text"
                    value={config.footer.attributionText || ''}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        footer: { ...config.footer, attributionText: e.target.value },
                      })
                    }
                    placeholder="Dibuat dengan SitusUMKM Template Engine"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 7. CUSTOM CODE TAB */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Custom CSS
              </label>
              <textarea
                rows={6}
                value={config.customCss || ''}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    customCss: e.target.value,
                  })
                }
                placeholder="/* Masukkan kode CSS kustom di sini */\n.custom-class {\n  border-radius: 20px;\n}"
                className="w-full p-3 text-xs font-mono rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Custom JavaScript
              </label>
              <textarea
                rows={6}
                value={config.customJs || ''}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    customJs: e.target.value,
                  })
                }
                placeholder="// Masukkan kode JavaScript kustom di sini\nconsole.log('Website UMKM loaded');"
                className="w-full p-3 text-xs font-mono rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
