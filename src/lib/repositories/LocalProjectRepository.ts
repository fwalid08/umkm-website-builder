import { Project, WebsiteConfig } from '../../types/project';
import { ProjectRepository } from './ProjectRepository';
import { TemplateRegistry } from '../registries/TemplateRegistry';
import { TEMPLATES } from '../../data/templatesData';

const STORAGE_KEY = 'situsumkm_projects_v1';

function createInitialDemoProjects(): Project[] {
  return TEMPLATES.map((tmpl, idx) => {
    const config = tmpl.createDefaultConfig();
    const now = new Date(Date.now() - idx * 3600000 * 4).toISOString();
    return {
      id: `proj-${tmpl.id}`,
      name: config.business.name,
      description: config.business.description || config.business.tagline,
      tags: [tmpl.category, config.pageType === 'multi' ? 'Multi-Page' : 'Single-Page'],
      status: 'published' as const,
      createdAt: now,
      updatedAt: now,
      thumbnail: tmpl.thumbnail,
      templateId: tmpl.id,
      config,
    };
  });
}

export class LocalProjectRepository implements ProjectRepository {
  private getStoredProjects(): Project[] {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (!raw || raw === 'undefined' || raw === 'null' || raw.trim() === '') {
        const initials = createInitialDemoProjects();
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initials));
        }
        return initials;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        const initials = createInitialDemoProjects();
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initials));
        }
        return initials;
      }
      return parsed;
    } catch (e) {
      console.warn('Failed to parse projects from localStorage, resetting to defaults:', e);
      const initials = createInitialDemoProjects();
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initials));
        }
      } catch {}
      return initials;
    }
  }

  private saveProjects(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e);
    }
  }

  async getProjects(): Promise<Project[]> {
    return this.getStoredProjects();
  }

  async getProject(id: string): Promise<Project | null> {
    const list = this.getStoredProjects();
    return list.find((p) => p.id === id) || null;
  }

  async createProject(
    projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Project> {
    const list = this.getStoredProjects();
    const now = new Date().toISOString();
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now().toString(36)}`,
      createdAt: now,
      updatedAt: now,
    };
    list.unshift(newProject);
    this.saveProjects(list);
    return newProject;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const list = this.getStoredProjects();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) {
      throw new Error(`Project with id ${id} not found`);
    }
    const updated: Project = {
      ...list[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    list[idx] = updated;
    this.saveProjects(list);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    const list = this.getStoredProjects();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) return false;
    this.saveProjects(filtered);
    return true;
  }

  async duplicateProject(id: string, newName?: string): Promise<Project> {
    const original = await this.getProject(id);
    if (!original) throw new Error(`Project ${id} not found`);

    const clonedConfig: WebsiteConfig = JSON.parse(JSON.stringify(original.config));
    const now = new Date().toISOString();
    const name = newName || `${original.name} (Salinan)`;
    clonedConfig.business.name = name;

    return this.createProject({
      name,
      description: original.description,
      tags: [...original.tags],
      status: 'draft',
      thumbnail: original.thumbnail,
      templateId: original.templateId,
      config: clonedConfig,
    });
  }

  async resetToDefaults(): Promise<void> {
    const initials = createInitialDemoProjects();
    this.saveProjects(initials);
  }
}

// Singleton repository export
export const projectRepository: ProjectRepository = new LocalProjectRepository();
