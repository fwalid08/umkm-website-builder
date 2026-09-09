import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WebsiteConfig, Project, ViewportMode, SectionConfig, SectionType, SectionStyle } from './types/project';
import { TemplateDefinition } from './types/template';
import { projectRepository } from './lib/repositories/LocalProjectRepository';
import { TemplateRegistry } from './lib/registries/TemplateRegistry';
import { SectionRegistry } from './lib/registries/SectionRegistry';
import { WebsiteRenderer } from './components/renderer/WebsiteRenderer';
import { BuilderTopBar } from './components/builder/BuilderTopBar';
import { BuilderSidebar } from './components/builder/BuilderSidebar';
import { TemplatePickerModal } from './components/builder/TemplatePickerModal';
import { ProjectListModal } from './components/builder/ProjectListModal';
import { AddSectionModal } from './components/builder/AddSectionModal';
import { SectionEditorDrawer } from './components/builder/SectionEditorDrawer';
import { ExportModal } from './components/builder/ExportModal';
import { ImportJsonModal } from './components/builder/ImportJsonModal';
import { EyeOff, Sparkles, Loader2 } from 'lucide-react';

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [config, setConfig] = useState<WebsiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  // Undo / Redo history
  const [history, setHistory] = useState<WebsiteConfig[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Builder settings
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [isBuilderDark, setIsBuilderDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('situsumkm_builder_theme');
    return saved === 'dark';
  });
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  // Modals & Drawers
  const [isTemplatePickerOpen, setIsTemplatePickerOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<SectionConfig | null>(null);

  // Debounced save timer
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initial load
  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      try {
        const projects = await projectRepository.getProjects();
        const initial = projects[0];
        if (initial) {
          setActiveProject(initial);
          setConfig(initial.config);
          setHistory([initial.config]);
          setHistoryIndex(0);
        }
      } catch (err) {
        console.error('Failed to initialize projects:', err);
      } finally {
        setLoading(false);
      }
    };
    initApp();
  }, []);

  // Update config with history recording
  const updateConfig = useCallback(
    (newConfig: WebsiteConfig, recordHistory = true) => {
      setConfig(newConfig);
      setIsSaved(false);

      if (recordHistory) {
        setHistory((prev) => {
          const upToCurrent = prev.slice(0, historyIndex + 1);
          return [...upToCurrent, newConfig];
        });
        setHistoryIndex((prev) => prev + 1);
      }

      // Auto-save to repository
      if (activeProject) {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(async () => {
          try {
            await projectRepository.updateProject(activeProject.id, {
              name: newConfig.business.name || activeProject.name,
              description: newConfig.business.description || activeProject.description,
              config: newConfig,
            });
            setIsSaved(true);
          } catch (err) {
            console.error('Auto-save error:', err);
          }
        }, 600);
      }
    },
    [activeProject, historyIndex]
  );

  // Undo / Redo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      const prevConfig = history[nextIndex];
      setConfig(prevConfig);
      setIsSaved(false);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      const nextConfig = history[nextIndex];
      setConfig(nextConfig);
      setIsSaved(false);
    }
  }, [historyIndex, history]);

  // Keyboard shortcuts (Ctrl+Z, Ctrl+Y)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Builder theme toggle (completely independent from generated website theme)
  const handleToggleBuilderTheme = () => {
    setIsBuilderDark((prev) => {
      const next = !prev;
      localStorage.setItem('situsumkm_builder_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Switch Template
  const handleSelectTemplate = (template: TemplateDefinition) => {
    if (!activeProject) return;
    const newConfig = TemplateRegistry.instantiateTemplate(template);
    updateConfig(newConfig);
    projectRepository.updateProject(activeProject.id, {
      templateId: template.id,
      config: newConfig,
    });
    setIsTemplatePickerOpen(false);
  };

  // Switch Project
  const handleSelectProject = (project: Project) => {
    setActiveProject(project);
    setConfig(project.config);
    setHistory([project.config]);
    setHistoryIndex(0);
    setIsProjectsModalOpen(false);
  };

  // Create New Project via Template Picker
  const handleOpenNewProject = () => {
    setIsProjectsModalOpen(false);
    setIsTemplatePickerOpen(true);
  };

  // Rename Project
  const handleRenameProject = (newName: string) => {
    if (!config) return;
    const updatedConfig = {
      ...config,
      business: { ...config.business, name: newName },
    };
    updateConfig(updatedConfig);
  };

  // Add Section to active page
  const handleAddSection = (type: SectionType, style?: SectionStyle) => {
    if (!config) return;
    const updatedPages = [...config.pages];
    const page = updatedPages[currentPageIndex] || updatedPages[0];

    const def = SectionRegistry.get(type);
    const chosenStyle = style || def?.styles[0] || 'standar';
    const initialContent = def?.defaultContent ? JSON.parse(JSON.stringify(def.defaultContent)) : {};

    const newSection: SectionConfig = {
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      style: chosenStyle,
      content: initialContent,
      styleConfig: {},
    };

    page.sections = [...(page.sections || []), newSection];
    updateConfig({ ...config, pages: updatedPages });
    setIsAddSectionModalOpen(false);
  };

  // Update single section
  const handleUpdateSection = (sectionId: string, updates: Partial<SectionConfig>) => {
    if (!config) return;
    const updatedPages = [...config.pages];
    const page = updatedPages[currentPageIndex] || updatedPages[0];
    page.sections = (page.sections || []).map((sec) =>
      sec.id === sectionId ? { ...sec, ...updates } : sec
    );
    updateConfig({ ...config, pages: updatedPages });
  };

  // Import JSON configuration
  const handleImportSuccess = (importedConfig: WebsiteConfig) => {
    updateConfig(importedConfig);
    setIsImportModalOpen(false);
  };

  if (loading || !config) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
            S
          </div>
          <span className="text-xl font-extrabold tracking-tight">SitusUMKM Builder</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <span>Menyiapkan ruang kerja website UMKM...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-100">
      {/* Top Bar (Isolated Builder Theme) */}
      {!isPreviewMode && (
        <div className={isBuilderDark ? 'dark' : ''}>
          <BuilderTopBar
            projectName={config.business.name || 'Website Saya'}
            onRenameProject={handleRenameProject}
            viewport={viewport}
            onViewportChange={setViewport}
            isDarkMode={isBuilderDark}
            onToggleDarkMode={handleToggleBuilderTheme}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            onUndo={handleUndo}
            onRedo={handleRedo}
            isPreviewMode={isPreviewMode}
            onTogglePreviewMode={() => setIsPreviewMode(!isPreviewMode)}
            onOpenTemplates={() => setIsTemplatePickerOpen(true)}
            onOpenProjects={() => setIsProjectsModalOpen(true)}
            onOpenExport={() => setIsExportModalOpen(true)}
            onOpenImport={() => setIsImportModalOpen(true)}
            isSaved={isSaved}
          />
        </div>
      )}

      {/* Floating Exit Preview button when in Fullscreen Preview mode */}
      {isPreviewMode && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsPreviewMode(false)}
            className="px-4 py-2 rounded-full text-xs font-bold bg-black/85 hover:bg-black text-white backdrop-blur-md shadow-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            <EyeOff className="w-4 h-4" />
            <span>Keluar dari Pratinjau Layar Penuh</span>
          </button>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Controls (Isolated Builder Theme) */}
        {!isPreviewMode && (
          <div className={isBuilderDark ? 'dark flex shrink-0' : 'flex shrink-0'}>
            <BuilderSidebar
              config={config}
              onUpdateConfig={updateConfig}
              onOpenAddSection={() => setIsAddSectionModalOpen(true)}
              onEditSection={(sec) => setEditingSection(sec)}
              currentPageIndex={currentPageIndex}
              isBuilderDark={isBuilderDark}
              onToggleBuilderTheme={handleToggleBuilderTheme}
            />
          </div>
        )}

        {/* Canvas / Preview Container (Isolated from Builder's dark theme) */}
        <main
          className={`flex-1 overflow-y-auto relative flex justify-center p-0 ${
            viewport === 'desktop' ? 'sm:p-0' : 'sm:p-6'
          } ${isBuilderDark ? 'bg-gray-950/90' : 'bg-slate-100'}`}
        >
          <div
            className={`transition-all duration-300 w-full min-h-full flex flex-col ${
              viewport === 'desktop'
                ? 'max-w-full'
                : viewport === 'tablet'
                ? 'max-w-[768px] my-6 shadow-2xl rounded-2xl overflow-hidden border-8 border-gray-800 ring-1 ring-black/10'
                : 'max-w-[390px] my-6 shadow-2xl rounded-3xl overflow-hidden border-[10px] border-gray-900 ring-1 ring-black/10'
            }`}
          >
            <WebsiteRenderer
              config={config}
              viewport={viewport}
              isBuilder={!isPreviewMode}
              currentPageId={config.pages[currentPageIndex]?.id}
              onSectionSelect={(sec) => setEditingSection(sec)}
            />
          </div>
        </main>
      </div>

      {/* Modals & Drawers (Wrapped with Builder Theme) */}
      <div className={isBuilderDark ? 'dark' : ''}>
        <TemplatePickerModal
          isOpen={isTemplatePickerOpen}
          onClose={() => setIsTemplatePickerOpen(false)}
          onSelectTemplate={handleSelectTemplate}
          currentTemplateId={activeProject?.templateId}
        />

        <ProjectListModal
          isOpen={isProjectsModalOpen}
          onClose={() => setIsProjectsModalOpen(false)}
          onSelectProject={handleSelectProject}
          onNewProject={handleOpenNewProject}
          currentProjectId={activeProject?.id}
        />

        <AddSectionModal
          isOpen={isAddSectionModalOpen}
          onClose={() => setIsAddSectionModalOpen(false)}
          onAddSection={handleAddSection}
        />

        <SectionEditorDrawer
          section={editingSection}
          isOpen={!!editingSection}
          onClose={() => setEditingSection(null)}
          onUpdateSection={handleUpdateSection}
        />

        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          config={config}
        />

        <ImportJsonModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImportSuccess={handleImportSuccess}
        />
      </div>
    </div>
  );
}
