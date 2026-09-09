import React, { useState } from 'react';
import { WebsiteConfig } from '../../types/project';
import { generateStaticHtml, downloadHtmlFile } from '../../lib/export/htmlExporter';
import { exportProjectConfigToJson, downloadJsonFile } from '../../lib/export/jsonExporter';
import { GitHubService, GitHubDeployResult } from '../../lib/services/GitHubService';
import { Download, Code, Globe, FileCode, Check, Copy, ExternalLink, X, Loader2, Sparkles } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WebsiteConfig;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, config }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'json' | 'github' | 'preview'>('html');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // GitHub state
  const [repoName, setRepoName] = useState(
    config.business.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'website-umkm'
  );
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<GitHubDeployResult | null>(null);

  if (!isOpen) return null;

  const htmlContent = generateStaticHtml(config);
  const jsonContent = exportProjectConfigToJson(config);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonContent);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadHtml = () => {
    const safeName = (config.business.name || 'website')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    downloadHtmlFile(`${safeName}-index.html`, htmlContent);
  };

  const handleDownloadJson = () => {
    const safeName = (config.business.name || 'website')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    downloadJsonFile(`${safeName}-config.json`, jsonContent);
  };

  const handleDeployGitHub = async () => {
    setIsDeploying(true);
    setDeployResult(null);
    try {
      const res = await GitHubService.deployToGitHub(config, { repoName });
      setDeployResult(res);
    } catch (err: any) {
      setDeployResult({ success: false, error: err.message || 'Gagal publikasi ke GitHub' });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Download className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ekspor & Publikasi Website</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Unduh file statis mandiri siap hosting atau deploy otomatis ke GitHub Pages.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/40">
          <button
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'html'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Unduh HTML Mandiri
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'json'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Code className="w-4 h-4" />
            Konfigurasi JSON
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'github'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            Deploy GitHub Pages
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'preview'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Code className="w-4 h-4" />
            Intip Kode
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'html' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    File HTML Siap Pakai & Bebas Ketergantungan Server
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1 leading-relaxed">
                    File <code className="font-mono bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded">index.html</code> yang diekspor telah memuat semua bagian website, styling Tailwind CSS, optimasi SEO schema markup, dan tombol WhatsApp melayang. Anda dapat langsung mengunggahnya ke cPanel, Netlify, Vercel, atau GitHub Pages secara gratis!
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Ukuran Dokumen:</span>
                  <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                    ~{(htmlContent.length / 1024).toFixed(1)} KB
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Struktur SEO Schema:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {config.seo.schemaType || 'LocalBusiness'} (JSON-LD)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Status WhatsApp Floating:</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {config.whatsapp.enabled ? 'Aktif (' + config.whatsapp.number + ')' : 'Nonaktif'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleDownloadHtml}
                  className="flex-1 py-3 px-5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Unduh index.html Sekarang
                </button>
                <button
                  onClick={handleCopyHtml}
                  className="py-3 px-5 rounded-xl text-xs font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  {copiedHtml ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Salin Seluruh Kode HTML
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Unduh salinan cadangan lengkap dari struktur dan konten website ini dalam format standar JSON. File ini dapat Anda simpan dan dibuka kembali kapan saja melalui menu <strong>Impor Proyek</strong>.
              </p>

              <div className="bg-gray-900 rounded-xl p-4 overflow-hidden text-[11px] font-mono text-gray-300 max-h-48 overflow-y-auto">
                <pre>{jsonContent.slice(0, 800)}...</pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleDownloadJson}
                  className="flex-1 py-3 px-5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Unduh File JSON Konfigurasi
                </button>
                <button
                  onClick={handleCopyJson}
                  className="py-3 px-5 rounded-xl text-xs font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">JSON Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Salin JSON
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Publikasikan website bisnis Anda ke GitHub Pages dengan satu klik. Website Anda akan memiliki alamat publik gratis yang dapat langsung diakses oleh calon pembeli.
              </p>

              <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1.5">
                    Nama Repositori GitHub
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 text-xs bg-gray-100 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-700 rounded-l-xl text-gray-500 font-mono">
                      github.com/umkm-situs/
                    </span>
                    <input
                      type="text"
                      value={repoName}
                      onChange={(e) => setRepoName(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-r-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 space-y-1">
                  <p>• Cabang target publikasi: <code className="font-mono text-gray-700 dark:text-gray-300">gh-pages (main)</code></p>
                  <p>• File yang akan diunggah: <code className="font-mono text-gray-700 dark:text-gray-300">index.html, config.json, README.md</code></p>
                </div>
              </div>

              {deployResult && (
                <div
                  className={`p-4 rounded-xl border ${
                    deployResult.success
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                      : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100'
                  }`}
                >
                  {deployResult.success ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Website Berhasil Dipublikasikan ke GitHub Pages!
                      </div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300">
                        Link website UMKM Anda siap diakses:
                      </p>
                      <a
                        href={deployResult.pagesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                      >
                        {deployResult.pagesUrl}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ) : (
                    <div className="text-xs">
                      <strong>Terjadi kendala:</strong> {deployResult.error}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleDeployGitHub}
                disabled={isDeploying}
                className="w-full py-3 px-5 rounded-xl text-xs font-bold bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 text-white shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sedang Memproses Deploy ke GitHub Pages...
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    Publikasikan ke GitHub Pages Sekarang
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Pratinjau Kode index.html</span>
                <button
                  onClick={handleCopyHtml}
                  className="px-3 py-1 text-xs rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Salin
                </button>
              </div>
              <div className="bg-gray-950 text-gray-200 p-4 rounded-xl text-xs font-mono max-h-96 overflow-y-auto leading-relaxed">
                <pre>{htmlContent}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
