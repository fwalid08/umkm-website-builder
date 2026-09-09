import React from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Sun,
  Moon,
  Undo2,
  Redo2,
  FolderKanban,
  Sparkles,
  Download,
  Eye,
  EyeOff,
  Upload,
  Check,
  Globe,
} from 'lucide-react';
import { ViewportMode } from '../../types/project';

interface BuilderTopBarProps {
  projectName: string;
  onRenameProject: (name: string) => void;
  viewport: ViewportMode;
  onViewportChange: (viewport: ViewportMode) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  isPreviewMode: boolean;
  onTogglePreviewMode: () => void;
  onOpenTemplates: () => void;
  onOpenProjects: () => void;
  onOpenExport: () => void;
  onOpenImport: () => void;
  isSaved: boolean;
}

export const BuilderTopBar: React.FC<BuilderTopBarProps> = ({
  projectName,
  onRenameProject,
  viewport,
  onViewportChange,
  isDarkMode,
  onToggleDarkMode,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  isPreviewMode,
  onTogglePreviewMode,
  onOpenTemplates,
  onOpenProjects,
  onOpenExport,
  onOpenImport,
  isSaved,
}) => {
  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Left: Brand & Project Name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
            S
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-sm text-gray-900 dark:text-white tracking-tight leading-none block">
              SitusUMKM
            </span>
            <span className="text-[10px] text-gray-400 font-medium leading-none block mt-0.5">
              Website Builder
            </span>
          </div>
        </div>

        <div className="h-5 w-px bg-gray-200 dark:border-gray-800 hidden md:block" />

        {/* Project Name editable input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={projectName}
            onChange={(e) => onRenameProject(e.target.value)}
            className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-950 px-2 py-1 rounded-lg border border-transparent focus:border-blue-500 transition-colors w-36 sm:w-56 truncate focus:w-64"
            title="Klik untuk mengubah nama proyek"
          />
          {isSaved && (
            <span className="hidden lg:flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <Check className="w-3 h-3" />
              Tersimpan
            </span>
          )}
        </div>
      </div>

      {/* Center: Device Viewport Switcher & Undo/Redo */}
      <div className="hidden md:flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-0.5 rounded-xl">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-gray-600 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-gray-600 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Viewports */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-0.5 rounded-xl">
          <button
            onClick={() => onViewportChange('desktop')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              viewport === 'desktop'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            title="Tampilan Desktop (100%)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewportChange('tablet')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              viewport === 'tablet'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            title="Tampilan Tablet (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewportChange('mobile')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              viewport === 'mobile'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            title="Tampilan Smartphone (390px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Theme mode toggle (Builder Theme) */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          title={isDarkMode ? 'Beralih ke Tema Builder Terang' : 'Beralih ke Tema Builder Gelap'}
          aria-label="Toggle Builder Dark Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Theme mode toggle (Builder Theme) - Accessible on all screens */}
        <button
          onClick={onToggleDarkMode}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          title={isDarkMode ? 'Beralih ke Tema Builder Terang' : 'Beralih ke Tema Builder Gelap'}
          aria-label="Toggle Builder Dark Mode"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden xl:inline text-xs font-semibold">Terang</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="hidden xl:inline text-xs font-semibold">Gelap</span>
            </>
          )}
        </button>

        {/* Template Picker */}
        <button
          onClick={onOpenTemplates}
          className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1.5"
          title="Ganti atau jelajahi 10 template UMKM"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">Template</span>
        </button>

        {/* Saved Projects */}
        <button
          onClick={onOpenProjects}
          className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1.5"
          title="Daftar Proyek Tersimpan"
        >
          <FolderKanban className="w-3.5 h-3.5 text-blue-500" />
          <span className="hidden sm:inline">Proyek</span>
        </button>

        {/* Import JSON */}
        <button
          onClick={onOpenImport}
          className="p-1.5 rounded-xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden xl:flex"
          title="Impor Konfigurasi JSON"
        >
          <Upload className="w-4 h-4" />
        </button>

        {/* Preview toggle */}
        <button
          onClick={onTogglePreviewMode}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
            isPreviewMode
              ? 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
          }`}
          title={isPreviewMode ? 'Keluar Mode Pratinjau' : 'Pratinjau Layar Penuh'}
        >
          {isPreviewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{isPreviewMode ? 'Tutup Pratinjau' : 'Pratinjau'}</span>
        </button>

        {/* Export & Publish */}
        <button
          onClick={onOpenExport}
          className="px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Ekspor</span>
        </button>
      </div>
    </header>
  );
};
