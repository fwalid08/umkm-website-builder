import { WebsiteConfig, SectionConfig } from './project';

export interface TemplateBlueprintSection {
  type: string;
  style: string;
  defaultOverrides?: Record<string, any>;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: 'F&B' | 'Automotive' | 'Beauty' | 'Services' | 'Commerce' | 'Construction' | 'Creative';
  description: string;
  badge?: string;
  thumbnail: string;
  supportedModes: ('light' | 'dark')[];
  supportedPageTypes: ('single' | 'multi')[];
  defaultTheme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontHeading: string;
    fontBody: string;
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
    buttonStyle: 'solid' | 'outline' | 'soft' | 'shadow';
    mode: 'light' | 'dark' | 'auto';
  };
  blueprint: {
    sections: TemplateBlueprintSection[];
  };
  createDefaultConfig: () => WebsiteConfig;
}
