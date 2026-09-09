import React, { useState, useEffect } from 'react';
import { SectionConfig, SectionStyle } from '../../types/project';
import { SectionRegistry } from '../../lib/registries/SectionRegistry';
import {
  X,
  Sparkles,
  Layers,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check,
  ChevronDown,
  ChevronUp,
  Palette,
  Sliders,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

interface SectionEditorDrawerProps {
  section: SectionConfig | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSection: (sectionId: string, updates: Partial<SectionConfig>) => void;
}

// Preset photo backgrounds for Indonesian UMKM
const HERO_BG_PRESETS = [
  { label: 'Bengkel Otomotif', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Resto & Kafe', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Klinik Medis / Gigi', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Salon & Barbershop', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Kantor & Jasa', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Toko & Butik', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80' },
];

export const SectionEditorDrawer: React.FC<SectionEditorDrawerProps> = ({
  section,
  isOpen,
  onClose,
  onUpdateSection,
}) => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [style, setStyle] = useState<SectionStyle | undefined>(undefined);
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    if (section) {
      setContent(section.content || {});
      setStyle(section.style);
      setHidden(!!section.hidden);
    }
  }, [section]);

  const def = section ? SectionRegistry.get(section.type) : undefined;

  // Real-time live updating so changes reflect immediately on canvas
  const updateField = (key: string, value: any) => {
    if (!section) return;
    const nextContent = { ...content, [key]: value };
    setContent(nextContent);
    onUpdateSection(section.id, {
      content: nextContent,
      style,
      hidden,
    });
  };

  const handleStyleChange = (newStyle: SectionStyle) => {
    if (!section) return;
    setStyle(newStyle);
    onUpdateSection(section.id, {
      content,
      style: newStyle,
      hidden,
    });
  };

  const handleHiddenChange = (newHidden: boolean) => {
    if (!section) return;
    setHidden(newHidden);
    onUpdateSection(section.id, {
      content,
      style,
      hidden: newHidden,
    });
  };

  const handleSaveAndClose = () => {
    if (section) {
      onUpdateSection(section.id, { content, style, hidden });
    }
    onClose();
  };

  if (!isOpen || !section) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col animate-slide-left">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50/70 dark:bg-gray-950/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              {section.type}
            </span>
            <h2 className="text-base font-bold text-gray-900 dark:text-white capitalize">
              Edit Konten & Desain
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Perubahan otomatis tersimpan langsung ke canvas live
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body: Form Fields */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Style selection */}
        {def && def.availableStyles.length > 0 && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                Varian Desain ({def.availableStyles.length} Pilihan)
              </label>
              <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                {style || def.defaultStyle}
              </span>
            </div>
            <select
              value={style || def.defaultStyle}
              onChange={(e) => handleStyleChange(e.target.value as SectionStyle)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
            >
              {def.availableStyles.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} {def.defaultStyle === s.id ? '(Default)' : ''}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
              {def.availableStyles.find((s) => s.id === (style || def.defaultStyle))?.description}
            </p>
          </div>
        )}

        {/* SECTION: HERO SPECIFIC ENHANCED BACKGROUND & OVERLAY CONFIG */}
        {section.type === 'hero' && (
          <div className="space-y-4">
            {/* Background & Overlay Controls */}
            <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl border border-blue-200/80 dark:border-blue-900/50 space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-blue-600" />
                  Latar Belakang & Lapisan Overlay
                </h3>
              </div>

              {/* BG Type */}
              <div>
                <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Tipe Latar Belakang (Background)
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'none', label: 'Standar' },
                    { id: 'color', label: 'Warna' },
                    { id: 'gradient', label: 'Gradasi' },
                    { id: 'image', label: 'Foto' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => updateField('bgType', t.id)}
                      className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                        (content.bgType || 'none') === t.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* If Color */}
              {content.bgType === 'color' && (
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block">
                    Pilih Warna Latar
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content.bgColor || '#0f172a'}
                      onChange={(e) => updateField('bgColor', e.target.value)}
                      className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={content.bgColor || '#0f172a'}
                      onChange={(e) => updateField('bgColor', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* If Gradient */}
              {content.bgType === 'gradient' && (
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block">
                    Preset Gradasi Modern
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Biru Malam', val: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)' },
                      { label: 'Ungu Indigo', val: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)' },
                      { label: 'Emerald Mewah', val: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' },
                      { label: 'Sunset Modern', val: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)' },
                    ].map((grad, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => updateField('bgGradient', grad.val)}
                        className="p-2 text-[11px] font-bold text-white rounded-lg shadow-sm text-left transition-all hover:scale-[1.02] cursor-pointer"
                        style={{ backgroundImage: grad.val }}
                      >
                        {grad.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* If Image or Overlay variant */}
              {(content.bgType === 'image' || style === 'hero-overlay-bold' || style === 'hero-video-bg') && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Preset Foto Cepat (Sesuai Bidang Usaha)
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {HERO_BG_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            updateField('bgImage', p.url);
                            updateField('bgType', 'image');
                          }}
                          className="px-2 py-1.5 text-[10px] font-medium bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 truncate cursor-pointer"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      URL Gambar Latar Belakang
                    </label>
                    <input
                      type="text"
                      value={content.bgImage || content.imageUrl || ''}
                      onChange={(e) => updateField('bgImage', e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                    />
                  </div>

                  {/* Overlay Toggle & Opacity Slider */}
                  <div className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-gray-200/80 dark:border-gray-700 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        Aktifkan Lapisan Overlay Gelap
                      </span>
                      <input
                        type="checkbox"
                        checked={content.bgOverlay !== false}
                        onChange={(e) => updateField('bgOverlay', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                      />
                    </div>

                    {content.bgOverlay !== false && (
                      <div className="space-y-2 pt-1 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300">
                          <span>Tingkat Kegelapan Overlay (Opacity)</span>
                          <span className="font-bold font-mono">
                            {Math.round((content.bgOverlayOpacity ?? 0.65) * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="0.95"
                          step="0.05"
                          value={content.bgOverlayOpacity ?? 0.65}
                          onChange={(e) => updateField('bgOverlayOpacity', parseFloat(e.target.value))}
                          className="w-full accent-blue-600 cursor-pointer"
                        />
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[11px] text-gray-500">Warna Lapisan:</span>
                          <input
                            type="color"
                            value={content.bgOverlayColor || '#000000'}
                            onChange={(e) => updateField('bgOverlayColor', e.target.value)}
                            className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                          />
                          <span className="text-xs font-mono text-gray-600 dark:text-gray-300">
                            {content.bgOverlayColor || '#000000'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* General Hero Content */}
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                Teks Lencana (Badge)
              </label>
              <input
                type="text"
                value={content.badgeText || ''}
                onChange={(e) => updateField('badgeText', e.target.value)}
                placeholder="Contoh: Pilihan Utama UMKM Terpercaya"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                Judul Utama (Heading)
              </label>
              <textarea
                rows={2}
                value={content.heading || ''}
                onChange={(e) => updateField('heading', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                Subjudul / Deskripsi Pendek
              </label>
              <textarea
                rows={3}
                value={content.subheading || content.description || ''}
                onChange={(e) => updateField('subheading', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                URL Foto Utama (Hero Image)
              </label>
              <input
                type="text"
                value={content.imageUrl || ''}
                onChange={(e) => updateField('imageUrl', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Teks Tombol Utama (CTA)
                </label>
                <input
                  type="text"
                  value={content.ctaPrimaryText || ''}
                  onChange={(e) => updateField('ctaPrimaryText', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  URL Tombol Utama
                </label>
                <input
                  type="text"
                  value={content.ctaPrimaryUrl || ''}
                  onChange={(e) => updateField('ctaPrimaryUrl', e.target.value)}
                  placeholder="https://wa.me/... atau #kontak"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Teks Tombol Kedua
                </label>
                <input
                  type="text"
                  value={content.ctaSecondaryText || ''}
                  onChange={(e) => updateField('ctaSecondaryText', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  URL Tombol Kedua
                </label>
                <input
                  type="text"
                  value={content.ctaSecondaryUrl || ''}
                  onChange={(e) => updateField('ctaSecondaryUrl', e.target.value)}
                  placeholder="#layanan atau #tentang"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-[11px]"
                />
              </div>
            </div>

            {/* VARIANT SPECIFIC CONFIGURATION SECTION */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50 mb-3">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block">
                  ⚙️ Konfigurasi Khusus Varian: {section.style || 'hero-split'}
                </span>
                <span className="text-[11px] text-blue-700 dark:text-blue-400">
                  Formulir di bawah ini aktif otomatis menyesuaikan dengan varian hero yang Anda pilih.
                </span>
              </div>

              {/* SPECIFIC CONFIG: hero-split (Default) */}
              {(!section.style || section.style === 'hero-split') && (
                <div className="space-y-4">
                  {/* Trust Points / Checklist */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        Poin Keunggulan / Trust Points (Checklist)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const prev = content.bulletPoints || content.trustPoints || [];
                          const updated = [...prev, 'Keunggulan Baru'];
                          updateField('bulletPoints', updated);
                          updateField('trustPoints', updated);
                        }}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Tambah Poin
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {(content.bulletPoints || content.trustPoints || []).map((bp: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={bp}
                            onChange={(e) => {
                              const next = [...(content.bulletPoints || content.trustPoints || [])];
                              next[i] = e.target.value;
                              updateField('bulletPoints', next);
                              updateField('trustPoints', next);
                            }}
                            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const next = (content.bulletPoints || content.trustPoints || []).filter((_: any, idx: number) => idx !== i);
                              updateField('bulletPoints', next);
                              updateField('trustPoints', next);
                            }}
                            className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating Highlight Card */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        Kartu Sorotan Rating (Floating Card)
                      </span>
                      <input
                        type="checkbox"
                        checked={content.showHighlightCard !== false && content.showFloatingHighlight !== false}
                        onChange={(e) => {
                          updateField('showHighlightCard', e.target.checked);
                          updateField('showFloatingHighlight', e.target.checked);
                        }}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                    </div>
                    {(content.showHighlightCard !== false && content.showFloatingHighlight !== false) && (
                      <div className="space-y-2 pt-1 border-t border-gray-200/60 dark:border-gray-700">
                        <div>
                          <label className="text-[10px] text-gray-500 block mb-0.5">Judul Sorotan</label>
                          <input
                            type="text"
                            value={content.highlightTitle || content.floatingHighlightTitle || content.floatingHighlight?.title || 'Rating Pelanggan'}
                            onChange={(e) => updateField('highlightTitle', e.target.value)}
                            placeholder="Rating Pelanggan"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 block mb-0.5">Keterangan / Nilai Rating</label>
                          <input
                            type="text"
                            value={content.highlightSubtitle || content.floatingHighlightSubtitle || content.floatingHighlight?.subtitle || '4.9/5 Kepuasan Nyata'}
                            onChange={(e) => updateField('highlightSubtitle', e.target.value)}
                            placeholder="4.9/5 Kepuasan Nyata"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SPECIFIC CONFIG: hero-centered */}
              {section.style === 'hero-centered' && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                    Catatan Kepercayaan di Bawah Tombol (Trust Strip)
                  </label>
                  <input
                    type="text"
                    value={content.subNotice || content.trustNote || ''}
                    onChange={(e) => updateField('subNotice', e.target.value)}
                    placeholder="Contoh: ✓ Respon Cepat < 5 Menit • Garansi 100% Puas"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <span className="text-[10px] text-gray-500 block">
                    Teks kecil ini akan muncul tepat di bawah tombol aksi untuk meyakinkan calon pelanggan.
                  </span>
                </div>
              )}

              {/* SPECIFIC CONFIG: hero-minimal */}
              {section.style === 'hero-minimal' && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                    Catatan Tagline / Filosofi Minimalis
                  </label>
                  <input
                    type="text"
                    value={content.subNotice || ''}
                    onChange={(e) => updateField('subNotice', e.target.value)}
                    placeholder="Contoh: Kualitas Utama Tanpa Kompromi"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              )}

              {/* SPECIFIC CONFIG: hero-video-bg */}
              {section.style === 'hero-video-bg' && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                    Tautan Video & Teks Demo
                  </label>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-0.5">Teks Tombol Video</label>
                    <input
                      type="text"
                      value={content.videoBtnText || ''}
                      onChange={(e) => updateField('videoBtnText', e.target.value)}
                      placeholder="Tonton Video Profil"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-0.5">URL Video (YouTube / MP4)</label>
                    <input
                      type="text"
                      value={content.videoBtnUrl || ''}
                      onChange={(e) => updateField('videoBtnUrl', e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>
                </div>
              )}

              {/* SPECIFIC CONFIG: hero-asymmetric */}
              {section.style === 'hero-asymmetric' && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                    Konfigurasi Kolase Asimetris
                  </span>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-0.5">URL Foto Kedua (Pendamping)</label>
                    <input
                      type="text"
                      value={content.secondImageUrl || ''}
                      onChange={(e) => updateField('secondImageUrl', e.target.value)}
                      placeholder="URL foto kedua untuk grid asimetris..."
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-0.5">Judul Kartu Rating</label>
                    <input
                      type="text"
                      value={content.asymmetricRatingTitle || ''}
                      onChange={(e) => updateField('asymmetricRatingTitle', e.target.value)}
                      placeholder="4.9/5 Rating UMKM"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-0.5">Keterangan Kartu Rating</label>
                    <input
                      type="text"
                      value={content.asymmetricRatingDesc || ''}
                      onChange={(e) => updateField('asymmetricRatingDesc', e.target.value)}
                      placeholder="Dipercaya oleh ribuan pelanggan setia setiap hari."
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* SPECIFIC CONFIG: hero-modern-slant */}
              {section.style === 'hero-modern-slant' && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                    Teks Lencana Garansi / Keamanan (Shield Badge)
                  </label>
                  <input
                    type="text"
                    value={content.guaranteeBadge || content.badgeText || ''}
                    onChange={(e) => {
                      updateField('guaranteeBadge', e.target.value);
                      updateField('badgeText', e.target.value);
                    }}
                    placeholder="Jaminan Layanan Resmi & Terverifikasi"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              )}

              {/* SPECIFIC CONFIG: hero-showcase */}
              {section.style === 'hero-showcase' && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Koleksi Foto Galeri Showcase
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const currentGallery = content.galleryImages || [
                          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
                          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
                          'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
                        ];
                        updateField('galleryImages', [...currentGallery, 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80']);
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Tambah Foto
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(content.galleryImages || [
                      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
                    ]).map((imgUrl: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <img src={imgUrl} alt={`Thumb ${idx}`} className="w-9 h-9 rounded object-cover border border-gray-200 dark:border-gray-700 shrink-0" />
                        <input
                          type="text"
                          value={imgUrl}
                          onChange={(e) => {
                            const list = [...(content.galleryImages || [
                              'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
                              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
                              'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
                            ])];
                            list[idx] = e.target.value;
                            updateField('galleryImages', list);
                          }}
                          className="flex-1 px-2.5 py-1 text-[11px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const list = (content.galleryImages || [
                              'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
                              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
                              'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
                            ]).filter((_: any, i: number) => i !== idx);
                            updateField('galleryImages', list);
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: NON-HERO SECTIONS */}
        {section.type !== 'hero' && (
          <div className="space-y-4">
            {(content.badgeText !== undefined || section.type === 'stats' || section.type === 'services' || section.type === 'features') && (
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Teks Lencana (Badge)
                </label>
                <input
                  type="text"
                  value={content.badgeText || ''}
                  onChange={(e) => updateField('badgeText', e.target.value)}
                  placeholder="Contoh: Teruji & Terpercaya"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            )}

            {content.title !== undefined && (
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Judul Bagian (Section Title)
                </label>
                <input
                  type="text"
                  value={content.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold"
                />
              </div>
            )}

            {content.subtitle !== undefined && (
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Subjudul (Subtitle)
                </label>
                <textarea
                  rows={2}
                  value={content.subtitle || ''}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            )}

            {content.description !== undefined && (
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Deskripsi / Paragraf
                </label>
                <textarea
                  rows={3}
                  value={content.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            )}

            {content.imageUrl !== undefined && (
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  URL Foto / Gambar
                </label>
                <input
                  type="text"
                  value={content.imageUrl || ''}
                  onChange={(e) => updateField('imageUrl', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                />
              </div>
            )}

            {/* Items List (for Services, Products, Stats, FAQ, Process, Testimonials) */}
            {Array.isArray(content.items) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Daftar Item ({content.items.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const isStats = section.type === 'stats';
                      const newItem = isStats
                        ? { value: '1.000+', label: 'Metrik Baru', description: 'Pencapaian terpercaya' }
                        : {
                            title: 'Item Baru',
                            name: 'Item Baru',
                            description: 'Deskripsi singkat item baru',
                            price: 'Rp 50.000',
                            question: 'Pertanyaan baru?',
                            answer: 'Jawaban detail pertanyaan di sini.',
                            value: '100+',
                            label: 'Metrik Baru',
                            rating: 5,
                          };
                      updateField('items', [...content.items, newItem]);
                    }}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Tambah Item
                  </button>
                </div>
                <div className="space-y-3">
                  {content.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          #{idx + 1} {item.title || item.name || item.question || item.value}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const filtered = content.items.filter((_: any, i: number) => i !== idx);
                            updateField('items', filtered);
                          }}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Value / Number (e.g. Stats) */}
                      {item.value !== undefined && (
                        <div>
                          <label className="text-[10px] text-gray-500 block mb-0.5">Nilai / Angka Metrik</label>
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => {
                              const newItems = [...content.items];
                              newItems[idx].value = e.target.value;
                              updateField('items', newItems);
                            }}
                            placeholder="Contoh: 10.000+, 99.8%"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold"
                          />
                        </div>
                      )}

                      {/* Label (e.g. Stats) */}
                      {item.label !== undefined && (
                        <div>
                          <label className="text-[10px] text-gray-500 block mb-0.5">Label / Keterangan Metrik</label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const newItems = [...content.items];
                              newItems[idx].label = e.target.value;
                              updateField('items', newItems);
                            }}
                            placeholder="Contoh: Pelanggan Puas"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                      )}

                      {(item.title !== undefined || item.name !== undefined) && (
                        <div>
                          <label className="text-[10px] text-gray-500 block mb-0.5">Judul / Nama</label>
                          <input
                            type="text"
                            value={item.title ?? item.name}
                            onChange={(e) => {
                              const newItems = [...content.items];
                              if (newItems[idx].title !== undefined) newItems[idx].title = e.target.value;
                              if (newItems[idx].name !== undefined) newItems[idx].name = e.target.value;
                              updateField('items', newItems);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                      )}

                      {item.price !== undefined && (
                        <div>
                          <label className="text-[10px] text-gray-500 block mb-0.5">Tarif / Harga</label>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => {
                              const newItems = [...content.items];
                              newItems[idx].price = e.target.value;
                              updateField('items', newItems);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                      )}

                      {item.question !== undefined && (
                        <div>
                          <label className="text-[10px] text-gray-500 block mb-0.5">Pertanyaan FAQ</label>
                          <input
                            type="text"
                            value={item.question}
                            onChange={(e) => {
                              const newItems = [...content.items];
                              newItems[idx].question = e.target.value;
                              updateField('items', newItems);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold"
                          />
                        </div>
                      )}

                      {item.answer !== undefined && (
                        <div>
                          <label className="text-[10px] text-gray-500 block mb-0.5">Jawaban FAQ</label>
                          <textarea
                            rows={2}
                            value={item.answer}
                            onChange={(e) => {
                              const newItems = [...content.items];
                              newItems[idx].answer = e.target.value;
                              updateField('items', newItems);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                      )}

                      {item.description !== undefined && (
                        <div>
                          <label className="text-[10px] text-gray-500 block mb-0.5">Deskripsi Ringkas</label>
                          <textarea
                            rows={2}
                            value={item.description}
                            onChange={(e) => {
                              const newItems = [...content.items];
                              newItems[idx].description = e.target.value;
                              updateField('items', newItems);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                        </div>
                      )}

                      {item.image !== undefined && (
                        <div>
                          <label className="text-[10px] text-gray-500 block mb-0.5">URL Foto Item</label>
                          <input
                            type="text"
                            value={item.image}
                            onChange={(e) => {
                              const newItems = [...content.items];
                              newItems[idx].image = e.target.value;
                              updateField('items', newItems);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-[11px]"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Visiblity toggle */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
              Sembunyikan Bagian Ini di Web
            </span>
            <span className="text-[11px] text-gray-500">
              Bagian ini akan disimpan sebagai draf tanpa tampil di website
            </span>
          </div>
          <input
            type="checkbox"
            checked={hidden}
            onChange={(e) => handleHiddenChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-950/60 flex items-center justify-end gap-2.5">
        <button
          onClick={handleSaveAndClose}
          className="px-5 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          Tutup & Selesai
        </button>
      </div>
    </div>
  );
};
