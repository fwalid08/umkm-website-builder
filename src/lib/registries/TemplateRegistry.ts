import { TemplateDefinition } from '../../types/template';
import { WebsiteConfig } from '../../types/project';
import { TEMPLATES } from '../../data/templatesData';

export class TemplateRegistry {
  private static templates: Map<string, TemplateDefinition> = new Map(
    TEMPLATES.map((t) => [t.id, t])
  );

  public static get(templateId: string): TemplateDefinition | undefined {
    return this.templates.get(templateId);
  }

  public static getAll(): TemplateDefinition[] {
    return Array.from(this.templates.values());
  }

  public static getByCategory(category: string): TemplateDefinition[] {
    if (category === 'Semua') return this.getAll();
    return this.getAll().filter((t) => t.category === category);
  }

  public static getCategories(): string[] {
    const categories = Array.from(new Set(this.getAll().map((t) => t.category)));
    return ['Semua', ...categories];
  }

  public static search(query: string, category: string = 'Semua'): TemplateDefinition[] {
    const q = query.toLowerCase().trim();
    return this.getAll().filter((t) => {
      const matchCat = category === 'Semua' || t.category === category;
      const matchQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }

  public static createDefaultConfig(templateId: string): WebsiteConfig {
    const t = this.get(templateId);
    if (!t) {
      return TEMPLATES[0].createDefaultConfig();
    }
    return JSON.parse(JSON.stringify(t.createDefaultConfig()));
  }

  public static instantiateTemplate(template: TemplateDefinition, businessName?: string): WebsiteConfig {
    const config: WebsiteConfig = JSON.parse(JSON.stringify(template.createDefaultConfig()));
    if (businessName) {
      config.business.name = businessName;
    }
    return config;
  }
}
