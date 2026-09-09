import React, { useState } from 'react';
import { SectionRegistry } from '../../lib/registries/SectionRegistry';
import { SectionType, SectionStyle } from '../../types/project';
import { Plus, X, Layers, Sparkles } from 'lucide-react';

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (type: SectionType, style?: SectionStyle) => void;
}

export const AddSectionModal: React.FC<AddSectionModalProps> = ({
  isOpen,
  onClose,
  onAddSection,
}) => {
  const [selectedType, setSelectedType] = useState<SectionType>('features');
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  if (!isOpen) return null;

  const allDefinitions = SectionRegistry.getAll();
  const activeDef = SectionRegistry.get(selectedType);

  const handleAdd = () => {
    onAddSection(selectedType, (selectedStyle || activeDef?.defaultStyle) as SectionStyle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <Plus className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tambah Bagian Baru</h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Pilih dari 18 tipe bagian yang terdaftar di SectionRegistry untuk melengkapi halaman website Anda.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content split: Types list on left, Style & details on right */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Section Types list */}
          <div className="md:col-span-6 p-4 border-r border-gray-200 dark:border-gray-800 overflow-y-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block px-2 mb-2">
              Tipe Bagian Tersedia ({allDefinitions.length})
            </span>
            {allDefinitions.map((def) => {
              const isSelected = def.type === selectedType;
              return (
                <button
                  key={def.type}
                  onClick={() => {
                    setSelectedType(def.type);
                    setSelectedStyle(def.defaultStyle);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs capitalize block">{def.name || def.type}</span>
                    <span className="text-[11px] text-gray-400 line-clamp-1">{def.description}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 font-mono">
                    {def.availableStyles.length} Gaya
                  </span>
                </button>
              );
            })}
          </div>

          {/* Style & configuration preview on right */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between bg-gray-50/50 dark:bg-gray-950/30 overflow-y-auto">
            {activeDef && (
              <div className="space-y-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Detail Bagian
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize mt-0.5">
                    {activeDef.type} Section
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activeDef.description}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-2">
                    Pilih Gaya Tampilan (Style Variant):
                  </label>
                  <div className="space-y-2">
                    {activeDef.availableStyles.map((sty) => (
                      <label
                        key={sty.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          (selectedStyle || activeDef.defaultStyle) === sty.id
                            ? 'bg-white dark:bg-gray-900 border-blue-500 shadow-sm'
                            : 'bg-white/60 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="section-style"
                            value={sty.id}
                            checked={(selectedStyle || activeDef.defaultStyle) === sty.id}
                            onChange={() => setSelectedStyle(sty.id)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block">
                              {sty.name || sty.id}
                            </span>
                            {sty.description && (
                              <span className="text-[11px] text-gray-400 block">
                                {sty.description}
                              </span>
                            )}
                          </div>
                        </div>
                        {activeDef.defaultStyle === sty.id && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold">
                            Default
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-blue-800 dark:text-blue-200 leading-relaxed">
                    Bagian ini akan otomatis diisi konten contoh bahasa Indonesia yang dapat langsung Anda ubah di panel editor.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="px-5 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all"
              >
                Tambahkan ke Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
