import React, { useState } from 'react';
import { TemplateRegistry } from '../../lib/registries/TemplateRegistry';
import { TemplateDefinition } from '../../types/template';
import { Search, Sparkles, Check, Eye, X, Layers } from 'lucide-react';

interface TemplatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: TemplateDefinition) => void;
  currentTemplateId?: string;
}

export const TemplatePickerModal: React.FC<TemplatePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  currentTemplateId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);

  if (!isOpen) return null;

  const categories = TemplateRegistry.getCategories();
  const templates = TemplateRegistry.search(searchQuery, selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pilih Template Website UMKM</h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              10 template siap pakai dengan teks bahasa Indonesia, tata letak modern, dan terhubung ke WhatsApp.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari jenis usaha / nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tmpl) => {
            const isCurrent = tmpl.id === currentTemplateId;
            return (
              <div
                key={tmpl.id}
                className={`group flex flex-col justify-between bg-white dark:bg-gray-900 rounded-2xl border transition-all overflow-hidden ${
                  isCurrent
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={tmpl.thumbnail}
                      alt={tmpl.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white">
                        {tmpl.category}
                      </span>
                      {tmpl.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow">
                          {tmpl.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tmpl.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                      {tmpl.description}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mb-4">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{tmpl.blueprint.sections.length} Bagian Lengkap</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                          style={{ backgroundColor: tmpl.defaultTheme.primaryColor }}
                        />
                        Warna Utama
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onSelectTemplate(tmpl)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    {isCurrent ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Sedang Digunakan
                      </>
                    ) : (
                      <>Gunakan Template</>
                    )}
                  </button>
                  <button
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                    title="Lihat Rincian Template"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
          <span>Menampilkan {templates.length} template bisnis UMKM</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Preview Modal Sub-dialog */}
      {previewTemplate && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-48 rounded-xl overflow-hidden mb-4">
              <img
                src={previewTemplate.thumbnail}
                alt={previewTemplate.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                {previewTemplate.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {previewTemplate.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              {previewTemplate.description}
            </p>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl mb-6">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                Struktur Bagian Template:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {previewTemplate.blueprint.sections.map((sec, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md text-[11px] font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {sec.type}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onSelectTemplate(previewTemplate);
                  setPreviewTemplate(null);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow"
              >
                Gunakan Template Ini Sekarang
              </button>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
