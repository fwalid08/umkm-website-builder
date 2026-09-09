import { Project } from '../../types/project';

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
  createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project>;
  deleteProject(id: string): Promise<boolean>;
  duplicateProject(id: string, newName?: string): Promise<Project>;
  resetToDefaults(): Promise<void>;
}
