import React, { useState } from 'react';
import { WebsiteConfig } from '../../types/project';
import { validateAndParseConfigJson } from '../../lib/export/jsonExporter';
import { Upload, FileText, AlertCircle, Check, X } from 'lucide-react';

interface ImportJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (config: WebsiteConfig) => void;
}

export const ImportJsonModal: React.FC<ImportJsonModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
      setErrorMsg(null);
    };
    reader.readAsText(file);
  };

  const handleProcessImport = () => {
    if (!jsonText.trim()) {
      setErrorMsg('Harap masukkan isi file JSON konfigurasi.');
      return;
    }

    const res = validateAndParseConfigJson(jsonText);
    if (!res.valid || !res.config) {
      setErrorMsg(res.error || 'Format konfigurasi JSON tidak valid.');
      return;
    }

    onImportSuccess(res.config);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <Upload className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Impor Konfigurasi JSON</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Unggah file cadangan atau tempel teks JSON untuk memulihkan proyek website.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* File input drag and drop or click */}
          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 rounded-xl cursor-pointer bg-gray-50/50 dark:bg-gray-800/30 transition-colors">
            <FileText className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
              Pilih file .json dari komputer Anda
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5">atau seret & jatuhkan file di sini</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1.5">
              Atau Tempel Teks JSON Langsung:
            </label>
            <textarea
              rows={6}
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value);
                setErrorMsg(null);
              }}
              placeholder='{\n  "version": "1.0",\n  "business": { ... }\n}'
              className="w-full p-3 text-xs font-mono bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900"
          >
            Batal
          </button>
          <button
            onClick={handleProcessImport}
            className="px-5 py-2.5 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow transition-all"
          >
            Terapkan & Muat Website
          </button>
        </div>
      </div>
    </div>
  );
};
