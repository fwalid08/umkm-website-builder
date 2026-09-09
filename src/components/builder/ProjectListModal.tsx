import React, { useState, useEffect } from 'react';
import { Project } from '../../types/project';
import { projectRepository } from '../../lib/repositories/LocalProjectRepository';
import { exportProjectConfigToJson, downloadJsonFile } from '../../lib/export/jsonExporter';
import { FolderKanban, Plus, Search, Copy, Trash2, Download, ExternalLink, X, RefreshCw } from 'lucide-react';

interface ProjectListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onNewProject: () => void;
  currentProjectId?: string;
}

export const ProjectListModal: React.FC<ProjectListModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onNewProject,
  currentProjectId,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    const list = await projectRepository.getProjects();
    setProjects(list);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadProjects();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDuplicate = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await projectRepository.duplicateProject(id);
    await loadProjects();
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      await projectRepository.deleteProject(id);
      await loadProjects();
    }
  };

  const handleExportJson = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    const json = exportProjectConfigToJson(project.config);
    const safeName = project.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadJsonFile(`${safeName}-backup.json`, json);
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Reset daftar proyek ke 10 template UMKM awal?')) {
      await projectRepository.resetToDefaults();
      await loadProjects();
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <FolderKanban className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Proyek Website UMKM Saya</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Kelola daftar website yang tersimpan di browser Anda.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onNewProject();
              }}
              className="py-2 px-3.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Buat Website Baru
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-4 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama website atau kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleResetDefaults}
            className="text-[11px] text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 flex items-center gap-1 hover:underline"
            title="Muat ulang 10 template demo awal"
          >
            <RefreshCw className="w-3 h-3" />
            Muat Ulang Demo Awal
          </button>
        </div>

        {/* Projects list */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((proj) => {
            const isCurrent = proj.id === currentProjectId;
            const updatedDate = new Date(proj.updatedAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={proj.id}
                onClick={() => {
                  onSelectProject(proj);
                  onClose();
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20 shadow'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    {proj.thumbnail ? (
                      <img
                        src={proj.thumbnail}
                        alt={proj.name}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-800 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-400 shrink-0">
                        WEB
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate">
                          {proj.name}
                        </h3>
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 shrink-0">
                            Aktif
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {proj.description || proj.config.business.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span>Diperbarui: {updatedDate}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDuplicate(proj.id, e)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700"
                      title="Gandakan Proyek"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleExportJson(proj, e)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700"
                      title="Unduh Cadangan JSON"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(proj.id, e)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-500 hover:text-red-600"
                      title="Hapus Proyek"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
